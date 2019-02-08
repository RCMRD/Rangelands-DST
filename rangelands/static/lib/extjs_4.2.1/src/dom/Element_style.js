Ext.define("Ext.dom.Element_style",{override:"Ext.dom.Element"},function(){var n=this,w=document.defaultView,d=/table-row|table-.*-group/,u="_internal",l="hidden",a="height",f="width",e="isClipped",o="overflow",s="overflow-x",h="overflow-y",b="originalClip",k=/#document|body/i,r,t,i,v,y,c,p;if(w&&w.getComputedStyle||(n.prototype.getStyle=function(t,i){var h=this,o=h.dom,y=typeof t!="string",p=h.styleHooks,u=t,c=u,w=1,b=i,l,a,s,f,e,r,v;if(y&&(s={},u=c[0],v=0,!(w=c.length)))return s;if(!o||o.documentElement)return s||"";a=o.style;i?r=a:(r=o.currentStyle,r||(b=!0,r=a));do{if(f=p[u],f||(p[u]=f={name:n.normalize(u)}),f.get)e=f.get(o,h,b,r);else if(l=f.name,f.canThrow)try{e=r[l]}catch(k){e=""}else e=r?r[l]:"";if(!y)return e;s[u]=e;u=c[++v]}while(v<w);return s}),n.override({getHeight:function(n,t){var r=this,f=r.isStyle("display","none"),i,u;return f?0:(i=r.dom.offsetHeight,Ext.supports.Direct2DBug&&(u=r.adjustDirect2DDimension(a),t?i+=u:u>0&&u<.5&&i++),n&&(i-=r.getBorderWidth("tb")+r.getPadding("tb")),i<0?0:i)},getWidth:function(n,t){var i=this,o=i.dom,s=i.isStyle("display","none"),u,r,e;return s?0:(t&&Ext.supports.BoundingClientRect?(u=o.getBoundingClientRect(),r=i.vertical&&!Ext.isIE9&&!Ext.supports.RotatedBoundingClientRect?u.bottom-u.top:u.right-u.left):r=o.offsetWidth,Ext.supports.Direct2DBug&&!i.vertical&&(e=i.adjustDirect2DDimension(f),t?r+=e:e>0&&e<.5&&r++),n&&(r-=i.getBorderWidth("lr")+i.getPadding("lr")),r<0?0:r)},setWidth:function(n,t){var i=this;return n=i.adjustWidth(n),t&&i.anim?(Ext.isObject(t)||(t={}),i.animate(Ext.applyIf({to:{width:n}},t))):i.dom.style.width=i.addUnits(n),i},setHeight:function(n,t){var i=this;return n=i.adjustHeight(n),t&&i.anim?(Ext.isObject(t)||(t={}),i.animate(Ext.applyIf({to:{height:n}},t))):i.dom.style.height=i.addUnits(n),i},applyStyles:function(n){return Ext.DomHelper.applyStyles(this.dom,n),this},setSize:function(n,t,i){var r=this;return Ext.isObject(n)&&(i=t,t=n.height,n=n.width),n=r.adjustWidth(n),t=r.adjustHeight(t),i&&r.anim?(i===!0&&(i={}),r.animate(Ext.applyIf({to:{width:n,height:t}},i))):(r.dom.style.width=r.addUnits(n),r.dom.style.height=r.addUnits(t)),r},getViewSize:function(){var i=this,t=i.dom,r=k.test(t.nodeName);return r?{width:n.getViewWidth(),height:n.getViewHeight()}:{width:t.clientWidth,height:t.clientHeight}},getSize:function(n){return{width:this.getWidth(n),height:this.getHeight(n)}},adjustWidth:function(n){var t=this,i=typeof n=="number";return i&&t.autoBoxAdjust&&!t.isBorderBox()&&(n-=t.getBorderWidth("lr")+t.getPadding("lr")),i&&n<0?0:n},adjustHeight:function(n){var t=this,i=typeof n=="number";return i&&t.autoBoxAdjust&&!t.isBorderBox()&&(n-=t.getBorderWidth("tb")+t.getPadding("tb")),i&&n<0?0:n},getColor:function(n,t,i){var r=this.getStyle(n),u=i||i===""?i:"#",f,o,e=0;if(!r||/transparent|inherit/.test(r))return t;if(/^r/.test(r))for(r=r.slice(4,r.length-1).split(","),o=r.length;e<o;e++)f=parseInt(r[e],10),u+=(f<16?"0":"")+f.toString(16);else r=r.replace("#",""),u+=r.length==3?r.replace(/^(\w)(\w)(\w)$/,"$1$1$2$2$3$3"):r;return u.length>5?u.toLowerCase():t},setOpacity:function(n,t){var i=this;return i.dom?(t&&i.anim?(typeof t!="object"&&(t={duration:350,easing:"ease-in"}),i.animate(Ext.applyIf({to:{opacity:n}},t))):i.setStyle("opacity",n),i):i},clearOpacity:function(){return this.setOpacity("")},adjustDirect2DDimension:function(n){var r=this,t=r.dom,i=r.getStyle("display"),o=t.style.display,s=t.style.position,h=n===f?0:1,u=t.currentStyle,e;return i==="inline"&&(t.style.display="inline-block"),t.style.position=i.match(d)?"absolute":"static",e=(parseFloat(u[n])||parseFloat(u.msTransformOrigin.split(" ")[h])*2)%1,t.style.position=s,i==="inline"&&(t.style.display=o),e},clip:function(){var n=this,i=(n.$cache||n.getCache()).data,t;return i[e]||(i[e]=!0,t=n.getStyle([o,s,h]),i[b]={o:t[o],x:t[s],y:t[h]},n.setStyle(o,l),n.setStyle(s,l),n.setStyle(h,l)),n},unclip:function(){var t=this,i=(t.$cache||t.getCache()).data,n;return i[e]&&(i[e]=!1,n=i[b],n.o&&t.setStyle(o,n.o),n.x&&t.setStyle(s,n.x),n.y&&t.setStyle(h,n.y)),t},boxWrap:function(t){t=t||Ext.baseCSSPrefix+"box";var i=Ext.get(this.insertHtml("beforeBegin","<div class='"+t+"'>"+Ext.String.format(n.boxMarkup,t)+"<\/div>"));return Ext.DomQuery.selectNode("."+t+"-mc",i.dom).appendChild(this.dom),i},getComputedHeight:function(){var n=this,t=Math.max(n.dom.offsetHeight,n.dom.clientHeight);return t||(t=parseFloat(n.getStyle(a))||0,n.isBorderBox()||(t+=n.getFrameWidth("tb"))),t},getComputedWidth:function(){var n=this,t=Math.max(n.dom.offsetWidth,n.dom.clientWidth);return t||(t=parseFloat(n.getStyle(f))||0,n.isBorderBox()||(t+=n.getFrameWidth("lr"))),t},getFrameWidth:function(n,t){return t&&this.isBorderBox()?0:this.getPadding(n)+this.getBorderWidth(n)},addClsOnOver:function(n,t,i){var r=this,f=r.dom,e=Ext.isFunction(t);return r.hover(function(){e&&t.call(i||r,r)===!1||Ext.fly(f,u).addCls(n)},function(){Ext.fly(f,u).removeCls(n)}),r},addClsOnFocus:function(n,t,i){var r=this,f=r.dom,e=Ext.isFunction(t);r.on("focus",function(){if(e&&t.call(i||r,r)===!1)return!1;Ext.fly(f,u).addCls(n)});r.on("blur",function(){Ext.fly(f,u).removeCls(n)});return r},addClsOnClick:function(n,t,i){var r=this,f=r.dom,e=Ext.isFunction(t);r.on("mousedown",function(){if(e&&t.call(i||r,r)===!1)return!1;Ext.fly(f,u).addCls(n);var o=Ext.getDoc(),s=function(){Ext.fly(f,u).removeCls(n);o.removeListener("mouseup",s)};o.on("mouseup",s)});return r},getStyleSize:function(){var t=this,e=this.dom,o=k.test(e.nodeName),i,r,u;return o?{width:n.getViewWidth(),height:n.getViewHeight()}:(i=t.getStyle([a,f],!0),i.width&&i.width!="auto"&&(r=parseFloat(i.width),t.isBorderBox()&&(r-=t.getFrameWidth("lr"))),i.height&&i.height!="auto"&&(u=parseFloat(i.height),t.isBorderBox()&&(u-=t.getFrameWidth("tb"))),{width:r||t.getWidth(!0),height:u||t.getHeight(!0)})},statics:{selectableCls:Ext.baseCSSPrefix+"selectable",unselectableCls:Ext.baseCSSPrefix+"unselectable"},selectable:function(){var t=this;return t.dom.unselectable="",t.removeCls(n.unselectableCls),t.addCls(n.selectableCls),t},unselectable:function(){var t=this;return Ext.isOpera&&(t.dom.unselectable="on"),t.removeCls(n.selectableCls),t.addCls(n.unselectableCls),t},setVertical:function(t,i){var r=this,u=n.prototype;r.vertical=!0;i&&r.addCls(r.verticalCls=i);r.setWidth=u.setHeight;r.setHeight=u.setWidth;Ext.isIE9m||(r.getWidth=u.getHeight,r.getHeight=u.getWidth);r.styleHooks=t===270?n.prototype.verticalStyleHooks270:n.prototype.verticalStyleHooks90},setHorizontal:function(){var n=this,t=n.verticalCls;delete n.vertical;t&&(delete n.verticalCls,n.removeCls(t));delete n.setWidth;delete n.setHeight;Ext.isIE9m||(delete n.getWidth,delete n.getHeight);delete n.styleHooks}}),n.prototype.styleHooks=r=Ext.dom.AbstractElement.prototype.styleHooks,n.prototype.verticalStyleHooks90=t=Ext.Object.chain(n.prototype.styleHooks),n.prototype.verticalStyleHooks270=i=Ext.Object.chain(n.prototype.styleHooks),t.width={name:"height"},t.height={name:"width"},t["margin-top"]={name:"marginLeft"},t["margin-right"]={name:"marginTop"},t["margin-bottom"]={name:"marginRight"},t["margin-left"]={name:"marginBottom"},t["padding-top"]={name:"paddingLeft"},t["padding-right"]={name:"paddingTop"},t["padding-bottom"]={name:"paddingRight"},t["padding-left"]={name:"paddingBottom"},t["border-top"]={name:"borderLeft"},t["border-right"]={name:"borderTop"},t["border-bottom"]={name:"borderRight"},t["border-left"]={name:"borderBottom"},i.width={name:"height"},i.height={name:"width"},i["margin-top"]={name:"marginRight"},i["margin-right"]={name:"marginBottom"},i["margin-bottom"]={name:"marginLeft"},i["margin-left"]={name:"marginTop"},i["padding-top"]={name:"paddingRight"},i["padding-right"]={name:"paddingBottom"},i["padding-bottom"]={name:"paddingLeft"},i["padding-left"]={name:"paddingTop"},i["border-top"]={name:"borderRight"},i["border-right"]={name:"borderBottom"},i["border-bottom"]={name:"borderLeft"},i["border-left"]={name:"borderTop"},Ext.isIE7m&&(r.fontSize=r["font-size"]={name:"fontSize",canThrow:!0},r.fontStyle=r["font-style"]={name:"fontStyle",canThrow:!0},r.fontFamily=r["font-family"]={name:"fontFamily",canThrow:!0}),Ext.isIEQuirks||Ext.isIE&&Ext.ieVersion<=8){function g(n,t,i,r){return r[this.styleName]=="none"?"0px":r[this.name]}for(v=["Top","Right","Bottom","Left"],y=v.length;y--;)c=v[y],p="border"+c+"Width",r["border-"+c.toLowerCase()+"-width"]=r[p]={name:p,styleName:"border"+c+"Style",get:g}}Ext.getDoc().on("selectstart",function(t,i){var f=document.documentElement,e=n.selectableCls,o=n.unselectableCls,r=i&&i.tagName,u;if(r=r&&r.toLowerCase(),r!=="input"&&r!=="textarea")while(i&&i.nodeType===1&&i!==f){if(u=Ext.fly(i),u.hasCls(e))return;if(u.hasCls(o)){t.stopEvent();return}i=i.parentNode}})});Ext.onReady(function(){var n=/alpha\(opacity=(.*)\)/i,i=/^\s+|\s+$/g,t=Ext.dom.Element.prototype.styleHooks;t.opacity={name:"opacity",afterSet:function(n,t,i){if(i.isLayer)i.onOpacitySet(t)}};!Ext.supports.Opacity&&Ext.isIE&&Ext.apply(t.opacity,{get:function(t){var u=t.style.filter,r,i;return u.match&&(r=u.match(n),r&&(i=parseFloat(r[1]),!isNaN(i)))?i?i/100:0:1},set:function(t,r){var u=t.style,f=u.filter.replace(n,"").replace(i,"");u.zoom=1;typeof r=="number"&&r>=0&&r<1?(r*=100,u.filter=f+(f.length?" ":"")+"alpha(opacity="+r+")"):u.filter=f}})})