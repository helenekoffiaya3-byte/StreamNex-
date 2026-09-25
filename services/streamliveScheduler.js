const fs = require('fs');
const path = require('path');

const SCHEDULE_PATH = path.join(__dirname, '../config/editorial/streamlive-programs.json');
const TIMEZONE = 'Africa/Abidjan';

function timeToMinutes(timeStr, isEndTime = false) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(timeStr))) {
    throw new Error('Horaire invalide: ' + timeStr);
  }
  const [hours, minutes] = String(timeStr).split(':').map(Number);
  if (isEndTime && hours === 0 && minutes === 0) return 1440;
  return hours * 60 + minutes;
}

function loadStreamLiveSchedule() {
  const catalog = JSON.parse(fs.readFileSync(SCHEDULE_PATH, 'utf8'));
  if (catalog.timezone !== TIMEZONE || catalog.type !== 'editorial-curated') {
    throw new Error('Configuration éditoriale StreamLive invalide.');
  }
  if (!Array.isArray(catalog.schedule) || catalog.schedule.length !== 15) {
    throw new Error('La grille StreamLive doit contenir exactement 15 programmes.');
  }
  return catalog.schedule;
}

function validateStreamLiveSchedule(schedule = loadStreamLiveSchedule()) {
  const sorted = [...schedule].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  let cursor = 0;
  const ids = new Set();

  for (const program of sorted) {
    if (!program.id || ids.has(program.id)) throw new Error('ID éditorial manquant ou dupliqué.');
    ids.add(program.id);

    const start = timeToMinutes(program.startTime);
    const end = timeToMinutes(program.endTime, true);
    if (end <= start) throw new Error(`Créneau invalide pour ${program.id}: ${program.startTime} -> ${program.endTime}`);
    if (start !== cursor) {
      throw new Error(`Interstice ou chevauchement avant ${program.id}: attendu ${cursor} min, trouvé ${start} min.`);
    }
    cursor = end;
  }

  if (cursor !== 1440) throw new Error('La grille ne couvre pas exactement 24 heures.');
  return { valid: true, count: sorted.length, timezone: TIMEZONE };
}

function getAbidjanCurrentTime(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(now);

  const hour = Number(parts.find(p => p.type === 'hour').value);
  const minute = Number(parts.find(p => p.type === 'minute').value);
  const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  return { currentMinutes: hour * 60 + minute, formattedTime };
}

function resolveVodFile(vodFile, baseDir = process.cwd()) {
  const value = String(vodFile || '').trim();
  if (!/^storage\/vod\/(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+\.mp4$/i.test(value)) return null;

  const root = path.resolve(baseDir, 'storage', 'vod');
  const relative = value.slice('storage/vod/'.length);
  const candidate = path.resolve(root, relative);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) return null;

  return { candidate, playbackUrl: '/vod/' + relative };
}

function getActiveStreamLiveProgram(schedule = loadStreamLiveSchedule(), now = new Date(), baseDir = process.cwd()) {
  validateStreamLiveSchedule(schedule);
  const { currentMinutes, formattedTime } = getAbidjanCurrentTime(now);
  const activeIndex = schedule.findIndex(program => {
    const start = timeToMinutes(program.startTime);
    const end = timeToMinutes(program.endTime, true);
    return currentMinutes >= start && currentMinutes < end;
  });

  if (activeIndex < 0) {
    return { success: false, message: 'Aucun programme planifié à cette heure.', abidjanTime: formattedTime };
  }

  const activeProgram = schedule[activeIndex];
  const resolved = resolveVodFile(activeProgram.vodFile, baseDir);
  const mediaAvailable = Boolean(resolved && fs.existsSync(resolved.candidate));
  const nextProgram = schedule[(activeIndex + 1) % schedule.length];

  return {
    success: true,
    type: 'editorial-curated',
    timezone: TIMEZONE,
    abidjanTime: formattedTime,
    activeProgram: {
      ...activeProgram,
      playbackUrl: resolved?.playbackUrl || null,
      mediaAvailable,
      canPlay: mediaAvailable
    },
    nextProgram
  };
}

module.exports = {
  TIMEZONE,
  loadStreamLiveSchedule,
  validateStreamLiveSchedule,
  getAbidjanCurrentTime,
  getActiveStreamLiveProgram
};
