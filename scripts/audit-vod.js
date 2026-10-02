const fs=require('fs');
const path=require('path');
const CHANNELS=require('../config/channels');
const programmes=require('../config/programmes');

const file=path.join(__dirname,'../config/vod.json');
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const items=Array.isArray(data.items)?data.items:[];
const channelIds=new Set(CHANNELS.map(c=>c.id));
const fail=[];
const ids=new Set();

for(const item of items){
  if(!item.id||typeof item.id!=='string') fail.push('missing id');
  if(ids.has(item.id)) fail.push('duplicate id: '+item.id);
  ids.add(item.id);
  if(!item.title||typeof item.title!=='string') fail.push('missing title: '+item.id);
  if(!['movie','series','episode','show','documentary','sports'].includes(item.type)) fail.push('invalid type: '+item.id);
  if(item.originalChannel!==null&&item.originalChannel!==undefined&&!channelIds.has(item.originalChannel)) fail.push('unknown originalChannel: '+item.id);
  if(item.programmeId&&typeof item.programmeId!=='string') fail.push('invalid programmeId: '+item.id);
  if(item.mediaUrl&&item.hlsUrl) fail.push('mediaUrl and hlsUrl both set: '+item.id);
  if(item.catalogEnabled===undefined) fail.push('missing catalogEnabled: '+item.id);
}

if(fail.length){console.error(fail.join('\n'));process.exit(1);}
console.log('StreamLive VOD audit OK:',items.length,'items');
