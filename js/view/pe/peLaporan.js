jun.PeReportMutasiWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportMutasiWin",
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
        }, jun.PeReportMutasiWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        c.document.write("<html><title>Mutasi Kas di Tangan</title><body><form id='form' method='POST' action='PondokEfata/PeReport/MutasiKasDiTangan'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        c.document.close(), c.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportMutasiWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportMutasiWin").getForm().url = "PondokEfata/PeReport/MutasiKasDiTangan", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportMutasiWin").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportMutasiWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportMutasiWin").getForm().url = "PondokEfata/PeReport/MutasiKasDiTangan", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportMutasiWin").getForm().submit();
    }
}), jun.PeReportPengeluaranWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportPengeluaranWin",
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
        }, jun.PeReportPengeluaranWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Pengeluaran per Kode Rekening</title><body><form id='form' method='POST' action='PondokEfata/PeReport/PengeluaranPerKodeRekening'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportPengeluaranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPengeluaranWin").getForm().url = "PondokEfata/PeReport/PengeluaranPerKodeRekening", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportPengeluaranWin").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportPengeluaranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPengeluaranWin").getForm().url = "PondokEfata/PeReport/PengeluaranPerKodeRekening", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportPengeluaranWin").getForm().submit();
    }
}), jun.PeReportPendapatanWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportPendapatanWin",
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
        }, jun.PeReportPendapatanWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Pendapatan</title><body><form id='form' method='POST' action='PondokEfata/PeReport/Pendapatan'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportPendapatanWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPendapatanWin").getForm().url = "PondokEfata/PeReport/Pendapatan", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportPendapatanWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportPendapatanWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPendapatanWin").getForm().url = "PondokEfata/PeReport/Pendapatan", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportPendapatanWin").getForm().submit();
    }
}), jun.PeReportLampiranWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportLampiranWin",
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
        }, jun.PeReportLampiranWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Pendapatan</title><body><form id='form' method='POST' action='PondokEfata/PeReport/Lampiran'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportLampiranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportLampiranWin").getForm().url = "PondokEfata/PeReport/Lampiran", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportLampiranWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportLampiranWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportLampiranWin").getForm().url = "PondokEfata/PeReport/Lampiran", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportLampiranWin").getForm().submit();
    }
}), jun.PeReportBebanAktivitasWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportBebanAktivitasWin",
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
        }, jun.PeReportBebanAktivitasWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas</title><body><form id='form' method='POST' action='PondokEfata/PeReport/BebanAktivitas'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportBebanAktivitasWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportBebanAktivitasWin").getForm().url = "PondokEfata/PeReport/BebanAktivitas", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportBebanAktivitasWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportBebanAktivitasWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportBebanAktivitasWin").getForm().url = "PondokEfata/PeReport/BebanAktivitas", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportBebanAktivitasWin").getForm().submit();
    }
}), jun.PeReportBebanAktivitasAnakWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportBebanAktivitasAnakWin",
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
        }, jun.PeReportBebanAktivitasAnakWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.saveForm, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas per Anak</title><body><form id='form' method='POST' action='PondokEfata/PeReport/BebanAnak'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportBebanAktivitasAnakWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PeReportBebanAktivitasAnakWin").getForm().url = "PondokEfata/PeReport/BebanAnak", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportBebanAktivitasAnakWin").getForm().submit();
    },
    onActivate: function() {},
    saveForm: function() {
        Ext.getCmp("form-PeReportBebanAktivitasAnakWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PeReportBebanAktivitasAnakWin").getForm().url = "PondokEfata/PeReport/BebanAnak", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportBebanAktivitasAnakWin").getForm().submit();
    }
}), jun.PeReportBebanAktivitasGrupWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportBebanAktivitasGrupWin",
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
        }, jun.PeReportBebanAktivitasGrupWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.saveForm, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas per Grup</title><body><form id='form' method='POST' action='PondokEfata/PeReport/BebanGrup'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportBebanAktivitasGrupWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PeReportBebanAktivitasGrupWin").getForm().url = "PondokEfata/PeReport/BebanGrup", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportBebanAktivitasGrupWin").getForm().submit();
    },
    onActivate: function() {},
    saveForm: function() {
        Ext.getCmp("form-PeReportBebanAktivitasGrupWin").getForm().standardSubmit = !0, 
        Ext.getCmp("form-PeReportBebanAktivitasGrupWin").getForm().url = "PondokEfata/PeReport/BebanGrup", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportBebanAktivitasGrupWin").getForm().submit();
    }
}), jun.PeReportTanggungJawabWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportTanggungJawabWin",
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
        }, jun.PeReportTanggungJawabWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.cmbBulan.value, b = Ext.getCmp("periode_tahunid").getValue(), c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Beban Aktivitas per Anak</title><body><form id='form' method='POST' action='PondokEfata/PeReport/TanggungJawab'><input type='hidden' name='periode_bulan' value='" + a + "'>" + "<input type='hidden' name='periode_tahun' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportTanggungJawabWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportTanggungJawabWin").getForm().url = "PondokEfata/PeReport/TanggungJawab", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportTanggungJawabWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportTanggungJawabWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportTanggungJawabWin").getForm().url = "PondokEfata/PeReport/TanggungJawab", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportTanggungJawabWin").getForm().submit();
    }
}), jun.PeReportAnggaranRealisasiWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportAnggaranRealisasiWin",
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
        }, jun.PeReportAnggaranRealisasiWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnPdf.on("click", this.onbtnPdfclick, this), 
        this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.cmbBulan.value, b = Ext.getCmp("periode_tahunid").getValue(), c = navigator.appName;
        c == "Microsoft Internet Explorer" && (window.opener = self);
        var d = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        d.document.write("<html><title>Anggaran Versus Realisasi</title><body><form id='form' method='POST' action='PondokEfata/PeReport/AnggaranRealisasi'><input type='hidden' name='periode_bulan' value='" + a + "'>" + "<input type='hidden' name='periode_tahun' value='" + b + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        d.document.close(), d.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportAnggaranRealisasiWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportAnggaranRealisasiWin").getForm().url = "PondokEfata/PeReport/AnggaranRealisasi", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportAnggaranRealisasiWin").getForm().submit();
    },
    onActivate: function() {},
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportAnggaranRealisasiWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportAnggaranRealisasiWin").getForm().url = "PondokEfata/PeReport/AnggaranRealisasi", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportAnggaranRealisasiWin").getForm().submit();
    }
}), jun.PeReportPengeluaranDetilWin = Ext.extend(Ext.Window, {
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
            id: "form-PeReportPengeluaranDetilWin",
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
                store: jun.rztPeChartMaster,
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
        }, jun.rztPeChartMaster.reload(), jun.PeReportPengeluaranDetilWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnPdf.on("click", this.onbtnPdfclick, this), this.btnPrint.on("click", this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var a = this.trans_date_mulai.hiddenField.dom.value, b = this.trans_date_sampai.hiddenField.dom.value, c = this.cmbKode.value, d = navigator.appName;
        d == "Microsoft Internet Explorer" && (window.opener = self);
        var e = window.open("", "form", "width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars");
        e.document.write("<html><title>Pengeluaran per Kode Rekening Detil</title><body><form id='form' method='POST' action='PondokEfata/PeReport/PengeluaranPerKodeRekeningDetil'><input type='hidden' name='trans_date_mulai' value='" + a + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + b + "'>" + "<input type='hidden' name='account_code' value='" + c + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>"), 
        e.document.close(), e.document.getElementById("form").submit();
    },
    onbtnPdfclick: function() {
        Ext.getCmp("form-PeReportPengeluaranDetilWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPengeluaranDetilWin").getForm().url = "PondokEfata/PeReport/PengeluaranPerKodeRekeningDetil", 
        this.format.setValue("pdf"), Ext.getCmp("form-PeReportPengeluaranDetilWin").getForm().submit();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onbtnSaveclick: function() {
        Ext.getCmp("form-PeReportPengeluaranDetilWin").getForm().standardSubmit = !0, Ext.getCmp("form-PeReportPengeluaranDetilWin").getForm().url = "PondokEfata/PeReport/PengeluaranPerKodeRekeningDetil", 
        this.format.setValue("excel"), Ext.getCmp("form-PeReportPengeluaranDetilWin").getForm().submit();
    }
});