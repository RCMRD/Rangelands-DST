Ext.define("Ext.data.proxy.Proxy",{alias:"proxy.proxy",alternateClassName:["Ext.data.DataProxy","Ext.data.Proxy"],requires:["Ext.data.reader.Json","Ext.data.writer.Json"],uses:["Ext.data.Batch","Ext.data.Operation","Ext.data.Model"],mixins:{observable:"Ext.util.Observable"},batchOrder:"create,update,destroy",batchActions:!0,defaultReaderType:"json",defaultWriterType:"json",isProxy:!0,isSynchronous:!1,constructor:function(n){var t=this;n=n||{};t.proxyConfig=n;t.mixins.observable.constructor.call(t,n);t.model===undefined||t.model instanceof Ext.data.Model?(t.reader&&t.setReader(t.reader),t.writer&&t.setWriter(t.writer)):t.setModel(t.model)},setModel:function(n,t){var i=this;i.model=Ext.ModelManager.getModel(n);i.setReader(this.reader);i.setWriter(this.writer);t&&i.store&&i.store.setModel(i.model)},getModel:function(){return this.model},setReader:function(n){var t=this,i=!0,r=t.reader;return(n===undefined||typeof n=="string")&&(n={type:n},i=!1),n.isReader?n.setModel(t.model):(i&&(n=Ext.apply({},n)),Ext.applyIf(n,{proxy:t,model:t.model,type:t.defaultReaderType}),n=Ext.createByAlias("reader."+n.type,n)),n!==r&&n.onMetaChange&&(n.onMetaChange=Ext.Function.createSequence(n.onMetaChange,this.onMetaChange,this)),t.reader=n,t.reader},getReader:function(){return this.reader},onMetaChange:function(n){this.fireEvent("metachange",this,n)},setWriter:function(n){var t=this,i=!0;return(n===undefined||typeof n=="string")&&(n={type:n},i=!1),n.isWriter||(i&&(n=Ext.apply({},n)),Ext.applyIf(n,{model:t.model,type:t.defaultWriterType}),n=Ext.createByAlias("writer."+n.type,n)),t.writer=n,t.writer},getWriter:function(){return this.writer},create:Ext.emptyFn,read:Ext.emptyFn,update:Ext.emptyFn,destroy:Ext.emptyFn,batch:function(n,t){var r=this,a=r.batchActions,i,u,s,h,f,e,o,c,l;n.operations===undefined&&(n={operations:n,listeners:t});n.batch?Ext.isDefined(n.batch.runOperation)&&(i=Ext.applyIf(n.batch,{proxy:r,listeners:{}})):n.batch={proxy:r,listeners:n.listeners||{}};i||(i=new Ext.data.Batch(n.batch));i.on("complete",Ext.bind(r.onBatchComplete,r,[n],0));for(s=r.batchOrder.split(","),h=s.length,e=0;e<h;e++)if(f=s[e],u=n.operations[f],u)if(a)i.add(new Ext.data.Operation({action:f,records:u}));else for(c=u.length,o=0;o<c;o++)l=u[o],i.add(new Ext.data.Operation({action:f,records:[l]}));return i.start(),i},onBatchComplete:function(n,t){var i=n.scope||this;t.hasException?Ext.isFunction(n.failure)&&Ext.callback(n.failure,i,[t,n]):Ext.isFunction(n.success)&&Ext.callback(n.success,i,[t,n]);Ext.isFunction(n.callback)&&Ext.callback(n.callback,i,[t,n])},clone:function(){return new this.self(this.proxyConfig)}})