jun.PahAktivitasGrupGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Grup Anak",
    id: "docs-jun.PahAktivitasGrupGrid",
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
        header: "Nama Grup",
        sortable: !0,
        resizable: !0,
        dataIndex: "name",
        width: 100
    }, {
        header: "Keterangan",
        sortable: !0,
        resizable: !0,
        dataIndex: "notes"
    }, {
        header: "Status",
        sortable: !0,
        resizable: !0,
        dataIndex: "inactive",
        renderer: jun.renderActive,
        width: 50
    } ],
    initComponent: function() {
        this.store = jun.rztPahAktivitasGrup, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Tambah",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Ubah",
                ref: "../btnEdit"
            } ]
        }, jun.rztPahAktivitasGrup.reload(), jun.PahAktivitasGrupGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
    },
    loadForm: function() {
        var a = new jun.PahAktivitasGrupWin({
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
        var b = a.json.id, c = new jun.PahAktivitasGrupWin({
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
            url: "PondokHarapan/PahAktivitasGrup/delete/id/" + b.json.id,
            method: "POST",
            success: function(a, b) {
                jun.rztPahAktivitasGrup.reload();
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
});