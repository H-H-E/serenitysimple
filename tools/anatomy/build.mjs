// Concept: a bench-mounted conceptual demonstrator, with a removable protective
// cover revealing three functions. No dimensions or internal layout are claims.
// Parts: four feet, base, perimeter groove, eight fasteners, two mounting rails,
// six rail clamps, three functional housings, three cover plates, twelve ribs,
// four stack tie bars, eight end blocks, four contact pads, four corner bolts,
// three connector blocks, a cover, two cover catches and a legend plate.
import { readFileSync, writeFileSync } from 'node:fs';
import * as k from './iso-kit.mjs';
const P=k.fitProjection([...k.boxCorners({x:-125,y:-65,w:250,d:130,r:4},-12,0),[-125,-65,105],[125,65,105]],600,390,{pad:32,azimuth:42});
const S=(plan,z,h,tone='mid',bevel=.5)=>k.solidSvg(k.slabOf(plan,z,h,P,1,0),{tone,crease:'faint'});
const L=(d,tone='lo')=>k.lineSvg(d,{tone});
const dot=(points,z)=>k.dotsSvg(points.map(([x,y])=>k.iso([x,y,z],P)),{size:1,tone:'hi'});
const base={x:-120,y:-58,w:240,d:116,r:3};
const parts=[];
// Feet, base, inset edge and mounted rail hardware.
for (const [x,y] of k.corners(base,13)) parts.push(S({x:x-6,y:y-5,w:12,d:10,r:1},-12,5,'lo'));
parts.push(S(base,-7,7));
parts.push(L(k.planOutline(k.insetPlan(base,4),0,P),'lo'));
parts.push(dot(k.corners(base,8),0));
for(const y of [-38,30]) { parts.push(S({x:-102,y,w:204,d:7,r:1},0,4)); for(const x of [-90,-12,70]) parts.push(S({x,y:y-2,w:10,d:11,r:1},4,3,'lo')); }
// Three housings and their machined tops. Ordered back to front in projection.
for(const [x,w,name] of [[-96,47,'gas'],[-35,72,'conversion'],[52,45,'output']]) {
 parts.push(`<g class="anatomy-stage stage-${name}">`);
 parts.push(S({x,y:-27,w,d:52,r:2},4,22,'hi',.8));
 parts.push(S({x:x+2,y:-25,w:w-4,d:48,r:1},26,3,'mid'));
 parts.push(L(k.planOutline({x:x+5,y:-22,w:w-10,d:42,r:1},29,P),'lo'));
 parts.push(dot([[x+5,-22],[x+w-5,-22],[x+5,20],[x+w-5,20]],29));
 parts.push('</g>');
}
// The centre stack sits on its plate, held down by crossbars and end blocks.
for(let i=0;i<8;i++) parts.push(S({x:-28+i*8,y:-20,w:3,d:38,r:0},29,4,'mid',.2));
for(const y of [-23,20]) parts.push(S({x:-31,y,w:64,d:3,r:0},33,3,'hi',.2));
for(const x of [-31,28]) for(const y of [-24,19]) parts.push(S({x,y,w:5,d:5,r:0},36,3,'mid',.2));
// Mounted connection blocks and terminal markings: abstract, no operating claims.
for(const x of [-101,-48,40,97]) parts.push(S({x,y:-9,w:6,d:18,r:1},8,8,'mid'));
for(const x of [-92,-84,-76,-68]) parts.push(S({x,y:-20,w:4,d:24,r:0},29,1,'lo',.1));
for(const x of [57,65,73,81]) parts.push(S({x,y:-20,w:4,d:24,r:0},29,1,'lo',.1));
parts.push(S({x:-43,y:44,w:86,d:7,r:1},0,1,'lo',.2));
parts.push(dot([[-38,47],[38,47]],1));
// An illustrative cover lifts clear, revealing the kit-built demonstrator.
const cover=S({x:-107,y:-42,w:214,d:84,r:3},39,12,'hi',1)+L(k.planOutline({x:-102,y:-37,w:204,d:74,r:2},51,P),'lo')+dot([[-98,-33],[98,-33],[-98,33],[98,33]],51);
const svg=k.figureSvg({width:600,height:390,label:'Conceptual bench-mounted fuel-cell system study. Opening the cover reveals illustrative gas handling, conversion and electrical output stages.',body:[...parts,`<g class="anatomy-cover">${cover}</g>`]});
const htmlPath=new URL('../../index.html',import.meta.url);let html=readFileSync(htmlPath,'utf8');
const start='<!-- ANATOMY FIGURE START -->',end='<!-- ANATOMY FIGURE END -->';
if(!html.includes(start)||!html.includes(end)) throw Error('Figure markers missing');
html=html.slice(0,html.indexOf(start)+start.length)+'\n'+svg+'\n'+html.slice(html.indexOf(end));
writeFileSync(htmlPath,html);
console.log(`Rendered ${parts.length} kit-generated groups and cover into index.html`);
