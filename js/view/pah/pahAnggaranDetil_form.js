jun.PahAnggaranDetilWin = Ext.extend(Ext.Window, {
    title: 'PahAnggaranDetil',
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
                id:'form-PahAnggaranDetil',
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
                            fieldLabel: 'pah_anggaran_id',
                            store: jun.rztPahAnggaran,
                            hiddenName:'pah_anggaran_id',
                            hiddenValue:'pah_anggaran_id',
                            valueField: 'id',
                            //displayField: 'PahAnggaran::model()->representingColumn()',
                            displayField: 'doc_ref',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'kode_rekening',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'kode_rekening',
                                    id:'kode_rekeningid',
                                    ref:'../kode_rekening',
                                    maxLength: 15,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'amount',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'amount',
                                    id:'amountid',
                                    ref:'../amount',
                                    maxLength: 20,
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
        jun.PahAnggaranDetilWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'PondokHarapan/PahAnggaranDetil/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'PondokHarapan/PahAnggaranDetil/create/';
                }
             
            Ext.getCmp('form-PahAnggaranDetil').getForm().submit({
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
                    jun.rztPahAnggaranDetil.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-PahAnggaranDetil').getForm().reset();
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