jun.PeAnggaranDetilGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "PeAnggaranDetil",
    id: "docs-jun.PeAnggaranDetilGrid",
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
        hidden: !0,
        width: 100
    }, {
        header: "Kode Rekening",
        sortable: !0,
        resizable: !0,
        dataIndex: "account_code",
        width: 50
    }, {
        header: "Nama Rekening",
        sortable: !0,
        resizable: !0,
        dataIndex: "account_code",
        renderer: renderPeChartMaster
    }, {
        header: "Jumlah",
        sortable: !0,
        resizable: !0,
        dataIndex: "amount",
        align: "right",
        renderer: Ext.util.Format.numberRenderer("0,0"),
        width: 100
    } ],
    initComponent: function() {
        this.store = jun.rztPeAnggaranDetil, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                iconCls: "asp-pay_add",
                text: "Tambah Alokasi",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                iconCls: "asp-pay_delete",
                text: "Hapus Alokasi",
                ref: "../btnDelete"
            } ]
        }, jun.PeAnggaranDetilGrid.superclass.initComponent.call(this), this.btnAdd.on("Click", this.loadForm, this), 
        this.btnDelete.on("Click", this.deleteRec, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PeAnggaranDetilWin({
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
        var b = a.data.account_code, c = new jun.PeAnggaranDetilWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin menghapus alokasi ini?", this.deleteRecYes, this);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih alokasi");
            return;
        }
        var c = this.store.find("account_code", b.data.account_code);
        this.store.removeAt(c), this.store.refreshData();
    }
});