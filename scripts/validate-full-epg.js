const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const CHANNELS = require("../config/channels");
const { generateFullCatalogPrograms, CATEGORY_TEMPLATES } = require("../utils/epgFullGenerator");

const EXPECTED_CHANNELS = 140;
const EXPECTED_PROGRAMS_PER_CHANNEL = 20;
const EXPECTED_GROUPS = {
  National: 28,
  Info: 26,
  Jeunesse: 35,
  Films: 44,
  Biblical: 7
};
const EXPECTED_TIMEZONE = "Africa/Abidjan";

function fail(message) {
  throw new Error(message);
}

function minutes(hhmm) {
  const match = /^(\d{2}):(\d{2})$/.exec(String(hhmm || ""));
  if (!match) fail(\`Horaire invalide: \${hhmm}\`);
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) fail(\`Horaire hors plage: \${hhmm}\`);
  return hour * 60 + minute;
}

function durationMinutes(value) {
  const match = /^(\d+) min$/.exec(String(value || ""));
  if (!match) fail(\`Durée invalide: \${value}\`);
  return Number(match[1]);
}

console.log("🚀 Validation globale StreamLive — Côte d'Ivoire (Africa/Abidjan / UTC+0)");

assert.equal(CHANNELS.length, EXPECTED_CHANNELS, "Le catalogue doit contenir exactement 140 chaînes.");

const ids = new Set();
const names = new Set();
const groupCounts = Object.fromEntries(Object.keys(EXPECTED_GROUPS).map(group => [group, 0]));
const logoWarnings = [];
const urlConfigured = [];

for (const channel of CHANNELS) {
  if (!channel?.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(channel.id)) {
    fail(\`ID de chaîne invalide: \${channel?.id}\`);
  }
  if (ids.has(channel.id)) fail(\`ID de chaîne dupliqué: \${channel.id}\`);
  ids.add(channel.id);

  if (!channel.name || !String(channel.name).trim()) fail(\`Nom de chaîne manquant: \${channel.id}\`);
  if (names.has(channel.name)) fail(\`Nom de chaîne dupliqué: \${channel.name}\`);
  names.add(channel.name);

  if (!Object.prototype.hasOwnProperty.call(EXPECTED_GROUPS, channel.group)) {
    fail(\`Groupe invalide pour \${channel.id}: \${channel.group}\`);
  }
  groupCounts[channel.group] += 1;

  const logoPath = channel.logoUrl || \`/assets/logos/\${channel.id}.png\`;
  if (!logoPath) logoWarnings.push(channel.id);

  if (channel.productionUrl) urlConfigured.push(channel.id);
}

assert.deepEqual(groupCounts, EXPECTED_GROUPS, "La répartition des 5 groupes est incorrecte.");
assert.equal(Object.keys(groupCounts).length, 5, "Le catalogue doit comporter exactement 5 groupes.");
assert.deepEqual(Object.keys(CATEGORY_TEMPLATES).sort(), Object.keys(EXPECTED_GROUPS).sort());

const allPrograms = CHANNELS.flatMap(channel => generateFullCatalogPrograms(channel));
assert.equal(
  allPrograms.length,
  EXPECTED_CHANNELS * EXPECTED_PROGRAMS_PER_CHANNEL,
  "Le total EPG doit être exactement de 2 800 programmes."
);

for (const channel of CHANNELS) {
  const grid = generateFullCatalogPrograms(channel, { count: EXPECTED_PROGRAMS_PER_CHANNEL });
  assert.equal(grid.length, EXPECTED_PROGRAMS_PER_CHANNEL, \`\${channel.id}: 20 programmes requis.\`);
  assert.equal(grid[0].startTime, "06:00", \`\${channel.id}: la grille doit commencer à 06:00.\`);
  assert.equal(grid.at(-1).endTime, "06:00", \`\${channel.id}: la grille doit finir à 06:00.\`);

  let cursor = 360;
  for (let i = 0; i < grid.length; i += 1) {
    const program = grid[i];
    const start = minutes(program.startTime);
    const end = minutes(program.endTime);
    const expectedDuration = durationMinutes(program.duration);

    assert.equal(program.channelId, channel.id);
    assert.equal(program.generated, true);
    assert.equal(program.source, "synthetic-full-epg");
    assert.equal(program.catalogEnabled, true);
    assert.equal(program.streamEnabled, false);
    assert.deepEqual(program.stream, { enabled: false, status: "INACTIVE" });
    assert.equal(program.timezone, EXPECTED_TIMEZONE);
    assert.equal(program.utcOffsetMinutes, 0);
    assert.equal(program.programId, \`epgfull-\${channel.id}-\${String(i + 1).padStart(2, "0")}\`);
    assert.equal(program.epgId, \`epg.\${channel.id}.prog-\${i + 1}\`);
    assert.equal(start, cursor % 1440, \`\${channel.id}: rupture avant le programme #\${i + 1}.\`);

    const expectedEnd = (cursor + expectedDuration) % 1440;
    assert.equal(end, expectedEnd, \`\${channel.id}: durée incohérente au programme #\${i + 1}.\`);

    const next = grid[i + 1];
    if (next) {
      assert.equal(next.startTime, program.endTime, \`\${channel.id}: chevauchement/trou entre #\${i + 1} et #\${i + 2}.\`);
    }
    cursor += expectedDuration;
  }

  assert.equal(cursor - 360, 1440, \`\${channel.id}: la grille ne couvre pas exactement 24 heures.\`);
}

const aplus = generateFullCatalogPrograms(CHANNELS.find(channel => channel.id === "a-plus-ivoire"));
assert.deepEqual(
  aplus.slice(0, 3).map(item => [item.title, item.startTime, item.endTime]),
  [
    ["Talk du Matin : Réveil Africain", "06:00", "07:00"],
    ["Ma Famille", "07:00", "08:30"],
    ["MTV Shuga Babi", "08:30", "09:30"]
  ]
);

const logoDir = path.join(__dirname, "..", "assets", "logos");
if (!fs.existsSync(logoDir)) {
  logoWarnings.push("assets/logos (répertoire absent)");
} else {
  const files = fs.readdirSync(logoDir).filter(name => !name.toLowerCase().startsWith("readme."));
  if (files.length === 0) logoWarnings.push("assets/logos (aucun fichier image)");
}

console.log(\`✅ Catalogue: \${CHANNELS.length} chaînes, 5 groupes.\`);
console.log(\`✅ EPG: \${allPrograms.length} programmes, \${EXPECTED_PROGRAMS_PER_CHANNEL}/chaîne, 24 h sans chevauchement, \${EXPECTED_TIMEZONE} / UTC+0.\`);
console.log(\`ℹ️ Flux HLS configurés dans channels.js: \${urlConfigured.length}/\${CHANNELS.length} (cela ne signifie pas qu'ils sont autorisés ou lisibles).\`);

if (logoWarnings.length) {
  console.warn("⚠️ Logos à traiter: " + logoWarnings.join(", "));
  console.warn("Le catalogue ne considère pas un logo synthétique comme un logo officiel de diffuseur.");
}
