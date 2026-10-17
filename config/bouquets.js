// StreamLive bouquet definitions.
// Membership is intentionally manual: do not populate these lists automatically.
// Keep channel IDs here; never duplicate or alter catalogue entries.
// Free TV membership requires verified free-to-watch access for each channel.
const BOUQUETS = [
  {
    id: "news",
    name: "News",
    description: "Chaînes d'information sélectionnées manuellement.",
    selectionMode: "manual",
    channelIds: []
  },
  {
    id: "free-tv",
    name: "Free TV",
    description: "Chaînes dont l'accès gratuit a été vérifié, sélectionnées manuellement.",
    selectionMode: "manual",
    freeAccessVerificationRequired: true,
    channelIds: []
  }
];

module.exports = BOUQUETS;
