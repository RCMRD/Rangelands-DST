Ext.define("Ext.chart.series.Line",{extend:"Ext.chart.series.Cartesian",alternateClassName:["Ext.chart.LineSeries","Ext.chart.LineChart"],requires:["Ext.chart.axis.Axis","Ext.chart.Shape","Ext.draw.Draw","Ext.fx.Anim"],type:"line",alias:"series.line",selectionTolerance:20,showMarkers:!0,markerConfig:{},style:{},smooth:!1,defaultSmoothness:3,fill:!1,constructor:function(n){this.callParent(arguments);var t=this,r=t.chart.surface,f=t.chart.shadow,i,u;if(n.highlightCfg=Ext.Object.merge({"stroke-width":3},n.highlightCfg),Ext.apply(t,n,{shadowAttributes:[{"stroke-width":6,"stroke-opacity":.05,stroke:"rgb(0, 0, 0)",translate:{x:1,y:1}},{"stroke-width":4,"stroke-opacity":.1,stroke:"rgb(0, 0, 0)",translate:{x:1,y:1}},{"stroke-width":2,"stroke-opacity":.15,stroke:"rgb(0, 0, 0)",translate:{x:1,y:1}}]}),t.group=r.getGroup(t.seriesId),t.showMarkers&&(t.markerGroup=r.getGroup(t.seriesId+"-markers")),f)for(i=0,u=t.shadowAttributes.length;i<u;i++)t.shadowGroups.push(r.getGroup(t.seriesId+"-shadows"+i))},shrink:function(n,t,i){for(var o=n.length,u=Math.floor(o/i),r=1,f=0,e=0,s=[+n[0]],h=[+t[0]];r<o;++r)f+=+n[r]||0,e+=+t[r]||0,r%u==0&&(s.push(f/u),h.push(e/u),f=0,e=0);return{x:s,y:h}},drawSeries:function(){var n=this,a=n.chart,k=a.axes,b=a.getChartStore(),ki=b.data.items,wt,vt=b.getCount(),bt=n.chart.surface,r={},fi=n.group,kt=n.showMarkers,s=n.markerGroup,dt=a.shadow,di=n.shadowGroups,cr=n.shadowAttributes,gt=n.smooth,tt=di.length,d=["M"],h=["M"],it=["M"],gi=["M"],nr=a.markerIndex,wr=[].concat(n.axis),ni,et=[],ei={},ti=[],oi=!1,tr=[],lr=Ext.apply({},n.markerStyle),ar=n.seriesStyle,rt=n.colorArrayStyle,ii=rt&&rt.length||0,vr=Ext.isNumber,br=n.seriesIdx,ir=n.getAxesForXAndYFields(),ot=ir.xAxis,st=ir.yAxis,yr=ot?k.get(ot).type:"",pr=st?k.get(st).type:"",c,ht,yt,pt,rr,si,l,p,g,ur,fr,hi,ci,li,t,f,nt,w,ct,y,ai,o,e,u,vi,yi,pi,ut,wi,ft,bi,lt,er,at,i,or,v,sr,ri,ui,hr;if(n.fireEvent("beforedraw",n)!==!1){if(!vt||n.seriesIsHidden){if(n.hide(),n.items=[],n.line){if(n.line.hide(!0),n.line.shadows)for(c=n.line.shadows,f=0,tt=c.length;f<tt;f++)ht=c[f],ht.hide(!0);n.fillPath&&n.fillPath.hide(!0)}n.line=null;n.fillPath=null;return}if(at=Ext.apply(lr||{},n.markerConfig,{fill:n.seriesStyle.fill||rt[n.themeIdx%rt.length]}),or=at.type,delete at.type,i=ar,i["stroke-width"]||(i["stroke-width"]=.5),sr="opacity"in i?i.opacity:1,hr="opacity"in i?i.opacity:.3,ri="lineOpacity"in i?i.lineOpacity:sr,ui="fillOpacity"in i?i.fillOpacity:hr,nr&&s&&s.getCount())for(t=0;t<nr;t++)y=s.getAt(t),s.remove(y),s.add(y),ai=s.getAt(s.getCount()-2),y.setAttributes({x:0,y:0,translate:{x:ai.attr.translation.x,y:ai.attr.translation.y}},!0);for(n.unHighlightItem(),n.cleanHighlights(),n.setBBox(),r=n.bbox,n.clipRect=[r.x,r.y,r.width,r.height],(w=k.get(ot))&&(ct=w.applyData(),ut=ct.from,wi=ct.to),(w=k.get(st))&&(ct=w.applyData(),ft=ct.from,bi=ct.to),n.xField&&!Ext.isNumber(ut)&&(w=n.getMinMaxXValues(),ut=w[0],wi=w[1]),n.yField&&!Ext.isNumber(ft)&&(w=n.getMinMaxYValues(),ft=w[0],bi=w[1]),isNaN(ut)?(ut=0,yi=r.width/(vt-1||1)):yi=r.width/(wi-ut||vt-1||1),isNaN(ft)?(ft=0,pi=r.height/(vt-1||1)):pi=r.height/(bi-ft||vt-1||1),t=0,nt=ki.length;t<nt;t++){if(wt=ki[t],e=wt.get(n.xField),yr=="Time"&&typeof e=="string"&&(e=Date.parse(e)),(typeof e=="string"||typeof e=="object"&&!Ext.isDate(e)||ot&&k.get(ot)&&k.get(ot).type=="Category")&&(e=e in ei?ei[e]:ei[e]=t),u=wt.get(n.yField),pr=="Time"&&typeof u=="string"&&(u=Date.parse(u)),typeof u=="undefined"||typeof u=="string"&&!u){Ext.isDefined(Ext.global.console)&&Ext.global.console.warn("[Ext.chart.series.Line]  Skipping a store element with an undefined value at ",wt,e,u);continue}(typeof u=="string"||typeof u=="object"&&!Ext.isDate(u)||st&&k.get(st)&&k.get(st).type=="Category")&&(u=t);tr.push(t);et.push(e);ti.push(u)}for(nt=et.length,nt>r.width&&(vi=n.shrink(et,ti,r.width),et=vi.x,ti=vi.y),n.items=[],v=0,nt=et.length,t=0;t<nt;t++){if(e=et[t],u=ti[t],u===!1){h.length==1&&(h=[]);oi=!0;n.items.push(!1);continue}else p=(r.x+(e-ut)*yi).toFixed(2),g=(r.y+r.height-(u-ft)*pi).toFixed(2),oi&&(oi=!1,h.push("M")),h=h.concat([p,g]);if(typeof ci=="undefined"&&typeof g!="undefined"&&(ci=g,hi=p),(!n.line||a.resizing)&&(d=d.concat([p,r.y+r.height/2])),a.animate&&a.resizing&&n.line&&(n.line.setAttributes({path:d,opacity:ri},!0),n.fillPath&&n.fillPath.setAttributes({path:d,opacity:ui},!0),n.line.shadows))for(c=n.line.shadows,f=0,tt=c.length;f<tt;f++)ht=c[f],ht.setAttributes({path:d},!0);kt&&(y=s.getAt(v++),y?(y.setAttributes({value:'"'+e+", "+u+'"',x:0,y:0,hidden:!1},!0),y._to={translate:{x:+p,y:+g}}):(y=Ext.chart.Shape[or](bt,Ext.apply({group:[fi,s],x:0,y:0,translate:{x:+(ur||p),y:fr||r.y+r.height/2},value:'"'+e+", "+u+'"',zIndex:4e3},at)),y._to={translate:{x:+p,y:+g}}));n.items.push({series:n,value:[e,u],point:[p,g],sprite:y,storeItem:b.getAt(tr[t])});ur=p;fr=g}if(!(h.length<=1)){if(n.smooth&&(gi=Ext.draw.Draw.smooth(h,vr(gt)?gt:n.defaultSmoothness)),it=gt?gi:h,a.markerIndex&&n.previousPath?(pt=n.previousPath,gt||Ext.Array.erase(pt,1,2)):pt=h,!n.line&&(n.line=bt.add(Ext.apply({type:"path",group:fi,path:d,stroke:i.stroke||i.fill},i||{})),n,n.line.setAttributes({opacity:ri},!0),dt&&n.line.setAttributes(Ext.apply({},n.shadowOptions),!0),n.line.setAttributes({fill:"none",zIndex:3e3}),!i.stroke&&ii&&n.line.setAttributes({stroke:rt[n.themeIdx%ii]},!0),dt))for(c=n.line.shadows=[],yt=0;yt<tt;yt++)ni=cr[yt],ni=Ext.apply({},ni,{path:d}),ht=bt.add(Ext.apply({},{type:"path",group:di[yt]},ni)),c.push(ht);if(n.fill&&(si=it.concat([["L",p,r.y+r.height],["L",hi,r.y+r.height],["L",hi,ci]]),n.fillPath||(n.fillPath=bt.add({group:fi,type:"path",fill:i.fill||rt[n.themeIdx%ii],path:d}))),li=kt&&s.getCount(),a.animate){if(rr=n.fill,lt=n.line,l=n.renderer(lt,!1,{path:it},t,b),Ext.apply(l,i||{},{stroke:i.stroke||i.fill}),delete l.fill,lt.show(!0),n.animation=a.markerIndex&&n.previousPath?er=n.onAnimate(lt,{to:l,from:{path:pt}}):er=n.onAnimate(lt,{to:l}),dt)for(c=lt.shadows,f=0;f<tt;f++)if(c[f].show(!0),a.markerIndex&&n.previousPath)n.onAnimate(c[f],{to:{path:it},from:{path:pt}});else n.onAnimate(c[f],{to:{path:it}});if(rr){n.fillPath.show(!0);n.onAnimate(n.fillPath,{to:Ext.apply({},{path:si,fill:i.fill||rt[n.themeIdx%ii],"stroke-width":0,opacity:ui},i||{})})}if(kt){for(v=0,t=0;t<nt;t++)if(n.items[t]&&(o=s.getAt(v++),o)){l=n.renderer(o,b.getAt(t),o._to,t,b);n.onAnimate(o,{to:Ext.applyIf(l,at||{})});o.show(!0)}for(;v<li;v++)o=s.getAt(v),o.hide(!0)}}else{if(l=n.renderer(n.line,!1,{path:it,hidden:!1},t,b),Ext.apply(l,i||{},{stroke:i.stroke||i.fill}),delete l.fill,n.line.setAttributes(l,!0),n.line.setAttributes({opacity:ri},!0),dt)for(c=n.line.shadows,f=0;f<tt;f++)c[f].setAttributes({path:it,hidden:!1},!0);if(n.fill&&n.fillPath.setAttributes({path:si,hidden:!1,opacity:ui},!0),kt){for(v=0,t=0;t<nt;t++)n.items[t]&&(o=s.getAt(v++),o&&(l=n.renderer(o,b.getAt(t),o._to,t,b),o.setAttributes(Ext.apply(at||{},l||{}),!0),o.attr.hidden||o.show(!0)));for(;v<li;v++)o=s.getAt(v),o.hide(!0)}}a.markerIndex&&(n.smooth?Ext.Array.erase(h,1,2):Ext.Array.splice(h,1,0,h[1],h[2]),n.previousPath=h);n.renderLabels();n.renderCallouts();n.fireEvent("draw",n)}}},onCreateLabel:function(n,t){var i=this,u=i.labelsGroup,f=i.label,r=i.bbox,e=Ext.apply({},f,i.seriesLabelStyle||{});return i.chart.surface.add(Ext.apply({type:"text","text-anchor":"middle",group:u,x:Number(t.point[0]),y:r.y+r.height/2},e||{}))},onPlaceLabel:function(n,t,i,r,u,f,e){var c=this,d=c.chart,g=d.resizing,b=c.label,nt=b.renderer,tt=b.field,o=c.bbox,s=Number(i.point[0]),h=Number(i.point[1]),k=i.sprite.attr.radius,w,l,a,v,p,y;if(n.setAttributes({text:nt(t.get(tt),n,t,i,r,u,f,e),hidden:!0},!0),l=i.sprite.getBBox(),l.width=l.width||k*2,l.height=l.height||k*2,w=n.getBBox(),a=w.width/2,v=w.height/2,u=="rotate"?(p=l.width/2+a+v/2,s+p+a>o.x+o.width?s-=p:s+=p,n.setAttributes({rotation:{x:s,y:h,degrees:-45}},!0)):(u=="under"||u=="over")&&(n.setAttributes({rotation:{degrees:0}},!0),s<o.x+a?s=o.x+a:s+a>o.x+o.width&&(s=o.x+o.width-a),y=l.height/2+v,h=h+(u=="over"?-y:y),h<o.y+v?h+=2*y:h+v>o.y+o.height&&(h-=2*y)),c.chart.animate&&!c.chart.resizing){n.show(!0);c.onAnimate(n,{to:{x:s,y:h}})}else if(n.setAttributes({x:s,y:h},!0),g&&c.animation)c.animation.on("afteranimate",function(){n.show(!0)});else n.show(!0)},highlightItem:function(){var t=this,n=t.line;t.callParent(arguments);n&&!t.highlighted&&("__strokeWidth"in n||(n.__strokeWidth=parseFloat(n.attr["stroke-width"])||0),n.__anim&&(n.__anim.paused=!0),n.__anim=new Ext.fx.Anim({target:n,to:{"stroke-width":n.__strokeWidth+3}}),t.highlighted=!0)},unHighlightItem:function(){var t=this,n=t.line,i;t.callParent(arguments);n&&t.highlighted&&(i=n.__strokeWidth||parseFloat(n.attr["stroke-width"])||0,n.__anim=new Ext.fx.Anim({target:n,to:{"stroke-width":i}}),t.highlighted=!1)},onPlaceCallout:function(n,t,i,r,u){if(u){var w=this,tt=w.chart,st=tt.surface,ht=tt.resizing,b=w.callouts,it=w.items,h=r==0?!1:it[r-1].point,c=r==it.length-1?!1:it[r+1].point,e=[+i.point[0],+i.point[1]],rt,ut,f,g,k,d,nt=b.offsetFromViz||30,ct=b.offsetToSide||10,o=b.offsetBox||3,l,a,ft,et,ot,v=w.clipRect,s={width:b.styles.width||10,height:b.styles.height||10},y,p;if(h||(h=e),c||(c=e),g=(c[1]-h[1])/(c[0]-h[0]),k=(e[1]-h[1])/(e[0]-h[0]),d=(c[1]-e[1])/(c[0]-e[0]),ut=Math.sqrt(1+g*g),rt=[1/ut,g/ut],f=[-rt[1],rt[0]],k>0&&d<0&&f[1]<0||k<0&&d>0&&f[1]>0?(f[0]*=-1,f[1]*=-1):(Math.abs(k)<Math.abs(d)&&f[0]<0||Math.abs(k)>Math.abs(d)&&f[0]>0)&&(f[0]*=-1,f[1]*=-1),y=e[0]+f[0]*nt,p=e[1]+f[1]*nt,l=y+(f[0]>0?0:-(s.width+2*o)),a=p-s.height/2-o,ft=s.width+2*o,et=s.height+2*o,(l<v[0]||l+ft>v[0]+v[2])&&(f[0]*=-1),(a<v[1]||a+et>v[1]+v[3])&&(f[1]*=-1),y=e[0]+f[0]*nt,p=e[1]+f[1]*nt,l=y+(f[0]>0?0:-(s.width+2*o)),a=p-s.height/2-o,ft=s.width+2*o,et=s.height+2*o,tt.animate){w.onAnimate(n.lines,{to:{path:["M",e[0],e[1],"L",y,p,"Z"]}});n.panel&&n.panel.setPosition(l,a,!0)}else n.lines.setAttributes({path:["M",e[0],e[1],"L",y,p,"Z"]},!0),n.panel&&n.panel.setPosition(l,a);for(ot in n)n[ot].show(!0)}},isItemInPoint:function(n,t,i,r){var w=this,s=w.items,h=w.selectionTolerance,u,f,e,o,b,c,l,a,v,y,k,p,d=Math.sqrt,g=Math.abs;return(f=s[r],u=r&&s[r-1],r>=b&&(u=s[b-1]),e=u&&u.point,o=f&&f.point,c=u?e[0]:o[0]-h,l=u?e[1]:o[1],a=f?o[0]:e[0]+h,v=f?o[1]:e[1],y=d((n-c)*(n-c)+(t-l)*(t-l)),k=d((n-a)*(n-a)+(t-v)*(t-v)),p=Math.min(y,k),p<=h)?p==y?u:f:!1},toggleAll:function(n){var t=this,i,u,f,r;if(n?Ext.chart.series.Cartesian.prototype.showAll.call(t):Ext.chart.series.Cartesian.prototype.hideAll.call(t),t.line&&(t.line.setAttributes({hidden:!n},!0),t.line.shadows))for(i=0,r=t.line.shadows,u=r.length;i<u;i++)f=r[i],f.setAttributes({hidden:!n},!0);t.fillPath&&t.fillPath.setAttributes({hidden:!n},!0)},hideAll:function(){this.toggleAll(!1)},showAll:function(){this.toggleAll(!0)}})