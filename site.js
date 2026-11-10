(function(){
var d=document,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
d.documentElement.classList.add('js');
// Start autoplay films only when motion is welcome and data is not being saved.
var save=!!(navigator.connection&&navigator.connection.saveData);
d.querySelectorAll('.vtoggle').forEach(function(b){
  var v=d.querySelector(b.getAttribute('data-target'));if(!v)return;
  function sync(){var p=v.paused;b.textContent=p?'Play':'Pause';b.setAttribute('aria-pressed',p?'true':'false');}
  sync();
  v.addEventListener('play',sync);v.addEventListener('pause',sync);
  b.addEventListener('click',function(){if(v.paused){v.play();}else{v.pause();}});
});
d.querySelectorAll('video[data-autoplay]').forEach(function(v){
  if(reduce||save)return;
  v.muted=true;v.preload='auto';var p=v.play();if(p&&p.catch)p.catch(function(){});
});
// Fade in on scroll.
var rs=d.querySelectorAll('.reveal');
if('IntersectionObserver' in window&&!reduce){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
  rs.forEach(function(r){io.observe(r);});
}else{rs.forEach(function(r){r.classList.add('in');});}
// Hover to preview a project's film (pointer devices only).
if(!reduce&&window.matchMedia('(hover: hover)').matches){
  d.querySelectorAll('.tile').forEach(function(t){
    var v=t.querySelector('video[data-hover]');if(!v)return;
    t.addEventListener('mouseenter',function(){var p=v.play();if(p&&p.then)p.then(function(){t.classList.add('playing');}).catch(function(){});});
    t.addEventListener('mouseleave',function(){t.classList.remove('playing');v.pause();});
  });
}
// Discipline filter.
var chips=d.querySelectorAll('.chip');
chips.forEach(function(c){c.addEventListener('click',function(){
  var f=c.getAttribute('data-filter');
  chips.forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false');});
  d.querySelectorAll('.grid .tile').forEach(function(t){var tags=(t.getAttribute('data-tags')||'').split(' ');t.hidden=!(f==='*'||tags.indexOf(f)>-1);});
});});
})();
