jun.login = new Ext.extend(Ext.Window, {
    width: 300,
    height: 140,
    layout: "form",
    modal: !0,
    closable: !1,
    resizable: !1,
    plain: !0,
    border: !1,
    title: "Please Login",
    padding: 5,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-Login",
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            plain: !0,
            items: [ {
                xtype: "textfield",
                hideLabel: !1,
                id: "usernameid",
                ref: "../username",
                maxLength: 128,
                anchor: "100%",
                fieldLabel: "Username",
                name: "loginUsername",
                allowBlank: !1
            }, {
                xtype: "textfield",
                hideLabel: !1,
                id: "passwordid",
                ref: "../password",
                maxLength: 128,
                anchor: "100%",
                fieldLabel: "Password",
                name: "loginPassword",
                inputType: "password",
                allowBlank: !1
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Login",
                hidden: !1,
                ref: "../btnLogin"
            } ]
        }, jun.login.superclass.initComponent.call(this), this.btnLogin.on("click", this.onbtnLoginClick, this);
    },
    onbtnLoginClick: function() {
        var a = Ext.getCmp("passwordid").getValue();
        a = jun.EncryptPass(a), Ext.getCmp("passwordid").setValue(a), Ext.getCmp("form-Login").getForm().submit({
            url: "login",
            waitTitle: "Connecting",
            waitMsg: "Sending data...",
            success: function() {
                var a = BASE_URL;
                window.location = a;
            },
            failure: function(a, b) {
                b.failureType == "server" ? (obj = Ext.util.JSON.decode(b.response.responseText), 
                Ext.Msg.alert("Login Failed!", obj.errors.reason)) : Ext.Msg.alert("Warning!", "Authentication server is unreachable : " + b.response.responseText), 
                Ext.getCmp("form-Login").getForm().reset();
            }
        });
    }
}), jun.ViewportUi = Ext.extend(Ext.Viewport, {
    layout: "border",
    initComponent: function() {
        this.items = [ {
            xtype: "box",
            region: "north",
            applyTo: "header",
            height: 30
        }, {
            xtype: "container",
            autoEl: "div",
            region: "west",
            height: 20
        }, {
            xtype: "container",
            autoEl: "div",
            region: "east",
            height: 20
        }, {
            xtype: "container",
            autoEl: "div",
            region: "south",
            height: 20
        } ], jun.ViewportUi.superclass.initComponent.call(this);
    }
}), jun.win = new Ext.extend(Ext.Window, {
    layout: "fit",
    width: 300,
    height: 150,
    closable: !1,
    resizable: !1,
    plain: !0,
    border: !1,
    initComponent: function() {
        this.items = [ jun.login ], jun.win.superclass.initComponent.call(this);
    }
}), Ext.onReady(function() {
    var a = function() {
        Ext.get("loading").remove(), Ext.fly("loading-mask").fadeOut({
            remove: !0
        });
    };
    Ext.QuickTips.init();
    var b = new jun.login({});
    b.show();
});