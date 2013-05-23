jun.MtChartMasterWin = Ext.extend(Ext.Window, {
    title: 'MtChartMaster',
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
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id:'form-MtChartMaster',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'account_code2',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'account_code2',
                                    id:'account_code2id',
                                    ref:'../account_code2',
                                    maxLength: 15,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                                    xtype: 'textfield',
                                    fieldLabel: 'account_name',
                                    hideLabel:false,
                                    //hidden:true,
                                    name:'account_name',
                                    id:'account_nameid',
                                    ref:'../account_name',
                                    maxLength: 60,
                                    //allowBlank: ,
                                    anchor: '100%'
                                }, 
                                                                     {
                            xtype: 'combo',
                            typeAhead: true,
                            triggerAction: 'all',
                            lazyRender:true,
                            mode: 'local',                            
                            fieldLabel: 'account_type',
                            store: jun.rztMtChartTypes,
                            hiddenName:'account_type',
                            hiddenValue:'account_type',
                            valueField: 'id',
                            //displayField: 'MtChartTypes::model()->representingColumn()',
                            displayField: 'name',
                            //allowBlank:false,
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
                                    maxLength: 1,
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
                            anchor: '100%'
                            //allowBlank: 1
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
        jun.MtChartMasterWin.superclass.initComponent.call(this);
//        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        if (this.modez == 1 || this.modez == 2) {
            this.btnSave.setVisible(false);
        } else {
            this.btnSave.setVisible(true);
        }
    },

    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
            
    saveForm : function()
    {
        this.btnDisabled(true);
            var urlz;
            if(this.modez == 1 || this.modez== 2) {
                    
                    urlz= 'Mahkotrans/MtChartMaster/update/id/' + this.id;
                    
                } else {
                    
                    urlz= 'Mahkotrans/MtChartMaster/create/';
                }
             
            Ext.getCmp('form-MtChartMaster').getForm().submit({
                url:urlz,
                timeOut: 1000,
                scope: this,
                success: function(f,a){
                    jun.rztMtChartMaster.reload();
                    var response = Ext.decode(a.response.responseText);
                    Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                    });
                    if(this.modez == 0){
                        Ext.getCmp('form-MtChartMaster').getForm().reset();
                        this.btnDisabled(false);
                    }
                    if(this.closeForm){
                        this.close();
                    }
                },
                failure:function (f, a) {
                    var response = Ext.decode(a.response.responseText);
                    Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                    });
                    this.btnDisabled(false);
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