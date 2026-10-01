const fs=require('fs');
const CHANNELS=require('../config/channels');
const SERVICES=require('../config/services');
const AUDIT=JSON.parse(fs.readFileSync(require('path').join(__dirname,'../config/catalogue-audit.json'),'utf8'));

const fail=[];
const ids=CHANNELS.map(x=>x.id);
const nums=CHANNELS.map(x=>x.channelNumber);
const allIds=[...ids,...SERVICES.map(x=>x.id)];

if(new Set(ids).size!==ids.length) fail.push('duplicate channel id');
if(new Set(nums).size!==nums.length) fail.push('duplicate channel number');
if(new Set(allIds).size!==allIds.length) fail.push('duplicate catalogue id');
for(const c of CHANNELS){
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.id)) fail.push('invalid id: '+c.id);
  if(!Number.isInteger(c.channelNumber)||c.channelNumber<1) fail.push('invalid number: '+c.id);
  if(typeof c.name!=='string'||!c.name.trim()) fail.push('missing name: '+c.id);
}
if(AUDIT.step!==1||AUDIT.bouquetsFinalized!==false) fail.push('audit step state invalid');
if(AUDIT.summary.channels!==CHANNELS.length) fail.push('audit channel count mismatch');
if(AUDIT.summary.services!==SERVICES.length) fail.push('audit service count mismatch');
const auditIds=new Set(AUDIT.entries.map(x=>x.id));
for(const id of allIds) if(!auditIds.has(id)) fail.push('missing audit entry: '+id);

if(fail.length){console.error(fail.join('\n'));process.exit(1);}
console.log('StreamLive Step 1 audit OK:',CHANNELS.length,'channels +',SERVICES.length,'services');
