Ext.define("Ext.dom.AbstractHelper",{emptyTags:/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,confRe:/^(?:tag|children|cn|html|tpl|tplData)$/i,endRe:/end/i,styleSepRe:/\s*(?::|;)\s*/,attributeTransform:{cls:"class",htmlFor:"for"},closeTags:{},decamelizeName:function(){function i(n,t,i){return t+"-"+i.toLowerCase()}var t=/([a-z])([A-Z])/g,n={};return function(r){return n[r]||(n[r]=r.replace(t,i))}}(),generateMarkup:function(n,t){var r=this,s=typeof n,u,i,f,e,o;if(s=="string"||s=="number")t.push(n);else if(Ext.isArray(n))for(e=0;e<n.length;e++)n[e]&&r.generateMarkup(n[e],t);else{f=n.tag||"div";t.push("<",f);for(u in n)n.hasOwnProperty(u)&&(i=n[u],r.confRe.test(u)||(typeof i=="object"?(t.push(" ",u,'="'),r.generateStyles(i,t).push('"')):t.push(" ",r.attributeTransform[u]||u,'="',i,'"')));r.emptyTags.test(f)?t.push("/>"):(t.push(">"),(i=n.tpl)&&i.applyOut(n.tplData,t),(i=n.html)&&t.push(i),(i=n.cn||n.children)&&r.generateMarkup(i,t),o=r.closeTags,t.push(o[f]||(o[f]="<\/"+f+">")))}return t},generateStyles:function(n,t){var r=t||[];for(var i in n)n.hasOwnProperty(i)&&r.push(this.decamelizeName(i),":",n[i],";");return t||r.join("")},markup:function(n){if(typeof n=="string")return n;var t=this.generateMarkup(n,[]);return t.join("")},applyStyles:function(n,t){if(t){var i=0,r;if(n=Ext.fly(n,"_applyStyles"),typeof t=="function"&&(t=t.call()),typeof t=="string")for(t=Ext.util.Format.trim(t).split(this.styleSepRe),r=t.length;i<r;)n.setStyle(t[i++],t[i++]);else Ext.isObject(t)&&n.setStyle(t)}},insertHtml:function(n,t,i){var f={},e,r,u,o;return n=n.toLowerCase(),f.beforebegin=["BeforeBegin","previousSibling"],f.afterend=["AfterEnd","nextSibling"],r=t.ownerDocument.createRange(),e="setStart"+(this.endRe.test(n)?"After":"Before"),f[n]?(r[e](t),u=r.createContextualFragment(i),t.parentNode.insertBefore(u,n=="beforebegin"?t:t.nextSibling),t[(n=="beforebegin"?"previous":"next")+"Sibling"]):(o=(n=="afterbegin"?"first":"last")+"Child",t.firstChild?(r[e](t[o]),u=r.createContextualFragment(i),n=="afterbegin"?t.insertBefore(u,t.firstChild):t.appendChild(u)):t.innerHTML=i,t[o])},insertBefore:function(n,t,i){return this.doInsert(n,t,i,"beforebegin")},insertAfter:function(n,t,i){return this.doInsert(n,t,i,"afterend","nextSibling")},insertFirst:function(n,t,i){return this.doInsert(n,t,i,"afterbegin","firstChild")},append:function(n,t,i){return this.doInsert(n,t,i,"beforeend","",!0)},overwrite:function(n,t,i){return n=Ext.getDom(n),n.innerHTML=this.markup(t),i?Ext.get(n.firstChild):n.firstChild},doInsert:function(n,t,i,r){var u=this.insertHtml(r,Ext.getDom(n),this.markup(t));return i?Ext.get(u,!0):u}})