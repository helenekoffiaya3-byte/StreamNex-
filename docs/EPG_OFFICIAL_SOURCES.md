# Sources EPG et politique de provenance

Le robot lit `config/official-guides.json` et applique sa politique de provenance avant tout import. Une source `community-aggregated-public` n'est chargée que si `EPG_ALLOW_PUBLISHED_FALLBACK=true`.

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
- Si aucune source autorisée selon la politique active n'est disponible, le robot ne crée aucune donnée EPG.
- Les guides publiés par des agrégateurs ne sont pas considérés comme officiels. Ils ne peuvent être utilisés que si `EPG_ALLOW_PUBLISHED_FALLBACK=true` est explicitement activé.
