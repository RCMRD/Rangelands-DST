Ext.define("Ext.data.JsonStore",{extend:"Ext.data.Store",alias:"store.json",requires:["Ext.data.proxy.Ajax","Ext.data.reader.Json","Ext.data.writer.Json"],constructor:function(n){n=Ext.apply({proxy:{type:"ajax",reader:"json",writer:"json"}},n);this.callParent([n])}})