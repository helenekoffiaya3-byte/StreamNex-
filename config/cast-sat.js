/**
 * Cast Sat / Sat>IP source configuration.
 *
 * This configuration records the transponder scan target and the services
 * discovered from public satellite listings. It does not contain stream URLs
 * or credentials. Encrypted services are retained as reception candidates only;
 * they are not enabled for redistribution.
 *
 * IMPORTANT: 11171 V / 45000 is publicly listed on SES-4 at 22.0W, not
 * Eutelsat 16A at 16.0E. A physical receiver scan must confirm the installation
 * before this is used as a production source.
 */
export const castSat = {
  satellite: {
    name: "SES-4",
    position: "22.0W",
    beam: "West Africa",
    requestedPosition: "Eutelsat 16A / 16.0E",
    positionVerified: false,
  },
  transponder: {
    frequencyMHz: 11171,
    polarization: "V",
    symbolRateKsym: 45000,
    fec: "3/4",
    system: "DVB-S2/QPSK",
    video: "HEVC",
    band: "Ku",
  },
  lnb: {
    type: "universal",
    lowOscillatorMHz: 9750,
    highOscillatorMHz: 10600,
  },
  output: {
    protocol: "HLS",
    pathPattern: "/hls/{service}/index.m3u8",
  },
  services: [
    { name: "Canal+ Première Centre", id: "canal-plus-premiere-centre", status: "discovered", redistributionEnabled: false },
    { name: "ITV (Senegal)", id: "itv-senegal", status: "discovered", redistributionEnabled: false },
    { name: "TF1+", id: "tf1-plus", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Centre", id: "canal-plus-centre", status: "discovered", redistributionEnabled: false },
    { name: "Clique TV", id: "clique-tv", status: "discovered", catalogueId: "clique-tv", redistributionEnabled: false },
    { name: "Canal+ Cinéma Centre", id: "canal-plus-cinema-centre", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Elles Centre", id: "canal-plus-elles-centre", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Family Centre", id: "canal-plus-family-centre", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Comedy Centre", id: "canal-plus-comedy-centre", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Sport", id: "canal-plus-sport", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Sport 1/2", id: "canal-plus-sport-1-2", status: "discovered", redistributionEnabled: false },
    { name: "C8", id: "c8", status: "discovered", redistributionEnabled: false },
    { name: "Canal+ Action Centre", id: "canal-plus-action-centre", status: "discovered", redistributionEnabled: false },
    { name: "Piwi+", id: "piwi-plus", status: "discovered", redistributionEnabled: false },
    { name: "Pacis TV", id: "pacis-tv", status: "discovered", redistributionEnabled: false },
    { name: "Mezzo", id: "mezzo", status: "discovered", catalogueId: "mezzo", redistributionEnabled: false },
    { name: "Eurosport 1", id: "eurosport-1", status: "discovered", catalogueId: "eurosport-1", redistributionEnabled: false },
    { name: "ITV", id: "itv", status: "discovered", catalogueId: "itv", redistributionEnabled: false },
    { name: "TLS Africa", id: "tls-africa", status: "discovered", redistributionEnabled: false },
    { name: "Nickelodeon Junior", id: "nickelodeon-junior", status: "discovered", catalogueId: "nickelodeon-junior", redistributionEnabled: false },
    { name: "RAI", id: "rai", status: "discovered", redistributionEnabled: false },
    { name: "Histoire", id: "histoire", status: "discovered", catalogueId: "histoire", redistributionEnabled: false },
    { name: "Trace Urban", id: "trace-urban", status: "discovered", catalogueId: "trace-urban", redistributionEnabled: false },
    { name: "Syfy France", id: "syfy-france", status: "discovered", redistributionEnabled: false },
    { name: "My Media Prime", id: "my-media-prime", status: "discovered", redistributionEnabled: false },
    { name: "National Geographic France", id: "national-geographic-france", status: "discovered", redistributionEnabled: false },
    { name: "Gulli Africa", id: "gulli-africa", status: "discovered", catalogueId: "gulli-africa", redistributionEnabled: false },
  ],
};
