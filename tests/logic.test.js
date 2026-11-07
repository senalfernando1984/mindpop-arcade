import test from 'node:test';
import assert from 'node:assert/strict';
import {HOLES,JUMPS,initialBoard,legalMoves,jump,pegCount,bestSolution,dailyHole,GAME_CATALOG} from '../src/logic.js';
test('board has 15 holes and 36 directed jumps',()=>{assert.equal(HOLES.length,15);assert.equal(JUMPS.length,36);assert.equal(new Set(HOLES.map(h=>h.label)).size,15);});
test('initial game and move legality',()=>{const b=initialBoard();assert.equal(pegCount(b),14);assert.equal(legalMoves(b).length,2);assert.throws(()=>jump(b,{from:0,over:1,to:3}));const m=legalMoves(b)[0];assert.equal(pegCount(jump(b,m)),13);});
test('solver finds one peg at top for classic game',()=>{let b=initialBoard(0);const s=bestSolution(b,0);assert.equal(s.remaining,1);assert.equal(s.route.length,13);for(const m of s.route)b=jump(b,m);assert.equal(pegCount(b),1);assert.equal(b[0],true);});
test('all calendar daily challenges are valid solvable puzzles',()=>{for(const empty of [0,3,5,6,9,10,14]){const solution=bestSolution(initialBoard(empty),0);assert.equal(solution.remaining,1,'opening '+empty+' solvable');}for(let i=0;i<100;i++)assert.ok(dailyHole(new Date(Date.UTC(2026,0,1+i)))>=0);});
test('catalogue is extensible and first game is published',()=>{assert.equal(GAME_CATALOG[0].available,true);assert.equal(new Set(GAME_CATALOG.map(g=>g.id)).size,GAME_CATALOG.length);});