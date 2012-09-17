jun.BankAccountsWin = Ext.extend(Ext.Window, {
    title: 'BankAccounts',
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
                id:'form-BankAccounts',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'account_type',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'account_type',
                                    id:'account_typeid',
                                    ref:'../account_type',
                                    maxLength: 6,
                                    //allowBlank: ,
                                    anchor: '100%'
                                },
                    {
                        xtype: 'combo',
                        triggerAction: 'all',
                        mode: 'local',
                        fieldLabel: 'account_code',
                        store: jun.rztChartMaster,
                        hiddenName:'account_code',
                        hiddenValue:'account_code',
                        valueField: 'account_code',
                        displayField: 'account_code',
                        matchFieldWidth: false,
                        tpl:new Ext.XTemplate(
                            '<tpl for="."><div class="search-item">',
                            '<span>{account_code} - {account_name}</span>',
                            '</div></tpl>'
                        ),
                        itemSelector: 'div.search-item',
                        editable : true,                                                                                                       //allowBlank:false,
                        anchor: '100%'

                    },
                    {
                                    xtype: 'textfield',
                                    fieldLabel: 'bank_account_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'bank_account_name',
                                    id:'bank_account_nameid',
                                    ref:'../bank_account_name',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'bank_account_number',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'bank_account_number',
                                    id:'bank_account_numberid',
                                    ref:'../bank_account_number',
                                    maxLength: 100,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'bank_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'bank_name',
                                    id:'bank_nameid',
                                    ref:'../bank_name',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'bank_address',
                            hideLabel:false,
                            //hidden:true,
                            name:'bank_address',
                            id:'bank_addressid',
                            ref:'../bank_address',
                            anchor: '100%'
                            //allowBlank: 1
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'bank_curr_code',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'bank_curr_code',
                                    id:'bank_curr_codeid',
                                    ref:'../bank_curr_code',
                                    maxLength: 3,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'dflt_curr_act',
                            hideLabel:false,
                            //hidden:true,
                            name:'dflt_curr_act',
                            id:'dflt_curr_actid',
                            ref:'../dflt_curr_act',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'last_reconciled_date',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'last_reconciled_date',
                                    id:'last_reconciled_dateid',
                                    ref:'../last_reconciled_date',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'ending_reconcile_balance',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'ending_reconcile_balance',
                                    id:'ending_reconcile_balanceid',
                                    ref:'../ending_reconcile_balance',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
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
        jun.BankAccountsWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'Wanted/BankAccounts/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Wanted/BankAccounts/create/';
                }
             
            Ext.getCmp('form-BankAccounts').getForm().submit({
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
                    jun.rztBankAccounts.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-BankAccounts').getForm().reset();
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