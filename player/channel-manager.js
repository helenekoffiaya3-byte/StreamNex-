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
      streamConfigured: Boolean(channel.streamConfigured ?? channel.productionUrl)
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

    if (!channel.streamEnabled || !channel.streamConfigured || !channel.productionUrl) {
      if (player && typeof player.cleanup === 'function') player.cleanup();
      if (player && typeof player.setStatus === 'function') player.setStatus('Flux indisponible — source HLS non configurée','error');
      return { ok: false, code: 'STREAM_UNAVAILABLE', channel: channel };
    }

    if (!player || typeof player.loadNTSMedia !== 'function') {
      return { ok: false, code: 'PLAYER_NOT_READY', channel: channel };
    }

    const mode = options && options.mode === 'live' ? 'live' : 'replay';
    player.loadNTSMedia(channel.productionUrl, mode);

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
