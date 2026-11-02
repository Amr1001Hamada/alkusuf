const $=s=>document.querySelector(s);
const rice='https://space.rice.edu/eclipse/eclipse_animations.html';
const videos=[
{id:'shadow-bands',title:'أشرطة الظل: تموّجات قبل الكلية',desc:'تسجيل لأشرطة الظل خلال كسوف ٢١ أغسطس ٢٠١٧، مع تعزيز التباين لإبراز الظاهرة.',cat:'real',book:true,page:49,src:'https://upload.wikimedia.org/wikipedia/commons/b/b6/Shadow_bands_from_solar_eclipse_2017-08-21_gamma_0.2.webm',source:'https://commons.wikimedia.org/wiki/File:Shadow_bands_from_solar_eclipse_2017-08-21_gamma_0.2.webm',credit:'Rkinch / Wikimedia Commons — CC BY-SA 3.0',poster:'assets/shadow.jpg'},
{id:'liwa',title:'حلقة النار فوق صحراء ليوا',desc:'المراحل الحلقية للكسوف في ليوا، أبوظبي، في ٢٦ ديسمبر ٢٠١٩.',cat:'real',book:true,page:127,src:'https://upload.wikimedia.org/wikipedia/commons/d/d2/2019-12-26_Annular_Solar_Eclipse%2C_Liwa%2C_Abu_Dhabi%2C_UAE.webm',source:'https://commons.wikimedia.org/wiki/File:2019-12-26_Annular_Solar_Eclipse,_Liwa,_Abu_Dhabi,_UAE.webm',credit:'Kamranki / Wikimedia Commons — CC BY-SA 4.0',poster:'assets/liwa.jpg'},
{id:'beads-nasa',title:'حبيبات بيلي: ضوء بين جبال القمر',desc:'محاكاة NASA للمرحلة الحلقية المتقطعة من الكسوف الهجين في ٨ أبريل ٢٠٠٥.',cat:'sim',src:'assets/beads.mp4',source:'https://svs.gsfc.nasa.gov/5365/',credit:'NASA’s Scientific Visualization Studio / Ernie Wright',poster:'assets/beads.jpg'},
...[
['geometry','otq1uNBGAik','كيف يحدث الكسوف؟','هندسة الشمس والأرض والقمر في محاكاة تعليمية.'],
['earth','LCQz7m-yVMA','من الهلال إلى الكلية','مشهد محاكى للكسوف من الأرض، يتضمن الخاتم الماسي.'],
['orbit','m50Td6yl8Qg','ظل القمر من الفضاء','رحلة ظل القمر فوق سطح الأرض كما قد تبدو من المدار.'],
['baily','ZerlU1fIoyQ','حبيبات بيلي عن قرب','مشهد توضيحي للضوء قبل بداية الكلية.'],
['annular','PI8Ayp7mKC0','لماذا يبقى خاتم مضيء؟','هندسة الكسوف الحلقي عندما لا يصل مخروط الظل إلى الأرض.'],
['annular-close','PS0QurWI6XY','الكسوف الحلقي عبر المرشح','محاكاة للمشهد المرشح مع مرور السحب.'],
['filtered','WtDpCF9dF28','حلقة الشمس في سماء سوداء','محاكاة للكسوف الحلقي عبر مرشح شمسي.'],
['moon-view','b7XCfPZ7llw','الكسوف من سطح القمر','محاكاة للأرض وظل القمر عليها من منظور قمري.']
].map(([id,yt,title,desc])=>({id,yt,title,desc,cat:'sim',source:rice,credit:'Don Davis / Rice University — مادة تعليمية مكملة',poster:`https://i.ytimg.com/vi/${yt}/hqdefault.jpg`}))
];
let filter='all';function render(){let term=$('#search').value.trim();let list=videos.filter(v=>(filter==='all'||filter==='book'&&v.book||v.cat===filter)&&`${v.title} ${v.desc}`.includes(term));$('#count').textContent=`${list.length} مقطعًا`;$('#videoGrid').innerHTML=list.length?list.map(v=>`<article class="video-card"><button class="thumb" data-video="${v.id}" aria-label="تشغيل ${v.title}">${v.yt?`<span class="illustration"><i class="disc"></i><small>رسم توضيحي · ${v.title}</small></span>`:`<img src="${v.poster}" alt="${v.title}" loading="lazy">`}<span class="play">▶</span></button><span class="tag">${v.book?'من مراجع الكتاب · ص '+v.page:v.cat==='sim'?'محاكاة تعليمية · مادة مكملة':'رصد حقيقي'}</span><h3>${v.title}</h3><p>${v.desc}</p><a class="source" href="${v.source}" target="_blank" rel="noopener">${v.credit} ↗</a></article>`).join(''):'<p>لا توجد نتائج. جرّب «الظل» أو «الحلقي».</p>';document.querySelectorAll('[data-video]').forEach(b=>b.onclick=()=>play(b.dataset.video));}
function play(id){let v=videos.find(v=>v.id===id);if(!v)return;$('#media').innerHTML=v.yt?`<iframe title="${v.title}" src="https://www.youtube-nocookie.com/embed/${v.yt}?rel=0" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>`:`<video controls playsinline preload="metadata" poster="${v.poster}" src="${v.src}"></video>`;$('#videoTitle').textContent=v.title;$('#videoDescription').textContent=v.desc;$('#videoCredit').textContent=v.credit;if(v.book){const a=document.createElement('a');a.href='https://creativecommons.org/licenses/by-sa/'+(v.id==='shadow-bands'?'3.0':'4.0')+'/';a.target='_blank';a.rel='noopener';a.textContent=' · شروط الترخيص';$('#videoCredit').append(a);const note=document.createElement('span');note.textContent=' · الصورة المصغرة مقتطف من النسخة المرفقة؛ تجميع إطارات ليوا بواسطة مؤلف الكتاب.';$('#videoCredit').append(note);}$('#videoSource').href=v.yt?`https://www.youtube.com/watch?v=${v.yt}`:v.source;$('#player').showModal();history.replaceState(null,'','#video-'+v.id)}
$('#player .close').onclick=()=>$('#player').close();$('#player').addEventListener('close',()=>{$('#media').innerHTML='';history.replaceState(null,'','#videos')});$('#player').addEventListener('click',e=>{if(e.target===$('#player'))$('#player').close()});document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));render()});$('#search').addEventListener('input',render);render();if(location.hash.startsWith('#video-'))play(location.hash.slice(7));

// Illustrative corona: rendered behind both disks, only during complete coverage.
function coronaMarkup(id,cx,cy,r){
 const rays=Array.from({length:32},(_,i)=>{
  const a=i*11.25, length=175+35*Math.cos(i*1.7);
  return `<path d="M -8 -94 C -16 -125 -10 -150 0 -${length} C 6 -151 14 -119 8 -94 Z" transform="rotate(${a})" fill="url(#${id}-ray)" filter="url(#${id}-soft)" opacity="${.28+(i%3)*.1}"/>`;
 }).join('');
 return `<g aria-hidden="true" pointer-events="none" transform="translate(${cx} ${cy}) scale(${r/100})"><defs><radialGradient id="${id}-halo"><stop offset="0.43" stop-color="#fff"/><stop offset="0.49" stop-color="#f1f6ff" stop-opacity=".95"/><stop offset="0.57" stop-color="#ddeaff" stop-opacity=".42"/><stop offset="0.75" stop-color="#b8d0ed" stop-opacity=".12"/><stop offset="1" stop-color="#aac8ed" stop-opacity="0"/></radialGradient><radialGradient id="${id}-ray" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="220"><stop offset=".4" stop-color="#fff" stop-opacity=".9"/><stop offset=".6" stop-color="#e5efff" stop-opacity=".5"/><stop offset="1" stop-color="#c9dcff" stop-opacity="0"/></radialGradient><filter id="${id}-soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter></defs><ellipse rx="225" ry="180" fill="url(#${id}-halo)"/>${rays}<circle r="101" fill="none" stroke="#f6f8ff" stroke-width="4" opacity=".85"/></g>`;
}
function hasCorona(s){return s.visible&&s.distance<=s.moon-s.sun;}
const coronaStyle=document.createElement('style');
coronaStyle.textContent='.sim-corona{position:absolute;width:320px;height:320px;pointer-events:none;visibility:hidden}.sim-sun{position:relative}.simulation.corona-visible .sim-sun{box-shadow:none}.simulation.corona-visible #moon{background:#080d12}.corona-note{font-size:12px;line-height:1.8;color:var(--muted)}';
document.head.append(coronaStyle);
const simCorona=document.createElementNS('http://www.w3.org/2000/svg','svg');
simCorona.setAttribute('viewBox','0 0 320 320');simCorona.setAttribute('class','sim-corona');simCorona.setAttribute('aria-hidden','true');
simCorona.innerHTML=coronaMarkup('demo-corona',160,160,70);
$('.simulation').insertBefore(simCorona,$('.sim-sun'));
const localCorona=document.createElementNS('http://www.w3.org/2000/svg','g');
localCorona.id='localCorona';localCorona.setAttribute('visibility','hidden');
localCorona.innerHTML=coronaMarkup('local-corona',180,160,72);
$('#localMoon').parentNode.insertBefore(localCorona,$('#localMoon').previousElementSibling);
$('.local-visual .small').textContent='مقطع هندسي محسوب للقرصين، وليس صورة فوتوغرافية. لا يصوّر التضاريس على حافة القمر. المشهد عند ذروة الرؤية افتراضيًا.';
for(const target of [$('.experiment .small'),$('.local-visual')]){
 const note=document.createElement('p');note.className='corona-note';note.textContent='الهالة الشمسية رسم تعليمي يظهر أثناء الكلية فقط، وليس توقعًا لشكلها الفعلي يوم الكسوف.';target.matches('.small')?target.insertAdjacentElement('afterend',note):target.append(note);
}
$('#phase').oninput=e=>{const value=+e.target.value,offset=(value-50)*3.8,total=Math.abs(offset)<=3;$('#moon').style.transform=`translateX(${offset}px)`;simCorona.style.visibility=total?'visible':'hidden';$('.simulation').classList.toggle('corona-visible',total);$('#phaseLabel').textContent=total?'كسوف كلي · الهالة الشمسية':Math.abs(offset)>=143?'قبل التداخل أو بعده':'كسوف جزئي';$('.simulation').setAttribute('aria-label',total?'كسوف كلي تظهر فيه الهالة الشمسية حول قرص القمر':'رسم تفاعلي لحجب القمر لقرص الشمس')};$('#phase').dispatchEvent(new Event('input'));
let map,band,line,partialLayer,marker,rows=[],request=0,events=null,current=null;
let selected={lat:25.687,lon:32.639,name:'الأقصر · مصر'};
const arNum=(v,d=1)=>v.toLocaleString('ar-EG',{maximumFractionDigits:d,minimumFractionDigits:d});
function eclipseType(s){if(s.magnitude<=0)return 'لا يوجد تداخل';if(s.distance<=s.moon-s.sun)return 'كسوف كلي';if(s.distance<=s.sun-s.moon)return 'كسوف حلقي';return 'كسوف جزئي';}
function direction(s){const q=$('#orientation').value==='zenith'?s.parallactic:0;return {x:-(s.u*Math.cos(q)-s.v*Math.sin(q))/s.sun*72,y:-(s.u*Math.sin(q)+s.v*Math.cos(q))/s.sun*72,r:s.moon/s.sun*72};}
function showTime(){if(!current)return;const e=current.info.elements,t=+$('#localTime').value,s=Eclipse.state(e,t,current.result.observer),p=direction(s);$('#localMoon').setAttribute('cx',180+p.x);$('#localMoon').setAttribute('cy',160+p.y);$('#localMoon').setAttribute('r',p.r);localCorona.setAttribute('visibility',hasCorona(s)?'visible':'hidden');$('#localMoon').setAttribute('fill',hasCorona(s)?'#080d12':'#17251f');const zenith=$('#orientation').value==='zenith';$('#skyUp').textContent=zenith?'سمت الرأس ↑':'شمال سماوي ↑';$('#skyEast').textContent=zenith?'':'شرق';$('#skyStatus').textContent=!s.visible?'الشمس تحت الأفق — غير مرئي':s.magnitude<=0?'لا تداخل بين القرصين':eclipseType(s);$('#selectedTime').textContent=Eclipse.time(e,t)+' UTC';$('#currentStats').textContent=`في الوقت المختار: حجب ${arNum(Eclipse.obscuration(s)*100)}٪ · ارتفاع الشمس ${arNum(s.altitude)}°${s.visible?'':' · المشهد الهندسي غير مرئي من هذا الموقع'}`;$('#localSky').setAttribute('aria-label',`${eclipseType(s)}، حجب ${arNum(Eclipse.obscuration(s)*100)} بالمئة، ${s.visible?'الشمس فوق الأفق':'الشمس تحت الأفق'}`);}
function setLocation(lat,lon,name='',popup=false){
 if(!events||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return;
 selected={lat,lon,name};if(!name)$('#city').value='';const info=events[$('#event').value],e=info.elements,result=Eclipse.local(e,lat,lon);current={info,result};const max=result.maximum;
 $('#latitude').value=lat.toFixed(4);$('#longitude').value=lon.toFixed(4);$('#locationName').textContent=name||'الموقع المختار';$('#localType').textContent=result.hasVisible?eclipseType(max):'لا يُرى الكسوف هنا';$('#localMaximum').textContent=result.hasVisible?Eclipse.time(e,max.t):'—';$('#localCoverage').textContent=result.hasVisible?arNum(Eclipse.obscuration(max)*100)+'٪':'٠٪';$('#localAltitude').textContent=result.hasVisible?arNum(max.altitude)+'°':'—';
 let duration=null;if(result.c2!==null&&result.c3!==null&&result.hasVisible&&max.distance<=max.moon-max.sun){const start=Eclipse.state(e,result.c2,result.observer),end=Eclipse.state(e,result.c3,result.observer);if(start.visible&&end.visible)duration=(result.c3-result.c2)*3600;}
 $('#localTotality').textContent=duration!==null?`${Math.floor(duration/60)}د ${Math.round(duration%60)}ث`:result.hasVisible&&eclipseType(max)==='كسوف كلي'?'كلية قرب الأفق':'—';
 $('#visibilityNote').textContent=!result.hasVisible?(result.hasEclipse?'يحدث تداخل هندسي بينما الشمس تحت الأفق، لذلك لا يُرى الكسوف من هذا الموقع. الرسم يعرض ذلك التداخل غير المرئي.':'لا يحدث تداخل مرئي للقرصين في هذا الموقع خلال الكسوف المحدد. الرسم يعرض أقرب تقارب في فترة الحساب.'):(max.altitude<1?'ذروة الرؤية عند الأفق تقريبًا؛ يتأثر المشهد بشدة بالتضاريس والانكسار الجوي.':'الرسم مضبوط على ذروة الكسوف المرئي في هذه النقطة. استخدم شريط الزمن لمشاهدة المراحل.');
 $('#localTime').min=result.c1===null?-3:Math.max(-3,result.c1-.08);$('#localTime').max=result.c4===null?3:Math.min(3,result.c4+.08);$('#localTime').value=max.t;
 const stages=[['بداية الجزئي',result.c1],['بداية الكلية',result.c2],[result.hasVisible?'ذروة الرؤية':'أقرب تقارب',max.t],['نهاية الكلية',result.c3],['نهاية الجزئي',result.c4]].filter(x=>x[1]!==null);
 $('#contactButtons').replaceChildren(...stages.map(([label,t])=>{const b=document.createElement('button');b.type='button';b.textContent=label;let s=Eclipse.state(e,t,result.observer);b.title=Eclipse.time(e,t)+' UTC'+(s.visible?'':' · تحت الأفق');b.onclick=()=>{$('#localTime').value=t;showTime()};return b}));showTime();
 if(marker)map.removeLayer(marker);marker=L.circleMarker([lat,lon],{radius:6,color:'#284d41',fillColor:'#fff',weight:3,fillOpacity:1}).addTo(map);
 const dx=-max.u/max.sun*36,dy=-max.v/max.sun*36,r=max.moon/max.sun*36;
 marker.bindPopup(`<div class="location-popup"><strong>${name||`${lat.toFixed(3)}°, ${lon.toFixed(3)}°`}</strong><svg viewBox="0 0 180 150" aria-label="الشمس والقمر عند ذروة الكسوف، الشمال أعلى والشرق يسار"><rect width="180" height="150" rx="8" fill="#17251f"/>${hasCorona(max)?coronaMarkup('popup-corona',90,75,36):''}<circle cx="90" cy="75" r="36" fill="#ffdf8e"/><circle cx="${90+dx}" cy="${75+dy}" r="${r}" fill="#17251f"/><text x="90" y="17" text-anchor="middle" fill="#e9d9ae" font-size="10">شمال سماوي ↑</text></svg><b>${result.hasVisible?eclipseType(max):'غير مرئي'}</b><br>${result.hasVisible?'حجب '+arNum(Eclipse.obscuration(max)*100)+'٪ · ':''}${Eclipse.time(e,max.t)} UTC<br><a href="#localExplorer">المراحل والتفاصيل ↓</a></div>`);if(popup)marker.openPopup();
}
if(typeof L!=='undefined'){
 map=L.map('map',{scrollWheelZoom:false,minZoom:1,maxZoom:19,maxBounds:[[-85,-180],[85,180]]}).setView([29,20],3);
 map.createPane('streets');map.getPane('streets').style.zIndex=260;map.getPane('streets').style.pointerEvents='none';
 map.createPane('geography');map.getPane('geography').style.zIndex=250;map.createPane('partial');map.getPane('partial').style.zIndex=300;
 fetch('countries.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>L.geoJSON(data,{pane:'geography',style:{color:'#bec4b4',weight:1,fillColor:'#f1f0e6',fillOpacity:1},onEachFeature:(f,l)=>l.bindTooltip(f.properties.name)}).addTo(map)).catch(()=>{$('#mapTitle').textContent='تعذر تحميل حدود الدول';});
 map.attributionControl.addAttribution('<a href="https://www.naturalearthdata.com/about/terms-of-use/">Natural Earth</a> · NASA GSFC');
 const labels=[['فلسطين',31.7,35.1],['المغرب',32,-7],['الجزائر',29,2],['ليبيا',27,18],['مصر',27,30],['السعودية',23,45],['اليمن',15,46],['السودان',16,30],['إسبانيا',40,-4],['تونس',34,9],['الصومال',7,47]];
 labels.forEach(([name,lat,lon])=>L.marker([lat,lon],{icon:L.divIcon({className:'country-label'+(name==='فلسطين'?' palestine-label':''),html:name,iconSize:[70,20]}),interactive:false}).addTo(map));

 // Detailed vector basemap; label styling is local to this website.
 const mapNotice=document.createElement('p');mapNotice.className='small';mapNotice.setAttribute('role','status');mapNotice.textContent='جارٍ تحميل خريطة الشوارع والمدن…';$('.map-sidebar').append(mapNotice);
 const mapLabelNote=document.createElement('p');mapLabelNote.className='small';mapLabelNote.textContent='تسميات الدول مخصّصة لهذا الموقع. كبّر لرؤية المدن والبلدات والطرق؛ التفاصيل بحسب البيانات المتاحة.';$('.map-sidebar').append(mapLabelNote);
 function script(url){return new Promise((resolve,reject)=>{const el=document.createElement('script');el.src=url;el.onload=resolve;el.onerror=reject;document.head.append(el);});}
 async function detailedMap(){
  try{
   const css=document.createElement('link');css.rel='stylesheet';css.href='https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.css';document.head.append(css);
   await script('https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.js');
   await script('https://cdn.jsdelivr.net/npm/@maplibre/maplibre-gl-leaflet@0.1.3/leaflet-maplibre-gl.js');
   maplibregl.setRTLTextPlugin('https://cdn.jsdelivr.net/npm/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js',true);
   const response=await fetch('https://tiles.openfreemap.org/styles/liberty');if(!response.ok)throw Error('style');
   const style=await response.json();
   const customCountry=['any',['match',['get','iso_a2'],['IL','PS'],true,false],['match',['coalesce',['get','name:en'],['get','name_en'],['get','name:latin'],['get','name'],''],['Israel','Palestine','ישראל','إسرائيل','فلسطين'],true,false]];
   for(const layer of style.layers){
    if(layer.id.startsWith('label_country'))layer.filter=['all',layer.filter,['!',customCountry]];
    if(layer.layout&&layer.layout['text-field']&&!layer.id.includes('shield')){
     layer.layout['text-field']=['coalesce',['get','name:ar'],['get','name:en'],['get','name_en'],['get','name:latin'],['get','name'],''];
    }
   }
   const streets=L.maplibreGL({style,pane:'streets',interactive:false,attribution:'<a href="https://openfreemap.org/">OpenFreeMap</a> · <a href="https://openmaptiles.org/">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
   const gl=streets.getMaplibreMap();
   gl.on('load',()=>{map.getContainer().classList.add('streets-ready');mapNotice.textContent='خريطة الشوارع والمدن · كبّر باستخدام + أو بإصبعين';});
   gl.on('error',()=>{mapNotice.textContent='قد تتأخر بعض تفاصيل الشوارع بسبب الاتصال. خريطة الكسوف ما زالت متاحة.';});
  }catch(error){console.error('Street map loading:',error);mapNotice.textContent=/WebGL/i.test(String(error))?'تفاصيل الشوارع تحتاج دعم WebGL في المتصفح. الخريطة العامة وحسابات الكسوف متاحة.':'تعذر تحميل تفاصيل الشوارع الآن؛ الخريطة العامة وحسابات الكسوف متاحة. أعد تحميل الصفحة للمحاولة.';}
 }
 const detailStyle=document.createElement('style');detailStyle.textContent='#map.streets-ready .country-label:not(.palestine-label){display:none}#map.street-close .country-label{display:none}';document.head.append(detailStyle);
 map.on('zoomend',()=>map.getContainer().classList.toggle('street-close',map.getZoom()>8));
 detailedMap();

 function sync(){if(!band)return;$('#partial').checked?partialLayer.addTo(map):map.removeLayer(partialLayer);$('#band').checked?band.addTo(map):map.removeLayer(band);$('#center').checked?line.addTo(map):map.removeLayer(line);}
 async function loadMap(){let req=++request,year=$('#event').value;$('#mapTitle').textContent='جارٍ تحميل الخريطة…';try{
 const [data,partial,elementData]=await Promise.all([fetch(`path${year}.json`).then(r=>r.json()),fetch(`partial${year}.json`).then(r=>r.json()),events||fetch('elements.json').then(r=>r.json())]);if(req!==request)return;events=elementData;rows=data;
 [band,line,partialLayer].forEach(x=>{if(x)map.removeLayer(x)});
 partialLayer=L.geoJSON(partial.features[0],{pane:'partial',interactive:false,style:{color:'#c1a66a',weight:1,fillColor:'#dcb86b',fillOpacity:.25}});
 band=L.polygon([...rows.map(r=>r.n),...rows.map(r=>r.s).reverse()],{interactive:false,color:'#9b702c',weight:1,fillColor:'#ac7b30',fillOpacity:.55});line=L.polyline(rows.map(r=>r.c),{interactive:false,color:'#765622',weight:1.5});sync();
 $('#mapTitle').textContent=`كسوف ${year==='2027'?'٢٠٢٧':'٢٠٣٤'}`;$('#mapSource').href=events[year].source;map.fitBounds(partialLayer.getBounds(),{padding:[15,15],animate:false});setLocation(selected.lat,selected.lon,selected.name);
 }catch(error){$('#mapTitle').textContent='تعذر تحميل الحسابات؛ أعد تحميل الصفحة';$('#localType').textContent='غير متاح الآن';}}
 map.on('click',e=>{const p=e.latlng.wrap();setLocation(p.lat,p.lng,'',true)});
 $('#event').onchange=loadMap;$('#partial').onchange=sync;$('#band').onchange=sync;$('#center').onchange=sync;$('#fit').onclick=()=>{map.closePopup();if(partialLayer)map.fitBounds(partialLayer.getBounds(),{padding:[15,15],animate:false})};
 $('#city').onchange=()=>{let [lat,lon]=$('#city').value.split(',').map(Number);setLocation(lat,lon,$('#city').selectedOptions[0].textContent,true);map.setView([lat,lon],5,{animate:false})};
 $('#coordinates').onsubmit=e=>{e.preventDefault();const lat=Number($('#latitude').value),lon=Number($('#longitude').value);setLocation(lat,lon,'',true);map.setView([lat,lon],5,{animate:false})};
 $('#localTime').oninput=showTime;$('#orientation').onchange=showTime;loadMap();
}else{$('#map').innerHTML='<p style="padding:40px">تعذر تحميل الخريطة. <a href="https://eclipse.gsfc.nasa.gov/SEgoogle/SEgoogle2001/SE2027Aug02Tgoogle.html">افتح خريطة NASA</a></p>'}
