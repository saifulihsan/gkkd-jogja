jun.PeGlTransWin = Ext.extend(Ext.Window, {
    title:'PeGlTrans',
    modez:1,
    width:400,
    height:300,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeGlTrans',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'type',
                        hideLabel:false,
                        //hidden:true,
                        name:'type',
                        id:'typeid',
                        ref:'../type',
                        maxLength:6,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'type_no',
                        hideLabel:false,
                        //hidden:true,
                        name:'type_no',
                        id:'type_noid',
                        ref:'../type_no',
                        maxLength:11,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'datefield',
                        ref:'../tran_date',
                        fieldLabel:'tran_date',
                        name:'tran_date',
                        id:'tran_dateid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'account',
                        store:jun.rztPeChartMaster,
                        hiddenName:'account',
                        hiddenValue:'account',
                        valueField:'account_code',
                        //displayField: 'PeChartMaster::model()->representingColumn()',
                        displayField:'account_code2',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'memo_',
                        hideLabel:false,
                        //hidden:true,
                        name:'memo_',
                        id:'memo_id',
                        ref:'../memo_',
                        anchor:'100%'
                        //allowBlank:
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'amount',
                        hideLabel:false,
                        //hidden:true,
                        name:'amount',
                        id:'amountid',
                        ref:'../amount',
                        maxLength:30,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'users_id',
                        hideLabel:false,
                        //hidden:true,
                        name:'users_id',
                        id:'users_idid',
                        ref:'../users_id',
                        maxLength:6,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Simpan',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Simpan & Tutup',
                    ref:'../btnSaveClose'
                },
                {
                    xtype:'button',
                    text:'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.PeGlTransWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokEfata/PeGlTrans/update/id/' + this.id;
        } else {
            urlz = 'PondokEfata/PeGlTrans/create/';
        }
        Ext.getCmp('form-PeGlTrans').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPeGlTrans.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PeGlTrans').getForm().reset();
                }
                if (this.closeForm) {
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
            }

        });
    },
    onbtnSaveCloseClick:function () {
        this.closeForm = true;
        this.saveForm(true);
    },
    onbtnSaveclick:function () {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick:function () {
        this.close();
    }

});