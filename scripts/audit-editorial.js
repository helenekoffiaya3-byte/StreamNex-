#!/usr/bin/env node
const fs=require('fs');
const path=require('path');
const file=path.join(__dirname,'..','config','editorial','streamlive-programs.json');
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const items=data.programmes||[];
const fail=[];
const toMin=v=>{const m=String(v).match(/^(\d{2}):(\d{2})$/);if(!m)return null;const h=Number(m[1]),mm=Number(m[2]);return h<24&&mm<60?h*60+mm:null;};
if(data.timezone!=='Africa/Abidjan')fail.push('timezone must be Africa/Abidjan');
if(items.length!==15)fail.push('expected 15 programmes');
let total=0;
for(let i=0;i<items.length;i++){
 const p=items[i],s=toMin(p.startTime),e=toMin(p.endTime);
 if(s===null||e===null)fail.push('invalid time: '+p.id);
 const end=e===0?1440:e;
 const duration=end-s;
 if(duration<=0)fail.push('invalid duration: '+p.id);
 total+=duration;
 const next=items[(i+1)%items.length],ns=toMin(next.startTime);
 const expected=next===items[0]?1440:ns;
 if(end!==expected)fail.push('gap/overlap: '+p.id+' -> '+next.id);
}
if(total!==1440)fail.push('schedule total '+total+' minutes, expected 1440');
if(fail.length){console.error(fail.join('\n'));process.exit(1);}
console.log('StreamLive editorial audit OK: 15 programmes, 1440 minutes, Africa/Abidjan, no gaps/overlaps');
