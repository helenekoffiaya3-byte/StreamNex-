# Sources EPG officielles

Le robot lit `config/official-guides.json` avant tout fallback.

Une entrée doit être vérifiée manuellement avant d'être ajoutée :

```json
{
  "streamliveChannelId": "id-streamlive",
  "officialWebsite": "https://site-officiel.example",
  "guideUrl": "https://site-officiel.example/guide.xml",
  "sourceChannelId": "identifiant-xmltv",
  "sourceType": "official-xmltv"
}
```

Règles :

- `officialWebsite` et `guideUrl` doivent être des URL HTTP(S) réelles.
- `guideUrl` doit être une source de programme réellement publiée par la chaîne ou son fournisseur autorisé.
- `sourceChannelId` doit correspondre à l'identifiant `programme@channel` du flux XMLTV.
- Aucun titre, épisode, description, durée, poster ou URL de lecture n'est fabriqué.
- Si une image n'est pas fournie par la source, `poster` reste `null`.
- Si aucune source officielle vérifiée n'est disponible, le robot ne crée aucune donnée EPG pour cette chaîne.
- Les guides publiés par des agrégateurs ne sont pas considérés comme officiels. Ils ne peuvent être utilisés que si le fallback correspondant est explicitement activé dans l'environnement.
