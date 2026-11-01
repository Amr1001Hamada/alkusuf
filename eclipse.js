/* Local eclipse geometry, independently implemented from Bessel's fundamental-plane
   equations. Numerical extremum/contact finding is used instead of a copied
   eclipse-calculator implementation. Data: Fred Espenak, NASA GSFC.
   Times are hours from the reference TDT epoch; UTC = t0+t-DeltaT/3600.
   Smooth lunar limb, sea-level ellipsoid. No terrain or weather modelling. */
(function(root){
'use strict';
const RAD=Math.PI/180, FLATTENING=0.99664719, HORIZON=-0.833;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function observer(lat,lon){const phi=lat*RAD,beta=Math.atan(FLATTENING*Math.tan(phi));return {lat,lon,phi,sin:Math.sin(phi),cos:Math.cos(phi),z:FLATTENING*Math.sin(beta),r:Math.cos(beta)};}
function poly(a,i,n,t){let r=a[i+n-1];for(let j=n-2;j>=0;j--)r=r*t+a[i+j];return r;}
function state(e,t,o){
 const decl=poly(e,13,3,t)*RAD,h=poly(e,16,3,t)*RAD+o.lon*RAD-e[4]/13713.44;
 const sd=Math.sin(decl),cd=Math.cos(decl),sh=Math.sin(h),ch=Math.cos(h);
 const sightDepth=o.z*sd+o.r*ch*cd;
 const u=poly(e,5,4,t)-o.r*sh, v=poly(e,9,4,t)-(o.z*cd-o.r*ch*sd);
 const pen=poly(e,19,3,t)-sightDepth*e[25],umb=poly(e,22,3,t)-sightDepth*e[26];
 const sun=(pen+umb)/2,moon=(pen-umb)/2,distance=Math.hypot(u,v);
 const altitude=Math.asin(clamp(o.sin*sd+o.cos*cd*ch,-1,1))/RAD;
 const parallactic=Math.atan2(sh,Math.tan(o.phi)*cd-sd*ch);
 return {t,u,v,sun,moon,distance,pen,umb,altitude,parallactic,magnitude:(pen-distance)/(2*sun),visible:altitude>=HORIZON};
}
function obscuration(s){const a=s.sun,b=s.moon,d=s.distance;if(d>=a+b)return 0;if(d<=Math.abs(a-b))return Math.min(1,b*b/(a*a));const x=clamp((d*d+a*a-b*b)/(2*d*a),-1,1),y=clamp((d*d+b*b-a*a)/(2*d*b),-1,1);const lens=a*a*Math.acos(x)+b*b*Math.acos(y)-.5*Math.sqrt(Math.max(0,(-d+a+b)*(d+a-b)*(d-a+b)*(d+a+b)));return clamp(lens/(Math.PI*a*a),0,1);}
// Bounded numerical maximization; smooth on the short bracket selected by scan.
function maximize(fn,lo,hi,iterations=34){const g=(Math.sqrt(5)-1)/2;let a=hi-g*(hi-lo),b=lo+g*(hi-lo),fa=fn(a),fb=fn(b);for(let i=0;i<iterations;i++){if(fa<fb){lo=a;a=b;fa=fb;b=lo+g*(hi-lo);fb=fn(b);}else{hi=b;b=a;fb=fa;a=hi-g*(hi-lo);fa=fn(a);}}return (lo+hi)/2;}
function rootBetween(fn,a,b){let fa=fn(a);for(let i=0;i<38;i++){let m=(a+b)/2,fm=fn(m);if(fa*fm<=0)b=m;else{a=m;fa=fm;}}return (a+b)/2;}
function peak(e,o,visibleOnly=true,fast=false){
 // Explicitly bracket horizon crossings so a maximum at sunrise/set is retained.
 let best=null,previous=state(e,-3,o);const step=.25;
 const candidates=[];if(!visibleOnly||previous.visible)candidates.push(previous);
 for(let i=1;i<=24;i++){let current=state(e,-3+i*step,o);if(!visibleOnly||current.visible)candidates.push(current);if(visibleOnly&&current.visible!==previous.visible){let t=rootBetween(t=>state(e,t,o).altitude-HORIZON,previous.t,current.t);candidates.push(state(e,t,o));}previous=current;}
 for(let s of candidates)if(!best||s.magnitude>best.magnitude)best=s;
 if(!best)return null;
 let lo=Math.max(-3,best.t-step),hi=Math.min(3,best.t+step);
 const objective=t=>{let s=state(e,t,o);return visibleOnly&&s.altitude<HORIZON-1e-8?-100:s.magnitude;};
 let t=maximize(objective,lo,hi,fast?20:36),fine=state(e,t,o);if(fine.magnitude>best.magnitude&&(!visibleOnly||fine.visible))best=fine;
 return best;
}
function contactPair(e,o,maximum,internal){
 const fn=t=>{let s=state(e,t,o);return s.distance-(internal?Math.abs(s.umb):s.pen);};
 if(fn(maximum.t)>0)return [null,null];
 function seek(sign){let prev=maximum.t;for(let k=1;k<=120;k++){let t=clamp(maximum.t+sign*k*.05,-3,3);if(fn(t)>=0)return rootBetween(fn,Math.min(t,prev),Math.max(t,prev));if(t===-3||t===3)break;prev=t;}return null;}
 return [seek(-1),seek(1)];
}
function local(e,lat,lon){
 const o=observer(lat,lon),geometric=peak(e,o,false),visible=peak(e,o,true);const hasEclipse=geometric.magnitude>0,hasVisible=!!visible&&visible.magnitude>0;
 let c1=null,c2=null,c3=null,c4=null;if(hasEclipse){[c1,c4]=contactPair(e,o,geometric,false);if(geometric.distance<=Math.abs(geometric.umb))[c2,c3]=contactPair(e,o,geometric,true);}
 return {observer:o,geometric,visible,hasEclipse,hasVisible,c1,c2,c3,c4,maximum:hasVisible?visible:geometric};
}
function time(e,t){let seconds=Math.round((e[1]+t-e[4]/3600)*3600);seconds=((seconds%86400)+86400)%86400;return [Math.floor(seconds/3600),Math.floor(seconds/60)%60,seconds%60].map(n=>String(n).padStart(2,'0')).join(':');}
const api={observer,state,obscuration,peak,local,time,HORIZON};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Eclipse=api;
})(typeof globalThis!=='undefined'?globalThis:this);
