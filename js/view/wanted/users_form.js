jun.UsersWin = Ext.extend(Ext.Window, {
    title: 'Users',
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
                id:'form-Users',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'user_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'user_id',
                                    id:'user_idid',
                                    ref:'../user_id',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'password',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'password',
                                    id:'passwordid',
                                    ref:'../password',
                                    maxLength: 100,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'real_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'real_name',
                                    id:'real_nameid',
                                    ref:'../real_name',
                                    maxLength: 100,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'role_id',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'role_id',
                                    id:'role_idid',
                                    ref:'../role_id',
                                    maxLength: 11,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'phone',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'phone',
                                    id:'phoneid',
                                    ref:'../phone',
                                    maxLength: 30,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'email',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'email',
                                    id:'emailid',
                                    ref:'../email',
                                    maxLength: 100,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'language',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'language',
                                    id:'languageid',
                                    ref:'../language',
                                    maxLength: 20,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'date_format',
                            hideLabel:false,
                            //hidden:true,
                            name:'date_format',
                            id:'date_formatid',
                            ref:'../date_format',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'date_sep',
                            hideLabel:false,
                            //hidden:true,
                            name:'date_sep',
                            id:'date_sepid',
                            ref:'../date_sep',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'tho_sep',
                            hideLabel:false,
                            //hidden:true,
                            name:'tho_sep',
                            id:'tho_sepid',
                            ref:'../tho_sep',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'dec_sep',
                            hideLabel:false,
                            //hidden:true,
                            name:'dec_sep',
                            id:'dec_sepid',
                            ref:'../dec_sep',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'theme',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'theme',
                                    id:'themeid',
                                    ref:'../theme',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'page_size',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'page_size',
                                    id:'page_sizeid',
                                    ref:'../page_size',
                                    maxLength: 20,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'prices_dec',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'prices_dec',
                                    id:'prices_decid',
                                    ref:'../prices_dec',
                                    maxLength: 6,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'qty_dec',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'qty_dec',
                                    id:'qty_decid',
                                    ref:'../qty_dec',
                                    maxLength: 6,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'rates_dec',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'rates_dec',
                                    id:'rates_decid',
                                    ref:'../rates_dec',
                                    maxLength: 6,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'percent_dec',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'percent_dec',
                                    id:'percent_decid',
                                    ref:'../percent_dec',
                                    maxLength: 6,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'show_gl',
                            hideLabel:false,
                            //hidden:true,
                            name:'show_gl',
                            id:'show_glid',
                            ref:'../show_gl',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'show_codes',
                            hideLabel:false,
                            //hidden:true,
                            name:'show_codes',
                            id:'show_codesid',
                            ref:'../show_codes',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'show_hints',
                            hideLabel:false,
                            //hidden:true,
                            name:'show_hints',
                            id:'show_hintsid',
                            ref:'../show_hints',
                            //allowBlank: ,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'datefield',
                            ref:'../last_visit_date',
                            fieldLabel: 'last_visit_date',
                            name:'last_visit_date',
                            id:'last_visit_dateid',
                            format: 'd M Y',
                            //allowBlank: 1,
                            anchor: '100%'                            
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'query_size',
                            hideLabel:false,
                            //hidden:true,
                            name:'query_size',
                            id:'query_sizeid',
                            ref:'../query_size',
                            //allowBlank: 1,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'graphic_links',
                            hideLabel:false,
                            //hidden:true,
                            name:'graphic_links',
                            id:'graphic_linksid',
                            ref:'../graphic_links',
                            //allowBlank: 1,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'pos',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'pos',
                                    id:'posid',
                                    ref:'../pos',
                                    maxLength: 6,
                                    //allowBlank: 1,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'print_profile',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'print_profile',
                                    id:'print_profileid',
                                    ref:'../print_profile',
                                    maxLength: 30,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'rep_popup',
                            hideLabel:false,
                            //hidden:true,
                            name:'rep_popup',
                            id:'rep_popupid',
                            ref:'../rep_popup',
                            //allowBlank: 1,
                            anchor: '100%'
                        }, 
                                                                     {
                            xtype: 'textfield',
                            fieldLabel: 'sticky_doc_date',
                            hideLabel:false,
                            //hidden:true,
                            name:'sticky_doc_date',
                            id:'sticky_doc_dateid',
                            ref:'../sticky_doc_date',
                            //allowBlank: 1,
                            anchor: '100%'
                        }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'startup_tab',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'startup_tab',
                                    id:'startup_tabid',
                                    ref:'../startup_tab',
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
        jun.UsersWin.superclass.initComponent.call(this);
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
                    
                    urlz= 'Wanted/Users/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Wanted/Users/create/';
                }
             
            Ext.getCmp('form-Users').getForm().submit({
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
                    jun.rztUsers.reload();
                    
                    var response = Ext.decode(a.response.responseText);
         
                    if(this.closeForm){
                    
                        this.close();
                    
                    }else{
                        if(response.data != undefined){
                            Ext.MessageBox.alert("Pelayanan",response.data.msg);
                        }
                        if(this.modez == 0){
                            Ext.getCmp('form-Users').getForm().reset();
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