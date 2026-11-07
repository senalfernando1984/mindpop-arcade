/** Triangle Peg Solitaire — pure game engine, independent of UI. */
export const ROWS=5;
export const HOLES=Array.from({length:15},(_,index)=>{
 let row=0;while((row+1)*(row+2)/2<=index)row++;
 const col=index-row*(row+1)/2;
 return {index,row,col,label:String.fromCharCode(65+index),x:200+(col-row/2)*88,y:30+row*80};
});
const byCell=new Map(HOLES.map(h=>[h.row+','+h.col,h.index]));
const directions=[[0,1],[0,-1],[1,0],[1,1],[-1,0],[-1,-1]];
export const JUMPS=HOLES.flatMap(p=>directions.flatMap(([dr,dc])=>{
 const mid=byCell.get((p.row+dr)+','+(p.col+dc));
 const to=byCell.get((p.row+2*dr)+','+(p.col+2*dc));
 return mid===undefined||to===undefined?[]:[{from:p.index,over:mid,to}];
}));
export function initialBoard(empty=0){if(!Number.isInteger(empty)||empty<0||empty>=15)throw Error('Invalid starting hole');return HOLES.map(h=>h.index!==empty);}
export function pegCount(board){return board.reduce((sum,p)=>sum+(p?1:0),0)}
export function legalMoves(board){return JUMPS.filter(m=>board[m.from]&&board[m.over]&&!board[m.to]);}
export function jump(board,move){if(!move||!JUMPS.some(m=>m.from===move.from&&m.over===move.over&&m.to===move.to)||!board[move.from]||!board[move.over]||board[move.to])throw Error('Illegal jump');const next=[...board];next[move.from]=false;next[move.over]=false;next[move.to]=true;return next;}
export function bestSolution(board,goal=1){
 const memo=new Map();
 function dfs(bits){if(memo.has(bits))return memo.get(bits);
 const count=bitCount(bits);let best={remaining:count,atGoal:count===1&&Boolean(bits&(1<<goal)),route:[]};
 if(count===1){memo.set(bits,best);return best;}
 for(const m of JUMPS){const f=1<<m.from,o=1<<m.over,t=1<<m.to;
  if(!(bits&f)||!(bits&o)||(bits&t))continue;
  const res=dfs(bits^f^o^t);
  const candidate={remaining:res.remaining,atGoal:res.atGoal,route:[m,...res.route]};
  if(candidate.remaining<best.remaining||(candidate.remaining===best.remaining&&candidate.atGoal&&!best.atGoal)){best=candidate;if(best.remaining===1&&best.atGoal)break;}
 }
 memo.set(bits,best);return best;
 }
 let bits=0;board.forEach((v,i)=>{if(v)bits|=1<<i});return dfs(bits);
}
function bitCount(bits){let n=0;while(bits){bits&=bits-1;n++}return n;}
export function daySeed(date=new Date()){const y=date.getUTCFullYear(),m=date.getUTCMonth()+1,d=date.getUTCDate();return y*372+m*31+d;}
export function dailyHole(date=new Date()){return [0,3,5,6,9,10,14][daySeed(date)%7]}
export const GAME_CATALOG=[
 {id:'peg-jump',title:'Peg Jump',subtitle:'One peg. Fifteen holes. Endless possibilities.',category:'Logic',level:'Medium',icon:'🎯',available:true},
 {id:'memory-flip',title:'Memory Flip',subtitle:'Match the pairs. Train your recall.',category:'Memory',level:'Easy',icon:'🧠',available:false},
 {id:'number-trail',title:'Number Trail',subtitle:'A clever path through patterns.',category:'Numbers',level:'Medium',icon:'🔢',available:false},
 {id:'colour-shift',title:'Colour Shift',subtitle:'A little colour, a lot of strategy.',category:'Patterns',level:'Hard',icon:'🎨',available:false},
];
