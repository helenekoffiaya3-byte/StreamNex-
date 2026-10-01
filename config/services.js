// Services de streaming : ils ne sont pas des chaînes TV linéaires.
// Ils sont exposés par /api/apps et ne gonflent pas le catalogue CHANNELS.
const SERVICES = [
  { id: "service-netflix", name: "Netflix", type: "service", group: "Service vidéo", status: "ACTIVE_CATALOG", externalUrl: "https://www.netflix.com/ci/" },
  { id: "service-peacock", name: "Peacock", type: "service", group: "Service vidéo", status: "ACTIVE_CATALOG" },
  { id: "service-pluto-tv", name: "Pluto TV", type: "service", group: "Service vidéo", status: "ACTIVE_CATALOG" },
  { id: "service-tubi", name: "Tubi", type: "service", group: "Service vidéo", status: "ACTIVE_CATALOG" },
  { id: "stage-plus", name: "STAGE+", type: "service", group: "Service vidéo", status: "ACTIVE_CATALOG", externalUrl: "https://www.stage-plus.com/" },
  { id: "service-mytfi", name: "MyTFI", type: "service", group: "Service vidéo", status: "ACTIVE_CATALOG" },
  { id: "service-canal-plus", name: "CANAL+ / myCANAL", type: "service", group: "Service vidéo", category: "Séries & Films à volonté", status: "ACTIVE_CATALOG" },
  { id: "service-canal-plus-series", name: "CANAL+ Séries", type: "service", group: "Service vidéo", category: "Séries & Films à volonté", status: "ACTIVE_CATALOG" },
  { id: "service-cine-plus-ocs", name: "Ciné+ OCS", type: "service", group: "Service vidéo", category: "Séries & Films à volonté", status: "ACTIVE_CATALOG" },
  { id: "service-adn", name: "ADN (Animation Digital Network)", type: "service", group: "Service vidéo", category: "Plateformes spécialisées et de niche", status: "ACTIVE_CATALOG" },
  { id: "service-shadowz", name: "Shadowz", type: "service", group: "Service vidéo", category: "Plateformes spécialisées et de niche", status: "ACTIVE_CATALOG" },
  { id: "service-filmo", name: "Filmo", type: "service", group: "Service vidéo", category: "Plateformes spécialisées et de niche", status: "ACTIVE_CATALOG" },
  { id: "service-universcine", name: "UniversCiné", type: "service", group: "Service vidéo", category: "Plateformes spécialisées et de niche", status: "ACTIVE_CATALOG" },
  { id: "service-lacinetek", name: "LaCinetek", type: "service", group: "Service vidéo", category: "Plateformes spécialisées et de niche", status: "ACTIVE_CATALOG" },
  { id: "service-tf1-plus-premium", name: "TF1+ Premium", type: "service", group: "Service vidéo", category: "Offres streaming payantes des grandes chaînes", status: "ACTIVE_CATALOG" },
  { id: "service-m6-plus-max", name: "M6+ Max", type: "service", group: "Service vidéo", category: "Offres streaming payantes des grandes chaînes", status: "ACTIVE_CATALOG" },
  { id: "service-tfou-max", name: "TFOU MAX", type: "service", group: "Service vidéo", category: "Services SVOD jeunesse", status: "ACTIVE_CATALOG" },
  { id: "service-gullimax", name: "GulliMax", type: "service", group: "Service vidéo", category: "Services SVOD jeunesse", status: "ACTIVE_CATALOG" }
];

module.exports = SERVICES;
