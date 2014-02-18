jun.PeAnggaranGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Anggaran",
    id: "docs-jun.PeAnggaranGrid",
    iconCls: "silk-grid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    plugins: [ new Ext.ux.grid.GridHeaderFilters() ],
    columns: [ {
        header: "id",
        sortable: !0,
        resizable: !0,
        dataIndex: "id",
        hidden: !0,
        width: 100
    }, {
        header: "Ref. Dokumen",
        sortable: !0,
        resizable: !0,
        dataIndex: "doc_ref",
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "Periode Bulan",
        sortable: !0,
        resizable: !0,
        dataIndex: "periode_bulan",
        width: 100,
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "Periode Tahun",
        sortable: !0,
        resizable: !0,
        dataIndex: "periode_tahun",
        width: 100,
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "Tanggal Input",
        sortable: !0,
        resizable: !0,
        dataIndex: "trans_date",
        width: 100,
        filter: {
            xtype: "xdatefield",
            format: "Y-m-d"
        }
    } ],
    initComponent: function() {
        this.store = jun.rztPeAnggaran, this.bbar = {
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
                text: "Buat Anggaran",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Ubah Anggaran",
                ref: "../btnEdit"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Hapus Anggaran",
                ref: "../btnDelete"
            } ]
        }, jun.rztPeAnggaran.reload(), jun.PeAnggaranGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.btnDelete.on("Click", this.deleteRec, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PeAnggaranWin({
            modez: 0
        });
        a.show();
    },
    loadEditForm: function() {
        var a = this.sm.getSelected();
        if (a == undefined) {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Anggaran untuk di ubah.");
            return;
        }
        var b = a.json.id, c = new jun.PeAnggaranWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record), c.onloadrecordupdate();
    },
    deleteRec: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin menghapus data ini?", this.deleteRecYes, this);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Anggaran");
            return;
        }
        Ext.Ajax.request({
            url: "PondokEfata/PeAnggaran/delete",
            method: "POST",
            params: {
                id_anggaran: b.json.id
            },
            success: function(a, b) {
                jun.rztPeAnggaran.reload();
                var c = Ext.decode(a.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: "Anggaran berhasil dihapus." + c.msg,
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
});