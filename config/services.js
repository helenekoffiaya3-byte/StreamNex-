// Services de streaming : ils ne sont pas des chaînes TV linéaires.
// Ils sont exposés par /api/apps et ne gonflent pas le catalogue CHANNELS.
const SERVICES = [
  { id: "netflix", name: "Netflix", type: "service", group: "Apps & Services", status: "ACTIVE_CATALOG", externalUrl: "https://www.netflix.com/ci/" },
  { id: "peacock", name: "Peacock", type: "service", group: "Apps & Services", status: "ACTIVE_CATALOG" },
  { id: "pluto-tv", name: "Pluto TV", type: "service", group: "Apps & Services", status: "ACTIVE_CATALOG" },
  { id: "tubi", name: "Tubi", type: "service", group: "Apps & Services", status: "ACTIVE_CATALOG" },
  { id: "stage-plus", name: "STAGE+", type: "service", group: "Apps & Services", status: "ACTIVE_CATALOG", externalUrl: "https://www.stage-plus.com/" }
];

module.exports = SERVICES;
