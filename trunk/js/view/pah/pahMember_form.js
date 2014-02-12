jun.PahMemberWin = Ext.extend(Ext.Window, {
    title: "Penghuni Pondok",
    iconCls: "asp-user8",
    modez: 1,
    width: 500,
    height: 140,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahMember",
            labelWidth: 200,
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
                fieldLabel: "Nama Penghuni Pondok",
                store: jun.rztJemaat,
                hiddenName: "jemaat_nij",
                hiddenValue: "jemaat_nij",
                valueField: "nij",
                forceSelection: !0,
                displayField: "real_name",
                anchor: "100%",
                ref: "../cmbName"
            }, new jun.comboActive({
                fieldLabel: "Status",
                hideLabel: !1,
                width: 100,
                height: 20,
                name: "inactive",
                id: "inactiveid",
                ref: "../cmbActive",
                hiddenName: "inactive",
                hiddenValue: "inactive"
            }) ]
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
        }, jun.PahMemberWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.modez == 1 || this.modez == 2 ? (this.cmbName.setDisabled(!0), 
        this.btnSave.setVisible(!1)) : (this.cmbName.setDisabled(!1), this.btnSave.setVisible(!0));
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
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahMember/update/id/" + this.id : a = "PondokHarapan/PahMember/create/", 
        Ext.getCmp("form-PahMember").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahMemberbyName.load();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahMember").getForm().reset(), this.btnDisabled(!1));
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