Ext.define("Ext.data.proxy.Ajax",{requires:["Ext.util.MixedCollection","Ext.Ajax"],extend:"Ext.data.proxy.Server",alias:"proxy.ajax",alternateClassName:["Ext.data.HttpProxy","Ext.data.AjaxProxy"],actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},binary:!1,doRequest:function(n,t,i){var u=this.getWriter(),r=this.buildRequest(n);return n.allowWrite()&&(r=u.write(r)),Ext.apply(r,{binary:this.binary,headers:this.headers,timeout:this.timeout,scope:this,callback:this.createRequestCallback(r,n,t,i),method:this.getMethod(r),disableCaching:!1}),Ext.Ajax.request(r),r},getMethod:function(n){return this.actionMethods[n.action]},createRequestCallback:function(n,t,i,r){var u=this;return function(f,e,o){u.processResponse(e,t,n,o,i,r)}}},function(){Ext.data.HttpProxy=this})