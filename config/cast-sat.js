/**
 * Cast Sat / Sat>IP source configuration.
 *
 * This file stores reception metadata only. It does not contain stream URLs
 * or credentials. Service mappings are added only after a real scan confirms
 * the service and its authorized distribution path.
 */
export const castSat = {
  satellite: {
    name: "Eutelsat 16A",
    position: "16.0E",
    beam: "Sub-Saharan Africa / West Africa",
  },
  transponder: {
    frequencyMHz: 11171,
    polarization: "V",
    symbolRateKsym: 45000,
    band: "Ku low",
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
  services: [],
};
