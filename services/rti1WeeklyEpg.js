const { loadRti1Schedule, getDaySchedule, occurrenceBounds, validateRti1Schedule } = require('./rti1Scheduler');
const { upsertProgram, addOccurrence, db } = require('../models/program-db');

const CHANNEL_ID = 'rti-1';
const WINDOW_DAYS = 7;

function programDescription(program) {
  return 'Créneau éditorial RTI 1 · ' + program.category + '. La fiche EPG décrit la programmation; elle ne constitue pas une preuve de disponibilité média.';
}

function ensureProgram(program) {
  upsertProgram({
    programId: program.id,
    channelId: CHANNEL_ID,
    title: program.title,
    type: program.type,
    description: programDescription(program),
    sourceType: 'editorial-weekly'
  });
  db.prepare(
    'UPDATE programs SET title = ?, type = ?, channel_id = ?, status = ?, source_type = ? WHERE program_id = ?'
  ).run(program.title, program.type, CHANNEL_ID, 'confirmed', 'editorial-weekly', program.id);
}

function syncRti1WeeklyEpg({ from = new Date(), days = WINDOW_DAYS } = {}) {
  const schedule = loadRti1Schedule();
  validateRti1Schedule(schedule);

  const startDate = new Date(from);
  startDate.setUTCHours(0, 0, 0, 0);

  for (let offset = 0; offset < days; offset += 1) {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + offset);

    for (const program of getDaySchedule(schedule, date)) {
      ensureProgram(program);
      const bounds = occurrenceBounds(program, date);
      const existing = db.prepare(
        'SELECT occurrence_id FROM program_occurrences WHERE program_id = ? AND start_at = ?'
      ).get(program.id, bounds.start.toISOString());

      if (!existing) {
        addOccurrence(program.id, {
          channelId: CHANNEL_ID,
          startAt: bounds.start.toISOString(),
          endAt: bounds.end.toISOString(),
          description: programDescription(program),
          broadcastType: 'broadcast'
        });
      } else {
        db.prepare(
          'UPDATE program_occurrences SET end_at = ?, description = ?, channel_id = ?, broadcast_type = ? WHERE occurrence_id = ?'
        ).run(
          bounds.end.toISOString(),
          programDescription(program),
          CHANNEL_ID,
          'broadcast',
          existing.occurrence_id
        );
      }
    }
  }

  const endDate = new Date(startDate);
  endDate.setUTCDate(startDate.getUTCDate() + days);
  const templates = new Set();
  for (const key of ['mondayFriday', 'saturday', 'sunday']) {
    for (const program of schedule.weekly[key]) templates.add(program.id);
  }

  const occurrenceCount = db.prepare(
    'SELECT COUNT(*) AS count FROM program_occurrences WHERE channel_id = ? AND start_at >= ? AND start_at < ?'
  ).get(CHANNEL_ID, startDate.toISOString(), endDate.toISOString()).count;

  return {
    channelId: CHANNEL_ID,
    windowStart: startDate.toISOString(),
    windowEnd: endDate.toISOString(),
    windowDays: days,
    templates: templates.size,
    occurrences: occurrenceCount
  };
}

module.exports = { syncRti1WeeklyEpg };
