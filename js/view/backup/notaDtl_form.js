jun.NotaDtlWin = Ext.extend(Ext.Window, {
    title: 'NotaDtl',
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
                id:'form-NotaDtl',
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
                            fieldLabel: 'nota_id',
                            store: jun.rztNota,
                            hiddenName:'nota_id',
                            hiddenValue:'nota_id',
                            valueField: 'id',
                            //displayField: 'Nota::model()->representingColumn()',
                            displayField: 'term',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'barang_id',
                            store: jun.rztBarang,
                            hiddenName:'barang_id',
                            hiddenValue:'barang_id',
                            valueField: 'id',
                            //displayField: 'Barang::model()->representingColumn()',
                            displayField: 'ref',
                            //allowBlank:false,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'jml',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'jml',
                                    id:'jmlid',
                                    ref:'../jml',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'harga_satuan',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'harga_satuan',
                                    id:'harga_satuanid',
                                    ref:'../harga_satuan',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'total_harga_1',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'total_harga_1',
                                    id:'total_harga_1id',
                                    ref:'../total_harga_1',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'disc_per',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'disc_per',
                                    id:'disc_perid',
                                    ref:'../disc_per',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'disc_rp',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'disc_rp',
                                    id:'disc_rpid',
                                    ref:'../disc_rp',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'total_harga_2',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'total_harga_2',
                                    id:'total_harga_2id',
                                    ref:'../total_harga_2',
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
        jun.NotaDtlWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'index.php/user/NotaDtl/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'index.php/user/NotaDtl/create/';
                }
             
            Ext.getCmp('form-NotaDtl').getForm().submit({
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
                    jun.rztNotaDtl.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-NotaDtl').getForm().reset();
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