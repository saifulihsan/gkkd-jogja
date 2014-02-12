jun.PahAktivitasGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Aktivitas",
    id: "docs-jun.PahAktivitasGrid",
    iconCls: "silk-grid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    plugins: [ new Ext.ux.grid.GridHeaderFilters() ],
    columns: [ {
        header: "aktivitas_id",
        sortable: !0,
        resizable: !0,
        dataIndex: "aktivitas_id",
        hidden: !0,
        width: 100
    }, {
        header: "Tanggal Transaksi",
        sortable: !0,
        resizable: !0,
        dataIndex: "trans_date",
        width: 100,
        filter: {
            xtype: "xdatefield",
            format: "Y-m-d"
        }
    }, {
        header: "Ref. Dokumen",
        sortable: !0,
        resizable: !0,
        dataIndex: "doc_ref",
        width: 100,
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "No. Bukti",
        sortable: !0,
        resizable: !0,
        dataIndex: "no_bukti",
        width: 100,
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "Jumlah",
        sortable: !0,
        resizable: !0,
        dataIndex: "amount",
        width: 100,
        align: "right",
        renderer: Ext.util.Format.numberRenderer("0,0"),
        filter: {
            xtype: "numericfield"
        }
    } ],
    initComponent: function() {
        this.store = jun.rztPahAktivitas, this.bbar = {
            items: [ {
                xtype: "paging",
                store: this.store,
                displayInfo: !0,
                pageSize: 20
            } ]
        }, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Tambah Aktivitas Anak",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Lihat Aktivitas Anak",
                ref: "../btnEdit"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Void Aktivitas Anak",
                ref: "../btnDelete"
            } ]
        }, jun.rztPahBankAccounts.reload(), jun.rztPahSuppliers.reload(), jun.rztPahMemberbyName.reload(), 
        jun.rztPahSubAktivitas.reload(), jun.rztPahChartMaster.reload(), jun.PahAktivitasGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.btnDelete.on("Click", this.deleteRec, this), this.getSelectionModel().on("rowselect", this.getrow, this), 
        jun.rztPahAktivitas.load();
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PahAktivitasWin({
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
        var b = a.json.aktivitas_id;
        Ext.Ajax.request({
            url: "PondokHarapan/PahAktivitas/view/",
            params: {
                id: b
            },
            method: "POST",
            success: function(a, c) {
                var d = Ext.decode(a.responseText);
                if (d.success == 0) {
                    Ext.MessageBox.show({
                        title: "Warning",
                        msg: d.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
                var e = d.data[0], f = new jun.PahAktivitasShowWin({
                    modez: 1,
                    id: b
                });
                f.txtRef.text = e.doc_ref, f.trans_entry.text = e.entry_time, f.no_bukti.text = e.no_bukti, 
                f.trans_date.text = e.trans_date, f.kas.text = e.bank_account_name, f.donatur.text = e.supp_name, 
                f.amount.text = Ext.util.Format.number(e.amount, "0,0"), f.trans_via.text = e.trans_via, 
                f.codeRek.text = e.account_code, f.codeDesc.text = e.description, f.anak.text = e.real_name, 
                f.sub_aktivitas.text = e.nama, f.show(this);
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
    deleteRec: function() {
        var a = this.sm.getSelected();
        if (a == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Aktivitas");
            return;
        }
        var b = new jun.PahAktivitasVoidWin({
            id: a.json.aktivitas_id
        });
        b.show(this);
    }
});