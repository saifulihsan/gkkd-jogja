jun.PahAktivitasWin = Ext.extend(Ext.Window, {
    title: "Aktivitas",
    modez: 1,
    width: 450,
    height: 360,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahAktivitas",
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
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Pemasok",
                store: jun.rztPahSuppliers,
                hiddenName: "pah_suppliers_supplier_id",
                hiddenValue: "pah_suppliers_supplier_id",
                valueField: "supplier_id",
                forceSelection: !0,
                displayField: "supp_name",
                anchor: "100%",
                ref: "../cmbSupplier",
                lastQuery: ""
            }, {
                xtype: "combo",
                typeAhead: !0,
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
                lastQuery: ""
            }, new jun.comboPayment({
                fieldLabel: "Cara Bayar",
                value: "Tunai",
                anchor: "100%",
                name: "trans_via"
            }), {
                xtype: "combo",
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Anak",
                store: jun.rztPahMemberbyName,
                hiddenName: "pah_member_id",
                hiddenValue: "pah_member_id",
                valueField: "id",
                forceSelection: !0,
                displayField: "real_name",
                anchor: "100%",
                ref: "../cmbAnak"
            }, {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Sub Aktivitas",
                store: jun.rztPahSubAktivitas,
                hiddenName: "pah_sub_aktivitas_id",
                hiddenValue: "pah_sub_aktivitas_id",
                valueField: "id",
                forceSelection: !0,
                displayField: "nama",
                anchor: "100%",
                ref: "../cmbSubAktivitas",
                lastQuery: ""
            }, {
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
        }, jun.rztPahBankAccounts.reload(), jun.rztPahSuppliers.reload(), jun.rztPahMemberbyName.reload(), 
        jun.rztPahSubAktivitas.reload(), jun.PahAktivitasWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnCancel.on("click", this.onbtnCancelclick, this), 
        this.cmbBank.on("focus", this.onLoadBank, this), this.cmbSupplier.on("focus", this.onFocusSupplier, this), 
        this.cmbAnak.on("focus", this.onFocusAnak, this), this.cmbSubAktivitas.on("focus", this.onFocusAktivitas, this), 
        this.on("close", this.onWinClose, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onFocusAnak: function() {
        jun.rztPahMemberbyName.FilterData();
    },
    onFocusAktivitas: function() {
        jun.rztPahSubAktivitas.FilterData();
    },
    onLoadBank: function() {
        jun.rztPahBankAccounts.FilterData();
    },
    onFocusSupplier: function() {
        jun.rztPahSuppliers.FilterData();
    },
    onWinClose: function() {
        jun.rztPahBankAccounts.clearFilter(), jun.rztPahSuppliers.clearFilter(), jun.rztPahMemberbyName.clearFilter(), 
        jun.rztPahSubAktivitas.clearFilter();
    },
    onActivate: function() {
        this.btnSave.hidden = !1, jun.rztPahMemberbyName.reload();
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahAktivitas/update/id/" + this.id : a = "PondokHarapan/PahAktivitas/create/", 
        Ext.getCmp("form-PahAktivitas").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahAktivitas.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahAktivitas").getForm().reset()), this.btnDisabled(!1);
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
}), jun.PahAktivitasShowWin = Ext.extend(Ext.Window, {
    title: "Aktivitas Anak",
    modez: 1,
    width: 600,
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
            id: "form-PahAktivitasShow",
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
                text: "Diterima Oleh : ",
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
                text: "Nama Anak : ",
                x: 5,
                y: 85,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../anak",
                x: 100,
                y: 85
            }, {
                xtype: "label",
                text: "Sub Aktivitas : ",
                x: 240,
                y: 85,
                width: 100,
                style: "text-align:right;"
            }, {
                xtype: "label",
                text: "",
                ref: "../sub_aktivitas",
                x: 355,
                y: 85
            }, {
                xtype: "label",
                text: "Kode Rekening : ",
                x: 5,
                y: 105,
                width: 100
            }, {
                xtype: "label",
                text: "",
                ref: "../codeRek",
                x: 100,
                y: 105
            }, {
                xtype: "label",
                text: "",
                ref: "../codeDesc",
                x: 150,
                y: 105,
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
        }, jun.PahAktivitasShowWin.superclass.initComponent.call(this), this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    onbtnCancelclick: function() {
        this.close();
    }
}), jun.PahAktivitasVoidWin = Ext.extend(Ext.Window, {
    title: "Void Aktivitas",
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
            id: "form-PahAktivitasVoid",
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
        }, jun.PahAktivitasVoidWin.superclass.initComponent.call(this), this.btnProses.on("click", this.onbtnProsesclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnProses.setDisabled(a);
    },
    onbtnProsesclick: function() {
        this.btnDisabled(!0);
        var a = Ext.getCmp("form-PahAktivitasVoid").getForm();
        Ext.getCmp("form-PahAktivitasVoid").getForm().submit({
            url: "PondokHarapan/PahAktivitas/delete/",
            params: {
                id: this.id
            },
            method: "POST",
            scope: this,
            timeOut: 1e3,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                if (c.success == 0) {
                    Ext.MessageBox.show({
                        title: "Aktivitas",
                        msg: c.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                Ext.MessageBox.show({
                    title: "Aktivitas",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("form-PahAktivitasVoid").getForm().reset(), this.btnDisabled(!1), 
                jun.rztPahAktivitas.reload(), this.close();
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