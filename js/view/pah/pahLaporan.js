jun.PahReportMutasiWin = Ext.extend(Ext.Window, {
    title: "Mutasi Kas di Tangan",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportMutasiWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportMutasiWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        c.document.write("<html><title>Mutasi Kas di Tangan</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/MutasiKasDiTangan'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        c.document.close(), c.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportMutasiWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportMutasiWin").getForm().url = "PondokHarapan/PahReport/MutasiKasDiTangan", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportMutasiWin").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportMutasiWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportMutasiWin").getForm().url = "PondokHarapan/PahReport/MutasiKasDiTangan", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportMutasiWin").getForm().submit();
    }
}), jun.PahReportPengeluaranWin = Ext.extend(Ext.Window, {
    title: "Pengeluaran",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportPengeluaranWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportPengeluaranWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Pengeluaran per Kode Rekening</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/PengeluaranPerKodeRekening'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportPengeluaranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportPengeluaranWin").getForm().url = "PondokHarapan/PahReport/PengeluaranPerKodeRekening", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportPengeluaranWin").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportPengeluaranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportPengeluaranWin").getForm().url = "PondokHarapan/PahReport/PengeluaranPerKodeRekening", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportPengeluaranWin").getForm().submit();
    }
}), jun.PahReportPendapatanWin = Ext.extend(Ext.Window, {
    title: "Pendapatan",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportPendapatanWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportPendapatanWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Pendapatan</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/Pendapatan'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportPendapatanWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportPendapatanWin").getForm().url = "PondokHarapan/PahReport/Pendapatan", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportPendapatanWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportPendapatanWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportPendapatanWin").getForm().url = "PondokHarapan/PahReport/Pendapatan", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportPendapatanWin").getForm().submit();
    }
}), jun.PahReportLampiranWin = Ext.extend(Ext.Window, {
    title: "Donasi Non Tunai",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportLampiranWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportLampiranWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Pendapatan</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/Lampiran'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportLampiranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportLampiranWin").getForm().url = "PondokHarapan/PahReport/Lampiran", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportLampiranWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportLampiranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportLampiranWin").getForm().url = "PondokHarapan/PahReport/Lampiran", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportLampiranWin").getForm().submit();
    }
}), jun.PahReportBebanAktivitasWin = Ext.extend(Ext.Window, {
    title: "Beban Aktivitas",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportBebanAktivitasWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportBebanAktivitasWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/BebanAktivitas'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportBebanAktivitasWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportBebanAktivitasWin").getForm().url = "PondokHarapan/PahReport/BebanAktivitas", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportBebanAktivitasWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportBebanAktivitasWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportBebanAktivitasWin").getForm().url = "PondokHarapan/PahReport/BebanAktivitas", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportBebanAktivitasWin").getForm().submit();
    }
}), jun.PahReportBebanAktivitasAnakWin = Ext.extend(Ext.Window, {
    title: "Beban Aktivitas per Anak",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportBebanAktivitasAnakWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportBebanAktivitasAnakWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.saveForm, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas per Anak</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/BebanAnak'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportBebanAktivitasAnakWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PahReportBebanAktivitasAnakWin").getForm().url = "PondokHarapan/PahReport/BebanAnak", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportBebanAktivitasAnakWin").getForm().submit();
    },
    onActivate: function() {},
    saveForm: function() {
        Ext.getCmp("form-PahReportBebanAktivitasAnakWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PahReportBebanAktivitasAnakWin").getForm().url = "PondokHarapan/PahReport/BebanAnak", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportBebanAktivitasAnakWin").getForm().submit();
    }
}), jun.PahReportBebanAktivitasGrupWin = Ext.extend(Ext.Window, {
    title: "Beban Aktivitas per Grup",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 150,
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
            id: "form-PahReportBebanAktivitasGrupWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
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
        }, jun.PahReportBebanAktivitasGrupWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.saveForm, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas per Grup</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/BebanGrup'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportBebanAktivitasGrupWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PahReportBebanAktivitasGrupWin").getForm().url = "PondokHarapan/PahReport/BebanGrup", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportBebanAktivitasGrupWin").getForm().submit();
    },
    onActivate: function() {},
    saveForm: function() {
        Ext.getCmp("form-PahReportBebanAktivitasGrupWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PahReportBebanAktivitasGrupWin").getForm().url = "PondokHarapan/PahReport/BebanGrup", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportBebanAktivitasGrupWin").getForm().submit();
    }
}), jun.PahReportTanggungJawabWin = Ext.extend(Ext.Window, {
    title: "Pertanggungjawaban",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 140,
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
            id: "form-PahReportTanggungJawabWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "absolute",
            ref: "formz",
            border: !1,
            anchor: "100% 100%",
            items: [ {
                xtype: "label",
                text: "Periode Bulan:",
                x: 5,
                y: 5
            }, new jun.comboBulan({
                x: 105,
                y: 2,
                width: 100,
                height: 20,
                ref: "../cmbBulan",
                id: "periode_bulanid",
                name: "periode_bulan",
                hiddenName: "periode_bulan",
                hiddenValue: "periode_bulan",
                anchor: "100%"
            }), {
                xtype: "label",
                text: "Periode Tahun:",
                x: 5,
                y: 35
            }, {
                xtype: "spinnerfield",
                fieldLabel: "periode_tahun",
                hideLabel: !1,
                name: "periode_tahun",
                id: "periode_tahunid",
                ref: "../periode_tahun",
                maxLength: 4,
                minValue: 2e3,
                maxValue: 3e3,
                defaultValue: 2012,
                x: 105,
                y: 32,
                anchor: "100%"
            }, {
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
        }, jun.PahReportTanggungJawabWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.cmbBulan.value, b = Ext.getCmp("periode_tahunid").getValue(), c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas per Anak</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/TanggungJawab'><input type='hidden' name='periode_bulan' value='" + a + "'>" + "<input type='hidden' name='periode_tahun' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportTanggungJawabWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportTanggungJawabWin").getForm().url = "PondokHarapan/PahReport/TanggungJawab", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportTanggungJawabWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportTanggungJawabWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportTanggungJawabWin").getForm().url = "PondokHarapan/PahReport/TanggungJawab", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportTanggungJawabWin").getForm().submit();
    }
}), jun.PahReportAnggaranRealisasiWin = Ext.extend(Ext.Window, {
    title: "Anggaran Versus Realisasi",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 140,
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
            id: "form-PahReportAnggaranRealisasiWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "absolute",
            ref: "formz",
            border: !1,
            anchor: "100% 100%",
            items: [ {
                xtype: "label",
                text: "Periode Bulan:",
                x: 5,
                y: 5
            }, new jun.comboBulan({
                x: 105,
                y: 2,
                width: 100,
                height: 20,
                ref: "../cmbBulan",
                id: "periode_bulanid",
                name: "periode_bulan",
                hiddenName: "periode_bulan",
                hiddenValue: "periode_bulan",
                anchor: "100%"
            }), {
                xtype: "label",
                text: "Periode Tahun:",
                x: 5,
                y: 35
            }, {
                xtype: "spinnerfield",
                fieldLabel: "periode_tahun",
                hideLabel: !1,
                name: "periode_tahun",
                id: "periode_tahunid",
                ref: "../periode_tahun",
                maxLength: 4,
                minValue: 2e3,
                maxValue: 3e3,
                defaultValue: 2012,
                x: 105,
                y: 32,
                anchor: "100%"
            }, {
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
        }, jun.PahReportAnggaranRealisasiWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.cmbBulan.value, b = Ext.getCmp("periode_tahunid").getValue(), c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Anggaran Versus Realisasi</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/AnggaranRealisasi'><input type='hidden' name='periode_bulan' value='" + a + "'>" + "<input type='hidden' name='periode_tahun' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportAnggaranRealisasiWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PahReportAnggaranRealisasiWin").getForm().url = "PondokHarapan/PahReport/AnggaranRealisasi", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportAnggaranRealisasiWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportAnggaranRealisasiWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PahReportAnggaranRealisasiWin").getForm().url = "PondokHarapan/PahReport/AnggaranRealisasi", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportAnggaranRealisasiWin").getForm().submit();
    }
}), jun.PahReportPengeluaranDetilWin = Ext.extend(Ext.Window, {
    title: "Pengeluaran Detil",
    iconCls: "silk13-report",
    modez: 1,
    width: 350,
    height: 170,
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
            id: "form-PahReportPengeluaranDetilWin",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date_mulai",
                fieldLabel: "Dari Tanggal",
                name: "trans_date_mulai",
                id: "trans_date_mulaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "xdatefield",
                ref: "../trans_date_sampai",
                fieldLabel: "Sampai Tanggal",
                name: "trans_date_sampai",
                id: "trans_date_sampaiid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Kode Rekening",
                store: jun.rztPahChartMaster,
                emptyText: "Semua Akun",
                hiddenName: "account_code",
                hiddenValue: "account_code",
                valueField: "account_code",
                matchFieldWidth: !1,
                itemSelector: "div.search-item",
                tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', "</div></tpl>"),
                displayField: "account_code",
                listWidth: 300,
                editable: !0,
                anchor: "100%",
                ref: "../cmbKode",
                lastQuery: ""
            }, {
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
                hidden: !0,
                ref: "../btnPdf"
            }, {
                xtype: "button",
                iconCls: "silk13-printer",
                text: "Print",
                hidden: !0,
                ref: "../btnPrint"
            } ]
        }, jun.rztPahChartMaster.reload(), jun.PahReportPengeluaranDetilWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnPdf.on("click", this.onbtnPdfclick, this), this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = this.cmbKode.value, d = navigator.appName;
        d == "Microsoft Internet Explorer" && (window.opener = self);
        var e = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        e.document.write("<html><title>Pengeluaran per Kode Rekening Detil</title><body><form id='form' method='POST' action='PondokHarapan/PahReport/PengeluaranPerKodeRekeningDetil'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='account_code' value='" + c + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        e.document.close(), e.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PahReportPengeluaranDetilWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportPengeluaranDetilWin").getForm().url = "PondokHarapan/PahReport/PengeluaranPerKodeRekeningDetil", 
        this.format.setValue("pdf"), Ext.getCmp("form-PahReportPengeluaranDetilWin").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PahReportPengeluaranDetilWin").getForm().standardSubmit = !0, Ext.getCmp("form-PahReportPengeluaranDetilWin").getForm().url = "PondokHarapan/PahReport/PengeluaranPerKodeRekeningDetil", 
        this.format.setValue("excel"), Ext.getCmp("form-PahReportPengeluaranDetilWin").getForm().submit();
    }
});