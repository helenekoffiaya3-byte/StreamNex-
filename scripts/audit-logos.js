#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const manifestPath = path.join(root, "assets", "logos", "manifest.json");
const logosDir = path.join(root, "assets", "logos");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const CHANNELS = require(path.join(root, "config", "channels.js"));
const channelById = new Map(CHANNELS.map(c => [c.id, c]));

const files = fs.existsSync(logosDir) ? fs.readdirSync(logosDir) : [];
const assetById = new Map();

for (const file of files) {
  const match = file.match(/^(.+)\.(png|svg|webp|jpg|jpeg)$/i);
  if (match) assetById.set(match[1], file);
}

const missing = manifest.channels.filter(c => !assetById.has(c.id));
const present = manifest.channels.filter(c => assetById.has(c.id));
const configured = manifest.channels.filter(c => Boolean(channelById.get(c.id)?.logoUrl));
const unresolved = manifest.channels.filter(c => !assetById.has(c.id) && !channelById.get(c.id)?.logoUrl);
const allowedBrandIds = new Set((manifest.brandAssets || []).map(a => a.id));
const unexpected = files
  .filter(f => /\.(png|svg|webp|jpg|jpeg)$/i.test(f))
  .filter(f => !manifest.channels.some(c => c.id === f.replace(/\.(png|svg|webp|jpg|jpeg)$/i, "")))
  .filter(f => !allowedBrandIds.has(f.replace(/\.(png|svg|webp|jpg|jpeg)$/i, "")));

const result = {
  channels: manifest.channels.length,
  present: present.length,
  missing: missing.length,
  unexpected: unexpected.length,
  verifiedSourceChannels: manifest.channels.filter(c => c.sourceStatus === "SOURCE_VERIFIED").length,
  userProvidedPackChannels: manifest.channels.filter(c => c.sourceStatus === "USER_PROVIDED_PACK").length,
  brandAssets: (manifest.brandAssets || []).length,
  missingWithVerifiedSource: missing.filter(c => c.sourceStatus === "SOURCE_VERIFIED").map(c => c.id),
  unexpected,
  missingIds: missing.map(c => c.id)
};

console.log(JSON.stringify(result, null, 2));

if (result.unexpected || result.channels !== CHANNELS.length || result.unresolved) process.exitCode = 1;
