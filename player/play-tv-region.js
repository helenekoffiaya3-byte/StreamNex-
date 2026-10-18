/* StreamLive — Play TV regional offer selector.
 * Device coordinates are requested only after the user presses the button.
 * Reverse geocoding uses OpenStreetMap Nominatim and its country code.
 */
(function () {
  'use strict';
  const EUROPE = new Set(['FR','BE','DE','ES','IT','PT','NL','LU','CH','AT','IE','GB','SE','NO','DK','FI','PL','CZ','GR','RO']);
  const AMERICAS = new Set(['US','CA','MX','BR','AR','CL','CO','PE','UY','EC','CR','PA','DO','JM','TT']);
  const OFFERS = {
    CI: { variantId: 'play-tv-cote-ivoire', label: 'Côte d’Ivoire', price: '3 000 FCFA/mois' },
    EUROPE: { variantId: 'play-tv-europa', label: 'Europa', price: '8,50 €/mois' },
    INTERNATIONAL: { variantId: 'play-tv-international', label: 'International', price: '14 $ US/mois' }
  };
  function chooseOffer(code) {
    if (code === 'CI') return OFFERS.CI;
    if (EUROPE.has(code)) return OFFERS.EUROPE;
    return OFFERS.INTERNATIONAL;
  }
  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function mount() {
    const host = document.querySelector('main') || document.body;
    if (document.getElementById('play-tv-region-card')) return;
    const card = document.createElement('section');
    card.id = 'play-tv-region-card';
    card.setAttribute('aria-live', 'polite');
    card.style.cssText = 'margin:16px 0;padding:16px 18px;border:1px solid #343b46;border-radius:14px;background:linear-gradient(120deg,#151e29,#10151d);color:#f4f7fb;display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;font-family:inherit;';
    card.innerHTML = '<div style="min-width:180px;flex:1"><div style="font-size:11px;letter-spacing:1.3px;text-transform:uppercase;color:#42e8b4;font-weight:800">Votre offre Play TV</div><div id="play-tv-offer-name" style="font-size:21px;font-weight:850;margin-top:4px">Play TV</div><div id="play-tv-offer-detail" style="font-size:13px;color:#b5c1d0;margin-top:3px">Détectez votre pays pour afficher l’offre régionale.</div><div id="play-tv-location-status" style="font-size:11px;color:#9aa8ba;margin-top:6px">Aucune localisation demandée.</div></div><button id="play-tv-detect" type="button" style="border:0;border-radius:9px;padding:11px 14px;background:#42e8b4;color:#061711;font-weight:800;cursor:pointer">Détecter mon pays</button>';
    const anchor = host.querySelector('.hero') || host.querySelector('.top') || host.firstElementChild;
    if (anchor && anchor.parentNode === host) anchor.insertAdjacentElement('afterend', card);
    else host.prepend(card);

    const offerName = card.querySelector('#play-tv-offer-name');
    const detail = card.querySelector('#play-tv-offer-detail');
    const status = card.querySelector('#play-tv-location-status');
    const button = card.querySelector('#play-tv-detect');

    function show(code, countryName, method) {
      const offer = chooseOffer(code);
      offerName.textContent = 'Play TV';
      detail.textContent = offer.label + ' · ' + offer.price;
      status.textContent = 'Pays détecté : ' + (countryName || code) + ' (' + code + ') · variante ' + offer.variantId + ' · ' + method;
      card.dataset.countryCode = code;
      card.dataset.variantId = offer.variantId;
      try { localStorage.setItem('streamlive-play-tv-country', code); } catch (_) {}
      try { localStorage.setItem('streamlive-play-tv-variant', offer.variantId); } catch (_) {}
      window.dispatchEvent(new CustomEvent('streamlive:play-tv-region-ready', {detail:{countryCode:code, countryName:countryName || code, variantId:offer.variantId, price:offer.price}}));
    }
    try {
      const saved = localStorage.getItem('streamlive-play-tv-country');
      if (saved && /^[A-Z]{2}$/.test(saved)) {
        const cached = chooseOffer(saved);
        offerName.textContent = 'Play TV';
        detail.textContent = cached.label + ' · ' + cached.price;
        status.textContent = 'Pays mémorisé : ' + saved + '. Appuyez pour actualiser la localisation.';
        card.dataset.countryCode = saved;
        card.dataset.variantId = cached.variantId;
      }
    } catch (_) {}

    button.addEventListener('click', function () {
      if (!('geolocation' in navigator)) {
        status.textContent = 'La géolocalisation n’est pas disponible sur cet appareil ou navigateur.';
        return;
      }
      button.disabled = true;
      button.textContent = 'Localisation…';
      status.textContent = 'En attente de votre autorisation de localisation…';
      navigator.geolocation.getCurrentPosition(async function (position) {
        try {
          status.textContent = 'Pays en cours d’identification…';
          const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + encodeURIComponent(position.coords.latitude) + '&lon=' + encodeURIComponent(position.coords.longitude) + '&zoom=3&addressdetails=1';
          const response = await fetch(url, {headers:{'Accept':'application/json'}});
          if (!response.ok) throw new Error('reverse-geocode-failed');
          const data = await response.json();
          const code = String(data.address && data.address.country_code || '').toUpperCase();
          if (!/^[A-Z]{2}$/.test(code)) throw new Error('country-code-missing');
          show(code, data.address.country || code, 'géolocalisation de l’appareil');
        } catch (_) {
          status.textContent = 'Position obtenue, mais le pays n’a pas pu être déterminé. Réessayez ou vérifiez votre connexion.';
        } finally {
          button.disabled = false;
          button.textContent = 'Actualiser mon pays';
        }
      }, function (error) {
        const message = error.code === 1 ? 'Autorisation refusée. Autorisez la localisation dans les paramètres du navigateur.' : error.code === 2 ? 'Position indisponible. Vérifiez les services de localisation.' : 'Délai de localisation dépassé. Réessayez.';
        status.textContent = message;
        button.disabled = false;
        button.textContent = 'Réessayer';
      }, {enableHighAccuracy:false, timeout:15000, maximumAge:300000});
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();
