jun.MtPenjualanPerMobil = Ext.extend(Ext.Window, {
    title: 'Penjualan per Mobil',
    iconCls: 'silk13-report',
    modez: 1,
    width: 350,
    height: 175,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    iswin: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtPenjualanPerMobil',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        fieldLabel: 'Mobil',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        lastQuery: '',
                        store: jun.rztMtMobil,
                        hiddenName: 'id_mobil',
                        hiddenValue: 'id_mobil',
                        valueField: 'id_mobil',
                        displayField: 'nopol',
                        ref: '../nopol',
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_mulai',
                        fieldLabel: 'Dari Tanggal',
                        name: 'trans_date_mulai',
                        id: 'trans_date_mulaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_sampai',
                        fieldLabel: 'Sampai Tanggal',
                        name: 'trans_date_sampai',
                        id: 'trans_date_sampaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'hidden', //should use the more standard hiddenfield
                        name: 'format',
                        ref: '../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_excel',
                    text: 'Save to Excel',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text: 'Save to PDF',
                    hidden: false,
                    ref: '../btnPdf'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-printer',
                    text: 'Print',
                    hidden: false,
                    ref: '../btnPrint'
                },
            ]
        };
        jun.rztMtMobil.reload();
        jun.MtPenjualanPerMobil.superclass.initComponent.call(this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var id_mobil = this.nopol.getValue();
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Penjualan per Mobil</title><body>" +
                "<form id='form' method='POST' action='Mahkotrans/MtReport/PenjualanPerMobil'>" +
                "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
                "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
                "<input type='hidden' name='id_mobil' value='" + id_mobil + "'>" +
                "<input type='hidden' name='format' value='html'>" +
                "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick: function() {
        var form = Ext.getCmp('form-MtPenjualanPerMobil').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/PenjualanPerMobil';
        this.format.setValue('pdf');
        form.submit();
    },
    onbtnSaveclick: function() {
        var form = Ext.getCmp('form-MtPenjualanPerMobil').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/PenjualanPerMobil';
        this.format.setValue('excel');
        form.submit();
    }
});
jun.MtPenjualanPerKelompokKonsumen = Ext.extend(Ext.Window, {
    title: 'Penjualan per Kelompok Konsumen',
    iconCls: 'silk13-report',
    modez: 1,
    width: 350,
    height: 175,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    iswin: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtPenjualanPerKelompokKonsumen',
                labelWidth: 150,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        fieldLabel: 'Kelompok Pelanggan',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        store: jun.rztMtKelompokPelanggan,
                        hiddenName: 'id_kelompok',
                        hiddenValue: 'id_kelompok',
                        valueField: 'id_kelompok',
                        displayField: 'nama',
                        ref: '../id_kelompok',
                        lastQuery: '',
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_mulai',
                        fieldLabel: 'Dari Tanggal',
                        name: 'trans_date_mulai',
                        id: 'trans_date_mulaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_sampai',
                        fieldLabel: 'Sampai Tanggal',
                        name: 'trans_date_sampai',
                        id: 'trans_date_sampaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'hidden', //should use the more standard hiddenfield
                        name: 'format',
                        ref: '../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_excel',
                    text: 'Save to Excel',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text: 'Save to PDF',
                    hidden: false,
                    ref: '../btnPdf'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-printer',
                    text: 'Print',
                    hidden: false,
                    ref: '../btnPrint'
                },
            ]
        };
        jun.rztMtKelompokPelanggan.reload();
        jun.MtPenjualanPerKelompokKonsumen.superclass.initComponent.call(this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var id_kelompok = this.id_kelompok.getValue();
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Penjualan per Kelompok Konsumen</title><body>" +
                "<form id='form' method='POST' action='Mahkotrans/MtReport/PenjualanPerKelompokKonsumen'>" +
                "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
                "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
                "<input type='hidden' name='id_kelompok' value='" + id_kelompok + "'>" +
                "<input type='hidden' name='format' value='html'>" +
                "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick: function() {
        var form = Ext.getCmp('form-MtPenjualanPerKelompokKonsumen').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/PenjualanPerKelompokKonsumen';
        this.format.setValue('pdf');
        form.submit();
    },
    onbtnSaveclick: function() {
        var form = Ext.getCmp('form-MtPenjualanPerKelompokKonsumen').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/PenjualanPerKelompokKonsumen';
        this.format.setValue('excel');
        form.submit();
    }
});
jun.MtLabaRugiPerMobil = Ext.extend(Ext.Window, {
    title: 'Laba Rugi per Mobil',
    iconCls: 'silk13-report',
    modez: 1,
    width: 350,
    height: 175,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    iswin: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtLabaRugiPerMobil',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        fieldLabel: 'Mobil',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        lastQuery: '',
                        store: jun.rztMtMobil,
                        hiddenName: 'id_mobil',
                        hiddenValue: 'id_mobil',
                        valueField: 'id_mobil',
                        displayField: 'nopol',
                        ref: '../nopol',
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_mulai',
                        fieldLabel: 'Dari Tanggal',
                        name: 'trans_date_mulai',
                        id: 'trans_date_mulaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_sampai',
                        fieldLabel: 'Sampai Tanggal',
                        name: 'trans_date_sampai',
                        id: 'trans_date_sampaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'hidden', //should use the more standard hiddenfield
                        name: 'format',
                        ref: '../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_excel',
                    text: 'Save to Excel',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text: 'Save to PDF',
                    hidden: false,
                    ref: '../btnPdf'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-printer',
                    text: 'Print',
                    hidden: false,
                    ref: '../btnPrint'
                },
            ]
        };
        jun.rztMtMobil.reload();
        jun.MtLabaRugiPerMobil.superclass.initComponent.call(this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Laba Rugi per Mobil</title><body>" +
                "<form id='form' method='POST' action='Mahkotrans/MtReport/LabaRugiPerMobil'>" +
                "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
                "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
                "<input type='hidden' name='format' value='html'>" +
                "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick: function() {
        var form = Ext.getCmp('form-MtLabaRugiPerMobil').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/LabaRugiPerMobil';
        this.format.setValue('pdf');
        form.submit();
    },
    onbtnSaveclick: function() {
        var form = Ext.getCmp('form-MtLabaRugiPerMobil').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/LabaRugiPerMobil';
        this.format.setValue('excel');
        form.submit();
    }
});
jun.MtLabaRugiMahkotrans = Ext.extend(Ext.Window, {
    title: 'Laba Rugi per Mobil',
    iconCls: 'silk13-report',
    modez: 1,
    width: 350,
    height: 150,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    iswin: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtLabaRugiMahkotrans',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [                   
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_mulai',
                        fieldLabel: 'Dari Tanggal',
                        name: 'trans_date_mulai',
                        id: 'trans_date_mulaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date_sampai',
                        fieldLabel: 'Sampai Tanggal',
                        name: 'trans_date_sampai',
                        id: 'trans_date_sampaiid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'hidden', //should use the more standard hiddenfield
                        name: 'format',
                        ref: '../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_excel',
                    text: 'Save to Excel',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text: 'Save to PDF',
                    hidden: false,
                    ref: '../btnPdf'
                },
                {
                    xtype: 'button',
                    iconCls: 'silk13-printer',
                    text: 'Print',
                    hidden: false,
                    ref: '../btnPrint'
                },
            ]
        };
        jun.rztMtMobil.reload();
        jun.MtLabaRugiMahkotrans.superclass.initComponent.call(this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick: function() {
        var mulai = this.trans_date_mulai.hiddenField.dom.value;
        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Laba Rugi per Mobil</title><body>" +
                "<form id='form' method='POST' action='Mahkotrans/MtReport/LabaRugiMahkotrans'>" +
                "<input type='hidden' name='trans_date_mulai' value='" + mulai + "'>" +
                "<input type='hidden' name='trans_date_sampai' value='" + sampai + "'>" +
                "<input type='hidden' name='format' value='html'>" +
                "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick: function() {
        var form = Ext.getCmp('form-MtLabaRugiMahkotrans').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/LabaRugiMahkotrans';
        this.format.setValue('pdf');
        form.submit();
    },
    onbtnSaveclick: function() {
        var form = Ext.getCmp('form-MtLabaRugiMahkotrans').getForm();
        form.standardSubmit = true;
        form.url = 'Mahkotrans/MtReport/LabaRugiMahkotrans';
        this.format.setValue('excel');
        form.submit();
    }
});