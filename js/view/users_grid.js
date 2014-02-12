jun.renderJemaat = function(a, b, c) {
    var d = jun.rztJemaat, e = d.find("nij", a), c = d.getAt(e);
    return c.data.real_name;
}, jun.UsersGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Manajemen User",
    id: "docs-jun.UsersGrid",
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
        header: "User Name",
        sortable: !0,
        resizable: !0,
        dataIndex: "user_id",
        width: 100
    }, {
        header: "Nama Lengkap",
        sortable: !0,
        resizable: !0,
        dataIndex: "nij",
        renderer: jun.renderJemaat,
        width: 100
    }, {
        header: "Terakhir Login",
        sortable: !0,
        resizable: !0,
        dataIndex: "last_visit_date",
        width: 100
    } ],
    initComponent: function() {
        this.store = jun.rztUsers, this.bbar = {
            items: [ {
                xtype: "paging",
                store: this.store,
                displayInfo: !0,
                pageSize: 20
            } ]
        }, this.tbar = {
            xtype: "toolbar",
            items: [ {
                iconCls: "asp-user2_add",
                xtype: "button",
                text: "Tambah User",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                iconCls: "asp-access",
                text: "Reset Password",
                ref: "../btnEdit"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                iconCls: "asp-user2_delete",
                text: "Ubah Security Role",
                ref: "../btnSecurityRole"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Refresh",
                ref: "../btnRefresh"
            } ]
        }, jun.rztJemaat.baseParams = {
            mode: "all"
        }, jun.rztJemaat.reload(), jun.rztJemaat.baseParams = {}, jun.rztUsers.baseParams = {}, 
        jun.rztUsers.reload(), jun.UsersGrid.superclass.initComponent.call(this), this.btnAdd.on("Click", this.loadForm, this), 
        this.btnEdit.on("Click", this.loadEditForm, this), this.btnSecurityRole.on("Click", this.deleteRec, this), 
        this.btnRefresh.on("Click", this.refreshData, this), this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    refreshData: function() {
        jun.rztJemaat.baseParams = {
            mode: "all"
        }, jun.rztJemaat.reload(), jun.rztJemaat.baseParams = {}, jun.rztUsers.reload();
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.UsersWin({
            modez: 0
        });
        a.show();
    },
    loadEditForm: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin mereset password user ini?", this.deleteRecYes, this);
    },
    deleteRec: function() {
        var a = this.sm.getSelected();
        if (a == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih User");
            return;
        }
        var b = new jun.UbahSecurity({
            modez: 0
        });
        b.show(), b.formz.getForm().loadRecord(this.record);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih User");
            return;
        }
        var c = jun.StringGenerator(8, "#aA"), d = jun.EncryptPass(c);
        Ext.Ajax.request({
            url: "general/Users/update/id/" + b.json.id,
            method: "POST",
            params: {
                password: d
            },
            scope: this,
            success: function(a, b) {
                jun.rztUsers.reload();
                var d = Ext.decode(a.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: d.msg + "<br>Password : " + c,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            },
            failure: function(a, b) {
                var c = Ext.decode(a.responseText);
                Ext.MessageBox.show({
                    title: "Warning",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        });
    }
});