const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const output = path.resolve(process.cwd(), 'storage', 'vod', 'fallback_slate.mp4');

function ensureFallbackSlateExists() {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  if (fs.existsSync(output)) {
    console.log('Mire StreamLive déjà présente:', output);
    return true;
  }

  console.log('Génération de la mire StreamLive...');
  const args = [
    '-y',
    '-f', 'lavfi', '-i', 'color=c=0x0f172a:s=1920x1080:r=30',
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-vf', "drawtext=text='StreamLive':fontcolor=0x38bdf8:fontsize=80:x=(w-text_w)/2:y=(h-text_h)/2-60,drawtext=text='PROGRAMME TEMPORAIREMENT INDISPONIBLE':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=(h-text_h)/2+40",
    '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '128k', '-t', '10', output
  ];

  const result = spawnSync(process.env.FFMPEG_PATH || 'ffmpeg', args, { stdio: 'inherit' });
  if (result.error || result.status !== 0) {
    console.error('Échec de génération de la mire:', result.error?.message || 'FFmpeg exited with code ' + result.status);
    return false;
  }
  console.log('Mire générée:', output);
  return true;
}

if (require.main === module) {
  process.exitCode = ensureFallbackSlateExists() ? 0 : 1;
}

module.exports = { ensureFallbackSlateExists };
