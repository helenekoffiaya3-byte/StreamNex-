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
      liveOnly: Boolean(channel.liveOnly),
      satelliteFallback: Boolean(channel.satelliteFallback),
      youtubeChannelId: channel.youtubeChannelId || null,
      webUrl: channel.webUrl || null
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

  async function resolveSatellite(channel, reason) {
    try {
      const response = await fetch('/api/source-resolve?id=' + encodeURIComponent(channel.id) + '&preferSatellite=1', { cache: 'no-store' });
      if (!response.ok) throw new Error('RESOLVER_HTTP_' + response.status);
      const data = await response.json();
      if (!data?.source?.url) return { ok: false, reason: data?.satellite?.status || 'CASTSAT_UNAVAILABLE' };
      return { ok: true, url: data.source.url, metadata: data };
    } catch (error) {
      return { ok: false, reason: String(error) };
    }
  }

  async function loadSatelliteFallback(channel, mode, reason) {
    const player = root.NTS14LavaPlayer;
    const result = await resolveSatellite(channel, reason);
    if (!result.ok) {
      if (player && typeof player.setStatus === 'function') player.setStatus('Live indisponible — secours satellite non validé, non autorisé ou non configuré','error');
      root.dispatchEvent(new CustomEvent('streamlive:source-unavailable', { detail: { channel, source: 'cast-sat', reason: result.reason } }));
      return false;
    }
    if (player && typeof player.loadNTSMedia === 'function') {
      player.loadNTSMedia(result.url, mode);
      if (typeof player.setStatus === 'function') player.setStatus('Secours satellite — chargement…');
    }
    root.dispatchEvent(new CustomEvent('streamlive:source-fallback', { detail: { channel, source: 'cast-sat', reason } }));
    return true;
  }

  function bindPlayerFailover(channel, mode) {
    const handler = (event) => {
      if (event.detail?.channelId !== channel.id) return;
      root.removeEventListener('streamlive:player-error', handler);
      loadSatelliteFallback(channel, mode, event.detail?.reason || 'PLAYER_ERROR');
    };
    root.addEventListener('streamlive:player-error', handler, { once: true });
  }

  function select(identifier, options) {
    const player = root.NTS14LavaPlayer;
    const channel = getChannel(identifier);
    if (!channel) return { ok: false, code: 'CHANNEL_NOT_FOUND', channel: null };
    if (!player || typeof player.loadNTSMedia !== 'function') return { ok: false, code: 'PLAYER_NOT_READY', channel };
    const mode = options && options.mode === 'live' ? 'live' : 'replay';
    root.StreamLiveCurrentChannelId = channel.id;

    const hasValidYouTubeId = Boolean(
      channel.youtubeChannelId &&
      /^[A-Za-z0-9_-]{20,}$/.test(String(channel.youtubeChannelId))
    );
    const liveAvailable = channel.streamEnabled && Boolean(
      (channel.productionUrl && (channel.streamSource !== 'youtube-live' || hasValidYouTubeId)) ||
      (channel.streamSource === 'youtube-live' && hasValidYouTubeId)
    );

    if (liveAvailable) {
      bindPlayerFailover(channel, mode);
      if (channel.streamSource === 'web-live' && channel.webUrl && typeof player.loadWebLive === 'function') {
        player.loadWebLive(channel.webUrl);
      } else if (channel.streamSource === 'youtube-live' && hasValidYouTubeId && typeof player.loadYouTubeLive === 'function') {
        player.loadYouTubeLive(channel.youtubeChannelId);
      } else if (channel.productionUrl) {
        player.loadNTSMedia(channel.productionUrl, mode);
      } else {
        loadSatelliteFallback(channel, mode, 'LIVE_SOURCE_INVALID');
      }
    } else {
      loadSatelliteFallback(channel, mode, channel.streamEnabled ? 'LIVE_NOT_CONFIGURED' : 'LIVE_DISABLED');
    }

    root.dispatchEvent(new CustomEvent('streamlive:channel-selected', { detail: { channel, mode } }));
    return {
      ok: true,
      code: liveAvailable ? 'LOADED' : 'FALLBACK_PENDING',
      channel,
      mode
    };
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
