const CELL = 48, BORDER = 64;
const ANGLE = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 };
const regions = [
  [50, 35, 510, 415], [592, 55, 400, 380], [1128, 0, 288, 478],
  [103, 472, 342, 550], [640, 485, 298, 533], [1080, 461, 382, 558],
];
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Não foi possível carregar ${src}`));
    image.src = new URL(src, import.meta.url).href;
  });
}

export function createRenderer(canvas) {
  const ctx = canvas.getContext('2d');
  const background = document.createElement('canvas');
  let forest, sprites, effects = [], dimensions = '';
  const ready = Promise.all([loadImage('./assets/forest-clearing.webp'), loadImage('./assets/characters.webp')])
    .then(([a, b]) => { forest = a; sprites = b; });

  function resize(game) {
    const key = `${game.cols}:${game.rows}`;
    if (dimensions === key) return;
    dimensions = key;
    canvas.width = game.cols * CELL + BORDER * 2;
    canvas.height = game.rows * CELL + BORDER * 2;
    canvas.parentElement.style.setProperty('--board-ratio', `${canvas.width}/${canvas.height}`);
    background.width = canvas.width;
    background.height = canvas.height;
    const bg = background.getContext('2d');
    bg.imageSmoothingEnabled = false;
    // Nine-slice the forest so trunks and foliage keep their proportions on phones.
    const sx = [0, Math.round(forest.width * .085), Math.round(forest.width * .915), forest.width];
    const sy = [0, Math.round(forest.height * .15), Math.round(forest.height * .83), forest.height];
    const dx = [0, BORDER, canvas.width - BORDER, canvas.width];
    const dy = [0, BORDER, canvas.height - BORDER, canvas.height];
    for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) {
      bg.drawImage(forest, sx[x], sy[y], sx[x+1]-sx[x], sy[y+1]-sy[y], dx[x], dy[y], dx[x+1]-dx[x], dy[y+1]-dy[y]);
    }
    // The fine boundary marks exactly where collision with the forest begins.
    bg.strokeStyle = '#f2d48c66'; bg.lineWidth = 2;
    bg.strokeRect(BORDER, BORDER, game.cols * CELL, game.rows * CELL);
    ctx.imageSmoothingEnabled = false;
  }
  function sprite(index, x, y, width, height) {
    ctx.drawImage(sprites, ...regions[index], Math.round(x-width/2), Math.round(y-height/2), width, height);
  }
  function shadow(x, y, radius = 18) {
    ctx.fillStyle = '#25160e66';
    ctx.beginPath(); ctx.ellipse(x+2, y+5, radius, radius*.45, 0, 0, Math.PI*2); ctx.fill();
  }
  function sparkle(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x)-size, Math.round(y)-1, size*2+1, 3);
    ctx.fillRect(Math.round(x)-1, Math.round(y)-size, 3, size*2+1);
  }
  function draw(game, time, moving, progress = 1, previous = game.snake) {
    if (!forest || !sprites) return;
    resize(game);
    ctx.drawImage(background, 0, 0);
    const point = p => ({ x: BORDER+(p.x+.5)*CELL, y: BORDER+(p.y+.5)*CELL });
    if (game.food) {
      const p = point(game.food), bob = Math.sin(time/260)*3;
      shadow(p.x,p.y+8,16);
      ctx.strokeStyle = '#e9ef9480'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(p.x,p.y+9,22,12,0,0,Math.PI*2); ctx.stroke();
      sprite(1,p.x,p.y-4+bob,36,35);
      sparkle(p.x+19,p.y-16+bob,3,'#fff5b3');
    }
    for (const p of game.obstacles) {
      const pos = point(p); shadow(pos.x,pos.y+8,21);
      ctx.fillStyle = '#723f3266'; ctx.fillRect(pos.x-22,pos.y-20,44,42);
      if (p.kind < 4) {
        sprite(p.kind+2,pos.x,pos.y-9, p.kind===3 ? 43 : 36,58);
        ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
        ctx.lineWidth = 3; ctx.strokeStyle = '#201c17'; ctx.strokeText(p.name,pos.x,pos.y-43);
        ctx.fillStyle = '#fff0c6'; ctx.fillText(p.name,pos.x,pos.y-43);
      } else {
        ctx.fillStyle = '#35251d'; ctx.fillRect(pos.x-20,pos.y-10,40,25);
        ctx.fillStyle = '#795135'; ctx.fillRect(pos.x-18,pos.y-12,36,23);
        ctx.fillStyle = '#a67c48'; ctx.fillRect(pos.x-17,pos.y-10,4,19);
        ctx.fillStyle = '#453023'; for(let i=0;i<4;i++)ctx.fillRect(pos.x-9,pos.y-8+i*5,25,2);
        ctx.fillStyle = '#6d853f'; ctx.fillRect(pos.x-7,pos.y-13,16,4);
      }
    }
    for (let i = game.snake.length-1; i >= 0; i--) {
      const target = game.snake[i], origin = previous[i] || previous.at(-1) || target;
      const p = point({ x: origin.x+(target.x-origin.x)*progress, y: origin.y+(target.y-origin.y)*progress });
      const ahead = game.snake[i-1];
      const dir = ahead ? ahead.x>target.x?'right':ahead.x<target.x?'left':ahead.y>target.y?'down':'up' : game.dir;
      shadow(p.x,p.y,19);
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(ANGLE[dir]);
      const gait = moving ? Math.sin(time/55+i*1.7) : 0;
      if(i===0){ctx.strokeStyle='#fff0b499';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,25,21,0,0,Math.PI*2);ctx.stroke();}
      sprite(0,0,gait*.8,49,39+gait*1.5);
      ctx.restore();
    }
    for (const effect of effects) {
      const age=(time-effect.time)/700;
      if(age<0||age>1)continue;
      const p=point(effect);ctx.globalAlpha=1-age;
      for(let i=0;i<8;i++){const a=i*Math.PI/4;sparkle(p.x+Math.cos(a)*age*42,p.y+Math.sin(a)*age*42,2,i%2?'#ecdb82':'#b9e787');}
      ctx.font='bold 19px monospace';ctx.textAlign='center';ctx.fillStyle='#fff6bc';ctx.strokeStyle='#304025';ctx.lineWidth=3;
      ctx.strokeText('+10',p.x,p.y-20-age*30);ctx.fillText('+10',p.x,p.y-20-age*30);ctx.globalAlpha=1;
    }
    effects=effects.filter(e=>time-e.time<700);
  }
  return { ready, draw, reset(){effects=[];dimensions='';}, eat(p,time){effects.push({...p,time});} };
}
