import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,turn,step,emptyCell} from '../../public/arcade/macunaima/engine.mjs';
test('starts with one ant, eats and grows',()=>{const g=createGame();assert.equal(g.snake.length,1);for(let i=0;i<5;i++)step(g,()=>.5);assert.equal(g.score,10);assert.equal(g.snake.length,2);assert.ok(!g.snake.some(p=>p.x===g.food.x&&p.y===g.food.y));});
test('rejects reverse moves and handles queued turns',()=>{const g=createGame();turn(g,'left');assert.deepEqual(g.queue,[]);turn(g,'up');turn(g,'left');step(g);assert.deepEqual(g.snake[0],{x:7,y:6});step(g);assert.deepEqual(g.snake[0],{x:6,y:6});});
test('wall and character collisions end the game',()=>{for(const wall of [true,false]){const g=createGame();if(wall)g.snake=[{x:29,y:7}];else g.obstacles=[{x:8,y:7,name:'Piaimã'}];assert.equal(step(g).type,'over');assert.equal(g.state,'over');}});
test('third leaf adds a distant obstacle and increases difficulty',()=>{const g=createGame();g.score=20;g.food={x:8,y:7};const e=step(g,()=>.5);assert.equal(e.obstacle.name,'Macunaíma');assert.equal(g.level,2);assert.ok(Math.abs(e.obstacle.x-8)+Math.abs(e.obstacle.y-7)>=5);});
test('pause freezes state and occupied board returns no spawn',()=>{const g=createGame();g.state='paused';step(g);assert.equal(g.snake[0].x,7);g.snake=Array.from({length:450},(_,i)=>({x:i%30,y:Math.floor(i/30)}));assert.equal(emptyCell(g),null);});
test('tail cell is legal when it moves away; other body cells are fatal',()=>{const g=createGame();g.snake=[{x:5,y:5},{x:5,y:6},{x:6,y:6},{x:6,y:5}];assert.equal(step(g),null);g.dir='left';assert.equal(step(g).type,'over');});
