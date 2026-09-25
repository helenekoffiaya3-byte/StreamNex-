/**
 * EPG de secours synthétique.
 * Ne représente pas une programmation réelle et ne déclenche jamais un flux LIVE.
 */
const TEMPLATES={
  Jeunesse:["Bluey","Peppa Pig","Molang","Hilda","Trollhunters","Bob l'éponge","Bienvenue chez les Loud","Pat' Patrouille","Miraculous","Gumball","Adventure Time","Teen Titans Go!","Ben 10","Les Razmoket","iCarly","Drake & Josh","Victorious","Les Thunderman","Henry Danger","Avatar"],
  National:["Journal","Magazine Côte d'Ivoire","Culture","Musique","Divertissement","Sport Express","Débat","Documentaire","Économie","Société"],
  Info:["Journal en continu","Actualités","Économie","Monde","Afrique","Météo","Sport","Culture","Décryptage","Magazine"],
  Films:["Film","Série","Téléfilm","Cinéma africain","Classique du cinéma","Thriller","Comédie","Animation","Documentaire","Magazine cinéma"],
  Biblical:["Enseignement","Célébration","Musique","Témoignage","Documentaire","Famille","Jeunesse","Étude biblique"],
  default:["Magazine","Divertissement","Actualités","Culture","Documentaire","Musique","Série","Film","Sport","Découverte"]
};
function generateProgramsForChannel(channel,count=30){
 const titles=TEMPLATES[channel?.group]||TEMPLATES.default;
 const programs=[]; const day=new Date(); day.setHours(6,0,0,0);
 let cursor=day.getTime();
 for(let i=0;i<count;i++){
  const duration=45+(i%3)*15;
  const startAt=new Date(cursor).toISOString(),endAt=new Date(cursor+duration*60000).toISOString();
  const programId=`epggen-${channel.id}-${String(i+1).padStart(2,"0")}`;
  programs.push({programId,channelId:channel.id,epgId:`epg.${channel.id}.${programId}`,title:titles[i%titles.length],type:channel.group==="Films"?"movie":"show",description:`Programme EPG synthétique de secours pour ${channel.name}.`,startAt,endAt,duration:`${duration} min`,generated:true,source:"synthetic-fallback",streamEnabled:false,stream:{enabled:false,status:"INACTIVE"}});
  cursor+=duration*60000;
 }
 return programs;
}
module.exports={generateProgramsForChannel};
