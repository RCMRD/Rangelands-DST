Ext.define("Ext.form.action.DirectLoad",{extend:"Ext.form.action.Load",requires:["Ext.direct.Manager"],alternateClassName:"Ext.form.Action.DirectLoad",alias:"formaction.directload",type:"directload",run:function(){var t=this,i=t.form,u=i.api,n=u.load,f,r,e;typeof n!="function"&&(e=n,u.load=n=Ext.direct.Manager.parseMethod(n),Ext.isFunction(n)||Ext.Error.raise("Cannot resolve Ext.Direct API method "+e));f=n.directCfg.method;r=f.getArgs(t.getParams(),i.paramOrder,i.paramsAsHash);r.push(t.onComplete,t);n.apply(window,r)},processResponse:function(n){return this.result=n},onComplete:function(n){if(n)this.onSuccess(n);else this.onFailure(null)}})