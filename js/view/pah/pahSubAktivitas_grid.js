jun.PahSubAktivitasGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Sub Aktivitas",
    id: "docs-jun.PahSubAktivitasGrid",
    iconCls: "silk-grid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "id",
        sortable: !0,
        resizable: !0,
        dataIndex: "id",
        width: 100,
        hidden: !0
    }, {
        header: "Kode Rekening",
        sortable: !0,
        resizable: !0,
        dataIndex: "account_code",
        width: 100
    }, {
        header: "Nama",
        sortable: !0,
        resizable: !0,
        dataIndex: "nama",
        width: 100
    }, {
        header: "Keterangan",
        sortable: !0,
        resizable: !0,
        dataIndex: "desc",
        width: 100
    }, {
        header: "Status",
        dataIndex: "inactive",
        renderer: jun.renderActive
    } ],
    initComponent: function() {
        this.store = jun.rztPahSubAktivitas, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Tambah Sub Aktivitas",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Ubah Sub Aktivitas",
                ref: "../btnEdit"
            } ]
        }, jun.PahSubAktivitasGrid.superclass.initComponent.call(this), this.btnAdd.on("Click", this.loadForm, this), 
        this.btnEdit.on("Click", this.loadEditForm, this), this.getSelectionModel().on("rowselect", this.getrow, this), 
        jun.rztPahSubAktivitas.load();
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PahSubAktivitasWin({
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
        var b = a.json.id, c = new jun.PahSubAktivitasWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(a);
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
            url: "PondokHarapan/PahSubAktivitas/delete/id/" + b.json.id,
            method: "POST",
            success: function(a) {
                jun.rztPahSubAktivitas.reload(), Ext.Msg.alert("Pelayanan", "Delete Berhasil");
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