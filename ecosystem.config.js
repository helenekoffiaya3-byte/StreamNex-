module.exports = {
  apps: [{
    name: 'streamlive-app',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      STREAMLIVE_HLS_ENABLED: 'true',
      STREAMLIVE_HLS_FALLBACK: 'true',
      RTI1_HLS_ENABLED: 'true',
      RTI1_HLS_FALLBACK: 'true'
    }
  }, {
    name: 'rti1-recorder',
    script: 'services/rti1Recorder.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env_production: {
      NODE_ENV: 'production',
      RTI1_RECORD_ENABLED: 'true',
      RTI1_RECORD_INTERVAL_MS: '15000',
      RTI1_RECORD_TRANSCODE_FALLBACK: 'false'
    }
  }]
};
