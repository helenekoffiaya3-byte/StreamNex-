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

Chaque chaîne contient notamment `channelNumber`, `id`, `name`, `group`, `logoUrl`, `productionUrl`, `streamEnabled` et `streamEnv`.

Les URLs de flux de production sont injectées par les variables d'environnement Netlify et ne doivent pas être commitées.

## Ajouter une chaîne

1. Ajouter une entrée unique dans `config/channels.js`.
2. Garantir un `channelNumber` et un `id` uniques.
3. Définir le nom, la catégorie et le logo.
4. Associer le flux HLS à une variable d'environnement Netlify.
5. Vérifier `streamEnabled`.
6. Tester `/api/channels` puis la sélection dans le lecteur.
7. Contrôler `/api/stream-status` pour vérifier combien de flux HLS sont réellement configurés.

## Logos

Les logos locaux référencés par le catalogue existent sous le dossier publié `player/assets/logos/`. Le catalogue contient actuellement 68 références locales, 133 références externes et 33 entrées S+ sans `logoUrl` volontairement conservées sans modification.

Le contrôle du catalogue confirme que les 234 entrées ont des `id`, `tvgId`, `name` et `group` uniques. Les numéros de chaîne sont également uniques ; ils ne sont pas volontairement renumérotés afin de préserver les identifiants existants.

## Déploiement Netlify

Le fichier `netlify.toml` configure le dossier publié `player` et les fonctions `netlify/functions`.

Configurer les variables HLS dans Netlify, jamais dans Git. Tester le catalogue et le lecteur avant une publication de production.

## Flux HLS

Les flux ne sont pas inventés ni stockés en clair dans Git : chaque chaîne référence une variable `*_HLS_URL` via `streamEnv`. Tant que la variable Netlify correspondante n'est pas définie, `productionUrl` reste `null`, `streamConfigured` est `false` et le lecteur affiche explicitement l'état indisponible. `/api/stream-status` permet de contrôler la couverture de configuration sans exposer les valeurs des variables d'environnement.

Le lecteur HLS utilise Hls.js lorsque disponible, le HLS natif lorsqu'il est supporté par le navigateur, et gère les erreurs réseau/média ainsi que l'état d'attente.

## Sécurité

Ne jamais committer de clés, tokens, mots de passe ou URLs privées. Les données sensibles restent dans les variables d'environnement Netlify.

## Validation Étape 5

Les contrôles du catalogue vérifient `id`, `tvgId`, `channelNumber`, `name`, `group`, `logoUrl`, `productionUrl` et le type de `streamEnabled`. Les favoris utilisent `localStorage`. Le lecteur valide les URLs HTTP(S), gère les états de chargement/erreur et ne charge qu'un seul flux à la fois.

### État actuel

- Catalogue : 234 chaînes, IDs/TVG IDs/canaux uniques.
- Favoris : ajout, retrait, persistance et filtre.
- Lecteur : HLS.js + HLS natif, Play/Pause, volume, plein écran, seek en replay et gestion d'erreurs.
- Netlify : publication `player`, fonctions `netlify/functions`, API `/api/channels`.
- Logos : 140 URLs externes et 94 URLs locales référencées. Les références locales disposent d’un fallback visuel dans le sélecteur afin qu’un logo indisponible ne casse pas l’interface ; les fichiers sources locaux restent à restaurer ou remplacer par des sources externes stables.
- Flux : la structure de vérification HLS est en place (`streamEnv`, `streamConfigured`, `/api/stream-status`) ; la lecture réelle dépend de la configuration des variables `*_HLS_URL` dans l'environnement Netlify.
