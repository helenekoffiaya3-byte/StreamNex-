const express=require('express');
const {rateLimit}=require('express-rate-limit');
const {db}=require('../models/program-db');
const {requireAdminAuth,ADMIN_EMAIL}=require('../services/adminAuth');
const router=express.Router();

const limiter=rateLimit({windowMs:15*60*1000,limit:120,standardHeaders:'draft-8',legacyHeaders:false,message:{success:false,error:'Trop de requêtes administrateur.'}});
router.use(limiter,requireAdminAuth);

router.get('/me',(req,res)=>res.json({success:true,admin:{email:ADMIN_EMAIL,username:req.admin.username||null,role:req.admin.role}}));

router.get('/dashboard',(_req,res)=>{
  try{
    const count=t=>db.prepare('SELECT COUNT(*) AS count FROM '+t).get().count;
    const stats={channels:count('channels'),users:count('users'),programs:count('programs'),occurrences:count('program_occurrences'),mediaAssets:count('media_assets'),recordings:count('recordings'),recordingSegments:count('recording_segments'),replayCatalog:count('replay_catalog'),episodes:count('episodes'),movies:count('movies'),series:count('series'),subtitles:count('subtitles'),audioTracks:count('audio_tracks')};
    const recentPrograms=db.prepare('SELECT program_id AS programId,channel_id AS channelId,title,type,status,occurrences_count AS occurrencesCount FROM programs ORDER BY COALESCE(observed_last_seen_at,updated_at,created_at) DESC LIMIT 50').all();
    const recentRecordings=db.prepare('SELECT recording_id AS recordingId,program_id AS programId,channel_id AS channelId,started_at AS startedAt,actual_duration_seconds AS actualDurationSeconds,status,state,segment_count AS segmentCount,error FROM recordings ORDER BY COALESCE(started_at,created_at) DESC LIMIT 50').all();
    const replays=db.prepare('SELECT replay_id AS replayId,program_id AS programId,channel_id AS channelId,broadcast_date AS broadcastDate,title,genre,duration_seconds AS durationSeconds,status,published_at AS publishedAt FROM replay_catalog ORDER BY published_at DESC LIMIT 50').all();
    return res.json({success:true,database:'streamlive-production',visibility:'admin-only',adminEmail:ADMIN_EMAIL,stats,recentPrograms,recentRecordings,replays});
  }catch(error){
    console.error('[API] admin dashboard:',error);
    return res.status(500).json({success:false,error:'Base de données administrateur indisponible.'});
  }
});

module.exports=router;
