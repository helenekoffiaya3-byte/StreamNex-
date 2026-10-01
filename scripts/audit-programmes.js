const fs=require('fs');
const path=require('path');
const CHANNELS=require('../config/channels');

const file=path.join(__dirname,'..','config','programmes.json');
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const channelIds=new Set(CHANNELS.map(c=>c.id));
const errors=[];
const warnings=[];
const seenProgramIds=new Set();

function minutes(v){
  const [h,m]=String(v).split(':').map(Number);
  if(!Number.isInteger(h)||!Number.isInteger(m)||h<0||h>23||m<0||m>59)return null;
  return h*60+m;
}

for(const [channelId,cfg] of Object.entries(data.channels||{})){
  if(!channelIds.has(channelId)) errors.push(`Unknown channelId: ${channelId}`);
  if(!cfg.timezone) errors.push(`${channelId}: missing timezone`);
  for(const day of ['mondayFriday','saturday','sunday']){
    const list=cfg.weekly?.[day]||[];
    let previousEnd=null;
    for(const p of list){
      if(!p.id||!p.title||!p.startTime||!p.endTime) errors.push(`${channelId}/${day}: incomplete programme`);
      if(seenProgramIds.has(p.id)) errors.push(`Duplicate programId: ${p.id}`);
      seenProgramIds.add(p.id);
      const s=minutes(p.startTime),e=minutes(p.endTime);
      if(s===null||e===null) errors.push(`${channelId}/${day}/${p.id}: invalid time`);
      if(previousEnd!==null && s!==previousEnd) errors.push(`${channelId}/${day}: gap or overlap before ${p.id}`);
      previousEnd=e;
    }
    if(list.length && previousEnd!==0) errors.push(`${channelId}/${day}: schedule does not end at 24:00`);
  }
  for(const item of cfg.vod||[]){
    if(!item.programId||!item.title) errors.push(`${channelId}: invalid VOD item`);
    if(item.originalChannel===undefined) warnings.push(`${channelId}/${item.programId}: originalChannel missing`);
  }
}

if(errors.length){
  console.error('StreamLive programme catalogue INVALID');
  for(const e of errors) console.error(' - '+e);
  process.exit(1);
}
console.log(`StreamLive programme catalogue OK: ${Object.keys(data.channels||{}).length} channels, ${seenProgramIds.size} programme definitions`);
if(warnings.length) console.warn(warnings.join('\n'));
