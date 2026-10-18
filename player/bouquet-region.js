/* StreamLive — region-aware bouquet display.
 * Play TV has one region-selected offer. Max TV remains one shared bouquet.
 */
(function () {
  'use strict';
  const EUROPE = new Set(['FR','BE','DE','ES','IT','PT','NL','LU','CH','AT','IE','GB','SE','NO','DK','FI','PL','CZ','GR','RO']);
  const AMERICAS = new Set(['US','CA','MX','BR','AR','CL','CO','PE','UY','EC','CR','PA','DO','JM','TT']);
  function regionFor(code) {
    if (code === 'CI') return 'Côte d’Ivoire';
    if (EUROPE.has(code)) return 'Europa';
    if (AMERICAS.has(code)) return 'Amérique';
    return 'International';
  }
  function playTvFor(code) {
    if (code === 'CI') return { region:'Côte d’Ivoire', price:'3 000 FCFA/mois' };
    if (EUROPE.has(code)) return { region:'Europa', price:'8,50 €/mois' };
    return { region: regionFor(code), price:'14 $ US/mois' };
  }
  function mount() {
    if (document.getElementById('streamlive-bouquets')) return;
    const main = document.querySelector('main');
    if (!main) return;
    const section = document.createElement('section');
    section.id = 'streamlive-bouquets';
    section.style.cssText = 'margin:22px 0 30px;color:var(--text,#f4f7fb);';
    section.innerHTML = '<div style="display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px"><div><p style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent,#42e8b4);font-weight:800">Offres et bouquets</p><h2 style="font-size:24px;margin-top:4px">Vos bouquets StreamLive</h2><p id="streamlive-bouquet-country" style="font-size:12px;color:var(--muted,#9aa8ba);margin-top:5px">La région Play TV sera sélectionnée après détection du pays.</p></div><a href="./apps.html" style="font-size:12px;color:var(--accent,#42e8b4);font-weight:750">Voir les chaînes et apps →</a></div><div id="streamlive-bouquet-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px"></div>';
    const anchor = document.getElementById('play-tv-region-card') || main.querySelector('.hero');
    if (anchor && anchor.parentNode === main) anchor.insertAdjacentElement('afterend', section);
    else main.prepend(section);
    const cards = section.querySelector('#streamlive-bouquet-cards');
    function render(code) {
      const known = /^[A-Z]{2}$/.test(code || '');
      const offer = known ? playTvFor(code) : { region:'Pays à détecter', price:'Tarif régional après détection' };
      section.querySelector('#streamlive-bouquet-country').textContent = known ? 'Région détectée : ' + regionFor(code) + ' (' + code + ')' : 'Détectez votre pays dans la carte Play TV pour afficher le tarif régional.';
      cards.innerHTML = '<article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#15252b,#10151e)"><div style="font-size:11px;color:#42e8b4;font-weight:850;letter-spacing:1px;text-transform:uppercase">Offre régionale</div><h3 style="font-size:21px;margin:7px 0">Play TV</h3><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">Variante : ' + offer.region + '</p><strong style="font-size:17px">' + offer.price + '</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Une seule offre affichée selon votre pays.</p></article><article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#242036,#10151e)"><div style="font-size:11px;color:#c7a8ff;font-weight:850;letter-spacing:1px;text-transform:uppercase">Bouquet unique</div><h3 style="font-size:21px;margin:7px 0">Max TV</h3><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">Un seul bouquet disponible en Amérique, en Europa et en Côte d’Ivoire.</p><strong style="font-size:17px">50 €/mois ou 50 $ US/mois</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Même bouquet partout, sans variantes régionales séparées.</p></article>';
    }
    let saved = '';
    try { saved = localStorage.getItem('streamlive-play-tv-country') || ''; } catch (_) {}
    render(saved);
    window.addEventListener('streamlive:play-tv-region-ready', event => render(String(event.detail && event.detail.countryCode || '').toUpperCase()));
    window.addEventListener('storage', event => { if (event.key === 'streamlive-play-tv-country') render(event.newValue || ''); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();