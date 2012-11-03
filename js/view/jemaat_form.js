jun.JemaatWin = Ext.extend(Ext.Window, {
    title:'Data Jemaat',
    iconCls: 'asp-user3',
    modez:1,
    width:400,
    height:280,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-Jemaat',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nomor Induk',
                        hideLabel:false,
                        //hidden:true,
                        name:'nij',
                        id:'nijid',
                        ref:'../nij',
                        maxLength:100,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama lengkap',
                        hideLabel:false,
                        //hidden:true,
                        name:'real_name',
                        id:'real_nameid',
                        ref:'../real_name',
                        maxLength:100,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Phone',
                        hideLabel:false,
                        //hidden:true,
                        name:'phone',
                        id:'phoneid',
                        ref:'../phone',
                        maxLength:30,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'E-mail',
                        hideLabel:false,
                        //hidden:true,
                        name:'email',
                        id:'emailid',
                        ref:'../email',
                        maxLength:100,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Alamat',
                        hideLabel:false,
                        //hidden:true,
                        name:'alamat',
                        id:'alamatid',
                        ref:'../alamat',
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
                        width:100,
                        height:20,
                        ref:'../cmbActive',
                        id:'statusid',
                    }),
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
        jun.JemaatWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'general/Jemaat/update/id/' + this.id;
        } else {
            urlz = 'general/Jemaat/create/';
        }
        Ext.getCmp('form-Jemaat').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztJemaat.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.closeForm) {
                    this.close();
                }
                if (this.modez == 0) {
                    Ext.getCmp('form-Jemaat').getForm().reset();
                }
                this.btnDisabled(false);
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
                //                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
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