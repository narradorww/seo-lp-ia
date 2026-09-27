import {createGame,turn,step} from './engine.mjs';
import {createRenderer} from './renderer.mjs';
const $=id=>document.getElementById(id),canvas=$('game'),renderer=createRenderer(canvas);
const mobile=()=>matchMedia('(max-width: 600px)').matches;
const newGame=()=>mobile()?createGame(14,16):createGame(24,12);
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let previous=[],visualTime=0,assetsReady=false;
let game=newGame(),mode='ready',last=0,clock=0,best=0,sound=false,audio,noticeTimer;
try{best=Number(localStorage.getItem('sauvas-best'))||0;}catch{}
const pad=n=>String(n).padStart(3,'0');$('best').textContent=pad(best);
function tone(freq,duration=.1){if(!sound)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),v=audio.createGain();o.type='square';o.frequency.setValueAtTime(freq,audio.currentTime);v.gain.setValueAtTime(.035,audio.currentTime);v.gain.exponentialRampToValueAtTime(.001,audio.currentTime+duration);o.connect(v);v.connect(audio.destination);o.start();o.stop(audio.currentTime+duration);}catch{}}
function update(){ $('score').textContent=pad(game.score);$('length').textContent=String(game.snake.length).padStart(2,'0');$('best').textContent=pad(best);$('level').textContent=String(game.level).padStart(2,'0')+' · '+(['CLAREIRA','MATA ADENTRO','IGARAPÉ','MATA FECHADA'][Math.min(game.level-1,3)]);}
function start(){if(!assetsReady)return;game=newGame();previous=game.snake.map(p=>({...p}));renderer.reset();mode='playing';clock=0;document.body.classList.add('in-game');$('overlay').hidden=true;$('stage').classList.add('playing');$('pause').disabled=false;$('pause').textContent='Ⅱ';$('pause').setAttribute('aria-label','Pausar jogo');$('touch-pause').textContent='Ⅱ PAUSAR';$('announcement').textContent='';clearTimeout(noticeTimer);update();tone(440);}
function overlay(title,copy,label,chapter){$('overlay-title').innerHTML=title;$('overlay-copy').textContent=copy;$('start').innerHTML='<span>▶</span> '+label;$('chapter').textContent=chapter;$('start-hint').textContent=mode==='paused'?'ESPAÇO para continuar':'ENTER para tentar novamente';$('overlay').hidden=false;}
function pause(){if(!['playing','paused'].includes(mode))return;if(mode==='playing'){mode='paused';game.state='paused';overlay('Até a saúva<br><span>precisa de pausa.</span>','Sua trilha espera por você.','CONTINUAR A TRILHA','RESPIRE A FLORESTA');$('pause').textContent='▶';$('pause').setAttribute('aria-label','Continuar jogo');$('touch-pause').textContent='▶ CONTINUAR';}else{mode='playing';game.state='playing';clock=0;previous=game.snake.map(p=>({...p}));$('overlay').hidden=true;$('pause').textContent='Ⅱ';$('pause').setAttribute('aria-label','Pausar jogo');$('touch-pause').textContent='Ⅱ PAUSAR';}}
function end(event){mode=game.state;best=Math.max(best,game.score);try{localStorage.setItem('sauvas-best',String(best));}catch{}update();$('pause').disabled=true;tone(110,.35);overlay(event.type==='won'?'A floresta é<br><span>das saúvas!</span>':'Toda trilha tem<br><span>um novo começo.</span>',`${event.cause||'Você ocupou toda a clareira!'} ${game.score} pontos · ${game.snake.length} saúva${game.snake.length===1?'':'s'}.`,'TENTAR NOVAMENTE',event.type==='won'?'CLAREIRA CONQUISTADA':'FIM DESTA AVENTURA');}
function frame(time){
 const elapsed=Math.min(time-last,100);last=time;
 const interval=Math.max(90,(game.cols===14?260:230)-(game.level-1)*20);
 if(mode==='playing'){
  visualTime+=elapsed;clock+=elapsed;
  if(clock>=interval){
   clock-=interval;previous=game.snake.map(p=>({...p}));
   const food=game.food?{...game.food}:null;const event=step(game);
   if(event?.type==='over'||event?.type==='won')end(event);
   else if(event?.type==='eat'){
    if(!reducedMotion.matches)renderer.eat(food,visualTime);tone(650);update();
    if(event.obstacle){$('announcement').textContent=event.obstacle.name+' apareceu na clareira!';clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('announcement').textContent='',2500);}
   }
  }
 }
 if(mode!=='ready')renderer.draw(game,reducedMotion.matches?0:visualTime,mode==='playing'&&!reducedMotion.matches,reducedMotion.matches?1:Math.min(1,clock/interval),previous);
 requestAnimationFrame(frame);
}
$('start').disabled=true;
renderer.ready.then(()=>{assetsReady=true;$('start').disabled=false;}).catch(()=>{
 $('overlay-copy').textContent='A arte da floresta não carregou. Verifique sua conexão e tente novamente.';
 $('start').disabled=false;$('start').textContent='RECARREGAR';$('start').onclick=()=>location.reload();
});
requestAnimationFrame(frame);
$('start').onclick=()=>mode==='paused'?pause():start();$('pause').onclick=pause;$('sound').onclick=()=>{sound=!sound;$('sound').setAttribute('aria-pressed',String(sound));$('sound').setAttribute('aria-label',sound?'Desativar som':'Ativar som');$('sound').querySelector('span').textContent=sound?'SOM ON':'SOM OFF';tone(520);};
const keys={ArrowUp:'up',w:'up',ArrowDown:'down',s:'down',ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right'};
document.addEventListener('keydown',e=>{if($('instructions').open)return;const key=e.key.length===1?e.key.toLowerCase():e.key;if(keys[key]){e.preventDefault();if(mode==='playing')turn(game,keys[key]);}else if(key===' '||key==='p'){e.preventDefault();if(!e.repeat)pause();}else if(key==='Enter'&&e.target.tagName!=='BUTTON'&&!e.repeat){e.preventDefault();if(mode==='paused')pause();else if(mode!=='playing')start();}});
// Pointer capture keeps the thumb engaged as it slides between directions.
const dpad=$('dpad');let padPointer=null;
function padDirection(e){const button=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-dir]');if(button&&dpad.contains(button)){if(mode==='playing')turn(game,button.dataset.dir);dpad.querySelectorAll('button').forEach(b=>b.classList.toggle('pressed',b===button));}}
dpad.addEventListener('pointerdown',e=>{e.preventDefault();padPointer=e.pointerId;dpad.setPointerCapture(e.pointerId);padDirection(e);});
dpad.addEventListener('pointermove',e=>{if(e.pointerId===padPointer)padDirection(e);});
function releasePad(){padPointer=null;dpad.querySelectorAll('button').forEach(b=>b.classList.remove('pressed'));}
dpad.addEventListener('pointerup',releasePad);dpad.addEventListener('pointercancel',releasePad);dpad.addEventListener('lostpointercapture',releasePad);
dpad.querySelectorAll('button').forEach(b=>b.addEventListener('click',e=>{if(e.detail===0&&mode==='playing')turn(game,b.dataset.dir);}));
let touch;
canvas.addEventListener('pointerdown',e=>{touch={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!touch||e.pointerId!==touch.id)return;const dx=e.clientX-touch.x,dy=e.clientY-touch.y;if(Math.max(Math.abs(dx),Math.abs(dy))>=14){if(mode==='playing')turn(game,Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');touch={x:e.clientX,y:e.clientY,id:e.pointerId};}});
canvas.addEventListener('pointerup',()=>{touch=null;});canvas.addEventListener('pointercancel',()=>{touch=null;});
$('touch-pause').onclick=pause;
function setHand(hand){$('mobile-controls').dataset.hand=hand;document.querySelectorAll('[data-hand-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.handChoice===hand)));try{localStorage.setItem('sauvas-hand',hand);}catch{}}
let hand='right';try{hand=localStorage.getItem('sauvas-hand')==='left'?'left':'right';}catch{}setHand(hand);
document.querySelectorAll('[data-hand-choice]').forEach(b=>b.onclick=()=>setHand(b.dataset.handChoice));
let viewportWidth=innerWidth;
window.addEventListener('resize',()=>{if(innerWidth!==viewportWidth){viewportWidth=innerWidth;if(mode==='playing')pause();}});
$('help').onclick=()=>{if(mode==='playing')pause();$('instructions').showModal();};document.querySelectorAll('.close,.close-help').forEach(b=>b.onclick=()=>$('instructions').close());document.addEventListener('visibilitychange',()=>{if(document.hidden&&mode==='playing')pause();});window.addEventListener('blur',()=>{if(mode==='playing')pause();});
