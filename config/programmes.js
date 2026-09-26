const fs=require('fs');
const path=require('path');

const TZ='Africa/Abidjan';
const editorialPath=path.join(__dirname,'editorial','rti1-programs.json');

let editorial={};
try{ editorial=JSON.parse(fs.readFileSync(editorialPath,'utf8')); }catch{ editorial={}; }
const programmesPath=path.join(__dirname,'programmes.json');
let catalogue={channels:{}};
try{ catalogue=JSON.parse(fs.readFileSync(programmesPath,'utf8')); }catch{ catalogue={channels:{}}; }

function localParts(date=new Date(),timezone=TZ){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date);
  const o=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  return {year:+o.year,month:+o.month,day:+o.day,hour:+o.hour,minute:+o.minute};
}
function sourceDay(date){const d=date.getUTCDay();return d===0?'sunday':d===6?'saturday':'mondayFriday';}
function baseUtc(date){return new Date(Date.UTC(date.year,date.month-1,date.day));}
function at(base,time,overnight=false){
  const [h,m]=String(time||'00:00').split(':').map(Number);
  const d=new Date(base); d.setUTCHours(h||0,m||0,0,0);
  if(overnight&&String(time)==='06:00') d.setUTCDate(d.getUTCDate()+1);
  return d;
}
function weeklyFor(channelId){
  const configured=catalogue.channels?.[channelId];
  if(configured)return {timezone:configured.timezone||catalogue.timezone||TZ,weekly:configured.weekly||{}};
  if(channelId===editorial.channelId)return {timezone:editorial.timezone||TZ,weekly:editorial.weekly||{}};
  return {timezone:catalogue.timezone||TZ,weekly:{}};
}
function programmesFor(channelId,date=new Date()){
  const cfg=weeklyFor(channelId); const lp=localParts(date,cfg.timezone); const base=baseUtc(lp); const list=cfg.weekly[sourceDay(base)]||[];
  return list.map(p=>({
    programId:p.id,channelId,title:p.title,type:p.type||'show',category:p.category||null,
    description:p.description||'',poster:p.poster||null,startTime:p.startTime,endTime:p.endTime,
    startAt:at(base,p.startTime).toISOString(),endAt:at(base,p.endTime,true).toISOString(),
    timezone:cfg.timezone
  }));
}
function occurrencesFor(channelId,date=new Date()){
  const cfg=weeklyFor(channelId); const lp=localParts(date,cfg.timezone); const base=baseUtc(lp);
  return programmesFor(channelId,date).map((p,i)=>({
    occurrenceId:`${p.programId}:${p.startAt}`,...p,episodeNumber:null,seasonNumber:null,
    playbackUrl:null,index:i
  }));
}
function allOccurrences(channelId,date=new Date()){
  const days=[];
  for(let i=-1;i<=1;i++){const d=new Date(date);d.setUTCDate(d.getUTCDate()+i);days.push(...occurrencesFor(channelId,d));}
  return days;
}
function getCurrentProgramme(channelId){
  const now=new Date(); return allOccurrences(channelId,now).find(p=>{const s=Date.parse(p.startAt),e=Date.parse(p.endAt);return s<=now.getTime()&&now.getTime()<e;})||null;
}
function getNextProgramme(channelId){
  const now=Date.now(); return allOccurrences(channelId,new Date()).filter(p=>Date.parse(p.startAt)>now).sort((a,b)=>Date.parse(a.startAt)-Date.parse(b.startAt))[0]||null;
}
function getProgrammes(channelId,date=new Date()){return programmesFor(channelId,date);}
function getOccurrences(channelId,date=new Date()){return allOccurrences(channelId,date);}
function getProgrammeByOccurrence(channelId,occurrenceId){
  return getOccurrences(channelId).find(p=>String(p.occurrenceId)===String(occurrenceId))||null;
}
function getProgrammeById(programId){
  const ids=new Set([editorial.channelId,...Object.keys(catalogue.channels||{})]);
  for(const c of ids){const found=programmesFor(c).find(p=>p.programId===programId);if(found)return found;}
  return null;
}
module.exports={getProgrammes,getOccurrences,getCurrentProgramme,getNextProgramme,getProgrammeByOccurrence,getProgrammeById};
