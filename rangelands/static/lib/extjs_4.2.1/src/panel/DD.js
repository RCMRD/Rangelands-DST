Ext.define("Ext.panel.DD",{extend:"Ext.dd.DragSource",requires:["Ext.panel.Proxy"],constructor:function(n,t){var i=this;i.panel=n;i.dragData={panel:n};i.panelProxy=new Ext.panel.Proxy(n,t);i.proxy=i.panelProxy.proxy;i.callParent([n.el,t]);i.setupEl(n)},setupEl:function(n){var t=this,i=n.header,r=n.body;if(i&&(t.setHandleElId(i.id),r=i.el),r)r.setStyle("cursor","move"),t.scroll=!1;else n.on("boxready",t.setupEl,t,{single:!0})},showFrame:Ext.emptyFn,startDrag:Ext.emptyFn,b4StartDrag:function(){this.panelProxy.show()},b4MouseDown:function(n){var t=n.getPageX(),i=n.getPageY();this.autoOffset(t,i)},onInitDrag:function(n,t){this.onStartDrag(n,t);return!0},createFrame:Ext.emptyFn,getDragEl:function(){var n=this.panelProxy.ghost;if(n)return n.el.dom},endDrag:function(){this.panelProxy.hide();this.panel.saveState()},autoOffset:function(n,t){n-=this.startPageX;t-=this.startPageY;this.setDelta(n,t)},onInvalidDrop:function(n,t,i){var r=this;r.beforeInvalidDrop(n,t,i)!==!1&&(r.cachedTarget&&(r.cachedTarget.isNotifyTarget&&r.cachedTarget.notifyOut(r,t,r.dragData),r.cacheTarget=null),r.afterInvalidDrop&&r.afterInvalidDrop(t,i))}})