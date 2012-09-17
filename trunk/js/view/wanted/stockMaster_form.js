jun.StockMasterWin = Ext.extend(Ext.Window, {
    title: 'StockMaster',
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
                id:'form-StockMaster',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'category_id',
                            store: jun.rztStockCategory,
                            hiddenName:'category_id',
                            hiddenValue:'category_id',
                            valueField: 'id',
                            //displayField: 'StockCategory::model()->representingColumn()',
                            displayField: 'description',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'tax_type_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'tax_type_id',
                                    id:'tax_type_idid',
                                    ref:'../tax_type_id',
                                    maxLength: 11,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'description',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'description',
                                    id:'descriptionid',
                                    ref:'../description',
                                    maxLength: 200,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'long_description',
                            hideLabel:false,
                            //hidden:true,
                            name:'long_description',
                            id:'long_descriptionid',
                            ref:'../long_description',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'units',
                            store: jun.rztItemUnits,
                            hiddenName:'units',
                            hiddenValue:'units',
                            valueField: 'id',
                            //displayField: 'ItemUnits::model()->representingColumn()',
                            displayField: 'name',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'mb_flag',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'mb_flag',
                                    id:'mb_flagid',
                                    ref:'../mb_flag',
                                    maxLength: 1,
                                    //allowBlank: ,
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
                                    fieldLabel: 'cogs_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'cogs_account',
                                    id:'cogs_accountid',
                                    ref:'../cogs_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'inventory_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'inventory_account',
                                    id:'inventory_accountid',
                                    ref:'../inventory_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'adjustment_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'adjustment_account',
                                    id:'adjustment_accountid',
                                    ref:'../adjustment_account',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'assembly_account',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'assembly_account',
                                    id:'assembly_accountid',
                                    ref:'../assembly_account',
                                    maxLength: 15,
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
                                    fieldLabel: 'actual_cost',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'actual_cost',
                                    id:'actual_costid',
                                    ref:'../actual_cost',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'last_cost',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'last_cost',
                                    id:'last_costid',
                                    ref:'../last_cost',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'material_cost',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'material_cost',
                                    id:'material_costid',
                                    ref:'../material_cost',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'labour_cost',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'labour_cost',
                                    id:'labour_costid',
                                    ref:'../labour_cost',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'overhead_cost',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'overhead_cost',
                                    id:'overhead_costid',
                                    ref:'../overhead_cost',
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
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'no_sale',
                            hideLabel:false,
                            //hidden:true,
                            name:'no_sale',
                            id:'no_saleid',
                            ref:'../no_sale',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'editable',
                            hideLabel:false,
                            //hidden:true,
                            name:'editable',
                            id:'editableid',
                            ref:'../editable',
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
        jun.StockMasterWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'Wanted/StockMaster/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Wanted/StockMaster/create/';
                }
             
            Ext.getCmp('form-StockMaster').getForm().submit({
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
                    jun.rztStockMaster.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-StockMaster').getForm().reset();
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