import CHANNELS from "../../config/channels.js";

const PROGRAMS=[
{ id:"nick-loud", name:"Bienvenue chez les Loud", genre:"Galères scolaires", provider:"Nickelodeon", available:true, channelId:"nickelodeon" },
{ id:"nick-henry-danger", name:"Henry Danger", genre:"Zéro zéro Kid", provider:"Nickelodeon", available:true, channelId:"nickelodeon" },
{ id:"nick-thunderman", name:"Les Thunderman", genre:"Cruel été", provider:"Nickelodeon", available:true, channelId:"nickelodeon" },
{ id:"nick-patrick-super-star", name:"Patrick super star", genre:"Vacances en famille", provider:"Nickelodeon", available:true, channelId:"nickelodeon" },
{ id:"nick-spongebob", name:"Bob l'éponge", genre:"Aventures à Bikini Bottom", provider:"Nickelodeon", available:true, channelId:"nickelodeon" },

{ id:"cacao", name:"Cacao", genre:"Séries", provider:"S+", available:true, channelId:null },
{ id:"karate-kid-legends", name:"Karate Kid Legends", genre:"Cinéma", provider:"S+", available:true, channelId:null },
{ id:"invisible", name:"Invisible", genre:"Séries", provider:"S+", available:true, channelId:null },
{ id:"amour-profond", name:"Amour profond", genre:"Séries", provider:"Novelas+", available:true, channelId:null },
{ id:"mawu-sika", name:"Mawu-Sika", genre:"Cinéma africain", provider:"S+", available:true, channelId:null },
{ id:"francen-francis", name:"Francen Francis", genre:"Séries", provider:"S+", available:true, channelId:null },
{ id:"coeur-corrompu", name:"Cœur corrompu", genre:"Séries", provider:"Novelas+", available:true, channelId:null },
{ id:"comedie-laulite", name:"Comédie Laulite", genre:"Humour", provider:"S+", available:true, channelId:null },
{ id:"comedie-naturale", name:"Comédie Naturale", genre:"Humour", provider:"A+", available:true, channelId:null },
{ id:"clash", name:"Clash", genre:"Séries", provider:"S+", available:true, channelId:null },
{ id:"les-aigles-de-la-republique", name:"Les Aigles de la République", genre:"Cinéma", provider:"S+", available:true, channelId:null },
{ id:"african-superstars", name:"African Superstars", genre:"Divertissement", provider:"S+", available:true, channelId:null },
{ id:"scream", name:"Scream", genre:"Cinéma", provider:"S+", available:true, channelId:null },
{ id:"la-dona", name:"La Dona", genre:"Séries", provider:"Novelas+", available:true, channelId:null },
{ id:"sous-le-masque", name:"Sous le Masque", genre:"Séries", provider:"A+", available:true, channelId:null }
];

const FALLBACK_TITLES={
 news:["Journal et actualités","Le grand débat","Flash info","L'essentiel de la journée","Magazine actualités"],
 sport:["Le direct sportif","Magazine du sport","Les grands moments","Analyse et débats","Le rendez-vous sportif"],
 kids:["Bienvenue chez les héros","Aventures en famille","Les héros du jour","Le rendez-vous jeunesse","Histoires pour enfants"],
 cinema:["Le film à l'affiche","Ciné magazine","Grand écran","Séance cinéma","Les incontournables"],
 music:["Hits du moment","Top musique","Live session","Clips & artistes","Music Replay"],
 documentary:["Le monde en images","Documentaire","Histoires et découvertes","Regards sur le monde","L'essentiel"],
 default:["Programme à revoir","Le rendez-vous de la chaîne","Magazine de la chaîne","Sélection Replay","Les incontournables"]
};

function kind(channel){
 const s=(String(channel.name||"")+" "+String(channel.group||"")).toLocaleLowerCase("fr");
 if(/news|info|france 2|france 3|france 24|cnn|bbc|al.?jazeera|euronews|journal|météo|weather/.test(s))return "news";
 if(/sport|football|bein|eurosport|canal\+ foot/.test(s))return "sport";
 if(/kids|jeunesse|enfant|nickelodeon|gulli|disney|cartoon|boomerang|tiji/.test(s))return "kids";
 if(/ciné|cinema|cinéma|film|movie|action|première/.test(s))return "cinema";
 if(/music|musique|trace|mtv|hits/.test(s))return "music";
 if(/doc|documentaire|histoire|science|nature|discovery|national geographic/.test(s))return "documentary";
 return "default";
}

function generatedPrograms(channel){
 const titles=FALLBACK_TITLES[kind(channel)]||FALLBACK_TITLES.default;
 return titles.map((title,i)=>({
  id:`replay-${channel.id}-${i+1}`,
  name:`${title} — ${channel.name}`,
  genre:kind(channel)==="default"?"Replay":kind(channel),
  provider:channel.name,
  available:true,
  channelId:channel.id,
  poster:channel.logoUrl||""
 }));
}

export default async function handler(request){
 if(request.method!=="GET")return new Response(JSON.stringify({error:"METHOD_NOT_ALLOWED"}),{status:405,headers:{"content-type":"application/json; charset=utf-8"}});
 const url=new URL(request.url),provider=url.searchParams.get("provider"),genre=url.searchParams.get("genre"),channelId=url.searchParams.get("channel"),q=(url.searchParams.get("q")||"").toLocaleLowerCase("fr");
 let result=PROGRAMS.slice();
 if(channelId){
  const explicit=result.filter(p=>p.channelId===channelId);
  if(explicit.length) result=explicit;
  else {
   const channel=CHANNELS.find(c=>String(c.id)===String(channelId));
   result=channel?generatedPrograms(channel):[];
  }
 }
 if(provider)result=result.filter(p=>p.provider===provider);
 if(genre)result=result.filter(p=>p.genre===genre);
 if(q)result=result.filter(p=>(p.name+" "+p.genre+" "+p.provider).toLocaleLowerCase("fr").includes(q));
 return new Response(JSON.stringify(result),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}
export const config={path:"/api/programs"};