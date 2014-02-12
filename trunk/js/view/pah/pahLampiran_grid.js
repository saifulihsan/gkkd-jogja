jun.PahLampiranGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Donasi Non Tunai",
    id: "docs-jun.PahLampiranGrid",
    iconCls: "silk-grid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    plugins: [ new Ext.ux.grid.GridHeaderFilters() ],
    columns: [ {
        header: "id_lampiran",
        sortable: !0,
        resizable: !0,
        dataIndex: "id_lampiran",
        hidden: !0,
        width: 100
    }, {
        header: "Nama Donatur",
        sortable: !0,
        resizable: !0,
        dataIndex: "nama",
        width: 100,
        filter: {
            xtype: "textfield"
        }
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
        header: "Keterangan",
        sortable: !0,
        resizable: !0,
        dataIndex: "keterangan",
        width: 100,
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "Satuan",
        sortable: !0,
        resizable: !0,
        dataIndex: "satuan",
        width: 100,
        filter: {
            xtype: "textfield"
        }
    }, {
        header: "Jumlah",
        sortable: !0,
        resizable: !0,
        dataIndex: "qty",
        width: 100,
        align: "right",
        renderer: Ext.util.Format.numberRenderer("0,0"),
        filter: {
            xtype: "numericfield"
        }
    } ],
    initComponent: function() {
        this.store = jun.rztPahLampiran, this.bbar = {
            items: [ {
                xtype: "paging",
                store: this.store,
                displayInfo: !0,
                pageSize: 10
            } ]
        }, this.tbar = {
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
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Hapus",
                ref: "../btnDelete"
            } ]
        }, jun.rztPahLampiran.reload(), jun.PahLampiranGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.btnDelete.on("Click", this.deleteRec, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PahLampiranWin({
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
        var b = a.json.id_lampiran, c = new jun.PahLampiranWin({
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
            url: "PondokHarapan/PahLampiran/delete/id/" + b.json.id_lampiran,
            method: "POST",
            success: function(a, b) {
                jun.rztPahLampiran.reload();
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