const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const targetFile = process.argv[2] || 'storage/vod/cinema_nuit.mp4';
const durationSeconds = Number.parseInt(process.argv[3], 10) || 60;
const titleText = process.argv[4] || 'StreamLive Test VOD';
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';

if (!Number.isInteger(durationSeconds) || durationSeconds <= 0) {
  console.error('❌ Durée invalide.');
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), targetFile);
const targetDir = path.dirname(absolutePath);
fs.mkdirSync(targetDir, { recursive: true });

console.log(`⏳ Génération : ${targetFile} | ${durationSeconds}s | ${titleText}`);

const vf = [
  "drawtext=text='StreamLive':fontcolor=0x38bdf8:fontsize=72:x=(w-text_w)/2:y=(h-text_h)/2-110",
  `drawtext=text='${titleText.replace(/\\/g, '\\\\').replace(/'/g, "\\\'")}':fontcolor=0xffffff:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2`,
  "drawtext=text='TEST VOD STREAMLIVE':fontcolor=0x94a3b8:fontsize=28:x=(w-text_w)/2:y=(h-text_h)/2+110"
].join(',');

const args = [
  '-y',
  '-f', 'lavfi', '-i', 'color=c=0x0b1329:s=1920x1080:r=30',
  '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=44100',
  '-vf', vf,
  '-t', String(durationSeconds),
  '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '128k',
  '-movflags', '+faststart',
  absolutePath
];

const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
if (result.status !== 0) {
  console.error('❌ FFmpeg a échoué.');
  process.exit(result.status || 1);
}

console.log(`🎉 Fichier créé : ${absolutePath}`);
