# RTI 1 — étape 2 : enregistrement → validation → replay

## Source

La source réelle de RTI 1 est fournie par l'exploitant du projet via RTI1_RECORD_SOURCE_URL.
Aucune URL de démonstration ou de production n'est stockée dans Git.

Variables runtime :
- RTI1_RECORD_AUTOSTART=true
- RTI1_RECORD_ENABLED=true
- RTI1_RECORD_SOURCE_URL=<source autorisée>
- RTI1_RECORD_ROOT=<optionnel>
- RTI1_RECORD_INTERVAL_MS=15000
- FFMPEG_PATH=ffmpeg
- FFPROBE_PATH=ffprobe

## Cycle

1. La grille RTI 1 détermine l'occurrence active.
2. Le recorder crée l'enregistrement SQLite.
3. La source est capturée par segments MPEG-TS pour permettre la reprise après interruption.
4. Chaque segment est contrôlé par ffprobe avant d'être enregistré comme segment valide/partiel.
5. À la fin de l'occurrence, les segments sont assemblés en MP4.
6. Le master est contrôlé par existence, taille, durée et SHA-256.
7. Le fichier est alors enregistré dans media_assets avec status=available.
8. L'URL de lecture est rattachée à l'occurrence exacte.
9. Le replay est publié dans replay_catalog uniquement après validation du média.

## Sécurité

La valeur réelle de RTI1_RECORD_SOURCE_URL reste dans l'environnement d'exécution. Elle ne doit pas être ajoutée à .env.example, GitHub, un log ou une réponse API publique.

## Limite de validation

Le code et le pipeline peuvent être validés en CI sans source réelle. La preuve d'une capture RTI 1 réelle nécessite ensuite que la source autorisée soit configurée et qu'un créneau soit effectivement enregistré puis validé.
