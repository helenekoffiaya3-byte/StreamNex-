#!/usr/bin/env node
require('dotenv').config();

const fs=require('fs');
const path=require('path');
const {spawn}=require('child_process');
const EDITORIAL=path.join(__dirname,'..','config','editorial','streamlive-programs.json');

const ROOT=path.join(__dirname,'..');
const HLS_DIR=path.join(ROOT,'public','hls');
const VOD_DIR=path.join(ROOT,'storage','vod');
const PLAYLIST=path.join(HLS_DIR,'streamlive.m3u8');
const CHANNEL_ID=process.env.STREAMLIVE_EDITORIAL_CHANNEL_ID||'streamlive-editorial';
const FFmpeg=process.env.FFMPEG_PATH||'ffmpeg';
const TICK_MS=Number(process.env.STREAMLIVE_ENGINE_TICK_MS||30000);
const FALLBACK_SLATE=process.env.STREAMLIVE_FALLBACK_SLATE||'black';

fs.mkdirSync(HLS_DIR,{recursive:true});
fs.mkdirSync(VOD_DIR,{recursive:true});

let child=null;
let activeKey=null;
let stopping=false;

function loadEditorial(){
  try{return JSON.parse(fs.readFileSync(EDITORIAL,'utf8'));}catch{return {programmes:[],timezone:'Africa/Abidjan'};}
}
function getCurrentEditorial(){
  const cfg=loadEditorial(), items=cfg.programmes||[], minute=new Date().getUTCHours()*60+new Date().getUTCMinutes()+new Date().getUTCSeconds()/60;
  const toMin=v=>{const [h,m]=String(v).split(':').map(Number);return h*60+m;};
  return items.find(p=>{const s=toMin(p.startTime),e=toMin(p.endTime);return e>s?minute>=s&&minute<e:minute>=s||minute<e;})||null;
}
function log(...args){console.log(new Date().toISOString(),...args);}

function cleanupPlaylist(){
  for(const name of fs.readdirSync(HLS_DIR)){
    if(/^streamlive(?:\.m3u8|[-_]\d+\.ts|[-_]\d+\.m4s)$/i.test(name)){
      try{fs.unlinkSync(path.join(HLS_DIR,name));}catch{}
    }
  }
}

function stop(){
  if(child){
    stopping=true;
    child.kill('SIGTERM');
    setTimeout(()=>{if(child&&!child.killed)child.kill('SIGKILL');},3000).unref();
    child=null;
  }
}

function resolveInput(programme){
  const candidates=[
    programme.programId&&path.join(VOD_DIR,`${programme.programId}.mp4`),
    programme.id&&path.join(VOD_DIR,`${programme.id}.mp4`)
  ].filter(Boolean);
  return candidates.find(fs.existsSync)||null;
}

function start(programme){
  stop();
  cleanupPlaylist();

  const input=resolveInput(programme);
  const [hh,mm]=String(programme.startTime||'00:00').split(':').map(Number);
  const now=new Date();
  const start=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate(),hh||0,mm||0,0)).getTime();
  const offset=Math.max(0,(Date.now()-start)/1000);
  // For VOD input use the file itself; otherwise use generated fallback audio/video.
  const inputArgs=input
    ? ['-ss',String(offset),'-re','-i',input]
    : ['-f','lavfi','-i','color=c=black:s=1280x720:r=25','-f','lavfi','-i','anullsrc=channel_layout=stereo:sample_rate=48000'];

  const ffArgs=[
    ...inputArgs,
    '-map','0:v:0','-map',input?'0:a:0?':'1:a:0',
    '-c:v','libx264','-preset','ultrafast','-tune','zerolatency',
    '-pix_fmt','yuv420p','-r','25','-g','50',
    '-c:a','aac','-b:a','128k','-ar','48000',
    '-f','hls','-hls_time','4','-hls_list_size','5','-hls_start_number_source','datetime',
    '-hls_flags','delete_segments+omit_endlist+independent_segments',
    '-hls_segment_filename',path.join(HLS_DIR,'streamlive-%06d.ts'),
    PLAYLIST
  ];

  activeKey=programme.occurrenceId||programme.programId||programme.id;
  log(`START ${activeKey} — ${programme.title}${input?' [VOD]':' [FALLBACK]'}`);
  child=spawn(FFmpeg,ffArgs,{cwd:ROOT,stdio:['ignore','pipe','pipe']});
  child.stdout.on('data',d=>process.stdout.write(d));
  child.stderr.on('data',d=>{
    const line=d.toString();
    if(/error|failed|invalid/i.test(line)) process.stderr.write(line);
  });
  child.on('exit',(code,signal)=>{
    if(!stopping) log(`FFmpeg stopped code=${code} signal=${signal||'none'}`);
    child=null;
    stopping=false;
  });
}

function tick(){
  const p=getCurrentEditorial();
  if(!p){
    if(child)stop();
    activeKey=null;
    return;
  }
  const key=p.occurrenceId||p.programId||p.id;
  if(key!==activeKey || !child) start(p);
}

log(`StreamLive HLS engine — channel=${CHANNEL_ID} — tick=${TICK_MS}ms`);
tick();
setInterval(tick,TICK_MS);

function shutdown(){
  if(stopping)return;
  stopping=true;
  stop();
  setTimeout(()=>process.exit(0),500);
}
process.on('SIGINT',shutdown);
process.on('SIGTERM',shutdown);
