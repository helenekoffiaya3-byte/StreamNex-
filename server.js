require('dotenv').config();
const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const path=require('path');
const CHANNELS=require('./config/channels');
const APPS=require('./config/apps');
const SERVICES=require('./config/services');
const SPORTS_CATALOG=[
  {id:'ligue-2-bkt',title:'Ligue 2 BKT',category:'Football',logo:'1790826734997.jpg'},
  {id:'coupe-de-france',title:'Coupe de France',category:'Football',logo:'1790826732955.jpg'},
  {id:'top-14-rugby',title:'TOP 14 Rugby',category:'Rugby',logo:'1790826728954.jpg'},
  {id:'premier-league',title:'Premier League',category:'Football',logo:'1790826730921.jpg'},
  {id:'motogp',title:'MotoGP™',category:'Sports Mécaniques',logo:'1790826726863.jpg'}
];
const {getProgrammes,getOccurrences,getCurrentProgramme,getNextProgramme,getProgrammeByOccurrence,getProgrammeById}=require('./config/programmes');

const app=express();
const PORT=Number(process.env.PORT||3000);
app.disable('x-powered-by');
app.set('trust proxy',1);

const origins=(process.env.CORS_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
app.use(helmet({contentSecurityPolicy:false,crossOriginEmbedderPolicy:false}));
app.use(cors({origin:(o,cb)=>!o||!origins.length||origins.includes(o)?cb(null,true):cb(new Error('CORS origin not allowed')),methods:['GET','OPTIONS']}));
app.use(express.json({limit:'10kb'}));

function requireChannel(id){return CHANNELS.find(c=>c.id===id)||null;}
function sourceFor(channel){
  if(channel.playbackMode==='external'&&channel.externalUrl){
    return {sourceId:`external:${channel.id}`,channelId:channel.id,name:`${channel.name} — service externe`,sourceType:'HTTPS',url:channel.externalUrl,enabled:true,priority:0,status:'EXTERNAL'};
  }
  const url=channel.productionUrl||null;
  return {sourceId:`source:${channel.id}`,channelId:channel.id,name:`${channel.name} — source principale`,sourceType:'HLS',url,enabled:Boolean(url),priority:100,status:url?'CONFIGURED':'OFFLINE'};
}
function publicChannel(c){
  const s=sourceFor(c);
  return {id:c.id,name:c.name,group:c.group||'Autre',number:c.channelNumber??null,logoUrl:c.logoUrl||`/assets/logos/${c.id}.png`,playbackMode:c.playbackMode||'live',externalUrl:c.externalUrl||null,sourceId:s.sourceId,sourceStatus:s.status,sourceConfigured:Boolean(s.url),liveAvailable:Boolean(s.url)&&c.playbackMode!=='external'};
}
function decorateOccurrence(o,channel){
  if(!o)return null;
  const source=sourceFor(channel);
  return {...o,playbackUrl:o.playbackUrl||null,sourceId:source.sourceId,liveSourceUrl:source.url||null};
}

app.get('/api/health',(_req,res)=>res.json({success:true,service:'streamlive',database:false,channels:CHANNELS.length,version:'2.1.0'}));
app.get('/api/catalogue',(_req,res)=>res.json({
  success:true,database:false,channels:CHANNELS.length,services:SERVICES.length,
  groups:CHANNELS.reduce((a,c)=>(a[c.group||'Autre']=(a[c.group||'Autre']||0)+1,a),{}),
  capabilities:['channels','sources','urls','programmes','epg','diffusion','live','multi-live','hls']
}));
app.get('/api/sports',(_req,res)=>res.json({success:true,count:SPORTS_CATALOG.length,sports:SPORTS_CATALOG}));
app.get('/api/apps',(req,res)=>{
  const group=req.query.group;
  const list=group?APPS.filter(a=>a.group===group):APPS;
  res.json({success:true,count:list.length,apps:list});
});
app.get('/api/stream/channels',(_req,res)=>res.json({success:true,count:CHANNELS.length,channels:CHANNELS.map(publicChannel)}));
app.get('/api/stream/random',(_req,res)=>{
  const available=CHANNELS.filter(c=>sourceFor(c).url&&c.playbackMode!=='external');
  if(!available.length)return res.status(503).json({success:false,error:'Aucune source LIVE configurée.'});
  const c=available[Math.floor(Math.random()*available.length)];
  res.json({success:true,channel:publicChannel(c)});
});

app.get('/api/channels/:id',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  const current=decorateOccurrence(getCurrentProgramme(c.id),c);
  const next=decorateOccurrence(getNextProgramme(c.id),c);
  res.json({success:true,channel:{...publicChannel(c),current,next}});
});
app.get('/api/channels/:id/source',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  const s=sourceFor(c);
  res.json({success:true,channelId:c.id,source:{sourceId:s.sourceId,sourceType:s.sourceType,url:s.url,status:s.status,enabled:s.enabled,priority:s.priority}});
});

app.get('/api/channels/:id/programs',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  const date=req.query.date?new Date(req.query.date+'T12:00:00Z'):new Date();
  if(Number.isNaN(date.getTime()))return res.status(400).json({success:false,error:'Date invalide.'});
  const programmes=getProgrammes(c.id,date);
  const occurrences=getOccurrences(c.id,date).map(o=>decorateOccurrence(o,c));
  const current=decorateOccurrence(getCurrentProgramme(c.id),c);
  const next=decorateOccurrence(getNextProgramme(c.id),c);
  res.json({success:true,channelId:c.id,name:c.name,source:'config',programCount:programmes.length,programmes,programs:programmes,occurrences,current,next,warning:programmes.length?'': 'Aucun programme configuré pour cette chaîne.'});
});
app.get('/api/programmes',(req,res)=>{
  const ids=req.query.channelId?[req.query.channelId]:CHANNELS.map(c=>c.id);
  const data=[];
  for(const id of ids){if(!requireChannel(id))continue;data.push(...getProgrammes(id).map(p=>({...p}))); }
  res.json({success:true,count:data.length,programmes:data});
});
app.get('/api/programs/resolve-playback',(req,res)=>{
  const c=requireChannel(req.query.channelId);
  if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  const occurrence=getProgrammeByOccurrence(c.id,req.query.occurrenceId);
  if(!occurrence)return res.status(404).json({success:false,error:'Occurrence de programme non trouvée.'});
  const source=sourceFor(c);
  const now=Date.now(),start=Date.parse(occurrence.startAt),end=Date.parse(occurrence.endAt);
  if(source.url&&c.playbackMode!=='external'&&start<=now&&now<end){
    return res.json({success:true,mode:'LIVE',playbackUrl:source.url,channelId:c.id,occurrenceId:occurrence.occurrenceId});
  }
  return res.json({success:true,mode:'UNAVAILABLE',playbackUrl:null,channelId:c.id,occurrenceId:occurrence.occurrenceId,message:'Aucune lecture réelle configurée pour cette occurrence.'});
});

app.get('/api/live/channels',(_req,res)=>{
  const checkedAt=new Date().toISOString();
  const channels=CHANNELS.map(c=>{
    const s=sourceFor(c),current=decorateOccurrence(getCurrentProgramme(c.id),c),next=decorateOccurrence(getNextProgramme(c.id),c);
    return {id:c.id,name:c.name,group:c.group||'Autre',number:c.channelNumber??null,logoUrl:c.logoUrl||`/assets/logos/${c.id}.png`,playbackMode:c.playbackMode||'live',externalUrl:c.externalUrl||null,sourceId:s.sourceId,sourceStatus:s.status,sourceConfigured:Boolean(s.url),liveAvailable:Boolean(current&&s.url&&c.playbackMode!=='external'),playbackUrl:c.playbackMode==='external'?null:s.url||null,occurrence:current,next,checkedAt};
  });
  res.json({success:true,count:channels.length,channels});
});
app.get('/api/diffusion',(req,res)=>{
  const list=req.query.channelId?[requireChannel(req.query.channelId)].filter(Boolean):CHANNELS;
  res.json({success:true,count:list.length,diffusions:list.map(ch=>{
    const s=sourceFor(ch),p=decorateOccurrence(getCurrentProgramme(ch.id),ch);
    return {channelId:ch.id,channelName:ch.name,sourceId:s.sourceId,url:s.url,status:s.status,programme:p,live:Boolean(p&&s.url&&ch.playbackMode!=='external'),playbackMode:ch.playbackMode||'live'};
  })});
});
app.get('/api/epg',(req,res)=>{
  const list=req.query.channelId?[requireChannel(req.query.channelId)].filter(Boolean):CHANNELS;
  const requestedDate=req.query.date?new Date(`${req.query.date}T12:00:00Z`):new Date();
  if(Number.isNaN(requestedDate.getTime())) return res.status(400).json({success:false,error:'Date EPG invalide. Utilisez YYYY-MM-DD.'});
  const days=Math.min(Math.max(Number(req.query.days)||1,1),7);
  const channels=list.map(c=>{
    const programmes=[];
    for(let i=0;i<days;i++){
      const d=new Date(requestedDate);
      d.setUTCDate(d.getUTCDate()+i);
      programmes.push(...getProgrammes(c.id,d));
    }
    return {
      channelId:c.id,
      name:c.name,
      timezone:'Africa/Abidjan',
      current:decorateOccurrence(getCurrentProgramme(c.id),c),
      next:decorateOccurrence(getNextProgramme(c.id),c),
      programmes
    };
  });
  res.json({
    success:true,
    count:channels.length,
    date:requestedDate.toISOString().slice(0,10),
    days,
    channels
  });
});

app.get('/live',(_req,res)=>res.sendFile(path.join(__dirname,'live.html')));
app.get('/channel/:id',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).send('Chaîne non trouvée.');
  if(c.playbackMode==='external'&&c.externalUrl)return res.redirect(302,c.externalUrl);
  res.sendFile(path.join(__dirname,'channel.html'));
});

const STATIC_ROOT=process.env.NETLIFY?path.join(__dirname,'../..'):__dirname;
app.use(express.static(STATIC_ROOT,{dotfiles:'deny',index:'index.html',fallthrough:true}));
app.use((req,res)=>res.status(404).json({success:false,error:'Ressource non trouvée.'}));
if(require.main===module){app.listen(PORT,()=>console.log(`StreamLive core actif sur le port ${PORT} — ${CHANNELS.length} chaînes — sans base de données.`));}
module.exports=app;
