const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CATALOG_PATH = path.join(__dirname, '../config/editorial/rti1-programs.json');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const args = process.argv.slice(2);
const all = args.includes('--all') || args.includes('rti1');
const targetFile = args.find(a => !a.startsWith('--') && a !== 'rti1') || 'storage/vod/cinema_nuit.mp4';
const requestedDuration = Number.parseInt(args.find((a, i) => /^\d+$/.test(a) && args[i - 1] !== '--duration'), 10);
const requestedTitle = process.env.VOD_TITLE || 'StreamLive Test VOD';

function durationSeconds(start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let value = (eh * 60 + em) - (sh * 60 + sm);
  if (value <= 0) value += 1440;
  return value * 60;
}
function escapeDrawtext(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\\'");
}
function generate(target, duration, title) {
  const absolutePath = path.resolve(process.cwd(), target);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  const vf = [
    "drawtext=text='StreamLive':fontcolor=0x38bdf8:fontsize=72:x=(w-text_w)/2:y=(h-text_h)/2-110",
    `drawtext=text='${escapeDrawtext(title)}':fontcolor=0xffffff:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2`,
    "drawtext=text='TEST VOD':fontcolor=0x94a3b8:fontsize=28:x=(w-text_w)/2:y=(h-text_h)/2+110"
  ].join(',');
  const result = spawnSync(ffmpeg, [
    '-y','-f','lavfi','-i','color=c=0x0b1329:s=1920x1080:r=30',
    '-f','lavfi','-i','sine=frequency=440:sample_rate=44100','-vf',vf,
    '-t',String(duration),'-c:v','libx264','-preset','ultrafast','-pix_fmt','yuv420p',
    '-c:a','aac','-b:a','128k','-movflags','+faststart',absolutePath
  ], {stdio:'inherit'});
  if (result.status !== 0) throw new Error(`FFmpeg a échoué pour ${target}`);
  console.log(`✓ ${target} — ${duration}s`);
}
if (all) {
  const catalog=JSON.parse(fs.readFileSync(CATALOG_PATH,'utf8'));
  for (const p of catalog.schedule) {
    generate(p.vodFile, durationSeconds(p.startTime,p.endTime), p.title);
  }
} else {
  const duration = Number.isInteger(requestedDuration) && requestedDuration > 0 ? requestedDuration : 60;
  generate(targetFile,duration,requestedTitle);
}
