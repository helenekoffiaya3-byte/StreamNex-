const { loadStreamLiveSchedule, validateStreamLiveSchedule } = require('../services/streamliveScheduler');

try {
  const schedule = loadStreamLiveSchedule();
  const result = validateStreamLiveSchedule(schedule);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('[StreamLive scheduler] Validation échouée:', error.message);
  process.exitCode = 1;
}
