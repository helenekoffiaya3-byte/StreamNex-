const fs = require('fs');
const path = require('path');
const { loadStreamLiveSchedule, validateStreamLiveSchedule } = require('../services/streamliveScheduler');

const RTI1_PATH = path.join(__dirname, '../config/editorial/rti1-programs.json');

function minutes(value) {
  const match = /^(\\d{2}):(\\d{2})$/.exec(String(value));
  if (!match) throw new Error(`Horaire invalide: ${value}`);
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) throw new Error(`Horaire invalide: ${value}`);
  return hour * 60 + minute;
}

function normalizeIntervals(schedule) {
  const intervals = [];

  for (const program of schedule) {
    const start = minutes(program.startTime);
    const endRaw = minutes(program.endTime);
    const end = endRaw === 0 ? 1440 : endRaw;

    if (start === endRaw) {
      throw new Error(`Créneau nul pour ${program.id}: ${program.startTime} -> ${program.endTime}`);
    }

    if (end > start) {
      intervals.push({ id: program.id, title: program.title, start, end });
    } else {
      intervals.push({ id: program.id, title: program.title, start, end: 1440 });
      intervals.push({ id: program.id, title: program.title, start: 0, end: endRaw });
    }
  }

  return intervals.sort((a, b) => a.start - b.start || a.end - b.end);
}

function validateTimeline(schedule, name) {
  if (!Array.isArray(schedule) || schedule.length === 0) {
    throw new Error(`Grille ${name} vide ou invalide.`);
  }

  const ids = new Set();
  for (const program of schedule) {
    if (!program.id || ids.has(program.id)) {
      throw new Error(`ID manquant ou dupliqué dans ${name}: ${program.id || '(vide)'}`);
    }
    ids.add(program.id);
  }

  const intervals = normalizeIntervals(schedule);
  const gaps = [];
  const overlaps = [];
  let cursor = 0;

  for (const interval of intervals) {
    if (interval.start > cursor) {
      gaps.push({ start: cursor, end: interval.start });
    } else if (interval.start < cursor) {
      overlaps.push({ start: interval.start, end: Math.min(cursor, interval.end), program: interval.id });
    }

    cursor = Math.max(cursor, interval.end);
  }

  return {
    valid: gaps.length === 0 && overlaps.length === 0 && cursor === 1440,
    count: schedule.length,
    coverageMinutes: Math.max(0, 1440 - gaps.reduce((sum, gap) => sum + (gap.end - gap.start), 0)),
    gaps,
    overlaps
  };
}

function formatMinute(value) {
  if (value === 1440) return '24:00';
  return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
}

try {
  const streamLiveSchedule = loadStreamLiveSchedule();
  const streamLive = validateStreamLiveSchedule(streamLiveSchedule);

  const rti1Catalog = JSON.parse(fs.readFileSync(RTI1_PATH, 'utf8'));
  if (rti1Catalog.channelId !== 'rti-1' || rti1Catalog.timezone !== 'Africa/Abidjan') {
    throw new Error('Configuration éditoriale RTI 1 invalide.');
  }

  const rti1 = validateTimeline(rti1Catalog.schedule, 'RTI 1');

  const result = {
    StreamLive: streamLive,
    RTI1: {
      ...rti1,
      gaps: rti1.gaps.map(gap => ({ ...gap, startTime: formatMinute(gap.start), endTime: formatMinute(gap.end) })),
      overlaps: rti1.overlaps.map(item => ({ ...item, startTime: formatMinute(item.start), endTime: formatMinute(item.end) }))
    }
  };

  console.log(JSON.stringify(result, null, 2));

  if (!rti1.valid) {
    console.error('[RTI 1] Grille non linéaire: corriger tous les gaps/overlaps avant activation du scheduler.');
    process.exitCode = 1;
  }
} catch (error) {
  console.error('[Editorial schedule] Validation échouée:', error.message);
  process.exitCode = 1;
}
