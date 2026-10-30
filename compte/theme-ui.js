(()=> {
 const KEY='streamnex_darkmode';
 const style=document.createElement('style');
 style.id='streamnex-theme-style';
 style.textContent=`
 html.sn-light{color-scheme:light}
 html.sn-light body{background:#f3f5f7!important;color:#17191d!important}
 html.sn-light header,html.sn-light .header,html.sn-light .top{background:#fff!important;color:#17191d!important;border-color:#e1e5e9!important}
 html.sn-light .container,html.sn-light main{background:transparent!important;color:#17191d}
 html.sn-light .item,html.sn-light .card,html.sn-light .panel,html.sn-light .option,html.sn-light .opt,html.sn-light .row,html.sn-light .settings-link,html.sn-light .bottom-nav{background:#fff!important;color:#17191d!important;border-color:#e1e5e9!important;box-shadow:0 2px 10px rgba(20,30,40,.05)}
 html.sn-light .option.selected,html.sn-light .opt.selected{background:#e8f8ef!important;border-color:#18b866!important}
 html.sn-light .label,html.sn-light .title,html.sn-light .name,html.sn-light h1,html.sn-light h2,html.sn-light h3,html.sn-light p,html.sn-light .row-title,html.sn-light .option-title,html.sn-light .opt-title{color:#20242a}
 html.sn-light .sub,html.sn-light .description,html.sn-light .note,html.sn-light .small,html.sn-light .option-desc{color:#68717c!important}
 html.sn-light a,html.sn-light .back{color:#20242a}
 html.sn-light input:not([type=checkbox]),html.sn-light select,html.sn-light textarea{background:#fff!important;color:#17191d!important;border-color:#d7dde3!important}
 html.sn-light .bottom-nav{background:rgba(255,255,255,.97)!important}
 html.sn-light .status{background:#edf1f4!important;color:#28313b!important}
 html.sn-light .danger .label,html.sn-light .danger .arrow{color:#d92d3b!important}
 `;
 document.head.appendChild(style);
 function apply(){
  const dark=localStorage.getItem(KEY)!=='false';
  document.documentElement.classList.toggle('sn-light',!dark);
  document.documentElement.classList.toggle('sn-dark',dark);
  document.documentElement.style.colorScheme=dark?'dark':'light';
  const toggle=document.getElementById('darkmode');
  if(toggle)toggle.checked=dark;
 }
 apply();
 document.addEventListener('change',event=>{
  if(event.target&&event.target.id==='darkmode'){
   localStorage.setItem(KEY,String(event.target.checked));
   apply();
  }
 });
 window.addEventListener('storage',event=>{if(event.key===KEY)apply();});
})();