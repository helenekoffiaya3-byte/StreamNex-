const PROGRAMS=[
{ id:"cacao", name:"Cacao", genre:"Séries", provider:"S+", available:true },
{ id:"karate-kid-legends", name:"Karate Kid Legends", genre:"Cinéma", provider:"S+", available:true },
{ id:"invisible", name:"Invisible", genre:"Séries", provider:"S+", available:true },
{ id:"amour-profond", name:"Amour profond", genre:"Séries", provider:"Novelas+", available:true },
{ id:"mawu-sika", name:"Mawu-Sika", genre:"Cinéma africain", provider:"S+", available:true },
{ id:"francen-francis", name:"Francen Francis", genre:"Séries", provider:"S+", available:true },
{ id:"coeur-corrompu", name:"Cœur corrompu", genre:"Séries", provider:"Novelas+", available:true },
{ id:"comedie-laulite", name:"Comédie Laulite", genre:"Humour", provider:"S+", available:true },
{ id:"comedie-naturale", name:"Comédie Naturale", genre:"Humour", provider:"A+", available:true },
{ id:"clash", name:"Clash", genre:"Séries", provider:"S+", available:true },
{ id:"les-aigles-de-la-republique", name:"Les Aigles de la République", genre:"Cinéma", provider:"S+", available:true },
{ id:"african-superstars", name:"African Superstars", genre:"Divertissement", provider:"S+", available:true },
{ id:"scream", name:"Scream", genre:"Cinéma", provider:"S+", available:true },
{ id:"la-dona", name:"La Dona", genre:"Séries", provider:"Novelas+", available:true },
{ id:"sous-le-masque", name:"Sous le Masque", genre:"Séries", provider:"A+", available:true }
];
export default async function handler(request){
 if(request.method!=="GET")return new Response(JSON.stringify({error:"METHOD_NOT_ALLOWED"}),{status:405,headers:{"content-type":"application/json; charset=utf-8"}});
 const url=new URL(request.url),provider=url.searchParams.get("provider"),genre=url.searchParams.get("genre"),q=(url.searchParams.get("q")||"").toLocaleLowerCase("fr");
 let result=PROGRAMS.slice();
 if(provider)result=result.filter(p=>p.provider===provider);
 if(genre)result=result.filter(p=>p.genre===genre);
 if(q)result=result.filter(p=>(p.name+" "+p.genre+" "+p.provider).toLocaleLowerCase("fr").includes(q));
 return new Response(JSON.stringify(result),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}
export const config={path:"/api/programs"};