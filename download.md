# Téléchargement hors ligne StreamLive

Le téléchargement concerne uniquement les médias MP4 présents dans le stockage serveur autorisé par StreamLive.

## Stockage serveur

Créer le répertoire \`storage/videos/\` et placer les médias autorisés sous la forme \`storage/videos/<mediaId>.mp4\`.

L'identifiant doit respecter \`[A-Za-z0-9_-]{1,128}\`.

## Endpoint

GET /api/download/media?id=<mediaId>

L'API valide l'identifiant et le fichier avant de le diffuser. Aucun chemin de fichier fourni par le navigateur n'est accepté.

## Hors ligne

\`lib/downloadManager.js\` :
1. télécharge le MP4 avec progression ;
2. propose File System Access quand il est disponible ;
3. sinon déclenche le téléchargement géré par le navigateur/OS ;
4. conserve une copie dans IndexedDB pour la lecture offline interne.

Un navigateur ne garantit pas un dossier physique précis sur tous les téléphones.

## Authentification

Le StreamLive actuel ne possède pas encore de mécanisme d'authentification média centralisé dans \`server.js\`. Avant d'utiliser des contenus privés ou sous licence, brancher le contrôle d'accès/abonnement existant dans l'endpoint avant la lecture du fichier.
