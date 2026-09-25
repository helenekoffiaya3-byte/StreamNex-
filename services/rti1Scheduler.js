const fs = require('fs');
const path = require('path');

const TIMEZONE = 'Africa/Abidjan';
const SCHEDULE_PATH = path.join(__dirname, '../config/editorial/rti1-programs.json');
const VOD_ROOT = path.resolve(process.env.VOD_MEDIA_ROOT || path.join(process.cwd(), 'storage', 'vod'));

function loadRti1Schedule() {
  const catalog = JSON.parse(fs.readFileSync(SCHEDULE_PATH, 'utf8'));
  if (catalog.channelId !== 'rti-1' || catalog.timezone !== TIMEZONE || !Array.isArray(catalog.schedule)) {
    throw new Error('Grille éditoriale RTI 1 invalide.');
  }
  return catalog.schedule;
}

function minutes(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(String(value));
  if (!match) throw new Error('Horaire RTI 1 invalide: ' + value);
  return Number(match[1]) * 60 + Number(match[2]);
}

function seconds(value) {
  return minutes(value) * 60;
}

function absoluteMediaPath(program) {
  const relative = String(program.vodFile || '').replace(/^storage\/vod\//i, '');
  if (!relative || !/^[A-Za-z0-9._/-]+\.mp4$/i.test(relative)) return null;
  const candidate = path.resolve(VOD_ROOT, relative);
  if (candidate !== VOD_ROOT && !candidate.startsWith(VOD_ROOT + path.sep)) return null;
  return candidate;
}

function currentAbidjanTime() {
  const now = new Date();
  return now.toISOString().slice(11, 16);
}

function getActiveRti1Program(schedule = loadRti1Schedule(), now = new Date()) {
  const minute = now.getUTCHours() * 60 + now.getUTCMinutes();
  const second = now.getUTCSeconds();
  const currentSeconds = minute * 60 + second;

  for (const program of schedule) {
    const start = seconds(program.startTime);
    let end = seconds(program.endTime);
    if (end <= start) end += 24 * 60 * 60;

    const adjustedCurrent = currentSeconds < start && end > 24 * 60 * 60
      ? currentSeconds + 24 * 60 * 60
      : currentSeconds;

    if (adjustedCurrent >= start && adjustedCurrent < end) {
      const absolutePath = absoluteMediaPath(program);
      return {
        success: true,
        channelId: 'rti-1',
        timezone: TIMEZONE,
        abidjanTime: currentAbidjanTime(),
        activeProgram: {
          ...program,
          absolutePath,
          canPlay: Boolean(absolutePath && fs.existsSync(absolutePath)),
          playbackUrl: program.mediaUrl || null,
          offsetSeconds: Math.max(0, adjustedCurrent - start)
        },
        nextProgram: schedule[(schedule.indexOf(program) + 1) % schedule.length]
      };
    }
  }

  return {
    success: false,
    channelId: 'rti-1',
    timezone: TIMEZONE,
    error: 'Aucun programme RTI 1 actif.'
  };
}

function validateRti1Schedule(schedule = loadRti1Schedule()) {
  if (!Array.isArray(schedule) || schedule.length !== 20) {
    throw new Error('RTI 1 doit contenir exactement 20 programmes.');
  }
  return schedule;
}

module.exports = {
  TIMEZONE,
  loadRti1Schedule,
  getActiveRti1Program,
  validateRti1Schedule,
  absoluteMediaPath
};
