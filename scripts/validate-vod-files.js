const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CATALOGS = [
  {
    name: 'StreamLive',
    path: path.resolve(process.cwd(), 'config/editorial/streamlive-programs.json')
  },
  {
    name: 'RTI 1',
    path: path.resolve(process.cwd(), 'config/editorial/rti1-programs.json')
  }
];

const FFPROBE_PATH = process.env.FFPROBE_PATH || (
  process.env.FFMPEG_PATH
    ? path.join(path.dirname(process.env.FFMPEG_PATH), 'ffprobe')
    : 'ffprobe'
);

function timeToMinutes(timeStr, isEndTime = false) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(timeStr))) {
    throw new Error('Horaire invalide: ' + timeStr);
  }
  const [hours, minutes] = String(timeStr).split(':').map(Number);
  if (isEndTime && hours === 0 && minutes === 0) return 1440;
  return hours * 60 + minutes;
}

function inspectMediaFile(filePath) {
  const result = spawnSync(FFPROBE_PATH, [
    '-v', 'error',
    '-show_entries', 'format=duration,format_name',
    '-show_entries', 'stream=codec_type,codec_name',
    '-of', 'json',
    filePath
  ], { encoding: 'utf8' });

  if (result.status !== 0) {
    return { valid: false, error: (result.stderr || '').trim() || 'ffprobe a échoué.' };
  }

  try {
    const data = JSON.parse(result.stdout || '{}');
    const durationSeconds = Number.parseFloat(data.format?.duration || 0);
    const streams = Array.isArray(data.streams) ? data.streams : [];
    return {
      valid: Number.isFinite(durationSeconds) && durationSeconds > 0,
      durationSeconds,
      hasVideo: streams.some(s => s.codec_type === 'video'),
      hasAudio: streams.some(s => s.codec_type === 'audio'),
      videoCodecs: [...new Set(streams.filter(s => s.codec_type === 'video').map(s => s.codec_name).filter(Boolean))],
      audioCodecs: [...new Set(streams.filter(s => s.codec_type === 'audio').map(s => s.codec_name).filter(Boolean))],
      format: data.format?.format_name || null
    };
  } catch {
    return { valid: false, error: 'Sortie ffprobe illisible.' };
  }
}

function validateCatalog(catalog, name) {
  let missingFiles = 0;
  let invalidFiles = 0;

  if (!Array.isArray(catalog.schedule)) {
    console.error(`❌ [${name}] schedule absent ou invalide.`);
    return { missingFiles: 0, invalidFiles: 1 };
  }

  console.log(`\n🔍 Vérification VOD — ${name}`);

  for (const prog of catalog.schedule) {
    const startMin = timeToMinutes(prog.startTime);
    const endMin = timeToMinutes(prog.endTime, true);
    const requiredDurationSec = (endMin - startMin) * 60;
    const vodFile = String(prog.vodFile || '').trim();
    const fullPath = path.resolve(process.cwd(), vodFile);
    const exists = Boolean(vodFile) && fs.existsSync(fullPath);

    if (!exists) {
      console.log(`❌ ${prog.id} | ${prog.startTime}-${prog.endTime} | ABSENT | ${vodFile || '(vodFile manquant)'}`);
      missingFiles++;
      continue;
    }

    const info = inspectMediaFile(fullPath);
    const durationOk = info.valid && info.durationSeconds >= requiredDurationSec - 5;
    const streamsOk = info.hasVideo && info.hasAudio;

    if (!info.valid || !durationOk || !streamsOk) {
      const reasons = [];
      if (!info.valid) reasons.push('ffprobe invalide');
      if (!durationOk) reasons.push(`durée ${Math.round((info.durationSeconds || 0) / 60)}m < ${requiredDurationSec / 60}m requises`);
      if (!info.hasVideo) reasons.push('vidéo absente');
      if (!info.hasAudio) reasons.push('audio absent');
      console.log(`⚠️ ${prog.id} | ${prog.startTime}-${prog.endTime} | ${reasons.join(', ')}`);
      invalidFiles++;
      continue;
    }

    console.log(`✅ ${prog.id} | ${prog.startTime}-${prog.endTime} | ${Math.round(info.durationSeconds / 60)}m | video=${info.videoCodecs.join(',')} audio=${info.audioCodecs.join(',')}`);
  }

  return { missingFiles, invalidFiles, total: catalog.schedule.length };
}

function main() {
  let totalMissing = 0;
  let totalInvalid = 0;
  let totalPrograms = 0;

  for (const catalogInfo of CATALOGS) {
    if (!fs.existsSync(catalogInfo.path)) {
      console.error(`❌ [${catalogInfo.name}] fichier introuvable: ${catalogInfo.path}`);
      totalInvalid++;
      continue;
    }

    const catalog = JSON.parse(fs.readFileSync(catalogInfo.path, 'utf8'));
    const result = validateCatalog(catalog, catalogInfo.name);
    totalMissing += result.missingFiles;
    totalInvalid += result.invalidFiles;
    totalPrograms += result.total || 0;
  }

  console.log('\n📊 Bilan global');
  console.log(`- Programmes contrôlés : ${totalPrograms}`);
  console.log(`- Médias manquants : ${totalMissing}`);
  console.log(`- Médias invalides / trop courts : ${totalInvalid}`);

  if (totalMissing || totalInvalid) {
    console.log('\n⚠️ Validation VOD échouée. Les fichiers physiques doivent être installés sur le serveur avant le passage en production.');
    return 1;
  }

  console.log('\n🎉 Tous les médias des deux chaînes sont présents, lisibles et assez longs.');
  return 0;
}

process.exitCode = main();
