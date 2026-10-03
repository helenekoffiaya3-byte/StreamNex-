/** StreamLive satellite mapping: SES-4 / 22.0W. */
export const castSat = {
  "satellite": {
    "name": "SES-4",
    "position": "22.0W",
    "beam": "West Africa",
    "requestedPosition": "Eutelsat 16A / 16.0E",
    "positionVerified": true,
    "publicListingLastVerified": "2026-10-03",
    "note": "Le 11171 V / 45000 fourni initialement correspond aux listings publics de SES-4 à 22.0W. La recherche ci-dessous couvre les principaux transpondeurs TV West Africa du SES-4; une réception physique reste nécessaire."
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
    "requiresDescrambledTs": true,
    "redistributionRequiresAuthorization": true
  },
  "catalogueCoverage": [
    {
      "channelNumber": 1,
      "id": "rti-1",
      "name": "RTI 1",
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-101",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 2,
      "id": "rti-2",
      "name": "RTI 2",
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-102",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 3,
      "id": "la-3",
      "name": "La 3",
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-103",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 4,
      "id": "a-plus-ivoire",
      "name": "A+ Ivoire",
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-105",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 5,
      "id": "life-tv",
      "name": "Life TV",
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-106",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 6,
      "id": "nci",
      "name": "NCI",
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-104",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 185,
      "id": "s-plus-cote-divoire",
      "name": "S+ Côte d’Ivoire",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 186,
      "id": "s-plus",
      "name": "S+",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 14,
      "id": "france-3",
      "name": "France 3",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8703",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 15,
      "id": "france-4",
      "name": "France 4",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8825",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 17,
      "id": "m6",
      "name": "M6",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8501",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 20,
      "id": "tmc",
      "name": "TMC",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8422",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 21,
      "id": "w9",
      "name": "W9",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 47,
      "id": "hln",
      "name": "HLN",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-9",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 49,
      "id": "msnbc",
      "name": "MSNBC",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4002",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4028",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 223,
      "id": "tubi",
      "name": "Tubi",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8224",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 53,
      "id": "amc",
      "name": "AMC",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 65,
      "id": "paramount-network",
      "name": "Paramount Network",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8823",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 155,
      "id": "tnt",
      "name": "TNT",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4001",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 101,
      "id": "boing",
      "name": "Boing",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 108,
      "id": "disney-channel",
      "name": "Disney Channel",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8917",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 113,
      "id": "j-one",
      "name": "J-One",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8423",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 114,
      "id": "ludikids",
      "name": "Ludikids",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8306",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 115,
      "id": "mangas",
      "name": "Mangas",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4017",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 116,
      "id": "nathan-plus",
      "name": "Nathan+",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 117,
      "id": "nickelodeon",
      "name": "Nickelodeon",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 124,
      "id": "pitchoun-kids-music",
      "name": "Pitchoun Kids Music",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 128,
      "id": "teletoon-plus-1",
      "name": "Télétoon +1",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8321",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 130,
      "id": "tivi5monde",
      "name": "TiVi5MONDE",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8502",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 131,
      "id": "toonami",
      "name": "Toonami",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 162,
      "id": "s-plus-docs",
      "name": "S+ Docs",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 163,
      "id": "s-plus-prime",
      "name": "S+ Prime",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 87,
      "id": "automoto",
      "name": "Automoto",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 88,
      "id": "equidia",
      "name": "Equidia",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8225",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 236,
      "id": "showtime",
      "name": "Showtime",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8918",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 246,
      "id": "mezzo-live-hd",
      "name": "Mezzo Live HD",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 249,
      "id": "trace-ivoire",
      "name": "Trace Ivoire",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4004",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 254,
      "id": "cheval-tv",
      "name": "Cheval TV",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 260,
      "id": "planete-plus-aventure",
      "name": "Planète+ Aventure",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8508",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 261,
      "id": "science-et-vie-tv",
      "name": "Science & Vie TV",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8711",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 262,
      "id": "toute-l-histoire",
      "name": "Toute l'Histoire",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4022",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 263,
      "id": "mgg-tv",
      "name": "MGG TV",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8325",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 264,
      "id": "golf-plus",
      "name": "GOLF+",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 266,
      "id": "sport-1",
      "name": "Sport 1",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-clear",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-107",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 272,
      "id": "abc-news-live",
      "name": "ABC News Live",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-10",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 279,
      "id": "cnbc",
      "name": "CNBC",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-5",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 285,
      "id": "oan",
      "name": "OAN",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 290,
      "id": "m6-international",
      "name": "M6 International",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8618",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 292,
      "id": "magc-tv",
      "name": "MAGC TV",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8421",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 294,
      "id": "vifi-tv",
      "name": "VIFI TV",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-4018",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 296,
      "id": "zbc",
      "name": "ZBC",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-61",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 298,
      "id": "esperance-tv",
      "name": "Espérance TV",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8601",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 302,
      "id": "top-chretien",
      "name": "Top Chrétien",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8706",
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 304,
      "id": "cuisines",
      "name": "Cuisines",
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": "sid-8120",
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
      "status": "found-encrypted",
      "satelliteId": "ses-4-22w",
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    },
    {
      "channelNumber": 307,
      "id": "passion-bollywood",
      "name": "Passion Bollywood",
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
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
      "status": "not-found-on-ses-4-22w-public-listings",
      "satelliteId": null,
      "serviceId": null,
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false
    }
  ],
  "catalogueMatches": [
    {
      "catalogueId": "rti-1",
      "catalogueName": "RTI 1",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-101",
      "satelliteServiceName": "RTI 1",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "rti-2",
      "catalogueName": "RTI 2",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-102",
      "satelliteServiceName": "RTI 2",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "la-3",
      "catalogueName": "La 3",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-103",
      "satelliteServiceName": "RTI La 3",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nci",
      "catalogueName": "NCI",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-104",
      "satelliteServiceName": "NCI (La Nouvelle Chaîne Ivoirienne)",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "a-plus-ivoire",
      "catalogueName": "A+ Ivoire",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-105",
      "satelliteServiceName": "A+ Ivoire",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "life-tv",
      "catalogueName": "Life TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-106",
      "satelliteServiceName": "Life TV Ivory Coast",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "7info",
      "catalogueName": "7info",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-107",
      "satelliteServiceName": "7info",
      "transponder": {
        "frequencyMHz": 3749,
        "polarization": "L",
        "symbolRateKsym": 45830,
        "fec": "2/3",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "13eme-rue",
      "catalogueName": "13ème Rue",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8224",
      "satelliteServiceName": "13ème Rue",
      "transponder": {
        "frequencyMHz": 10986,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "serie-club",
      "catalogueName": "Série Club",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8225",
      "satelliteServiceName": "Série Club",
      "transponder": {
        "frequencyMHz": 10986,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "toute-l-histoire",
      "catalogueName": "Toute l'Histoire",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4022",
      "satelliteServiceName": "Toute lHistoire",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "telemundo",
      "catalogueName": "Telemundo",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4028",
      "satelliteServiceName": "Telemundo Africa",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "zacu-tv",
      "catalogueName": "Zacu TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4018",
      "satelliteServiceName": "Zacu TV",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "mangas",
      "catalogueName": "Mangas",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4017",
      "satelliteServiceName": "Mangas",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "a-plus-kids",
      "catalogueName": "A+ Kids",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4001",
      "satelliteServiceName": "A+ Kids",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "ab1",
      "catalogueName": "AB1",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4002",
      "satelliteServiceName": "AB 1",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "animaux",
      "catalogueName": "Animaux",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4004",
      "satelliteServiceName": "Animaux",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nci",
      "catalogueName": "NCI",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-4003",
      "satelliteServiceName": "NCI (La Nouvelle Chaîne Ivoirienne)",
      "transponder": {
        "frequencyMHz": 11551,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "action",
      "catalogueName": "Action",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8923",
      "satelliteServiceName": "Action (France)",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "c-plus-action",
      "catalogueName": "C+ Action",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8925",
      "satelliteServiceName": "Canal + Action Centre",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "c-plus-cinema",
      "catalogueName": "C+ Cinema",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8904",
      "satelliteServiceName": "Canal + Cinéma Centre",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "c-plus-family",
      "catalogueName": "C+ Family",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8909",
      "satelliteServiceName": "Canal + Family Centre",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "c-plus-magic",
      "catalogueName": "C+ Magic",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8907",
      "satelliteServiceName": "Canal + Magic",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "c-plus-pop",
      "catalogueName": "C+ Pop",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8922",
      "satelliteServiceName": "Canal + Pop",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tf1",
      "catalogueName": "TF1",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8903",
      "satelliteServiceName": "TF 1",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nickelodeon-junior",
      "catalogueName": "Nickelodeon Junior",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8905",
      "satelliteServiceName": "Nickelodeon Junior France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "eurosport-1",
      "catalogueName": "Eurosport 1",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Eurosport 1 France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "sci-fi",
      "catalogueName": "Sci-Fi",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8916",
      "satelliteServiceName": "SciFi France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "gulli-africa",
      "catalogueName": "Gulli Africa",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8917",
      "satelliteServiceName": "Gulli Africa",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "mezzo",
      "catalogueName": "Mezzo",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8918",
      "satelliteServiceName": "Mezzo",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "trace-urban",
      "catalogueName": "Trace Urban",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8919",
      "satelliteServiceName": "Trace Urban Afrique",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "histoire",
      "catalogueName": "Histoire",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8926",
      "satelliteServiceName": "Histoire TV",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nollywood-tv",
      "catalogueName": "Nollywood TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8927",
      "satelliteServiceName": "Nollywood TV",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "boomerang",
      "catalogueName": "Boomerang",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8930",
      "satelliteServiceName": "Boomerang France",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "pacis-tv",
      "catalogueName": "Pacis TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8913",
      "satelliteServiceName": "Pacis TV",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "my-media-prime",
      "catalogueName": "My Media Prime",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8914",
      "satelliteServiceName": "My Media Prime",
      "transponder": {
        "frequencyMHz": 11171,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nathan-plus",
      "catalogueName": "Nathan+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Nathan +",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "piwi-plus",
      "catalogueName": "Piwi+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Piwi+",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "planete-plus",
      "catalogueName": "Planète+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Planète+",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "teletoon-plus",
      "catalogueName": "Télétoon+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Télétoon+",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tfx",
      "catalogueName": "TFX",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "TFX",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "trace-africa",
      "catalogueName": "Trace Africa",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Trace Africa",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tv5-monde",
      "catalogueName": "TV5 Monde",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "TV5 Monde Afrique",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "france-24",
      "catalogueName": "France 24",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "France 24 Français",
      "transponder": {
        "frequencyMHz": 11051,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "cartoon-network",
      "catalogueName": "Cartoon Network",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Cartoon Network France",
      "transponder": {
        "frequencyMHz": 11111,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nickelodeon",
      "catalogueName": "Nickelodeon",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Nickelodeon Africa",
      "transponder": {
        "frequencyMHz": 11111,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "novelas-plus",
      "catalogueName": "Novelas+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Novelas TV",
      "transponder": {
        "frequencyMHz": 11611,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tf1-series-films",
      "catalogueName": "TF1 Séries Films",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8823",
      "satelliteServiceName": "TF1 Séries Films",
      "transponder": {
        "frequencyMHz": 11611,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "france-2",
      "catalogueName": "France 2",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "France 2",
      "transponder": {
        "frequencyMHz": 11611,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "france-5",
      "catalogueName": "France 5",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8825",
      "satelliteServiceName": "France 5",
      "transponder": {
        "frequencyMHz": 11611,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "rtl-9",
      "catalogueName": "RTL 9",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "RTL 9",
      "transponder": {
        "frequencyMHz": 11611,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "infosport",
      "catalogueName": "Infosport",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Infosport+",
      "transponder": {
        "frequencyMHz": 11611,
        "polarization": "V",
        "symbolRateKsym": 45000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nhk-world",
      "catalogueName": "NHK World",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-5",
      "satelliteServiceName": "NHK World Japan",
      "transponder": {
        "frequencyMHz": 11671,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "5/6",
        "system": "DVB-S/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "i24news",
      "catalogueName": "i24NEWS",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-9",
      "satelliteServiceName": "I24 News (French)",
      "transponder": {
        "frequencyMHz": 11671,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "5/6",
        "system": "DVB-S/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "cgtn",
      "catalogueName": "CGTN",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-10",
      "satelliteServiceName": "CGTN Français",
      "transponder": {
        "frequencyMHz": 11671,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "5/6",
        "system": "DVB-S/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "emci-tv",
      "catalogueName": "EMCI TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-61",
      "satelliteServiceName": "EMCI TV Afrique",
      "transponder": {
        "frequencyMHz": 11671,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "5/6",
        "system": "DVB-S/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "cuisines",
      "catalogueName": "Cuisines",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8120",
      "satelliteServiceName": "Cuisines TV",
      "transponder": {
        "frequencyMHz": 12530,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "novelas-plus",
      "catalogueName": "Novelas+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Novelas+",
      "transponder": {
        "frequencyMHz": 12530,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "a-plus-ivoire",
      "catalogueName": "A+ Ivoire",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8520",
      "satelliteServiceName": "A+ Ivoire",
      "transponder": {
        "frequencyMHz": 12530,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "ludikids",
      "catalogueName": "Ludikids",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8306",
      "satelliteServiceName": "Ludikids",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tiji",
      "catalogueName": "TiJi",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8321",
      "satelliteServiceName": "TiJi France",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "7info",
      "catalogueName": "7info",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8323",
      "satelliteServiceName": "7info",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "mgg-tv",
      "catalogueName": "MGG TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8325",
      "satelliteServiceName": "MGG TV",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "automoto",
      "catalogueName": "Automoto",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Automoto la chaîne",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "sunu-yeuf",
      "catalogueName": "Sunu Yeuf",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8421",
      "satelliteServiceName": "Sunu Yeuf",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tmc",
      "catalogueName": "TMC",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8422",
      "satelliteServiceName": "TMC",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "j-one",
      "catalogueName": "J-One",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8423",
      "satelliteServiceName": "J-One",
      "transponder": {
        "frequencyMHz": 12570,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "arte",
      "catalogueName": "Arte",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Arte Français",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "nollywood-tv-epic",
      "catalogueName": "Nollywood TV Epic",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Nollywood TV Epic",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "planete-plus-crime",
      "catalogueName": "Planète+ Crime",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Planète+ Crime",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "sunu-yeuf",
      "catalogueName": "Sunu Yeuf",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Sunu Yeuf",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tmc",
      "catalogueName": "TMC",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "TMC",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "j-one",
      "catalogueName": "J-One",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "J-One",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "a-plus",
      "catalogueName": "A+",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "A+",
      "transponder": {
        "frequencyMHz": 12610,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "m6",
      "catalogueName": "M6",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8501",
      "satelliteServiceName": "M6",
      "transponder": {
        "frequencyMHz": 12650,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "tivi5monde",
      "catalogueName": "TiVi5MONDE",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8502",
      "satelliteServiceName": "Tivi 5 Monde",
      "transponder": {
        "frequencyMHz": 12650,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "life-tv",
      "catalogueName": "Life TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8503",
      "satelliteServiceName": "Life TV Ivory Coast",
      "transponder": {
        "frequencyMHz": 12650,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "planete-plus-aventure",
      "catalogueName": "Planète+ Aventure",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8508",
      "satelliteServiceName": "Planète+ Aventure",
      "transponder": {
        "frequencyMHz": 12650,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "maboke-tv",
      "catalogueName": "Maboke TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8618",
      "satelliteServiceName": "Maboke TV",
      "transponder": {
        "frequencyMHz": 12650,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "m6-music",
      "catalogueName": "M6 Music",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "MTV Hits France",
      "transponder": {
        "frequencyMHz": 12650,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "kto",
      "catalogueName": "KTO",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8601",
      "satelliteServiceName": "KTO",
      "transponder": {
        "frequencyMHz": 12690,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "trace-africa",
      "catalogueName": "Trace Africa",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Trace Afrikora (Trace Teranga)",
      "transponder": {
        "frequencyMHz": 12690,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "maboke-tv",
      "catalogueName": "Maboke TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": null,
      "satelliteServiceName": "Maboke TV",
      "transponder": {
        "frequencyMHz": 12690,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "france-3",
      "catalogueName": "France 3",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8703",
      "satelliteServiceName": "France 3",
      "transponder": {
        "frequencyMHz": 12730,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "france-24",
      "catalogueName": "France 24",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8709",
      "satelliteServiceName": "France 24 Français",
      "transponder": {
        "frequencyMHz": 12730,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "science-et-vie-tv",
      "catalogueName": "Science & Vie TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8711",
      "satelliteServiceName": "Science & Vie TV",
      "transponder": {
        "frequencyMHz": 12730,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "maboke-tv",
      "catalogueName": "Maboke TV",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8720",
      "satelliteServiceName": "Maboke TV",
      "transponder": {
        "frequencyMHz": 12730,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    },
    {
      "catalogueId": "trace-gospel",
      "catalogueName": "Trace Gospel",
      "satelliteId": "ses-4-22w",
      "satelliteServiceId": "sid-8706",
      "satelliteServiceName": "Trace Gospel",
      "transponder": {
        "frequencyMHz": 12730,
        "polarization": "V",
        "symbolRateKsym": 30000,
        "fec": "3/4",
        "system": "DVB-S2/QPSK"
      },
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "sourceVerified": false,
      "physicalReceptionVerified": false,
      "redistributionEnabled": false,
      "matchBasis": "public-satellite-listing"
    }
  ],
  "note": "Cette configuration cartographie les correspondances publiques du catalogue vers SES-4. Elle ne fournit aucune clé CAS, ne contourne aucun chiffrement et n'active aucun flux HLS. Les services cryptés restent des candidats de réception soumis à abonnement/entitlement et autorisation de redistribution.",
  "services": [
    {
      "id": "sid-101",
      "name": "RTI 1",
      "catalogueId": "rti-1",
      "status": "discovered-clear",
      "sid": 101,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-102",
      "name": "RTI 2",
      "catalogueId": "rti-2",
      "status": "discovered-clear",
      "sid": 102,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-103",
      "name": "RTI La 3",
      "catalogueId": "la-3",
      "status": "discovered-clear",
      "sid": 103,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-104",
      "name": "NCI (La Nouvelle Chaîne Ivoirienne)",
      "catalogueId": "nci",
      "status": "discovered-clear",
      "sid": 104,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-105",
      "name": "A+ Ivoire",
      "catalogueId": "a-plus-ivoire",
      "status": "discovered-clear",
      "sid": 105,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-106",
      "name": "Life TV Ivory Coast",
      "catalogueId": "life-tv",
      "status": "discovered-clear",
      "sid": 106,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-107",
      "name": "7info",
      "catalogueId": "7info",
      "status": "discovered-clear",
      "sid": 107,
      "frequencyMHz": 3749,
      "polarization": "L",
      "encryption": {
        "scrambled": false,
        "systems": [],
        "authorizationRequired": false
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8224",
      "name": "13ème Rue",
      "catalogueId": "13eme-rue",
      "status": "discovered-encrypted",
      "sid": 8224,
      "frequencyMHz": 10986,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8225",
      "name": "Série Club",
      "catalogueId": "serie-club",
      "status": "discovered-encrypted",
      "sid": 8225,
      "frequencyMHz": 10986,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4022",
      "name": "Toute lHistoire",
      "catalogueId": "toute-l-histoire",
      "status": "discovered-encrypted",
      "sid": 4022,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4028",
      "name": "Telemundo Africa",
      "catalogueId": "telemundo",
      "status": "discovered-encrypted",
      "sid": 4028,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4018",
      "name": "Zacu TV",
      "catalogueId": "zacu-tv",
      "status": "discovered-encrypted",
      "sid": 4018,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4017",
      "name": "Mangas",
      "catalogueId": "mangas",
      "status": "discovered-encrypted",
      "sid": 4017,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4001",
      "name": "A+ Kids",
      "catalogueId": "a-plus-kids",
      "status": "discovered-encrypted",
      "sid": 4001,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4002",
      "name": "AB 1",
      "catalogueId": "ab1",
      "status": "discovered-encrypted",
      "sid": 4002,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4004",
      "name": "Animaux",
      "catalogueId": "animaux",
      "status": "discovered-encrypted",
      "sid": 4004,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-4003",
      "name": "NCI (La Nouvelle Chaîne Ivoirienne)",
      "catalogueId": "nci",
      "status": "discovered-encrypted",
      "sid": 4003,
      "frequencyMHz": 11551,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8923",
      "name": "Action (France)",
      "catalogueId": "action",
      "status": "discovered-encrypted",
      "sid": 8923,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8925",
      "name": "Canal + Action Centre",
      "catalogueId": "c-plus-action",
      "status": "discovered-encrypted",
      "sid": 8925,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8904",
      "name": "Canal + Cinéma Centre",
      "catalogueId": "c-plus-cinema",
      "status": "discovered-encrypted",
      "sid": 8904,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8909",
      "name": "Canal + Family Centre",
      "catalogueId": "c-plus-family",
      "status": "discovered-encrypted",
      "sid": 8909,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8907",
      "name": "Canal + Magic",
      "catalogueId": "c-plus-magic",
      "status": "discovered-encrypted",
      "sid": 8907,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8922",
      "name": "Canal + Pop",
      "catalogueId": "c-plus-pop",
      "status": "discovered-encrypted",
      "sid": 8922,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8903",
      "name": "TF 1",
      "catalogueId": "tf1",
      "status": "discovered-encrypted",
      "sid": 8903,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8905",
      "name": "Nickelodeon Junior France",
      "catalogueId": "nickelodeon-junior",
      "status": "discovered-encrypted",
      "sid": 8905,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "eurosport-1-11171",
      "name": "Eurosport 1 France",
      "catalogueId": "eurosport-1",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8916",
      "name": "SciFi France",
      "catalogueId": "sci-fi",
      "status": "discovered-encrypted",
      "sid": 8916,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8917",
      "name": "Gulli Africa",
      "catalogueId": "gulli-africa",
      "status": "discovered-encrypted",
      "sid": 8917,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8918",
      "name": "Mezzo",
      "catalogueId": "mezzo",
      "status": "discovered-encrypted",
      "sid": 8918,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8919",
      "name": "Trace Urban Afrique",
      "catalogueId": "trace-urban",
      "status": "discovered-encrypted",
      "sid": 8919,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8926",
      "name": "Histoire TV",
      "catalogueId": "histoire",
      "status": "discovered-encrypted",
      "sid": 8926,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8927",
      "name": "Nollywood TV",
      "catalogueId": "nollywood-tv",
      "status": "discovered-encrypted",
      "sid": 8927,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8930",
      "name": "Boomerang France",
      "catalogueId": "boomerang",
      "status": "discovered-encrypted",
      "sid": 8930,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8913",
      "name": "Pacis TV",
      "catalogueId": "pacis-tv",
      "status": "discovered-encrypted",
      "sid": 8913,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8914",
      "name": "My Media Prime",
      "catalogueId": "my-media-prime",
      "status": "discovered-encrypted",
      "sid": 8914,
      "frequencyMHz": 11171,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "nathan-plus-11051",
      "name": "Nathan +",
      "catalogueId": "nathan-plus",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "piwi-plus-11051",
      "name": "Piwi+",
      "catalogueId": "piwi-plus",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "planete-plus-11051",
      "name": "Planète+",
      "catalogueId": "planete-plus",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "teletoon-plus-11051",
      "name": "Télétoon+",
      "catalogueId": "teletoon-plus",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "tfx-11051",
      "name": "TFX",
      "catalogueId": "tfx",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "trace-africa-11051",
      "name": "Trace Africa",
      "catalogueId": "trace-africa",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "tv5-monde-11051",
      "name": "TV5 Monde Afrique",
      "catalogueId": "tv5-monde",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "france-24-11051",
      "name": "France 24 Français",
      "catalogueId": "france-24",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11051,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "cartoon-network-11111",
      "name": "Cartoon Network France",
      "catalogueId": "cartoon-network",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11111,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "nickelodeon-11111",
      "name": "Nickelodeon Africa",
      "catalogueId": "nickelodeon",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11111,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "novelas-plus-11611",
      "name": "Novelas TV",
      "catalogueId": "novelas-plus",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11611,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8823",
      "name": "TF1 Séries Films",
      "catalogueId": "tf1-series-films",
      "status": "discovered-encrypted",
      "sid": 8823,
      "frequencyMHz": 11611,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "france-2-11611",
      "name": "France 2",
      "catalogueId": "france-2",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11611,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8825",
      "name": "France 5",
      "catalogueId": "france-5",
      "status": "discovered-encrypted",
      "sid": 8825,
      "frequencyMHz": 11611,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "rtl-9-11611",
      "name": "RTL 9",
      "catalogueId": "rtl-9",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11611,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "infosport-11611",
      "name": "Infosport+",
      "catalogueId": "infosport",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 11611,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-5",
      "name": "NHK World Japan",
      "catalogueId": "nhk-world",
      "status": "discovered-encrypted",
      "sid": 5,
      "frequencyMHz": 11671,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-9",
      "name": "I24 News (French)",
      "catalogueId": "i24news",
      "status": "discovered-encrypted",
      "sid": 9,
      "frequencyMHz": 11671,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-10",
      "name": "CGTN Français",
      "catalogueId": "cgtn",
      "status": "discovered-encrypted",
      "sid": 10,
      "frequencyMHz": 11671,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-61",
      "name": "EMCI TV Afrique",
      "catalogueId": "emci-tv",
      "status": "discovered-encrypted",
      "sid": 61,
      "frequencyMHz": 11671,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8120",
      "name": "Cuisines TV",
      "catalogueId": "cuisines",
      "status": "discovered-encrypted",
      "sid": 8120,
      "frequencyMHz": 12530,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8520",
      "name": "A+ Ivoire",
      "catalogueId": "a-plus-ivoire",
      "status": "discovered-encrypted",
      "sid": 8520,
      "frequencyMHz": 12530,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8306",
      "name": "Ludikids",
      "catalogueId": "ludikids",
      "status": "discovered-encrypted",
      "sid": 8306,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8321",
      "name": "TiJi France",
      "catalogueId": "tiji",
      "status": "discovered-encrypted",
      "sid": 8321,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8323",
      "name": "7info",
      "catalogueId": "7info",
      "status": "discovered-encrypted",
      "sid": 8323,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8325",
      "name": "MGG TV",
      "catalogueId": "mgg-tv",
      "status": "discovered-encrypted",
      "sid": 8325,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "automoto-12570",
      "name": "Automoto la chaîne",
      "catalogueId": "automoto",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8421",
      "name": "Sunu Yeuf",
      "catalogueId": "sunu-yeuf",
      "status": "discovered-encrypted",
      "sid": 8421,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8422",
      "name": "TMC",
      "catalogueId": "tmc",
      "status": "discovered-encrypted",
      "sid": 8422,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8423",
      "name": "J-One",
      "catalogueId": "j-one",
      "status": "discovered-encrypted",
      "sid": 8423,
      "frequencyMHz": 12570,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "arte-12610",
      "name": "Arte Français",
      "catalogueId": "arte",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "nollywood-tv-epic-12610",
      "name": "Nollywood TV Epic",
      "catalogueId": "nollywood-tv-epic",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "planete-plus-crime-12610",
      "name": "Planète+ Crime",
      "catalogueId": "planete-plus-crime",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sunu-yeuf-12610",
      "name": "Sunu Yeuf",
      "catalogueId": "sunu-yeuf",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "tmc-12610",
      "name": "TMC",
      "catalogueId": "tmc",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "j-one-12610",
      "name": "J-One",
      "catalogueId": "j-one",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "a-plus-12610",
      "name": "A+",
      "catalogueId": "a-plus",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12610,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8501",
      "name": "M6",
      "catalogueId": "m6",
      "status": "discovered-encrypted",
      "sid": 8501,
      "frequencyMHz": 12650,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8502",
      "name": "Tivi 5 Monde",
      "catalogueId": "tivi5monde",
      "status": "discovered-encrypted",
      "sid": 8502,
      "frequencyMHz": 12650,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8503",
      "name": "Life TV Ivory Coast",
      "catalogueId": "life-tv",
      "status": "discovered-encrypted",
      "sid": 8503,
      "frequencyMHz": 12650,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8508",
      "name": "Planète+ Aventure",
      "catalogueId": "planete-plus-aventure",
      "status": "discovered-encrypted",
      "sid": 8508,
      "frequencyMHz": 12650,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8618",
      "name": "Maboke TV",
      "catalogueId": "maboke-tv",
      "status": "discovered-encrypted",
      "sid": 8618,
      "frequencyMHz": 12650,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "m6-music-12650",
      "name": "MTV Hits France",
      "catalogueId": "m6-music",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12650,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8601",
      "name": "KTO",
      "catalogueId": "kto",
      "status": "discovered-encrypted",
      "sid": 8601,
      "frequencyMHz": 12690,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "maboke-tv-12690",
      "name": "Maboke TV",
      "catalogueId": "maboke-tv",
      "status": "discovered-encrypted",
      "sid": null,
      "frequencyMHz": 12690,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8703",
      "name": "France 3",
      "catalogueId": "france-3",
      "status": "discovered-encrypted",
      "sid": 8703,
      "frequencyMHz": 12730,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8709",
      "name": "France 24 Français",
      "catalogueId": "france-24",
      "status": "discovered-encrypted",
      "sid": 8709,
      "frequencyMHz": 12730,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8711",
      "name": "Science & Vie TV",
      "catalogueId": "science-et-vie-tv",
      "status": "discovered-encrypted",
      "sid": 8711,
      "frequencyMHz": 12730,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8720",
      "name": "Maboke TV",
      "catalogueId": "maboke-tv",
      "status": "discovered-encrypted",
      "sid": 8720,
      "frequencyMHz": 12730,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    },
    {
      "id": "sid-8706",
      "name": "Trace Gospel",
      "catalogueId": "trace-gospel",
      "status": "discovered-encrypted",
      "sid": 8706,
      "frequencyMHz": 12730,
      "polarization": "V",
      "encryption": {
        "scrambled": true,
        "systems": [
          "Mediaguard",
          "Nagravision"
        ],
        "authorizationRequired": true
      },
      "redistributionEnabled": false
    }
  ],
  "verification": {
    "source": "Public satellite listings: LyngSat, Sattvinfo",
    "lastVerified": "2026-10-03",
    "transpondersScanned": 13,
    "catalogueCount": 234,
    "catalogueMatchedDistinct": 75,
    "catalogueMatchRecords": 87,
    "physicalReceiverRequired": true,
    "authorizationRequiredForEncryptedServices": true,
    "hlsNotConfiguredByThisMapping": true
  },
  "scanTargets": [
    {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 11111,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6",
      "system": "DVB-S/QPSK",
      "video": "MPEG-2/MPEG-4"
    },
    {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 12690,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    },
    {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4",
      "system": "DVB-S2/QPSK",
      "video": "HEVC"
    }
  ]
};
