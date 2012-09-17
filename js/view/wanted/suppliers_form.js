jun.SuppliersWin = Ext.extend(Ext.Window, {
    title: 'Suppliers',
    modez:1,
    width: 400,
    height: 300,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,    
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #DFE8F6; padding: 10px',
                id:'form-Suppliers',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'supp_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'supp_name',
                                    id:'supp_nameid',
                                    ref:'../supp_name',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'supp_ref',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'supp_ref',
                                    id:'supp_refid',
                                    ref:'../supp_ref',
                                    maxLength: 30,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'address',
                            hideLabel:false,
                            //hidden:true,
                            name:'address',
                            id:'addressid',
                            ref:'../address',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'supp_address',
                            hideLabel:false,
                            //hidden:true,
                            name:'supp_address',
                            id:'supp_addressid',
                            ref:'../supp_address',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'gst_no',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'gst_no',
                                    id:'gst_noid',
                                    ref:'../gst_no',
                                    maxLength: 25,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'contact',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'contact',
                                    id:'contactid',
                                    ref:'../contact',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'supp_account_no',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'supp_account_no',
                                    id:'supp_account_noid',
                                    ref:'../supp_account_no',
                                    maxLength: 40,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'website',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'website',
                                    id:'websiteid',
                                    ref:'../website',
                                    maxLength: 100,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'bank_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'bank_account',
                                    id:'bank_accountid',
                                    ref:'../bank_account',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'curr_code',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'curr_code',
                                    id:'curr_codeid',
                                    ref:'../curr_code',
                                    maxLength: 3,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'payment_terms',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'payment_terms',
                                    id:'payment_termsid',
                                    ref:'../payment_terms',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'tax_included',
                            hideLabel:false,
                            //hidden:true,
                            name:'tax_included',
                            id:'tax_includedid',
                            ref:'../tax_included',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dimension_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dimension_id',
                                    id:'dimension_idid',
                                    ref:'../dimension_id',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dimension2_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dimension2_id',
                                    id:'dimension2_idid',
                                    ref:'../dimension2_id',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'tax_group_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'tax_group_id',
                                    id:'tax_group_idid',
                                    ref:'../tax_group_id',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'credit_limit',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'credit_limit',
                                    id:'credit_limitid',
                                    ref:'../credit_limit',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'purchase_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'purchase_account',
                                    id:'purchase_accountid',
                                    ref:'../purchase_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'payable_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'payable_account',
                                    id:'payable_accountid',
                                    ref:'../payable_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'payment_discount_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'payment_discount_account',
                                    id:'payment_discount_accountid',
                                    ref:'../payment_discount_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'notes',
                            hideLabel:false,
                            //hidden:true,
                            name:'notes',
                            id:'notesid',
                            ref:'../notes',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'inactive',
                            hideLabel:false,
                            //hidden:true,
                            name:'inactive',
                            id:'inactiveid',
                            ref:'../inactive',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                   
                  ]
            }];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref:'../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.SuppliersWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);       
        
    },
    
    onActivate: function(){
              
        this.btnSave.hidden = false;
        
    },
            
    saveForm : function()
    {       
            var urlz;
     
            if(this.modez == 1 || this.modez== 2) {
                    
                    urlz= 'Wanted/Suppliers/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Wanted/Suppliers/create/';
                }
             
            Ext.getCmp('form-Suppliers').getForm().submit({
                url:urlz,                
                /*
                params:{                                  
                  tglpeljlo: this.tglpeljlo,
                  jenpeljlo: this.jenpeljlo,
                  modez: this.modez
                },*/
                timeOut: 1000,
                waitMsg: 'Sedang Proses',
                scope: this,

                success: function(f,a){
                    jun.rztSuppliers.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-Suppliers').getForm().reset();
                        }
                    }
                    
                },

                failure: function(f,a){
                    Ext.MessageBox.alert("Error","Can't Communicate With The Server");
                }

            });

    },
    
    onbtnSaveCloseClick: function()
    {
        this.closeForm = true;
        this.saveForm(true);
    },
    
    onbtnSaveclick: function()
    {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function(){
        this.close();
    }
   
});