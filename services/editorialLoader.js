const fs = require('fs');
const path = require('path');
const { db, upsertProgram, addOccurrence } = require('../models/program-db');

function isoForDate(date, hhmm, timezone) {
  if (timezone !== 'Africa/Abidjan') throw new Error('Timezone éditoriale non supportée: ' + timezone);
  const [hour, minute] = String(hhmm).split(':').map(Number);
  if (!Number.isInteger(hour) || !Number.isInteger(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error('Horaire éditorial invalide: ' + hhmm);
  }
  const value = new Date(date);
  value.setUTCHours(hour, minute, 0, 0);
  return value.toISOString();
}

function normalizeEditorialMediaUrl(value) {
  const url = String(value || '').trim();
  if (!url) return null;
  // Les chemins /vod/... sont des références éditoriales internes.
  // Ils ne deviennent lisibles que si le backend confirme que le fichier existe.
  if (/^\/vod\/(?:[a-zA-Z0-9._-]+\/)*[a-zA-Z0-9._-]+\.mp4$/i.test(url)) return url;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.toString() : null;
  } catch {
    return null;
  }
}

function loadEditorialScheduleForRti1({ date = new Date() } = {}) {
  const filePath = path.join(__dirname, '../config/editorial/rti1-programs.json');
  if (!fs.existsSync(filePath)) {
    console.warn('Aucun fichier éditorial trouvé pour RTI 1.');
    return { loaded: 0, skipped: 0 };
  }

  const catalog = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (catalog.channelId !== 'rti-1') throw new Error('Catalogue éditorial RTI 1 invalide.');
  if (catalog.timezone !== 'Africa/Abidjan') throw new Error('Timezone RTI 1 invalide.');
  if (!Array.isArray(catalog.schedule)) throw new Error('schedule RTI 1 invalide.');

  const day = new Date(date);
  const dayKey = day.toISOString().slice(0, 10);
  let loaded = 0;

  const transaction = db.transaction(() => {
    for (const prog of catalog.schedule) {
      if (!prog.id || !prog.title || !prog.startTime || !prog.endTime) {
        throw new Error('Entrée éditoriale RTI 1 incomplète.');
      }

      const startAt = isoForDate(day, prog.startTime, catalog.timezone);
      let endAt = isoForDate(day, prog.endTime, catalog.timezone);
      if (endAt <= startAt) {
        const next = new Date(endAt);
        next.setUTCDate(next.getUTCDate() + 1);
        endAt = next.toISOString();
      }

      upsertProgram({
        programId: prog.id,
        channelId: catalog.channelId,
        title: prog.title,
        type: prog.category || 'show',
        description: prog.description || '',
        playbackUrl: normalizeEditorialMediaUrl(prog.mediaUrl),
        sourceType: 'editorial-curated'
      });

      addOccurrence(prog.id, {
        channelId: catalog.channelId,
        startAt,
        endAt,
        description: prog.description || '',
        playbackUrl: normalizeEditorialMediaUrl(prog.mediaUrl)
      });

      db.prepare("UPDATE programs SET status = 'confirmed', is_recurring = 1, source_type = 'editorial-curated' WHERE program_id = ?")
        .run(prog.id);

      loaded++;
    }
  });

  transaction();
  console.log(`Grille éditoriale RTI 1 chargée pour ${dayKey}: ${loaded} programmes.`);
  return { loaded, skipped: 0, date: dayKey };
}

module.exports = { loadEditorialScheduleForRti1 };
