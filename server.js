require('dotenv').config();
const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const path=require('path');
const CHANNELS=require('./config/channels');
const {getProgrammes,getCurrentProgramme,getNextProgramme}=require('./config/programmes');

const app=express();
const PORT=Number(process.env.PORT||3000);
app.disable('x-powered-by');
app.set('trust proxy',1);
const origins=(process.env.CORS_ORIGINS||'').split(',').map(x=>x.trim()).filter(Boolean);
app.use(helmet({contentSecurityPolicy:false,crossOriginEmbedderPolicy:false}));
app.use(cors({origin:(o,cb)=>!o||!origins.length||origins.includes(o)?cb(null,true):cb(null,false),methods:['GET','OPTIONS']}));
app.use(express.json({limit:'10kb'}));

function sourceFor(channel){
  if(channel.playbackMode==='external'&&channel.externalUrl){
    return {sourceId:`external:${channel.id}`,channelId:channel.id,name:`${channel.name} — service externe`,sourceType:'HTTPS',url:channel.externalUrl,enabled:true,priority:0,status:'EXTERNAL'};
  }
  const url=channel.productionUrl||null;
  return {sourceId:`source:${channel.id}`,channelId:channel.id,name:`${channel.name} — source principale`,sourceType:url?'HLS':'HLS',url,enabled:Boolean(url),priority:100,status:url?'CONFIGURED':'OFFLINE'};
}
function publicChannel(c){
  const s=sourceFor(c);
  return {id:c.id,name:c.name,group:c.group||'Autre',number:c.number??null,logoUrl:c.logoUrl||`/assets/logos/${c.id}.png`,playbackMode:c.playbackMode||'live',externalUrl:c.externalUrl||null,sourceId:s.sourceId,sourceStatus:s.status,sourceConfigured:Boolean(s.url),liveAvailable:Boolean(s.url)&&s.status!=='EXTERNAL'};
}
function requireChannel(id){return CHANNELS.find(c=>c.id===id)||null;}
function programmesFor(id){return getProgrammes(id).map(p=>({...p,streamEnabled:false}));}

app.get('/api/stream/channels',(_req,res)=>res.json({success:true,count:CHANNELS.length,channels:CHANNELS.map(publicChannel)}));
app.get('/api/stream/random',(_req,res)=>{
  const available=CHANNELS.filter(c=>sourceFor(c).url&&c.playbackMode!=='external');
  if(!available.length)return res.status(503).json({success:false,error:'Aucune source LIVE configurée.'});
  const c=available[Math.floor(Math.random()*available.length)];
  res.json({success:true,channel:publicChannel(c)});
});
app.get('/api/channels/:id',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  res.json({success:true,channel:{...publicChannel(c),programmes:programmesFor(c.id)}});
});
app.get('/api/channels/:id/source',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  const s=sourceFor(c);
  res.json({success:true,channelId:c.id,source:{sourceId:s.sourceId,sourceType:s.sourceType,url:s.url,status:s.status,enabled:s.enabled,priority:s.priority}});
});
app.get('/api/channels/:id/programs',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).json({success:false,error:'Chaîne non trouvée.'});
  const programmes=programmesFor(c.id);
  res.json({success:true,channelId:c.id,name:c.name,source:'config',sourceDetail:'file',programCount:programmes.length,programmes,programs:programmes,occurrences:[],current:getCurrentProgramme(c.id),next:getNextProgramme(c.id)});
});
app.get('/api/programs/:id',(req,res)=>{
  for(const c of CHANNELS){const p=programmesFor(c.id).find(x=>x.programId===req.params.id);if(p)return res.json({success:true,program:p});}
  res.status(404).json({success:false,error:'Programme non trouvé.'});
});
app.get('/api/live/channels',(_req,res)=>{
  const now=new Date();
  const channels=CHANNELS.map(c=>{
    const s=sourceFor(c),current=getCurrentProgramme(c.id),next=getNextProgramme(c.id);
    const external=c.playbackMode==='external'&&Boolean(c.externalUrl);
    return {id:c.id,name:c.name,group:c.group||'Autre',number:c.number??null,logoUrl:c.logoUrl||`/assets/logos/${c.id}.png`,playbackMode:c.playbackMode||'live',externalUrl:c.externalUrl||null,sourceId:s.sourceId,sourceStatus:s.status,sourceConfigured:Boolean(s.url),liveAvailable:Boolean(current&&s.url&&!external),playbackUrl:external?null:(s.url||null),occurrence:current?{programId:current.programId,title:current.title,startAt:current.startAt,endAt:current.endAt}:null,next:next?{programId:next.programId,title:next.title,startAt:next.startAt,endAt:next.endAt}:null,checkedAt:now.toISOString()};
  });
  res.json({success:true,count:channels.length,channels});
});
app.get('/api/diffusion',(req,res)=>{
  const c=req.query.channelId?requireChannel(req.query.channelId):null;
  const list=c?[c]:CHANNELS;
  res.json({success:true,diffusions:list.map(ch=>{const s=sourceFor(ch),p=getCurrentProgramme(ch.id);return {channelId:ch.id,channelName:ch.name,sourceId:s.sourceId,url:s.url,status:s.status,programme:p?{programId:p.programId,title:p.title,startAt:p.startAt,endAt:p.endAt}:null,live:Boolean(p&&s.url&&ch.playbackMode!=='external')};})});
});
app.get('/channel/:id',(req,res)=>{
  const c=requireChannel(req.params.id); if(!c)return res.status(404).send('Chaîne non trouvée.');
  if(c.playbackMode==='external'&&c.externalUrl)return res.redirect(302,c.externalUrl);
  res.sendFile(path.join(__dirname,'channel.html'));
});
app.use(express.static(__dirname,{dotfiles:'deny',index:'index.html',fallthrough:true}));
app.use((req,res)=>res.status(404).json({success:false,error:'Ressource non trouvée.'}));
app.listen(PORT,()=>console.log(`StreamLive core actif sur le port ${PORT} — ${CHANNELS.length} chaînes — sans base de données.`));
