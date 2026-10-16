# StreamLive

StreamLive est un catalogue et un lecteur de chaînes TV avec **deux voies de réception complémentaires** :

1. **Live/IP en priorité** : HLS de production ou YouTube Live officiel.
2. **Cast Sat en secours** : réception satellite DVB-S/DVB-S2 via un tuner/gateway autorisé, conversion en IP/HLS, puis bascule automatique lorsque la source Live est indisponible.

Le lecteur **NTS-1.4-Lava** est conservé. Cast Sat n'est pas un deuxième catalogue concurrent : c'est une source de secours associée à la même chaîne.

## Architecture

- `config/channels.js` — catalogue source actuel : **431 entrées** (inventaire réconcilié dans `docs/catalogue-inventory.json`).
- `config/cast-sat.js` — cartographie satellite et paramètres de réception.
- `netlify/functions/channels.mjs` — API `/api/channels`.
- `netlify/functions/stream-status.mjs` — état des sources Live.
- `netlify/functions/stream-check.mjs` — vérification des HLS configurés.
- `netlify/functions/source-resolve.mjs` — résolution de la source de secours Cast Sat.
- `player/index.html` — lecteur NTS-1.4-Lava.
- `player/channel-manager.js` — sélection et bascule Live → Cast Sat.
- `player/channel-selector.js` — recherche et catégories.
- `player/favorite-manager.js` — favoris persistants.

## Priorité des sources

Pour une chaîne donnée, StreamLive applique cette logique :

```text
Live/IP disponible
      │
      ├── oui → lecture Live
      │
      └── non / erreur fatale
               │
               ▼
       Cast Sat configuré ?
               │
          ┌────┴────┐
         oui       non
          │         │
          ▼         ▼
       HLS      indisponible
      satellite
```

Une erreur HLS réseau/média fatale déclenche l'événement `streamlive:player-error`, puis le gestionnaire tente `/api/source-resolve` avec `preferSatellite=1`.

## Cast Sat

Cast Sat représente la **réception physique satellite** et non un contournement de chiffrement.

Le pipeline attendu est :

```text
Antenne + LNB
   ↓
Tuner DVB-S/DVB-S2
   ↓
Scan transpondeur
   ↓
Service TV autorisé / en clair
   ↓
MPEG-TS / SAT>IP
   ↓
Packager HLS
   ↓
StreamLive
```

Les services chiffrés restent marqués comme chiffrés. Aucun accès conditionnel, aucune clé, aucun Control Word et aucun contournement CAS ne doit être stocké dans Git. La redistribution n'est activée que lorsqu'elle est autorisée.

Pour chaque chaîne, le secours HLS satellite utilise, lorsqu'il est configuré, une variable Netlify :

`CASTSAT_<CHANNEL_ID_NORMALISE>_HLS_URL`

Exemple pour RTI 1 :

`CASTSAT_RTI_1_HLS_URL`

La valeur réelle reste dans Netlify et **n'est jamais commitée dans Git**.

## Satellite

La configuration actuelle contient notamment une cartographie SES-4 / 22°W issue des vérifications précédentes et conserve la cible demandée Eutelsat 16A / 16°E comme information distincte. Une position satellite ne doit être considérée comme opérationnelle qu'après réception physique et validation du transpondeur.

Le système est prévu pour évoluer vers plusieurs satellites sans modifier le catalogue maître : chaque entrée satellite doit fournir son propre service, transpondeur et éventuelle sortie IP/HLS autorisée.

## Catalogue

Le catalogue actuel contient **431 entrées** ; l’audit statique trouve 431 IDs uniques et 431 numéros uniques. Les numéros absents 131, 133, 144, 145 et 146 sont consignés sans être complétés..

Chaque chaîne contient notamment :

- `channelNumber`
- `id`
- `tvgId`
- `name`
- `group`
- `logoUrl`
- `productionUrl`
- `streamEnabled`
- `streamEnv`
- éventuellement `youtubeChannelId`

Les URLs HLS privées sont injectées par les variables d'environnement Netlify.

## Logos

Les logos locaux sont servis depuis `player/assets/logos/`. Une référence de logo ne doit pas être considérée comme un fichier valide tant que le fichier n'a pas été contrôlé dans Git.

## Développement

```bash
netlify dev
```

L'application est publiée depuis `player` et les fonctions depuis `netlify/functions`.

## API

### `GET /api/channels`

Retourne le catalogue public.

### `GET /api/stream-status`

Retourne la couverture des sources Live sans exposer les valeurs des variables d'environnement.

### `GET /api/stream-check`

Teste les HLS réellement configurés. Cette route est réservée à l’administration : configure `STREAM_CHECK_TOKEN` dans les variables d’environnement Netlify, puis envoie `Authorization: Bearer <STREAM_CHECK_TOKEN>`. Sans token configuré, la route répond `503`; sans token valide, elle répond `401`. Les URL sources et URL finales ne sont jamais renvoyées par cette route.

### `GET /api/source-resolve?id=<channel>&preferSatellite=1`

Cherche une sortie Cast Sat/HLS configurée pour la chaîne et retourne uniquement les métadonnées nécessaires au basculement.

## Sécurité

- Aucun secret ou URL privée dans Git.
- Aucun contournement CAS.
- Aucun stockage de clés de déchiffrement.
- Les flux satellite chiffrés ne sont utilisables que via une réception et une autorisation légitimes.
- Les variables HLS restent dans Netlify.

## État de finalisation

Le catalogue et l'orchestration Live → Cast Sat sont maintenant structurés. La partie matérielle satellite reste nécessaire pour produire réellement les sorties HLS de secours : StreamLive ne peut pas créer une réception satellite sans tuner/gateway physique.

Avant la mise en production complète, il faut valider les 431 entrées du catalogue, les logos réellement présents, les variables HLS Live, les sorties Cast Sat effectivement configurées et les tests de bascule.
