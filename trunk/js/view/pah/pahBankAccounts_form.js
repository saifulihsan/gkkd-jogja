jun.PahBankAccountsWin = Ext.extend(Ext.Window, {
    title:'Kas dan Bank',
    modez:1,
    width:425,
    height:320,
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
                id:'form-PahBankAccounts',
                labelWidth:125,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kode Rekening',
                        store:jun.rztPahChartMaster,
                        hiddenName:'account_code',
                        hiddenValue:'account_code',
                        valueField:'account_code',
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        //hideTrigger:true,
                        //pageSize:10,
                        tpl:new Ext.XTemplate(
                            '<tpl for="."><div class="search-item">',
                            '<h3><span">{account_code} - {account_name}</span></h3><br />{description}',
                            '</div></tpl>'
                        ),
                        //displayField: 'PahChartMaster::model()->representingColumn()',
                        displayField:'account_code',
                        listWidth:300,
                        editable:true,
                        anchor:'100%'
                    },
//                    {
//                        xtype:'textfield',
//                        fieldLabel:'account_type',
//                        hideLabel:false,
//                        //hidden:true,
//                        name:'account_type',
//                        id:'account_typeid',
//                        ref:'../account_type',
//                        maxLength:6,
//                        //allowBlank: ,
//                        anchor:'100%'
//                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Kas/Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_account_name',
                        id:'bank_account_nameid',
                        ref:'../bank_account_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_name',
                        id:'bank_nameid',
                        ref:'../bank_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nomer Rekening Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_account_number',
                        id:'bank_account_numberid',
                        ref:'../bank_account_number',
                        maxLength:100,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Atas Nama',
                        hideLabel:false,
                        //hidden:true,
                        name:'atas_nama',
                        id:'atas_namaid',
                        ref:'../atas_nama',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Telepon',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_phone',
                        id:'bank_phoneid',
                        ref:'../bank_phone',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Alamat Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_address',
                        id:'bank_addressid',
                        ref:'../bank_address',
                        anchor:'100%',
                        height:50
                        //allowBlank: 1
                    },
//                    {
//                        xtype:'textfield',
//                        fieldLabel:'bank_curr_code',
//                        hideLabel:false,
//                        //hidden:true,
//                        name:'bank_curr_code',
//                        id:'bank_curr_codeid',
//                        ref:'../bank_curr_code',
//                        maxLength:3,
//                        //allowBlank: ,
//                        anchor:'100%'
//                    },
//                    {
//                        xtype:'textfield',
//                        fieldLabel:'dflt_curr_act',
//                        hideLabel:false,
//                        //hidden:true,
//                        name:'dflt_curr_act',
//                        id:'dflt_curr_actid',
//                        ref:'../dflt_curr_act',
//                        //allowBlank: ,
//                        anchor:'100%'
//                    },
//                    {
//                        xtype:'textfield',
//                        fieldLabel:'ending_reconcile_balance',
//                        hideLabel:false,
//                        //hidden:true,
//                        name:'ending_reconcile_balance',
//                        id:'ending_reconcile_balanceid',
//                        ref:'../ending_reconcile_balance',
//                        maxLength:20,
//                        //allowBlank: ,
//                        anchor:'100%'
//                    },
                    {
                        xtype:'checkbox',
                        fieldLabel:'Tidak Aktif',
                        hideLabel:false,
                        //hidden:true,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
                        //allowBlank: ,
                        anchor:'100%'
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
        jun.rztPahChartMaster.reload();
        jun.PahBankAccountsWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokHarapan/PahBankAccounts/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahBankAccounts/create/';
        }
        Ext.getCmp('form-PahBankAccounts').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
//                jun.rztPahBankAccounts.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PahBankAccounts').getForm().reset();
                }
                jun.rztPahBankAccounts.reload();
                if (this.closeForm) {
                    this.close();
                }
//                if (this.closeForm) {
//                    this.close();
//                } else {
//                    if (response.data != undefined) {
//                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
//                    }
//                    if (this.modez == 0) {
//                        Ext.getCmp('form-PahBankAccounts').getForm().reset();
//                    }
//                }
            },
            failure:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                });
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