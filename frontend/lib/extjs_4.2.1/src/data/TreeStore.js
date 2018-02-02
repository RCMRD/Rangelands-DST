Ext.define("Ext.data.TreeStore",{extend:"Ext.data.AbstractStore",alias:"store.tree",requires:["Ext.util.Sorter","Ext.data.Tree","Ext.data.NodeInterface"],clearOnLoad:!0,clearRemovedOnLoad:!0,nodeParam:"node",defaultRootId:"root",defaultRootText:"Root",defaultRootProperty:"children",rootProperty:"children",fillCount:0,folderSort:!1,constructor:function(n){var t=this,i,u,r;n=Ext.apply({},n);u=n.fields||t.fields;u||(n.fields=[{name:"text",type:"string"}],r=n.defaultRootProperty||t.defaultRootProperty,r!==t.defaultRootProperty&&n.fields.push({name:r,type:"auto",defaultValue:null,persist:!1}));t.callParent([n]);t.tree=new Ext.data.Tree;t.tree.treeStore=t;t.tree.on({scope:t,remove:t.onNodeRemove,beforeexpand:t.onBeforeNodeExpand,append:t.onNodeAdded,insert:t.onNodeAdded,sort:t.onNodeSort});t.onBeforeSort();i=t.root;i&&(delete t.root,t.setRootNode(i));Ext.isDefined(t.nodeParameter)&&(Ext.isDefined(Ext.global.console)&&Ext.global.console.warn("Ext.data.TreeStore: nodeParameter has been deprecated. Please use nodeParam instead."),t.nodeParam=t.nodeParameter,delete t.nodeParameter)},setProxy:function(n){var t,i;return n instanceof Ext.data.proxy.Proxy?i=Ext.isEmpty(n.getReader().root):Ext.isString(n)?i=!0:(t=n.reader,i=!(t&&!Ext.isEmpty(t.root))),n=this.callParent(arguments),n.idParam=this.nodeParam,i&&(t=n.getReader(),t.root=this.defaultRootProperty,t.buildExtractors(!0)),n},onBeforeSort:function(){this.folderSort&&this.sort({property:"leaf",direction:"ASC"},"prepend",!1)},onBeforeNodeExpand:function(n,t,i,r){var f=this,e,o,s,u;if(n.isLoaded())u=[n.childNodes],r&&u.push.apply(u,r),Ext.callback(t,i||n,u);else if(o=s=(n.raw||n[n.persistenceProperty])[(e=f.getProxy().getReader()).root])f.fillNode(n,e.extractData(o)),delete s[e.root],u=[n.childNodes],r&&u.push.apply(u,r),Ext.callback(t,i||n,u);else if(n.isLoading())f.on("load",function(){u=[n.childNodes];r&&u.push.apply(u,r);Ext.callback(t,i||n,u)},f,{single:!0});else f.read({node:n,callback:function(){delete f.lastOptions.callback;u=[n.childNodes];r&&u.push.apply(u,r);Ext.callback(t,i||n,u)}})},getNewRecords:function(){return Ext.Array.filter(this.tree.flatten(),this.filterNew)},getUpdatedRecords:function(){return Ext.Array.filter(this.tree.flatten(),this.filterUpdated)},onNodeRemove:function(n,t,i){var r=this;t.unjoin(r);t.phantom||i||Ext.Array.include(r.removed,t);!r.autoSync||r.autoSyncSuspended||i||r.sync()},onNodeAdded:function(n,t){var i=this,e=i.getProxy(),r=e.getReader(),f=t.raw||t[t.persistenceProperty],u;Ext.Array.remove(i.removed,t);t.join(i);t.isLeaf()||i.lazyFill||(u=r.getRoot(f),u&&(i.fillNode(t,r.extractData(u)),delete f[r.root]));i.autoSync&&!i.autoSyncSuspended&&(t.phantom||t.dirty)&&i.sync()},onNodeSort:function(){this.autoSync&&!this.autoSyncSuspended&&this.sync()},setRootNode:function(n,t){var i=this,r=i.model,u=r.prototype.idProperty;return n=n||{},n.isModel?n.isModel&&!n.isNode&&Ext.data.NodeInterface.decorate(r):(n=Ext.apply({},n),Ext.applyIf(n,{id:i.defaultRootId,text:i.defaultRootText,allowDrag:!1}),n[u]===undefined&&(n[u]=i.defaultRootId),Ext.data.NodeInterface.decorate(r),n=Ext.ModelManager.create(n,r)),i.getProxy().getReader().buildExtractors(!0),i.tree.setRootNode(n),t!==!0&&!n.isLoaded()&&(i.autoLoad===!0||n.isExpanded())&&(n.data.expanded=!1,n.expand()),n},getRootNode:function(){return this.tree.getRootNode()},getNodeById:function(n){return this.tree.getNodeById(n)},getById:function(n){return this.getNodeById(n)},load:function(n){n=n||{};n.params=n.params||{};var t=this,i=n.node||t.tree.getRootNode();if(i||(i=t.setRootNode({expanded:!0},!0)),n.id=i.getId(),t.clearOnLoad){t.clearRemovedOnLoad&&t.clearRemoved(i);t.tree.un("remove",t.onNodeRemove,t);i.removeAll(!1);t.tree.on("remove",t.onNodeRemove,t)}return Ext.applyIf(n,{node:i}),t.callParent([n]),t.loading&&i&&i.set("loading",!0),t},clearRemoved:function(n){var u=this,f=u.removed,l=n.getId(),e=f.length,i=e,s={},h=[],c={},t,r,o;if(n===u.getRootNode()){u.removed=[];return}for(;i--;)t=f[i],c[t.getId()]=t;for(i=e;i--;){for(t=f[i],r=t;r&&r.getId()!==l;)o=r.get("parentId"),r=r.parentNode||u.getNodeById(o)||c[o];r&&(s[t.getId()]=t)}for(i=0;i<e;i++)t=f[i],s[t.getId()]||h.push(t);u.removed=h},fillNode:function(n,t){for(var i=this,c=t?t.length:0,e=i.sorters,u,f=!1,l=c&&i.sortOnLoad&&!i.remoteSort&&e&&e.items&&e.items.length,o,s,h,r=1;r<c;r++)if(o=t[r],s=t[r-1],f=o[o.persistenceProperty].index!=s[s.persistenceProperty].index,f)break;return l?(f&&i.sorters.insert(0,i.indexSorter),u=new Ext.util.MixedCollection,u.addAll(t),u.sort(i.sorters.items),t=u.items,i.sorters.remove(i.indexSorter)):f&&Ext.Array.sort(t,i.sortByIndex),n.set("loaded",!0),h=i.fillCount===0,h&&i.fireEvent("beforefill",i,n,t),++i.fillCount,t.length&&n.appendChild(t,undefined,!0),h&&i.fireEvent("fillcomplete",i,n,t),--i.fillCount,t},sortByIndex:function(n,t){return n[n.persistenceProperty].index-t[t.persistenceProperty].index},onIdChanged:function(n,t,i,r){this.tree.onNodeIdChanged(n,t,i,r);this.callParent(arguments)},onProxyLoad:function(n){var t=this,r=n.wasSuccessful(),i=n.getRecords(),u=n.node;t.loading=!1;u.set("loading",!1);r&&(t.clearOnLoad||(i=t.cleanRecords(u,i)),i=t.fillNode(u,i));t.fireEvent("read",t,n.node,i,r);t.fireEvent("load",t,n.node,i,r);Ext.callback(n.callback,n.scope||t,[i,n,r])},cleanRecords:function(n,t){for(var f={},e=n.childNodes,i=0,r=e.length,o=[],u;i<r;++i)f[e[i].getId()]=!0;for(i=0,r=t.length;i<r;++i)u=t[i],f[u.getId()]||o.push(u);return o},removeAll:function(){var n=this.getRootNode();n&&n.destroy(!0);this.fireEvent("clear",this)},doSort:function(n){var t=this;t.remoteSort?t.load():(t.tree.sort(n,!0),t.fireEvent("datachanged",t),t.fireEvent("refresh",t));t.fireEvent("sort",t,t.sorters.getRange())}},function(){var n=this.prototype;n.indexSorter=new Ext.util.Sorter({sorterFn:n.sortByIndex})})