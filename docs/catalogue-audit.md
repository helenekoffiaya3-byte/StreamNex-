# StreamLive — audit du catalogue (étape 1)

Date de l'audit : 2026-10-01

## Résultat

Le catalogue initial de 233 entrées n'est pas composé exclusivement de chaînes TV linéaires. L'audit structurel a séparé les services de streaming des chaînes.

- **228 chaînes TV / chaînes éditoriales** restent dans `config/channels.js`.
- **5 services/apps** sont maintenant dans `config/services.js` et exposés via `config/apps.js` / `/api/apps`.
- Aucun doublon détecté sur les **IDs**, **noms** ou **numéros** des 228 chaînes.
- La numérotation historique reste volontairement non continue.

### Services sortis du catalogue TV

| ID | Nom | Classification |
|---|---|---|
| netflix | Netflix | service de streaming |
| peacock | Peacock | service de streaming |
| pluto-tv | Pluto TV | service de streaming / agrégateur de chaînes |
| tubi | Tubi | service de streaming |
| stage-plus | STAGE+ | service de streaming audio/vidéo classique |

Netflix se décrit comme un service de streaming et sa version Côte d'Ivoire est active. Peacock est distribué comme application/service de streaming. Tubi se présente comme une plateforme de streaming de films et séries. Pluto TV fournit des chaînes live et du contenu à la demande via son service/app. Deutsche Grammophon présente **STAGE+** comme son service de streaming classique, avec livestreams et VOD ; l'ancien nom `Deutsche Grammophon+` n'est donc plus traité comme une chaîne TV.

## Contrôles structurels

- IDs uniques : **OK**
- Noms uniques : **OK**
- Numéros uniques : **OK**
- Chaînes/services séparés : **OK**
- Aucune URL HLS fictive ajoutée pendant cet audit : **OK**

## Numéros libres conservés

Les trous ne sont pas remplis automatiquement afin de ne pas casser la numérotation historique :

`69, 70, 71, 76, 140, 141, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 252`

## Répartition actuelle des chaînes

- Afrique / International: 9
- Biblique: 7
- Bollywood: 1
- Cuisine & Lifestyle: 1
- Documentaires: 15
- Films & Cinéma: 32
- France: 12
- Information: 28
- International: 2
- Jeunesse: 36
- Musique: 12
- National: 7
- Nollywood: 2
- S+ StreamLive: 23
- Sport: 13
- Séries: 28

## Étape suivante de l'audit éditorial

La prochaine passe doit qualifier, pour chaque chaîne restante :

1. existence actuelle ;
2. statut (ACTIVE / INACTIVE / HISTORICAL / EXTERNAL, sans confondre présence au catalogue et disponibilité HLS) ;
3. pays/région ;
4. langue/version ;
5. doublon de marque ou variante régionale ;
6. nature exacte (chaîne linéaire vs événement/service/archive) ;
7. source officielle à utiliser pour la validation.

Aucune nouvelle chaîne ne doit être ajoutée avant cette qualification.
