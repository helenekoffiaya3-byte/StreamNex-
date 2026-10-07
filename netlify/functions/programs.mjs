const PROGRAMS=[\n{ id:"nick-loud", name:"Bienvenue chez les Loud", genre:"Galères scolaires", provider:"Nickelodeon", available:true, channelId:"nickelodeon" },
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
export default async function handler(request){
 if(request.method!=="GET")return new Response(JSON.stringify({error:"METHOD_NOT_ALLOWED"}),{status:405,headers:{"content-type":"application/json; charset=utf-8"}});
 const url=new URL(request.url),provider=url.searchParams.get("provider"),genre=url.searchParams.get("genre"),channelId=url.searchParams.get("channel"),q=(url.searchParams.get("q")||"").toLocaleLowerCase("fr");
 let result=PROGRAMS.slice();
 if(channelId)result=result.filter(p=>p.channelId===channelId);
 if(provider)result=result.filter(p=>p.provider===provider);
 if(genre)result=result.filter(p=>p.genre===genre);
 if(q)result=result.filter(p=>(p.name+" "+p.genre+" "+p.provider).toLocaleLowerCase("fr").includes(q));
 return new Response(JSON.stringify(result),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}
export const config={path:"/api/programs"};