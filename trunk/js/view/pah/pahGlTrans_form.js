jun.PahGlTransWin = Ext.extend(Ext.Window, {
    title: 'PahGlTrans',
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
                id:'form-PahGlTrans',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'type',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'type',
                                    id:'typeid',
                                    ref:'../type',
                                    maxLength: 6,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'type_no',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'type_no',
                                    id:'type_noid',
                                    ref:'../type_no',
                                    maxLength: 11,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'datefield',
                            ref:'../tran_date',
                            fieldLabel: 'tran_date',
                            name:'tran_date',
                            id:'tran_dateid',
                            format: 'd M Y',
                            //allowBlank: 1,
                            anchor: '100%'                            
                        }, 
                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'account',
                            store: jun.rztPahChartMaster,
                            hiddenName:'account',
                            hiddenValue:'account',
                            valueField: 'account_code',
                            //displayField: 'PahChartMaster::model()->representingColumn()',
                            displayField: 'account_code2',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'memo_',
                            hideLabel:false,
                            //hidden:true,
                            name:'memo_',
                            id:'memo_id',
                            ref:'../memo_',
                            anchor: '100%'
                            //allowBlank: 
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'amount',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'amount',
                                    id:'amountid',
                                    ref:'../amount',
                                    maxLength: 30,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'person_type_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'person_type_id',
                                    id:'person_type_idid',
                                    ref:'../person_type_id',
                                    maxLength: 11,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'person_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'person_id',
                                    id:'person_idid',
                                    ref:'../person_id',
                                    maxLength: 30 ,
                                    //allowBlank: 1,
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
        jun.PahGlTransWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'PondokHarapan/PahGlTrans/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'PondokHarapan/PahGlTrans/create/';
                }
             
            Ext.getCmp('form-PahGlTrans').getForm().submit({
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
                    jun.rztPahGlTrans.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-PahGlTrans').getForm().reset();
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