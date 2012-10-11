//jun.home = new jun.homePanel({title:'Home'});
//jun.userGrid = new jun.TblUserGrid({title:'Manage User'});
//new Ext.Panel({title:'home',html:'<p style="padding:25px">welcome to the jungle</p>'});
jun.TabsUi = Ext.extend(Ext.TabPanel, {
    activeTab:0,
    region:'center',
    frame:true,
    id:'mainpanel',
    enableTabScroll:true,
    initComponent:function () {
        this.items = [
            //jun.home
        ];
        jun.TabsUi.superclass.initComponent.call(this);
        this.on('load', this.onActivate, this);
    },
    onActivate:function (p) {
    },
    loadClass:function (href) {
        var id = 'docs-' + href;
        var tab = this.getComponent(id);
        var obj = eval(href);
        if (tab) {
            this.setActiveTab(tab);
        } else {

            var object = new obj({
                id:id,
                closable:true
            });
            if (object.iswin)
                object.show();
            else {
                var p = this.add(object);
                this.setActiveTab(p);
            }
        }
    }
});

