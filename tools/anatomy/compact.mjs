// Lossless SVG command compaction; generated geometry uses tenths of a unit.
export function compactPaths(svg){return svg.replace(/\bd="([^"]+)"/g,(attribute,path)=>{
 const tokens=path.match(/[MLZ]|-?\d*\.?\d+/g)||[];
 if(tokens.join('')!==path.replace(/ /g,'')||tokens.some(t=>/\.\d{2}/.test(t)))return attribute;
 let x=0,y=0,start=[0,0],command='',out='';const fmt=n=>String(n/10).replace(/^(-?)0\./,'$1.');
 for(let i=0;i<tokens.length;){const c=tokens[i++];if(c==='Z'){out+='z';[x,y]=start;command='z';continue}if(c!=='M'&&c!=='L')return attribute;
  const nx=Math.round(Number(tokens[i++])*10),ny=Math.round(Number(tokens[i++])*10);
  if(c==='M'){out+='M'+fmt(nx)+' '+fmt(ny);start=[nx,ny];command='M'}else{
   const options=[['l',fmt(nx-x)+' '+fmt(ny-y)],['L',fmt(nx)+' '+fmt(ny)]];
   if(nx===x)options.push(['v',fmt(ny-y)]);if(ny===y)options.push(['h',fmt(nx-x)]);
   const cost=([c,v])=>v.length+(c===command&&command!=='M'?0:1);options.sort((a,b)=>cost(a)-cost(b));
   const [next,value]=options[0];out+=(next===command&&command!=='M'?' ':next)+value;command=next;
  }x=nx;y=ny;
 }return 'd="'+out+'"';
})}
