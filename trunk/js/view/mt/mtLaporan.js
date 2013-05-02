jun.MtReportMutasiWin = Ext.extend(Ext.Window, {
    title:'Mutasi Kas di Tangan',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportMutasiWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportMutasiWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Mutasi Kas di Tangan</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/MutasiKasDiTangan'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
//        var win = window.open('', 'form','width=800,height=600,resizeable,scrollbars');
//        win.document.write("<html><title>test form</title><body>" +
//            "<form id='form' method='POST' action='Mahkotrans/MtReport/MutasiKasDiTangan'>" +
//            "<input type='hidden' name='trans_date_mulai' value='2012-03-01'>" +
//            "<input type='hidden' name='trans_date_sampai' value='2012-10-02'>" +
//            "<input type='hidden' name='format' value='pdf'>" +
//            "</form></body></html>");
//        win.document.close();
//        win.document.getElementById('form').submit();
//        return;
        Ext.getCmp('form-MtReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportMutasiWin').getForm().url = 'Mahkotrans/MtReport/MutasiKasDiTangan';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportMutasiWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {

//        newwindow=window.open('google.com','name','height=200,width=150');
//        if (window.focus) {newwindow.focus()}
//        return;
        Ext.getCmp('form-MtReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportMutasiWin').getForm().url = 'Mahkotrans/MtReport/MutasiKasDiTangan';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportMutasiWin').getForm().submit();
    }
});
jun.MtReportPengeluaranWin = Ext.extend(Ext.Window, {
    title:'Pengeluaran',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportPengeluaranWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportPengeluaranWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Pengeluaran per Kode Rekening</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/PengeluaranPerKodeRekening'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportPengeluaranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportPengeluaranWin').getForm().url = 'Mahkotrans/MtReport/PengeluaranPerKodeRekening';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportPengeluaranWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportPengeluaranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportPengeluaranWin').getForm().url = 'Mahkotrans/MtReport/PengeluaranPerKodeRekening';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportPengeluaranWin').getForm().submit();
    },
});
jun.MtReportPendapatanWin = Ext.extend(Ext.Window, {
    title:'Pendapatan',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportPendapatanWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportPendapatanWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Pendapatan</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/Pendapatan'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportPendapatanWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportPendapatanWin').getForm().url = 'Mahkotrans/MtReport/Pendapatan';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportPendapatanWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportPendapatanWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportPendapatanWin').getForm().url = 'Mahkotrans/MtReport/Pendapatan';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportPendapatanWin').getForm().submit();
    },
});
jun.MtReportLampiranWin = Ext.extend(Ext.Window, {
    title:'Donasi Non Tunai',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportLampiranWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportLampiranWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Pendapatan</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/Lampiran'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportLampiranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportLampiranWin').getForm().url = 'Mahkotrans/MtReport/Lampiran';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportLampiranWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportLampiranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportLampiranWin').getForm().url = 'Mahkotrans/MtReport/Lampiran';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportLampiranWin').getForm().submit();
    },
});
jun.MtReportBebanAktivitasWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportBebanAktivitasWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportBebanAktivitasWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Beban Aktivitas</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/BebanAktivitas'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportBebanAktivitasWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportBebanAktivitasWin').getForm().url = 'Mahkotrans/MtReport/BebanAktivitas';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportBebanAktivitasWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportBebanAktivitasWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportBebanAktivitasWin').getForm().url = 'Mahkotrans/MtReport/BebanAktivitas';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportBebanAktivitasWin').getForm().submit();
    },
});
jun.MtReportBebanAktivitasAnakWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas per Anak',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportBebanAktivitasAnakWin',
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
//                        store:jun.rztMtMemberbyName,
//                        hiddenName:'mt_member_id',
//                        hiddenValue:'mt_member_id',
//                        valueField:'id',
//                        //displayField: 'MtMember::model()->representingColumn()',
//                        displayField:'real_name',
//                        //allowBlank:false,
//                        anchor:'100%',
//                        name:'mt_member_id',
//                        id:'mt_member_idid',
//                        ref:'../mt_member_id',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
//        jun.rztMtMemberbyName.reload();
        jun.MtReportBebanAktivitasAnakWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Beban Aktivitas per Anak</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/BebanAnak'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportBebanAktivitasAnakWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportBebanAktivitasAnakWin').getForm().url = 'Mahkotrans/MtReport/BebanAnak';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportBebanAktivitasAnakWin').getForm().submit();
    },
    onActivate:function () {
    },
    saveForm:function () {
        Ext.getCmp('form-MtReportBebanAktivitasAnakWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportBebanAktivitasAnakWin').getForm().url = 'Mahkotrans/MtReport/BebanAnak';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportBebanAktivitasAnakWin').getForm().submit();
    },
});
jun.MtReportBebanAktivitasGrupWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas per Grup',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportBebanAktivitasGrupWin',
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
//                        store:jun.rztMtAktivitasGrup,
//                        hiddenName:'mt_member_id',
//                        hiddenValue:'mt_member_id',
//                        valueField:'id',
//                        //displayField: 'MtMember::model()->representingColumn()',
//                        displayField:'name',
//                        //allowBlank:false,
//                        anchor:'100%',
//                        name:'mt_member_id',
//                        id:'mt_member_idid',
//                        ref:'../mt_member_id',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
//        jun.rztMtAktivitasGrup.reload();
        jun.MtReportBebanAktivitasGrupWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Beban Aktivitas per Grup</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/BebanGrup'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportBebanAktivitasGrupWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportBebanAktivitasGrupWin').getForm().url = 'Mahkotrans/MtReport/BebanGrup';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportBebanAktivitasGrupWin').getForm().submit();
    },
    onActivate:function () {
    },
    saveForm:function () {
        Ext.getCmp('form-MtReportBebanAktivitasGrupWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportBebanAktivitasGrupWin').getForm().url = 'Mahkotrans/MtReport/BebanGrup';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportBebanAktivitasGrupWin').getForm().submit();
    },
});
jun.MtReportTanggungJawabWin = Ext.extend(Ext.Window, {
    title:'Pertanggungjawaban',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportTanggungJawabWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportTanggungJawabWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Beban Aktivitas per Anak</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/TanggungJawab'>" +
            "<input type='hidden' name='periode_bulan' value='" + bulan + "'>" +
            "<input type='hidden' name='periode_tahun' value='" + tahun + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportTanggungJawabWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportTanggungJawabWin').getForm().url = 'Mahkotrans/MtReport/TanggungJawab';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportTanggungJawabWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportTanggungJawabWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportTanggungJawabWin').getForm().url = 'Mahkotrans/MtReport/TanggungJawab';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportTanggungJawabWin').getForm().submit();
    },
});
jun.MtReportAnggaranRealisasiWin = Ext.extend(Ext.Window, {
    title:'Anggaran Versus Realisasi',
    iconCls: 'silk13-report',
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportAnggaranRealisasiWin',
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.MtReportAnggaranRealisasiWin.superclass.initComponent.call(this);
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
        win.document.write("<html><title>Anggaran Versus Realisasi</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/AnggaranRealisasi'>" +
            "<input type='hidden' name='periode_bulan' value='" + bulan + "'>" +
            "<input type='hidden' name='periode_tahun' value='" + tahun + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportAnggaranRealisasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportAnggaranRealisasiWin').getForm().url = 'Mahkotrans/MtReport/AnggaranRealisasi';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportAnggaranRealisasiWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportAnggaranRealisasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportAnggaranRealisasiWin').getForm().url = 'Mahkotrans/MtReport/AnggaranRealisasi';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportAnggaranRealisasiWin').getForm().submit();
    },
});

jun.MtReportPengeluaranDetilWin = Ext.extend(Ext.Window, {
    title:'Pengeluaran Detil',
    iconCls: 'silk13-report',
    modez:1,
    width:350,
    height:170,
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
                //url:'Mahkotrans/MtBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtReportPengeluaranDetilWin',
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
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kode Rekening',
                        store:jun.rztMtChartMaster,
                        emptyText:'Semua Akun',
                        hiddenName:'account_code',
                        hiddenValue:'account_code',
                        valueField:'account_code',
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        displayField:'account_code',
                        listWidth:300,
                        editable:true,
                        anchor:'100%',
                        ref:'../cmbKode',
                        lastQuery:''
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
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:true,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:true,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.rztMtChartMaster.reload();
        jun.MtReportPengeluaranDetilWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
//        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var akun = this.cmbKode.value;
        var browser = navigator.appName;
        if (browser == "Microsoft Internet Explorer")
            window.opener = self;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Pengeluaran per Kode Rekening Detil</title><body>" +
            "<form id='form' method='POST' action='Mahkotrans/MtReport/PengeluaranPerKodeRekeningDetil'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='account_code' value='" + akun + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-MtReportPengeluaranDetilWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportPengeluaranDetilWin').getForm().url = 'Mahkotrans/MtReport/PengeluaranPerKodeRekeningDetil';
        this.format.setValue('pdf');
        Ext.getCmp('form-MtReportPengeluaranDetilWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-MtReportPengeluaranDetilWin').getForm().standardSubmit = true;
        Ext.getCmp('form-MtReportPengeluaranDetilWin').getForm().url = 'Mahkotrans/MtReport/PengeluaranPerKodeRekeningDetil';
        this.format.setValue('excel');
        Ext.getCmp('form-MtReportPengeluaranDetilWin').getForm().submit();
    },
});