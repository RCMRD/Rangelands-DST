Ext.define("Ext.data.reader.Json",{extend:"Ext.data.reader.Reader",alternateClassName:"Ext.data.JsonReader",alias:"reader.json",root:"",metaProperty:"metaData",useSimpleAccessors:!1,readRecords:function(n){var t=this,i;if(t.getMeta){if(i=t.getMeta(n),i)t.onMetaChange(i)}else if(n.metaData)t.onMetaChange(n.metaData);return t.jsonData=n,t.callParent([n])},getResponseData:function(n){var i,t;try{return i=Ext.decode(n.responseText),this.readRecords(i)}catch(r){return t=new Ext.data.ResultSet({total:0,count:0,records:[],success:!1,message:r.message}),this.fireEvent("exception",this,n,t),Ext.Logger.warn("Unable to parse the JSON returned by the server"),t}},buildExtractors:function(){var n=this,t=n.metaProperty;n.callParent(arguments);n.getRoot=n.root?n.createAccessor(n.root):Ext.identityFn;t&&(n.getMeta=n.createAccessor(t))},extractData:function(n){var u=this.record,r=[],i,t;if(u)for(i=n.length,!i&&Ext.isObject(n)&&(i=1,n=[n]),t=0;t<i;t++)r[t]=n[t][u];else r=n;return this.callParent([r])},createAccessor:function(){var n=/[\[\.]/;return function(t){if(Ext.isEmpty(t))return Ext.emptyFn;if(Ext.isFunction(t))return t;if(this.useSimpleAccessors!==!0){var i=String(t).search(n);if(i>=0)return Ext.functionFactory("obj","return obj"+(i>0?".":"")+t)}return function(n){return n[t]}}}(),createFieldAccessExpression:function(){var n=/[\[\.]/;return function(t,i,r){var e=t.mapping,c=e||e===0,u=c?e:t.name,f,l;if(e!==!1){if(typeof u=="function")f=i+".mapping("+r+", this)";else if(this.useSimpleAccessors===!0||(l=String(u).search(n))<0)(!c||isNaN(u))&&(u='"'+u+'"'),f=r+"["+u+"]";else if(l===0)f=r+u;else{for(var o=u.split("."),v=o.length,s=1,h=r+"."+o[0],a=[h];s<v;s++)h+="."+o[s],a.push(h);f=a.join(" && ")}return f}}}()})