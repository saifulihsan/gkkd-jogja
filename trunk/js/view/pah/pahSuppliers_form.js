jun.PahSuppliersWin = Ext.extend(Ext.Window, {
    title:'Pemasok',
    modez:1,
    width:400,
    height:300,
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
                id:'form-PahSuppliers',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Pemasok',
                        hideLabel:false,
                        //hidden:true,
                        name:'supp_name',
                        id:'supp_nameid',
                        ref:'../supp_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Ref. Pemasok',
                        hideLabel:false,
                        //hidden:true,
                        name:'supp_ref',
                        id:'supp_refid',
                        ref:'../supp_ref',
                        maxLength:30,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'E-Mail',
                        hideLabel:false,
                        //hidden:true,
                        name:'mail_address',
                        id:'mail_addressid',
                        ref:'../mail_address',
                        anchor:'100%'
                        //allowBlank:
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Alamat',
                        hideLabel:false,
                        //hidden:true,
                        name:'address',
                        id:'addressid',
                        ref:'../address',
                        anchor:'100%',
                        height:100
                        //allowBlank:
                    },

//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'gst_no',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'gst_no',
//                                    id:'gst_noid',
//                                    ref:'../gst_no',
//                                    maxLength: 25,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'contact',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'contact',
//                                    id:'contactid',
//                                    ref:'../contact',
//                                    maxLength: 60,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'supp_account_no',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'supp_account_no',
//                                    id:'supp_account_noid',
//                                    ref:'../supp_account_no',
//                                    maxLength: 40,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'website',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'website',
//                                    id:'websiteid',
//                                    ref:'../website',
//                                    maxLength: 100,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'bank_account',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'bank_account',
//                                    id:'bank_accountid',
//                                    ref:'../bank_account',
//                                    maxLength: 60,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'curr_code',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'curr_code',
//                                    id:'curr_codeid',
//                                    ref:'../curr_code',
//                                    maxLength: 3,
//                                    //allowBlank: 1,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'payment_terms',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'payment_terms',
//                                    id:'payment_termsid',
//                                    ref:'../payment_terms',
//                                    maxLength: 11,
//                                    //allowBlank: 1,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'credit_limit',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'credit_limit',
//                                    id:'credit_limitid',
//                                    ref:'../credit_limit',
//                                    maxLength: 30,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'purchase_account',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'purchase_account',
//                                    id:'purchase_accountid',
//                                    ref:'../purchase_account',
//                                    maxLength: 15,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'payable_account',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'payable_account',
//                                    id:'payable_accountid',
//                                    ref:'../payable_account',
//                                    maxLength: 15,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
//                                                                     {
//                                    xtype: 'textfield',
//                                    fieldLabel: 'payment_discount_account',
//                                    hideLabel:false,
//                                    //hidden:true,
//                                    name:'payment_discount_account',
//                                    id:'payment_discount_accountid',
//                                    ref:'../payment_discount_account',
//                                    maxLength: 15,
//                                    //allowBlank: ,
//                                    anchor: '100%'
//                                },
                    {
                        xtype:'textarea',
                        fieldLabel:'Keterangan',
                        hideLabel:false,
                        //hidden:true,
                        name:'notes',
                        id:'notesid',
                        ref:'../notes',
                        anchor:'100%',
                        height:100
                        //allowBlank:
                    },
//                                                                     {
//                            xtype: 'textfield',
//                            fieldLabel: 'inactive',
//                            hideLabel:false,
//                            //hidden:true,
//                            name:'inactive',
//                            id:'inactiveid',
//                            ref:'../inactive',
//                            //allowBlank: ,
//                            anchor: '100%'
//                        },
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
        jun.PahSuppliersWin.superclass.initComponent.call(this);
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
            urlz = 'PondokHarapan/PahSuppliers/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahSuppliers/create/';
        }
        Ext.getCmp('form-PahSuppliers').getForm().submit({
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
                jun.rztPahSuppliers.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahSuppliers').getForm().reset();
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