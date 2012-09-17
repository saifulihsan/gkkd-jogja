jun.CustomersWin = Ext.extend(Ext.Window, {
    title: 'Customers',
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
                id:'form-Customers',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'br_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'br_name',
                                    id:'br_nameid',
                                    ref:'../br_name',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'branch_ref',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'branch_ref',
                                    id:'branch_refid',
                                    ref:'../branch_ref',
                                    maxLength: 30,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'br_address',
                            hideLabel:false,
                            //hidden:true,
                            name:'br_address',
                            id:'br_addressid',
                            ref:'../br_address',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'area',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'area',
                                    id:'areaid',
                                    ref:'../area',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'salesman',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'salesman',
                                    id:'salesmanid',
                                    ref:'../salesman',
                                    maxLength: 11,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'contact_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'contact_name',
                                    id:'contact_nameid',
                                    ref:'../contact_name',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'default_location',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'default_location',
                                    id:'default_locationid',
                                    ref:'../default_location',
                                    maxLength: 5,
                                    //allowBlank: ,
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
                                    fieldLabel: 'sales_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'sales_account',
                                    id:'sales_accountid',
                                    ref:'../sales_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'sales_discount_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'sales_discount_account',
                                    id:'sales_discount_accountid',
                                    ref:'../sales_discount_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'receivables_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'receivables_account',
                                    id:'receivables_accountid',
                                    ref:'../receivables_account',
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
                                    fieldLabel: 'default_ship_via',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'default_ship_via',
                                    id:'default_ship_viaid',
                                    ref:'../default_ship_via',
                                    maxLength: 11,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'disable_trans',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'disable_trans',
                                    id:'disable_transid',
                                    ref:'../disable_trans',
                                    maxLength: 4,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'br_post_address',
                            hideLabel:false,
                            //hidden:true,
                            name:'br_post_address',
                            id:'br_post_addressid',
                            ref:'../br_post_address',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'group_no',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'group_no',
                                    id:'group_noid',
                                    ref:'../group_no',
                                    maxLength: 11,
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
        jun.CustomersWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'Wanted/Customers/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Wanted/Customers/create/';
                }
             
            Ext.getCmp('form-Customers').getForm().submit({
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
                    jun.rztCustomers.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-Customers').getForm().reset();
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