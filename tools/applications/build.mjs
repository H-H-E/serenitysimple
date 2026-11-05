// Five illustrative application scenes. Shared SVG parts and CSS motion only;
// these are conceptual connections, not depictions of deployed equipment.
import {readFileSync,writeFileSync} from 'node:fs';
const unit=`<g class="app-solid"><path d="m20 58 36-18 48 24-36 18Z" class="app-top"/><path d="m20 58 48 24v40l-48-24Z"/><path d="m68 82 36-18v40l-36 18Z" class="app-side"/><path d="m26 68 31 15m-31-8 31 15m-31-8 31 15M75 84v27" class="app-seam"/><circle cx="81" cy="87" r="2" class="app-lamp"/></g>`;
const symbols=`<defs><g id="app-generator">${unit}</g><g id="app-cabinet" class="app-solid"><path d="m0 0 18-9 22 11-18 9Z" class="app-top"/><path d="m0 0 22 11v34L0 34Z"/><path d="m22 11 18-9v34l-18 9Z" class="app-side"/><path d="m5 10 11 5m-11 3 11 5m-11 3 11 5" class="app-seam"/></g></defs>`;
const wire=d=>`<path d="${d}" class="app-wire"/><path d="${d}" class="app-flow" pathLength="1"/>`;
const ground=`<path d="m5 112 114-57 211 104-114 58Z" class="app-ground"/>`;
const sensor=`<use href="#app-cabinet" x="246" y="94"/><path d="M264 85V65m-9-1q9-8 18 0m-22-5q13-12 26 0" class="app-seam"/><circle cx="264" cy="65" r="3" class="app-receive"/>`;
const home=(x,y)=>`<g transform="translate(${x} ${y})" class="app-solid"><path d="m0 11 10-14 30-15 10 24-30 15Z" class="app-top"/><path d="m0 11 20 10v27L0 38Z"/><path d="m20 21 30-15v27L20 48Z" class="app-side"/><path d="m6 23 6 3v8l-6-3Z" class="app-receive"/></g>`;
const rack=(x,y)=>`<g transform="translate(${x} ${y})"><use href="#app-cabinet"/><path d="m5 12 11 5m-11 3 11 5m-11 3 11 5" class="app-seam"/><path d="m5 10 3 1m-3 6 3 1m-3 6 3 1" class="app-receive"/></g>`;
const scenes=[
 ['Field monitoring',`${ground}<use href="#app-generator" x="12" y="8"/>${wire('M116 112 162 135 226 103 246 113')}${sensor}`],
 ['Utilities and microgrids',`${ground}<use href="#app-generator" x="12" y="8"/>${wire('M116 112 156 132 202 109M156 132 199 153 255 125')}${home(195,67)}${home(250,100)}${home(197,126)}`],
 ['Data centres',`${ground}<use href="#app-generator" x="12" y="8"/>${wire('M116 112 164 136 210 113 269 143')}${rack(261,77)}${rack(234,91)}${rack(207,105)}`],
 ['Mining and industry',`${ground}<use href="#app-generator" x="12" y="8"/>${wire('M116 112 163 136 242 96')}<g class="app-seam"><path d="m214 129 24-98 25 12 25 93m-74-7 25 12 49-5M238 31l25 12-24 98m-16-50 49 24m-42-51 35 16M238 31l50 105"/><circle cx="251" cy="43" r="7"/><path d="M251 50v28"/></g><g class="app-lift app-solid"><path d="m241 78 19 9v22l-19-9Z"/><path d="m244 84 12 6v13l-12-6Z" class="app-receive"/></g>`],
 ['Rental power',`${ground}<path d="m24 113 44-22 56 28-44 22Z" class="app-top app-solid"/><use href="#app-generator" x="12" y="13"/><g class="app-seam"><circle cx="40" cy="130" r="9"/><circle cx="108" cy="132" r="9"/><path d="m124 119 30 15 14-7M254 154v-58m-18 67 18-9 18 9"/></g>${wire('M115 120 165 145 210 123 254 145')}<g class="app-solid"><path d="m239 77 17-8 19 10v19l-17 8-19-10Z"/><path d="m243 82 12 6v12l-12-6Z" class="app-receive"/></g>`]
];
let html=readFileSync(new URL('../../index.html',import.meta.url),'utf8');
// Insert symbols once; each scene is otherwise independent of the hero artwork.
const defsStart='<!-- APPLICATION PARTS START -->',defsEnd='<!-- APPLICATION PARTS END -->';
const defs=defsStart+`<svg width="0" height="0" aria-hidden="true" style="position:absolute">${symbols}</svg>`+defsEnd;
if(html.includes(defsStart))html=html.slice(0,html.indexOf(defsStart))+defs+html.slice(html.indexOf(defsEnd)+defsEnd.length);else html=html.replace('<div class="market-list">',defs+'\n <div class="market-list">');
let n=0;html=html.replace(/(<div class="market-body">)(?:<!-- APPLICATION SCENE START -->[\s\S]*?<!-- APPLICATION SCENE END -->)?/g,(_,start)=>{const [name,body]=scenes[n++];return start+`<!-- APPLICATION SCENE START --><figure class="market-motion"><svg viewBox="0 0 340 225" role="img" aria-label="Illustrative ${name.toLowerCase()} connection">${body}</svg><figcaption>Illustrative application concept</figcaption></figure><!-- APPLICATION SCENE END -->`});
if(n!==5)throw Error(`Expected five applications, found ${n}`);
writeFileSync(new URL('../../index.html',import.meta.url),html);console.log('Built five lightweight application scenes');
