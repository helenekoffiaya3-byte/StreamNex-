# StreamLive — Étape 1 : audit final du catalogue

Date : 2026-10-01

## État

**Étape 1 terminée sur le plan structurel et du référentiel. Étape 2 non commencée.**

Le catalogue historique a été restauré : aucune entrée n'est supprimée parce qu'elle est un service, une marque ou destinée à un futur bouquet.

- **233 entrées CHANNEL** conservées dans `config/channels.js`.
- **5 entrées SERVICE** conservées dans `config/services.js`.
- **238 fiches d'audit** dans `config/catalogue-audit.json`.
- IDs CHANNEL uniques : OK.
- Numéros CHANNEL uniques : OK.
- IDs globaux CHANNEL + SERVICE uniques : OK.
- Les trous de numérotation sont conservés.
- Aucun nouveau HLS n'a été inventé.
- Aucun bouquet définitif n'est attribué.

## Fiche normalisée

Chaque entrée de l'audit possède :

`id`, `channelNumber`, `name`, `type`, `country`, `region`, `language`, `status`, `bouquet`, `category`, `logoStatus`, `epgStatus`, `sourceStatus`, `sourceUrl`, `existence`, `nameVariant`, `brandDuplicateDetected`.

Les champs non démontrables à partir du dépôt sont explicitement marqués `UNVERIFIED`. Cela évite de présenter la présence dans le JSON comme une preuve d'existence actuelle ou de disponibilité LIVE.

## Numérotation

Les numéros libres historiques sont conservés :

`140, 141, 193–224`.

Aucun renumérotage automatique n'a été effectué.

## Services

Netflix, Peacock, Pluto TV et Tubi restent présents comme entrées de catalogue TV historique **et** disposent d'un enregistrement SERVICE séparé pour l'interface Apps/Services. Les identifiants SERVICE sont préfixés par `service-` afin de garantir l'unicité globale des IDs.

STAGE+ reste dans le catalogue des services. Son site officiel le décrit comme un service de streaming de musique classique avec contenus à la demande et livestreams. citeturn0search0turn0search7

Netflix dispose également d'une présence officielle Côte d'Ivoire et se décrit comme un service de streaming. citeturn0search1turn0search3

## EPG

`epgStatus` ne déclare pas automatiquement un EPG réel. L'audit utilise `UNVERIFIED` lorsqu'une preuve réelle n'est pas disponible dans le dépôt. Les programmes éditoriaux StreamLive restent distincts des données EPG réelles.

## Sources

Pour une entrée CHANNEL, une expression d'environnement HLS dans le code n'est pas considérée comme une URL HLS réelle disponible. L'audit indique donc `NOT_CONFIGURED` tant que la valeur runtime n'est pas fournie.

Pour les services externes, seule une URL explicitement présente dans le dépôt est conservée ; aucune URL HLS inventée n'est ajoutée.

## Contrôle automatique

`npm run check:channels` contrôle les IDs, noms et numéros des chaînes.

`npm run check:audit` contrôle en plus :
- unicité globale des IDs ;
- unicité des numéros ;
- présence d'une fiche d'audit pour chaque entrée ;
- cohérence des compteurs ;
- maintien de l'état « étape 1 / bouquets non finalisés ».

## Règle de passage

**Étape 1 → Étape 2 uniquement après validation de cet audit.**

À l'étape 2, les bouquets seront organisés sans supprimer les entrées auditées.
