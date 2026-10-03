/** StreamLive satellite mapping: SES-4 / 22.0W. */
export const castSat = {
  "satellite": {
    "name": "SES-4",
    "position": "22.0W",
    "beam": "West Africa",
    "requestedPosition": "Eutelsat 16A / 16.0E",
    "positionVerified": true,
    "publicListingLastVerified": "2026-08-26",
    "note": "The supplied 11171 V / 45000 parameters are publicly listed on SES-4 22.0W, not Eutelsat 16A 16.0E."
  },
  "scanTarget": {
    "frequencyMHz": 11171,
    "polarization": "V",
    "symbolRateKsym": 45000,
    "fec": "3/4",
    "system": "DVB-S2/QPSK",
    "video": "HEVC"
  },
  "lnb": {
    "type": "universal",
    "lowOscillatorMHz": 9750,
    "highOscillatorMHz": 10600
  },
  "output": {
    "protocol": "HLS",
    "pathPattern": "/hls/{service}/index.m3u8",
    "requiresDescrambledTs": true
  },
  "catalogueCoverage": [
    {
      "channelNumber": 1,
      "id": "rti-1",
      "name": "RTI 1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 2,
      "id": "rti-2",
      "name": "RTI 2",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 3,
      "id": "la-3",
      "name": "La 3",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 4,
      "id": "a-plus-ivoire",
      "name": "A+ Ivoire",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 5,
      "id": "life-tv",
      "name": "Life TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 6,
      "id": "nci",
      "name": "NCI",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 185,
      "id": "s-plus-cote-divoire",
      "name": "S+ Côte d’Ivoire",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 10,
      "id": "6ter",
      "name": "6ter",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 11,
      "id": "arte",
      "name": "Arte",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 186,
      "id": "s-plus",
      "name": "S+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 13,
      "id": "france-2",
      "name": "France 2",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 14,
      "id": "france-3",
      "name": "France 3",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 15,
      "id": "france-4",
      "name": "France 4",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 16,
      "id": "france-5",
      "name": "France 5",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 17,
      "id": "m6",
      "name": "M6",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 18,
      "id": "tf1",
      "name": "TF1",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8903",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8903,
        "serviceName": "TF 1"
      }
    },
    {
      "channelNumber": 19,
      "id": "tfx",
      "name": "TFX",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 20,
      "id": "tmc",
      "name": "TMC",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 21,
      "id": "w9",
      "name": "W9",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 41,
      "id": "cnn-international",
      "name": "CNN International",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 42,
      "id": "dw",
      "name": "DW",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 43,
      "id": "euronews",
      "name": "Euronews",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 44,
      "id": "fox-business",
      "name": "Fox Business",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 45,
      "id": "fox-news",
      "name": "Fox News",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 22,
      "id": "france-24",
      "name": "France 24",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 47,
      "id": "hln",
      "name": "HLN",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 48,
      "id": "i24news",
      "name": "i24NEWS",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 49,
      "id": "msnbc",
      "name": "MSNBC",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 200,
      "id": "ab1",
      "name": "AB1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 201,
      "id": "action",
      "name": "Action",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8923",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8923,
        "serviceName": "Action (France)"
      }
    },
    {
      "channelNumber": 202,
      "id": "c-plus-action",
      "name": "C+ Action",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8925",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8925,
        "serviceName": "Canal + Action Centre"
      }
    },
    {
      "channelNumber": 203,
      "id": "c-plus-cinema",
      "name": "C+ Cinema",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8904",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8904,
        "serviceName": "Canal + Cinéma Centre"
      }
    },
    {
      "channelNumber": 204,
      "id": "c-plus-family",
      "name": "C+ Family",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8909",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8909,
        "serviceName": "Canal + Family Centre"
      }
    },
    {
      "channelNumber": 205,
      "id": "c-plus-magic",
      "name": "C+ Magic",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8907",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8907,
        "serviceName": "Canal + Magic"
      }
    },
    {
      "channelNumber": 206,
      "id": "c-plus-pop",
      "name": "C+ Pop",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8922",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8922,
        "serviceName": "Canal + Pop"
      }
    },
    {
      "channelNumber": 207,
      "id": "charge",
      "name": "Charge!",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 208,
      "id": "cinemax",
      "name": "Cinemax",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 209,
      "id": "comet",
      "name": "Comet",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 210,
      "id": "estrella-tv",
      "name": "Estrella TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 211,
      "id": "galavision",
      "name": "Galavisión",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 212,
      "id": "gettv",
      "name": "getTV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 213,
      "id": "grit",
      "name": "Grit",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 214,
      "id": "m6-films",
      "name": "M6 Films",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 215,
      "id": "mgm-tv",
      "name": "MGM TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 216,
      "id": "movies",
      "name": "Movies!",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 217,
      "id": "peacock",
      "name": "Peacock",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 218,
      "id": "pluto-tv",
      "name": "Pluto TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 219,
      "id": "rtl-9",
      "name": "RTL 9",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 50,
      "id": "sci-fi",
      "name": "Sci-Fi",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8916",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8916,
        "serviceName": "SciFi France"
      }
    },
    {
      "channelNumber": 221,
      "id": "tcm",
      "name": "TCM",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 222,
      "id": "telemundo",
      "name": "Telemundo",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 223,
      "id": "tubi",
      "name": "Tubi",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 224,
      "id": "unimas",
      "name": "UniMás",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 225,
      "id": "univision",
      "name": "Univision",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 52,
      "id": "13eme-rue",
      "name": "13ème Rue",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 53,
      "id": "amc",
      "name": "AMC",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 54,
      "id": "bravo",
      "name": "Bravo",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 55,
      "id": "freeform",
      "name": "Freeform",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 56,
      "id": "fx",
      "name": "FX",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 57,
      "id": "fxx",
      "name": "FXX",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 58,
      "id": "hallmark-drama",
      "name": "Hallmark Drama",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 59,
      "id": "hbo",
      "name": "HBO",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 60,
      "id": "heroes-icons",
      "name": "Heroes & Icons",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 61,
      "id": "ifc",
      "name": "IFC",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 62,
      "id": "ion",
      "name": "Ion",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 63,
      "id": "lifetime",
      "name": "Lifetime",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 64,
      "id": "mgm-plus",
      "name": "MGM+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 30,
      "id": "novelas-plus",
      "name": "Novelas+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 65,
      "id": "paramount-network",
      "name": "Paramount Network",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 160,
      "id": "s-plus-premiere",
      "name": "S+ Première",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 161,
      "id": "s-plus-avant-premiere",
      "name": "S+ Avant Première",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 151,
      "id": "sundance-tv",
      "name": "Sundance TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 51,
      "id": "syfy",
      "name": "Syfy",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 153,
      "id": "tbs",
      "name": "TBS",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 154,
      "id": "tf1-series-films",
      "name": "TF1 Séries Films",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 155,
      "id": "tnt",
      "name": "TNT",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 156,
      "id": "usa-network",
      "name": "USA Network",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 100,
      "id": "a-plus-kids",
      "name": "A+ Kids",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 101,
      "id": "boing",
      "name": "Boing",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 102,
      "id": "boomerang",
      "name": "Boomerang",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8930",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8930,
        "serviceName": "Boomerang France"
      }
    },
    {
      "channelNumber": 103,
      "id": "boomerang-plus-1",
      "name": "Boomerang +1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 104,
      "id": "canal-j",
      "name": "Canal J",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 187,
      "id": "s-plus-kids-canalplus",
      "name": "S+ Kids Canal+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 106,
      "id": "cartoonito",
      "name": "Cartoonito",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 107,
      "id": "cartoon-network",
      "name": "Cartoon Network",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 108,
      "id": "disney-channel",
      "name": "Disney Channel",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 109,
      "id": "disney-junior",
      "name": "Disney Junior",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 110,
      "id": "dreamworks",
      "name": "DreamWorks",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 111,
      "id": "gulli",
      "name": "Gulli",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 112,
      "id": "gulli-africa",
      "name": "Gulli Africa",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 113,
      "id": "j-one",
      "name": "J-One",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 114,
      "id": "ludikids",
      "name": "Ludikids",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 115,
      "id": "mangas",
      "name": "Mangas",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 116,
      "id": "nathan-plus",
      "name": "Nathan+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 117,
      "id": "nickelodeon",
      "name": "Nickelodeon",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 118,
      "id": "nickelodeon-junior",
      "name": "Nickelodeon Junior",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8905",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8905,
        "serviceName": "Nickelodeon Junior France"
      }
    },
    {
      "channelNumber": 119,
      "id": "nickelodeon-plus-1",
      "name": "Nickelodeon +1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 120,
      "id": "nicktoons",
      "name": "NickToons",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 121,
      "id": "nickelodeon-teen",
      "name": "Nickelodeon Teen",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 122,
      "id": "okoo",
      "name": "Okoo",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 123,
      "id": "piwi-plus",
      "name": "Piwi+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 124,
      "id": "pitchoun-kids-music",
      "name": "Pitchoun Kids Music",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 125,
      "id": "pitchoun-kids-music-africa",
      "name": "Pitchoun Kids Music Africa",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 126,
      "id": "tv-pitchoun",
      "name": "TV Pitchoun",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 127,
      "id": "teletoon-plus",
      "name": "Télétoon+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 128,
      "id": "teletoon-plus-1",
      "name": "Télétoon +1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 129,
      "id": "tiji",
      "name": "TiJi",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 130,
      "id": "tivi5monde",
      "name": "TiVi5MONDE",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 131,
      "id": "toonami",
      "name": "Toonami",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 132,
      "id": "ducktv",
      "name": "ducktv",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 157,
      "id": "tv-tokyo",
      "name": "TV Tokyo",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 158,
      "id": "fuji-tv",
      "name": "Fuji TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 133,
      "id": "warner-tv-next",
      "name": "Warner TV Next",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 159,
      "id": "peche-sons",
      "name": "Pêche & Sons",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 184,
      "id": "planete-plus",
      "name": "Planète+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 162,
      "id": "s-plus-docs",
      "name": "S+ Docs",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 23,
      "id": "tv5-monde",
      "name": "TV5 Monde",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 163,
      "id": "s-plus-prime",
      "name": "S+ Prime",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 164,
      "id": "s-plus-cine",
      "name": "S+ Ciné",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 165,
      "id": "s-plus-kids",
      "name": "S+ Kids",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 166,
      "id": "s-plus-fiction",
      "name": "S+ Fiction",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 167,
      "id": "s-plus-channel",
      "name": "S+ Channel",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 168,
      "id": "s-plus-music",
      "name": "S+ Music",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 169,
      "id": "s-plus-tv",
      "name": "S+ TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 170,
      "id": "s-plus-family",
      "name": "S+ Family",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 171,
      "id": "s-plus-sport-1",
      "name": "S+ Sport 1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 172,
      "id": "s-plus-sport-2",
      "name": "S+ Sport 2",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 173,
      "id": "s-plus-sport-3",
      "name": "S+ Sport 3",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 174,
      "id": "s-plus-sport-4",
      "name": "S+ Sport 4",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 175,
      "id": "s-plus-sport-5",
      "name": "S+ Sport 5",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 176,
      "id": "s-plus-sport-6",
      "name": "S+ Sport 6",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 177,
      "id": "s-plus-movies",
      "name": "S+ Movies",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 178,
      "id": "s-plus-infosport",
      "name": "S+ Infosport",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 179,
      "id": "s-plus-infos",
      "name": "S+ Infos",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 180,
      "id": "s-plus-media",
      "name": "S+ Media",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 181,
      "id": "s-plus-lloliwood",
      "name": "S+ LLOLIWOOD",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 182,
      "id": "s-plus-bl",
      "name": "S+ BL",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 183,
      "id": "s-plus-jeunesse",
      "name": "S+ Jeunesse",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 136,
      "id": "berbere-jeunesse",
      "name": "Berbère Jeunesse",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 137,
      "id": "chaine-pere-noel",
      "name": "La Chaîne du Père Noël",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 188,
      "id": "s-plus-box-office",
      "name": "S+ Box Office",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 189,
      "id": "s-plus-grand-ecran",
      "name": "S+ Grand Ecran",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 190,
      "id": "s-plus-cinema-s",
      "name": "S+ Cinéma(s)",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 191,
      "id": "s-plus-sport-360",
      "name": "S+ Sport 360",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 192,
      "id": "s-plus-docs-canalplus",
      "name": "S+ Docs Canal+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 193,
      "id": "s-plus-foot",
      "name": "S+ Foot",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 85,
      "id": "bein-sports",
      "name": "beIN SPORTS",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 86,
      "id": "eurosport-1",
      "name": "Eurosport 1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 87,
      "id": "automoto",
      "name": "Automoto",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 88,
      "id": "equidia",
      "name": "Equidia",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 226,
      "id": "cine-plus-frisson",
      "name": "Ciné+ Frisson",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 227,
      "id": "cine-plus-emotion",
      "name": "Ciné+ Emotion",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 228,
      "id": "cine-plus-family",
      "name": "Ciné+ Family",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 229,
      "id": "cine-plus-festival",
      "name": "Ciné+ Festival",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 231,
      "id": "cine-plus-classic",
      "name": "Ciné+ Classic",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 230,
      "id": "polar-plus",
      "name": "POLAR+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 232,
      "id": "comedie-plus",
      "name": "Comédie+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 233,
      "id": "paris-premiere",
      "name": "Paris Première",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 234,
      "id": "teva",
      "name": "Téva",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 235,
      "id": "serie-club",
      "name": "Série Club",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 236,
      "id": "showtime",
      "name": "Showtime",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 237,
      "id": "starz",
      "name": "Starz",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 238,
      "id": "nrj-hits",
      "name": "NRJ Hits",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 239,
      "id": "europe-2-pop-tv",
      "name": "Europe 2 POP TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 240,
      "id": "m6-music",
      "name": "M6 Music",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 241,
      "id": "trace-urban",
      "name": "Trace Urban",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8919",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8919,
        "serviceName": "Trace Urban Afrique"
      }
    },
    {
      "channelNumber": 242,
      "id": "rfm-tv",
      "name": "RFM TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 243,
      "id": "deutsche-grammophon-plus",
      "name": "Deutsche Grammophon+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 244,
      "id": "melody",
      "name": "Melody",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 245,
      "id": "mezzo",
      "name": "Mezzo",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 246,
      "id": "mezzo-live-hd",
      "name": "Mezzo Live HD",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 247,
      "id": "mtv",
      "name": "MTV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 248,
      "id": "trace-africa",
      "name": "Trace Africa",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 249,
      "id": "trace-ivoire",
      "name": "Trace Ivoire",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 250,
      "id": "z-magic",
      "name": "Z Magic",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 251,
      "id": "seasons",
      "name": "Seasons",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 252,
      "id": "chasse-et-peche",
      "name": "Chasse et Pêche",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 253,
      "id": "animaux",
      "name": "Animaux",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 254,
      "id": "cheval-tv",
      "name": "Cheval TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 255,
      "id": "mieux-tv",
      "name": "Mieux TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 256,
      "id": "dog-cat-tv",
      "name": "Dog & Cat TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 257,
      "id": "love-nature",
      "name": "Love Nature",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 258,
      "id": "museum-tv",
      "name": "Museum TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 259,
      "id": "planete-plus-crime",
      "name": "Planète+ Crime",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 260,
      "id": "planete-plus-aventure",
      "name": "Planète+ Aventure",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 261,
      "id": "science-et-vie-tv",
      "name": "Science & Vie TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 262,
      "id": "toute-l-histoire",
      "name": "Toute l'Histoire",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 263,
      "id": "mgg-tv",
      "name": "MGG TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 264,
      "id": "golf-plus",
      "name": "GOLF+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 265,
      "id": "infosport",
      "name": "Infosport",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 266,
      "id": "sport-1",
      "name": "Sport 1",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 267,
      "id": "sport-2",
      "name": "Sport 2",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 268,
      "id": "sport-3",
      "name": "Sport 3",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 269,
      "id": "sport-4",
      "name": "Sport 4",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 270,
      "id": "la-chaine-meteo",
      "name": "La Chaîne Météo",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 271,
      "id": "7info",
      "name": "7info",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 272,
      "id": "abc-news-live",
      "name": "ABC News Live",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 273,
      "id": "al-jazeera",
      "name": "Al Jazeera",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 274,
      "id": "bbc-news",
      "name": "BBC News",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 275,
      "id": "bloomberg-tv",
      "name": "Bloomberg TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 276,
      "id": "c-span",
      "name": "C-SPAN",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 277,
      "id": "cbs-news-24-7",
      "name": "CBS News 24/7",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 278,
      "id": "cgtn",
      "name": "CGTN",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 279,
      "id": "cnbc",
      "name": "CNBC",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 280,
      "id": "cnn",
      "name": "CNN",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 281,
      "id": "nbc-news-now",
      "name": "NBC News NOW",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 282,
      "id": "newsmax",
      "name": "Newsmax",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 283,
      "id": "newsnation",
      "name": "NewsNation",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 284,
      "id": "nhk-world",
      "name": "NHK World",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 285,
      "id": "oan",
      "name": "OAN",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 286,
      "id": "sky-news",
      "name": "Sky News",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 287,
      "id": "the-weather-channel",
      "name": "The Weather Channel",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 288,
      "id": "trt-world",
      "name": "TRT World",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 289,
      "id": "a-plus",
      "name": "A+",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 290,
      "id": "m6-international",
      "name": "M6 International",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 291,
      "id": "maboke-tv",
      "name": "Maboke TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 292,
      "id": "magc-tv",
      "name": "MAGC TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 293,
      "id": "sunu-yeuf",
      "name": "Sunu Yeuf",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 294,
      "id": "vifi-tv",
      "name": "VIFI TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 295,
      "id": "zacu-tv",
      "name": "Zacu TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 296,
      "id": "zbc",
      "name": "ZBC",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 297,
      "id": "emci-tv",
      "name": "EMCI TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 298,
      "id": "esperance-tv",
      "name": "Espérance TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 299,
      "id": "ewtn",
      "name": "EWTN",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 300,
      "id": "hope-channel",
      "name": "Hope Channel",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 301,
      "id": "kto",
      "name": "KTO",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 302,
      "id": "top-chretien",
      "name": "Top Chrétien",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 303,
      "id": "trace-gospel",
      "name": "Trace Gospel",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 304,
      "id": "cuisines",
      "name": "Cuisines",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 305,
      "id": "nollywood-tv",
      "name": "Nollywood TV",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8927",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK",
        "video": "HEVC",
        "sid": 8927,
        "serviceName": "Nollywood TV"
      }
    },
    {
      "channelNumber": 306,
      "id": "nollywood-tv-epic",
      "name": "Nollywood TV Epic",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 307,
      "id": "passion-bollywood",
      "name": "Passion Bollywood",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 308,
      "id": "clique-tv",
      "name": "Clique TV",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 309,
      "id": "cine-plus-ocs",
      "name": "Ciné+ OCS",
      "status": "not-found-on-11171-v-45000-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    }
  ],
  "catalogueMatches": [
    {
      "catalogueId": "tf1",
      "catalogueName": "TF1",
      "satelliteServiceId": "sid-8903",
      "satelliteServiceName": "TF 1",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "c-plus-cinema",
      "catalogueName": "C+ Cinema",
      "satelliteServiceId": "sid-8904",
      "satelliteServiceName": "Canal + Cinéma Centre",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "nickelodeon-junior",
      "catalogueName": "Nickelodeon Junior",
      "satelliteServiceId": "sid-8905",
      "satelliteServiceName": "Nickelodeon Junior France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "c-plus-magic",
      "catalogueName": "C+ Magic",
      "satelliteServiceId": "sid-8907",
      "satelliteServiceName": "Canal + Magic",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "c-plus-family",
      "catalogueName": "C+ Family",
      "satelliteServiceId": "sid-8909",
      "satelliteServiceName": "Canal + Family Centre",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "c-plus-pop",
      "catalogueName": "C+ Pop",
      "satelliteServiceId": "sid-8922",
      "satelliteServiceName": "Canal + Pop",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "action",
      "catalogueName": "Action",
      "satelliteServiceId": "sid-8923",
      "satelliteServiceName": "Action (France)",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "c-plus-action",
      "catalogueName": "C+ Action",
      "satelliteServiceId": "sid-8925",
      "satelliteServiceName": "Canal + Action Centre",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "sci-fi",
      "catalogueName": "Sci-Fi",
      "satelliteServiceId": "sid-8916",
      "satelliteServiceName": "SciFi France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "trace-urban",
      "catalogueName": "Trace Urban",
      "satelliteServiceId": "sid-8919",
      "satelliteServiceName": "Trace Urban Afrique",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "nollywood-tv",
      "catalogueName": "Nollywood TV",
      "satelliteServiceId": "sid-8927",
      "satelliteServiceName": "Nollywood TV",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "catalogueId": "boomerang",
      "catalogueName": "Boomerang",
      "satelliteServiceId": "sid-8930",
      "satelliteServiceName": "Boomerang France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4"
      },
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    }
  ],
  "note": "Public satellite listings are reception/source candidates only. Physical receiver verification and redistribution authorization are still required; no access keys are stored here.",
  "services": [
    {
      "id": "sid-8903",
      "name": "TF 1",
      "catalogueId": "tf1",
      "status": "discovered-encrypted",
      "sid": 8903,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8904",
      "name": "Canal + Cinéma Centre",
      "catalogueId": "c-plus-cinema",
      "status": "discovered-encrypted",
      "sid": 8904,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8905",
      "name": "Nickelodeon Junior France",
      "catalogueId": "nickelodeon-junior",
      "status": "discovered-encrypted",
      "sid": 8905,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8907",
      "name": "Canal + Magic",
      "catalogueId": "c-plus-magic",
      "status": "discovered-encrypted",
      "sid": 8907,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8909",
      "name": "Canal + Family Centre",
      "catalogueId": "c-plus-family",
      "status": "discovered-encrypted",
      "sid": 8909,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8922",
      "name": "Canal + Pop",
      "catalogueId": "c-plus-pop",
      "status": "discovered-encrypted",
      "sid": 8922,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8923",
      "name": "Action (France)",
      "catalogueId": "action",
      "status": "discovered-encrypted",
      "sid": 8923,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8925",
      "name": "Canal + Action Centre",
      "catalogueId": "c-plus-action",
      "status": "discovered-encrypted",
      "sid": 8925,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8916",
      "name": "SciFi France",
      "catalogueId": "sci-fi",
      "status": "discovered-encrypted",
      "sid": 8916,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8919",
      "name": "Trace Urban Afrique",
      "catalogueId": "trace-urban",
      "status": "discovered-encrypted",
      "sid": 8919,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8927",
      "name": "Nollywood TV",
      "catalogueId": "nollywood-tv",
      "status": "discovered-encrypted",
      "sid": 8927,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8930",
      "name": "Boomerang France",
      "catalogueId": "boomerang",
      "status": "discovered-encrypted",
      "sid": 8930,
      "encryption": {
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "scrambled": true
      },
      "redistributionEnabled": false
    }
  ],
  "verification": {
    "source": "Public satellite listings",
    "lastVerified": "2026-08-26",
    "transponderMatches": 12,
    "catalogueCount": 234,
    "physicalReceiverRequired": true,
    "authorizationRequiredForAllMatchedServices": true
  }
};
