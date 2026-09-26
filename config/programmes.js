const fs=require('fs');
const path=require('path');
const schedule=JSON.parse(fs.readFileSync(path.join(__dirname,'editorial','rti1-programs.json'),'utf8'));
const TZ='Africa/Abidjan';
const DAY_NAMES=['sunday','mondayFriday','mondayFriday','mondayFriday','mondayFriday','mondayFriday','saturday'];
function localDateParts(date=new Date()){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
  const o=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  return {year:Number(o.year),month:Number(o.month),day:Number(o.day),hour:Number(o.hour),minute:Number(o.minute)};
}
function sourceDay(date){const d=date.getDay();return d===0?'sunday':d===6?'saturday':'mondayFriday';}
function toDate(date,time,isEnd=false){
  const [h,m]=time.split(':').map(Number); const out=new Date(date); out.setUTCHours(h,m,0,0);
  if(isEnd&&time==='06:00')out.setUTCDate(out.getUTCDate()+1);
  return out;
}
function getDay(date){const key=sourceDay(date);return schedule.weekly[key]||[];}
function getProgrammes(channelId){
  if(channelId!=='rti-1')return [];
  const now=new Date(); const local=localDateParts(now);
  const base=new Date(Date.UTC(local.year,local.month-1,local.day));
  return getDay(base).map(p=>({programId:p.id,channelId,title:p.title,type:p.type,category:p.category,startTime:p.startTime,endTime:p.endTime,startAt:toDate(base,p.startTime).toISOString(),endAt:toDate(base,p.endTime,true).toISOString(),timezone:TZ}));
}
function activeFor(channelId,offset=0){
  if(channelId!=='rti-1')return null;
  const now=new Date(); const local=localDateParts(now); const base=new Date(Date.UTC(local.year,local.month-1,local.day)); base.setUTCDate(base.getUTCDate()+offset);
  const list=getDay(base);
  for(const p of list){const s=toDate(base,p.startTime),e=toDate(base,p.endTime,true);if(offset===0&&now>=s&&now<e)return {...p,programId:p.id,channelId,startAt:s.toISOString(),endAt:e.toISOString(),timezone:TZ};}
  return null;
}
function getCurrentProgramme(channelId){return activeFor(channelId,0);}
function getNextProgramme(channelId){
  if(channelId!=='rti-1')return null;
  const now=new Date(); const today=getProgrammes(channelId); const next=today.find(p=>new Date(p.startAt)>now); if(next)return next;
  const local=localDateParts(now); const tomorrow=new Date(Date.UTC(local.year,local.month-1,local.day+1)); const first=getDay(tomorrow)[0]; if(!first)return null;
  return {...first,programId:first.id,channelId,startAt:toDate(tomorrow,first.startTime).toISOString(),endAt:toDate(tomorrow,first.endTime,true).toISOString(),timezone:TZ};
}
module.exports={getProgrammes,getCurrentProgramme,getNextProgramme};
