#!/bin/bash
set -e

RTMP_SERVER="rtmp://nginx-hls/live"
CHANNELS=("ch-1" "ch-2" "ch-3")

echo "StreamLive: démarrage des flux de test..."

for CHANNEL_ID in "${CHANNELS[@]}"; do
  echo "Lancement du flux: ${CHANNEL_ID}"
  ffmpeg -hide_banner -loglevel warning \
    -re -f lavfi -i "testsrc=size=1280x720:rate=30" \
    -f lavfi -i "sine=frequency=1000:sample_rate=44100" \
    -vf "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='STREAMLIVE - ${CHANNEL_ID}':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=36:fontcolor=white:box=1:boxcolor=black@0.6" \
    -c:v libx264 -preset ultrafast -tune zerolatency -b:v 1500k -g 60 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -ac 2 \
    -f flv "${RTMP_SERVER}/${CHANNEL_ID}" &
done

wait
