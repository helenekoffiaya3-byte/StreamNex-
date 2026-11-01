const API='https://api.themoviedb.org/3';
exports.handler = async (event) => {
  const key = process.env.TMDB_API_KEY;
  if (!key) return reply(503,{error:'TMDB_API_KEY manquante dans les variables d’environnement Netlify.'});
  const p=event.queryStringParameters||{},action=p.action||'trending';
  let endpoint;
  if(action==='trending') endpoint='/trending/all/week';
  else if(action==='search'&&p.query) endpoint='/search/multi';
  else if(action==='details'&&validId(p.id)&&['tv','movie'].includes(p.type)) endpoint='/'+p.type+'/'+p.id;
  else if(action==='season'&&validId(p.id)&&/^\d+$/.test(p.season||'')) endpoint='/tv/'+p.id+'/season/'+p.season;
  else return reply(400,{error:'Paramètres TMDB invalides.'});
  const url=new URL(API+endpoint);url.searchParams.set('api_key',key);url.searchParams.set('language','fr-FR');
  if(action==='search'){url.searchParams.set('query',p.query);url.searchParams.set('include_adult','false');}
  try{const upstream=await fetch(url,{headers:{accept:'application/json'}});const body=await upstream.json();
    if(!upstream.ok)return reply(upstream.status,{error:body.status_message||'Erreur du service TMDB.'});
    return reply(200,body);
  }catch(error){return reply(502,{error:'TMDB temporairement inaccessible.'});}
};
function validId(v){return /^\d+$/.test(v||'');}
function reply(statusCode,body){return {statusCode,headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=300'},body:JSON.stringify(body)};}
