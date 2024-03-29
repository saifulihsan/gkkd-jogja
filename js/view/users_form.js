Ext.apply(Ext.form.VTypes, {
    password: function(a, b) {
        if (b.initialPassField) {
            var c = Ext.getCmp(b.initialPassField);
            return a == c.getValue();
        }
        return !0;
    },
    passwordText: "Passwords do not match"
}), jun.UsersWin = Ext.extend(Ext.Window, {
    title: "Users",
    iconCls: "asp-user2",
    modez: 1,
    width: 425,
    height: 250,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-Users",
            labelWidth: 125,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Nama Jemaat",
                store: jun.rztJemaat,
                hiddenName: "nij",
                hiddenValue: "nij",
                valueField: "nij",
                forceSelection: !0,
                displayField: "real_name",
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "User Id",
                hideLabel: !1,
                name: "user_id",
                id: "user_idid",
                ref: "../user_id",
                maxLength: 60,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Password",
                hideLabel: !1,
                name: "password",
                id: "passwordid",
                ref: "../password",
                maxLength: 100,
                anchor: "100%",
                inputType: "password"
            }, {
                xtype: "textfield",
                fieldLabel: "Confirm Password",
                hideLabel: !1,
                name: "password-cfrm",
                id: "password-cfrmid",
                ref: "../password-cfrm",
                maxLength: 100,
                anchor: "100%",
                inputType: "password",
                vtype: "password",
                initialPassField: "passwordid"
            }, new jun.comboActive({
                fieldLabel: "Status",
                hideLabel: !1,
                width: 100,
                height: 20,
                ref: "../cmbActive",
                id: "statusid"
            }), {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Rule",
                store: jun.rztSecurityRoles,
                hiddenName: "security_roles_id",
                hiddenValue: "security_roles_id",
                valueField: "id",
                forceSelection: !0,
                displayField: "role",
                anchor: "100%"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Simpan",
                hidden: !1,
                ref: "../btnSave"
            }, {
                xtype: "button",
                text: "Simpan & Tutup",
                ref: "../btnSaveClose"
            }, {
                xtype: "button",
                text: "Batal",
                ref: "../btnCancel"
            } ]
        }, jun.rztJemaat.reload(), jun.rztSecurityRoles.reload(), jun.UsersWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a, b = Ext.getCmp("passwordid").getValue(), c = b;
        b = jun.EncryptPass(b), Ext.getCmp("passwordid").setValue(b), this.modez == 1 || this.modez == 2 ? a = "general/Users/update/id/" + this.id : a = "general/Users/create/", 
        Ext.getCmp("form-Users").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztUsers.reload();
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), this.closeForm && this.close(), this.modez == 0 && Ext.getCmp("form-Users").getForm().reset(), 
                this.btnDisabled(!1);
            },
            failure: function(a, b) {
                if (b.failureType == "client") return;
                Ext.getCmp("passwordid").setValue(c);
                var d = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Warning",
                    msg: d.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                }), this.btnDisabled(!1);
            }
        });
    },
    onbtnSaveCloseClick: function() {
        this.closeForm = !0, this.saveForm(!0);
    },
    onbtnSaveclick: function() {
        this.closeForm = !1, this.saveForm(!1);
    },
    onbtnCancelclick: function() {
        this.close();
    }
}), jun.PasswordWin = Ext.extend(Ext.Window, {
    title: "Ganti Password",
    iconCls: "asp-access",
    modez: 1,
    width: 425,
    height: 170,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    iswin: !0,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-Password",
            labelWidth: 150,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "textfield",
                fieldLabel: "Password Lama",
                hideLabel: !1,
                name: "passwordold",
                id: "passwordoldid",
                ref: "../passwordold",
                maxLength: 100,
                allowBlank: !1,
                anchor: "100%",
                inputType: "password"
            }, {
                xtype: "textfield",
                fieldLabel: "Password Baru",
                hideLabel: !1,
                name: "password",
                id: "passwordid",
                ref: "../password",
                maxLength: 100,
                allowBlank: !1,
                anchor: "100%",
                inputType: "password"
            }, {
                xtype: "textfield",
                fieldLabel: "Konfirmasi Password Baru",
                hideLabel: !1,
                name: "password-cfrm",
                id: "password-cfrmid",
                ref: "../password-cfrm",
                maxLength: 100,
                anchor: "100%",
                inputType: "password",
                vtype: "password",
                initialPassField: "passwordid"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Simpan",
                hidden: !1,
                ref: "../btnSave"
            }, {
                xtype: "button",
                text: "Batal",
                ref: "../btnCancel"
            } ]
        }, jun.rztJemaat.reload(), jun.rztSecurityRoles.reload(), jun.PasswordWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a = Ext.getCmp("passwordoldid").getValue(), b = a;
        a = jun.EncryptPass(a), Ext.getCmp("passwordoldid").setValue(a);
        var c = Ext.getCmp("passwordid").getValue(), d = c;
        c = jun.EncryptPass(c), Ext.getCmp("passwordid").setValue(c);
        var e = Ext.getCmp("password-cfrmid").getValue(), f = e;
        e = jun.EncryptPass(e), Ext.getCmp("password-cfrmid").setValue(e), Ext.getCmp("form-Password").getForm().submit({
            url: "general/users/UpdatePass",
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), this.close();
            },
            failure: function(a, c) {
                if (c.failureType == "client") return;
                var e = Ext.decode(c.response.responseText);
                Ext.getCmp("passwordoldid").setValue(b), Ext.getCmp("passwordid").setValue(d), Ext.getCmp("passwordid").setValue(f), 
                Ext.MessageBox.show({
                    title: "Warning",
                    msg: e.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                }), this.btnDisabled(!1);
            }
        });
    },
    onbtnSaveCloseClick: function() {
        this.closeForm = !0, this.saveForm(!0);
    },
    onbtnSaveclick: function() {
        this.closeForm = !1, this.saveForm(!1);
    },
    onbtnCancelclick: function() {
        this.close();
    }
}), jun.UbahSecurity = Ext.extend(Ext.Window, {
    title: "Ganti Security Role",
    iconCls: "asp-access",
    modez: 1,
    width: 425,
    height: 170,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    iswin: !0,
    initComponent: function() {
        jun.rztSecurityRoles.reload(), this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-Security",
            labelWidth: 150,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Security Rule",
                store: jun.rztSecurityRoles,
                hiddenName: "security_roles_id",
                hiddenValue: "security_roles_id",
                valueField: "id",
                forceSelection: !0,
                displayField: "role",
                anchor: "100%"
            }, {
                xtype: "hidden",
                name: "id",
                ref: "../id"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Simpan",
                hidden: !1,
                ref: "../btnSave"
            }, {
                xtype: "button",
                text: "Batal",
                ref: "../btnCancel"
            } ]
        }, jun.UbahSecurity.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0), Ext.getCmp("form-Security").getForm().submit({
            url: "general/users/UpdateRole",
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), jun.rztUsers.reload(), this.close();
            },
            failure: function(a, b) {
                if (b.failureType == "client") return;
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Warning",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                }), this.btnDisabled(!1);
            }
        });
    },
    onbtnSaveCloseClick: function() {
        this.closeForm = !0, this.saveForm(!0);
    },
    onbtnSaveclick: function() {
        this.closeForm = !1, this.saveForm(!1);
    },
    onbtnCancelclick: function() {
        this.close();
    }
});