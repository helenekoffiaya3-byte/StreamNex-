const assert = require("node:assert/strict");
const CHANNELS = require("../config/channels");
const { generateFullCatalogPrograms } = require("../utils/epgFullGenerator");

const programs = CHANNELS.flatMap(channel => generateFullCatalogPrograms(channel));

assert.equal(CHANNELS.length, 140, "Le catalogue doit contenir 140 chaînes.");
assert.equal(programs.length, 140 * 20, "Chaque chaîne doit avoir exactement 20 programmes.");

for (const channel of CHANNELS) {
  const grid = generateFullCatalogPrograms(channel);
  assert.equal(grid.length, 20);
  assert.equal(grid[0].startTime, "06:00");
  assert.equal(grid[19].endTime, "06:00");
  assert.ok(grid.every(item => item.channelId === channel.id));
  assert.ok(grid.every(item => item.generated === true));
  assert.ok(grid.every(item => item.streamEnabled === false));
}

const aplus = generateFullCatalogPrograms(CHANNELS.find(channel => channel.id === "a-plus-ivoire"));
assert.deepEqual(aplus.slice(0, 3).map(item => [item.title, item.startTime, item.endTime]), [
  ["Talk du Matin : Réveil Africain", "06:00", "07:00"],
  ["Ma Famille", "07:00", "08:30"],
  ["MTV Shuga Babi", "08:30", "09:30"]
]);

console.log("EPG complet valide : 140 chaînes × 20 programmes.");
