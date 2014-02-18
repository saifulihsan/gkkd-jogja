jun.PeReportPenghuniPondok = Ext.extend(Ext.Window, {
    title: "Daftar Penghuni Pondok",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 5,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    iswin: !0,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PeReportPenghuniPondok",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "hidden",
                name: "format",
                ref: "../format"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                iconCls: "silk13-page_white_excel",
                text: "Save to Excel",
                hidden: !1,
                ref: "../btnSave"
            }, {
                xtype: "button",
                iconCls: "silk13-page_white_acrobat",
                text: "Save to PDF",
                hidden: !1,
                ref: "../btnPdf"
            }, {
                xtype: "button",
                iconCls: "silk13-printer",
                text: "Print",
                hidden: !1,
                ref: "../btnPrint"
            } ]
        }, jun.PeReportPenghuniPondok.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        a.document.write("<html><title>Daftar Penghuni Pondok</title><body><form id='form' method='POST' action='PondokEfata/PeReport/CetakPenghuniPondok'><input type='hidden' name='format' value='html'></form></body></html>"), 
        a.document.close(), a.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportPenghuniPondok").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPenghuniPondok").getForm().url = "PondokEfata/PeReport/CetakPenghuniPondok", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportPenghuniPondok").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportPenghuniPondok").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPenghuniPondok").getForm().url = "PondokEfata/PeReport/CetakPenghuniPondok", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportPenghuniPondok").getForm().submit();
    }
}), jun.renderRealName = function(a, b, c) {
    var d = jun.rztJemaat, e = d.find("nij", a), c = d.getAt(e);
    return c.data.real_name;
}, jun.PeMemberGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Anggota",
    id: "docs-jun.PeMemberGrid",
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
        hidden: !0,
        width: 100
    }, {
        header: "Nama Anggota",
        sortable: !0,
        resizable: !0,
        dataIndex: "real_name",
        width: 100
    }, {
        header: "Status",
        dataIndex: "inactive",
        renderer: jun.renderActive
    } ],
    initComponent: function() {
        this.store = jun.rztPeMemberbyName, this.tbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                iconCls: "asp-user8_add",
                text: "Tambah Anggota",
                ref: "../btnAdd"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                iconCls: "asp-user8_edit",
                text: "Ubah Anggota",
                ref: "../btnEdit"
            }, {
                xtype: "tbseparator"
            }, {
                xtype: "button",
                text: "Print Daftar Anggota",
                ref: "../btnDelete"
            } ]
        }, jun.rztJemaat.baseParams = {}, jun.rztJemaat.load(), jun.rztPeMemberbyName.load(), 
        jun.PeMemberGrid.superclass.initComponent.call(this), this.btnAdd.on("Click", this.loadForm, this), 
        this.btnEdit.on("Click", this.loadEditForm, this), this.btnDelete.on("Click", this.deleteRec, this), 
        this.getSelectionModel().on("rowselect", this.getrow, this);
    },
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    loadForm: function() {
        var a = new jun.PeMemberWin({
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
        var b = a.json.id, c = new jun.PeMemberWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        var a = new jun.PeReportPenghuniPondok();
        a.show(this);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Data");
            return;
        }
        Ext.Ajax.request({
            url: "PondokEfata/PeMember/delete/id/" + b.json.id,
            method: "POST",
            success: function(a, b) {
                jun.rztPeMember.reload();
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