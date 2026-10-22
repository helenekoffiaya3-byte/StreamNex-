/* StreamLive — catalogue commercial classé en cinq catégories distinctes. */
(function () {
  'use strict';
  const EUROPE = new Set(['FR','BE','DE','ES','IT','PT','NL','LU','CH','AT','IE','GB','SE','NO','DK','FI','PL','CZ','GR','RO']);
  const AMERICAS = new Set(['US','CA','MX','BR','AR','CL','CO','PE','UY','EC','CR','PA','DO','JM','TT']);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function regionFor(code) {
    if (code === 'CI') return 'Côte d’Ivoire';
    if (EUROPE.has(code)) return 'Europa';
    if (AMERICAS.has(code)) return 'Amérique';
    return 'International';
  }
  function playTvFor(code) {
    if (code === 'CI') return { region:'Côte d’Ivoire', price:'3 000 FCFA/mois' };
    if (EUROPE.has(code)) return { region:'Europa', price:'8,50 €/mois' };
    return { region:regionFor(code), price:'14 $ US/mois' };
  }
  function mount() {
    if (document.getElementById('streamlive-commercial-catalog')) return;
    const main = document.querySelector('main');
    if (!main) return;
    const section = document.createElement('section');
    section.id = 'streamlive-commercial-catalog';
    section.style.cssText = 'margin:28px 0 36px;color:var(--text,#f4f7fb);';
    section.innerHTML = `
      <header style="margin-bottom:16px">
        <p style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--accent,#42e8b4);font-weight:800">Catalogue commercial</p>
        <h2 style="font-size:24px;margin-top:4px">Les produits StreamLive</h2>
        <p style="font-size:12px;color:var(--muted,#9aa8ba);margin-top:5px">Bouquets, pass, formules, packs et campagnes promotionnelles sont présentés séparément.</p>
      </header>
      <nav aria-label="Catégories commerciales" style="display:flex;gap:8px;flex-wrap:wrap;margin:0 0 22px">
        <a href="#sl-cat-bouquets" style="padding:9px 13px;border:1px solid #354154;border-radius:999px;background:#17232e;font-size:12px;font-weight:750">Bouquets</a>
        <a href="#sl-cat-passes" style="padding:9px 13px;border:1px solid #354154;border-radius:999px;font-size:12px;font-weight:750">Pass</a>
        <a href="#sl-cat-formules" style="padding:9px 13px;border:1px solid #354154;border-radius:999px;font-size:12px;font-weight:750">Formules</a>
        <a href="#sl-cat-packs" style="padding:9px 13px;border:1px solid #354154;border-radius:999px;font-size:12px;font-weight:750">Packs</a>
        <a href="#sl-cat-offres" style="padding:9px 13px;border:1px solid #354154;border-radius:999px;font-size:12px;font-weight:750">Offres promotionnelles</a>
      </nav>
      <p id="streamlive-bouquet-country" style="font-size:12px;color:var(--muted,#9aa8ba);margin:-8px 0 20px">La région Play TV sera affichée après détection du pays.</p>
      <section id="sl-cat-bouquets" style="scroll-margin-top:90px;margin-bottom:26px">
        <div style="display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px"><h3 style="font-size:19px">Bouquets</h3><a href="./apps.html" style="font-size:12px;color:var(--accent,#42e8b4);font-weight:750">Voir les chaînes et apps →</a></div>
        <div id="streamlive-bouquet-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px"></div>
      </section>
      <section id="sl-cat-passes" style="scroll-margin-top:90px;margin-bottom:18px">
        <h3 style="font-size:19px;margin-bottom:8px">Pass</h3>
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#28203b,#10151e);max-width:760px">
          <div style="font-size:11px;color:#d7baff;font-weight:850;letter-spacing:1px;text-transform:uppercase">Pass divertissement</div>
          <h4 style="font-size:22px;margin:7px 0">DIVERTISSEMENT+</h4>
          <p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">Chaînes de divertissement, jeunesse, cinéma, musique, découverte et sport.</p>
          <strong style="font-size:24px">18 €</strong>
          <p style="font-size:11px;color:#91a0b2;margin-top:5px">Liste de chaînes d’après la capture fournie, à confirmer avant publication définitive.</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">
            ${['Cartoonito','Cartoon Network','Boomerang','Nickelodeon','Nickelodeon+1','Nickelodeon Junior','Nicktoons','Télétoon+','Télétoon+1','Piwi+','Tiji','Canal J','Infosport+','Automoto','Equidia','MGGTV','Polar+','Série Club','RTL9','AB1','Novelas+','Action','MTV','Comédie+','Paris Première','Téva','Mangas','Comedy Central','Planète+','Planète+ Crime','Planète+ Aventure','Museum','Toute l’Histoire','La Chaîne Météo','Europe 2 TV','M6 Music','StreamNex Ciné','StreamNex Box-office','StreamNex Sport 360','StreamNex J'].map(name => '<span style="font-size:11px;padding:5px 8px;border-radius:7px;background:#222d3b;color:#e4eaf2;border:1px solid #354154">'+esc(name)+'</span>').join('')}
          </div>
        </article>
      </section>
      <section id="sl-cat-formules" style="scroll-margin-top:90px;margin-bottom:18px"><h3 style="font-size:19px;margin-bottom:8px">Formules</h3><p style="font-size:13px;color:var(--muted,#9aa8ba);padding:15px;border:1px solid #293443;border-radius:12px">Aucune formule publiée pour le moment.</p></section>
      <section id="sl-cat-packs" style="scroll-margin-top:90px;margin-bottom:18px"><h3 style="font-size:19px;margin-bottom:8px">Packs</h3><p style="font-size:13px;color:var(--muted,#9aa8ba);padding:15px;border:1px solid #293443;border-radius:12px">Aucun pack publié pour le moment.</p></section>
      <section id="sl-cat-offres" style="scroll-margin-top:90px;margin-bottom:18px"><h3 style="font-size:19px;margin-bottom:8px">Offres promotionnelles</h3><p style="font-size:13px;color:var(--muted,#9aa8ba);padding:15px;border:1px solid #293443;border-radius:12px">Les offres correspondent aux campagnes promotionnelles. Aucune campagne active n’est publiée pour le moment.</p></section>`;
    const anchor = document.getElementById('play-tv-region-card') || main.querySelector('.hero');
    if (anchor && anchor.parentNode === main) anchor.insertAdjacentElement('afterend', section);
    else main.prepend(section);
    const cards = section.querySelector('#streamlive-bouquet-cards');
    function render(code) {
      code = /^[A-Z]{2}$/.test(code || '') ? code : '';
      const offer = code ? playTvFor(code) : { region:'Pays à détecter', price:'Tarif régional après détection' };
      const supaPrice = AMERICAS.has(code) ? '60 $ US/mois' : '59,99 €/mois';
      section.querySelector('#streamlive-bouquet-country').textContent = code ? 'Région détectée : ' + regionFor(code) + ' (' + code + ')' : 'Détectez votre pays dans la carte Play TV pour afficher le tarif régional.';
      cards.innerHTML = `
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#35252a,#10151e)">
          <div style="font-size:11px;color:#ff8f8f;font-weight:850;letter-spacing:1px;text-transform:uppercase">Côte d’Ivoire</div>
          
          <h4 style="font-size:21px;margin:7px 0">Free TV</h4><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">20 chaînes · streaming via StreamLive ou StreamNex.</p><strong style="font-size:17px">400 F CFA</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Service vidéo associé : M6+.</p>
        </article>
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#15252b,#10151e)">
          
          <div style="font-size:11px;color:#42e8b4;font-weight:850;letter-spacing:1px;text-transform:uppercase">Offre régionale</div><h4 style="font-size:21px;margin:7px 0">Play TV</h4><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">Variante : ${esc(offer.region)}</p><strong style="font-size:17px">${esc(offer.price)}</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Service vidéo associé : TF1+.</p>
        </article>
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#242036,#10151e)">
          
          <div style="font-size:11px;color:#c7a8ff;font-weight:850;letter-spacing:1px;text-transform:uppercase">Bouquet unique</div><h4 style="font-size:21px;margin:7px 0">Max Play TV</h4><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">Un seul bouquet disponible en Amérique, en Europa et en Côte d’Ivoire.</p><strong style="font-size:17px">50 €/mois ou 50 $ US/mois</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Services vidéo associés : Paramount+ et M6+.</p>
        </article>
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#35251a,#10151e)">
          <div style="font-size:11px;color:#ffbd80;font-weight:850;letter-spacing:1px;text-transform:uppercase">Bouquet régional · en préparation</div><h4 style="font-size:21px;margin:7px 0">Supa Boom TV</h4><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">320 chaînes prévues · Amérique, Europa et Côte d’Ivoire.</p><strong style="font-size:17px">${supaPrice}</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Services vidéo associés : TF1+, Paramount+ et M6+.</p>
        </article>
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#1c2c42,#10151e)">
          
          <div style="font-size:11px;color:#9fc6ff;font-weight:850;letter-spacing:1px;text-transform:uppercase">Catalogue complet · en préparation</div><h4 style="font-size:21px;margin:7px 0">Now TV</h4><p style="font-size:13px;color:#bdc8d6;margin-bottom:10px">Toutes les chaînes du catalogue StreamLive.</p><strong style="font-size:17px">${AMERICAS.has(code) ? '69 $ US/mois' : '70 €/mois'}</strong><p style="font-size:11px;color:#91a0b2;margin-top:9px">Services vidéo associés : Netflix, HBO Max, Paramount+, TF1+ et M6+.</p>
        </article>`;
    }
    let saved = '';
    try { saved = localStorage.getItem('streamlive-play-tv-country') || ''; } catch (_) {}
    render(saved);
    window.addEventListener('streamlive:play-tv-region-ready', event => render(String(event.detail && event.detail.countryCode || '').toUpperCase()));
    window.addEventListener('storage', event => { if (event.key === 'streamlive-play-tv-country') render(String(event.newValue || '').toUpperCase()); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once:true});
  else mount();
})();