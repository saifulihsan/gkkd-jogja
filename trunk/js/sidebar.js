Ext.namespace('jun');
jun.TreeUi = Ext.extend(Ext.tree.TreePanel, {
    title:'Menu',
    useArrows:true,
    region:'west',
    split:true,
    //collapsible: false,
    autoScroll:true,
    rootVisible:false,
    floatable:false,
//    enableDD:true,
    containerScroll: true,
    dataUrl:'site/tree/',
    width:240,
    initComponent:function () {
        this.root = {
            text:'Menu'
        };
        /*
         this.loader = {

         };*/
        jun.TreeUi.superclass.initComponent.call(this);
    }
});

