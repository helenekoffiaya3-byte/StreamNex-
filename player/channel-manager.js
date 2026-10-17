/* StreamLive — Web-link Channel Manager for NTS-1.4-Lava
 * The catalogue is injected as window.STREAMLIVE_CHANNELS.
 * Every channel is opened from its official webUrl.
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
      webUrl: channel.webUrl || null,
      liveOnly: Boolean(channel.liveOnly)
    };
  }

  function getChannels() {
    return catalogue().map(normalizeChannel).filter(Boolean);
  }

  function getChannel(identifier) {
    if (identifier === undefined || identifier === null || identifier === '') return null;
    const value = String(identifier).trim().toLowerCase();
    return getChannels().find(function (channel) {
      return channel.id.toLowerCase() === value || String(channel.channelNumber) === value;
    }) || null;
  }

  function select(identifier, options) {
    const player = root.NTS14LavaPlayer;
    const channel = getChannel(identifier);
    if (!channel) return { ok: false, code: 'CHANNEL_NOT_FOUND', channel: null };
    if (!player || typeof player.loadWebLive !== 'function') return { ok: false, code: 'PLAYER_NOT_READY', channel };
    const mode = options && options.mode === 'live' ? 'live' : 'replay';
    root.StreamLiveCurrentChannelId = channel.id;

    if (!channel.webUrl) {
      player.setStatus('Lien web officiel non configuré pour cette chaîne', 'error');
      root.dispatchEvent(new CustomEvent('streamlive:source-unavailable', { detail: { channel, reason: 'WEB_URL_MISSING' } }));
      root.dispatchEvent(new CustomEvent('streamlive:channel-selected', { detail: { channel, mode } }));
      return { ok: false, code: 'WEB_URL_MISSING', channel, mode };
    }

    player.loadWebLive(channel.webUrl);
    root.dispatchEvent(new CustomEvent('streamlive:channel-selected', { detail: { channel, mode } }));
    return { ok: true, code: 'OPENED_WEB_LINK', channel, mode };
  }

  function selectFromUrl() {
    const params = new URLSearchParams(root.location.search);
    const identifier = params.get('channel') || params.get('channelId') || params.get('channelNumber');
    if (!identifier) return null;
    return select(identifier, { mode: params.get('mode') });
  }

  root.StreamLiveChannelManager = { getChannels, getChannel, select, selectFromUrl };
})(window);
