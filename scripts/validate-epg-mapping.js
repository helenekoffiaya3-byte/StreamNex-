const fs = require('fs');
const path = require('path');
const channels = require('../config/channels');

const file = path.join(process.cwd(), 'config', 'official-guides.json');

if (!fs.existsSync(file)) {
  console.error('EPG mapping file missing:', file);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  console.error('Invalid official-guides.json:', error.message);
  process.exit(1);
}

const mappings = data.mappings && !Array.isArray(data.mappings) ? data.mappings : {};
const ids = new Set(channels.map(channel => channel.id));
const mapped = [];
const missing = [];
const invalid = [];
const orphan = [];

for (const channel of channels) {
  const mapping = mappings[channel.id];
  if (!mapping) {
    missing.push({ id: channel.id, name: channel.name });
    continue;
  }
  if (mapping.enabled === false) continue;
  if (typeof mapping.xmltv_id !== 'string' || !mapping.xmltv_id.trim()) {
    invalid.push({ id: channel.id, name: channel.name });
    continue;
  }
  mapped.push({ id: channel.id, xmltv_id: mapping.xmltv_id.trim() });
}

for (const key of Object.keys(mappings)) {
  if (!ids.has(key)) orphan.push(key);
}

const result = {
  generatedAt: new Date().toISOString(),
  totalChannels: channels.length,
  mapped: mapped.length,
  missing: missing.length,
  invalid: invalid.length,
  orphan: orphan.length,
  coveragePercent: Number(((mapped.length / channels.length) * 100).toFixed(1)),
  missingChannels: missing,
  invalidMappings: invalid,
  orphanMappings: orphan
};

console.log(JSON.stringify(result, null, 2));
if (process.env.EPG_MAPPING_STRICT === 'true' && (missing.length || invalid.length || orphan.length)) process.exitCode = 1;
