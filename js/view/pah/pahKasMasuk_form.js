jun.PahKasMasukWin = Ext.extend(Ext.Window, {
    title: "Kas Masuk",
    modez: 1,
    width: 420,
    height: 310,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahKasMasuk",
            labelWidth: 120,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date",
                fieldLabel: "Tanggal Transaksi",
                name: "trans_date",
                id: "trans_dateid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "No. Bukti",
                hideLabel: !1,
                name: "no_bukti",
                id: "no_buktiid",
                ref: "../no_bukti",
                maxLength: 45,
                anchor: "100%"
            }, {
                xtype: "combo",
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Donatur",
                store: jun.rztPahDonatur,
                hiddenName: "pah_donatur_id",
                hiddenValue: "pah_donatur_id",
                valueField: "id",
                displayField: "name",
                forceSelection: !0,
                anchor: "100%",
                ref: "../cmbDonatur",
                editable: !1,
                lastQuery: ""
            }, {
                xtype: "combo",
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Kas/Bank",
                store: jun.rztPahBankAccounts,
                hiddenName: "pah_bank_accounts_id",
                hiddenValue: "pah_bank_accounts_id",
                valueField: "id",
                forceSelection: !0,
                displayField: "bank_account_name",
                anchor: "100%",
                ref: "../cmbBank",
                lastQuery: "",
                editable: !1
            }, new jun.comboPayment({
                fieldLabel: "Cara Bayar",
                value: "Tunai",
                anchor: "100%",
                name: "trans_via"
            }), {
                xtype: "textarea",
                fieldLabel: "Keterangan",
                hideLabel: !1,
                name: "note",
                id: "noteid",
                ref: "../note",
                anchor: "100%"
            }, {
                xtype: "numericfield",
                fieldLabel: "Jumlah",
                hideLabel: !1,
                name: "amount",
                id: "amountid",
                ref: "../amount",
                maxLength: 30,
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
        }, jun.rztPahDonatur.reload(), jun.rztPahBankAccounts.reload(), jun.PahKasMasukWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.on("close", this.onWinClose, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.cmbBank.on("focus", this.onLoadBank, this), 
        this.cmbDonatur.on("focus", this.onFocusDonatur, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onFocusDonatur: function() {
        jun.rztPahDonatur.FilterData();
    },
    onLoadBank: function() {
        jun.rztPahBankAccounts.FilterData();
    },
    onWinClose: function() {
        jun.rztPahBankAccounts.clearFilter(), jun.rztPahDonatur.clearFilter();
    },
    onActivate: function() {
        this.onLoadBank();
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahKasMasuk/update/id/" + this.id : a = "PondokHarapan/PahKasMasuk/create/", 
        Ext.getCmp("form-PahKasMasuk").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Kas Masuk",
                    msg: c.msg + "<br /> Ref. Dokumen : " + c.id,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("form-PahKasMasuk").getForm().reset(), jun.rztPahKasMasuk.reload(), 
                this.close();
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
}), jun.PahKasMasukShowWin = Ext.extend(Ext.Window, {
    title: "Penerimaan Kas",
    modez: 1,
    width: 500,
    height: 230,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahKasMasukShow",
            layout: "absolute",
            ref: "formz",
            border: !1,
            anchor: "100% 100%",
            items: [ {
                xtype: "label",
                text: "Ref. Dokumen : ",
                x: 5,
                y: 5,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../txtRef",
                id: "refid",
                x: 100,
                y: 5
            }, {
                xtype: "label",
                text: "Tanggal Entry : ",
                x: 240,
                y: 5,
                width: 100,
                style: "text-align:right;"
            }, {
                xtype: "label",
                text: "",
                ref: "../trans_entry",
                x: 355,
                y: 5
            }, {
                xtype: "label",
                text: "No. Bukti : ",
                x: 5,
                y: 25,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../no_bukti",
                x: 100,
                y: 25
            }, {
                xtype: "label",
                text: "Tanggal Transaksi : ",
                x: 240,
                y: 25,
                width: 100,
                style: "text-align:right;"
            }, {
                xtype: "label",
                text: "",
                ref: "../trans_date",
                x: 355,
                y: 25
            }, {
                xtype: "label",
                text: "Kas / Bank : ",
                x: 240,
                y: 45,
                width: 100,
                style: "text-align:right;"
            }, {
                xtype: "label",
                text: "",
                ref: "../kas",
                x: 355,
                y: 45
            }, {
                xtype: "label",
                text: "Diterima Dari : ",
                x: 5,
                y: 45,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../donatur",
                x: 100,
                y: 45
            }, {
                xtype: "label",
                text: "Jumlah : ",
                x: 5,
                y: 65,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../amount",
                x: 100,
                y: 65
            }, {
                xtype: "label",
                text: "Cara Bayar : ",
                x: 240,
                y: 65,
                width: 100,
                style: "text-align:right;"
            }, {
                xtype: "label",
                text: "",
                ref: "../trans_via",
                x: 355,
                y: 65
            }, {
                xtype: "label",
                text: "Kode Rekening : ",
                x: 5,
                y: 85,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../codeRek",
                x: 100,
                y: 85
            }, {
                xtype: "label",
                text: "",
                ref: "../codeDesc",
                x: 150,
                y: 85,
                anchor: "100% 100%",
                style: "white-space: normal;"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Tutup",
                ref: "../btnCancel"
            } ]
        }, jun.PahKasMasukShowWin.superclass.initComponent.call(this), this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    onbtnCancelclick: function() {
        this.close();
    }
}), jun.PahKasMasukVoidWin = Ext.extend(Ext.Window, {
    title: "Void Kas Masuk",
    modez: 1,
    width: 300,
    height: 150,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahKasMasukVoid",
            layout: "absolute",
            ref: "formz",
            border: !1,
            anchor: "100% 100%",
            items: [ {
                xtype: "label",
                text: "Alasan Void : ",
                x: 5,
                y: 5,
                width: 100
            }, {
                xtype: "textarea",
                fieldLabel: "memo",
                ref: "../memo",
                id: "memo_id",
                name: "memo_",
                x: 5,
                y: 25,
                anchor: "100% 100%"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Proses",
                ref: "../btnProses"
            }, {
                xtype: "button",
                text: "Batal",
                ref: "../btnCancel"
            } ]
        }, jun.PahKasMasukVoidWin.superclass.initComponent.call(this), this.btnProses.on("click", this.onbtnProsesclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnProses.setDisabled(a);
    },
    onbtnProsesclick: function() {
        this.btnDisabled(!0);
        var a = Ext.getCmp("form-PahKasMasukVoid").getForm();
        Ext.getCmp("form-PahKasMasukVoid").getForm().submit({
            url: "PondokHarapan/PahKasMasuk/delete/",
            params: {
                id: this.id
            },
            method: "POST",
            scope: this,
            timeOut: 1e3,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Kas Masuk",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("form-PahKasMasukVoid").getForm().reset(), jun.rztPahKasMasuk.reload(), 
                this.close();
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
    onbtnCancelclick: function() {
        this.close();
    }
});