jun.PahSuppliersWin = Ext.extend(Ext.Window, {
    title: "Pemasok",
    iconCls: "silk13-package",
    modez: 1,
    width: 400,
    height: 300,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahSuppliers",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "textfield",
                fieldLabel: "Nama Pemasok",
                hideLabel: !1,
                name: "supp_name",
                id: "supp_nameid",
                ref: "../supp_name",
                maxLength: 60,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Ref. Pemasok",
                hideLabel: !1,
                name: "supp_ref",
                id: "supp_refid",
                ref: "../supp_ref",
                maxLength: 30,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "E-Mail",
                hideLabel: !1,
                name: "mail_address",
                id: "mail_addressid",
                ref: "../mail_address",
                anchor: "100%"
            }, {
                xtype: "textarea",
                fieldLabel: "Alamat",
                hideLabel: !1,
                name: "address",
                id: "addressid",
                ref: "../address",
                anchor: "100%",
                height: 50
            }, new jun.comboActive({
                fieldLabel: "Status",
                hideLabel: !1,
                width: 100,
                height: 20,
                name: "inactive",
                id: "inactiveid",
                ref: "../inactive",
                hiddenName: "inactive",
                hiddenValue: "inactive"
            }), {
                xtype: "textarea",
                fieldLabel: "Keterangan",
                hideLabel: !1,
                name: "notes",
                id: "notesid",
                ref: "../notes",
                anchor: "100%",
                height: 50
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
        }, jun.PahSuppliersWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.modez == 1 || this.modez == 2 ? this.btnSave.setVisible(!1) : this.btnSave.setVisible(!0);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahSuppliers/update/id/" + this.id : a = "PondokHarapan/PahSuppliers/create/", 
        Ext.getCmp("form-PahSuppliers").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahSuppliers.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahSuppliers").getForm().reset()), this.btnDisabled(!1);
            },
            failure: function (f, a) {
                switch (a.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert(a.response.statusText, a.response.responseText);
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', a.result.msg);
                }
                this.btnDisabled(false);
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