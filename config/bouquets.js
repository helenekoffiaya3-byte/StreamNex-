// StreamLive bouquet definitions.
// Membership is intentionally manual: do not populate these lists automatically.
// Keep channel IDs here; never duplicate or alter catalogue entries.
// Free TV membership requires verified free-to-watch access in the intended region.
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
    description: "Chaînes dont l'accès gratuit dans la région cible a été vérifié.",
    selectionMode: "manual",
    freeAccessVerificationRequired: true,
    channelIds: [
      "france-24",
      "rti-1",
      "rti-2",
      "la-3",
      "nci"
    ],
    pendingVerificationChannelIds: [
      "okoo",
      "gulli"
    ]
  }
];

module.exports = BOUQUETS;
