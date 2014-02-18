jun.PeDonaturGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Donatur",
    id: "docs-jun.PeDonaturGrid",
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
        hidden: !0
    }, {
        header: "Nama Donatur",
        sortable: !0,
        resizable: !0,
        dataIndex: "name"
    }, {
        header: "Telepon",
        sortable: !0,
        resizable: !0,
        dataIndex: "phone",
        width: 100
    }, {
        header: "Alamat",
        sortable: !0,
        resizable: !0,
        dataIndex: "alamat",
        width: 400
    }, {
        header: "Status",
        dataIndex: "inactive",
        renderer: jun.renderActive
    } ],
    initComponent: function() {
        this.store = jun.rztPeDonatur, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Tambah Donatur",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Ubah Donatur",
                ref: "../btnEdit"
            } ]
        }, jun.rztPeDonatur.reload(), jun.PeDonaturGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.btnDelete.on("Click", this.deleteRec, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PeDonaturWin({
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
        var b = a.json.id, c = new jun.PeDonaturWin({
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
            url: "PondokEfata/PeDonatur/delete/id/" + b.json.id,
            method: "POST",
            success: function(a, b) {
                jun.rztPeDonatur.reload();
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