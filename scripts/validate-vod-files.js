const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const schedulePath = path.resolve(process.cwd(), 'config/editorial/streamlive-programs.json');
const FFMPEG_PATH = process.env.FFMPEG_PATH || 'ffprobe';

function timeToMinutes(timeStr, isEndTime = false) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(timeStr))) {
    throw new Error('Horaire invalide: ' + timeStr);
  }
  const [hours, minutes] = String(timeStr).split(':').map(Number);
  if (isEndTime && hours === 0 && minutes === 0) return 1440;
  return hours * 60 + minutes;
}

function inspectMediaFile(filePath) {
  const result = spawnSync(FFMPEG_PATH, [
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

function validateVodFiles() {
  console.log('🔍 Vérification des fichiers VOD StreamLive...\n');

  if (!fs.existsSync(schedulePath)) {
    console.error('❌ Fichier de configuration introuvable:', schedulePath);
    return 1;
  }

  const catalog = JSON.parse(fs.readFileSync(schedulePath, 'utf8'));
  if (!Array.isArray(catalog.schedule)) {
    console.error('❌ schedule absent ou invalide.');
    return 1;
  }

  let missingFiles = 0;
  let invalidFiles = 0;

  for (const prog of catalog.schedule) {
    const startMin = timeToMinutes(prog.startTime);
    const endMin = timeToMinutes(prog.endTime, true);
    const requiredDurationSec = (endMin - startMin) * 60;
    const fullPath = path.resolve(process.cwd(), prog.vodFile || '');
    const exists = fs.existsSync(fullPath);

    if (!exists) {
      console.log(`❌ ${prog.id} | ${prog.startTime}-${prog.endTime} | ABSENT | ${prog.vodFile}`);
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

  console.log('\n📊 Bilan');
  console.log(`- Présents : ${catalog.schedule.length - missingFiles}/${catalog.schedule.length}`);
  console.log(`- Manquants : ${missingFiles}`);
  console.log(`- Invalides / trop courts : ${invalidFiles}`);

  if (missingFiles || invalidFiles) {
    console.log('\n⚠️ La grille reste valide, mais certains créneaux utiliseront le fallback si celui-ci est activé.');
    return 1;
  }

  console.log('\n🎉 Tous les médias VOD sont présents, lisibles et assez longs pour leurs créneaux.');
  return 0;
}

process.exitCode = validateVodFiles();
