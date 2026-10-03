# StreamLive

StreamLive est une interface de catalogue et de lecture de chaînes TV. Le catalogue actuel contient 234 entrées uniques. Le lecteur **NTS-1.4-Lava** reste indépendant du catalogue : les métadonnées et les URLs de production sont fournies par la fonction Netlify `/api/channels`.

## Architecture

- `config/channels.js` — catalogue source.
- `netlify/functions/channels.mjs` — API `/api/channels`.
- `player/index.html` — interface et lecteur HLS.
- `player/channel-manager.js` — sélection et orchestration.
- `player/channel-selector.js` — recherche et catégories.
- `player/favorite-manager.js` — favoris persistants dans `localStorage`.

## Développement local

Application statique + fonction Netlify :

```bash
netlify dev
```

L'interface est publiée depuis `player` et les fonctions depuis `netlify/functions`.

## Catalogue

Chaque chaîne contient notamment `channelNumber`, `id`, `name`, `group`, `logoUrl`, `productionUrl` et `streamEnabled`.

Les URLs de flux de production sont injectées par les variables d'environnement Netlify et ne doivent pas être commitées.

## Ajouter une chaîne

1. Ajouter une entrée unique dans `config/channels.js`.
2. Garantir un `channelNumber` et un `id` uniques.
3. Définir le nom, la catégorie et le logo.
4. Associer le flux HLS à une variable d'environnement Netlify.
5. Vérifier `streamEnabled`.
6. Tester `/api/channels` puis la sélection dans le lecteur.

## Logos

Les logos locaux doivent exister sous le dossier publié `player/assets/logos/` si leur URL est relative. Les logos externes doivent provenir de sources stables et compatibles avec les conditions de réutilisation applicables.

## Déploiement Netlify

Le fichier `netlify.toml` configure le dossier publié `player` et les fonctions `netlify/functions`.

Configurer les variables HLS dans Netlify, jamais dans Git. Tester le catalogue et le lecteur avant une publication de production.

## Sécurité

Ne jamais committer de clés, tokens, mots de passe ou URLs privées. Les données sensibles restent dans les variables d'environnement Netlify.

## Validation Étape 5

Les contrôles du catalogue vérifient `id`, `tvgId`, `channelNumber`, `name`, `group`, `logoUrl`, `productionUrl` et le type de `streamEnabled`. Les favoris utilisent `localStorage`. Le lecteur valide les URLs HTTP(S), gère les états de chargement/erreur et ne charge qu'un seul flux à la fois.

### État actuel

- Catalogue : 234 chaînes, IDs/TVG IDs/canaux uniques.
- Favoris : ajout, retrait, persistance et filtre.
- Lecteur : HLS.js + HLS natif, Play/Pause, volume, plein écran, seek en replay et gestion d'erreurs.
- Netlify : publication `player`, fonctions `netlify/functions`, API `/api/channels`.
- Logos : 77 URLs Wikimedia externes et 157 URLs locales référencées. Le dépôt Git actuel ne contient pas encore le dossier `player/assets/logos`; les 157 références locales doivent donc être restaurées avant de considérer l'audit des logos comme terminé.
- Flux : aucune variable `*_HLS_URL` de production n'est actuellement configurée dans le projet Netlify, donc les flux ne peuvent pas encore être testés en lecture réelle.
