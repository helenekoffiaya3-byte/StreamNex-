# Téléchargement hors ligne StreamLive

Le téléchargement concerne uniquement les médias MP4 présents dans le stockage serveur autorisé par StreamLive.

## Stockage serveur

Créer le répertoire \`storage/videos/\` et placer les médias autorisés sous la forme \`storage/videos/<mediaId>.mp4\`.

L'identifiant doit respecter \`[A-Za-z0-9_-]{1,128}\`.

## Endpoint

GET /api/download/media?id=<mediaId>

L'API exige une authentification utilisateur JWT avant de diffuser le fichier. Aucun chemin de fichier fourni par le navigateur n'est accepté. Le jeton peut être transmis via `Authorization: Bearer <JWT>` ou le cookie HTTP-only `streamlive_session`.

## Hors ligne

\`lib/downloadManager.js\` :
1. télécharge le MP4 avec progression ;
2. propose File System Access quand il est disponible ;
3. sinon déclenche le téléchargement géré par le navigateur/OS ;
4. conserve une copie dans IndexedDB pour la lecture offline interne.

Un navigateur ne garantit pas un dossier physique précis sur tous les téléphones.

## Authentification

`GET /api/download/media` utilise désormais une authentification JWT côté serveur. Le JWT doit être signé en HS256 avec `STREAMLIVE_AUTH_JWT_SECRET`, contenir un `sub` utilisateur et un `exp` valide, et disposer de `media:download`, `download:media` ou `download` dans `permissions`/`scope` (le rôle `admin` est également accepté).

Le serveur accepte `Authorization: Bearer <JWT>` ou le cookie HTTP-only `streamlive_session`. Les JWT expirés, mal signés, sans utilisateur ou sans droit de téléchargement sont refusés. Le traitement HTTP `Range` / `206 Partial Content` reste inchangé.
