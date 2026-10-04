/* StreamLive — Channel Manager for NTS-1.4-Lava
 *
 * The catalogue is injected by the application as:
 *   window.STREAMLIVE_CHANNELS = [...]
 *
 * A channel entry must contain:
 *   { id, channelNumber, name, productionUrl, streamEnabled }
 *
 * The player remains independent from the catalogue.
 */
(function (root) {
  'use strict';

  function catalogue() {
    const value = root.STREAMLIVE_CHANNELS;
    return Array.isArray(value) ? value : [];
  }

  function normalizeChannel(channel) {
    if (!channel || typeof channel !== 'object') return null;
    return {
      id: String(channel.id || ''),
      tvgId: String(channel.tvgId || channel.id || ''),
      channelNumber: Number(channel.channelNumber),
      name: String(channel.name || channel.id || 'Chaîne'),
      group: String(channel.group || ''),
      logoUrl: channel.logoUrl || '',
      productionUrl: channel.productionUrl || null,
      streamEnabled: Boolean(channel.streamEnabled),
      streamConfigured: Boolean(channel.streamConfigured ?? channel.productionUrl ?? channel.youtubeChannelId),
      streamSource: String(channel.streamSource || (channel.youtubeChannelId ? 'youtube-live' : 'hls')),
      youtubeChannelId: channel.youtubeChannelId || null,\n      nciDirectUrl: channel.nciDirectUrl || (String(channel.id || '') === 'nci' ? 'https://www.nci.ci/direct' : null),\n      aplusIvoireLiveUrl: channel.aplusIvoireLiveUrl || (String(channel.id || '') === 'a-plus-ivoire' ? 'https://aplusivoire.web-prod2.direct.canal-overseas.com/live' : null),
      rtiplayUrl: channel.rtiplayUrl || (['rti-1', 'rti-2', 'la-3'].includes(String(channel.id || '')) ? 'https://www.rtiplay.ci/' : null)
    };
  }

  function getChannels() {
    return catalogue().map(normalizeChannel).filter(Boolean);
  }

  function getChannel(identifier) {
    if (identifier === undefined || identifier === null || identifier === '') return null;
    const value = String(identifier).trim().toLowerCase();
    return getChannels().find(function (channel) {
      return channel.id.toLowerCase() === value ||
        String(channel.channelNumber) === value;
    }) || null;
  }

  function select(identifier, options) {
    const player = root.NTS14LavaPlayer;
    const channel = getChannel(identifier);

    if (!channel) {
      return { ok: false, code: 'CHANNEL_NOT_FOUND', channel: null };
    }

    if (channel.id === 'a-plus-ivoire') {\n      if (!player || typeof player.loadNCILive !== 'function') return { ok: false, code: 'PLAYER_NOT_READY', channel: channel };\n      player.loadNCILive(channel.aplusIvoireLiveUrl || 'https://aplusivoire.web-prod2.direct.canal-overseas.com/live');\n      root.dispatchEvent(new CustomEvent('streamlive:channel-selected', { detail: { channel: channel, mode: 'live', source: 'a-plus-ivoire-official' } }));\n      return { ok: true, code: 'LOADED', channel: channel, mode: 'live', source: 'a-plus-ivoire-official' };\n    }\n\n    if (channel.id === 'nci') {\n      if (!player || typeof player.loadNCILive !== 'function') return { ok: false, code: 'PLAYER_NOT_READY', channel: channel };\n      player.loadNCILive(channel.nciDirectUrl || 'https://www.nci.ci/direct');\n      root.dispatchEvent(new CustomEvent('streamlive:channel-selected', { detail: { channel: channel, mode: 'live', source: 'nci-official' } }));\n      return { ok: true, code: 'LOADED', channel: channel, mode: 'live', source: 'nci-official' };\n    }\n\n    if (['rti-1', 'rti-2', 'la-3'].includes(channel.id)) {
      if (!player || typeof player.loadRTIPlay !== 'function') return { ok: false, code: 'PLAYER_NOT_READY', channel: channel };
      if (typeof root.fetch !== 'function') {
        player.setStatus('Vérification RTI Play indisponible', 'error');
        return { ok: false, code: 'RTI_STATUS_UNAVAILABLE', channel: channel };
      }

      player.cleanup?.();
      player.setStatus('Vérification RTI Play…');

      root.fetch('/api/rti-live-status', { cache: 'no-store' })
        .then(function (response) {
          if (!response.ok) throw new Error('RTI_STATUS_HTTP');
          return response.json();
        })
        .then(function (status) {
          if (!status.available) {
            player.setStatus('LIVE NON DISPONIBLE', 'error');
            return;
          }
          if (status.activeChannel !== channel.id) {
            player.setStatus('LIVE NON DISPONIBLE', 'error');
            root.dispatchEvent(new CustomEvent('streamlive:rti-unavailable', {
              detail: { channel: channel, activeChannel: status.activeChannel || null }
            }));
            return;
          }
          player.loadRTIPlay(status.liveUrl || channel.rtiplayUrl || 'https://www.rtiplay.ci/', status.activeName || channel.name);
          root.dispatchEvent(new CustomEvent('streamlive:channel-selected', {
            detail: { channel: channel, mode: 'live', source: 'rtiplay', activeChannel: status.activeChannel }
          }));
        })
        .catch(function () {
          player.setStatus('LIVE NON DISPONIBLE', 'error');
        });

      return { ok: true, code: 'CHECKING', channel: channel, mode: 'live', source: 'rtiplay' };
    }

    if (!channel.streamEnabled || !channel.streamConfigured || (!channel.productionUrl && !channel.youtubeChannelId)) {
      if (player && typeof player.cleanup === 'function') player.cleanup();
      if (player && typeof player.setStatus === 'function') player.setStatus('Flux indisponible — source non configurée','error');
      return { ok: false, code: 'STREAM_UNAVAILABLE', channel: channel };
    }

    if (!player || typeof player.loadNTSMedia !== 'function') {
      return { ok: false, code: 'PLAYER_NOT_READY', channel: channel };
    }

    const mode = options && options.mode === 'live' ? 'live' : 'replay';
    if (channel.streamSource === 'youtube-live' && channel.youtubeChannelId && typeof player.loadYouTubeLive === 'function') {
      player.loadYouTubeLive(channel.youtubeChannelId);
    } else {
      player.loadNTSMedia(channel.productionUrl, mode);
    }

    root.dispatchEvent(new CustomEvent('streamlive:channel-selected', {
      detail: { channel: channel, mode: mode }
    }));

    return { ok: true, code: 'LOADED', channel: channel, mode: mode };
  }

  function selectFromUrl() {
    const params = new URLSearchParams(root.location.search);
    const identifier = params.get('channel') || params.get('channelId') || params.get('channelNumber');
    if (!identifier) return null;
    return select(identifier, { mode: params.get('mode') });
  }

  root.StreamLiveChannelManager = {
    getChannels: getChannels,
    getChannel: getChannel,
    select: select,
    selectFromUrl: selectFromUrl
  };
})(window);
