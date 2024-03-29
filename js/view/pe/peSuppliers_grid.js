jun.PeSuppliersGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Pemasok",
    id: "docs-jun.PeSuppliersGrid",
    iconCls: "silk-grid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "supplier_id",
        sortable: !0,
        resizable: !0,
        dataIndex: "supplier_id",
        hidden: !0,
        width: 100
    }, {
        header: "Nama Pemasok",
        sortable: !0,
        resizable: !0,
        dataIndex: "supp_name",
        width: 100
    }, {
        header: "Ref. Pemasok",
        sortable: !0,
        resizable: !0,
        dataIndex: "supp_ref",
        width: 100
    }, {
        header: "Alamat",
        sortable: !0,
        resizable: !0,
        dataIndex: "address",
        width: 100
    }, {
        header: "Status",
        dataIndex: "inactive",
        renderer: jun.renderActive
    } ],
    initComponent: function() {
        this.store = jun.rztPeSuppliers, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                iconCls: "silk13-package_add",
                text: "Tambah Pemasok",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                iconCls: "silk13-package_go",
                text: "Ubah Pemasok",
                ref: "../btnEdit"
            } ]
        }, jun.rztPeSuppliers.reload(), jun.PeSuppliersGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PeSuppliersWin({
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
        var b = a.json.supplier_id, c = new jun.PeSuppliersWin({
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
            url: "PondokEfata/PeSuppliers/delete/id/" + b.json.supplier_id,
            method: "POST",
            success: function(a, b) {
                jun.rztPeSuppliers.reload();
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