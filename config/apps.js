const CHANNELS = require('./channels');\nconst SERVICES = require('./services');

const HISTORICAL_APPS = [
  ["disney-xd-france","Disney XD France"],
  ["disney-xd-afrique-outre-mer","Disney XD Afrique/Outre-mer"],
  ["disney-channel-plus-1-france","Disney Channel +1 France"],
  ["disney-cinemagic-france","Disney Cinemagic France"],
  ["disney-cinemagic-plus-1-france","Disney Cinemagic +1 France"],
  ["playhouse-disney-france","Playhouse Disney France"],
  ["toon-disney-france","Toon Disney France"],
  ["jetix-france","Jetix France"],
  ["fox-kids-france","Fox Kids France"],
  ["disney-junior-plus-1-france","Disney Junior +1 France"],
  ["disney-xd-plus-1-france","Disney XD +1 France"],
  ["canal-plus-family","Canal+ Family"],
  ["canal-plus-family-ouest","Canal+ Family Ouest"],
  ["canal-plus-family-centre","Canal+ Family Centre"],
  ["kidsco-france","KidsCo France"],
  ["discovery-kids-france","Discovery Kids France"],
  ["babyfirst-france","BabyFirst France"],
  ["filles-tv","Filles TV"],
  ["gong","Gong"]
];

const apps = [\n  ...SERVICES,
  ...CHANNELS
    .filter(c => c.group === 'Jeunesse')
    .map(c => ({
      id: c.id,
      name: c.name,
      type: 'channel',
      group: c.group,
      channelId: c.id,
      channelNumber: c.channelNumber,
      status: 'ACTIVE_CATALOG',
      sourceConfigured: Boolean(c.productionUrl),
      streamEnabled: Boolean(c.streamEnabled)
    })),
  ...HISTORICAL_APPS.map(([id, name]) => ({
    id,
    name,
    type: 'channel',
    group: 'Jeunesse Archives',
    channelId: null,
    channelNumber: null,
    status: 'HISTORICAL',
    sourceConfigured: false,
    streamEnabled: false
  }))
];

module.exports = apps;
