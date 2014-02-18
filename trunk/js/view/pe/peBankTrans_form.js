jun.PeTranferBankWin = Ext.extend(Ext.Window, {
    title: "Mutasi Antar Kas/Bank",
    modez: 1,
    id: "pe-win-transfer-bank",
    width: 600,
    height: 250,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    resizable: !1,
    iswin: !0,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "pe-form-Transfer-bank",
            labelWidth: 100,
            labelAlign: "left",
            layout: "column",
            ref: "formz",
            border: !1,
            items: [ {
                columnWidth: .5,
                baseCls: "x-plain",
                bodyStyle: "padding:1px",
                layout: "form",
                ref: "col1",
                items: [ {
                    xtype: "combo",
                    typeAhead: !0,
                    triggerAction: "all",
                    lazyRender: !0,
                    mode: "local",
                    fieldLabel: "Bank Asal",
                    store: jun.rztPeBankAccounts,
                    hiddenName: "bank_act_asal",
                    hiddenValue: "bank_act",
                    valueField: "id",
                    ref: "../../cmbBankAsal",
                    forceSelection: !0,
                    displayField: "bank_account_name",
                    anchor: "100%",
                    lastQuery: ""
                }, {
                    xtype: "numericfield",
                    fieldLabel: "Bank Balance",
                    hideLabel: !1,
                    name: "bank_bal",
                    id: "bank_bal_id",
                    readOnly: !0,
                    ref: "../../lblBankBal",
                    anchor: "100%"
                }, {
                    xtype: "combo",
                    typeAhead: !0,
                    triggerAction: "all",
                    lazyRender: !0,
                    mode: "local",
                    fieldLabel: "Bank Tujuan",
                    store: jun.rztPeBankAccounts,
                    hiddenName: "bank_act_tujuan",
                    hiddenValue: "bank_act",
                    valueField: "id",
                    forceSelection: !0,
                    displayField: "bank_account_name",
                    anchor: "100%",
                    ref: "../../cmbBankTujuan",
                    lastQuery: ""
                }, {
                    xtype: "xdatefield",
                    fieldLabel: "Tanggal Transfer",
                    hideLabel: !1,
                    name: "trans_date",
                    id: "refid",
                    maxLength: 40,
                    anchor: "100%"
                }, {
                    xtype: "numericfield",
                    fieldLabel: "Jumlah",
                    hideLabel: !1,
                    name: "amount",
                    id: "amountid",
                    maxLength: 20,
                    anchor: "100%"
                } ]
            }, {
                columnWidth: .5,
                baseCls: "x-plain",
                bodyStyle: "padding:5px 0 5px 5px",
                layout: "column",
                items: [ {
                    xtype: "label",
                    text: "Memo :"
                }, {
                    xtype: "textarea",
                    name: "memo",
                    id: "memoid",
                    height: "77%",
                    width: "100%"
                } ]
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
        }, jun.rztPeBankAccounts.reload(), jun.PeTranferBankWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.cmbBankAsal.on("select", this.oncmbBankAsalChange, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.cmbBankAsal.on("focus", this.onLoadBank, this), 
        this.cmbBankTujuan.on("focus", this.onLoadBank, this), this.on("close", this.onWinClose, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onWinClose: function() {
        jun.rztPeBankAccounts.clearFilter();
    },
    onLoadBank: function() {
        jun.rztPeBankAccounts.FilterData();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    oncmbBankAsalChange: function(a, b, c) {
        Ext.Ajax.request({
            waitMsg: "Please Wait",
            url: "PondokEfata/PeBankTrans/GetBalance/",
            params: {
                id: this.cmbBankAsal.getValue()
            },
            success: function(a) {
                var a = Ext.decode(a.responseText);
                Ext.getCmp("bank_bal_id").setValue(a.id);
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
            }
        });
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        a = "PondokEfata/PeBankTrans/createtransfer/", Ext.getCmp("pe-form-Transfer-bank").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                if (c.success == 0) {
                    Ext.MessageBox.show({
                        title: "Transfer",
                        msg: c.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    }), this.btnDisabled(!1);
                    return;
                }
                Ext.MessageBox.show({
                    title: "Transfer",
                    msg: c.msg + "<br /> Ref. Dokumen : " + c.id,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("pe-form-Transfer-bank").getForm().reset(), jun.rztPeBankTrans.reload(), 
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
});