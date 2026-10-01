const CHANNELS = require('./channels');

// Étape 2 : chaque chaîne TV appartient à un bouquet thématique.
// Les services vidéo restent séparés dans config/services.js.
const BOUQUET_DEFINITIONS = [
  {
    "id": "bouquet-national",
    "name": "Bouquet National",
    "group": "National",
    "channelIds": [
      "rti-1",
      "rti-2",
      "la-3",
      "a-plus-ivoire",
      "life-tv",
      "nci",
      "canal-plus-cote-divoire"
    ]
  },
  {
    "id": "bouquet-france",
    "name": "Bouquet France",
    "group": "France",
    "channelIds": [
      "6ter",
      "arte",
      "canal-plus",
      "france-2",
      "france-3",
      "france-4",
      "france-5",
      "m6",
      "tf1",
      "tfx",
      "tmc",
      "w9"
    ]
  },
  {
    "id": "bouquet-information",
    "name": "Bouquet Information",
    "group": "Information",
    "channelIds": [
      "7info",
      "abc-news-live",
      "al-jazeera",
      "bbc-news",
      "bloomberg-tv",
      "c-span",
      "cbs-news-24-7",
      "cgtn",
      "cnbc",
      "cnn",
      "cnn-international",
      "dw",
      "euronews",
      "fox-business",
      "fox-news",
      "france-24",
      "hln",
      "i24news",
      "msnbc",
      "nbc-news-now",
      "newsmax",
      "newsnation",
      "nhk-world",
      "oan",
      "sky-news",
      "the-weather-channel",
      "trt-world",
      "la-chaine-meteo"
    ]
  },
  {
    "id": "bouquet-sport",
    "name": "Bouquet Sport",
    "group": "Sport",
    "channelIds": [
      "infosport",
      "sport-1",
      "sport-2",
      "sport-3",
      "sport-4",
      "canal-plus-sport-360",
      "canal-plus-foot",
      "bein-sports",
      "eurosport-1",
      "automoto",
      "equidia",
      "mgg-tv",
      "golf-plus"
    ]
  },
  {
    "id": "bouquet-films-cinema",
    "name": "Bouquet Films & Cinéma",
    "group": "Films & Cinéma",
    "channelIds": [
      "ab1",
      "action",
      "c-plus-action",
      "c-plus-cinema",
      "c-plus-family",
      "c-plus-magic",
      "c-plus-pop",
      "charge",
      "cinemax",
      "comet",
      "estrella-tv",
      "galavision",
      "gettv",
      "grit",
      "m6-films",
      "mgm-tv",
      "movies",
      "netflix",
      "peacock",
      "pluto-tv",
      "rtl-9",
      "sci-fi",
      "tcm",
      "telemundo",
      "tubi",
      "unimas",
      "univision",
      "canal-plus-box-office",
      "canal-plus-grand-ecran",
      "canal-plus-cinema-s",
      "cine-plus-frisson",
      "cine-plus-emotion",
      "cine-plus-family",
      "cine-plus-festival",
      "cine-plus-classic",
      "polar-plus"
    ]
  },
  {
    "id": "bouquet-series",
    "name": "Bouquet Séries",
    "group": "Séries",
    "channelIds": [
      "13eme-rue",
      "amc",
      "bravo",
      "freeform",
      "fx",
      "fxx",
      "hallmark-drama",
      "hbo",
      "heroes-icons",
      "ifc",
      "ion",
      "lifetime",
      "mgm-plus",
      "novelas-plus",
      "paramount-network",
      "s-plus-premiere",
      "serie-club",
      "showtime",
      "starz",
      "sundance-tv",
      "syfy",
      "tbs",
      "tf1-series-films",
      "tnt",
      "usa-network",
      "comedie-plus",
      "paris-premiere",
      "teva"
    ]
  },
  {
    "id": "bouquet-s-streamlive",
    "name": "Bouquet S+ StreamLive",
    "group": "S+ StreamLive",
    "channelIds": [
      "s-plus-avant-premiere",
      "s-plus-docs",
      "s-plus-prime",
      "s-plus-cine",
      "s-plus-kids",
      "s-plus-fiction",
      "s-plus-channel",
      "s-plus-music",
      "s-plus-tv",
      "s-plus-family",
      "s-plus-sport-1",
      "s-plus-sport-2",
      "s-plus-sport-3",
      "s-plus-sport-4",
      "s-plus-sport-5",
      "s-plus-sport-6",
      "s-plus-movies",
      "s-plus-infosport",
      "s-plus-infos",
      "s-plus-media",
      "s-plus-lloliwood",
      "s-plus-bl",
      "s-plus-jeunesse"
    ]
  },
  {
    "id": "bouquet-jeunesse",
    "name": "Bouquet Jeunesse",
    "group": "Jeunesse",
    "channelIds": [
      "a-plus-kids",
      "boing",
      "boomerang",
      "boomerang-plus-1",
      "canal-j",
      "canal-kids",
      "cartoonito",
      "cartoon-network",
      "disney-channel",
      "disney-junior",
      "dreamworks",
      "gulli",
      "gulli-africa",
      "j-one",
      "ludikids",
      "mangas",
      "nathan-plus",
      "nickelodeon",
      "nickelodeon-junior",
      "nickelodeon-plus-1",
      "nicktoons",
      "nickelodeon-teen",
      "okoo",
      "piwi-plus",
      "pitchoun-kids-music",
      "pitchoun-kids-music-africa",
      "tv-pitchoun",
      "teletoon-plus",
      "teletoon-plus-1",
      "tiji",
      "tivi5monde",
      "toonami",
      "ducktv",
      "warner-tv-next",
      "berbere-jeunesse",
      "chaine-pere-noel"
    ]
  },
  {
    "id": "bouquet-international",
    "name": "Bouquet International",
    "group": "International",
    "channelIds": [
      "tv-tokyo",
      "fuji-tv"
    ]
  },
  {
    "id": "bouquet-documentaires",
    "name": "Bouquet Documentaires",
    "group": "Documentaires",
    "channelIds": [
      "peche-sons",
      "planete-plus",
      "science-et-vie-tv",
      "toute-l-histoire",
      "canal-plus-docs",
      "seasons",
      "chasse-et-peche",
      "animaux",
      "cheval-tv",
      "mieux-tv",
      "dog-cat-tv",
      "love-nature",
      "museum-tv",
      "planete-plus-crime",
      "planete-plus-aventure"
    ]
  },
  {
    "id": "bouquet-musique",
    "name": "Bouquet Musique",
    "group": "Musique",
    "channelIds": [
      "mtv",
      "trace-africa",
      "trace-ivoire",
      "z-magic",
      "nrj-hits",
      "europe-2-pop-tv",
      "m6-music",
      "trace-urban",
      "rfm-tv",
      "deutsche-grammophon-plus",
      "melody",
      "mezzo",
      "mezzo-live-hd"
    ]
  },
  {
    "id": "bouquet-afrique-international",
    "name": "Bouquet Afrique / International",
    "group": "Afrique / International",
    "channelIds": [
      "a-plus",
      "m6-international",
      "maboke-tv",
      "magc-tv",
      "sunu-yeuf",
      "tv5-monde",
      "vifi-tv",
      "zacu-tv",
      "zbc"
    ]
  },
  {
    "id": "bouquet-biblique",
    "name": "Bouquet Biblique",
    "group": "Biblique",
    "channelIds": [
      "emci-tv",
      "esperance-tv",
      "ewtn",
      "hope-channel",
      "kto",
      "top-chretien",
      "trace-gospel"
    ]
  },
  {
    "id": "bouquet-cuisine-lifestyle",
    "name": "Bouquet Cuisine & Lifestyle",
    "group": "Cuisine & Lifestyle",
    "channelIds": [
      "cuisines"
    ]
  },
  {
    "id": "bouquet-nollywood",
    "name": "Bouquet Nollywood",
    "group": "Nollywood",
    "channelIds": [
      "nollywood-tv",
      "nollywood-tv-epic"
    ]
  },
  {
    "id": "bouquet-bollywood",
    "name": "Bouquet Bollywood",
    "group": "Bollywood",
    "channelIds": [
      "passion-bollywood"
    ]
  }
];

const BOUQUETS = BOUQUET_DEFINITIONS.map(b => ({
  ...b,
  channelCount: b.channelIds.length,
  channels: b.channelIds.map(id => CHANNELS.find(c => c.id === id)).filter(Boolean)
}));

module.exports = BOUQUETS;
