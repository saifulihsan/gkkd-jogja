jun.sidebar = new jun.TreeUi({
    dataUrl:'site/tree/'
});
jun.sidebar.on('click', function (node, e) {
    if (node.isLeaf()) {
        e.stopEvent();
        if(node.id == 'logout'){
            Ext.MessageBox.confirm('Pertanyaan','Apakah anda yakin ingin logout?', function(btn){
                if (btn == 'no')
                    return;
                window.location.href = 'site/logout';
            }, this);
        }
        jun.mainPanel.loadClass(node.id);
    }
});
var clock = new Ext.Toolbar.TextItem('Jam');
jun.Send = Ext.extend(Ext.Window, {
    width: 1,
    height: 1,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-Send',
                labelWidth: 1,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: []
            }
        ];
        jun.Send.superclass.initComponent.call(this);
    }
});
var send = new jun.Send({});
send.show();
send.hide();
jun.mainPanel = new jun.TabsUi();
jun.ViewportUi = Ext.extend(Ext.Viewport, {
    layout:'border',
    initComponent:function () {
//        bbar: new Ext.ux.StatusBar({
//            id: 'word-status',
//            items: [clock, ' ']
//        }),
        this.items = [
            {
                xtype:'box',
                region:'north',
                id:'app-header',
                html:'Sistem Informasi Gereja Kristen Kemah Daud Yogyakarta<br />' +
                    '<span class="subtitle">Villa Seturan Indah Bl D/10, Caturnunggal, Depok Yogyakarta 55281</span>',
                height:60
            },
            jun.sidebar,
            jun.mainPanel,
//        {
//            xtype: 'panel',
//            autoEl: 'div',
//            region: 'south',
//            height: 20
//        }
        ];
        jun.ViewportUi.superclass.initComponent.call(this);
    }
});
Ext.onReady(function () {
    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true     
        });
    }
    Ext.QuickTips.init();
    loadText = 'Sedang proses... silahkan tunggu';
    Ext.Ajax.on('beforerequest', function () {
        Ext.getBody().mask(loadText, 'x-mask-loading', true)
    }, Ext.getBody());
    Ext.Ajax.on('requestcomplete', Ext.getBody().unmask, Ext.getBody());
    Ext.Ajax.on('requestexception', Ext.getBody().unmask, Ext.getBody());
    var myViewport = new jun.ViewportUi({
        
    });
});
