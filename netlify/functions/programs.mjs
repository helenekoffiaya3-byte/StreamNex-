const PROGRAMS=[
{ name:"Cacao", genre:"Séries", provider:"S+", available:true },
{ name:"Karate Kid Legends", genre:"Cinéma", provider:"S+", available:true },
{ name:"Invisible", genre:"Séries", provider:"S+", available:true },
{ name:"Amour profond", genre:"Séries", provider:"Novelas+", available:true },
{ name:"Mawu-Sika", genre:"Cinéma africain", provider:"S+", available:true },
{ name:"Francen Francis", genre:"Séries", provider:"S+", available:true },
{ name:"Cœur corrompu", genre:"Séries", provider:"Novelas+", available:true },
{ name:"Comédie Laulite", genre:"Humour", provider:"S+", available:true },
{ name:"Comédie Naturale", genre:"Humour", provider:"A+", available:true },
{ name:"Clash", genre:"Séries", provider:"S+", available:true },
{ name:"Les Aigles de la République", genre:"Cinéma", provider:"S+", available:true },
{ name:"African Superstars", genre:"Divertissement", provider:"S+", available:true },
{ name:"Scream", genre:"Cinéma", provider:"S+", available:true },
{ name:"La Dona", genre:"Séries", provider:"Novelas+", available:true },
{ name:"Sous le Masque", genre:"Séries", provider:"A+", available:true }
];
export default async function handler(request){
if(request.method!=="GET")return new Response(JSON.stringify({error:"METHOD_NOT_ALLOWED"}),{status:405,headers:{"content-type":"application/json; charset=utf-8"}});
return new Response(JSON.stringify(PROGRAMS),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
}
export const config={path:"/api/programs"};