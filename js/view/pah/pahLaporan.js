jun.PahReportMutasiWin = Ext.extend(Ext.Window, {
    title:'Mutasi Kas di Tangan',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportMutasiWin',
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
                    iconCls: 'asp-excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'asp-pdf',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'asp-print',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportMutasiWin.superclass.initComponent.call(this);
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
            "<form id='form' method='POST' action='PondokHarapan/PahReport/MutasiKasDiTangan'>" +
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
//            "<form id='form' method='POST' action='PondokHarapan/PahReport/MutasiKasDiTangan'>" +
//            "<input type='hidden' name='trans_date_mulai' value='2012-03-01'>" +
//            "<input type='hidden' name='trans_date_sampai' value='2012-10-02'>" +
//            "<input type='hidden' name='format' value='pdf'>" +
//            "</form></body></html>");
//        win.document.close();
//        win.document.getElementById('form').submit();
//        return;
        Ext.getCmp('form-PahReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportMutasiWin').getForm().url = 'PondokHarapan/PahReport/MutasiKasDiTangan';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportMutasiWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {

//        newwindow=window.open('google.com','name','height=200,width=150');
//        if (window.focus) {newwindow.focus()}
//        return;
        Ext.getCmp('form-PahReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportMutasiWin').getForm().url = 'PondokHarapan/PahReport/MutasiKasDiTangan';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportMutasiWin').getForm().submit();
    }
});
jun.PahReportPengeluaranWin = Ext.extend(Ext.Window, {
    title:'Pengeluaran per Kode Rekening',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportPengeluaranWin',
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
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportPengeluaranWin.superclass.initComponent.call(this);
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
            "<form id='form' method='POST' action='PondokHarapan/PahReport/PengeluaranPerKodeRekening'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PahReportPengeluaranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportPengeluaranWin').getForm().url = 'PondokHarapan/PahReport/PengeluaranPerKodeRekening';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportPengeluaranWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PahReportPengeluaranWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportPengeluaranWin').getForm().url = 'PondokHarapan/PahReport/PengeluaranPerKodeRekening';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportPengeluaranWin').getForm().submit();
    },
});
jun.PahReportPendapatanWin = Ext.extend(Ext.Window, {
    title:'Pendapatan',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportPendapatanWin',
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
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportPendapatanWin.superclass.initComponent.call(this);
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
            "<form id='form' method='POST' action='PondokHarapan/PahReport/Pendapatan'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PahReportPendapatanWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportPendapatanWin').getForm().url = 'PondokHarapan/PahReport/Pendapatan';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportPendapatanWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PahReportPendapatanWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportPendapatanWin').getForm().url = 'PondokHarapan/PahReport/Pendapatan';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportPendapatanWin').getForm().submit();
    },
});
jun.PahReportBebanAktivitasWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportBebanAktivitasWin',
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
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportBebanAktivitasWin.superclass.initComponent.call(this);
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
            "<form id='form' method='POST' action='PondokHarapan/PahReport/BebanAktivitas'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PahReportBebanAktivitasWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportBebanAktivitasWin').getForm().url = 'PondokHarapan/PahReport/BebanAktivitas';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportBebanAktivitasWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PahReportBebanAktivitasWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportBebanAktivitasWin').getForm().url = 'PondokHarapan/PahReport/BebanAktivitas';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportBebanAktivitasWin').getForm().submit();
    },
});
jun.PahReportBebanAktivitasAnakWin = Ext.extend(Ext.Window, {
    title:'Beban Aktivitas per Anak',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportBebanAktivitasAnakWin',
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
//                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Anak',
                        store:jun.rztPahMemberbyName,
                        hiddenName:'pah_member_id',
                        hiddenValue:'pah_member_id',
                        valueField:'id',
                        //displayField: 'PahMember::model()->representingColumn()',
                        displayField:'real_name',
                        //allowBlank:false,
                        anchor:'100%',
                        name:'pah_member_id',
                        id:'pah_member_idid',
                        ref:'../pah_member_id',
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
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.rztPahMemberbyName.reload();
        jun.PahReportBebanAktivitasAnakWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
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
        win.document.write("<html><title>Beban Aktivitas per Anak</title><body>" +
            "<form id='form' method='POST' action='PondokHarapan/PahReport/BebanAnak'>" +
            "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
            "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
            "<input type='hidden' name='pah_member_id' value='" + this.pah_member_id.value + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PahReportBebanAktivitasAnakWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportBebanAktivitasAnakWin').getForm().url = 'PondokHarapan/PahReport/BebanAnak';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportBebanAktivitasAnakWin').getForm().submit();
    },
    onActivate:function () {
    },
    saveForm:function () {
        Ext.getCmp('form-PahReportBebanAktivitasAnakWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportBebanAktivitasAnakWin').getForm().url = 'PondokHarapan/PahReport/BebanAnak';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportBebanAktivitasAnakWin').getForm().submit();
    },
});
jun.PahReportTanggungJawabWin = Ext.extend(Ext.Window, {
    title:'Pertanggungjawaban',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportTanggungJawabWin',
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
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportTanggungJawabWin.superclass.initComponent.call(this);
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
            "<form id='form' method='POST' action='PondokHarapan/PahReport/TanggungJawab'>" +
            "<input type='hidden' name='periode_bulan' value='" + bulan + "'>" +
            "<input type='hidden' name='periode_tahun' value='" + tahun + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PahReportTanggungJawabWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportTanggungJawabWin').getForm().url = 'PondokHarapan/PahReport/TanggungJawab';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportTanggungJawabWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PahReportTanggungJawabWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportTanggungJawabWin').getForm().url = 'PondokHarapan/PahReport/TanggungJawab';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportTanggungJawabWin').getForm().submit();
    },
});
jun.PahReportAnggaranRealisasiWin = Ext.extend(Ext.Window, {
    title:'Anggaran Versus Realisasi',
    modez:1,
    width:300,
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
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportAnggaranRealisasiWin',
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
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportAnggaranRealisasiWin.superclass.initComponent.call(this);
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
            "<form id='form' method='POST' action='PondokHarapan/PahReport/AnggaranRealisasi'>" +
            "<input type='hidden' name='periode_bulan' value='" + bulan + "'>" +
            "<input type='hidden' name='periode_tahun' value='" + tahun + "'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        Ext.getCmp('form-PahReportAnggaranRealisasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportAnggaranRealisasiWin').getForm().url = 'PondokHarapan/PahReport/AnggaranRealisasi';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportAnggaranRealisasiWin').getForm().submit();
    },
    onActivate:function () {
    },
    onbtnSaveclick:function () {
        Ext.getCmp('form-PahReportAnggaranRealisasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportAnggaranRealisasiWin').getForm().url = 'PondokHarapan/PahReport/AnggaranRealisasi';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportAnggaranRealisasiWin').getForm().submit();
    },
});