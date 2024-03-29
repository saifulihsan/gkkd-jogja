jun.PahGlTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "PahGlTrans",
    id: "docs-jun.PahGlTransGrid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "counter",
        sortable: !0,
        resizable: !0,
        dataIndex: "counter",
        width: 100
    }, {
        header: "type",
        sortable: !0,
        resizable: !0,
        dataIndex: "type",
        width: 100
    }, {
        header: "type_no",
        sortable: !0,
        resizable: !0,
        dataIndex: "type_no",
        width: 100
    }, {
        header: "tran_date",
        sortable: !0,
        resizable: !0,
        dataIndex: "tran_date",
        width: 100
    }, {
        header: "account",
        sortable: !0,
        resizable: !0,
        dataIndex: "account",
        width: 100
    }, {
        header: "memo_",
        sortable: !0,
        resizable: !0,
        dataIndex: "memo_",
        width: 100
    } ],
    initComponent: function() {
        this.store = jun.rztPahGlTrans, this.tbar = {
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
        }, jun.PahGlTransGrid.superclass.initComponent.call(this), this.btnAdd.on("Click", this.loadForm, this), 
        this.btnEdit.on("Click", this.loadEditForm, this), this.btnDelete.on("Click", this.deleteRec, this), 
        this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PahGlTransWin({
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
        var b = a.json.counter, c = new jun.PahGlTransWin({
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
            url: "PondokHarapan/PahGlTrans/delete/id/" + b.json.counter,
            method: "POST",
            success: function(a) {
                jun.rztPahGlTrans.reload(), Ext.Msg.alert("Pelayanan", "Delete Berhasil");
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