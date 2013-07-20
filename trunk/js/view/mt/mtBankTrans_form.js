jun.MtTranferBankWin = Ext.extend(Ext.Window, {
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
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
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
                                store:jun.rztMtBankAccounts,
                                hiddenName:'bank_act_asal',
                                hiddenValue:'bank_act',
                                valueField:'id',
                                ref:'../../cmbBankAsal',
                                forceSelection:true,
                                displayField:'bank_account_name',
                                //allowBlank:false,
                                anchor:'100%',
                                lastQuery:''
                            },
                            {
                                xtype:'numericfield',
                                fieldLabel:'Bank Balance',
                                hideLabel:false,
                                name:'bank_bal',
                                id:'bank_bal_id',
                                readOnly:true,
                                ref:'../../lblBankBal',
                                anchor:'100%'
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
                                store:jun.rztMtBankAccounts,
                                hiddenName:'bank_act_tujuan',
                                hiddenValue:'bank_act',
                                valueField:'id',
                                forceSelection:true,
                                displayField:'bank_account_name',
                                //allowBlank:false,
                                anchor:'100%',
                                ref:'../../cmbBankTujuan',
                                lastQuery:''
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
                            }
                            //{
//                                xtype:'numericfield',
//                                fieldLabel:'Biaya Bank',
//                                name:'reconciled',
//                                id:'reconciledid',
//                                format:'d M Y',
//                                //allowBlank: 1,
//                                anchor:'100%'
//                            }
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
        jun.rztMtBankAccounts.reload();
        jun.MtTranferBankWin.superclass.initComponent.call(this);
//        this.on('activate', this.onActivate, this);
        this.cmbBankAsal.on('select', this.oncmbBankAsalChange, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbBankAsal.on('focus', this.onLoadBank, this);
        this.cmbBankTujuan.on('focus', this.onLoadBank, this);
        this.on('close', this.onWinClose, this);

    },
    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onWinClose:function () {
        jun.rztMtBankAccounts.clearFilter();
    },
    onLoadBank:function () {
        jun.rztMtBankAccounts.FilterData();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    oncmbBankAsalChange:function (cmb, newVal, oldVal) {
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'Mahkotrans/MtBankTrans/GetBalance/',
            params:{
                id:this.cmbBankAsal.getValue()
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
        this.btnDisabled(true);
        if(this.cmbBankAsal.getValue() == this.cmbBankTujuan.getValue()){
            Ext.MessageBox.alert("Error", "Bank tujuan tidak boleh sama dengan bank asal!");
            this.btnDisabled(false);
            return;
        }
        var urlz;

        urlz = 'Mahkotrans/MtBankTrans/createtransfer/';
        Ext.getCmp('pah-form-Transfer-bank').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
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
                    this.btnDisabled(false);
                    return;
                } else {
                    Ext.MessageBox.show({
                        title:'Transfer',
                        msg:response.msg + "<br /> Ref. Dokumen : " + response.id,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('pah-form-Transfer-bank').getForm().reset();
                }
                jun.rztMtBankTrans.reload();
                this.close();
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                this.btnDisabled(false);
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