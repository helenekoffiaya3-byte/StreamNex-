# StreamLive — infrastructure Docker HLS

Cette configuration lance trois services de test :

- `streamlive-app` : frontend + API Express sur `http://localhost:3000`
- `nginx-hls` : ingestion RTMP sur 1935 et distribution HLS sur `http://localhost:8080/live/`
- `stream-generator` : trois flux de test `ch-1`, `ch-2`, `ch-3`

## Démarrage

```bash
docker compose up --build -d
docker compose ps
```

## Vérifications

```bash
curl http://localhost:3000/api/health
curl "http://localhost:3000/api/stream/random?sessionId=test"
curl http://localhost:8080/live/ch-1/index.m3u8
```

Application : `http://localhost:3000`

Flux HLS de test : `http://localhost:8080/live/ch-1/index.m3u8`

RTMP : `rtmp://localhost/live/{channel-id}`

## Production

Les 140 entrées du catalogue sont des routes StreamLive. Le générateur ne produit que trois flux de test et ne remplace pas les sources réelles et autorisées.

Définir `STREAM_BASE_URL` avec l'origine HLS publique, par exemple `https://hls.example.com/live`. Le backend reconstruira alors chaque URL sous `https://hls.example.com/live/{channel-id}/index.m3u8`.

Le `Map` mémoire est adapté au développement et à une instance unique. Pour plusieurs instances, utiliser Redis pour partager le pool Shuffle.