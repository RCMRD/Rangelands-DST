Ext.define("Ext.form.Basic",{extend:"Ext.util.Observable",alternateClassName:"Ext.form.BasicForm",requires:["Ext.util.MixedCollection","Ext.form.action.Load","Ext.form.action.Submit","Ext.window.MessageBox","Ext.data.Errors","Ext.util.DelayedTask"],constructor:function(n,t){var i=this,r;i.owner=n;i.checkValidityTask=new Ext.util.DelayedTask(i.checkValidity,i);i.checkDirtyTask=new Ext.util.DelayedTask(i.checkDirty,i);i.monitor=new Ext.container.Monitor({selector:"[isFormField]",scope:i,addHandler:i.onFieldAdd,removeHandler:i.onFieldRemove});i.monitor.bind(n);Ext.apply(i,t);Ext.isString(i.paramOrder)&&(i.paramOrder=i.paramOrder.split(/[\s,|]/));r=i.reader;r&&!r.isReader&&(typeof r=="string"&&(r={type:r}),i.reader=Ext.createByAlias("reader."+r.type,r));r=i.errorReader;r&&!r.isReader&&(typeof r=="string"&&(r={type:r}),i.errorReader=Ext.createByAlias("reader."+r.type,r));i.addEvents("beforeaction","actionfailed","actioncomplete","validitychange","dirtychange");i.callParent()},initialize:function(){this.initialized=!0;this.onValidityChange(!this.hasInvalidField())},timeout:30,paramsAsHash:!1,waitTitle:"Please Wait...",trackResetOnLoad:!1,wasDirty:!1,destroy:function(){var n=this,t=n.monitor;t&&(t.unbind(),n.monitor=null);n.clearListeners();n.checkValidityTask.cancel();n.checkDirtyTask.cancel()},onFieldAdd:function(n){var t=this;t.mon(n,"validitychange",t.checkValidityDelay,t);t.mon(n,"dirtychange",t.checkDirtyDelay,t);t.initialized&&t.checkValidityDelay()},onFieldRemove:function(n){var t=this;t.mun(n,"validitychange",t.checkValidityDelay,t);t.mun(n,"dirtychange",t.checkDirtyDelay,t);t.initialized&&t.checkValidityDelay()},getFields:function(){return this.monitor.getItems()},getBoundItems:function(){var n=this._boundItems;return n&&n.getCount()!==0||(n=this._boundItems=new Ext.util.MixedCollection,n.addAll(this.owner.query("[formBind]"))),n},hasInvalidField:function(){return!!this.getFields().findBy(function(n){var i=n.preventMark,t;return n.preventMark=!0,t=n.isValid(),n.preventMark=i,!t})},isValid:function(){var t=this,n;return Ext.suspendLayouts(),n=t.getFields().filterBy(function(n){return!n.validate()}),Ext.resumeLayouts(!0),n.length<1},checkValidity:function(){var n=this,t=!n.hasInvalidField();if(t!==n.wasValid){n.onValidityChange(t);n.fireEvent("validitychange",n,t);n.wasValid=t}},checkValidityDelay:function(){this.checkValidityTask.delay(10)},onValidityChange:function(n){var u=this.getBoundItems(),i,t,f,r;if(u)for(i=u.items,f=i.length,t=0;t<f;t++)r=i[t],r.disabled===n&&r.setDisabled(!n)},isDirty:function(){return!!this.getFields().findBy(function(n){return n.isDirty()})},checkDirtyDelay:function(){this.checkDirtyTask.delay(10)},checkDirty:function(){var n=this.isDirty();n!==this.wasDirty&&(this.fireEvent("dirtychange",this,n),this.wasDirty=n)},hasUpload:function(){return!!this.getFields().findBy(function(n){return n.isFileUpload()})},doAction:function(n,t){return Ext.isString(n)&&(n=Ext.ClassManager.instantiateByAlias("formaction."+n,Ext.apply({},t,{form:this}))),this.fireEvent("beforeaction",this,n)!==!1&&(this.beforeAction(n),Ext.defer(n.run,100,n)),this},submit:function(n){n=n||{};var t=this,i;return i=n.standardSubmit||t.standardSubmit?"standardsubmit":t.api?"directsubmit":"submit",t.doAction(i,n)},load:function(n){return this.doAction(this.api?"directload":"load",n)},updateRecord:function(n){if(n=n||this._record,!n)return Ext.Error.raise("A record is required."),this;for(var r=n.fields.items,u=this.getFieldValues(),f={},i=0,e=r.length,t;i<e;++i)t=r[i].name,u.hasOwnProperty(t)&&(f[t]=u[t]);return n.beginEdit(),n.set(f),n.endEdit(),this},loadRecord:function(n){return this._record=n,this.setValues(n.getData())},getRecord:function(){return this._record},beforeAction:function(n){for(var t=this,r=n.waitMsg,e=Ext.baseCSSPrefix+"mask-loading",o=t.getFields().items,s=o.length,f,i,u=0;u<s;u++)f=o[u],f.isFormField&&f.syncValue&&f.syncValue();r&&(i=t.waitMsgTarget,i===!0?t.owner.el.mask(r,e):i?(i=t.waitMsgTarget=Ext.get(i),i.mask(r,e)):(t.floatingAncestor=t.owner.up("[floating]"),t.floatingAncestor&&(t.savePreventFocusOnActivate=t.floatingAncestor.preventFocusOnActivate,t.floatingAncestor.preventFocusOnActivate=!0),Ext.MessageBox.wait(r,n.waitTitle||t.waitTitle)))},afterAction:function(n,t){var i=this,u,r;n.waitMsg&&(u=Ext.MessageBox,r=i.waitMsgTarget,r===!0?i.owner.el.unmask():r?r.unmask():u.hide());i.floatingAncestor&&(i.floatingAncestor.preventFocusOnActivate=i.savePreventFocusOnActivate);t?(n.reset&&i.reset(),Ext.callback(n.success,n.scope||n,[i,n]),i.fireEvent("actioncomplete",i,n)):(Ext.callback(n.failure,n.scope||n,[i,n]),i.fireEvent("actionfailed",i,n))},findField:function(n){return this.getFields().findBy(function(t){return t.id===n||t.getName()===n})},markInvalid:function(n){function f(n,t){var i=o.findField(n);i&&i.markInvalid(t)}var o=this,t,r,i,e,u;if(Ext.isArray(n))for(r=n.length,t=0;t<r;t++)i=n[t],f(i.id,i.msg);else if(n instanceof Ext.data.Errors)for(r=n.items.length,t=0;t<r;t++)i=n.items[t],f(i.field,i.message);else for(u in n)n.hasOwnProperty(u)&&(e=n[u],f(u,e,n));return this},setValues:function(n){function f(n,t){var i=r.findField(n);i&&(i.setValue(t),r.trackResetOnLoad&&i.resetOriginalValue())}var r=this,t,u,i;if(Ext.suspendLayouts(),Ext.isArray(n))for(u=n.length,t=0;t<u;t++)i=n[t],f(i.id,i.value);else Ext.iterate(n,f);return Ext.resumeLayouts(!0),this},getValues:function(n,t,i,r){for(var u={},l=this.getFields().items,v=l.length,a=Ext.isArray,c,s,e,o,f,h=0;h<v;h++)if(c=l[h],(!t||c.isDirty())&&(s=c[r?"getModelData":"getSubmitData"](i),Ext.isObject(s)))for(f in s)s.hasOwnProperty(f)&&(e=s[f],i&&e===""&&(e=c.emptyText||""),u.hasOwnProperty(f)?(o=u[f],a(o)||(o=u[f]=[o]),a(e)?u[f]=o.concat(e):o.push(e)):u[f]=e);return n&&(u=Ext.Object.toQueryString(u)),u},getFieldValues:function(n){return this.getValues(!1,n,!1,!0)},clearInvalid:function(){Ext.suspendLayouts();for(var t=this,i=t.getFields().items,r=i.length,n=0;n<r;n++)i[n].clearInvalid();return Ext.resumeLayouts(!0),t},reset:function(n){Ext.suspendLayouts();for(var i=this,r=i.getFields().items,u=r.length,t=0;t<u;t++)r[t].reset();return Ext.resumeLayouts(!0),n===!0&&delete i._record,i},applyToFields:function(n){for(var i=this.getFields().items,r=i.length,t=0;t<r;t++)Ext.apply(i[t],n);return this},applyIfToFields:function(n){for(var i=this.getFields().items,r=i.length,t=0;t<r;t++)Ext.applyIf(i[t],n);return this}})