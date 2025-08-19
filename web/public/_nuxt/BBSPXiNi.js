import{r as xe,_ as V,v as r,o as A,c as W,a as B,F as fe,p as me,R as Q,s as ne,t as K,j as S,A as Pe,g as ee,w as N,i as wt,U as Ct,J as H,b as He,L as We,H as St,k as L,l as ke,q as h,V as ot,K as Ae,Q as pe,h as Pt,W as rt,X as Qe,y as Te}from"./DPLBeim1.js";import{u as kt}from"./CTD0GRTa.js";import{p as Re}from"./BqbHwPfs.js";import{d as At}from"./C5x6R2a_.js";import{T as Oe,i as ve,u as he,c as ge,S as Ue,_ as Mt,A as Tt,L as Rt,d as Se,a as je,e as It,f as Bt,g as zt,H as Lt,b as Ee,F as Et}from"./BGfcuG2n.js";import{m as De,_ as Ye,v as Ot,B as Ge,L as Dt,A as Ne,f as Ft,a as nt}from"./BQjU4dwZ.js";import{u as te,c as $,E as Ve}from"./CENEsQq1.js";import{l as we}from"./BdT36_8W.js";import{O as Wt,j as Ie,c as Gt,M as Nt,e as st,f as ye,P as $t,I as Ut,g as jt,S as Jt,h as Ht,i as Yt,l as Vt,t as it}from"./s5kuwhN6.js";import{_ as lt}from"./CAExIIT3.js";import{r as re}from"./vxidHdmP.js";import{d as Zt,L as Xt,n as qt}from"./EJcA7ZIo.js";import{I as Ze}from"./B-tuEXrK.js";import{r as Kt}from"./BBmyyArJ.js";const Qt={__name:"BaseThreeObject",props:{name:{default:"Three Object"},...Wt()},setup(o,{expose:n}){const e=o,{object:t}=Ie(null,{name:e.name,props:e});return n({object:t}),(a,u)=>xe(a.$slots,"default")}},ea=o=>Zt(qt,{add:n=>{const e=new Xt(o);return n&&n.addLoader(e),e},remove:(n,e)=>{if(e){n.dispose();const t=e.loaders.indexOf(n);e.loaders.splice(t,1),n.setParent(null)}}}).current,ta=(o,n=()=>{})=>{const e=ea(o);return e.once(Gt.LOAD_COMPLETE,n),e},aa={__name:"Descriptions",props:{descriptions:{type:Array,required:!0},active:{default:!0}},setup(o,{expose:n}){const e=o,t=r([]),a=r(0),u=r(!1);return n({setProgress:l=>{const{length:s}=e.descriptions;u.value=ve(l,0,1),l>0&&l<1?a.value=Math.floor(l*s):a.value=-1;const i=l*s;t.value.forEach((b,p)=>{const f=De(i,p,p+1,0,1,!0);b.setProgress(f)})}}),(l,s)=>(A(),W("div",{class:ne(["descriptions",{visible:u.value}])},[s[0]||(s[0]=B("div",{class:"descriptions__bg"},null,-1)),(A(!0),W(fe,null,me(o.descriptions,(i,b)=>(A(),Q(Oe,{ref_for:!0,ref_key:"refBlocks",ref:t,class:"descriptions__block textBodyS",key:b,text:i,index:b,active:o.active&&a.value===b},null,8,["text","index","active"]))),128))],2))}},oa=V(aa,[["__scopeId","data-v-3bd70583"]]),ra={__name:"IntroTitle",props:{title:{default:{line1:"",line2:""}}},setup(o,{expose:n}){const e=r(null),t=r(null),a=r(null),u=te();return n({show:({delay1:l=1.5,delay2:s=0,delay3:i=0,skipIntro:b=!1}={})=>{const f="power2.inOut",P=[t.value,a.value];b&&(S.set(P,{x:0,alpha:0}),S.set(e.value,{alpha:1}));const k=S.timeline({delay:l});k.fromTo(e.value,{alpha:0,scale:.8},{alpha:1,scale:1,duration:1.5,ease:"power3.inOut"},0),u.value?k.to(t.value,{y:"-30vh",duration:1.5,ease:f},s).to(a.value,{y:"28vh",duration:1.5,ease:f},s).to(P,{alpha:0,duration:.5,ease:f},i):k.to(t.value,{x:"-41vh",duration:1.5,ease:f},s).to(a.value,{x:"50vh",duration:1.5,ease:f},s).to(P,{alpha:0,duration:.5,ease:f},i)}}),(l,s)=>(A(),W("h1",{ref_key:"refRoot",ref:e,class:"introTitle textH1"},[B("span",{ref_key:"refLine1",ref:t,class:"introTitle__text line1"},K(o.title.line1),513),B("span",{ref_key:"refLine2",ref:a,class:"introTitle__text line2"},K(o.title.line2),513)],512))}},na=V(ra,[["__scopeId","data-v-a08bbc90"]]),sa=["theme"],ia={class:"timelineBar__lineWrapper"},la={class:"timelineBar__line"},ca={__name:"TimelineBar",props:{minYear:{default:1669},maxYear:{default:1944},theme:{default:"dark"}},setup(o,{expose:n}){const e=o,t=[{pr:0,year:e.minYear},{pr:.169,year:1700},{pr:.33,year:1864},{pr:.419,year:1936},{pr:.585,year:1940},{pr:.91,year:e.maxYear}],a=r(0),u=r(0),c=r(0),l=r(),s=r(),i=r(),b=r(),p=Pe([]),f=r("");ee(()=>{T(0)});const P=({delay:v=0}={})=>{S.killTweensOf(l.value),S.to(l.value,{opacity:1,duration:.5,delay:v})},k=({delay:v=0}={})=>{S.killTweensOf(l.value),S.to(l.value,{opacity:0,duration:.2,delay:v})},T=v=>{a.value=v,c.value=v>u.value?1:-1,u.value=v;const y=we(v,.05,.95);l.value.style.setProperty("--progress",y);const x=t.slice().reverse().find(z=>z.pr<v);x&&(f.value=x.year)};let d;return N(f,v=>{const y=p.value.find(x=>x.textContent==v);d?(S.killTweensOf(d,y),S.fromTo(y,{y:18*c.value,opacity:0},{y:0,opacity:1,duration:.5,ease:"power1.out"}),S.to(d,{y:18*-c.value,opacity:0,duration:.5,ease:"power1.out"})):S.to(y,{y:0,opacity:1,duration:.5}),d=y},{immediate:!0}),n({show:P,hide:k,setProgress:T}),(v,y)=>(A(),W("div",{ref_key:"refRoot",ref:l,class:"timelineBar",theme:o.theme},[B("div",ia,[B("div",la,[B("div",{ref_key:"refLineStart",ref:i,class:"timelineBar__lineStart"},null,512),B("div",{ref_key:"refLineEnd",ref:b,class:"timelineBar__lineEnd"},null,512)])]),B("div",{ref_key:"refYear",ref:s,class:"timelineBar__year textCreditsM"},[(A(),W(fe,null,me(t,x=>B("p",{key:x.year,ref_for:!0,ref_key:"refYearTexts",ref:p,class:"timelineBar__yearText"},K(x.year),1)),64))],512)],8,sa))}},ua=V(ca,[["__scopeId","data-v-4d2d521c"]]),da={class:"breakoutBtn__label"},pa={class:"section1__ledgerWrap ledgerWrap"},va={__name:"Section1",props:{start:{type:Number,default:0},ledger:{default:{src:"images/section-1/ledger",focus:{x:.41,y:.32},imageFit:"initial"}}},setup(o,{expose:n}){const{scroller:e}=wt(Ct),t=he("window"),a=r(),u=r(),c=r(),l=r(),s=r(),i=r(),b=r(),p=r(),f=r(),P=r(),k=r(),T=r(!0),d=H(()=>j.value&&T.value),m=r(!1),v=r(!1),y=He(),x=We(),z={scrollSpeed:.005,zoomInGridPr:0,timelinePr:0,dimImagesPr:0},w=r(!1),R=r(!1),j=r(!1),E=r(!1),Y=te(),J=H(()=>x.height*(Y.value?.34:(x.aspect<1,.5))),M=r(!1),_=H(()=>Z.value||M.value);ee(()=>{O()}),kt(()=>{g()}),Re(({scroll:C})=>{R.value&&(M.value=C<0)});const I=C=>{C?b.value.show():b.value.hide()},g=()=>{const C=St("SKIP_INTRO"),F=.1,D=F-.2,X=D+2.2;p.value.show({delay1:F,delay2:D,delay3:X,skipIntro:C}),i.value.show({delay1:D,delay2:X,skipIntro:C});const se=C?0:D+3.6;S.fromTo(u.value,{alpha:0,scale:.8},{alpha:1,scale:1,duration:1.5,delay:se,ease:"power2.out",onStart:()=>s.value.style.visibility="visible"});const ae=C?0:4.5;S.delayedCall(ae,()=>{j.value=!0,y.setScrollPaused(!1),w.value.cameraMotion=.25})},O=()=>{var se,ae,be;const{zoomInGridPr:C,dimImagesPr:F,timelinePr:D}=z;E.value=ve(D,0,1);const X=we(C,5,4);w.value.setCameraDistance(X),(se=b.value)==null||se.setProgress(D),(ae=P.value)==null||ae.setProgress(D),(be=i.value)==null||be.setCenterDimmedImages(F)},G=()=>{const{imgWrap:ie}=f.value,ue=new S.timeline({onUpdate:O}).set(R,{value:!0},0).fromTo(z,{zoomInGridPr:0},{zoomInGridPr:1,duration:1.5,ease:"power2.out"},0).fromTo(u.value,{alpha:1},{alpha:0,duration:1,ease:"none"},0).fromTo(a.value,{y:"0vh"},{y:"-75vh",duration:1,ease:"none"},0).fromTo(z,{timelinePr:0},{timelinePr:1,duration:10,ease:"none"},1.8).fromTo(z,{dimImagesPr:0},{dimImagesPr:1,duration:1,ease:"sine.inOut"},1);return Se(ue,T,!1,11.8),Se(ue,R,!1,11.8+1),Se(ue,m,!0,1),ue.add(f.value.setupAnimation(),11.8).fromTo(ie,{y:"100lvh"},{y:"-16lvh",duration:1,ease:"power2.out"},1).to(ie,{y:"0lvh",duration:1,ease:"power2.inOut"},11.8).to(ie,{y:"-100lvh",duration:1,ease:"power2.inOut"},17.8),Se(ue,m,!1,17.8+1),ue.add(Ae,Ue.height),ue},U=()=>e.scrollTo(x.height,{duration:1.5}),{active:Z}=ge(t,{start:-.01,end:Ue.height,animation:G,onUpdate:C=>{var D,X;(D=i.value)==null||D.setProgress(C),y.setSection1Progress(C);const F=[.66,.74];v.value=ve(C,F[0],F[1]),(X=k.value)==null||X.setOpenScroll(ve(C,F[0]+.01,F[1]))}});return N(E,I),N(d,C=>y.collageActive=C),n({show:g}),(C,F)=>(A(),W("div",{class:ne(["section1",{active:_.value}])},[L(Ye,{ref_key:"refScene",ref:w,active:_.value,id:h(Ue).id},{default:ke(()=>[L(na,{ref_key:"refIntroTitle",ref:p,title:h($).section1.title},null,8,["title"]),L(Mt,{ref_key:"refCollage",ref:i,active:R.value},null,8,["active"]),B("div",{ref_key:"refBreakoutWrap",ref:a,class:"section1__breakoutWrap"},[B("div",{ref_key:"refBreakout",ref:u,class:"section1__breakout"},[B("p",{ref_key:"refBreakoutSubtext",ref:l,class:"section1__breakoutSubtext textLabelS"},K(h($).section1.breakoutSubtext),513),B("h2",{ref_key:"refBreakoutText",ref:c,class:"section1__breakoutText textH2"},K(h($).section1.breakoutText),513)],512),B("button",{ref_key:"refBreakoutBtn",ref:s,class:"section1__breakoutBtn breakoutBtn",onClick:U},[F[0]||(F[0]=B("div",{class:"breakoutBtn__bg blurredBg"},null,-1)),L(h(At),{class:"breakoutBtn__arrow",name:"scroll-arrow"}),B("span",da,K(h(Y)?h($).section1.breakoutBtnMobile:h($).section1.breakoutBtn),1)],512)],512),L(Tt,{ref_key:"refZoom",ref:f,color:"#2F2923",active:m.value,asset:h($).section1.zoom.asset,textBlocks:h($).section1.zoom.textBlocks,height:J.value,scrollDuration:6,src:"images/section-1/zoom-img","credit-video-scrub-src":"section-1-scrolly-alpha"},null,8,["active","asset","textBlocks","height"]),B("div",pa,[L(Rt,ot({ref_key:"refLedger",ref:k,visible:v.value},o.ledger),null,16,["visible"])]),L(oa,{ref_key:"refDescriptions",ref:P,descriptions:h($).section1.descriptions},null,8,["descriptions"]),L(ua,{ref_key:"refTimelineBar",ref:b,theme:h(y).theme},null,8,["theme"])]),_:1},8,["active","id"])],2))}},Ao=V(va,[["__scopeId","data-v-e681c694"]]),fa={__name:"Bg",props:{alpha:{default:1},visible:{default:!0},color:{default:"red"},layer:{default:0},renderOrder:{default:0},name:{default:"Bg"}},setup(o,{expose:n}){const e=o,t=new Nt({color:e.color,depthWrite:!1,depthTest:!1}),a=new st(Ot,t);Ie(a,{name:e.name}),pe(()=>{a.visible=e.visible}),pe(()=>{a.material.opacity=e.alpha}),pe(()=>{a.layers.set(e.layer),a.renderOrder=e.renderOrder}),We(({width:c,height:l})=>{a.scale.set(c,l,1)},!0);const u=c=>{t.color=c};return Pt(()=>{a.geometry.dispose(),a.material.dispose()}),n({mesh:a,material:t,setColor:u}),(c,l)=>xe(c.$slots,"default")}},ma={__name:"IntroParagraphs",props:{descriptions:{type:Array,required:!0},active:{default:!0}},setup(o,{expose:n}){const e=o,t=r([]),a=r(0),u=()=>{const{progress:s}=c,{length:i}=e.descriptions,b=s*i;s>0&&s<1?a.value=Math.floor(b):a.value=-1,t.value.forEach((p,f)=>{const P=De(b,f,f+1,0,1,!0);p.setProgress(P)})},c={progress:0};return n({setupAnimation:({duration:s})=>{const i=new S.timeline({onUpdate:u});return i.fromTo(c,{progress:0},{progress:1,duration:s,ease:"none"}),i}}),(s,i)=>(A(!0),W(fe,null,me(o.descriptions,(b,p)=>(A(),Q(Oe,{ref_for:!0,ref_key:"refBlocks",ref:t,class:"paragraph textBodyM",key:p,text:b,index:p,active:o.active&&a.value===p},null,8,["text","index","active"]))),128))}},et=V(ma,[["__scopeId","data-v-d6829581"]]),ha=["src"],tt=3,ga={__name:"IntroTitle",props:{title:{default:{line1:"",line2:""}},start:{default:0}},setup(o){const n=o,e=he("window"),t=r(null),a=r(null),c=rt().public.BASE_URL,l=()=>{const i=S.timeline({});return i.set(t.value,{autoAlpha:0}),i.set(t.value,{autoAlpha:1},.001),i.fromTo(a.value,{scale:1.5,alpha:1},{scale:1,alpha:1,duration:1.2,ease:"power2.out"},0),i.to(a.value,{scale:.9,alpha:0,duration:.5,ease:"power2.in"},1.2),i.add(Ae,tt),i},{active:s}=ge(e,{start:n.start,end:n.start+tt,animation:l});return(i,b)=>(A(),W("h1",{ref_key:"refRoot",ref:t,class:ne(["introTitle textH1",{active:h(s)}])},[B("span",{ref_key:"refInner",ref:a,class:"introTitle__inner"},[B("img",{class:"introTitle__logo",src:`${h(c)}images/section-2/world-of-gpi-title.svg`},null,8,ha)],512)],2))}},ba=V(ga,[["__scopeId","data-v-292df0da"]]),ct=[{title:"A Fox Dog Highly Finished",author:"Stubbs, George 1782",description:"<a href='https://vmfa.museum/piction/6027262-8182224/' target='_blank'>A Fox Dog Highly Finished</a>, George Stubbs, Virginia Museum of Fine Arts, Paul Mellon Collection, <a href='https://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>CC BY NC</a>",img:"Fox-Dog-Highly-Finished"},{title:"L'Amour Menaçant' (Seated Cupid)",author:"Etienne-Maurice Falconet 1757",description:"<a href='' target='_blank'></a><a href='https://www.mauritshuis.nl/en/our-collection/artworks/906-l-amour-menacant-seated-cupid/#origin-artwork' target='_blank'>L'Amour Menaçant' (Seated Cupid)</a>, Etienne-Maurice Falconet, Mauritshuis, The Hague",img:"Seated-Cupid"},{title:"Portrait of a Halberdier (Francesco Guardi?)",author:"Pontormo (Jacopo Carucci) 1529–1530",description:"<a href='https://www.getty.edu/art/collection/object/103QSE' target='_blank'>Portrait of a Halberdier (Francesco Guardi?)</a>, Pontormo (Jacopo Carucci), J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Portrait-of-a-Halberdier"},{title:"A Woman Preparing Bread and Butter for a Boy",author:"Pieter de Hooch 1660-1663",description:"<a href='https://www.getty.edu/art/collection/object/103RFZ' target='_blank'>A Woman Preparing Bread and Butter for a Boy</a>, Pieter de Hooch, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"woman-preparing-bread-and-butter"},{title:"St. Nicholas of Bari",author:"Carlo Crivelli 1472",description:"<a href='https://www.clevelandart.org/art/1952.111' target='_blank'>St. Nicholas of Bari</a>, Carlo Crivelli, The Cleveland Museum of Art, Gift of the Hanna Fund, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Saint-Nicholas-of-Bari"},{title:"Marchesa Elena Grimaldi Cattaneo",author:"Sir Anthony van Dyck 1623",description:"<a href='https://www.nga.gov/collection/art-object-page.1231.html' target='_blank'>Marchesa Elena Grimaldi Cattaneo</a>, Sir Anthony van Dyck, Courtesy National Gallery of Art, Washington, Widener Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"marchesa_elena_grimaldi_cattaneo_1942.9.92"},{title:"Filippo Cattaneo",author:"Sir Anthony van Dyck 1623",description:"<a href='https://www.nga.gov/collection/art-object-page.1232.html' target='_blank'>Filippo Cattaneo</a>, Sir Anthony van Dyck, Courtesy National Gallery of Art, Washington, Widener Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"filippo_cattaneo_1942.9.93"},{title:"Maddalena Cattaneo",author:"Sir Anthony van Dyck 1623",description:"<a href='https://www.nga.gov/collection/art-object-page.1233.html' target='_blank'>Maddalena Cattaneo</a>, Sir Anthony van Dyck, Courtesy National Gallery of Art, Washington, Widener Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"maddalena_cattaneo_1942.9.94"},{title:"The Annunciation",author:"Albert C. Bouts 1480",description:"<a href='http://www.clevelandart.org/art/1942.635' target='_blank'>The Annunciation</a>, Albert C. Bouts, The Cleveland Museum of Art, Bequest of John L. Severance, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Anunciation"},{title:"A Mountain Landscape",author:"Jan van Aken C. Mid 17th Century",description:"<a href='http://www.clevelandart.org/art/1943.540' target='_blank'>A Mountain Landscape</a>, Jan van Aken, The Cleveland Museum of Art, Mr. and Mrs. Lewis B. Williams Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"A-Mountain-Landscape"},{title:"Seaside (July: Specimen Of A Portrait)",author:"James Tissot 1878",description:"<a href='http://www.clevelandart.org/art/1980.288' target='_blank'>Seaside (July: Specimen Of A Portrait)</a>, James Tissot, The Cleveland Museum of Art, Bequest of Noah L. Butkin, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Seaside"},{title:"Portrait Of William E. Henley",author:"Auguste Rodin 1882",description:"<a href='http://www.clevelandart.org/art/1940.581' target='_blank'>Portrait Of William E. Henley</a>, Auguste Rodin, The Cleveland Museum of Art, Bequest of James Parmelee, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Portrait-Of-William-E-Henley"},{title:"Portrait Of A Woman",author:"Rembrandt van Rijn 1635 or earlier",description:"<a href='http://www.clevelandart.org/art/1944.90' target='_blank'>Portrait Of a Woman</a>, Rembrandt van Rijn, The Cleveland Museum of Art, The Elisabeth Severance Prentiss Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Portrait-of-a-Woman"},{title:"Still Life With Apples And Pears",author:"Paul Cezanne ca. 1891–92",description:"<a href='https://www.metmuseum.org/art/collection/search/435883?&searchField=All&sortBy=Relevance&ft=knoedler&offset=180&rpp=20&amp;pos=186' target='_blank'>Still Life With Apples And Pears</a>, Paul Cezanne, The Metropolitan Museum of Art, New York, Bequest of Stephen C. Clark, 1960, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Still-Life-with-apples-and-pears"},{title:"Portrait Of A Man",author:"Moretto da Brescia (Alessandro Bonvicino) ca. 1520-25",description:"<a href='https://www.metmuseum.org/art/collection/search/437158?&searchField=All&sortBy=Relevance&ft=knoedler&offset=220&rpp=80&amp;pos=249' target='_blank'>Portrait Of a Man</a>, Moretto da Brescia, The Metropolitan Museum of Art, New York, Rogers Fund, 1928, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Portrait-of-a-Man"},{title:"Portrait Of A Carthusian",author:"Petrus Christus 1446",description:"<a href='https://www.metmuseum.org/art/collection/search/435896?&searchField=All&sortBy=Relevance&ft=knoedler&offset=300&rpp=80&amp;pos=302' target='_blank'>Portrait Of A Carthusian</a>, Petrus Christus, The Metropolitan Museum of Art, New York, The Jules Bache Collection, 1949, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Portrait-of-a-Carthusian"},{title:"Oleanders",author:"Vincent van Gogh 1888",description:"<a href='https://www.metmuseum.org/art/collection/search/436530?&searchField=All&sortBy=Relevance&ft=knoedler&offset=0&rpp=20&amp;pos=5' target='_blank'>Oleanders</a>, Vincent van Gogh, The Metropolitan Museum of Art, New York, Gift of Mr. and Mrs. John L. Loeb, 1962, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Oleanders"},{title:"Circus Sideshow (parade De Cirque)",author:"Georges Seurat 1887-88",description:"<a href='https://www.metmuseum.org/art/collection/search/437654?&searchField=All&sortBy=Relevance&ft=knoedler&offset=180&rpp=20&amp;pos=183' target='_blank'>Circus Sideshow (parade De Cirque)</a>, Georges Seurat, The Metropolitan Museum of Art, New York, Bequest of Stephen C. Clark, 1960, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Circus-Sideshow"},{title:'Plate 43 from "Los Caprichos": The sleep of reason produces monsters (El sueño de la razon produce monstruos)',author:"Goya (Francisco de Goya y Lucientes) 1799",description:`<a href='https://www.metmuseum.org/art/collection/search/338473' target='_blank'>Plate 43 from "Los Caprichos": The sleep of reason produces monsters (El sueño de la razon produce monstruos)</a>, Francisco de Goya, The Metropolitan Museum of Art, New York, Gift of M. Knoedler & Co., 1918, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>`,img:"Plate43"},{title:"Herdsmen Tending Cattle",author:"Aelbert Cuyp 1655/1660",description:"<a href='https://www.nga.gov/content/ngaweb/collection/art-object-page.66.html' target='_blank'>Herdsmen Tending Cattle</a>, Aelbert Cuyp, Courtesy National Gallery of Art, Washington, Andrew W. Mellon Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"herdsmen_tending_cattle_1937.1.59"},{title:"Tiger And Snake",author:"Eugène Delacroix 1862",description:"<a href='https://www.nga.gov/content/ngaweb/collection/art-object-page.195132.html' target='_blank'>Tiger And Snake</a>, Eugène Delacroix, Courtesy National Gallery of Art, Washington, Corcoran Collection (William A. Clark Collection) <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"tiger_and_snake_2014.136.30"},{title:"Diana And Endymion",author:"Jean Honoré Fragonard c. 1753/1756",description:"<a href='https://www.nga.gov/content/ngaweb/collection/art-object-page.46026.html' target='_blank'>Diana And Endymion</a>, Jean Honoré Fragonard, Courtesy National Gallery of Art, Washington, Timken Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"diana_and_endymion_1960.6.2"},{title:"The Olive Orchard",author:"Vincent van Gogh 1889",description:"<a href='https://www.nga.gov/content/ngaweb/collection/art-object-page.46627.html' target='_blank'>The Olive Orchard</a>, Vincent van Gogh, Courtesy National Gallery of Art, Washington, Chester Dale Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"the_olive_orchard_1963.10.152"},{title:"View Of Dordrecht From The North",author:"Jan van Goyen early 1650s",description:"<a href='https://www.nga.gov/content/ngaweb/collection/art-object-page.157395.html' target='_blank'>View Of Dordrecht From The North</a>, Jan van Goyen, Courtesy National Gallery of Art, Washington, Corcoran Collection (William A. Clark Collection), <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"view_of_dordrecht_from_the_north_2014.136.34"},{title:"Approach To Venice",author:"Joseph Mallord William Turner 1844",description:"<a href='https://www.nga.gov/content/ngaweb/collection/art-object-page.117.html' target='_blank'>Approach To Venice</a>, Joseph Mallord William Turner, Courtesy National Gallery of Art, Washington, Andrew W. Mellon Collection, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"approach_to_venice_1937.1.110"},{title:"Saint Peter",author:"Circle of Nardo di Cione mid-14th century",description:"<a href='https://artmuseum.princeton.edu/collections/objects/34177' target='_blank'>Saint Peter</a>, Circle of Nardo di Cione, Image courtesy of the Princeton University Art Museum, Bequest of Millard Meiss, Class of 1926 and Margaret L. Meiss, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"SaintPeter"},{title:"The Entry of the Animals into Noah's Ark",author:"Jan Brueghel the Elder 1613",description:"<a href='https://www.getty.edu/art/collection/object/103RJT' target='_blank'>The Entry of the Animals into Noah's Ark</a>, Jan Brueghel the Elder, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Entry-of-the-animals-into-Noahs-Ark"},{title:"Double Portrait",author:"Michael Sweerts about 1660–1662",description:"<a href='https://www.getty.edu/art/collection/object/103RH7' target='_blank'>Double Portrait</a>, Michael Sweerts, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Double-Portrait"},{title:"The Music Lesson",author:"Gerard ter Borch about 1668",description:"<a href='https://www.getty.edu/art/collection/object/107VPA' target='_blank'>The Music Lesson</a>, Gerard ter Borch, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Music-Lesson"},{title:"Horse Stable",author:"Gerard ter Borch about 1654",description:"<a href='https://www.getty.edu/art/collection/object/103RHT' target='_blank'>Horse Stable</a>, Gerard ter Borch, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Horse-Stable"},{title:"Adoration of the Shepherds",author:"Nicolaes Maes about 1660",description:"<a href='https://www.getty.edu/art/collection/object/103RAR' target='_blank'>Adoration of the Shepherds</a>, Nicolaes Maes, J, Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Adoration-of-the-Shepherds"},{title:"Thomas Howard, 2nd Earl of Arundel",author:"Anthony van Dyck about 1620-1621",description:"<a href='https://www.getty.edu/art/collection/object/103RHM' target='_blank'>Thomas Howard, 2nd Earl of Arundel</a>, Anthony van Dyck, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Thomas-Howard"},{title:"A Wooded Landscape",author:"Meindert Hobbema 1667",description:"<a href='https://www.getty.edu/art/collection/object/103RFV' target='_blank'>A Wooded Landscape</a>, Meindert Hobbema, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"A-Wooded-Landscape"},{title:"The Birth of Bacchus",author:"Giulio Romano (Giulio Pippi) and Workshop about 1530s",description:"<a href='https://www.getty.edu/art/collection/object/103R9T' target='_blank'>The Birth of Bacchus</a>, Giulio Romano (Giulio Pippi) and Workshop, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Birth-of-Bacchus"},{title:"David Meeting Abigail",author:"Workshop of Peter Paul Rubens early 1630s",description:"<a href='https://www.getty.edu/art/collection/object/103RCW' target='_blank'>David Meeting Abigail</a>, Workshop of Peter Paul Rubens, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"David-meeting-Abigail"},{title:"Before the Ball",author:"Jean-François de Troy 1735",description:"<a href='https://www.getty.edu/art/collection/object/103RGD' target='_blank'>Before the Ball</a>, Jean-François de Troy, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Before-the-Ball"},{title:"Dido and Aeneas",author:"Nicolas Verkolye early 18th century",description:"<a href='https://www.getty.edu/art/collection/object/103RC5' target='_blank'>Dido and Aeneas</a>, Nicolas Verkolye, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Dido-and-Aeneas"},{title:"Larder Still Life with Housekeeper and Young Boy",author:"Frans Snijders and Workshop and Workshop of Peter Paul Rubens 1636–1638",description:"<a href='https://www.getty.edu/art/collection/object/103RDT' target='_blank'>Larder Still Life with Housekeeper and Young Boy</a>, Frans Snijders and Workshop and Workshop of Peter Paul Rubens, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Larder-Still-Life"},{title:"Penelope Unraveling Her Web",author:"Joseph Wright of Derby 1783–1784",description:"<a href='https://www.getty.edu/art/collection/object/103RJ5' target='_blank'>Penelope Unraveling Her Web</a>, Joseph Wright of Derby, J, Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Penelope-unraveling-her-web"},{title:"A Hermit Praying in the Ruins of a Roman Temple",author:"Hubert Robert about 1760",description:"<a href='https://www.getty.edu/art/collection/object/103RHS' target='_blank'>A Hermit Praying in the Ruins of a Roman Temple</a>, Hubert Robert, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"A-Hermit-Praying-in-the-Ruins-of-a-Roman-Temple"},{title:"Arcadian Shepherds",author:"Giovanni Benedetto Castiglione about 1655",description:"<a href='https://www.getty.edu/art/collection/object/103RCK' target='_blank'>Arcadian Shepherds</a>, Giovanni Benedetto Castiglione, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Arcadian-Shepherds"},{title:"Shipping in a Calm at Flushing with a States General Yacht Firing a Salute",author:"Jan van de Cappelle 1649",description:"<a href='https://www.getty.edu/art/collection/object/107RJA' target='_blank'>Shipping in a Calm at Flushing with a States General Yacht Firing a Salute</a>, Jan van de Cappelle, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Shipping-in-a-Calm-at-Flushing-with-a-States-General-Yacht-Firing-a-Salute"},{title:"The Virgin as the Woman of the Apocalypse",author:"Peter Paul Rubens about 1623–1624",description:"<a href='https://www.getty.edu/art/collection/object/103RGR' target='_blank'>The Virgin as the Woman of the Apocalypse</a>, Peter Paul Rubens, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Virgin-as-the-Woman-of-the-Apocolypse"},{title:"Astronomer by Candlelight",author:"Gerrit Dou late 1650s",description:"<a href='https://www.getty.edu/art/collection/object/103RHZ' target='_blank'>Astronomer by Candlelight</a>, Gerrit Dou, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Astronomer-by-Candlelight"},{title:"The Alchemist",author:"Cornelis Bega 1663",description:"<a href='https://www.getty.edu/art/collection/object/103RFX' target='_blank'>The Alchemist</a>, Cornelis Bega, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Alchemist"},{title:"Pictura (An Allegory of Painting)",author:"Frans van Mieris the Elder 1661",description:"<a href='https://www.getty.edu/art/collection/object/103RF7' target='_blank'>Pictura (An Allegory of Painting)</a>, Frans van Mieris the Elder, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Pictura"},{title:"Still Life with Dead Birds",author:"Christoffel van den Berghe 1624",description:"<a href='https://www.getty.edu/art/collection/object/103RBJ' target='_blank'>Still Life with Dead Birds</a>, Christoffel van den Berghe, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Still-Life-with-Dead-Birds"},{title:"The Dream of Pope Sergius",author:"Workshop of Rogier van der Weyden late 1430s",description:"<a href='https://www.getty.edu/art/collection/object/103RCQ' target='_blank'>The Dream of Pope Sergius</a>, Workshop of Rogier van der Weyden, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Dream-of-Pope-Sergius"},{title:"Venus and Adonis",author:"Titian (Tiziano Vecellio) about 1555–1560",description:"<a href='https://www.getty.edu/art/collection/object/103RJS' target='_blank'>Venus and Adonis</a>, Titian, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"Venus-and-Adonis"},{title:"The Way to Calvary",author:"Domenichino (Domenico Zampieri) about 1610",description:"<a href='https://www.getty.edu/art/collection/object/103RFK' target='_blank'>The Way to Calvary</a>, Domenichino, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Way-to-Calvary"},{title:"The Vision of Saint Francis of Paola",author:"Bartolomé Esteban Murillo about 1670",description:"<a href='https://www.getty.edu/art/collection/object/1095RY' target='_blank'>The Vision of Saint Francis of Paola</a>, Bartolomé Esteban Murillo, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Vision-of-Saint-Francis-of-Paola"},{title:"The Drawing Lesson",author:"Jan Steen about 1665",description:"<a href='https://www.getty.edu/art/collection/object/103RFR' target='_blank'>The Drawing Lesson</a>, Jan Steen, J. Paul Getty Museum, <a href='https://creativecommons.org/publicdomain/zero/1.0/' target='_blank'>CC0</a>",img:"The-Drawing-Lesson"},{title:"Caricature of Dr James Hay as a bear leader",author:"Pier Leone Ghezzi 1689-1755",description:"<a href='https://www.britishmuseum.org/collection/object/P_1946-0713-98' target='_blank'>Caricature of Dr James Hay as a bear leader</a>, Pier Leone Ghezzi, © The Trustees of the British Museum. Shared under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (<a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank'>CC BY-NC-SA 4.0</a>) licence.",img:"Caricature-of-DrJames-Hay"},{title:"Two herdsmen, one seated, with three sheep, a goat and a bull",author:"Philipp Peter Roos 1672-1705",description:"<a href='https://www.britishmuseum.org/collection/object/P_Gg-2-278' target='_blank'>Two herdsmen, one seated, with three sheep, a goat and a bull</a>, Philipp Peter Roos, © The Trustees of the British Museum. Shared under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (<a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank'>CC BY-NC-SA 4.0</a>) licence.",img:"Two-Herdsmen-oneseated-with-three-sheep"},{title:"The Marriage Contract",author:"Jean-Baptiste Greuze ca.1761",description:"<a href='https://www.metmuseum.org/art/collection/search/399623' target='_blank'>The Marriage Contract</a>, Jean-Baptiste Greuze, The Metropolitan Museum of Art, New York,  Purchase, Lila Acheson Wallace and Mrs. Howard J. Barnet Gifts, 2012, CC0",img:"The-Marriage-Contract"}],Je=16.5,_a={__name:"Section2",props:{start:{type:Number,default:0}},setup(o,{expose:n}){const e=o,t=new ye,a=new ye("white"),u=new ye("#EBFEFF"),c=new ye("#E6E0DC"),l=new ye("#DAE2E8"),s=he("window"),i=r(null),b=r(null),p=r(null),f=r(null),P=r(null),k=He(),T=te(),d=r(!1),m=H(()=>T.value?.6:1.8),v=H(()=>T.value?6:7),y=e.start+.5,x=e.start+6.5,z=e.start+13,w=Je+7,R=e.start+Je,j=e.start+w,E={repelRadiusPr:0,colorBasePr:0,colorPr1:0,colorPr2:0,colorPr3:0},Y=()=>{var O;const g=we(E.repelRadiusPr,m.value,v.value);(O=b.value)==null||O.setRepelRadius(g),t.copy(a).lerp(u,E.colorPr1).lerp(c,E.colorPr2).lerp(l,E.colorPr3).lerp(a,E.colorBasePr)};ee(()=>{Y(),P.value.setColor(t),i.value.cameraMotion=.25});const J=()=>{const g=new S.timeline({onUpdate:Y}),O=2.2,G=5,U=5,Z=10,C=30;return Se(g,d,!0,1),g.add(p.value.setupAnimation({duration:4.5}),O),g.add(f.value.setupAnimation({duration:3}),Z),g.fromTo(E,{repelRadiusPr:0},{repelRadiusPr:1,duration:1,ease:"power2.inOut"},U),Se(g,d,!1,U),g.fromTo(E,{colorPr1:0},{colorPr1:1,duration:1,ease:"power2.inOut"},G),g.fromTo(E,{colorPr2:0},{colorPr2:1,duration:1,ease:"power2.inOut"},Z),g.fromTo(E,{colorBasePr:0},{colorBasePr:1,duration:1,ease:"power2.inOut"},Je-1),g.fromTo(E,{colorPr3:0},{colorPr3:1,duration:1,ease:"power2.inOut"},w-1),g.to(E,{colorBasePr:0,duration:1,ease:"power2.inOut"},w-1),g.fromTo(E,{colorBasePr:0},{colorBasePr:1,duration:1,ease:"power2.inOut"},C),g.add(Ae,je.height),g},M=()=>{const g=_.velocity*(T.value?.003:.002);b.value.setScroll(g)},_=Re(M),{active:I}=ge(s,{start:e.start-.01,end:e.start+je.height,animation:J,onUpdate:g=>{k.setSection2Progress(g)}});return N([m,v],()=>{Y(),M()}),N(d,g=>k.collageActive=g),Ge([{name:"repelRadiusMin",value:m,options:{min:0,max:8,step:.001}},{name:"repelRadiusMax",value:v,options:{min:0,max:8,step:.001}}],{title:"Section 2",expanded:!1}),n({}),(g,O)=>(A(),W("div",{class:ne(["section2",{active:h(I)}])},[L(Ye,{ref_key:"refScene",ref:i,active:h(I),id:h(je).id},{default:ke(()=>[L(fa,{ref_key:"refBg",ref:P,layer:h(Dt)},null,8,["layer"]),L(ba,{start:y}),L(lt,{ref_key:"refCollage",ref:b,active:h(I),assets:h(ct),folder:"world-of-gpi"},null,8,["active","assets"]),L(et,{ref_key:"refIntroParagraphs1",ref:p,descriptions:h($).section2.paragraphs},null,8,["descriptions"]),L(It,{start:x}),L(Bt,{start:z}),L(et,{ref_key:"refIntroParagraphs2",ref:f,descriptions:h($).section2.paragraphs2},null,8,["descriptions"]),L(zt,{start:j}),L(Lt,{start:R})]),_:1},8,["active","id"])],2))}},Mo=V(_a,[["__scopeId","data-v-a76b1472"]]),ya=new Ne({vs:`
        attribute vec3 aPos;
        attribute vec3 aColor;
        
        varying vec3 vColor;

        void main() {
            vColor = aColor;
            
            vec3 pos = position + aPos;
            gl_Position = projectionMatrix * viewMatrix * instanceMatrix * vec4(pos, 1.0);
        }
    `,fs:`
        varying vec3 vColor;
        
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `}),ut=({geometry:o=null,material:n=null,count:e=1e3}={})=>{const t=o||new $t(1,1),a=n||ya,u=new Ut(t,a,e),c=(l="aAttribute",s=3)=>{const i=new jt(new Float32Array(e*s),s);return u.geometry.setAttribute(l,i),i};return c("aPos",4),c("aRandom",4),{mesh:u,mat:a,geo:t,createAttribute:c}};var Fe=`#ifndef FNC_SATURATE
#define FNC_SATURATE
float saturate(float x) { return clamp(x, 0.0, 1.0); }
vec2 saturate(vec2 x) { return clamp(x, 0.0, 1.0); }
vec3 saturate(vec3 x) { return clamp(x, 0.0, 1.0); }
vec4 saturate(vec4 x) { return clamp(x, 0.0, 1.0); }
#endif

#ifndef FNC_MAP
#define FNC_MAP

float map( float value, float inMin, float inMax ) {
    return saturate( (value-inMin)/(inMax-inMin));
}

vec2 map( vec2 value, vec2 inMin, vec2 inMax ) {
    return saturate( (value-inMin)/(inMax-inMin));
}

vec3 map( vec3 value, vec3 inMin, vec3 inMax ) {
    return saturate( (value-inMin)/(inMax-inMin));
}

vec4 map( vec4 value, vec4 inMin, vec4 inMax ) {
    return saturate( (value-inMin)/(inMax-inMin));
}

float map(in float value, in float inMin, in float inMax, in float outMin, in float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec2 map(in vec2 value, in vec2 inMin, in vec2 inMax, in vec2 outMin, in vec2 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec3 map(in vec3 value, in vec3 inMin, in vec3 inMax, in vec3 outMin, in vec3 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec4 map(in vec4 value, in vec4 inMin, in vec4 inMax, in vec4 outMin, in vec4 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float map(float value, float inMin, float inMax, float outMin, float outMax, bool clamped) {
    if (clamped) value = min(inMax, max(inMin, value));
    return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

#endif`,Xe=`float aastep(float threshold, float value) {
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
}

float aaedge(vec2 uv, float thresh) {
    vec2 st = abs((uv - 0.5) * 2.0);
    float border = aastep(0.5, smoothstep(1.0, thresh, length(st.x))) *
    aastep(0.5, smoothstep(1.0, thresh, length(st.y)));
    return border;
}

#define BLACK           vec3(0.0, 0.0, 0.0)
#define WHITE           vec3(1.0, 1.0, 1.0)
#define RED             vec3(1.0, 0.0, 0.0)
#define GREEN           vec3(0.0, 1.0, 0.0)
#define BLUE            vec3(0.0, 0.0, 1.0)
#define YELLOW          vec3(1.0, 1.0, 0.0)
#define CYAN            vec3(0.0, 1.0, 1.0)
#define MAGENTA         vec3(1.0, 0.0, 1.0)
#define ORANGE          vec3(1.0, 0.5, 0.0)
#define PURPLE          vec3(1.0, 0.0, 0.5)
#define LIME            vec3(0.5, 1.0, 0.0)
#define ACQUA           vec3(0.0, 1.0, 0.5)
#define VIOLET          vec3(0.5, 0.0, 1.0)
#define AZUR            vec3(0.0, 0.5, 1.0)

/* Signed distance drawing methods */
float fill(in float x) { return 1.0 - aastep(0.0, x); }
float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}
float fill(float x, float size) {
    return 1.0 - aastep(size, x);
}

float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
float stroke(float x, float size, float w) {
    float d = aastep(size, x + w * 0.5) - aastep(size, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}
float stroke(float x, float size, float w, float edge) {
    float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
    return clamp(d, 0.0, 1.0);
}

vec3 draw(in sampler2D t, in vec2 pos, in vec2 w) { vec2 s = w / 1.0; s.x *= -1.0; return texture2D(t, pos / s + 0.5).rgb; }

vec3 field(float d) {
	vec3 c1 = mix(WHITE, YELLOW, 0.4);
	vec3 c2 = mix(WHITE, AZUR, 0.7);
	vec3 c3 = mix(WHITE, ORANGE, 0.9);
	vec3 c4 = BLACK;
	
	float d0 = abs(stroke(mod(d + 0.1, 0.2) - 0.1, 0.004));
	float d1 = abs(stroke(mod(d + 0.025, 0.05) - 0.025, 0.004));
	float d2 = abs(stroke(d, 0.004));
	float f = clamp(d * 0.85, 0.0, 1.0);
	
	vec3 grd = mix(c1, c2, f);
	grd = mix(grd, c4, 1.0 - clamp(1.25 - d * 0.25, 0.0, 1.0));
	grd = mix(grd, c3, fill(d));
	grd = mix(grd, c4, max(d2 * 0.85, max(d0 * 0.25, d1 * 0.06125)) * clamp(1.25 - d, 0.0, 1.0));
	
	return grd;
}`,dt=`#ifndef FNC_RECTSDF
#define FNC_RECTSDF

float sdRect(vec2 p, vec2 b, float r) {
    vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

float sdRect(vec2 p, float b, float r) {
    return sdRect(p, vec2(b), r);
}

float sdRect(in vec2 st, in vec2 s) {
    st = st * 2.0 - 1.0;
    return max(abs(st.x / s.x),
    abs(st.y / s.y));
}

float sdRect(in vec2 st, in float s) {
    return sdRect(st, vec2(s));
}

float sdRect(in vec2 st) {
    return sdRect(st, vec2(1.0));
}

#endif

#ifndef FNC_RECT
#define FNC_RECT

float rect(vec2 st, vec2 size, float strokeWidth) {
    return stroke(sdRect(st, size), 1.0, strokeWidth);
}

float rect(vec2 st, float size, float strokeWidth) {
    return stroke(sdRect(st, vec2(size)), 1.0, strokeWidth);
}

float rect(vec2 st, vec2 size) {
    return fill(sdRect(st, size), 1.0);
}

float rect(vec2 st, float size) {
    return fill(sdRect(st, vec2(size)), 1.0);
}

#endif`;const xa={__name:"BlankCanvases",props:{active:{type:Boolean,default:!1}},setup(o,{expose:n}){const e=te(),t=r((e.value,.5)),a=r((e.value,.5)),u=r(e.value?.5:1),c=r((e.value,.25)),l=r((e.value,.25)),s=r(20),i=r(e.value?8:12),b=r(4),p=r(e.value?1.5:1),f=r(1),P=r(e.value?.2:.15),k=H(()=>s.value*i.value*b.value),T=H(()=>({width:(s.value-1)*t.value,height:(i.value-1)*a.value,depth:(b.value-1)*u.value}));ee(()=>{w()});const d=new Ne({options:{depthWrite:!1,depthTest:!1},uniforms:{uRepelRadius:0,uAlpha:1,uBaseAlpha:.2,uDepth:1},vs:`
            attribute vec4 aPos;
            attribute vec3 aColor;
            attribute vec2 aAspect;
            
            varying vec3 vColor;
            varying vec2 vUv;
            varying vec2 vAspect;
            varying vec3 vPos;
            
            uniform float uRepelRadius;

            ${Fe}

            void main() {
                vColor = aColor;
                vUv = uv;
                vAspect = aAspect;

                vec3 repelPoint = vec3(0.0);
                    
                vec3 scale = vec3(1.0);
                scale.xy *= vAspect * aPos.w;

                vec3 pos = position * scale + aPos.xyz;

                vec4 localPos = vec4(pos, 1.0);

                vec2 repelDir = aPos.xy - repelPoint.xy;
                vec2 repelDirNorm = normalize(repelDir);
                float repelDist = length(repelDir);
                float repelAmount = map(repelDist, 0.0, uRepelRadius, uRepelRadius, 0.0, true);

                localPos.xy += repelDirNorm * uRepelRadius;
                // localPos.xy += repelDirNorm * repelAmount;

                vPos = localPos.xyz;

                gl_Position = projectionMatrix * modelViewMatrix * localPos;
            }
        `,fs:`
            varying vec2 vUv;
            varying vec2 vAspect;
            varying vec3 vPos;
            
            uniform float uAlpha;
            uniform float uBaseAlpha;
            uniform float uDepth;
            
            ${Xe}
            ${dt}
            ${Fe}

            void main() {
                vec3 red = vec3(1.0, 0.0, 0.0);

                float depthAlpha = map(vPos.z, uDepth * -0.5, uDepth * 0.5, 0.1, 1.0, true);

                float outline = rect(vUv, vec2(1.0), 0.08);
                float alpha = outline * uBaseAlpha * uAlpha * depthAlpha;

                gl_FragColor = vec4(vec3(0.0), alpha);
                
                // gl_FragColor = vec4(red, 1.0);
            }
        `}),{mesh:m,createAttribute:v}=ut({count:k.value,material:d}),{object:y}=Ie(null,{name:"Blank canvases"});y.add(m);const x=v("aPos",4),z=v("aAspect",2),w=()=>{m.count=k.value,m.instanceMatrix.needsUpdate=!0,E()},R=new st(new Jt(1,32,32),Ft("blue")),j=()=>{d.uniforms.uRepelRadius.value=p.value,R.scale.setScalar(p.value),d.uniforms.uAlpha.value=f.value,d.uniforms.uBaseAlpha.value=P.value,d.uniforms.uDepth.value=T.value.depth},E=()=>{const{width:M,height:_,depth:I}=T.value;for(let g=0;g<k.value;g++){const O=g%s.value,G=Math.floor(g/s.value)%i.value,U=Math.floor(g/(s.value*i.value)),Z=U%2===0?0:a.value*.5,C=O%2===0?0:a.value*.2,F=M*-.75+O*t.value,D=_*-.5+G*a.value+C+Z,X=I*.5+U*-u.value,se=re(c.value,l.value);x.setXYZW(g,F,D,X,se);const ae=re(.6,1.4),be=ae<1?ae:1,ie=ae<1?1:1/ae;z.setXY(g,be,ie)}x.needsUpdate=!0},Y=()=>{const M=e.value?.9:1.2,_=S.timeline();return _.fromTo(f,{value:0},{value:1,duration:.2,ease:"sine.out"},0),_.fromTo(p,{value:M*1.8},{value:M,duration:2,ease:"power3.out"},0),_},J=()=>{const M=e.value?1.5:3,_=S.timeline();return _.to(f,{value:0,duration:1.5,ease:"power2.inOut"},0),_.to(p,{value:M,duration:1.5,ease:"power2.inOut"},0),_};return N(k,w),N(T,E),N([c,l],E),pe(j),Ge([{name:"uRepelRadius",value:p,options:{min:0,max:5,step:.01}},{name:"uAlpha",value:f,options:{min:0,max:1,step:.01}},{name:"uBaseAlpha",value:P,options:{min:0,max:1,step:.01}}],{title:"Blank canvases"}),n({animateIn:Y,animateOut:J}),(M,_)=>xe(M.$slots,"default")}},wa=(o=1)=>{const n=Math.random()*Math.PI*2,e=Math.acos(1-2*Math.random()),t=o*Math.cbrt(Math.random()),a=t*Math.sin(e)*Math.cos(n),u=t*Math.sin(e)*Math.sin(n),c=t*Math.cos(e);return{x:a,y:u,z:c}};function pt(o,n,e,t,a){let u=t;u=Math.PI/180*t;const c=o+e*Math.cos(u),l=n+e*Math.sin(u);return{x:c,y:l}}var vt=`#ifndef FNC_BLENDOVERLAY
#define FNC_BLENDOVERLAY
float blendOverlay(in float base, in float blend) {
    return (base < .5)? (2.*base*blend): (1. - 2. * (1. - base) * (1. - blend));
}

vec3 blendOverlay(in vec3 base, in vec3 blend) {
    return vec3(blendOverlay(base.r, blend.r),
                blendOverlay(base.g, blend.g),
                blendOverlay(base.b, blend.b));
}

vec3 blendOverlay(in vec3 base, in vec3 blend, in float opacity) {
    return (blendOverlay(base, blend) * opacity + base * (1. - opacity));
}
#endif`,ft=`#ifndef FNC_SDFCIRCLE
#define FNC_SDFCIRCLE

float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.;
}

float sdCircle(in vec2 st) {
    return sdCircle(st, vec2(.5));
}

#endif

#ifndef FNC_CIRCLE
#define FNC_CIRCLE

float circle(vec2 st, float size) {
    return fill(sdCircle(st), size);
}

float circle(vec2 st, float size, float strokeWidth) {
    return stroke(sdCircle(st), size, strokeWidth);
}

#endif`;const ce={uniforms:()=>({uSpriteSheet:[],uSpriteSize:new Ht,uSheetSize:new Yt}),parsVert:`
        attribute vec4 aSprite;
        attribute float aTextureIndex;
        
        varying float vTextureIndex;
        varying vec4 vSprite;
    `,vert:`
        vSprite = aSprite;
        vTextureIndex = aTextureIndex;
    `,parsFrag:`
        #define MAX_TEXTURES 3

        varying vec4 vSprite;
        varying float vTextureIndex;

        uniform sampler2D uSpriteSheet[MAX_TEXTURES];
        uniform vec2 uSheetSize;

        vec4 getSpriteAtFrame(sampler2D tex, vec2 uv, vec4 frame, vec2 size) {
            vec4 f = frame;
            f.xz /= size.x;
            f.yw /= size.y;

            vec2 uvSprite = uv;
            uvSprite.x = f.x + (uvSprite.x * f.z);
            uvSprite.y = (1.0 - f.w) - f.y + (uvSprite.y * f.w);

            return texture2D(tex, uvSprite);
        }

        vec4 getSpriteTexture(float index, vec2 uv, vec4 frame) {
            // Use switch statement instead of dynamic indexing
            // Assumes there are 3 or less sheet textures. Can add more if needed
            if (index < 0.5) {
                return getSpriteAtFrame(uSpriteSheet[0], uv, frame, uSheetSize);
            }

            if (index < 1.5) {
                return getSpriteAtFrame(uSpriteSheet[1], uv, frame, uSheetSize);
            }

            if (index < 2.5) {
                return getSpriteAtFrame(uSpriteSheet[2], uv, frame, uSheetSize);
            }

            return vec4(0.0);
        }
    `,frag:`
        vec4 sprite = getSpriteTexture(vTextureIndex, vUv, vSprite);    
    `},Ca=()=>{const n=.09999999999999998;return new Ne({options:{depthWrite:!1,alphaTest:.01},uniforms:{uTime:0,uEdgeRadius:1,uStaggerDur:.8,uStartRange:n,uColorOverlay:new ye("red"),uFallingSpeed:0,...ce.uniforms()},vs:`
            attribute vec4 aProps;
            attribute vec4 aRandom;
            attribute float aGroupIndex;
            attribute float aScale;
            attribute vec3 aAngleRadius;
            
            uniform float uTime;
            uniform float uStartProgress;
            uniform float uEdgeRadius;
            uniform float uStaggerDur;
            uniform float uStartRange;
            uniform float uFallingSpeed;

            varying vec2 vUv;
            varying float vGroupIndex;
            varying float vAlpha;
            varying vec3 vWorldPos;
            varying vec4 vRandom;
            varying float vProgress;
            varying float vRadius;
            varying float vLoopAlpha;

            ${ce.parsVert}
            ${Fe}

            void main() {
                vUv = uv;
                vGroupIndex = aGroupIndex;
                vAlpha = aProps.x;
                vProgress = aProps.y;
                vRandom = aRandom;

                ${ce.vert}
                
                float inProgress = aProps.z;
                float progress = aProps.y;
                float rolloverScale = aProps.w;

                float angle = aAngleRadius.x;
                float startRadius = aAngleRadius.y;
                float minRadius = aAngleRadius.z;
                float radius = startRadius;

                // TODO - particles falling into the center
                float repeatRadius = minRadius + (uEdgeRadius - minRadius) * 0.5;
                float timeOffsetRamp = map(uEdgeRadius - minRadius, 0.2, 0.8, 20.0, 3.0, true);
                float startFalling = (minRadius - radius) * timeOffsetRamp;
                float time = startFalling + uTime * 0.08 + 100.0 + uFallingSpeed;
                
                if (startRadius < repeatRadius) {
                    radius = mod(radius - time, repeatRadius);
                    float loopProgress = 1.0 - radius / repeatRadius;
                    vLoopAlpha = smoothstep(0.0, 0.05, loopProgress);
                    if (time < 0.0) vLoopAlpha = 1.0;
                } else {
                    vLoopAlpha = 1.0;
                }
                
                radius *= rolloverScale;

                float x = cos(angle) * radius;
                float y = sin(angle) * radius;
                float z = mix(-0.3, 0.0, aRandom.x);
                vec3 pos = vec3(x, y, z);
                vec3 startPos = pos * 1.2;
                vec3 finalPos = pos * 0.1;

                vec3 translation = mix(startPos, pos, inProgress);
                translation = mix(translation, finalPos, progress);
                
                vec4 worldPosition = modelMatrix * vec4(translation, 1.0);
                vec4 viewPosition = viewMatrix * worldPosition;

                vec3 scaledPosition = position * aScale;
                viewPosition.xyz += scaledPosition;

                gl_Position = projectionMatrix * viewPosition;

                vWorldPos = worldPosition.xyz;
                vRadius = radius;

                // If using instanceMatrix
                // gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
            }
        `,fs:`
            varying vec2 vUv;
            varying float vGroupInde3;
            varying float vAlpha;
            varying vec3 vWorldPos;
            varying vec4 vRandom;
            varying float vProgress;
            varying float vRadius;
            varying float vLoopAlpha;

            uniform vec3 uColorOverlay;
            uniform float uStaggerDur;
            uniform float uStartRange;
            uniform float uEdgeRadius;
            
            ${Xe}
            ${ft}
            ${vt}
            ${Fe}
            ${ce.parsFrag}

            void main() {
                vec3 color;
                vec3 white = vec3(1.0);
                
                ${ce.frag}
                
                color = sprite.rgb;
                color = mix(color, uColorOverlay, 0.1);
                color = blendOverlay(color, uColorOverlay, 0.5);

                float circle = circle(vUv, 1.0);

                float radiusAlpha = smoothstep(uEdgeRadius * 0.1, uEdgeRadius * 0.5, vRadius);
                float alpha = sprite.a * radiusAlpha * vAlpha * vLoopAlpha;// * smoothstep(0.8, 0.2, vProgress);
                
                float fogStr = smoothstep(0.3, -0.3, vWorldPos.z);
                vec3 fogColor = mix(color, white, 0.8);

                if (sprite.a < 0.2) discard;

                gl_FragColor = vec4(color, alpha);

                // vec3 red = vec3(1.0, 0.0, 0.0);
                // vec3 blue = vec3(0.0, 0.0, 1.0);
                // gl_FragColor = vec4(mix(red, blue, vLoopAlpha), 1.0);
                // gl_FragColor = sprite;
                // gl_FragColor = vec4(vUv, 1.0, 1.0);
                
                #include <colorspace_fragment>
            }
        `})},mt=({count:o=1e3,material:n}={})=>{const e=Pe([]),t=new ye,a=te();n=n||Ca();const{mesh:u,geo:c,createAttribute:l}=ut({count:o,material:n});Ie(u);const i=(()=>{const d=c.getAttribute("aPos"),m=c.getAttribute("aRandom"),v=l("aPos1",3),y=l("aPos2",3),x=l("aScale",1),z=l("aColor",3),w=l("aProps",4),R=l("aSprite",4),j=l("aTextureIndex",1);return{aPos:d,aRandom:m,aPos1:v,aPos2:y,aScale:x,aColor:z,aProps:w,aSprite:R,aTextureIndex:j}})(),p=rt().public.BASE_URL;ta({json:`${p}images/getty-spritesheets/generated/data-viz/metadata.json`,sheet1:`${p}images/getty-spritesheets/generated/data-viz/spritesheet_0@${Qe?"sm":"lg"}.webp#texture`,sheet2:`${p}images/getty-spritesheets/generated/data-viz/spritesheet_1@${Qe?"sm":"lg"}.webp#texture`},({data:d})=>{k(d)});const f=d=>{u.count=d,u.instanceMatrix.needsUpdate=!0;const{aColor:m,aRandom:v,aScale:y}=i;return e.value=new Array(d).fill().map((x,z)=>{t.setRGB(re(0,1),re(0,1),re(0,1)),m.setXYZ(z,t.r,t.g,t.b),v.setXYZW(z,re(0,1),re(0,1),re(0,1),re(0,1));const w=a.value?.025:.05,R=a.value?.06:.08,j=re(w,R);return y.setXY(z,j),{index:z,alpha:0,progress:0}}),v.needsUpdate=!0,y.needsUpdate=!0,m.needsUpdate=!0,e.value},P=(d,m=Vt)=>{d.colorSpace=m,d.needsUpdate=!0},k=d=>{const{aSprite:m,aTextureIndex:v}=c.attributes,{sheet1:y,sheet2:x,json:z}=d,w=z.spritesheets[0],R=z.spritesheets[0].sprites[0];P(y),P(x),n.uniforms.uSpriteSheet.value=[y,x],n.uniforms.uSheetSize.value.set(w.width,w.height),n.uniforms.uSpriteSize.value.set(R.x,R.y,R.width,R.height);const j=z.spritesheets.flatMap(E=>E.sprites);e.value.forEach(E=>{const Y=Math.floor(re(0,j.length)),J=j[Y];m.setXYZW(E.index,J.x,J.y,J.width,J.height),v.setX(E.index,J.sheetIndex)}),m.needsUpdate=!0,v.needsUpdate=!0},T=r("#c3b8ac");return pe(()=>{n.uniforms.uColorOverlay.value.set(T.value)}),{mesh:u,geo:c,material:n,attributes:i,createAttribute:l,setup:f,particles:e}};var Sa=`#ifndef FNC_TRANSFORM
#define FNC_TRANSFORM

vec3 transform(inout vec3 position, vec3 T, vec4 R, vec3 S) {
    
    position *= S;
    
    position += 2.0 * cross(R.xyz, cross(R.xyz, position) + R.w * position);
    
    position += T;
    
    return position;
}
#endif`;const Pa=()=>new Ne({options:{},uniforms:{uTime:0,uProgress:0,uOuterPr:1,uRadius:1,uAlphaDimmed:1,uColorOverlay:new ye,...ce.uniforms()},vs:`
            attribute vec3 aPos1;
            attribute vec3 aPos2;

            attribute vec4 aProps;
            attribute vec4 aRandom;
            attribute float aGroupIndex;
            attribute float aScale;
            
            uniform float uTime;
            uniform float uStartProgress;
            uniform float uProgress;
            uniform float uRadius;
            uniform float uOuterPr;

            varying vec2 vUv;
            varying float vGroupIndex;
            varying float vAlpha;
            varying vec3 vWorldPos;
            varying vec3 vLocalPos;
            varying float vIsOuter;
            varying vec4 vRandom;
            varying float vInProgress;

            ${ce.parsVert}
            ${Sa}

            void main() {
                vUv = uv;
                vGroupIndex = aGroupIndex;
                vAlpha = aProps.x;
                vInProgress = aProps.y;
                vRandom = aRandom;
                
                ${ce.vert}

                float inProgress = aProps.y;
                float outProgress = aProps.z;
                
                vec3 startPos = vec3(0.0);
                vec3 finalPos = aPos2;
                vec3 direction = normalize(aPos1);

                float dir = mix(-0.08, 0.08, vIsOuter);

                vec3 translation = mix(startPos, aPos1, inProgress);
                translation += direction * uOuterPr * dir;
                translation = mix(translation, translation * 1.1, outProgress);
                // translation.y += cos(uTime*mix(0.2, 0.4, aRandom.y) + aRandom.x) * mix(0.01, 0.02, aRandom.y);

                vec4 worldPosition = modelMatrix * vec4(translation, 1.0);

                vec3 scaledPosition = position * aScale;

                vec4 viewPosition = viewMatrix * worldPosition;
                viewPosition.xyz += scaledPosition;

                gl_Position = projectionMatrix * viewPosition;

                vWorldPos = worldPosition.xyz;
                vLocalPos = aPos1;
                vIsOuter = step(uRadius * 0.4, length(translation));

                // gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
            }
        `,fs:`
            varying vec2 vUv;
            varying float vGroupIndex;
            varying float vAlpha;
            varying vec3 vWorldPos;
            varying float vIsOuter;
            varying vec4 vRandom;
            varying float vInProgress;
            varying vec3 vLocalPos;

            uniform float uRadius;
            uniform float uOuterPr;
            uniform vec3 uColorOverlay;
            uniform float uAlphaDimmed;

            ${Xe}
            ${ft}
            ${vt}
            ${dt}
            ${ce.parsFrag}

            void main() {
                vec3 color;
                vec3 white = vec3(1.0);
                
                ${ce.frag}
                
                color = sprite.rgb;
                color = mix(color, uColorOverlay, 0.1);
                color = blendOverlay(color, uColorOverlay, 0.5);

                float inner = 1.0 - vIsOuter;
                float outerAlpha = mix(1.0, 0.1, uOuterPr);
                float innerAlpha = 1.0;
                float innerOuterAlpha = mix(innerAlpha, outerAlpha, vIsOuter);
                vec3 innerColor = color;

                float circle = circle(vUv, 1.0);
                float rectFill = rect(vUv, 0.95);

                float endAlpha = vRandom.x < 0.15 ? 1.0 : 0.0;
                float alpha = sprite.a * vAlpha * innerOuterAlpha * uAlphaDimmed;
                
                float fogStr = mix(0.0, smoothstep(uRadius * 0.5, -uRadius * 0.5, vWorldPos.z), smoothstep(0.5, 1.0, vInProgress));
                vec3 fogColor = mix(color, white, 0.9);
                color = mix(color, fogColor, fogStr);
                color = mix(color, innerColor, inner * uOuterPr);

                if (sprite.a < 0.2 || alpha < 0.01) discard;

                // gl_FragColor = sprite;
                gl_FragColor = vec4(color, alpha);
                
                // gl_FragColor.rgb = mix(color, sprite.rgb, sprite.a);
                // vec3 c = mix(vec3(0.0), vec3(1.0, 0.0, 0.0), vIsOuter);
                // gl_FragColor = vec4(c, 1.0);
                
                // gl_FragColor = vec4(vUv, 1.0, rectFill);
                
                #include <colorspace_fragment>
            }
        `}),at=40,ka={__name:"MiddleParticles",props:{dimParticles:{default:!1},introStart:{default:2},midStart:{default:4},endStart:{default:6},focusStart:{default:8},focusEnd:{default:10},outStart:{default:12},start:{default:0},segments:{default:3},rampRadius:{default:!1}},setup(o){const n=o,{clock:e}=it(),t=r(1),a=H(()=>(u.value,1500)),u=te(),c=H(()=>u.value?.9:1.2),l=r(0),s=Pe([]),i=Pe([]),b=Pe([]),p=mt({material:Pa(),count:a.value}),{object:f}=Ie(),{mesh:P,geo:k,material:T,particles:d}=p;f.add(P),ee(()=>{window.mesh=P});const m=()=>{const M=p.setup(a.value),{aPos1:_,aPos2:I}=k.attributes;M.forEach((C,F)=>{const D=wa(c.value);_.setXYZW(F,D.x,D.y,D.z),C.alphaDimmed=1,C.radius=D.r,C.angle=D.a,C.inProgress=0,C.outProgress=0});const g=75,O=g,G=75,U=O+G,Z=100;s.value=M.filter((C,F)=>ve(F,0,g)),i.value=M.filter((C,F)=>ve(F,O,O+G)),b.value=M.filter((C,F)=>ve(F,U,U+Z)),_.needsUpdate=!0,I.needsUpdate=!0,v(),J()},v=()=>{const{aProps:M}=k.attributes;d.value.forEach(_=>{const I=_.alpha*_.alphaDimmed;M.setXYZW(_.index,I,_.inProgress,_.outProgress,0)}),M.needsUpdate=!0},y=()=>{P.visible=Y.value},x=M=>{const _=M?.1:1;S.killTweensOf(T.uniforms.uAlphaDimmed),S.to(T.uniforms.uAlphaDimmed,{value:M?.05:1,duration:_,ease:"power3.out"})},z=()=>{v()};let w;const R=()=>{w==null||w.kill(),w=S.timeline({paused:!1,onUpdate:z});const M=n.introStart,_=0,I=n.midStart-M,g=n.endStart-M,O=n.focusStart-M,G=n.focusEnd-M,U=n.outStart-M,Z=s.value,C=[...Z,...i.value],F=d.value.filter(X=>!C.includes(X)),D="power2.inOut";return w.fromTo(s.value,{inProgress:0,alpha:0},{inProgress:.15,alpha:1,duration:1.2,ease:D,stagger:.01},_),w.fromTo(i.value,{inProgress:.15,alpha:0},{inProgress:.3,alpha:1,duration:1.5,ease:D,stagger:.01},I),w.to(Z,{inProgress:.3,duration:1.5,ease:D,stagger:.01},I),w.fromTo(F,{inProgress:.2,alpha:0},{inProgress:1,alpha:1,duration:1.5,ease:D,stagger:25e-5},g),w.to(C,{inProgress:1,duration:1.5,ease:D,stagger:.001},g),w.fromTo(T.uniforms.uOuterPr,{value:0},{value:1,duration:1.5,ease:D},O),w.to(T.uniforms.uOuterPr,{value:0,duration:1.5,ease:D},G),w.to(d.value,{alpha:0,outProgress:1,duration:1,ease:D,stagger:2e-4},U),w.add(Ae,at),w},j=()=>{T.uniforms.uProgress.value=l.value,T.uniforms.uRadius.value=c.value},E=he("window"),{active:Y,init:J}=ge(E,{manual:!0,start:n.introStart,end:n.introStart+at,animation:R,onUpdate:M=>{}});return Re(({velocity:M,direction:_})=>{f.rotation.y+=M*25e-5,_&&(t.value=_)}),nt(Y,()=>{T.uniforms.uTime.value+=e.delta,f.rotation.y+=t.value*4e-4}),N([()=>n.segments,a],m),pe(j),pe(y),N(()=>n.dimParticles,x),ee(()=>{m()}),Ge([{name:"uProgress",value:l,options:{min:0,max:1,step:.01}},{options:{min:0,max:1,step:.01}},{name:"count",value:a,options:{min:100,max:1e3,step:20}},{name:"radius",value:c,options:{min:.1,max:4,step:.01}}],{title:"Particles",expanded:!1}),(M,_)=>xe(M.$slots,"default",{},void 0,!0)}},Aa=V(ka,[["__scopeId","data-v-69d27493"]]),Ma=["onClick","onMouseenter"],Ta={class:"item__text textLabelL"},Ra={class:"item__role textCreditsM"},Ia={__name:"SegmentInfos",props:{list:{default:[]},radius:{default:1.2},active:{default:!1},activeIndex:{default:-1},startAngle:{default:-90}},emits:["activeIndex"],setup(o,{emit:n}){const e=o,t=Pe([]),a=e.list.length,u=te(),c=We(),l=H(()=>e.radius*c.height*(u.value?.29:.27));ee(()=>{p(),i()});const s=H(()=>{const d=c.width/2,m=c.height/2;return e.list.map((y,x)=>{const z=x/a,w=we(z,0,360)+e.startAngle,R=pt(d,m,l.value,w);return{x:R.x,y:R.y,align:w==-90||w==90?"center":w>90?"right":"left"}})}),i=()=>{S.killTweensOf(t.value),e.active?S.to(t.value,{alpha:1,ease:"sine.out",stagger:.02}):S.to(t.value,{alpha:0,duration:.25,ease:"power2.in"})},b=d=>{if(!e.active)return;S.killTweensOf(t.value);const m=d==-1?1:.1;t.value.forEach((v,y)=>{const z=d!==-1&&d!==y?.1:1;S.set(v,{alpha:z,duration:m,ease:"power3.out"})})},p=()=>{t.value.forEach((d,m)=>{const{x:v,y,align:x}=s.value[m];S.set(d,{left:v,top:y}),S.set(d,{xPercent:x=="center"?-50:x=="left"?0:-100}),d.style.textAlign=x})},f=(d,m)=>{m.stopPropagation(),u.value&&T("activeIndex",d)},P=d=>{u.value||T("activeIndex",d)},k=()=>{u.value||T("activeIndex",-1)};N(s,p),N(()=>e.active,i),N(()=>e.activeIndex,b);const T=n;return(d,m)=>(A(),W("div",{class:ne(["segmentInfos",{active:o.active}])},[(A(!0),W(fe,null,me(o.list,(v,y)=>(A(),W("div",{class:"segmentInfos__item item",ref_for:!0,ref_key:"refInfos",ref:t,key:y,onClick:x=>f(y,x),onMouseenter:x=>P(y),onMouseleave:k},[B("p",Ta,K(v.text),1),B("p",Ra,K(v.subtext),1)],40,Ma))),128))],2))}},ht=V(Ia,[["__scopeId","data-v-6164bef7"]]),Ba={__name:"SegmentNumbers",props:{list:{default:[]},radius:{default:1.2},active:{default:!1},activeIndex:{default:-1},startAngle:{default:-90}},emits:["activeIndex"],setup(o,{emit:n}){const e=o,t=r(null),a=H(()=>{var m;return(m=t.value)==null?void 0:m.map(v=>v.root)}),u=e.list.length,c=te(),l=We(),s=H(()=>e.radius*l.height*(c.value?.29:.27));ee(()=>{f(),b()});const i=H(()=>{const m=l.width/2,v=l.height/2;return e.list.map((x,z)=>{const w=z/u,R=we(w,0,360)+e.startAngle;return pt(m,v,s.value,R)})}),b=()=>{S.killTweensOf(a.value),e.active?S.to(a.value,{alpha:1,ease:"sine.out",stagger:.02}):S.to(a.value,{alpha:0,duration:.25,ease:"power2.in"})},p=m=>{if(!e.active)return;S.killTweensOf(a.value);const v=m==-1?1:.1;a.value.forEach((y,x)=>{const w=m!==-1&&m!==x?.1:1;S.set(y,{alpha:w,duration:v,ease:"power3.out"})})},f=()=>{t.value.forEach((m,v)=>{const{x:y,y:x}=i.value[v];S.set(m.root,{left:y,top:x})})},P=(m,v)=>{v.stopPropagation(),c.value&&d("activeIndex",m)},k=m=>{c.value||d("activeIndex",m)},T=()=>{c.value||d("activeIndex",-1)};N(i,f),N(()=>e.active,b),N(()=>e.activeIndex,p);const d=n;return(m,v)=>(A(),W("div",{class:ne(["segmentNumbers",{active:o.active}])},[(A(!0),W(fe,null,me(o.list,(y,x)=>(A(),Q(Ze,{ref_for:!0,ref_key:"refNumbers",ref:t,class:"number",active:o.activeIndex===x,index:x+1,key:x,onClick:z=>P(x,z),onMouseenter:z=>k(x),onMouseleave:T},null,8,["active","index","onClick","onMouseenter"]))),128))],2))}},gt=V(Ba,[["__scopeId","data-v-ee6b9128"]]),za={__name:"SegmentParticles",props:{start:{default:0},end:{default:3},segments:{default:10},activeIndex:{default:-1},radius:{default:1.2},rampRadius:{default:!1},count:{default:1e3}},setup(o,{expose:n}){const e=o,{clock:t}=it(),a=r(e.count),u=r(e.radius),c=te(),l=mt({count:e.count}),s=Array.from({length:e.segments},(_,I)=>({alphaDimmed:1,rolloverScale:1})),{mesh:i,geo:b,material:p,particles:f,createAttribute:P}=l,k=P("aAngleRadius",3),T=(_,I,g)=>{const O=_/I,G=we(O,0,-360)+90,U=e.rampRadius?g*we(O,.5,.9):c.value?.4:.8,X=(360-10*I)/I/2;return{pos:Kt({start:U,end:g},{start:G-X,end:G+X}),minRadius:U}},d=()=>{l.setup(e.count).forEach((I,g)=>{const O=g%e.segments,{pos:G,minRadius:U}=T(O,e.segments,e.radius);k.setXYZ(g,G.a,G.r,U),I.alphaDimmed=1,I.segmentIndex=O,I.radius=G.r,I.angle=G.a,I.inProgress=0}),k.needsUpdate=!0,m(),M()},m=()=>{const{aProps:_}=b.attributes;f.value.forEach(I=>{const{alphaDimmed:g,rolloverScale:O}=s[I.segmentIndex],G=I.alpha*g;_.setXYZW(I.index,G,I.progress,I.inProgress,O)}),_.needsUpdate=!0},v=()=>{i.visible=J.value};let y;const x=_=>{y==null||y.kill(),y=S.timeline({onUpdate:m});const I=_==-1?1.2:.1;s.forEach((g,O)=>{S.killTweensOf(g);const G=O===_,Z=_!==-1&&!G?.05:1,C=_===-1?1:G?1.05:.97;y.to(g,{alphaDimmed:Z,duration:I,ease:"sine.out"},0),y.to(g,{rolloverScale:C,duration:1.5,ease:"power3.out"},0)})},z=()=>{m()},w=r(!1);N(w,_=>{});let R;const j=()=>{R==null||R.kill(),R=S.timeline({paused:!1,onUpdate:z});const _=e.end-e.start,I=f.value.slice().sort((Z,C)=>Z.radius-C.radius),g=.5,O=_-1,G=O,U=8e-4;return R.fromTo(f.value,{inProgress:0,alpha:0},{inProgress:1,alpha:1,duration:1,ease:"power3.out",stagger:U}),R.fromTo(I,{progress:0},{progress:1,duration:1,ease:"power2.inOut",stagger:U},O),R.to(I,{alpha:0,duration:.6,ease:"power2.inOut",stagger:U},O+.1),R.add(()=>w.value=!1,g),R.add(()=>w.value=!0,G),R.add(Ae,_),R},E=()=>{p.uniforms.uEdgeRadius.value=e.radius},Y=he("window"),{active:J,init:M}=ge(Y,{manual:!0,start:e.start,end:e.end,animation:j,onUpdate:_=>{}});return nt(J,()=>{p.uniforms.uTime.value+=t.delta}),Re(({velocity:_})=>{p.uniforms.uFallingSpeed.value+=Math.abs(_*5e-4)}),N(()=>[e.segments,e.radius,a.value,e.count],d),pe(E),N(()=>e.activeIndex,x),pe(v),ee(()=>{d()}),n({showUI:w}),Ge([{options:{min:0,max:1,step:.01}},{name:"count",value:a,options:{min:100,max:1e3,step:20}},{name:"uEdgeRadius",value:u,options:{min:.1,max:4,step:.01}}],{title:"Particles",expanded:!1}),(_,I)=>xe(_.$slots,"default",{},void 0,!0)}},bt=V(za,[["__scopeId","data-v-9cbc23a2"]]),La={class:"textListItem__inner"},Ea={class:"textListItem__text"},Oa={class:"textListItem__text textLabelL"},Da={key:0,class:"textListItem__subtext textCreditsS"},Fa={__name:"TextListItem",props:{index:Number,text:String,dimmed:Boolean,active:Boolean,subtext:String},emits:["enter","leave"],setup(o,{expose:n,emit:e}){const t=o,a=r(null),u=()=>{l("enter",t.index)},c=()=>{l("leave",t.index)},l=e;return n({root:a}),(s,i)=>(A(),W("li",{ref_key:"refRoot",ref:a,class:ne(["textListItem",{active:o.active,dimmed:o.dimmed}]),onMouseenter:u,onMouseleave:c},[B("div",La,[L(Ze,{index:o.index,active:o.active},null,8,["index","active"]),B("div",Ea,[B("span",Oa,K(o.text),1),o.subtext?(A(),W("span",Da,K(o.subtext),1)):Te("",!0)])])],34))}},Wa=V(Fa,[["__scopeId","data-v-f22b6c9f"]]),Ga={__name:"TextList",props:{list:Array,active:Boolean,interactive:{default:!0},showNumbers:{default:!0},activeIndex:{default:-1}},emits:["activeIndex"],setup(o,{emit:n}){const e=o,t=r(null),a=r(null),u=H(()=>{var s;return(s=a.value)==null?void 0:s.map(i=>i.root)});ee(()=>{S.set(u.value,{x:50,alpha:0})}),N(()=>e.active,s=>{S.killTweensOf(u.value),s?S.to(u.value,{x:0,alpha:1,ease:"power3.out",duration:1,stagger:.03}):S.to(u.value,{x:50,alpha:0,ease:"power2.in",duration:.5,stagger:.02})});const l=n;return(s,i)=>(A(),W("ul",{ref_key:"refRoot",ref:t,class:ne(["textList",{active:o.active,interactive:o.interactive,showNumbers:o.showNumbers}])},[xe(s.$slots,"header",{},void 0,!0),(A(!0),W(fe,null,me(o.list,(b,p)=>(A(),Q(Wa,ot({ref_for:!0,ref_key:"refItems",ref:a,key:b.text,index:p+1,active:p===o.activeIndex,dimmed:o.activeIndex!==-1&&p!==o.activeIndex},b,{onClick:i[0]||(i[0]=f=>f.stopPropagation()),onEnter:f=>l("activeIndex",p),onLeave:i[1]||(i[1]=f=>l("activeIndex",-1))}),null,16,["index","active","dimmed","onEnter"]))),128)),xe(s.$slots,"footer",{},void 0,!0)],2))}},qe=V(Ga,[["__scopeId","data-v-b234ef77"]]),Na={class:"step2"},$a={__name:"Step2",props:{start:{default:0},end:{default:5}},emits:["highlight"],setup(o,{emit:n}){const e=o,t=$.section3.step2List,a=te(),u=H(()=>a.value?.8:1.7),c=H(()=>a.value?500:1e3),l=r(null),s=r(-1),i=he("window"),{active:b}=ge(i,{start:e.start+.5,end:e.end-1,onActive:f=>{f||(s.value=-1)}});Ve(i,"click",()=>{b.value&&s.value>-1&&(s.value=-1)});const p=n;return N(s,f=>{p("highlight",f>-1)}),(f,P)=>(A(),W("div",Na,[h(a)?(A(),Q(qe,{key:0,ref_key:"refList",ref:l,class:"stepList",list:h(t),active:h(b),activeIndex:s.value,onActiveIndex:P[0]||(P[0]=k=>s.value=k)},null,8,["list","active","activeIndex"])):Te("",!0),h(a)?(A(),Q(gt,{key:1,ref:"refNumbers",list:h(t),radius:u.value,active:h(b),activeIndex:s.value,onActiveIndex:P[1]||(P[1]=k=>s.value=k)},null,8,["list","radius","active","activeIndex"])):(A(),Q(ht,{key:2,ref:"refInfos",list:h(t),radius:u.value,active:h(b),activeIndex:s.value,onActiveIndex:P[2]||(P[2]=k=>s.value=k)},null,8,["list","radius","active","activeIndex"])),L(bt,{start:o.start,end:o.end,segments:h(t).length,radius:u.value,activeIndex:s.value,count:c.value,rampRadius:!0},null,8,["start","end","segments","radius","activeIndex","count"])]))}},Ua=V($a,[["__scopeId","data-v-6d6c30a8"]]),ja={class:"step3"},Ja={__name:"Step3",props:{start:{default:0},end:{default:5}},emits:["highlight"],setup(o,{emit:n}){const e=o,t=$.section3.step3List,a=te(),u=H(()=>a.value?.8:1.7),c=H(()=>a.value?750:1500),l=r(null),s=r(null),i=r(-1),b=he("window"),{active:p}=ge(b,{start:e.start+.5,end:e.end-1,onActive:P=>{P||(i.value=-1)}});Ve(b,"click",()=>{p.value&&i.value>-1&&(i.value=-1)});const f=n;return N(i,P=>{f("highlight",P>-1)}),(P,k)=>(A(),W("div",ja,[h(a)?(A(),Q(qe,{key:0,ref_key:"refList",ref:s,class:"stepList",list:h(t),active:h(p),activeIndex:i.value,onActiveIndex:k[0]||(k[0]=T=>i.value=T)},null,8,["list","active","activeIndex"])):Te("",!0),h(a)?(A(),Q(gt,{key:1,ref_key:"refNumbers",ref:l,list:h(t),radius:u.value,active:h(p),activeIndex:i.value,onActiveIndex:k[1]||(k[1]=T=>i.value=T)},null,8,["list","radius","active","activeIndex"])):(A(),Q(ht,{key:2,ref:"refInfos",list:h(t),radius:u.value,active:h(p),activeIndex:i.value,onActiveIndex:k[2]||(k[2]=T=>i.value=T)},null,8,["list","radius","active","activeIndex"])),L(bt,{start:o.start,end:o.end,segments:h(t).length,radius:u.value,count:c.value,activeIndex:i.value},null,8,["start","end","segments","radius","count","activeIndex"])]))}},Ha=V(Ja,[["__scopeId","data-v-f2cca7c8"]]),Ya={setup(){return{}}},Va={class:"ellipsis"};function Za(o,n,e,t,a,u){return A(),W("div",Va,[(A(),W(fe,null,me(3,c=>B("span",{class:"ellipsis__circle",key:c})),64))])}const _t=V(Ya,[["render",Za],["__scopeId","data-v-8b9bbc83"]]),Xa={class:"pullUpMenu__title textCreditsS"},qa={class:"pullUpMenu__items"},Ka={class:"pullUpMenu__inner"},Qa={class:"pullUpMenu__text"},eo={class:"pullUpMenu__text textLabelL"},to={key:0,class:"pullUpMenu__subtext textCreditsS"},ao={__name:"PullUpMenu",props:{list:Array,active:Boolean},emits:["activeIndex"],setup(o,{emit:n}){const e=o,t=r(null),a=r(null);return ee(()=>{S.set(t.value,{y:"100%"})}),N(()=>e.active,c=>{S.killTweensOf(t.value),S.to(t.value,{y:c?0:"100%",ease:"power2.out",duration:.6})}),(c,l)=>(A(),W("ul",{ref_key:"refRoot",ref:t,class:ne(["pullUpMenu blurredBg",{active:o.active}]),"data-lenis-prevent":""},[l[0]||(l[0]=B("div",{class:"pullUpMenu__tab"},null,-1)),B("p",Xa,K(h($).section3.titleListMobile),1),l[1]||(l[1]=B("hr",{class:"pullUpMenu__separator"},null,-1)),B("ul",qa,[(A(!0),W(fe,null,me(o.list,s=>(A(),W("li",{ref_for:!0,ref_key:"refItems",ref:a,class:"pullUpMenu__inner",key:s.text},[B("div",Ka,[B("div",Qa,[B("span",eo,K(s.text),1),s.subtext?(A(),W("span",to,K(s.subtext),1)):Te("",!0)])])]))),128)),L(_t)])],2))}},oo=V(ao,[["__scopeId","data-v-c4312a30"]]),ro={class:"step4__listHeader"},no={class:"step4__listTitle textCreditsS"},so={class:"step4__listEllipsis"},io={__name:"Step4",props:{start:{default:0},end:{default:5}},setup(o){const n=o,e=$.section3.step4List,t=te(),a=r(null),u=r(null),c=r(!1),l=b=>{b.stopPropagation(),c.value=!0},s=he("window"),{active:i}=ge(s,{start:n.start+.5,end:n.end,onActive:b=>{b||(c.value=!1)}});return Ve(s,"click",()=>{c.value=!1}),(b,p)=>(A(),W("div",{class:ne(["step4",{showUi:h(i),pullupActive:c.value}])},[h(t)?(A(),Q(oo,{key:0,list:h(e),active:c.value},null,8,["list","active"])):(A(),Q(qe,{key:1,ref_key:"refList",ref:a,class:"stepList",list:h(e),active:h(i),interactive:!1,showNumbers:!1},{header:ke(()=>[B("li",ro,[B("p",no,K(h($).section3.titleListDesktop),1),p[0]||(p[0]=B("hr",{class:"step4__listSeparator"},null,-1))])]),footer:ke(()=>[B("li",so,[L(_t)])]),_:1},8,["list","active"])),h(t)?(A(),Q(Ze,{key:2,ref_key:"refNumber",ref:u,active:c.value,index:"i",onClick:l},null,8,["active"])):Te("",!0)],2))}},lo=V(io,[["__scopeId","data-v-3e27b331"]]),co=(o,n={})=>{ee(()=>{Object.keys(n).forEach(e=>{n[e].value&&o.value.classList.add(e)})}),Object.keys(n).forEach(e=>{const t=n[e];N(t,a=>{o.value.classList.toggle(e,a)})})},uo={class:"textBlocks"},po={__name:"Section3",props:{start:{type:Number,default:0}},setup(o,{expose:n}){const e=o,t=he("window"),a=r(null),u=r(null),c=r(null),l=r(null),s=r([]),i=r(null),b=r([]),p=r(null),f=r(!1),P=r(!1),k=r(!1),T=He(),d=te(),m=r(!1);co(i,{active:P});const v=e.start,y=v+0,x=y+7,z=x+4,w=z+2,R=w+3,j=R+3,E=j+5,Y=E+8,J=Y+.8,M=J+2.3,_=y+.25,I=x+.25,g=z+.25,O=_-1,G=I-1.5,U=g-1.5,Z=M+.8,C={repelRadius:7,cameraDist:5},F=[{text:$.section3.description1,start:v,duration:2},{text:$.section3.description2,start:v+2,duration:2},{text:$.section3.description3,start:y+4},{text:$.section3.description4,start:x},{text:$.section3.description5,start:w+.5},{text:$.section3.description6,start:R+.5},{text:$.section3.description7,start:j+1.5},{text:$.section3.description8,start:E+1},{text:$.section3.description9,start:E+4}],D={text:$.section3.description10,start:J+.5};ee(()=>{a.value.cameraMotion=.5,be(0),d.value&&(u.value.object.position.y=.2)});const se=Re(()=>{var q;const oe=se.velocity*(d.value?.003:.002);(q=l.value)==null||q.setScroll(oe)}),ae=()=>{var Ce,Le;const oe=j-e.start,q=oe+1.2,le=E-e.start,_e=Y-e.start,Be=J-e.start,ze=M-e.start,de=S.timeline().add((Ce=c.value)==null?void 0:Ce.animateIn(),q).fromTo(C,{cameraDist:5},{cameraDist:6.5,duration:3,ease:"power3.inOut"},oe);d.value||de.fromTo(u.value.object.position,{x:0},{x:1.8,duration:3,ease:"power3.inOut"},le),de.to(C,{cameraDist:5,duration:3,ease:"power3.inOut"},_e).set(u.value.object.position,{x:0,z:0,ease:"power3.inOut"},_e+3).add((Le=c.value)==null?void 0:Le.animateOut(),_e);const $e=d.value?.8:1.3,Me=d.value?2:2.5;return de.fromTo(C,{repelRadius:7},{repelRadius:$e,duration:1,ease:"power2.out"},Be).to(C,{repelRadius:Me,duration:1.5,ease:"power2.inOut"},ze),de.add(Ae,Ee.height),de},be=oe=>{var Be,ze;T.setSection3Progress(oe);const q=oe*Ee.height;(Be=l.value)==null||Be.setRepelRadius(C.repelRadius),s.value.forEach((de,$e)=>{const Me=F[$e],Ce=Me.start-e.start,Le=Me.duration||3,Ke=Ce+Le,xt=De(q,Ce,Ke,0,1,!0);de.setProgress(xt),Me.active=ve(q,Ce,Ke)}),P.value=F.some(de=>de.active);const le=D.start-e.start,_e=De(q,le,le+2.5,0,1,!0);(ze=p.value)==null||ze.setProgress(_e),k.value=ve(_e,0,1),m.value=q<J+.5-e.start,a.value.setCameraDistance(C.cameraDist)},ie=H(()=>ue.value||yt.value>0),{active:ue,progress:yt}=ge(t,{start:e.start-.01,end:e.start+Ee.height,animation:ae,onUpdate:be});return N(ie,oe=>{oe&&a.value.render({force:!0})}),N(k,oe=>T.collageActive=oe),n({}),(oe,q)=>(A(),W("div",{class:ne(["section3",{active:h(ie),highlightGroup:h(f)}])},[L(Ye,{ref_key:"refScene",ref:a,active:h(ie),lookAtCenter:h(m),id:h(Ee).id},{default:ke(()=>[L(h(Qt),{ref_key:"refObject",ref:u},{default:ke(()=>[L(Ua,{start:y,end:I,onHighlight:q[0]||(q[0]=le=>f.value=le)}),L(Ha,{start:x,end:g,onHighlight:q[1]||(q[1]=le=>f.value=le)}),L(lo,{start:w,end:w+3},null,8,["end"]),L(Aa,{introStart:O,midStart:G,endStart:U,focusStart:w,focusEnd:R,outStart:Y,dimParticles:h(f)},null,8,["dimParticles"]),L(xa,{ref_key:"refBlankCanvases",ref:c},null,512),B("div",uo,[(A(),W(fe,null,me(F,(le,_e)=>B("div",{ref_for:!0,ref_key:"textBlockWrappers",ref:b,class:"textBlockWrapper",key:_e},[L(Oe,{ref_for:!0,ref_key:"refTextBlocks",ref:s,text:le.text,class:"textBlock textBodyS"},null,8,["text"])])),64)),B("div",{ref_key:"refTextBlockBg",ref:i,class:"textBlockBg"},null,512)]),L(Oe,{ref_key:"refFinalText",ref:p,class:"finalText textBodyS",text:D.text,inDelay:0},null,8,["text"])]),_:1},512),L(lt,{ref_key:"refCollage",ref:l,active:h(ie),assets:h(ct),folder:"world-of-gpi"},null,8,["active","assets"]),L(Et,{start:Z})]),_:1},8,["active","lookAtCenter","id"])],2))}},To=V(po,[["__scopeId","data-v-ca7ba082"]]);export{Ao as S,Mo as a,To as b};
