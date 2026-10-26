# Configuration StreamNex — Flutterwave

Aucun secret ne doit être ajouté au dépôt GitHub, au HTML ou à un message de chat. Configure les variables suivantes dans Netlify, avec la portée **Functions**.

- `FLW_SECRET_KEY` : clé secrète Flutterwave du compte marchand. Commence par l'environnement de test, puis utilise la clé live après validation du compte.
- `STREAMNEX_SESSION_SECRET` : secret aléatoire long utilisé pour signer les sessions d'abonnement. Génère-en un avec `openssl rand -hex 32`.
- `STREAMNEX_SITE_URL` : URL HTTPS publique du site StreamNex, sans barre oblique finale.
- `TMDB_API_KEY` : clé API TMDB v3 pour charger le catalogue. Elle est utilisée côté serveur et n'est pas exposée dans la page HTML.

Le paiement est créé côté serveur, limité aux offres configurées (Pass 24h : 0,10 EUR ; Basic : 3,99 EUR/mois ; Standard : 6,99 EUR/mois), puis vérifié via l'API de vérification Flutterwave. Le navigateur ne peut pas déclarer lui-même un paiement réussi. La session d'accès est signée et envoyée dans un cookie `HttpOnly; Secure; SameSite=Lax`.

L'offre Premium reste désactivée tant que son prix n'a pas été validé et configuré côté serveur. Les prix existants sont en EUR : confirme dans le tableau de bord Flutterwave que le compte marchand et la devise EUR sont activés avant d'accepter des paiements réels. L'acceptation d'une carte prépayée dépend aussi de la banque émettrice et de ses contrôles.

## Avant la mise en production

1. Configurer les quatre variables ci-dessus dans Netlify.
2. Tester avec les clés et les cartes de test Flutterwave.
3. Vérifier un paiement réussi, un paiement refusé, un montant incorrect et une référence de transaction invalide.
4. Ne passer aux clés live qu'après validation du compte marchand.
5. Déployer uniquement après ces vérifications.