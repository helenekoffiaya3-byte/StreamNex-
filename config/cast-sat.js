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
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8206",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 2,
    "id": "rti-2",
    "name": "RTI 2",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8210",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 3,
    "id": "la-3",
    "name": "La 3",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8327",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 4,
    "id": "a-plus-ivoire",
    "name": "A+ Ivoire",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8520",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 5,
    "id": "life-tv",
    "name": "Life TV",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8503",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 6,
    "id": "nci",
    "name": "NCI",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-4003",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-8402",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-8813",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 19,
    "id": "tfx",
    "name": "TFX",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-4133",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-4124",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 201,
    "id": "action",
    "name": "Action",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-4116",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 205,
    "id": "c-plus-magic",
    "name": "C+ Magic",
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
    "serviceId": "sid-8811",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-4129",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "status": "pending-satellite-match",
    "satelliteId": null,
    "serviceId": null,
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
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
    "serviceId": "sid-4205",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11111,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 116,
    "id": "nathan-plus",
    "name": "Nathan+",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-4122",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 117,
    "id": "nickelodeon",
    "name": "Nickelodeon",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-4212",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11111,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
    "serviceId": "sid-4130",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-4132",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-4131",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-4135",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-8906",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 87,
    "id": "automoto",
    "name": "Automoto",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8326",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "status": "pending-satellite-match",
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
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-4134",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-8412",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "serviceId": "sid-8814",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8323",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    }
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
    "status": "pending-satellite-match",
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12690,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12690,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 305,
    "id": "nollywood-tv",
    "name": "Nollywood TV",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-4128",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
  },
  {
    "channelNumber": 306,
    "id": "nollywood-tv-epic",
    "name": "Nollywood TV Epic",
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "sid-8409",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    }
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
    "status": "found-encrypted",
    "satelliteId": "ses-4-22w",
    "serviceId": "service-clique-tv",
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false,
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    }
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
    "satelliteServiceId": "sid-8206",
    "satelliteServiceName": "RTI 1",
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8206,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "rti-2",
    "catalogueName": "RTI 2",
    "satelliteServiceId": "sid-8210",
    "satelliteServiceName": "RTI 2",
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8210,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "la-3",
    "catalogueName": "La 3",
    "satelliteServiceId": "sid-8327",
    "satelliteServiceName": "RTI La 3",
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8327,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "a-plus-ivoire",
    "catalogueName": "A+ Ivoire",
    "satelliteServiceId": "sid-8520",
    "satelliteServiceName": "A+ Ivoire",
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8520,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "life-tv",
    "catalogueName": "Life TV",
    "satelliteServiceId": "sid-8503",
    "satelliteServiceName": "Life TV Ivory Coast",
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8503,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nci",
    "catalogueName": "NCI",
    "satelliteServiceId": "sid-4003",
    "satelliteServiceName": "NCI (La Nouvelle Chaîne Ivoirienne)",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4003,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "arte",
    "catalogueName": "Arte",
    "satelliteServiceId": "sid-8402",
    "satelliteServiceName": "Arte Français",
    "transponder": {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8402,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-2",
    "catalogueName": "France 2",
    "satelliteServiceId": "sid-8813",
    "satelliteServiceName": "France 2",
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8813,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-3",
    "catalogueName": "France 3",
    "satelliteServiceId": "sid-8703",
    "satelliteServiceName": "France 3",
    "transponder": {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8703,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-5",
    "catalogueName": "France 5",
    "satelliteServiceId": "sid-8825",
    "satelliteServiceName": "France 5",
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8825,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "m6",
    "catalogueName": "M6",
    "satelliteServiceId": "sid-8501",
    "satelliteServiceName": "M6",
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8501,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tf1",
    "catalogueName": "TF1",
    "satelliteServiceId": "sid-8903",
    "satelliteServiceName": "TF1",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8903,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tfx",
    "catalogueName": "TFX",
    "satelliteServiceId": "sid-4133",
    "satelliteServiceName": "TFX",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4133,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tmc",
    "catalogueName": "TMC",
    "satelliteServiceId": "sid-8422",
    "satelliteServiceName": "TMC",
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8422,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "france-24",
    "catalogueName": "France 24",
    "satelliteServiceId": "sid-4124",
    "satelliteServiceName": "France 24 Français",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4124,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "i24news",
    "catalogueName": "i24NEWS",
    "satelliteServiceId": "sid-9",
    "satelliteServiceName": "I24 News (French)",
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    },
    "serviceId": 9,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ab1",
    "catalogueName": "AB1",
    "satelliteServiceId": "sid-4002",
    "satelliteServiceName": "AB 1",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4002,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "action",
    "catalogueName": "Action",
    "satelliteServiceId": "sid-4116",
    "satelliteServiceName": "Action",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4116,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-action",
    "catalogueName": "C+ Action",
    "satelliteServiceId": "sid-8925",
    "satelliteServiceName": "Canal+ Action Centre",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8925,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-cinema",
    "catalogueName": "C+ Cinema",
    "satelliteServiceId": "sid-8904",
    "satelliteServiceName": "Canal+ Cinéma Centre",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8904,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-family",
    "catalogueName": "C+ Family",
    "satelliteServiceId": "sid-8909",
    "satelliteServiceName": "Canal+ Family Centre",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8909,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "c-plus-pop",
    "catalogueName": "C+ Pop",
    "satelliteServiceId": "sid-8922",
    "satelliteServiceName": "Canal+ Pop Centre",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8922,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "13eme-rue",
    "catalogueName": "13ème Rue",
    "satelliteServiceId": "sid-8224",
    "satelliteServiceName": "13ème Rue",
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8224,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nathan-plus",
    "catalogueName": "Nathan+",
    "satelliteServiceId": "sid-4122",
    "satelliteServiceName": "Nathan +",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4122,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nollywood-tv",
    "catalogueName": "Nollywood TV",
    "satelliteServiceId": "sid-4128",
    "satelliteServiceName": "Nollywood TV",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4128,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "piwi-plus",
    "catalogueName": "Piwi+",
    "satelliteServiceId": "sid-4130",
    "satelliteServiceName": "Piwi+",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4130,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "planete-plus",
    "catalogueName": "Planète+",
    "satelliteServiceId": "sid-4131",
    "satelliteServiceName": "Planète+",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4131,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "teletoon-plus",
    "catalogueName": "Télétoon+",
    "satelliteServiceId": "sid-4132",
    "satelliteServiceName": "TéléToon+",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4132,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-africa",
    "catalogueName": "Trace Africa",
    "satelliteServiceId": "sid-4134",
    "satelliteServiceName": "Trace Africa",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4134,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tv5-monde",
    "catalogueName": "TV5 Monde",
    "satelliteServiceId": "sid-4135",
    "satelliteServiceName": "TV5 Monde Afrique",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4135,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "a-plus-kids",
    "catalogueName": "A+ Kids",
    "satelliteServiceId": "sid-4001",
    "satelliteServiceName": "A+ Kids",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4001,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "animaux",
    "catalogueName": "Animaux",
    "satelliteServiceId": "sid-4004",
    "satelliteServiceName": "Animaux",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4004,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mangas",
    "catalogueName": "Mangas",
    "satelliteServiceId": "sid-4017",
    "satelliteServiceName": "Mangas",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4017,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "zacu-tv",
    "catalogueName": "Zacu TV",
    "satelliteServiceId": "sid-4018",
    "satelliteServiceName": "Zacu TV",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4018,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "toute-l-histoire",
    "catalogueName": "Toute l'Histoire",
    "satelliteServiceId": "sid-4022",
    "satelliteServiceName": "Toute lHistoire",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4022,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "telemundo",
    "catalogueName": "Telemundo",
    "satelliteServiceId": "sid-4028",
    "satelliteServiceName": "Telemundo Africa",
    "transponder": {
      "frequencyMHz": 11551,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4028,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nhk-world",
    "catalogueName": "NHK World",
    "satelliteServiceId": "sid-5",
    "satelliteServiceName": "NHK World Japan",
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    },
    "serviceId": 5,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cgtn",
    "catalogueName": "CGTN",
    "satelliteServiceId": "sid-10",
    "satelliteServiceName": "CGTN Français",
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    },
    "serviceId": 10,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "emci-tv",
    "catalogueName": "EMCI TV",
    "satelliteServiceId": "sid-61",
    "satelliteServiceName": "EMCI TV Afrique",
    "transponder": {
      "frequencyMHz": 11671,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "5/6"
    },
    "serviceId": 61,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "7info",
    "catalogueName": "7info",
    "satelliteServiceId": "sid-8323",
    "satelliteServiceName": "7info",
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8323,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "ludikids",
    "catalogueName": "Ludikids",
    "satelliteServiceId": "sid-8306",
    "satelliteServiceName": "Ludikids",
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8306,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tiji",
    "catalogueName": "TiJi",
    "satelliteServiceId": "sid-8321",
    "satelliteServiceName": "TiJi France",
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8321,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mgg-tv",
    "catalogueName": "MGG TV",
    "satelliteServiceId": "sid-8325",
    "satelliteServiceName": "MGG TV",
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8325,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "automoto",
    "catalogueName": "Automoto",
    "satelliteServiceId": "sid-8326",
    "satelliteServiceName": "Automoto la chaîne",
    "transponder": {
      "frequencyMHz": 12570,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8326,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nollywood-tv-epic",
    "catalogueName": "Nollywood TV Epic",
    "satelliteServiceId": "sid-8409",
    "satelliteServiceName": "Nollywood TV Epic",
    "transponder": {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8409,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "planete-plus-crime",
    "catalogueName": "Planète+ Crime",
    "satelliteServiceId": "sid-8412",
    "satelliteServiceName": "Planète+ Crime",
    "transponder": {
      "frequencyMHz": 12610,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8412,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "sunu-yeuf",
    "catalogueName": "Sunu Yeuf",
    "satelliteServiceId": "sid-8421",
    "satelliteServiceName": "Sunu Yeuf",
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8421,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "j-one",
    "catalogueName": "J-One",
    "satelliteServiceId": "sid-8423",
    "satelliteServiceName": "J-One",
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8423,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "kto",
    "catalogueName": "KTO",
    "satelliteServiceId": "sid-8601",
    "satelliteServiceName": "KTO",
    "transponder": {
      "frequencyMHz": 12690,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8601,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "maboke-tv",
    "catalogueName": "Maboke TV",
    "satelliteServiceId": "sid-8618",
    "satelliteServiceName": "Maboke TV",
    "transponder": {
      "frequencyMHz": 12690,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8618,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-gospel",
    "catalogueName": "Trace Gospel",
    "satelliteServiceId": "sid-8706",
    "satelliteServiceName": "Trace Gospel",
    "transponder": {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8706,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "science-et-vie-tv",
    "catalogueName": "Science & Vie TV",
    "satelliteServiceId": "sid-8711",
    "satelliteServiceName": "Science et Vie",
    "transponder": {
      "frequencyMHz": 12730,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8711,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "clique-tv",
    "catalogueName": "Clique TV",
    "satelliteServiceId": "clique-tv",
      "satelliteServiceName": "Clique TV",
      "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "matchType": "exact",
    "encryption": {
        "systems": [
          "Nagravision"
        ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "gulli-africa",
    "catalogueName": "Gulli Africa",
    "satelliteServiceId": "sid-8917",
    "satelliteServiceName": "Gulli Africa",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8917,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "mezzo",
    "catalogueName": "Mezzo",
    "satelliteServiceId": "sid-8918",
    "satelliteServiceName": "Mezzo",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8918,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "trace-urban",
    "catalogueName": "Trace Urban",
    "satelliteServiceId": "sid-8919",
    "satelliteServiceName": "Trace Urban",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8919,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "eurosport-1",
    "catalogueName": "Eurosport 1",
    "satelliteServiceId": "sid-8906",
    "satelliteServiceName": "Eurosport 1 France",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8906,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cuisines",
    "catalogueName": "Cuisines",
    "satelliteServiceId": "sid-8120",
    "satelliteServiceName": "Cuisines TV",
    "transponder": {
      "frequencyMHz": 12530,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8120,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "rtl-9",
    "catalogueName": "RTL 9",
    "satelliteServiceId": "sid-8811",
    "satelliteServiceName": "RTL 9",
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8811,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
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
    "serviceId": 8916,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tf1-series-films",
    "catalogueName": "TF1 Séries Films",
    "satelliteServiceId": "sid-8823",
    "satelliteServiceName": "TF1 Séries Films",
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8823,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nickelodeon-junior",
    "catalogueName": "Nickelodeon Junior",
    "satelliteServiceId": "sid-8905",
    "satelliteServiceName": "Nickelodeon Junior",
    "transponder": {
      "frequencyMHz": 11171,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8905,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "tivi5monde",
    "catalogueName": "TiVi5MONDE",
    "satelliteServiceId": "sid-8502",
    "satelliteServiceName": "Tivi 5 Monde",
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8502,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "serie-club",
    "catalogueName": "Série Club",
    "satelliteServiceId": "sid-8225",
    "satelliteServiceName": "Série Club",
    "transponder": {
      "frequencyMHz": 10986,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 8225,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "planete-plus-aventure",
    "catalogueName": "Planète+ Aventure",
    "satelliteServiceId": "sid-8508",
    "satelliteServiceName": "Planète+ Aventure",
    "transponder": {
      "frequencyMHz": 12650,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8508,
    "matchType": "exact",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "cartoon-network",
    "catalogueName": "Cartoon Network",
    "satelliteServiceId": "sid-4205",
    "satelliteServiceName": "Cartoon Network France",
    "transponder": {
      "frequencyMHz": 11111,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 4205,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "nickelodeon",
    "catalogueName": "Nickelodeon",
    "satelliteServiceId": "sid-4212",
    "satelliteServiceName": "Nickelodeon Africa",
    "transponder": {
      "frequencyMHz": 11111,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 4212,
    "matchType": "regional-feed",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "novelas-plus",
    "catalogueName": "Novelas+",
    "satelliteServiceId": "sid-4129",
    "satelliteServiceName": "Novelas TV",
    "transponder": {
      "frequencyMHz": 11051,
      "polarization": "V",
      "symbolRateKsym": 45000,
      "fec": "3/4"
    },
    "serviceId": 4129,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
  },
  {
    "catalogueId": "infosport",
    "catalogueName": "Infosport",
    "satelliteServiceId": "sid-8814",
    "satelliteServiceName": "Infosport+",
    "transponder": {
      "frequencyMHz": 11611,
      "polarization": "V",
      "symbolRateKsym": 30000,
      "fec": "3/4"
    },
    "serviceId": 8814,
    "matchType": "brand-variant",
    "encryption": {
      "systems": [
        "Mediaguard",
        "Nagravision"
      ],
      "authorizationRequired": true,
      "scrambled": true
    },
    "sourceVerified": false,
    "physicalReceptionVerified": false,
    "redistributionEnabled": false
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

  /**
   * Additional satellite search results for catalogue services not established
   * on SES-4. These are reception/source candidates from current public listings.
   * They do not enable redistribution and do not contain CAS keys.
   */
  satelliteSearches: [
    {
      satelliteId: "eutelsat-16a-16e",
      satellite: "EUTELSAT 16A",
      position: "16.0E",
      coverage: "West/Central Africa regional broadcast position",
      source: "Public satellite listings checked 2026-10-03",
      matches: [
        { catalogueId: "cnn-international", serviceName: "CNN International Europe", frequencyMHz: 11595.25, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 140, encryption: ["Conax", "Irdeto 2", "Nagravision 3"], status: "discovered-encrypted" },
        { catalogueId: "nickelodeon", serviceName: "Nickelodeon Europe", frequencyMHz: 11231, polarization: "V", symbolRateKsym: 42000, fec: "5/6", sid: 755, encryption: ["Conax", "Irdeto 2", "Nagravision 3", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "mtv", serviceName: "MTV Europe", frequencyMHz: 10886.8, polarization: "H", symbolRateKsym: 30000, fec: "3/5", sid: 3200, encryption: ["Conax", "Irdeto 2", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "hbo", serviceName: "HBO 3 HD Central Europe", frequencyMHz: 11094.5, polarization: "V", symbolRateKsym: 27500, fec: "4/5", sid: 1212, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "disney-channel", serviceName: "Disney Channel Croatia", frequencyMHz: 11512.3, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 50, encryption: ["Conax", "Irdeto 2", "Nagravision 3", "VideoGuard"], status: "regional-variant" },
        { catalogueId: "disney-junior", serviceName: "Disney Junior Croatia", frequencyMHz: 11595.25, polarization: "V", symbolRateKsym: 30000, fec: "3/4", sid: 70, encryption: ["Conax", "Irdeto 2", "Nagravision 3"], status: "regional-variant" },
        { catalogueId: "cartoonito", serviceName: "Cartoonito", frequencyMHz: 11512.3, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 51, encryption: ["Irdeto 2", "Nagravision 3"], status: "regional-variant" },
        { catalogueId: "cartoon-network", serviceName: "Cartoon Network Russia & South Eastern Europe", frequencyMHz: 11512.3, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 53, encryption: ["Conax", "Irdeto 2", "Nagravision 3"], status: "regional-variant" }
      ],
      redistributionEnabled: false
    },
    {
      satelliteId: "eshail-2-26e",
      satellite: "Es'hail 2 / Badr neighbourhood",
      position: "26.0E",
      coverage: "EMENA",
      source: "Public satellite listings checked 2026-10-03",
      matches: [
        { catalogueId: "disney-channel", serviceName: "Disney Channel HD Middle-East & Africa", frequencyMHz: 11350, polarization: "V", symbolRateKsym: 27500, fec: "2/3", sid: 40209, encryption: ["Irdeto 2", "VideoGuard"], status: "regional-variant" },
        { catalogueId: "disney-junior", serviceName: "Disney Junior Middle-East & Africa", frequencyMHz: 11350, polarization: "V", symbolRateKsym: 27500, fec: "2/3", sid: 40210, encryption: ["Irdeto 2", "VideoGuard"], status: "regional-variant" },
        { catalogueId: "bein-sports", serviceName: "BeIN Sports 1 HD", frequencyMHz: 10810, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 8401, encryption: ["Irdeto 2", "VideoGuard"], status: "discovered-encrypted" }
      ],
      redistributionEnabled: false
    },
    {
      satelliteId: "eutelsat-36d-36e",
      satellite: "EUTELSAT 36D",
      position: "36.0E",
      coverage: "Africa / Eurasia",
      source: "Public satellite listings checked 2026-10-03",
      matches: [
        { catalogueId: "disney-junior", serviceName: "Disney Jr. Central Europe", frequencyMHz: 11345.8, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 106, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "disney-channel", serviceName: "Disney Channel Greece", frequencyMHz: 11345.8, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 107, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "fx", serviceName: "FX HD Greece", frequencyMHz: 11345.8, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 103, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "national-geographic", serviceName: "National Geographic HD Greece", frequencyMHz: 11345.8, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 105, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "baby-tv", serviceName: "Baby TV HD Europe", frequencyMHz: 11345.8, polarization: "H", symbolRateKsym: 30000, fec: "3/4", sid: 101, encryption: ["Irdeto 2"], status: "regional-variant" }
      ],
      redistributionEnabled: false
    },
    {
      satelliteId: "hotbird-13e-13e",
      satellite: "Hot Bird 13F / 13G",
      position: "13.0E",
      coverage: "Europe / international distribution; West Africa reception requires footprint verification",
      source: "Public satellite listings checked 2026-10-03",
      matches: [
        { catalogueId: "dw", serviceName: "DW English HD", frequencyMHz: 11727.6, polarization: "V", symbolRateKsym: 29900, fec: "3/4", sid: 13101, encryption: [], status: "discovered-clear" },
        { catalogueId: "bbc-news", serviceName: "BBC News", frequencyMHz: 11727.6, polarization: "V", symbolRateKsym: 29900, fec: "3/4", sid: 13104, encryption: [], status: "discovered-clear" },
        { catalogueId: "cnn-international", serviceName: "CNN International Europe", frequencyMHz: 12034.4, polarization: "V", symbolRateKsym: 29900, fec: "3/4", sid: 11211, encryption: ["VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "fox-news", serviceName: "Fox News", frequencyMHz: 12034.4, polarization: "V", symbolRateKsym: 29900, fec: "3/4", sid: 103, encryption: ["PowerVu"], status: "discovered-encrypted" },
        { catalogueId: "sky-news", serviceName: "Sky News International", frequencyMHz: 12034.4, polarization: "V", symbolRateKsym: 29900, fec: "3/4", sid: 8108, encryption: ["VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "france-24", serviceName: "France 24 HD", frequencyMHz: 11565.8, polarization: "H", symbolRateKsym: 29900, fec: "3/4", sid: 808, encryption: [], status: "discovered-clear" },
        { catalogueId: "trt-world", serviceName: "TRT World HD", frequencyMHz: 11565.8, polarization: "H", symbolRateKsym: 29900, fec: "3/4", sid: 803, encryption: [], status: "discovered-clear" },
        { catalogueId: "cgtn", serviceName: "CGTN", frequencyMHz: 11585, polarization: "V", symbolRateKsym: 27500, fec: "5/6", sid: 872, encryption: [], status: "discovered-clear" }
      ],
      redistributionEnabled: false
    },
    {
      satelliteId: "eutelsat-7c-7e",
      satellite: "EUTELSAT 7C",
      position: "7.0E",
      coverage: "Africa beam",
      source: "LyngSat public multiplex listing checked 2026-10-03",
      transponder: {
        frequencyMHz: 10971,
        polarization: "H",
        symbolRateKsym: 30000,
        fec: "2/3",
        system: "DVB-S2/8PSK"
      },
      matches: [
        { catalogueId: "amc", serviceName: "AMC Series", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 146, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "nickelodeon", serviceName: "Nickelodeon Africa", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 220, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "boing", serviceName: "Boing Africa", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 221, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "fox-news", serviceName: "Fox News Channel", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 232, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "msnbc", serviceName: "MS Now International", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 233, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "france-24", serviceName: "France 24 English", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 234, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "al-jazeera", serviceName: "Aljazeera Channel", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 253, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "bbc-news", serviceName: "BBC News Africa", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 230, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "al-jazeera", serviceName: "Aljazeera English", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 231, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "cnn-international", serviceName: "CNN International Europe", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 239, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "france-24", serviceName: "France 24 Français", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 240, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "mtv", serviceName: "MTV Base info card", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 172, encryption: ["Nagravision"], status: "discovered-encrypted" }
      ],
      redistributionEnabled: false,
      note: "The listing also contains Baby TV Europe and National Geographic South Africa, but those services are not present under those exact catalogue IDs in the current StreamLive catalogue."
    },
    {
      satelliteId: "eutelsat-8-west-b-8w",
      satellite: "Eutelsat 8 West B",
      position: "8.0W",
      coverage: "MENA; African reception depends on beam/footprint",
      source: "LyngSat public listings checked 2026-10-03",
      matches: [
        { catalogueId: "bein-sports", serviceName: "BeIn Sports", frequencyMHz: 11054, polarization: "H", symbolRateKsym: 27500, fec: "2/3", encryption: [], status: "discovered-clear-listing" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 1", frequencyMHz: 11013, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 2001, encryption: ["Irdeto", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 2", frequencyMHz: 11013, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 2002, encryption: ["Irdeto", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 3", frequencyMHz: 11013, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 2003, encryption: ["Irdeto", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 4", frequencyMHz: 11054, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 2102, encryption: ["Irdeto", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 6", frequencyMHz: 11054, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 2101, encryption: ["Irdeto", "VideoGuard"], status: "discovered-encrypted" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 8", frequencyMHz: 11054, polarization: "H", symbolRateKsym: 27500, fec: "2/3", sid: 2103, encryption: ["Irdeto", "VideoGuard"], status: "discovered-encrypted" }
      ],
      redistributionEnabled: false,
      note: "These are satellite reception candidates; the public listing does not establish a West Africa footprint or redistribution authorization."
    },
    {
      satelliteId: "eutelsat-8-west-b-8w-dw",
      satellite: "Eutelsat 8 West B",
      position: "8.0W",
      coverage: "C-band; physical reception and footprint must be verified",
      source: "LyngSat public free-TV listing checked 2026-10-03",
      matches: [
        { catalogueId: "dw", serviceName: "DW English", frequencyMHz: 3732, polarization: "L", symbolRateKsym: 40410, fec: "2/3", encryption: [], status: "discovered-clear" }
      ],
      redistributionEnabled: false
    },
    {
      satelliteId: "ses-5-5e",
      satellite: "SES-5",
      position: "5.0E",
      coverage: "Sub-Saharan Africa",
      source: "LyngSat StarSat package checked 2026-10-03",
      matches: [
        { catalogueId: "rti-2", serviceName: "RTI 2", frequencyMHz: 11747, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7705, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "zbc", serviceName: "ZBC TV (Tanzania)", frequencyMHz: 11747, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7711, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "rti-1", serviceName: "RTI 1", frequencyMHz: 11900, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7128, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "ewtn", serviceName: "EWTN Africa - Asia", frequencyMHz: 11900, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7130, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "fox-news", serviceName: "Fox News Channel", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8315, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "msnbc", serviceName: "MS Now International", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8316, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "tnt", serviceName: "TNT Africa", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8318, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "cartoon-network", serviceName: "Cartoon Network Africa", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8321, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "rfm-tv", serviceName: "RFM TV", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8322, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "bbc-news", serviceName: "BBC News Africa", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8326, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "al-jazeera", serviceName: "Aljazeera English", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8327, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "sky-news", serviceName: "Sky News International", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8328, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "bloomberg-tv", serviceName: "Bloomberg TV Africa", frequencyMHz: 11958, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 8329, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "disney-junior", serviceName: "Disney Jr Portugal", frequencyMHz: 11785, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7922, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "disney-channel", serviceName: "Disney Channel Portugal", frequencyMHz: 11785, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7923, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "france-2", serviceName: "France 2", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7603, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "france-3", serviceName: "France 3", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7604, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "tfx", serviceName: "TFX", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7612, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "emci-tv", serviceName: "EMCI TV Afrique", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7613, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "kto", serviceName: "KTO", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7621, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "canal-j", serviceName: "Canal J", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7627, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "warner-tv-next", serviceName: "Warner TV Next", frequencyMHz: 11900, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 7105, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "france-24", serviceName: "France 24 Français", frequencyMHz: 12380, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7205, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "tv5-monde", serviceName: "TV5Monde Afrique", frequencyMHz: 12380, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7221, encryption: ["Conax"], status: "discovered-encrypted" },
        { catalogueId: "cartoonito", serviceName: "Cartoonito France", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7622, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "boomerang", serviceName: "Boomerang France", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7601, encryption: ["Conax"], status: "regional-variant" }
      ],
      redistributionEnabled: false,
      note: "Les variantes régionales restent distinctes de la chaîne catalogue tant que le feed exact n'est pas vérifié physiquement."
    },
    {
      satelliteId: "belintersat-1-51-5e",
      satellite: "Belintersat 1",
      position: "51.5E",
      coverage: "Africa Ku",
      source: "LyngSat Metro Digital TV public listing checked 2026-10-03",
      matches: [
        { catalogueId: "disney-channel", serviceName: "Disney Channel South Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1020, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "nickelodeon", serviceName: "Nickelodeon Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1021, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "bravo", serviceName: "Bravo Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1022, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "cartoon-network", serviceName: "Cartoon Network Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1023, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "cartoonito", serviceName: "Cartoonito Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1024, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "nickelodeon-junior", serviceName: "Nick Jr Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1025, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "disney-junior", serviceName: "Disney Jr South Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1026, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "telemundo", serviceName: "Telemundo Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1029, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "tnt", serviceName: "TNT Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1030, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "cnn-international", serviceName: "CNN International Europe", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1031, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "al-jazeera", serviceName: "Aljazeera English", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1032, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "trace-urban", serviceName: "Trace Urban South Africa", frequencyMHz: 10973, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1038, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "bbc-news", serviceName: "BBC News Africa", frequencyMHz: 11042, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 8326, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "sky-news", serviceName: "Sky News International", frequencyMHz: 11042, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 8328, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "bloomberg-tv", serviceName: "Bloomberg TV Africa", frequencyMHz: 11042, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 8329, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "ewtn", serviceName: "EWTN Africa - Asia", frequencyMHz: 11042, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 1105, encryption: ["Cryptoguard"], status: "regional-variant" },
        { catalogueId: "rfm-tv", serviceName: "RFM TV", frequencyMHz: 11042, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 8322, encryption: ["Cryptoguard"], status: "regional-variant" }
      ],
      redistributionEnabled: false,
      note: "Ces services sont des variantes/régionalisations africaines listées sur un bouquet à accès conditionnel. Leur présence satellite ne prouve ni l'accès au décryptage ni l'autorisation de redistribution HLS."
    },
    {
      satelliteId: "eutelsat-5-west-b-5w",
      satellite: "EUTELSAT 5 West B",
      position: "5.0W",
      coverage: "Transalpine / Africa coverage advertised; West Africa reception must be verified for the specific beam",
      source: "KingOfSat/LyngSat public listings checked 2026-10-03",
      matches: [
        { catalogueId: "rtl-9", serviceName: "RTL 9", frequencyMHz: 11512, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "mangas", serviceName: "Mangas", frequencyMHz: 11512, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "ab1", serviceName: "AB1", frequencyMHz: 11512, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "automoto", serviceName: "Automoto la chaîne", frequencyMHz: 11512, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "france-4", serviceName: "France 4", frequencyMHz: 11554, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "arte", serviceName: "ARTE Français", frequencyMHz: 11096, polarization: "H", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "6ter", serviceName: "6ter", frequencyMHz: 11096, polarization: "H", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "kto", serviceName: "KTO", frequencyMHz: 11096, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: [], status: "discovered-clear" },
        { catalogueId: "tv5-monde", serviceName: "TV5Monde France Belgique Suisse Monaco", frequencyMHz: 10972, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "tf1-series-films", serviceName: "TF1 Séries Films", frequencyMHz: 11471, polarization: "V", symbolRateKsym: 29950, fec: "3/4", encryption: ["Viaccess"], status: "discovered-encrypted" }
      ],
      redistributionEnabled: false,
      note: "Ces services sont des présences de bouquet/listing; la couverture vers la Côte d’Ivoire et l’autorisation de redistribution doivent être vérifiées séparément."
    },
    {
      satelliteId: "eutelsat-36d-36e-africa",
      satellite: "EUTELSAT 36D",
      position: "36.0E",
      coverage: "Sub-Sahara Africa",
      source: "KingOfSat public listings checked 2026-10-03",
      matches: [
        { catalogueId: "disney-channel", serviceName: "Disney Channel South Africa", frequencyMHz: 12054, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 213, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "disney-junior", serviceName: "Disney Junior South Africa", frequencyMHz: 11747, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 1406, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "nickelodeon", serviceName: "Nickelodeon Africa", frequencyMHz: 11766, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 1911, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "nickelodeon-junior", serviceName: "Nick Jr Africa", frequencyMHz: 11938, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 507, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "nicktoons", serviceName: "Nick Toons Africa", frequencyMHz: 11785, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 4005, encryption: ["Irdeto 2"], status: "regional-variant" },
        { catalogueId: "discovery-channel", serviceName: "Discovery Channel HD Middle-East & Africa", frequencyMHz: 11996, polarization: "V", symbolRateKsym: 27500, fec: "3/4", sid: 1001, encryption: ["Irdeto 2"], status: "regional-variant" }
      ],
      redistributionEnabled: false,
      note: "Les variantes régionales africaines sont conservées comme candidats séparés; elles ne remplacent pas automatiquement le feed exact du catalogue."
    },
    {
      satelliteId: "eutelsat-36d-36e-expanded",
      satellite: "EUTELSAT 36D",
      position: "36.0E",
      coverage: "Sub-Sahara Africa / South Africa beam candidates",
      source: "LyngSat public Eutelsat 36D listings checked 2026-10-03",
      matches: [
        { catalogueId: "france-2", serviceName: "France 2", frequencyMHz: 11304, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2506, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "france-3", serviceName: "France 3", frequencyMHz: 11304, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2507, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "france-5", serviceName: "France 5", frequencyMHz: 11304, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2508, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "histoire", serviceName: "Histoire TV", frequencyMHz: 11304, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2502, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "france-24", serviceName: "France 24 Français", frequencyMHz: 11346, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2321, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "al-jazeera", serviceName: "Aljazeera English", frequencyMHz: 11388, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2414, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "bbc-news", serviceName: "BBC News Africa", frequencyMHz: 11221, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2115, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "bloomberg-tv", serviceName: "Bloomberg TV Africa", frequencyMHz: 11221, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2114, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "disney-junior", serviceName: "Disney Jr Portugal", frequencyMHz: 11221, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2116, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "tiji", serviceName: "Tiji", frequencyMHz: 11388, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2407, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "disney-channel", serviceName: "Disney Channel Portugal", frequencyMHz: 11388, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2411, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "national-geographic-wild", serviceName: "National Geographic Wild South Africa", frequencyMHz: 11388, polarization: "V", symbolRateKsym: 30000, fec: "5/6", sid: 2412, encryption: ["Nagravision"], status: "regional-variant" }
      ],
      redistributionEnabled: false,
      note: "Ces entrées sont des présences satellite documentées. Les variantes régionales restent distinctes du feed catalogue exact et la réception en Côte d'Ivoire doit être vérifiée physiquement."
    },
    {
      satelliteId: "eutelsat-7c-7e-africa",
      satellite: "EUTELSAT 7C",
      position: "7.0E",
      coverage: "Africa beam",
      source: "LyngSat public listings checked 2026-10-03",
      matches: [
        { catalogueId: "cnn-international", serviceName: "CNN International Europe", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 239, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "france-24", serviceName: "France 24 Français", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 240, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "bbc-news", serviceName: "BBC News Africa", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 230, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "al-jazeera", serviceName: "Aljazeera English", frequencyMHz: 11106, polarization: "V", symbolRateKsym: 45000, fec: "5/6", sid: 231, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "fox-news", serviceName: "Fox News Channel", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 232, encryption: ["Nagravision"], status: "discovered-encrypted" },
        { catalogueId: "msnbc", serviceName: "MS Now International", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 233, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "nickelodeon", serviceName: "Nickelodeon Africa", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 220, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "boing", serviceName: "Boing Africa", frequencyMHz: 10971, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 221, encryption: ["Nagravision"], status: "regional-variant" },
        { catalogueId: "pitchoun-kids-music", serviceName: "Pitchoun Kids Music", frequencyMHz: 11606, polarization: "V", symbolRateKsym: 30000, fec: "3/4", sid: 212, encryption: ["StreamGuard"], status: "discovered-encrypted" }
      ],
      redistributionEnabled: false,
      note: "Les chaînes africaines/régionales sont conservées comme variantes lorsqu'elles ne correspondent pas exactement au feed du catalogue."
    },
    {
      satelliteId: "eutelsat-16a-16e-canal-reunion-extra",
      satellite: "Eutelsat 16A",
      position: "16.0E",
      coverage: "South East Africa beam",
      source: "LyngSat Canal+ Réunion public listing checked 2026-10-03",
      matches: [
        { catalogueId: "equidia", serviceName: "Equidia", frequencyMHz: 10845, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 5406, encryption: ["Mediaguard"], status: "discovered-encrypted" },
        { catalogueId: "automoto", serviceName: "Automoto la chaîne", frequencyMHz: 11471, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 5102, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "bein-sports", serviceName: "BeIn Sports 1 France", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 95, encryption: ["Mediaguard", "Viaccess"], status: "regional-variant" },
        { catalogueId: "cine-plus-frisson", serviceName: "Ciné+ Frisson", frequencyMHz: 11471, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 5108, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "cine-plus-emotion", serviceName: "Ciné+ Émotion", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 2289, encryption: ["Mediaguard", "Nagravision", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "cine-plus-family", serviceName: "Ciné+ Family", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 2230, encryption: ["Mediaguard", "Nagravision", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "cine-plus-festival", serviceName: "Ciné+ Festival", frequencyMHz: 11471, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 5107, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "cine-plus-classic", serviceName: "Ciné+ Classic", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 151, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "cine-plus-ocs", serviceName: "OCS", frequencyMHz: 11471, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 5109, encryption: ["Mediaguard", "Viaccess"], status: "regional-variant" }
      ],
      redistributionEnabled: false,
      note: "Les services du bouquet Réunion sont des variantes régionales ou des services documentés sur le faisceau; la réception en Côte d'Ivoire et les droits de redistribution restent à vérifier."
    },
    {
      satelliteId: "eutelsat-16a-16e-africa",
      satellite: "Eutelsat 16A",
      position: "16.0E",
      coverage: "Africa / South-East Africa beams",
      source: "LyngSat public listings checked 2026-10-03",
      matches: [
        { catalogueId: "m6", serviceName: "M6", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 103, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "6ter", serviceName: "6ter", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 104, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "w9", serviceName: "W9", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 114, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "teva", serviceName: "Téva", frequencyMHz: 10928, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 113, encryption: ["Mediaguard", "Viaccess"], status: "discovered-encrypted" },
        { catalogueId: "a-plus", serviceName: "A+", frequencyMHz: 11637, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 32, encryption: ["Mediaguard"], status: "discovered-encrypted" },
        { catalogueId: "13eme-rue", serviceName: "13ème Rue", frequencyMHz: 11637, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 5301, encryption: ["Mediaguard"], status: "discovered-encrypted" },
        { catalogueId: "novelas-plus", serviceName: "Novelas+", frequencyMHz: 11512, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 30, encryption: ["Mediaguard"], status: "discovered-encrypted" },
        { catalogueId: "nollywood-tv", serviceName: "Nollywood TV", frequencyMHz: 10887, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 31, encryption: ["Mediaguard"], status: "discovered-encrypted" },
        { catalogueId: "canal-j", serviceName: "Canal J", frequencyMHz: 12303, polarization: "H", symbolRateKsym: 27500, fec: "3/4", sid: 7627, encryption: ["Conax"], status: "regional-variant" },
        { catalogueId: "sport-1", serviceName: "Canal + Sport 1", frequencyMHz: 11637, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 6, encryption: ["Mediaguard"], status: "regional-variant" },
        { catalogueId: "sport-2", serviceName: "Canal + Sport 2", frequencyMHz: 11637, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 7, encryption: ["Mediaguard"], status: "regional-variant" },
        { catalogueId: "sport-3", serviceName: "Canal + Sport 3", frequencyMHz: 11637, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 8, encryption: ["Mediaguard"], status: "regional-variant" },
        { catalogueId: "sport-4", serviceName: "Canal + Sport 4", frequencyMHz: 11512, polarization: "H", symbolRateKsym: 30000, fec: "2/3", sid: 9, encryption: ["Mediaguard"], status: "regional-variant" }
      ],
      redistributionEnabled: false,
      note: "Les services Canal+ Réunion sont des variantes régionales; ils ne remplacent pas automatiquement les chaînes métropolitaines du catalogue."
    }
  ],
  "additionalSatelliteMatches": [
    {
      "satelliteId": "eutelsat-16a-16e-parabole-reunion",
      "satellite": "Eutelsat 16A",
      "position": "16.0E",
      "beam": "South East Africa",
      "source": "LyngSat public listings checked 2026-10-03",
      "matches": [
        { "catalogueId": "6ter", "serviceName": "6ter", "frequencyMHz": 10928, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard", "Viaccess"], "status": "discovered-encrypted" },
        { "catalogueId": "w9", "serviceName": "W9", "frequencyMHz": 10928, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard", "Viaccess"], "status": "discovered-encrypted" },
        { "catalogueId": "tmc", "serviceName": "TMC", "frequencyMHz": 10928, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard", "Viaccess"], "status": "discovered-encrypted" },
        { "catalogueId": "bein-sports", "serviceName": "BeIn Sports 1 France", "frequencyMHz": 10928, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard", "Viaccess"], "status": "regional-variant" },
        { "catalogueId": "equidia", "serviceName": "Equidia", "frequencyMHz": 10845, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "discovered-encrypted" },
        { "catalogueId": "gulli", "serviceName": "Gulli", "frequencyMHz": 10887, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "discovered-encrypted" },
        { "catalogueId": "nickelodeon", "serviceName": "Nickelodeon France", "frequencyMHz": 10845, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "regional-variant" },
        { "catalogueId": "nickelodeon-junior", "serviceName": "Nickelodeon Junior France", "frequencyMHz": 11637, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "regional-variant" },
        { "catalogueId": "teletoon-plus", "serviceName": "TéléToon +", "frequencyMHz": 11512, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "discovered-encrypted" },
        { "catalogueId": "ludikids", "serviceName": "Ludikids", "frequencyMHz": 11471, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "discovered-encrypted" },
        { "catalogueId": "trace-urban", "serviceName": "Trace Urban Afrique", "frequencyMHz": 11471, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard", "Viaccess"], "status": "regional-variant" },
        { "catalogueId": "rfm-tv", "serviceName": "RFM TV", "frequencyMHz": 10845, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "discovered-encrypted" },
        { "catalogueId": "seasons", "serviceName": "Seasons", "frequencyMHz": 10845, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "discovered-encrypted" },
        { "catalogueId": "chasse-et-peche", "serviceName": "Chasse & Pêche", "frequencyMHz": 11596, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Viaccess"], "status": "discovered-encrypted" },
        { "catalogueId": "eurosport-1", "serviceName": "Eurosport 1 France", "frequencyMHz": 11471, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "regional-variant" },
        { "catalogueId": "planete-plus-aventure", "serviceName": "Planète+ Aventure", "frequencyMHz": 10845, "polarization": "H", "symbolRateKsym": 30000, "fec": "2/3", "encryption": ["Mediaguard"], "status": "regional-variant" }
      ],
      "redistributionEnabled": false,
      "physicalReceptionVerified": false,
      "note": "Présences documentées dans les listings publics; les feeds Réunion/South East Africa sont conservés comme candidats et ne remplacent pas automatiquement un feed exact destiné à la Côte d'Ivoire."
    }
  ],
  "satelliteScanPlan": [
    {
      "satelliteId": "ses-4-22w",
      "name": "SES-4",
      "position": "22.0W",
      "priority": 1,
      "status": "scanned",
      "role": "West Africa / Canal+ candidate pool"
    },
    {
      "satelliteId": "eutelsat-16a-16e",
      "name": "EUTELSAT 16A",
      "position": "16.0E",
      "priority": 2,
      "status": "candidate-mapped",
      "role": "West/Central Africa and Francophone Africa"
    },
    {
      "satelliteId": "eutelsat-7b-7c-7e",
      "name": "EUTELSAT 7B/7C",
      "position": "7.0E",
      "priority": 3,
      "status": "scan-configured",
      "role": "Sub-Saharan Africa / English-speaking Africa"
    },
    {
      "satelliteId": "eutelsat-36c-36d-36e",
      "name": "EUTELSAT 36C/36D",
      "position": "36.0E",
      "priority": 4,
      "status": "scan-configured",
      "role": "Sub-Saharan Africa / DStv and ZAP"
    },
    {
      "satelliteId": "belintersat-1-51-5e",
      "name": "Belintersat 1",
      "position": "51.5E",
      "priority": 5,
      "status": "scan-configured",
      "role": "Africa Ku candidate services"
    },
    {
      "satelliteId": "badr-8-26e",
      "name": "BADR / Arabsat",
      "position": "26.0E",
      "priority": 6,
      "status": "scan-configured",
      "role": "North/West Africa and MENA candidate pool"
    },
    {
      "satelliteId": "eutelsat-5-west-b-5w",
      "name": "EUTELSAT 5 West B",
      "position": "5.0W",
      "priority": 7,
      "status": "candidate-mapped",
      "role": "Francophone/Africa candidate pool"
    },
    {
      "satelliteId": "nilesat-7w",
      "name": "NILESAT",
      "position": "7.0W",
      "priority": 8,
      "status": "scan-configured",
      "role": "Africa/MENA candidate pool"
    },
    {
      "satelliteId": "eutelsat-9b-9e",
      "name": "EUTELSAT 9B",
      "position": "9.0E",
      "priority": 9,
      "status": "scan-configured",
      "role": "International/Africa candidate pool"
    },
    {
      "satelliteId": "eutelsat-10a-10e",
      "name": "EUTELSAT 10A",
      "position": "10.0E",
      "priority": 10,
      "status": "scan-configured",
      "role": "African broadcast candidate pool"
    },
    {
      "satelliteId": "express-am8-14w",
      "name": "Express-AM8",
      "position": "14.0W",
      "priority": 11,
      "status": "scan-configured",
      "role": "International candidate pool"
    },
    {
      "satelliteId": "hispasat-30w",
      "name": "Hispasat",
      "position": "30.0W",
      "priority": 12,
      "status": "scan-configured",
      "role": "International candidate pool"
    },
    {
      "satelliteId": "turksat-42-5e",
      "name": "Türksat",
      "position": "42.5E",
      "priority": 13,
      "status": "scan-configured",
      "role": "Africa/MENA candidate pool"
    },
    {
      "satelliteId": "intelsat-904-45e",
      "name": "Intelsat 904",
      "position": "45.0E",
      "priority": 14,
      "status": "scan-configured",
      "role": "Africa candidate pool"
    },
    {
      "satelliteId": "intelsat-20-68-5e",
      "name": "Intelsat 20",
      "position": "68.5E",
      "priority": 15,
      "status": "scan-configured",
      "role": "African/Indian Ocean candidate pool"
    }
  ],
  "verification": {
    "source": "Public satellite listings (checked 2026-10-03)",
    "lastVerified": "2026-10-03",
    "satelliteId": "ses-4-22w",
    "transponderCountSearched": 12,
    "catalogueCount": 234,
    "catalogueMatchCount": 69,
    "physicalReceiverRequired": true,
    "authorizationRequiredForAllMatchedServices": true
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


  "receiverInfrastructure": {
    "status": "configuration-ready-hardware-required",
    "purpose": "Réception DVB-S/S2, scan des transpondeurs, sélection des services, puis sortie IP/HLS après descrambling autorisé.",
    "satelliteScanMode": "multi-satellite",
    "masterCatalogueIsPreserved": true,
    "hardwareProfiles": [
      {
        "id": "dvb-s2-ip-gateway",
        "type": "professional-dvb-s2-ip-gateway",
        "tuners": "multi-tuner",
        "control": "web-ui",
        "inputs": ["DVB-S", "DVB-S2"],
        "outputs": ["MPEG-TS over IP", "HLS"],
        "cas": "DVB-CI/CI+ or operator-authorized CAS",
        "status": "configuration-ready"
      },
      {
        "id": "enigma2-openwebif",
        "type": "enigma2-receiver",
        "control": "OpenWebif",
        "inputs": ["DVB-S", "DVB-S2"],
        "outputs": ["HTTP/MPEG-TS"],
        "cas": "authorized CAM/CI only",
        "status": "configuration-ready"
      },
      {
        "id": "satip-gateway",
        "type": "sat-ip-gateway",
        "control": "web-ui-or-api",
        "inputs": ["DVB-S", "DVB-S2"],
        "outputs": ["SAT>IP", "MPEG-TS over IP"],
        "cas": "authorized CAM/CI only",
        "status": "configuration-ready"
      }
    ],
    "pipeline": [
      "dish-and-lnb",
      "dvb-s2-tuner",
      "transponder-scan",
      "service-discovery",
      "authorized-cam-or-clear-service",
      "descrambled-ts",
      "hls-packager",
      "streamlive"
    ],
    "safety": {
      "keysStoredInRepository": false,
      "cwStoredInRepository": false,
      "casBypass": false,
      "redistributionEnabledByDefault": false,
      "physicalReceptionRequired": true,
      "operatorAuthorizationRequired": true
    }
  }

};