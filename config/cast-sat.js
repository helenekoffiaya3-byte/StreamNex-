/**
 * Cast Sat / Sat>IP source configuration.
 *
 * This configuration records the transponder scan target and the services
 * discovered from public satellite listings. It does not contain stream URLs
 * or credentials. Encrypted services are retained as reception candidates only;
 * they are not enabled for redistribution.
 *
 * IMPORTANT: 11171 V / 45000 is publicly listed on SES-4 at 22.0W, not
 * Eutelsat 16A at 16.0E. A physical receiver scan must confirm the installation
 * before this is used as a production source.
 */
export const castSat = {
  satellite: {
    name: "SES-4",
    position: "22.0W",
    beam: "West Africa",
    requestedPosition: "Eutelsat 16A / 16.0E",
    positionVerified: false,
  },
  transponder: {
    frequencyMHz: 11171,
    polarization: "V",
    symbolRateKsym: 45000,
    fec: "3/4",
    system: "DVB-S2/QPSK",
    video: "HEVC",
    band: "Ku",
    encryption: {
      scrambled: true,
      systems: ["Mediaguard", "Nagravision"],
      source: "public-satellite-listing",
      keysConfigured: false,
      authorizationRequired: true,
    },
  },
  lnb: {
    type: "universal",
    lowOscillatorMHz: 9750,
    highOscillatorMHz: 10600,
  },
  output: {
    protocol: "HLS",
    pathPattern: "/hls/{service}/index.m3u8",
  },
  /**\n   * Master catalogue attachment state. Every one of the 234 StreamLive channels\n   * is represented here before satellite matching. A channel remains in the\n   * master catalogue when no satellite source has been verified yet.\n   */\n  catalogueCoverage: [
  {
    "catalogueId": "rti-1",
    "channelNumber": 1,
    "name": "RTI 1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "rti-2",
    "channelNumber": 2,
    "name": "RTI 2",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "la-3",
    "channelNumber": 3,
    "name": "La 3",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "a-plus-ivoire",
    "channelNumber": 4,
    "name": "A+ Ivoire",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "life-tv",
    "channelNumber": 5,
    "name": "Life TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nci",
    "channelNumber": 6,
    "name": "NCI",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-cote-divoire",
    "channelNumber": 185,
    "name": "S+ Côte d’Ivoire",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "6ter",
    "channelNumber": 10,
    "name": "6ter",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "arte",
    "channelNumber": 11,
    "name": "Arte",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus",
    "channelNumber": 186,
    "name": "S+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-2",
    "channelNumber": 13,
    "name": "France 2",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-3",
    "channelNumber": 14,
    "name": "France 3",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-4",
    "channelNumber": 15,
    "name": "France 4",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-5",
    "channelNumber": 16,
    "name": "France 5",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "m6",
    "channelNumber": 17,
    "name": "M6",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tf1",
    "channelNumber": 18,
    "name": "TF1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tfx",
    "channelNumber": 19,
    "name": "TFX",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tmc",
    "channelNumber": 20,
    "name": "TMC",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "w9",
    "channelNumber": 21,
    "name": "W9",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cnn-international",
    "channelNumber": 41,
    "name": "CNN International",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "dw",
    "channelNumber": 42,
    "name": "DW",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "euronews",
    "channelNumber": 43,
    "name": "Euronews",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "fox-business",
    "channelNumber": 44,
    "name": "Fox Business",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "fox-news",
    "channelNumber": 45,
    "name": "Fox News",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-24",
    "channelNumber": 22,
    "name": "France 24",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "hln",
    "channelNumber": 47,
    "name": "HLN",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "i24news",
    "channelNumber": 48,
    "name": "i24NEWS",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "msnbc",
    "channelNumber": 49,
    "name": "MSNBC",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ab1",
    "channelNumber": 200,
    "name": "AB1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "action",
    "channelNumber": 201,
    "name": "Action",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-action",
    "channelNumber": 202,
    "name": "C+ Action",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-cinema",
    "channelNumber": 203,
    "name": "C+ Cinema",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-family",
    "channelNumber": 204,
    "name": "C+ Family",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-magic",
    "channelNumber": 205,
    "name": "C+ Magic",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-pop",
    "channelNumber": 206,
    "name": "C+ Pop",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "charge",
    "channelNumber": 207,
    "name": "Charge!",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cinemax",
    "channelNumber": 208,
    "name": "Cinemax",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "comet",
    "channelNumber": 209,
    "name": "Comet",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "estrella-tv",
    "channelNumber": 210,
    "name": "Estrella TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "galavision",
    "channelNumber": 211,
    "name": "Galavisión",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "gettv",
    "channelNumber": 212,
    "name": "getTV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "grit",
    "channelNumber": 213,
    "name": "Grit",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "m6-films",
    "channelNumber": 214,
    "name": "M6 Films",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mgm-tv",
    "channelNumber": 215,
    "name": "MGM TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "movies",
    "channelNumber": 216,
    "name": "Movies!",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "peacock",
    "channelNumber": 217,
    "name": "Peacock",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "pluto-tv",
    "channelNumber": 218,
    "name": "Pluto TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "rtl-9",
    "channelNumber": 219,
    "name": "RTL 9",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sci-fi",
    "channelNumber": 50,
    "name": "Sci-Fi",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tcm",
    "channelNumber": 221,
    "name": "TCM",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "telemundo",
    "channelNumber": 222,
    "name": "Telemundo",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tubi",
    "channelNumber": 223,
    "name": "Tubi",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "unimas",
    "channelNumber": 224,
    "name": "UniMás",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "univision",
    "channelNumber": 225,
    "name": "Univision",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "13eme-rue",
    "channelNumber": 52,
    "name": "13ème Rue",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "amc",
    "channelNumber": 53,
    "name": "AMC",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "bravo",
    "channelNumber": 54,
    "name": "Bravo",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "freeform",
    "channelNumber": 55,
    "name": "Freeform",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "fx",
    "channelNumber": 56,
    "name": "FX",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "fxx",
    "channelNumber": 57,
    "name": "FXX",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "hallmark-drama",
    "channelNumber": 58,
    "name": "Hallmark Drama",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "hbo",
    "channelNumber": 59,
    "name": "HBO",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "heroes-icons",
    "channelNumber": 60,
    "name": "Heroes & Icons",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ifc",
    "channelNumber": 61,
    "name": "IFC",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ion",
    "channelNumber": 62,
    "name": "Ion",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "lifetime",
    "channelNumber": 63,
    "name": "Lifetime",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mgm-plus",
    "channelNumber": 64,
    "name": "MGM+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "novelas-plus",
    "channelNumber": 30,
    "name": "Novelas+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "paramount-network",
    "channelNumber": 65,
    "name": "Paramount Network",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-premiere",
    "channelNumber": 160,
    "name": "S+ Première",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-avant-premiere",
    "channelNumber": 161,
    "name": "S+ Avant Première",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sundance-tv",
    "channelNumber": 151,
    "name": "Sundance TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "syfy",
    "channelNumber": 51,
    "name": "Syfy",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tbs",
    "channelNumber": 153,
    "name": "TBS",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tf1-series-films",
    "channelNumber": 154,
    "name": "TF1 Séries Films",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tnt",
    "channelNumber": 155,
    "name": "TNT",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "usa-network",
    "channelNumber": 156,
    "name": "USA Network",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "a-plus-kids",
    "channelNumber": 100,
    "name": "A+ Kids",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "boing",
    "channelNumber": 101,
    "name": "Boing",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "boomerang",
    "channelNumber": 102,
    "name": "Boomerang",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "boomerang-plus-1",
    "channelNumber": 103,
    "name": "Boomerang +1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "canal-j",
    "channelNumber": 104,
    "name": "Canal J",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-kids-canalplus",
    "channelNumber": 187,
    "name": "S+ Kids Canal+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cartoonito",
    "channelNumber": 106,
    "name": "Cartoonito",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cartoon-network",
    "channelNumber": 107,
    "name": "Cartoon Network",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "disney-channel",
    "channelNumber": 108,
    "name": "Disney Channel",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "disney-junior",
    "channelNumber": 109,
    "name": "Disney Junior",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "dreamworks",
    "channelNumber": 110,
    "name": "DreamWorks",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "gulli",
    "channelNumber": 111,
    "name": "Gulli",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "gulli-africa",
    "channelNumber": 112,
    "name": "Gulli Africa",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "j-one",
    "channelNumber": 113,
    "name": "J-One",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ludikids",
    "channelNumber": 114,
    "name": "Ludikids",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mangas",
    "channelNumber": 115,
    "name": "Mangas",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nathan-plus",
    "channelNumber": 116,
    "name": "Nathan+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nickelodeon",
    "channelNumber": 117,
    "name": "Nickelodeon",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nickelodeon-junior",
    "channelNumber": 118,
    "name": "Nickelodeon Junior",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nickelodeon-plus-1",
    "channelNumber": 119,
    "name": "Nickelodeon +1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nicktoons",
    "channelNumber": 120,
    "name": "NickToons",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nickelodeon-teen",
    "channelNumber": 121,
    "name": "Nickelodeon Teen",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "okoo",
    "channelNumber": 122,
    "name": "Okoo",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "piwi-plus",
    "channelNumber": 123,
    "name": "Piwi+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "pitchoun-kids-music",
    "channelNumber": 124,
    "name": "Pitchoun Kids Music",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "pitchoun-kids-music-africa",
    "channelNumber": 125,
    "name": "Pitchoun Kids Music Africa",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tv-pitchoun",
    "channelNumber": 126,
    "name": "TV Pitchoun",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "teletoon-plus",
    "channelNumber": 127,
    "name": "Télétoon+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "teletoon-plus-1",
    "channelNumber": 128,
    "name": "Télétoon +1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tiji",
    "channelNumber": 129,
    "name": "TiJi",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tivi5monde",
    "channelNumber": 130,
    "name": "TiVi5MONDE",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "toonami",
    "channelNumber": 131,
    "name": "Toonami",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ducktv",
    "channelNumber": 132,
    "name": "ducktv",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tv-tokyo",
    "channelNumber": 157,
    "name": "TV Tokyo",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "fuji-tv",
    "channelNumber": 158,
    "name": "Fuji TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "warner-tv-next",
    "channelNumber": 133,
    "name": "Warner TV Next",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "peche-sons",
    "channelNumber": 159,
    "name": "Pêche & Sons",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "planete-plus",
    "channelNumber": 184,
    "name": "Planète+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-docs",
    "channelNumber": 162,
    "name": "S+ Docs",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tv5-monde",
    "channelNumber": 23,
    "name": "TV5 Monde",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-prime",
    "channelNumber": 163,
    "name": "S+ Prime",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-cine",
    "channelNumber": 164,
    "name": "S+ Ciné",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-kids",
    "channelNumber": 165,
    "name": "S+ Kids",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-fiction",
    "channelNumber": 166,
    "name": "S+ Fiction",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-channel",
    "channelNumber": 167,
    "name": "S+ Channel",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-music",
    "channelNumber": 168,
    "name": "S+ Music",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-tv",
    "channelNumber": 169,
    "name": "S+ TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-family",
    "channelNumber": 170,
    "name": "S+ Family",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-1",
    "channelNumber": 171,
    "name": "S+ Sport 1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-2",
    "channelNumber": 172,
    "name": "S+ Sport 2",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-3",
    "channelNumber": 173,
    "name": "S+ Sport 3",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-4",
    "channelNumber": 174,
    "name": "S+ Sport 4",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-5",
    "channelNumber": 175,
    "name": "S+ Sport 5",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-6",
    "channelNumber": 176,
    "name": "S+ Sport 6",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-movies",
    "channelNumber": 177,
    "name": "S+ Movies",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-infosport",
    "channelNumber": 178,
    "name": "S+ Infosport",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-infos",
    "channelNumber": 179,
    "name": "S+ Infos",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-media",
    "channelNumber": 180,
    "name": "S+ Media",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-lloliwood",
    "channelNumber": 181,
    "name": "S+ LLOLIWOOD",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-bl",
    "channelNumber": 182,
    "name": "S+ BL",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-jeunesse",
    "channelNumber": 183,
    "name": "S+ Jeunesse",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "berbere-jeunesse",
    "channelNumber": 136,
    "name": "Berbère Jeunesse",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "chaine-pere-noel",
    "channelNumber": 137,
    "name": "La Chaîne du Père Noël",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-box-office",
    "channelNumber": 188,
    "name": "S+ Box Office",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-grand-ecran",
    "channelNumber": 189,
    "name": "S+ Grand Ecran",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-cinema-s",
    "channelNumber": 190,
    "name": "S+ Cinéma(s)",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-sport-360",
    "channelNumber": 191,
    "name": "S+ Sport 360",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-docs-canalplus",
    "channelNumber": 192,
    "name": "S+ Docs Canal+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "s-plus-foot",
    "channelNumber": 193,
    "name": "S+ Foot",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "bein-sports",
    "channelNumber": 85,
    "name": "beIN SPORTS",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "eurosport-1",
    "channelNumber": 86,
    "name": "Eurosport 1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "automoto",
    "channelNumber": 87,
    "name": "Automoto",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "equidia",
    "channelNumber": 88,
    "name": "Equidia",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cine-plus-frisson",
    "channelNumber": 226,
    "name": "Ciné+ Frisson",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cine-plus-emotion",
    "channelNumber": 227,
    "name": "Ciné+ Emotion",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cine-plus-family",
    "channelNumber": 228,
    "name": "Ciné+ Family",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cine-plus-festival",
    "channelNumber": 229,
    "name": "Ciné+ Festival",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cine-plus-classic",
    "channelNumber": 231,
    "name": "Ciné+ Classic",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "polar-plus",
    "channelNumber": 230,
    "name": "POLAR+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "comedie-plus",
    "channelNumber": 232,
    "name": "Comédie+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "paris-premiere",
    "channelNumber": 233,
    "name": "Paris Première",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "teva",
    "channelNumber": 234,
    "name": "Téva",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "serie-club",
    "channelNumber": 235,
    "name": "Série Club",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "showtime",
    "channelNumber": 236,
    "name": "Showtime",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "starz",
    "channelNumber": 237,
    "name": "Starz",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nrj-hits",
    "channelNumber": 238,
    "name": "NRJ Hits",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "europe-2-pop-tv",
    "channelNumber": 239,
    "name": "Europe 2 POP TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "m6-music",
    "channelNumber": 240,
    "name": "M6 Music",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-urban",
    "channelNumber": 241,
    "name": "Trace Urban",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "rfm-tv",
    "channelNumber": 242,
    "name": "RFM TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "deutsche-grammophon-plus",
    "channelNumber": 243,
    "name": "Deutsche Grammophon+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "melody",
    "channelNumber": 244,
    "name": "Melody",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mezzo",
    "channelNumber": 245,
    "name": "Mezzo",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mezzo-live-hd",
    "channelNumber": 246,
    "name": "Mezzo Live HD",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mtv",
    "channelNumber": 247,
    "name": "MTV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-africa",
    "channelNumber": 248,
    "name": "Trace Africa",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-ivoire",
    "channelNumber": 249,
    "name": "Trace Ivoire",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "z-magic",
    "channelNumber": 250,
    "name": "Z Magic",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "seasons",
    "channelNumber": 251,
    "name": "Seasons",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "chasse-et-peche",
    "channelNumber": 252,
    "name": "Chasse et Pêche",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "animaux",
    "channelNumber": 253,
    "name": "Animaux",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cheval-tv",
    "channelNumber": 254,
    "name": "Cheval TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mieux-tv",
    "channelNumber": 255,
    "name": "Mieux TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "dog-cat-tv",
    "channelNumber": 256,
    "name": "Dog & Cat TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "love-nature",
    "channelNumber": 257,
    "name": "Love Nature",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "museum-tv",
    "channelNumber": 258,
    "name": "Museum TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "planete-plus-crime",
    "channelNumber": 259,
    "name": "Planète+ Crime",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "planete-plus-aventure",
    "channelNumber": 260,
    "name": "Planète+ Aventure",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "science-et-vie-tv",
    "channelNumber": 261,
    "name": "Science & Vie TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "toute-l-histoire",
    "channelNumber": 262,
    "name": "Toute l'Histoire",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mgg-tv",
    "channelNumber": 263,
    "name": "MGG TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "golf-plus",
    "channelNumber": 264,
    "name": "GOLF+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "infosport",
    "channelNumber": 265,
    "name": "Infosport",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sport-1",
    "channelNumber": 266,
    "name": "Sport 1",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sport-2",
    "channelNumber": 267,
    "name": "Sport 2",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sport-3",
    "channelNumber": 268,
    "name": "Sport 3",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sport-4",
    "channelNumber": 269,
    "name": "Sport 4",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "la-chaine-meteo",
    "channelNumber": 270,
    "name": "La Chaîne Météo",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "7info",
    "channelNumber": 271,
    "name": "7info",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "abc-news-live",
    "channelNumber": 272,
    "name": "ABC News Live",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "al-jazeera",
    "channelNumber": 273,
    "name": "Al Jazeera",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "bbc-news",
    "channelNumber": 274,
    "name": "BBC News",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "bloomberg-tv",
    "channelNumber": 275,
    "name": "Bloomberg TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-span",
    "channelNumber": 276,
    "name": "C-SPAN",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cbs-news-24-7",
    "channelNumber": 277,
    "name": "CBS News 24/7",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cgtn",
    "channelNumber": 278,
    "name": "CGTN",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cnbc",
    "channelNumber": 279,
    "name": "CNBC",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cnn",
    "channelNumber": 280,
    "name": "CNN",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nbc-news-now",
    "channelNumber": 281,
    "name": "NBC News NOW",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "newsmax",
    "channelNumber": 282,
    "name": "Newsmax",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "newsnation",
    "channelNumber": 283,
    "name": "NewsNation",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nhk-world",
    "channelNumber": 284,
    "name": "NHK World",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "oan",
    "channelNumber": 285,
    "name": "OAN",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sky-news",
    "channelNumber": 286,
    "name": "Sky News",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "the-weather-channel",
    "channelNumber": 287,
    "name": "The Weather Channel",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trt-world",
    "channelNumber": 288,
    "name": "TRT World",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "a-plus",
    "channelNumber": 289,
    "name": "A+",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "m6-international",
    "channelNumber": 290,
    "name": "M6 International",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "maboke-tv",
    "channelNumber": 291,
    "name": "Maboke TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "magc-tv",
    "channelNumber": 292,
    "name": "MAGC TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sunu-yeuf",
    "channelNumber": 293,
    "name": "Sunu Yeuf",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "vifi-tv",
    "channelNumber": 294,
    "name": "VIFI TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "zacu-tv",
    "channelNumber": 295,
    "name": "Zacu TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "zbc",
    "channelNumber": 296,
    "name": "ZBC",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "emci-tv",
    "channelNumber": 297,
    "name": "EMCI TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "esperance-tv",
    "channelNumber": 298,
    "name": "Espérance TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ewtn",
    "channelNumber": 299,
    "name": "EWTN",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "hope-channel",
    "channelNumber": 300,
    "name": "Hope Channel",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "kto",
    "channelNumber": 301,
    "name": "KTO",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "top-chretien",
    "channelNumber": 302,
    "name": "Top Chrétien",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-gospel",
    "channelNumber": 303,
    "name": "Trace Gospel",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cuisines",
    "channelNumber": 304,
    "name": "Cuisines",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nollywood-tv",
    "channelNumber": 305,
    "name": "Nollywood TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nollywood-tv-epic",
    "channelNumber": 306,
    "name": "Nollywood TV Epic",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "passion-bollywood",
    "channelNumber": 307,
    "name": "Passion Bollywood",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "clique-tv",
    "channelNumber": 308,
    "name": "Clique TV",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cine-plus-ocs",
    "channelNumber": 309,
    "name": "Ciné+ OCS",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "redistributionEnabled": false
  }
],\n  // Exact/brand-equivalent matches against the 234-channel StreamLive catalogue.\n  // These are source attachments only; redistribution remains disabled until the physical receiver,\n  // entitlement/authorization, and Sat>IP/HLS gateway are verified.\n  catalogueMatches: [
    { catalogueId: "tf1", satelliteServiceId: "tf1" },
    { catalogueId: "nickelodeon-junior", satelliteServiceId: "nickelodeon-junior-france" },
    { catalogueId: "syfy", satelliteServiceId: "scifi-france" },
    { catalogueId: "action", satelliteServiceId: "action-france" },
    { catalogueId: "trace-urban", satelliteServiceId: "trace-urban-afrique" },
    { catalogueId: "nollywood-tv", satelliteServiceId: "nollywood-tv" },
    { catalogueId: "histoire-tv", satelliteServiceId: "histoire-tv" },
    { catalogueId: "my-media-prime", satelliteServiceId: "my-media-prime" },
  ],
};