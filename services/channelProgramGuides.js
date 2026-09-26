const fs = require('fs');
const path = require('path');
const {
  upsertProgram,
  addOccurrence,
  db
} = require('../models/program-db');

const GUIDE_PATH = path.join(__dirname, '..', 'config', 'editorial', 'channel-program-guides.json');

function loadChannelProgramGuides() {
  const raw = fs.readFileSync(GUIDE_PATH, 'utf8');
  const guide = JSON.parse(raw);
  if (!Array.isArray(guide.channels) || !guide.channels.length) {
    throw new Error('Aucun guide de chaîne configuré.');
  }
  return guide;
}

function isoAt(date, minutes) {
  const value = new Date(date);
  value.setUTCHours(0, 0, 0, 0);
  value.setUTCMinutes(minutes);
  return value.toISOString();
}

function dayProfile(dayIndex) {
  if (dayIndex === 5) return 'saturday';
  if (dayIndex === 6) return 'sunday';
  return 'weekday';
}

function buildDaySlots(channel, dayIndex) {
  const templates = channel.template || [];
  if (!templates.length) return [];

  const slots = [];
  const profile = dayProfile(dayIndex);
  const sequence = profile === 'weekday'
    ? templates.map((_, index) => index)
    : (profile === 'saturday'
      ? [0, 1, 4, 5, 6, 7, 8, 9, 2, 9]
      : [0, 4, 1, 6, 5, 8, 7, 9, 2, 9]);

  let cursor = 0;
  let index = 0;

  while (cursor < 1440 && index < 40) {
    const templateIndex = sequence[index % sequence.length];
    const template = templates[templateIndex] || templates[index % templates.length];
    const [title, category, configuredDuration] = template;
    const duration = Math.min(Number(configuredDuration) || 60, 1440 - cursor);

    slots.push({
      title,
      category,
      durationMinutes: duration,
      startMinutes: cursor,
      endMinutes: cursor + duration
    });

    cursor += duration;
    index += 1;
  }

  if (cursor < 1440) {
    slots.push({
      title: 'Rediffusions / continuité d’antenne',
      category: 'Rediffusion',
      durationMinutes: 1440 - cursor,
      startMinutes: cursor,
      endMinutes: 1440
    });
  }

  return slots;
}

function syncChannelProgramGuides({ from = new Date(), days = 7 } = {}) {
  const guide = loadChannelProgramGuides();
  const totalDays = Math.max(1, Math.min(Number(days) || 7, 31));
  const start = new Date(from);
  start.setUTCHours(0, 0, 0, 0);

  let channels = 0;
  let programs = 0;
  let occurrences = 0;

  const transaction = db.transaction(() => {
    for (const channel of guide.channels) {
      channels += 1;
      const programIds = new Set();

      for (let dayIndex = 0; dayIndex < totalDays; dayIndex += 1) {
        const date = new Date(start);
        date.setUTCDate(start.getUTCDate() + dayIndex);

        for (const slot of buildDaySlots(channel, dayIndex)) {
          const slug = slot.title
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

          const programId = 'guide-' + channel.channelId + '-' + slug;
          const startAt = isoAt(date, slot.startMinutes);
          const endAt = isoAt(date, slot.endMinutes);

          if (!programIds.has(programId)) {
            upsertProgram({
              programId,
              channelId: channel.channelId,
              title: slot.title,
              type: slot.category === 'Film' ? 'movie' : (slot.category === 'Série' ? 'series' : 'show'),
              description: 'Guide préparatoire synthétique de ' + channel.name + ' — ' + slot.title + '.',
              sourceType: 'synthetic-guide-template'
            });
            db.prepare("UPDATE programs SET status = 'confirmed' WHERE program_id = ?").run(programId);
            programIds.add(programId);
            programs += 1;
          }

          addOccurrence(programId, {
            channelId: channel.channelId,
            startAt,
            endAt,
            description: 'Créneau préparatoire EPG de ' + channel.name + '.',
            broadcastType: 'guide-template'
          });
          occurrences += 1;
        }
      }
    }
  });

  transaction();

  return {
    channels,
    programs,
    occurrences,
    days: totalDays,
    sourceType: 'synthetic-guide-template'
  };
}

module.exports = {
  loadChannelProgramGuides,
  syncChannelProgramGuides,
  buildDaySlots
};
