// StreamLive bouquet definitions.
// Membership is intentionally manual; catalogue entries remain unchanged.
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
    videoServiceId: "m6-plus",
    freeAccessVerificationRequired: true,
    channelIds: [
      "france-24",
      "rti-1",
      "rti-2",
      "la-3",
      "nci",
      "i24news-fr"
    ],
    pendingVerificationChannelIds: [
      "okoo",
      "gulli"
    ],
    excludedPaidChannelIds: [
      "teletoon-plus",
      "piwi-plus",
      "science-et-vie-tv"
    ]
  }
];

module.exports = BOUQUETS;
