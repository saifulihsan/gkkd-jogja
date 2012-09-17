jun.NotaWin = Ext.extend(Ext.Window, {
    title: 'Nota',
    modez:1,
    width: 826,
    height: 400,
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
                id:'form-Nota',
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
                            fieldLabel: 'sales_id',
                            store: jun.rztSales,
                            hiddenName:'sales_id',
                            hiddenValue:'sales_id',
                            valueField: 'id',
                            //displayField: 'Sales::model()->representingColumn()',
                            displayField: 'ref',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'term',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'term',
                                    id:'termid',
                                    ref:'../term',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'warehouse',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'warehouse',
                                    id:'warehouseid',
                                    ref:'../warehouse',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'status',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'status',
                                    id:'statusid',
                                    ref:'../status',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'currency',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'currency',
                                    id:'currencyid',
                                    ref:'../currency',
                                    maxLength: 20,
                                    //allowBlank: 1,
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
                            //allowBlank: 1
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'rate',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'rate',
                                    id:'rateid',
                                    ref:'../rate',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'datefield',
                            ref:'../doc_date',
                            fieldLabel: 'doc_date',
                            name:'doc_date',
                            id:'doc_dateid',
                            format: 'd M Y',
                            //allowBlank: 1,
                            anchor: '100%'                            
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'doc_ref',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'doc_ref',
                                    id:'doc_refid',
                                    ref:'../doc_ref',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'customer_id',
                            store: jun.rztCustomers,
                            hiddenName:'customer_id',
                            hiddenValue:'customer_id',
                            valueField: 'id',
                            //displayField: 'Customers::model()->representingColumn()',
                            displayField: 'name',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'datefield',
                            ref:'../trans_date',
                            fieldLabel: 'trans_date',
                            name:'trans_date',
                            id:'trans_dateid',
                            format: 'd M Y',
                            //allowBlank: 1,
                            anchor: '100%'                            
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'total_1',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'total_1',
                                    id:'total_1id',
                                    ref:'../total_1',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'disc',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'disc',
                                    id:'discid',
                                    ref:'../disc',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'total_2',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'total_2',
                                    id:'total_2id',
                                    ref:'../total_2',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }
                                                   
                  ]
            },new jun.NotaDtlGrid()];
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
        jun.NotaWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'index.php/user/Nota/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'index.php/user/Nota/create/';
                }
             
            Ext.getCmp('form-Nota').getForm().submit({
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
                    jun.rztNota.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-Nota').getForm().reset();
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