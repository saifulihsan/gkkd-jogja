jun.ajaxCounter = 0;
jun.TreeUi = Ext.extend(Ext.tree.TreePanel, {
    title: "Menu",
    useArrows: !0,
    region: "west",
    split: !0,
    autoScroll: !0,
    rootVisible: !1,
    floatable: !1,
    containerScroll: !0,
    dataUrl: "tree",
    width: 240,
    initComponent: function() {
        this.root = {
            text: "Menu"
        }, jun.TreeUi.superclass.initComponent.call(this);
    }
}), jun.sidebar = new jun.TreeUi({
    dataUrl: "site/tree"
}), jun.sidebar.on("click", function(a, b) {
    a.isLeaf() && (b.stopEvent(), a.id == "logout" ? Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin logout?", function(a) {
        if (a === "no") return;
        window.location.href = "site/logout";
    }, this) : jun.mainPanel.loadClass(a.id));
});

var clock = new Ext.Toolbar.TextItem("Jam");

jun.Send = Ext.extend(Ext.Window, {
    width: 1,
    height: 1,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-Send",
            labelWidth: 1,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: []
        } ], jun.Send.superclass.initComponent.call(this);
    }
});

var send = new jun.Send({});

send.show(), send.hide(), jun.mainPanel = new jun.TabsUi(), jun.ViewportUi = Ext.extend(Ext.Viewport, {
    layout: "border",
    initComponent: function() {
        this.items = [ {
            xtype: "box",
            region: "north",
            id: "app-header",
            html: SYSTEM_TITLE + "<br />" + '<span class="subtitle">' + SYSTEM_SUBTITLE + "</span>",
            height: 60
        }, jun.sidebar, jun.mainPanel ], jun.ViewportUi.superclass.initComponent.call(this);
    }
});
jun.myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Sedang proses... silahkan tunggu"});
Ext.onReady(function() {
    var a = function() {
        Ext.get("loading").remove(), Ext.fly("loading-mask").fadeOut({
            remove: !0
        });
    };
    Ext.QuickTips.init();
    //    loadText = "Sedang proses... silahkan tunggu";
    Ext.Ajax.on("beforerequest", function (conn, opts) {
        jun.myMask.show();
        jun.ajaxCounter++;
    });
    Ext.Ajax.on("requestcomplete", function (conn, response, opts) {
        if (jun.ajaxCounter > 1) {
            jun.ajaxCounter--;
        } else {
            jun.ajaxCounter = 0;
            jun.myMask.hide();
        }
    });
    Ext.Ajax.on("requestexception", function (conn, response, opts) {
        jun.ajaxCounter = 0;
        jun.myMask.hide();
        switch(response.status){
            case 403:
                window.location.href = 'site/logout';
                break;
            case 500:
                Ext.Msg.alert('Internal Server Error', response.responseText);
                break;
            default :
                Ext.Msg.alert(response.status + " " + response.statusText, response.responseText);
                break;
        }
    });
    var b = new jun.ViewportUi({});
});