const fs = require('fs');
const path = require('path');
const channels = require('../config/channels');

const EXPECTED_COUNTS = Object.freeze({
  National: 27,
  Info: 27,
  Jeunesse: 35,
  Films: 44,
  Biblical: 7
});

const FORBIDDEN_LITERAL_URLS = [
  /https?:\/\/[^"'\s]+/i,
  /test-streams\.mux\.dev/i,
  /example\.com/i,
  /example\.org/i,
  /localhost(?::\d+)?/i
];

function runCatalogAudit() {
  console.log('🔍 Audit strict du catalogue StreamLive...');

  const errors = [];
  const counts = Object.fromEntries(Object.keys(EXPECTED_COUNTS).map(key => [key, 0]));
  const ids = new Set();

  if (!Array.isArray(channels)) {
    errors.push('config/channels.js ne retourne pas un tableau.');
  } else {
    if (channels.length !== 140) {
      errors.push(`Nombre de chaînes incorrect : ${channels.length} (attendu : 140).`);
    }

    for (const [index, channel] of channels.entries()) {
      if (!channel || typeof channel !== 'object') {
        errors.push(`Entrée invalide à l'index ${index}.`);
        continue;
      }

      if (!channel.id || typeof channel.id !== 'string') {
        errors.push(`ID manquant/invalide à l'index ${index}.`);
      } else if (ids.has(channel.id)) {
        errors.push(`ID en double : "${channel.id}".`);
      } else {
        ids.add(channel.id);
      }

      if (!channel.name || typeof channel.name !== 'string') {
        errors.push(`Nom manquant pour "${channel.id || index}".`);
      }

      if (!Object.prototype.hasOwnProperty.call(EXPECTED_COUNTS, channel.group)) {
        errors.push(`Groupe inconnu pour "${channel.id || index}" : "${channel.group}".`);
      } else {
        counts[channel.group]++;
      }

      if (typeof channel.productionUrl !== 'string' && channel.productionUrl !== null) {
        errors.push(`productionUrl invalide pour "${channel.id || index}".`);
      }

      if (typeof channel.streamEnabled !== 'boolean') {
        errors.push(`streamEnabled doit être booléen pour "${channel.id || index}".`);
      }

      if (typeof channel.productionUrl === 'string' && channel.productionUrl.trim()) {
        errors.push(`URL de production en dur interdite pour "${channel.id}". Utiliser une variable d'environnement.`);
      }
    }
  }

  for (const [group, expected] of Object.entries(EXPECTED_COUNTS)) {
    if (counts[group] !== expected) {
      errors.push(`Quota incorrect pour "${group}" : ${counts[group]} (attendu : ${expected}).`);
    }
  }

  const sourcePath = path.join(__dirname, '..', 'config', 'channels.js');
  const source = fs.readFileSync(sourcePath, 'utf8');
  for (const pattern of FORBIDDEN_LITERAL_URLS) {
    if (pattern.test(source)) {
      errors.push(`URL/host littéral interdit détecté dans config/channels.js : ${pattern}`);
    }
  }

  if (errors.length) {
    console.error('❌ ÉCHEC DE L’AUDIT DU CATALOGUE');
    for (const error of errors) console.error(`   - ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log('✅ Catalogue conforme.');
  console.table(counts);
  console.log(`Total : ${channels.length} chaînes | IDs uniques : ${ids.size}`);
}

runCatalogAudit();
