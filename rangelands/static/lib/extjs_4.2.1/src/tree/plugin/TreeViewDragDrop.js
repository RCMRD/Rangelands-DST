Ext.define("Ext.tree.plugin.TreeViewDragDrop",{extend:"Ext.AbstractPlugin",alias:"plugin.treeviewdragdrop",uses:["Ext.tree.ViewDragZone","Ext.tree.ViewDropZone"],dragText:"{0} selected node{1}",allowParentInserts:!1,allowContainerDrops:!1,appendOnly:!1,ddGroup:"TreeDD",containerScroll:!1,expandDelay:1e3,enableDrop:!0,enableDrag:!0,nodeHighlightColor:"c3daf9",nodeHighlightOnDrop:Ext.enableFx,nodeHighlightOnRepair:Ext.enableFx,displayField:"text",init:function(n){n.on("render",this.onViewRender,this,{single:!0})},destroy:function(){Ext.destroy(this.dragZone,this.dropZone)},onViewRender:function(n){var t=this,i;t.enableDrag&&(t.containerScroll&&(i=n.getEl()),t.dragZone=new Ext.tree.ViewDragZone({view:n,ddGroup:t.dragGroup||t.ddGroup,dragText:t.dragText,displayField:t.displayField,repairHighlightColor:t.nodeHighlightColor,repairHighlight:t.nodeHighlightOnRepair,scrollEl:i}));t.enableDrop&&(t.dropZone=new Ext.tree.ViewDropZone({view:n,ddGroup:t.dropGroup||t.ddGroup,allowContainerDrops:t.allowContainerDrops,appendOnly:t.appendOnly,allowParentInserts:t.allowParentInserts,expandDelay:t.expandDelay,dropHighlightColor:t.nodeHighlightColor,dropHighlight:t.nodeHighlightOnDrop,sortOnDrop:t.sortOnDrop,containerScroll:t.containerScroll}))}},function(){var n=this.prototype;n.nodeHighlightOnDrop=n.nodeHighlightOnRepair=Ext.enableFx})