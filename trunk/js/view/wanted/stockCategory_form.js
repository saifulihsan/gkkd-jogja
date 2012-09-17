jun.StockCategoryWin = Ext.extend(Ext.Window, {
    title: 'StockCategory',
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
                id:'form-StockCategory',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'description',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'description',
                                    id:'descriptionid',
                                    ref:'../description',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_tax_type',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_tax_type',
                                    id:'dflt_tax_typeid',
                                    ref:'../dflt_tax_type',
                                    maxLength: 11,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'dflt_units',
                            store: jun.rztItemUnits,
                            hiddenName:'dflt_units',
                            hiddenValue:'dflt_units',
                            valueField: 'abbr',
                            //displayField: 'ItemUnits::model()->representingColumn()',
                            displayField: 'name',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_mb_flag',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_mb_flag',
                                    id:'dflt_mb_flagid',
                                    ref:'../dflt_mb_flag',
                                    maxLength: 1,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_sales_act',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_sales_act',
                                    id:'dflt_sales_actid',
                                    ref:'../dflt_sales_act',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_cogs_act',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_cogs_act',
                                    id:'dflt_cogs_actid',
                                    ref:'../dflt_cogs_act',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_inventory_act',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_inventory_act',
                                    id:'dflt_inventory_actid',
                                    ref:'../dflt_inventory_act',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_adjustment_act',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_adjustment_act',
                                    id:'dflt_adjustment_actid',
                                    ref:'../dflt_adjustment_act',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_assembly_act',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_assembly_act',
                                    id:'dflt_assembly_actid',
                                    ref:'../dflt_assembly_act',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_dim1',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_dim1',
                                    id:'dflt_dim1id',
                                    ref:'../dflt_dim1',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'dflt_dim2',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'dflt_dim2',
                                    id:'dflt_dim2id',
                                    ref:'../dflt_dim2',
                                    maxLength: 11,
                                    //allowBlank: 1,
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
                            fieldLabel: 'dflt_no_sale',
                            hideLabel:false,
                            //hidden:true,
                            name:'dflt_no_sale',
                            id:'dflt_no_saleid',
                            ref:'../dflt_no_sale',
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
        jun.StockCategoryWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'Wanted/StockCategory/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Wanted/StockCategory/create/';
                }
             
            Ext.getCmp('form-StockCategory').getForm().submit({
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
                    jun.rztStockCategory.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-StockCategory').getForm().reset();
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