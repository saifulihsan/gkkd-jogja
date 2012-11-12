jun.PeReportMutasiWin = Ext.extend(Ext.Window, {
    title:'Mutasi Kas di Tangan',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportMutasiWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportMutasiWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Mutasi Kas di Tangan</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/MutasiKasDiTangan'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        //        var win = window.open('', 'form','width=800,height=600,resizeable,scrollbars');
        //        win.document.write("<html><title>test form</title><body>" +

        //            "<input type='hidden' name='trans_date_mulai' value='2012-03-01'>" +
        //            "<input type='hidden' name='trans_date_sampai' value='2012-10-02'>" +
        //            "<input type='hidden' name='format' value='pdf'>" +
        //            "</form></body></html>");
        //        win.document.close();
        //        win.document.getElementById('form').submit();
        //        return;
        Ext.getCmp('form-PeReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportMutasiWin').getForm().url = 'PondokEfata/PeReport/MutasiKasDiTangan';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportMutasiWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {

        //        newwindow=window.open('google.com','name','height=200,width=150');
        //        if (window.focus) {newwindow.focus()}
        //        return;
        Ext.getCmp('form-PeReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportMutasiWin').getForm().url = 'PondokEfata/PeReport/MutasiKasDiTangan';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportMutasiWin').getForm().submit();
    }
});
jun.PeReportPengeluaranWin = Ext.extend(Ext.Window, {
    title:'Pengeluaran',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportPengeluaranWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportPengeluaranWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Pengeluaran per Kode Rekening</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/PengeluaranPerKodeRekening'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportPengeluaranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportPengeluaranWin').getForm().url = 'PondokEfata/PeReport/PengeluaranPerKodeRekening';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportPengeluaranWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PeReportPengeluaranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportPengeluaranWin').getForm().url = 'PondokEfata/PeReport/PengeluaranPerKodeRekening';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportPengeluaranWin').getForm().submit();
    },
});
jun.PeReportPendapatanWin = Ext.extend(Ext.Window, {
    title:'Pendapatan',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportPendapatanWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportPendapatanWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Pendapatan</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/Pendapatan'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportPendapatanWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportPendapatanWin').getForm().url = 'PondokEfata/PeReport/Pendapatan';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportPendapatanWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PeReportPendapatanWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportPendapatanWin').getForm().url = 'PondokEfata/PeReport/Pendapatan';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportPendapatanWin').getForm().submit();
    },
});
jun.PeReportLampiranWin = Ext.extend(Ext.Window, {
    title:'Donasi Non Tunai',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportLampiranWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportLampiranWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Pendapatan</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/Lampiran'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportLampiranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportLampiranWin').getForm().url = 'PondokEfata/PeReport/Lampiran';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportLampiranWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PeReportLampiranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportLampiranWin').getForm().url = 'PondokEfata/PeReport/Lampiran';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportLampiranWin').getForm().submit();
    },
});
jun.PeReportBebanAktivitasWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportBebanAktivitasWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportBebanAktivitasWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Beban Aktivitas</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/BebanAktivitas'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportBebanAktivitasWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportBebanAktivitasWin').getForm().url = 'PondokEfata/PeReport/BebanAktivitas';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportBebanAktivitasWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PeReportBebanAktivitasWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportBebanAktivitasWin').getForm().url = 'PondokEfata/PeReport/BebanAktivitas';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportBebanAktivitasWin').getForm().submit();
    },
});
jun.PeReportBebanAktivitasAnakWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas per Anak',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportBebanAktivitasAnakWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    //                    {
                    //                        xtype:'combo',
                    //                        typeAhead:true,
                    ////                        triggerAction:'all',
                    //                        lazyRender:true,
                    //                        mode:'local',
                    //                        fieldLabel:'Anak',
                    //                        store:jun.rztPeMemberbyName,
                    //                        hiddenName:'Pe_member_id',
                    //                        hiddenValue:'Pe_member_id',
                    //                        valueField:'id',
                    //                        //displayField: 'PeMember::model()->representingColumn()',
                    //                        displayField:'real_name',
                    //                        //allowBlank:false,
                    //                        anchor:'100%',
                    //                        name:'Pe_member_id',
                    //                        id:'Pe_member_idid',
                    //                        ref:'../Pe_member_id',
                    //                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        //        jun.rztPeMemberbyName.reload();
        jun.PeReportBebanAktivitasAnakWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSave.on('click', this.saveForm, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Beban Aktivitas per Anak</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/BebanAnak'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportBebanAktivitasAnakWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportBebanAktivitasAnakWin').getForm().url = 'PondokEfata/PeReport/BebanAnak';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportBebanAktivitasAnakWin').getForm().submit();
    },
    onActivate:function () {
    },
    saveForm:function () {
        Ext.getCmp('form-PeReportBebanAktivitasAnakWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportBebanAktivitasAnakWin').getForm().url = 'PondokEfata/PeReport/BebanAnak';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportBebanAktivitasAnakWin').getForm().submit();
    },
});
jun.PeReportBebanAktivitasGrupWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas per Grup',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:150,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportBebanAktivitasGrupWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    //                    {
                    //                        xtype:'combo',
                    //                        typeAhead:true,
                    //                        //                        triggerAction:'all',
                    //                        lazyRender:true,
                    //                        mode:'local',
                    //                        fieldLabel:'Anak',
                    //                        store:jun.rztPeAktivitasGrup,
                    //                        hiddenName:'Pe_member_id',
                    //                        hiddenValue:'Pe_member_id',
                    //                        valueField:'id',
                    //                        //displayField: 'PeMember::model()->representingColumn()',
                    //                        displayField:'name',
                    //                        //allowBlank:false,
                    //                        anchor:'100%',
                    //                        name:'Pe_member_id',
                    //                        id:'Pe_member_idid',
                    //                        ref:'../Pe_member_id',
                    //                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        //        jun.rztPeAktivitasGrup.reload();
        jun.PeReportBebanAktivitasGrupWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSave.on('click', this.saveForm, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Beban Aktivitas per Grup</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/BebanGrup'>" + "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" + "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportBebanAktivitasGrupWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportBebanAktivitasGrupWin').getForm().url = 'PondokEfata/PeReport/BebanGrup';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportBebanAktivitasGrupWin').getForm().submit();
    },
    onActivate:function () {
    },
    saveForm:function () {
        Ext.getCmp('form-PeReportBebanAktivitasGrupWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportBebanAktivitasGrupWin').getForm().url = 'PondokEfata/PeReport/BebanGrup';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportBebanAktivitasGrupWin').getForm().submit();
    },
});
jun.PeReportTanggungJawabWin = Ext.extend(Ext.Window, {
    title:'Pertanggungjawaban',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:140,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportTanggungJawabWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'absolute',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
                    {
                        xtype:'label',
                        text:'Periode Bulan:',
                        x:5,
                        y:5
                    },
                    new jun.comboBulan({
                        x:105,
                        y:2,
                        width:100,
                        height:20,
                        ref:'../cmbBulan',
                        id:'periode_bulanid',
                        name:'periode_bulan',
                        hiddenName:'periode_bulan',
                        hiddenValue:'periode_bulan',
                        anchor:'100%',
                    }),
                    {
                        xtype:'label',
                        text:'Periode Tahun:',
                        x:5,
                        y:35
                    },
                    {
                        xtype:'spinnerfield',
                        fieldLabel:'periode_tahun',
                        hideLabel:false,
                        //hidden:true,
                        name:'periode_tahun',
                        id:'periode_tahunid',
                        ref:'../periode_tahun',
                        maxLength:4,
                        minValue:2000,
                        maxValue:3000,
                        defaultValue:2012,
                        x:105,
                        y:32,
                        anchor:'100%',
                        //                        onBlur:checkPeriodeAnggaran,
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportTanggungJawabWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var bulan = this.cmbBulan.value;
        var tahun = Ext.getCmp('periode_tahunid').getValue();
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Beban Aktivitas per Anak</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/TanggungJawab'>" + "<input type='hidden' name='periode_bulan' value='" + bulan + "'>" + "<input type='hidden' name='periode_tahun' value='" + tahun + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportTanggungJawabWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportTanggungJawabWin').getForm().url = 'PondokEfata/PeReport/TanggungJawab';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportTanggungJawabWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PeReportTanggungJawabWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportTanggungJawabWin').getForm().url = 'PondokEfata/PeReport/TanggungJawab';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportTanggungJawabWin').getForm().submit();
    },
});
jun.PeReportAnggaranRealisasiWin = Ext.extend(Ext.Window, {
    title:'Anggaran Versus Realisasi',
    iconCls:'silk13-report',
    modez:1,
    width:350,
    height:140,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',

                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeReportAnggaranRealisasiWin',
                labelWidth:100,
                labelAlign:'left',
                layout:'absolute',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
                    {
                        xtype:'label',
                        text:'Periode Bulan:',
                        x:5,
                        y:5
                    },
                    new jun.comboBulan({
                        x:105,
                        y:2,
                        width:100,
                        height:20,
                        ref:'../cmbBulan',
                        id:'periode_bulanid',
                        name:'periode_bulan',
                        hiddenName:'periode_bulan',
                        hiddenValue:'periode_bulan',
                        anchor:'100%',
                    }),
                    {
                        xtype:'label',
                        text:'Periode Tahun:',
                        x:5,
                        y:35
                    },
                    {
                        xtype:'spinnerfield',
                        fieldLabel:'periode_tahun',
                        hideLabel:false,
                        //hidden:true,
                        name:'periode_tahun',
                        id:'periode_tahunid',
                        ref:'../periode_tahun',
                        maxLength:4,
                        minValue:2000,
                        maxValue:3000,
                        defaultValue:2012,
                        x:105,
                        y:32,
                        anchor:'100%',
                        //                        onBlur:checkPeriodeAnggaran,
                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls:'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PeReportAnggaranRealisasiWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var bulan = this.cmbBulan.value;
        var tahun = Ext.getCmp('periode_tahunid').getValue();
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Anggaran Versus Realisasi</title><body>" + "<form id='form' method='POST' action='PondokEfata/PeReport/AnggaranRealisasi'>" + "<input type='hidden' name='periode_bulan' value='" + bulan + "'>" + "<input type='hidden' name='periode_tahun' value='" + tahun + "'>" + "<input type='hidden' name='format' value='html'>" + "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PeReportAnggaranRealisasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportAnggaranRealisasiWin').getForm().url = 'PondokEfata/PeReport/AnggaranRealisasi';
        this.format.setValue('pdf');
        Ext.getCmp('form-PeReportAnggaranRealisasiWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PeReportAnggaranRealisasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PeReportAnggaranRealisasiWin').getForm().url = 'PondokEfata/PeReport/AnggaranRealisasi';
        this.format.setValue('excel');
        Ext.getCmp('form-PeReportAnggaranRealisasiWin').getForm().submit();
    },
});