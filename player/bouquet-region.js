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
      <section id="sl-cat-bouquets" style="scroll-margin-top:90px;margin-bottom:26px">
        <div style="display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px"><h3 style="font-size:19px">Bouquets</h3></div>
        <p style="font-size:13px;color:var(--muted,#9aa8ba);padding:15px;border:1px solid #293443;border-radius:12px">Tous les anciens bouquets ont été supprimés. Les nouveaux bouquets seront ajoutés ici lors de la prochaine configuration.</p>
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
        <article style="padding:18px;border:1px solid #354154;border-radius:14px;background:linear-gradient(135deg,#173044,#10151e);max-width:760px;margin-top:12px">
          <div style="font-size:11px;color:#8fd7ff;font-weight:850;letter-spacing:1px;text-transform:uppercase">Pass TV · disponibilité régionale à confirmer</div>
          <h4 style="font-size:22px;margin:7px 0">My TV+</h4>
          <strong style="font-size:24px">3,23 €</strong>
          <p style="font-size:12px;color:#bdc8d6;margin:8px 0">CANAL+ indique que l’accès aux programmes et aux offres dépend de la zone géographique.</p>
          <details style="margin-top:12px"><summary style="cursor:pointer;font-size:13px;font-weight:750">Afficher les chaînes incluses</summary>
            <p style="font-size:12px;color:#9fb0c3;margin-top:10px">TNT</p>
            <p style="font-size:12px;line-height:1.8;color:#e4eaf2">TF1 · France 2 · France 3 · France 3 Régions · M6 · ARTE · W9 · TMC · TFX · LCP Public Sénat · France 4 · BFM TV · CNEWS · CStar · Gulli · TF1 Séries Films · La Chaîne L’Équipe · 6ter · RMC Story · RMC Découverte · RMC Life · LCI · France Info</p>
            <p style="font-size:12px;color:#9fb0c3;margin-top:10px">Chaînes thématiques</p>
            <p style="font-size:12px;line-height:1.8;color:#e4eaf2">RTL9 · Infosport+ · Sport en France · Comédie+ · TV5MONDE · Planète+ Aventure · TV Monaco · MTV · Mangas · France 24 Français · Euronews · BBC News · BFM Business · Bloomberg Télévision · CNN · CNBC · i24NEWS · Al Jazeera · France 24 English · ARTE · Al Jazeera Channel · Euronews Deutsch · Arirang · NHK World Japan</p>
            <p style="font-size:12px;color:#9fb0c3;margin-top:10px">Chaînes digitales</p>
            <p style="font-size:12px;line-height:1.8;color:#e4eaf2">Clique TV · Gym Direct · Groland · Comedy Club · Les Deschiens · Les Nouveaux Explorateurs · Les Interviews de Raphaël Mezrahi · Les Animaux de la 8</p>
            <p style="font-size:11px;color:#91a0b2;margin-top:10px">La description annonce aussi « + 25 chaînes thématiques » et « + 8 chaînes digitales ». La disponibilité réelle doit être confirmée selon le pays.</p>
          </details>
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
      section.querySelector('#streamlive-bouquet-country').textContent = 'Les anciens bouquets ont été supprimés. Aucun tarif ni produit de bouquet n’est affiché.';
      cards.innerHTML = `
        <div style="grid-column:1/-1;padding:18px;border:1px dashed #354154;border-radius:14px;color:#bdc8d6;font-size:13px">
          Tous les anciens bouquets ont été supprimés. La catégorie est vide et prête à être reconstruite.
        </div>`
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