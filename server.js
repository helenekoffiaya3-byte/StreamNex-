const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const STREAM_BASE_URL = (process.env.STREAM_BASE_URL || 'https://streamlive.com/live').replace(/\/$/, '');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const CHANNELS = [
  {
    "id": "rti-1",
    "name": "RTI 1",
    "group": "National",
    "url": "https://streamlive.com/live/rti-1/index.m3u8"
  },
  {
    "id": "rti-2",
    "name": "RTI 2",
    "group": "National",
    "url": "https://streamlive.com/live/rti-2/index.m3u8"
  },
  {
    "id": "la-3",
    "name": "La 3",
    "group": "National",
    "url": "https://streamlive.com/live/la-3/index.m3u8"
  },
  {
    "id": "a-plus-ivoire",
    "name": "A+ Ivoire",
    "group": "National",
    "url": "https://streamlive.com/live/a-plus-ivoire/index.m3u8"
  },
  {
    "id": "life-tv",
    "name": "Life TV",
    "group": "National",
    "url": "https://streamlive.com/live/life-tv/index.m3u8"
  },
  {
    "id": "7info",
    "name": "7info",
    "group": "Info",
    "url": "https://streamlive.com/live/7info/index.m3u8"
  },
  {
    "id": "nci",
    "name": "NCI",
    "group": "National",
    "url": "https://streamlive.com/live/nci/index.m3u8"
  },
  {
    "id": "canal-plus-cote-divoire",
    "name": "Canal+ Côte d’Ivoire",
    "group": "National",
    "url": "https://streamlive.com/live/canal-plus-cote-divoire/index.m3u8"
  },
  {
    "id": "m6",
    "name": "M6",
    "group": "National",
    "url": "https://streamlive.com/live/m6/index.m3u8"
  },
  {
    "id": "france-2",
    "name": "France 2",
    "group": "National",
    "url": "https://streamlive.com/live/france-2/index.m3u8"
  },
  {
    "id": "france-3",
    "name": "France 3",
    "group": "National",
    "url": "https://streamlive.com/live/france-3/index.m3u8"
  },
  {
    "id": "france-5",
    "name": "France 5",
    "group": "National",
    "url": "https://streamlive.com/live/france-5/index.m3u8"
  },
  {
    "id": "arte",
    "name": "Arte",
    "group": "National",
    "url": "https://streamlive.com/live/arte/index.m3u8"
  },
  {
    "id": "tf1",
    "name": "TF1",
    "group": "National",
    "url": "https://streamlive.com/live/tf1/index.m3u8"
  },
  {
    "id": "canal-plus",
    "name": "Canal+",
    "group": "National",
    "url": "https://streamlive.com/live/canal-plus/index.m3u8"
  },
  {
    "id": "tmc",
    "name": "TMC",
    "group": "National",
    "url": "https://streamlive.com/live/tmc/index.m3u8"
  },
  {
    "id": "tfx",
    "name": "TFX",
    "group": "National",
    "url": "https://streamlive.com/live/tfx/index.m3u8"
  },
  {
    "id": "w9",
    "name": "W9",
    "group": "National",
    "url": "https://streamlive.com/live/w9/index.m3u8"
  },
  {
    "id": "6ter",
    "name": "6ter",
    "group": "National",
    "url": "https://streamlive.com/live/6ter/index.m3u8"
  },
  {
    "id": "tv5-monde",
    "name": "TV5 Monde",
    "group": "National",
    "url": "https://streamlive.com/live/tv5-monde/index.m3u8"
  },
  {
    "id": "sunu-yeuf",
    "name": "Sunu Yeuf",
    "group": "National",
    "url": "https://streamlive.com/live/sunu-yeuf/index.m3u8"
  },
  {
    "id": "zacu-tv",
    "name": "Zacu TV",
    "group": "National",
    "url": "https://streamlive.com/live/zacu-tv/index.m3u8"
  },
  {
    "id": "maboke-tv",
    "name": "Maboke TV",
    "group": "National",
    "url": "https://streamlive.com/live/maboke-tv/index.m3u8"
  },
  {
    "id": "zbc",
    "name": "ZBC",
    "group": "National",
    "url": "https://streamlive.com/live/zbc/index.m3u8"
  },
  {
    "id": "peche-sons",
    "name": "Pêche & Sons",
    "group": "National",
    "url": "https://streamlive.com/live/peche-sons/index.m3u8"
  },
  {
    "id": "mgm-tv",
    "name": "MGM TV",
    "group": "National",
    "url": "https://streamlive.com/live/mgm-tv/index.m3u8"
  },
  {
    "id": "vifi-tv",
    "name": "VIFI TV",
    "group": "National",
    "url": "https://streamlive.com/live/vifi-tv/index.m3u8"
  },
  {
    "id": "magc-tv",
    "name": "MAGC TV",
    "group": "National",
    "url": "https://streamlive.com/live/magc-tv/index.m3u8"
  },
  {
    "id": "cnn",
    "name": "CNN",
    "group": "Info",
    "url": "https://streamlive.com/live/cnn/index.m3u8"
  },
  {
    "id": "cnn-international",
    "name": "CNN International",
    "group": "Info",
    "url": "https://streamlive.com/live/cnn-international/index.m3u8"
  },
  {
    "id": "fox-news",
    "name": "Fox News",
    "group": "Info",
    "url": "https://streamlive.com/live/fox-news/index.m3u8"
  },
  {
    "id": "msnbc",
    "name": "MSNBC",
    "group": "Info",
    "url": "https://streamlive.com/live/msnbc/index.m3u8"
  },
  {
    "id": "newsnation",
    "name": "NewsNation",
    "group": "Info",
    "url": "https://streamlive.com/live/newsnation/index.m3u8"
  },
  {
    "id": "newsmax",
    "name": "Newsmax",
    "group": "Info",
    "url": "https://streamlive.com/live/newsmax/index.m3u8"
  },
  {
    "id": "oan",
    "name": "OAN",
    "group": "Info",
    "url": "https://streamlive.com/live/oan/index.m3u8"
  },
  {
    "id": "cnbc",
    "name": "CNBC",
    "group": "Info",
    "url": "https://streamlive.com/live/cnbc/index.m3u8"
  },
  {
    "id": "fox-business",
    "name": "Fox Business",
    "group": "Info",
    "url": "https://streamlive.com/live/fox-business/index.m3u8"
  },
  {
    "id": "bloomberg-tv",
    "name": "Bloomberg TV",
    "group": "Info",
    "url": "https://streamlive.com/live/bloomberg-tv/index.m3u8"
  },
  {
    "id": "hln",
    "name": "HLN",
    "group": "Info",
    "url": "https://streamlive.com/live/hln/index.m3u8"
  },
  {
    "id": "c-span",
    "name": "C-SPAN",
    "group": "Info",
    "url": "https://streamlive.com/live/c-span/index.m3u8"
  },
  {
    "id": "the-weather-channel",
    "name": "The Weather Channel",
    "group": "Info",
    "url": "https://streamlive.com/live/the-weather-channel/index.m3u8"
  },
  {
    "id": "abc-news-live",
    "name": "ABC News Live",
    "group": "Info",
    "url": "https://streamlive.com/live/abc-news-live/index.m3u8"
  },
  {
    "id": "nbc-news-now",
    "name": "NBC News NOW",
    "group": "Info",
    "url": "https://streamlive.com/live/nbc-news-now/index.m3u8"
  },
  {
    "id": "cbs-news-24-7",
    "name": "CBS News 24/7",
    "group": "Info",
    "url": "https://streamlive.com/live/cbs-news-24-7/index.m3u8"
  },
  {
    "id": "bbc-news",
    "name": "BBC News",
    "group": "Info",
    "url": "https://streamlive.com/live/bbc-news/index.m3u8"
  },
  {
    "id": "sky-news",
    "name": "Sky News",
    "group": "Info",
    "url": "https://streamlive.com/live/sky-news/index.m3u8"
  },
  {
    "id": "al-jazeera",
    "name": "Al Jazeera",
    "group": "Info",
    "url": "https://streamlive.com/live/al-jazeera/index.m3u8"
  },
  {
    "id": "france-24",
    "name": "France 24",
    "group": "Info",
    "url": "https://streamlive.com/live/france-24/index.m3u8"
  },
  {
    "id": "dw",
    "name": "DW",
    "group": "Info",
    "url": "https://streamlive.com/live/dw/index.m3u8"
  },
  {
    "id": "euronews",
    "name": "Euronews",
    "group": "Info",
    "url": "https://streamlive.com/live/euronews/index.m3u8"
  },
  {
    "id": "nhk-world",
    "name": "NHK World",
    "group": "Info",
    "url": "https://streamlive.com/live/nhk-world/index.m3u8"
  },
  {
    "id": "cgtn",
    "name": "CGTN",
    "group": "Info",
    "url": "https://streamlive.com/live/cgtn/index.m3u8"
  },
  {
    "id": "trt-world",
    "name": "TRT World",
    "group": "Info",
    "url": "https://streamlive.com/live/trt-world/index.m3u8"
  },
  {
    "id": "i24news",
    "name": "i24NEWS",
    "group": "Info",
    "url": "https://streamlive.com/live/i24news/index.m3u8"
  },
  {
    "id": "nickelodeon",
    "name": "Nickelodeon",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nickelodeon/index.m3u8"
  },
  {
    "id": "nickelodeon-music",
    "name": "Nickelodeon Music",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nickelodeon-music/index.m3u8"
  },
  {
    "id": "nick-jr",
    "name": "Nick Jr.",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nick-jr/index.m3u8"
  },
  {
    "id": "nicktoons",
    "name": "Nicktoons",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nicktoons/index.m3u8"
  },
  {
    "id": "teennick",
    "name": "TeenNick",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/teennick/index.m3u8"
  },
  {
    "id": "nickelodeon-junior",
    "name": "Nickelodeon Junior",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nickelodeon-junior/index.m3u8"
  },
  {
    "id": "nickelodeon-teen",
    "name": "Nickelodeon Teen",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nickelodeon-teen/index.m3u8"
  },
  {
    "id": "nickelodeon-afrique",
    "name": "Nickelodeon Afrique",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/nickelodeon-afrique/index.m3u8"
  },
  {
    "id": "disney-channel",
    "name": "Disney Channel",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/disney-channel/index.m3u8"
  },
  {
    "id": "disney-junior",
    "name": "Disney Junior",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/disney-junior/index.m3u8"
  },
  {
    "id": "disney-xd",
    "name": "Disney XD",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/disney-xd/index.m3u8"
  },
  {
    "id": "disney-channel-afrique",
    "name": "Disney Channel Afrique",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/disney-channel-afrique/index.m3u8"
  },
  {
    "id": "cartoon-network",
    "name": "Cartoon Network",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/cartoon-network/index.m3u8"
  },
  {
    "id": "boomerang",
    "name": "Boomerang",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/boomerang/index.m3u8"
  },
  {
    "id": "boing",
    "name": "Boing",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/boing/index.m3u8"
  },
  {
    "id": "universal-kids",
    "name": "Universal Kids",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/universal-kids/index.m3u8"
  },
  {
    "id": "pbs-kids",
    "name": "PBS Kids",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/pbs-kids/index.m3u8"
  },
  {
    "id": "discovery-family",
    "name": "Discovery Family",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/discovery-family/index.m3u8"
  },
  {
    "id": "hallmark-family",
    "name": "Hallmark Family",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/hallmark-family/index.m3u8"
  },
  {
    "id": "freeform",
    "name": "Freeform",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/freeform/index.m3u8"
  },
  {
    "id": "gulli",
    "name": "Gulli",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/gulli/index.m3u8"
  },
  {
    "id": "gulli-max",
    "name": "Gulli Max",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/gulli-max/index.m3u8"
  },
  {
    "id": "gulli-africa",
    "name": "Gulli Africa",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/gulli-africa/index.m3u8"
  },
  {
    "id": "canal-kids",
    "name": "Canal+ Kids",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/canal-kids/index.m3u8"
  },
  {
    "id": "teletoon-plus",
    "name": "Télétoon+",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/teletoon-plus/index.m3u8"
  },
  {
    "id": "piwi-plus",
    "name": "Piwi+",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/piwi-plus/index.m3u8"
  },
  {
    "id": "canal-j",
    "name": "Canal J",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/canal-j/index.m3u8"
  },
  {
    "id": "tiji",
    "name": "Tiji",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/tiji/index.m3u8"
  },
  {
    "id": "tivi5",
    "name": "Tivi5",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/tivi5/index.m3u8"
  },
  {
    "id": "a-plus-kids",
    "name": "A+ Kids",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/a-plus-kids/index.m3u8"
  },
  {
    "id": "mangas",
    "name": "Mangas",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/mangas/index.m3u8"
  },
  {
    "id": "j-one",
    "name": "J-One",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/j-one/index.m3u8"
  },
  {
    "id": "okoo",
    "name": "Okoo",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/okoo/index.m3u8"
  },
  {
    "id": "tfou",
    "name": "Tfou",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/tfou/index.m3u8"
  },
  {
    "id": "zouzous",
    "name": "Zouzous",
    "group": "Jeunesse",
    "url": "https://streamlive.com/live/zouzous/index.m3u8"
  },
  {
    "id": "a-plus",
    "name": "A+",
    "group": "Films",
    "url": "https://streamlive.com/live/a-plus/index.m3u8"
  },
  {
    "id": "novelas-plus",
    "name": "Novelas+",
    "group": "Films",
    "url": "https://streamlive.com/live/novelas-plus/index.m3u8"
  },
  {
    "id": "rtl-9",
    "name": "RTL 9",
    "group": "Films",
    "url": "https://streamlive.com/live/rtl-9/index.m3u8"
  },
  {
    "id": "sci-fi",
    "name": "Sci-Fi",
    "group": "Films",
    "url": "https://streamlive.com/live/sci-fi/index.m3u8"
  },
  {
    "id": "13eme-rue",
    "name": "13ème Rue",
    "group": "Films",
    "url": "https://streamlive.com/live/13eme-rue/index.m3u8"
  },
  {
    "id": "nollywood-tv",
    "name": "Nollywood TV",
    "group": "Films",
    "url": "https://streamlive.com/live/nollywood-tv/index.m3u8"
  },
  {
    "id": "m6-films",
    "name": "M6 Films",
    "group": "Films",
    "url": "https://streamlive.com/live/m6-films/index.m3u8"
  },
  {
    "id": "telemundo",
    "name": "Telemundo",
    "group": "Films",
    "url": "https://streamlive.com/live/telemundo/index.m3u8"
  },
  {
    "id": "univision",
    "name": "Univision",
    "group": "Films",
    "url": "https://streamlive.com/live/univision/index.m3u8"
  },
  {
    "id": "unimas",
    "name": "UniMás",
    "group": "Films",
    "url": "https://streamlive.com/live/unimas/index.m3u8"
  },
  {
    "id": "estrella-tv",
    "name": "Estrella TV",
    "group": "Films",
    "url": "https://streamlive.com/live/estrella-tv/index.m3u8"
  },
  {
    "id": "galavision",
    "name": "Galavisión",
    "group": "Films",
    "url": "https://streamlive.com/live/galavision/index.m3u8"
  },
  {
    "id": "hallmark-drama",
    "name": "Hallmark Drama",
    "group": "Films",
    "url": "https://streamlive.com/live/hallmark-drama/index.m3u8"
  },
  {
    "id": "lifetime",
    "name": "Lifetime",
    "group": "Films",
    "url": "https://streamlive.com/live/lifetime/index.m3u8"
  },
  {
    "id": "hbo",
    "name": "HBO",
    "group": "Films",
    "url": "https://streamlive.com/live/hbo/index.m3u8"
  },
  {
    "id": "tnt",
    "name": "TNT",
    "group": "Films",
    "url": "https://streamlive.com/live/tnt/index.m3u8"
  },
  {
    "id": "tbs",
    "name": "TBS",
    "group": "Films",
    "url": "https://streamlive.com/live/tbs/index.m3u8"
  },
  {
    "id": "usa-network",
    "name": "USA Network",
    "group": "Films",
    "url": "https://streamlive.com/live/usa-network/index.m3u8"
  },
  {
    "id": "paramount-network",
    "name": "Paramount Network",
    "group": "Films",
    "url": "https://streamlive.com/live/paramount-network/index.m3u8"
  },
  {
    "id": "amc",
    "name": "AMC",
    "group": "Films",
    "url": "https://streamlive.com/live/amc/index.m3u8"
  },
  {
    "id": "fx",
    "name": "FX",
    "group": "Films",
    "url": "https://streamlive.com/live/fx/index.m3u8"
  },
  {
    "id": "fxx",
    "name": "FXX",
    "group": "Films",
    "url": "https://streamlive.com/live/fxx/index.m3u8"
  },
  {
    "id": "syfy",
    "name": "Syfy",
    "group": "Films",
    "url": "https://streamlive.com/live/syfy/index.m3u8"
  },
  {
    "id": "starz",
    "name": "Starz",
    "group": "Films",
    "url": "https://streamlive.com/live/starz/index.m3u8"
  },
  {
    "id": "cinemax",
    "name": "Cinemax",
    "group": "Films",
    "url": "https://streamlive.com/live/cinemax/index.m3u8"
  },
  {
    "id": "showtime",
    "name": "Showtime",
    "group": "Films",
    "url": "https://streamlive.com/live/showtime/index.m3u8"
  },
  {
    "id": "mgm-plus",
    "name": "MGM+",
    "group": "Films",
    "url": "https://streamlive.com/live/mgm-plus/index.m3u8"
  },
  {
    "id": "tcm",
    "name": "TCM",
    "group": "Films",
    "url": "https://streamlive.com/live/tcm/index.m3u8"
  },
  {
    "id": "ifc",
    "name": "IFC",
    "group": "Films",
    "url": "https://streamlive.com/live/ifc/index.m3u8"
  },
  {
    "id": "sundance-tv",
    "name": "Sundance TV",
    "group": "Films",
    "url": "https://streamlive.com/live/sundance-tv/index.m3u8"
  },
  {
    "id": "ion",
    "name": "Ion",
    "group": "Films",
    "url": "https://streamlive.com/live/ion/index.m3u8"
  },
  {
    "id": "movies",
    "name": "Movies!",
    "group": "Films",
    "url": "https://streamlive.com/live/movies/index.m3u8"
  },
  {
    "id": "comet",
    "name": "Comet",
    "group": "Films",
    "url": "https://streamlive.com/live/comet/index.m3u8"
  },
  {
    "id": "charge",
    "name": "Charge!",
    "group": "Films",
    "url": "https://streamlive.com/live/charge/index.m3u8"
  },
  {
    "id": "grit",
    "name": "Grit",
    "group": "Films",
    "url": "https://streamlive.com/live/grit/index.m3u8"
  },
  {
    "id": "gettv",
    "name": "getTV",
    "group": "Films",
    "url": "https://streamlive.com/live/gettv/index.m3u8"
  },
  {
    "id": "heroes-icons",
    "name": "Heroes & Icons",
    "group": "Films",
    "url": "https://streamlive.com/live/heroes-icons/index.m3u8"
  },
  {
    "id": "tubi",
    "name": "Tubi",
    "group": "Films",
    "url": "https://streamlive.com/live/tubi/index.m3u8"
  },
  {
    "id": "pluto-tv",
    "name": "Pluto TV",
    "group": "Films",
    "url": "https://streamlive.com/live/pluto-tv/index.m3u8"
  },
  {
    "id": "peacock",
    "name": "Peacock",
    "group": "Films",
    "url": "https://streamlive.com/live/peacock/index.m3u8"
  },
  {
    "id": "bravo",
    "name": "Bravo",
    "group": "Films",
    "url": "https://streamlive.com/live/bravo/index.m3u8"
  },
  {
    "id": "cuisines",
    "name": "Cuisines",
    "group": "Films",
    "url": "https://streamlive.com/live/cuisines/index.m3u8"
  },
  {
    "id": "mtv",
    "name": "MTV",
    "group": "Films",
    "url": "https://streamlive.com/live/mtv/index.m3u8"
  },
  {
    "id": "z-magic",
    "name": "Z Magic",
    "group": "Films",
    "url": "https://streamlive.com/live/z-magic/index.m3u8"
  },
  {
    "id": "emci-tv",
    "name": "EMCI TV",
    "group": "Biblical",
    "url": "https://streamlive.com/live/emci-tv/index.m3u8"
  },
  {
    "id": "esperance-tv",
    "name": "Espérance TV",
    "group": "Biblical",
    "url": "https://streamlive.com/live/esperance-tv/index.m3u8"
  },
  {
    "id": "kto",
    "name": "KTO",
    "group": "Biblical",
    "url": "https://streamlive.com/live/kto/index.m3u8"
  },
  {
    "id": "top-chretien",
    "name": "Top Chrétien",
    "group": "Biblical",
    "url": "https://streamlive.com/live/top-chretien/index.m3u8"
  },
  {
    "id": "hope-channel",
    "name": "Hope Channel",
    "group": "Biblical",
    "url": "https://streamlive.com/live/hope-channel/index.m3u8"
  },
  {
    "id": "trace-gospel",
    "name": "Trace Gospel",
    "group": "Biblical",
    "url": "https://streamlive.com/live/trace-gospel/index.m3u8"
  },
  {
    "id": "ewtn",
    "name": "EWTN",
    "group": "Biblical",
    "url": "https://streamlive.com/live/ewtn/index.m3u8"
  }
];

// STREAM_BASE_URL controls the public HLS origin returned by the API.
for (const channel of CHANNELS) {
  channel.url = STREAM_BASE_URL + '/' + channel.id + '/index.m3u8';
}

const userSessions = new Map();
const SESSION_TTL_MS = Number(process.env.SESSION_TTL_MS || 30 * 60 * 1000);

function pruneSessions(){
  const now=Date.now();
  for(const [key,session] of userSessions){
    if(now-session.lastAccess > SESSION_TTL_MS) userSessions.delete(key);
  }
}
setInterval(pruneSessions, Math.min(SESSION_TTL_MS, 5 * 60 * 1000)).unref();

function getSessionPool(sessionId) {
  const key = String(sessionId || 'default').slice(0, 128);
  let session = userSessions.get(key);

  if (!session || !Array.isArray(session.pool) || session.pool.length === 0) {
    session = { pool: CHANNELS.map(channel => channel.id), lastAccess: Date.now() };
    userSessions.set(key, session);
  } else {
    session.lastAccess = Date.now();
  }

  return { key, pool: session.pool };
}

app.get('/api/stream/random', (req, res) => {
  const { pool } = getSessionPool(req.query.sessionId);
  const randomIndex = Math.floor(Math.random() * pool.length);
  const selectedId = pool.splice(randomIndex, 1)[0];
  const channel = CHANNELS.find(item => item.id === selectedId);

  if (!channel) {
    return res.status(500).json({ success: false, error: 'Chaîne introuvable.' });
  }

  res.json({ success: true, channel, remainingCount: pool.length, totalCount: CHANNELS.length, cycleComplete: pool.length === 0 });
});

app.get('/api/stream/channels', (_req, res) => {
  res.json({ success: true, count: CHANNELS.length, channels: CHANNELS });
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, service: 'StreamLive', channels: CHANNELS.length, streamBaseUrl: STREAM_BASE_URL, sessionStore: 'memory', sessionTtlMs: SESSION_TTL_MS });
});

app.listen(PORT, () => {
  console.log(`StreamLive backend actif sur http://localhost:${PORT}`);
});
