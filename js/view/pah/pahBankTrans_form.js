jun.PahTranferBankWin = Ext.extend(Ext.Window, {
    title:'Mutasi Antar Kas/Bank',
    modez:1,
    id:'pah-win-transfer-bank',
    width:600,
    height:250,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    resizable:false,
    iswin:true,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'pah-form-Transfer-bank',
                labelWidth:100,
                labelAlign:'left',
                layout:'column',
                ref:'formz',
                border:false,
                items:[
                    {
                        columnWidth:.5,
                        baseCls:'x-plain',
                        bodyStyle:'padding:1px',
                        layout:'form',
                        ref:'col1',
                        items:[
                            {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                fieldLabel:'Bank Asal',
                                store:jun.rztPahBankAccounts,
                                hiddenName:'bank_act_asal',
                                hiddenValue:'bank_act',
                                valueField:'id',
                                ref:'../../cmbBankAsal',
                                //displayField: 'BankAccounts::model()->representingColumn()',
                                displayField:'bank_account_name',
                                //allowBlank:false,
                                anchor:'100%'
                            },
                            {
                                xtype:'numericfield',
                                fieldLabel:'Bank Balance',
                                hideLabel:false,
                                name:'bank_bal',
                                id:'bank_bal_id',
                                readOnly:true,
                                ref:'../../lblBankBal',
                                anchor:'100%',
//                                cls: 'x-form-item',
//                                style:'text-align:right;margin:3px;',
                                //disable: true,
                            },
                            {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                fieldLabel:'Bank Tujuan',
                                store:jun.rztPahBankAccounts,
                                hiddenName:'bank_act_tujuan',
                                hiddenValue:'bank_act',
                                valueField:'id',
                                //displayField: 'BankAccounts::model()->representingColumn()',
                                displayField:'bank_account_name',
                                //allowBlank:false,
                                anchor:'100%'
                            },
                            {
                                xtype:'xdatefield',
                                fieldLabel:'Tanggal Transfer',
                                hideLabel:false,
                                //hidden:true,
                                name:'trans_date',
                                id:'refid',

                                maxLength:40,
                                //allowBlank: 1,
                                anchor:'100%'
                            },
                            {
                                xtype:'numericfield',
                                fieldLabel:'Jumlah',
                                hideLabel:false,
                                //hidden:true,
                                name:'amount',
                                id:'amountid',

                                maxLength:20,
                                //allowBlank: 1,
                                anchor:'100%'
                            },
                            {
                                xtype:'numericfield',
                                fieldLabel:'Biaya Bank',
                                name:'reconciled',
                                id:'reconciledid',
                                format:'d M Y',
                                //allowBlank: 1,
                                anchor:'100%'
                            }
                        ]
                    },
                    {
                        columnWidth:.5,
                        baseCls:'x-plain',
                        bodyStyle:'padding:5px 0 5px 5px',
                        layout:'column',
                        items:[
                            {
                                xtype:'label',
                                text:'Memo :'
                            },
                            {
                                xtype:'textarea',
                                name:'memo',
                                id:'memoid',
                                height:'77%',
                                width:'100%'
                            }
                        ]
                    }

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
        jun.PahTranferBankWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.cmbBankAsal.on('select', this.oncmbBankAsalChange, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);

    },

    onActivate:function () {

        this.btnSave.hidden = false;

    },

    oncmbBankAsalChange:function (cmb, newVal, oldVal) {
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahBankTrans/GetBalance/',
            params:{
                id:this.cmbBankAsal.getValue(),
            },

            success:function (response) {
                var response = Ext.decode(response.responseText);

                Ext.getCmp('bank_bal_id').setValue(response.id);
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });

    },

    saveForm:function () {
        var urlz;
//
//        if (this.modez == 1 || this.modez == 2) {
//
//            urlz = 'Wanted/BankTrans/update/id/' + this.id;
//
//        } else {
//
//            urlz = 'Wanted/BankTrans/create/';
//        }
        urlz = 'PondokHarapan/PahBankTrans/createtransfer/';
        Ext.getCmp('pah-form-Transfer-bank').getForm().submit({
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
                var response = Ext.decode(a.response.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title:'Transfer',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.ERROR
                    });
                    return;
                }else{
                    Ext.MessageBox.show({
                        title:'Transfer',
                        msg:response.msg + "<br /> Ref. Dokumen : " + response.id,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('pah-form-Transfer-bank').getForm().reset();
                }
                jun.rztPahBankTrans.reload();
                this.close();
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