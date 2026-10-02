#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "assets", "logos", "manifest.json");
const logosDir = path.join(root, "assets", "logos");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const files = fs.existsSync(logosDir) ? fs.readdirSync(logosDir) : [];
const pngIds = new Set(
  files.filter(f => /\.png$/i.test(f)).map(f => f.replace(/\.png$/i, ""))
);

const missing = manifest.channels.filter(c => !pngIds.has(c.id));
const present = manifest.channels.filter(c => pngIds.has(c.id));
const unexpected = files
  .filter(f => /\.png$/i.test(f))
  .filter(f => !manifest.channels.some(c => c.id === f.replace(/\.png$/i, "")));

const result = {
  channels: manifest.channels.length,
  present: present.length,
  missing: missing.length,
  unexpected: unexpected.length,
  verifiedSourceChannels: manifest.channels.filter(c => c.sourceStatus === "SOURCE_VERIFIED").length,
  missingWithVerifiedSource: missing.filter(c => c.sourceStatus === "SOURCE_VERIFIED").map(c => c.id),
  unexpected,
  missingIds: missing.map(c => c.id)
};

console.log(JSON.stringify(result, null, 2));

if (result.unexpected || result.channels !== 232) process.exitCode = 1;
