jun.MtGlTransWin = Ext.extend(Ext.Window, {
    title: 'Jurnal Umum',
    modez: 1,
    width: 800,
    height: 455,
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
                id: 'form-MtGlTrans',
                labelWidth: 150,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'xdatefield',
                        ref: '../tran_date',
                        fieldLabel: 'Tanggal Transaksi',
                        name: 'tran_date',
                        id: 'tran_dateid',
                        format: 'd M Y'
                    },
                    new jun.MtGlTransGrid({
//                        x: 5,
//                        y: 122,
                        height: 285,
                        frameHeader: false,
                        header: false
                        //modez:this.modez
                    }),
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Total Debit',
                        hideLabel: false,
                        name: 'tot_debit',
                        id: 'tot_debit_id',
                        readOnly: true,
                        ref: '../TotDebit'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Total Kredit',
                        hideLabel: false,
                        name: 'tot_kredit',
                        id: 'tot_kredit_id',
                        readOnly: true,
                        ref: '../TotKredit'
                    }
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Batal',
                    ref: '../btnCancel'
                }
            ]
        };
        jun.rztMtGlTrans.removeAll();
        jun.MtGlTransWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onActivate: function() {
        this.btnSave.hidden = false;
        jun.rztMtGlTrans.refreshData();
    },
    btnDisabled: function(status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    saveForm: function() {
        this.btnDisabled(true);
        if (this.TotDebit.value != this.TotKredit.value) {
            Ext.MessageBox.alert("Error", "Total Debit dan Total Kredit harus sama.");
            this.btnDisabled(false);
            return;
        }
        if (parseFloat(this.TotDebit.value) === 0 || parseFloat(this.TotKredit.value) === 0) {
            Ext.MessageBox.alert("Error", "Total Debit atau Total Kredit tidak boleh nol.");
            this.btnDisabled(false);
            return;
        }
        Ext.getCmp('form-MtGlTrans').getForm().submit({
            url: "Mahkotrans/MtGlTrans/CreateJurnalUmum?output=json",
            params: {
                detil: Ext.encode(Ext.pluck(jun.rztMtGlTrans.data.items, 'data'))
            },
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                var response = Ext.decode(a.response.responseText);
                this.btnDisabled(false);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title: 'Jurnal Umum',
                        msg: "Jurnal umum gagal disimpan.<br /> Alasan :" + response.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }else{
                    Ext.MessageBox.show({
                        title: 'Jurnal Umum',
                        msg: response.msg + "<br /> Ref. Dokumen : " + response.id,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
//                if (this.modez == 0) {
//                    Ext.MessageBox.show({
//                        title: 'Anggaran',
//                        msg: "Anggaran bulan " + response.bulan + " tahun " + response.tahun + " berhasil disimpan.<br /> Ref. Dokumen : " + response.id,
//                        buttons: Ext.MessageBox.OK,
//                        icon: Ext.MessageBox.INFO
//                    });
//                    Ext.getCmp('form-PahAnggaran').getForm().reset();
//                    this.btnDisabled(false);
//                }
                Ext.getCmp('form-MtGlTrans').getForm().reset();
                jun.rztMtGlTrans.removeAll();
                this.close();
            },
            failure: function(f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                this.btnDisabled(false);
            }

        });

    },
    onbtnSaveCloseClick: function() {
        this.closeForm = true;
        this.saveForm(true);
    },
    onbtnSaveclick: function() {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function() {
        this.close();
    }

});

jun.MtGlTransDetilWin = Ext.extend(Ext.Window, {
    title: 'Alokasi',
    modez: 1,
    width: 335,
    height: 165,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    debit: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtGlTransDetil',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        ref: '../cmbkode',
                        typeAhead: true,
                        triggerAction: 'all',
                        allowBlank: false,
                        forceSelection: true,
                        mode: 'local',
                        fieldLabel: 'Kode Rekening',
                        store: jun.rztMtChartMaster,
                        hiddenName: 'mt_chart_master_account_code',
                        hiddenValue: 'mt_chart_master_account_code',
                        valueField: 'account_code',
                        matchFieldWidth: false,
                        itemSelector: 'div.search-item',
                        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        displayField: 'account_code',
                        listWidth: 300,
                        anchor: '100%',
                        lastQuery: ''
                    },
                    {
                        xtype: 'combo',
                        ref: '../mobil',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'No. Polisi',
                        store: jun.rztMtMobil,
                        hiddenName: 'id_mobil',
                        hiddenValue: 'id_mobil',
                        valueField: 'id_mobil',
                        displayField: 'nopol',
                        allowBlank:true,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Jumlah',
                        hideLabel: false,
                        name: 'amount',
                        id: 'amountid',
                        ref: '../amount',
                        maxLength: 30,
                        value: 0,
                        anchor: '100%'
                    }
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Batal',
                    ref: '../btnCancel'
                }
            ]
        };
        jun.rztMtMobil.reload();
        jun.rztMtChartMaster.reload();
        jun.MtGlTransDetilWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbkode.on('focus', this.onLoadChartMaster, this);
        this.on('close', this.onWinClose, this);
    },
    onLoadChartMaster: function() {
        jun.rztMtChartMaster.FilterData();
    },
    onWinClose: function() {
        jun.rztMtChartMaster.clearFilter();
    },
    onActivate: function() {
        this.btnSave.hidden = false;
//        this.title = this.debit ? "Tambah Debit" : "Tambah Kredit";
    },
    saveForm: function() {
        if (parseFloat(this.amount.value) === 0) {
            Ext.MessageBox.alert("Error", "Jumlah tidak boleh 0");
            return;
        }
        var index_kode = jun.rztMtGlTrans.find('account', this.cmbkode.value);
        if (index_kode > -1 && this.modez == 0) {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Kode rekening sudah di dipakai!',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        var detil = jun.rztMtGlTrans.recordType;
        var e = new detil({
            account: this.cmbkode.value,
            debit: this.debit ? parseFloat(this.amount.value) : 0,
            kredit: this.debit ? 0 : parseFloat(this.amount.value),
            id_mobil: this.mobil.value
        });

        jun.rztMtGlTrans.insert(jun.rztMtGlTrans.getCount(), e);
        jun.rztMtGlTrans.refreshData();
        Ext.getCmp('form-MtGlTransDetil').getForm().reset();
        if (this.closeForm)
            this.close();
    },
    onbtnSaveCloseClick: function() {
        this.closeForm = true;
        this.saveForm(true);
    },
    onbtnSaveclick: function() {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function() {
        this.close();
    }

});