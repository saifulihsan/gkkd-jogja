jun.PeChartMasterGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Kode Rekening",
    id: "docs-jun.PeChartMasterGrid",
    iconCls: "silk-grid",
    viewConfig: {
        forceFit: !0
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "Kode Rekening",
        sortable: !0,
        resizable: !0,
        dataIndex: "account_code"
    }, {
        header: "Nama Rekening",
        sortable: !0,
        resizable: !0,
        dataIndex: "account_name",
        width: 200
    }, {
        header: "Kelompok Rekening",
        sortable: !0,
        resizable: !0,
        dataIndex: "account_type",
        renderer: jun.renderPeChartType
    }, {
        header: "Deskripsi",
        sortable: !0,
        resizable: !0,
        dataIndex: "description",
        width: 400
    }, {
        header: "Status",
        dataIndex: "inactive",
        renderer: jun.renderActive
    } ],
    initComponent: function() {
        jun.rztPeChartTypes.reload(), this.store = jun.rztPeChartMaster, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Tambah Kode Rekening",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Ubah Kode Rekening",
                ref: "../btnEdit"
            } ]
        }, jun.rztPeChartMaster.reload(), jun.PeChartMasterGrid.superclass.initComponent.call(this), 
        this.btnAdd.on("Click", this.loadForm, this), this.btnEdit.on("Click", this.loadEditForm, this), 
        this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
    },
    loadForm: function() {
        var a = new jun.PeChartMasterWin({
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
        var b = a.json.account_code, c = new jun.PeChartMasterWin({
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Kode Rekening");
            return;
        }
        Ext.Ajax.request({
            url: "PondokEfata/PeChartMaster/delete/id/" + b.json.account_code,
            method: "POST",
            success: function(a, b) {
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