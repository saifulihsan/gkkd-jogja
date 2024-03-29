jun.PeBankTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "PeBankTrans",
    id: "docs-jun.PeBankTransGrid",
    width: 400,
    height: 250,
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "id",
        resizable: !0,
        dataIndex: "id",
        width: 100
    }, {
        header: "type",
        resizable: !0,
        dataIndex: "type",
        width: 100
    }, {
        header: "trans_no",
        resizable: !0,
        dataIndex: "trans_no",
        width: 100
    }, {
        header: "bank_act",
        resizable: !0,
        dataIndex: "bank_act",
        width: 100
    }, {
        header: "ref",
        resizable: !0,
        dataIndex: "ref",
        width: 100
    }, {
        header: "trans_date",
        resizable: !0,
        dataIndex: "trans_date",
        width: 100
    } ],
    initComponent: function() {
        this.store = jun.rztPeBankTrans, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Add",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Edit",
                ref: "../btnEdit"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Delete",
                ref: "../btnDelete"
            } ]
        }, jun.rztPeBankTrans.reload(), jun.PeBankTransGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.btnDelete.on("Click", this.deleteRec, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PeBankTransWin({
            modez: 0
        });
        a.show();
    },
    loadEditForm: function() {
        var a = this.sm.getSelected();
        if (a == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var b = a.json.id, c = new jun.PeBankTransWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin menghapus data ini?", this.deleteRecYes, this);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Data");
            return;
        }
        Ext.Ajax.request({
            url: "PondokEfata/PeBankTrans/delete/id/" + b.json.id,
            method: "POST",
            success: function(a, b) {
                jun.rztPeBankTrans.reload();
                var c = Ext.decode(a.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
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
    }
}), jun.pebankTransStore = new Ext.data.JsonStore({
    root: "data",
    storeId: "pebankTransStore",
    url: "PondokEfata/PeBankTrans/view",
    fields: [ {
        name: "type"
    }, {
        name: "ref"
    }, {
        name: "tgl"
    }, {
        name: "debit"
    }, {
        name: "kredit"
    }, {
        name: "neraca"
    }, {
        name: "person"
    } ],
    autoLoad: !1,
    autoSave: !1
}), jun.PeBankTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Mutasi Kas per Bank",
    id: "docs-jun.peBankTransGrid",
    viewConfig: {
        forceFit: !0,
        getRowClass: function(a, b) {
            var c = a.get("type");
            if (c.indexOf("Saldo Awal -") !== -1) return "x-row-bold";
            if (c.indexOf("Saldo Akhir -") !== -1) return "x-row-bold";
        }
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "Type",
        resizable: !0,
        dataIndex: "type"
    }, {
        header: "Reference",
        resizable: !0,
        dataIndex: "ref"
    }, {
        header: "Tanggal",
        resizable: !0,
        dataIndex: "tgl"
    }, {
        header: "Debit",
        resizable: !0,
        dataIndex: "debit",
        align: "right"
    }, {
        header: "Kredit",
        resizable: !0,
        dataIndex: "kredit",
        align: "right"
    }, {
        header: "Neraca",
        resizable: !0,
        dataIndex: "neraca",
        align: "right"
    }, {
        header: "Person",
        resizable: !0,
        dataIndex: "person"
    } ],
    initComponent: function() {
        this.store = jun.pebankTransStore, this.store.on({
            load: {
                fn: function(a, b, c) {},
                scope: this
            },
            loadexception: {
                fn: function(a, b, c, d) {
                    console.info("store loadexception, arguments:", arguments), console.info("error = ", d);
                },
                scope: this
            }
        }), this.store.on("beforeload", function(a, b) {
            b.params = {
                bank_act: Ext.getCmp("pe_bank_act_banktrans").getValue(),
                from_date: new Date(Ext.getCmp("pe_from_date_banktrans").getValue()).dateFormat("Y-m-d"),
                to_date: new Date(Ext.getCmp("pe_to_date_banktrans").getValue()).dateFormat("Y-m-d")
            };
        }), this.tbar = {
            xtype: "toolbar",
            buttonAlign: "center",
            items: [ "Akun Bank : ", {
                xtype: "combo",
                id: "pe_bank_act_banktrans",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "bank_act",
                store: jun.rztPeBankAccounts,
                valueField: "id",
                displayField: "bank_account_name"
            }, {
                xtype: "tbseparator"
            }, " Dari : ", {
                xtype: "datefield",
                name: "from_date_banktrans",
                id: "pe_from_date_banktrans",
                format: "d/m/Y",
                value: new Date()
            }, {
                xtype: "tbseparator"
            }, " Sampai : ", {
                xtype: "datefield",
                name: "to_date_banktrans",
                id: "pe_to_date_banktrans",
                format: "d/m/Y",
                value: new Date()
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Tampilkan",
                ref: "../btnRefresh"
            } ]
        }, jun.rztPeBankAccounts.reload(), jun.PeBankTransGrid.superclass.initComponent.call(this), 
        this.btnRefresh.on("click", this.onbtnRefreshClick, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    onbtnPrintClick: function() {
        Ext.getCmp("form-PeChartTypes").getForm().submit({
            url: "PondokEfata/PeBankTrans/print/",
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPeChartTypes.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PeChartTypes").getForm().reset());
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
        }), Ext.Ajax.request({
            waitMsg: "Please Wait",
            url: "PondokEfata/PeBankTrans/print/",
            params: {
                bank_act: Ext.getCmp("bank_act_banktrans").getValue(),
                from_date: new Date(Ext.getCmp("from_date_banktrans").getValue()).dateFormat("Y-m-d"),
                to_date: new Date(Ext.getCmp("to_date_banktrans").getValue()).dateFormat("Y-m-d")
            },
            success: function(a) {},
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
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    onbtnRefreshClick: function() {
        this.store.load();
    },
    loadForm: function() {
        var a = new jun.BankTransWin({
            modez: 0
        });
        a.show();
    },
    loadEditForm: function() {
        var a = this.sm.getSelected();
        if (a == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var b = a.json.id, c = new jun.BankTransWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin menghapus data ini?", this.deleteRecYes, this);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }
        Ext.Ajax.request({
            waitMsg: "Please Wait",
            url: "Wanted/BankTrans/delete/id/" + b.json.id,
            method: "POST",
            success: function(a) {
                jun.rztBankTrans.reload(), Ext.Msg.alert("Pelayanan", "Delete Berhasil");
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
    }
});