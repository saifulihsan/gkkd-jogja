jun.PahAktivitasWin = Ext.extend(Ext.Window, {
    title:'Aktivitas',
    modez:1,
    width:400,
    height:350,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahAktivitas',
                labelWidth:120,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
//                                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'doc_ref',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'doc_ref',
//                                    id:'doc_refid',
//                                    ref:'../doc_ref',
//                                    maxLength: 15,
//                                    //allowBlank: 1,
//                                    anchor: '100%'
//                                },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date',
                        fieldLabel:'Tanggal Transaksi',
                        name:'trans_date',
                        id:'trans_dateid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },


                    {
                        xtype:'textfield',
                        fieldLabel:'No. Bukti',
                        hideLabel:false,
                        //hidden:true,
                        name:'no_bukti',
                        id:'no_buktiid',
                        ref:'../no_bukti',
                        maxLength:45,
                        //allowBlank: 1,
                        anchor:'100%'
                    },

//                    {
//                        xtype:'xdatefield',
//                        ref:'../entry_time',
//                        fieldLabel:'entry_time',
//                        name:'entry_time',
//                        id:'entry_timeid',
//                        hidden:true,
//                        value: new Date(),
//                        //format:'d M Y',
//                        //allowBlank: 1,
//                        anchor:'100%'
//                    },


                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Pemasok',
                        store:jun.rztPahSuppliers,
                        hiddenName:'pah_suppliers_supplier_id',
                        hiddenValue:'pah_suppliers_supplier_id',
                        valueField:'supplier_id',
                        //displayField: 'PahSuppliers::model()->representingColumn()',
                        displayField:'supp_name',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kode Rekening',
                        store:jun.rztPahChartMaster,
                        hiddenName:'pah_chart_master_account_code',
                        hiddenValue:'pah_chart_master_account_code',
                        valueField:'account_code',
                        tpl:new Ext.XTemplate(
                            '<tpl for="."><div class="search-item">',
                            '<h3><span">{account_code} - {account_name}</span></h3><br />{description}',
                            '</div></tpl>'
                        ),
                        matchFieldWidth:false,
                        itemSelector: 'div.search-item',
                        editable : true,
                        listWidth:300,
                        displayField:'account_code',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kas/Bank',
                        store:jun.rztPahBankAccounts,
                        hiddenName:'pah_bank_accounts_id',
                        hiddenValue:'pah_bank_accounts_id',
                        valueField:'id',
                        //displayField: 'PahBankAccounts::model()->representingColumn()',
                        displayField:'bank_account_name',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    /* {
                        xtype:'textfield',
                        fieldLabel:'trans_via',
                        hideLabel:false,
                        //hidden:true,
                        name:'Cara Pembayaran',
                        id:'trans_viaid',
                        ref:'../trans_via',
                        maxLength:45,
                        //allowBlank: 1,
                        anchor:'100%'
                    },*/
                    new jun.comboPayment ({
                        fieldLabel:'Cara Bayar',
                        value:'Tunai',
                        anchor:'100%'
                    }),
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
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
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Sub Aktivitas',
                        store:jun.rztPahSubAktivitas,
                        hiddenName:'pah_sub_aktivitas_id',
                        hiddenValue:'pah_sub_aktivitas_id',
                        valueField:'id',
                        //displayField: 'PahSubAktivitas::model()->representingColumn()',
                        displayField:'nama',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'numericfield',
                        fieldLabel:'Jumlah',
                        hideLabel:false,
                        //hidden:true,
                        name:'amount',
                        id:'amountid',
                        ref:'../amount',
                        maxLength:30,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
//                    {
//                        xtype:'combo',
//                        typeAhead:true,
//                        triggerAction:'all',
//                        lazyRender:true,
//                        mode:'local',
//                        fieldLabel:'users_id',
//                        store:jun.rztUsers,
//                        hiddenName:'users_id',
//                        hiddenValue:'users_id',
//                        valueField:'id',
//                        //displayField: 'Users::model()->representingColumn()',
//                        displayField:'user_id',
//                        //allowBlank:false,
//                        anchor:'100%'
//                    },

                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Simpan',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Simpan & Tutup',
                    ref:'../btnSaveClose'
                },
                {
                    xtype:'button',
                    text:'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.rztPahBankAccounts.reload();
        jun.rztPahSuppliers.reload();
        jun.rztPahMemberbyName.reload();
        jun.rztPahSubAktivitas.reload();
        jun.rztPahChartMaster.reload();
        jun.PahAktivitasWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);

    },

    onActivate:function () {

        this.btnSave.hidden = false;
        jun.rztPahMemberbyName.reload();

    },

    saveForm:function () {
        var urlz;

        if (this.modez == 1 || this.modez == 2) {

            urlz = 'PondokHarapan/PahAktivitas/update/id/' + this.id;

        } else {

            urlz = 'PondokHarapan/PahAktivitas/create/';
        }

        Ext.getCmp('form-PahAktivitas').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
            waitMsg:'Sedang Proses',
            scope:this,

            success:function (f, a) {
                jun.rztPahAktivitas.reload();

                var response = Ext.decode(a.response.responseText);

                if (this.closeForm) {

                    this.close();

                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahAktivitas').getForm().reset();
                    }
                }

            },

            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }

        });

    },

    onbtnSaveCloseClick:function () {
        this.closeForm = true;
        this.saveForm(true);
    },

    onbtnSaveclick:function () {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick:function () {
        this.close();
    }

});