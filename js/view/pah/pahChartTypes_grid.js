jun.PahChartTypesGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "PahChartTypes",
    id: "docs-jun.PahChartTypesGrid",
    width: 400,
    height: 250,
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "id",
        sortable: !0,
        resizable: !0,
        dataIndex: "id",
        width: 100
    }, {
        header: "name",
        sortable: !0,
        resizable: !0,
        dataIndex: "name",
        width: 100
    }, {
        header: "class_id",
        sortable: !0,
        resizable: !0,
        dataIndex: "class_id",
        width: 100
    }, {
        header: "parent",
        sortable: !0,
        resizable: !0,
        dataIndex: "parent",
        width: 100
    }, {
        header: "inactive",
        sortable: !0,
        resizable: !0,
        dataIndex: "inactive",
        width: 100
    } ],
    initComponent: function() {
        this.store = jun.rztPahChartTypes, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Add",
                ref: "../btnAdd"
            }, {
                xtype: "button",
                text: "Edit",
                ref: "../btnEdit"
            }, {
                xtype: "button",
                text: "Delete",
                ref: "../btnDelete"
            } ]
        }, jun.PahChartTypesGrid.superclass.initComponent.call(this), this.btnAdd.on("Click", this.loadForm, this), 
        this.btnEdit.on("Click", this.loadEditForm, this), this.btnDelete.on("Click", this.deleteRec, this), 
        this.getSelectionModel().on("rowselect", this.getrow, this), jun.rztPahChartTypes.load();
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PahChartTypesWin({
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
        var b = a.json.id, c = new jun.PahChartTypesWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin menghapus data ini?", this.deleteRecYes, this);
    },
    deleteRecYes: function(a) {
        a != "ok";
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }
        Ext.Ajax.request({
            waitMsg: "Please Wait",
            url: "PondokHarapan/PahChartTypes/delete/id/" + b.json.id,
            method: "POST",
            success: function(a) {
                jun.rztPahChartTypes.reload(), Ext.Msg.alert("Pelayanan", "Delete Berhasil");
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