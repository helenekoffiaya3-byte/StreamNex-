# StreamLive

StreamLive est un catalogue de chaînes TV qui ouvre chaque chaîne depuis son **lien web officiel**. Le catalogue conserve les numéros, identifiants, noms, catégories et logos des chaînes. Une chaîne sans lien web enregistré reste visible mais son accès est signalé comme non configuré.

## Architecture

- `config/channels.js` — catalogue source unique.
- `netlify/functions/channels.mjs` — API `/api/channels`, qui fournit les métadonnées et le `webUrl`.
- `netlify/functions/stream-status.mjs` — état de configuration des liens web.
- `player/index.html` — lecteur NTS-1.4-Lava et zone d'ouverture des pages web.
- `player/channel-manager.js` — sélection des chaînes par lien web.
- `player/channel-selector.js` — recherche, catégories et favoris.
- `player/favorite-manager.js` — favoris persistants.

## Source de lecture

Le champ `webUrl` est la source de lecture utilisée par StreamLive. La page du diffuseur s'ouvre dans la zone web du lecteur. Certains diffuseurs peuvent interdire l'intégration dans une iframe ; dans ce cas, l'utilisateur doit ouvrir le lien directement dans son navigateur.

StreamLive ne prétend pas qu'un lien web est un flux vidéo direct et ne fabrique pas de liens manquants. Les chaînes sans `webUrl` restent dans le catalogue jusqu'à ce qu'une URL officielle soit fournie.

## API

### `GET /api/channels`

Renvoie les chaînes du catalogue avec leurs identifiants, numéros, catégories, logos et `webUrl`. Le paramètre `mode=live` inclut aussi les entrées `liveOnly`.

### `GET /api/stream-status`

Renvoie le nombre de chaînes disposant d'un `webUrl` et la liste des entrées sans lien web configuré.

## Ajouter ou corriger un lien

Ajouter le lien de la page officielle dans le champ `webUrl` de la chaîne correspondante dans `config/channels.js`. Ne pas ajouter de variable d'environnement pour remplacer ce lien et ne pas supprimer ni renuméroter une chaîne simplement parce que son lien manque.
