const fs = require('fs');
const path = require('path');

const TIMEZONE = 'Africa/Abidjan';
const CHANNEL_ID = 'rti-1';
const SCHEDULE_PATH = path.join(__dirname, '../config/editorial/rti1-programs.json');
const VOD_ROOT = path.resolve(process.env.VOD_MEDIA_ROOT || path.join(process.cwd(), 'storage', 'vod'));

const DAY_KEYS = ['sunday', 'mondayFriday', 'mondayFriday', 'mondayFriday', 'mondayFriday', 'mondayFriday', 'saturday'];
// JS getUTCDay(): 0 Sunday ... 6 Saturday.

function loadRti1Schedule() {
  const catalog = JSON.parse(fs.readFileSync(SCHEDULE_PATH, 'utf8'));
  if (catalog.channelId !== CHANNEL_ID || catalog.timezone !== TIMEZONE || !catalog.weekly) {
    throw new Error('Grille éditoriale RTI 1 hebdomadaire invalide.');
  }
  for (const key of ['mondayFriday', 'saturday', 'sunday']) {
    if (!Array.isArray(catalog.weekly[key]) || catalog.weekly[key].length !== 14) {
      throw new Error('Grille RTI 1 invalide: chaque journée doit contenir 14 créneaux.');
    }
  }
  return catalog;
}

function getDaySchedule(schedule, date) {
  const catalog = schedule?.weekly ? schedule : loadRti1Schedule();
  const day = date.getUTCDay();
  const key = DAY_KEYS[day];
  return catalog.weekly[key];
}

function minutes(value) {
  const match = /^(\\d{2}):(\\d{2})$/.exec(String(value));
  if (!match) throw new Error('Horaire RTI 1 invalide: ' + value);
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) throw new Error('Horaire RTI 1 invalide: ' + value);
  return hour * 60 + minute;
}

function seconds(value) {
  return minutes(value) * 60;
}

function absoluteMediaPath(program) {
  const relative = String(program.vodFile || '').replace(/^storage\\/vod\\//i, '');
  if (!relative || !/^[A-Za-z0-9._/-]+\\.mp4$/i.test(relative)) return null;
  const candidate = path.resolve(VOD_ROOT, relative);
  if (candidate !== VOD_ROOT && !candidate.startsWith(VOD_ROOT + path.sep)) return null;
  return candidate;
}

function currentAbidjanTime(now = new Date()) {
  return now.toISOString().slice(11, 16);
}

function occurrenceBounds(program, now) {
  const dayStart = new Date(now);
  dayStart.setUTCHours(0, 0, 0, 0);
  const start = new Date(dayStart);
  const [sh, sm] = program.startTime.split(':').map(Number);
  start.setUTCHours(sh, sm, 0, 0);

  const end = new Date(dayStart);
  const [eh, em] = program.endTime.split(':').map(Number);
  end.setUTCHours(eh, em, 0, 0);
  if (end <= start) end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
}

function getActiveRti1Program(schedule = loadRti1Schedule(), now = new Date()) {
  const today = getDaySchedule(schedule, now);
  const yesterday = new Date(now);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdaySchedule = getDaySchedule(schedule, yesterday);

  const candidates = [
    ...today.map(program => ({ program, date: now })),
    ...yesterdaySchedule.filter(program => seconds(program.endTime) <= seconds(program.startTime)).map(program => ({ program, date: yesterday }))
  ];

  for (const candidate of candidates) {
    const { start, end } = occurrenceBounds(candidate.program, candidate.date);
    if (now >= start && now < end) {
      const absolutePath = absoluteMediaPath(candidate.program);
      return {
        success: true,
        channelId: CHANNEL_ID,
        timezone: TIMEZONE,
        abidjanTime: currentAbidjanTime(now),
        activeProgram: {
          ...candidate.program,
          absolutePath,
          canPlay: Boolean(absolutePath && fs.existsSync(absolutePath)),
          playbackUrl: null,
          occurrenceStartAt: start.toISOString(),
          occurrenceEndAt: end.toISOString(),
          offsetSeconds: Math.max(0, Math.floor((now.getTime() - start.getTime()) / 1000))
        },
        nextProgram: getNextProgram(schedule, candidate.program, candidate.date)
      };
    }
  }

  return { success: false, channelId: CHANNEL_ID, timezone: TIMEZONE, error: 'Aucun programme RTI 1 actif.' };
}

function getNextProgram(schedule, currentProgram, currentDate) {
  const list = getDaySchedule(schedule, currentDate);
  const index = list.findIndex(item => item.id === currentProgram.id);
  if (index >= 0 && index + 1 < list.length) return list[index + 1];
  const nextDate = new Date(currentDate);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  return getDaySchedule(schedule, nextDate)[0];
}

function validateRti1Schedule(schedule = loadRti1Schedule()) {
  const catalog = schedule?.weekly ? schedule : loadRti1Schedule();
  const total = ['mondayFriday', 'saturday', 'sunday']
    .reduce((sum, key) => sum + catalog.weekly[key].length, 0);
  if (total !== 42) throw new Error('RTI 1 doit contenir 42 créneaux hebdomadaires (14 par jour-type).');
  return catalog;
}

module.exports = {
  TIMEZONE,
  CHANNEL_ID,
  loadRti1Schedule,
  getDaySchedule,
  getActiveRti1Program,
  validateRti1Schedule,
  absoluteMediaPath,
  occurrenceBounds
};
