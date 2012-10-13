jun.SecurityRolesWin = Ext.extend(Ext.Window, {
    title:'SecurityRoles',
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
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-SecurityRoles',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'role',
                        hideLabel:false,
                        //hidden:true,
                        name:'role',
                        id:'roleid',
                        ref:'../role',
                        maxLength:30,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'description',
                        hideLabel:false,
                        //hidden:true,
                        name:'description',
                        id:'descriptionid',
                        ref:'../description',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'sections',
                        hideLabel:false,
                        //hidden:true,
                        name:'sections',
                        id:'sectionsid',
                        ref:'../sections',
                        anchor:'100%'
                        //allowBlank: 1
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'areas',
                        hideLabel:false,
                        //hidden:true,
                        name:'areas',
                        id:'areasid',
                        ref:'../areas',
                        anchor:'100%'
                        //allowBlank: 1
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'inactive',
                        hideLabel:false,
                        //hidden:true,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
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
        jun.SecurityRolesWin.superclass.initComponent.call(this);
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
            urlz = 'general/SecurityRoles/update/id/' + this.id;
        } else {
            urlz = 'general/SecurityRoles/create/';
        }
        Ext.getCmp('form-SecurityRoles').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,

            scope:this,
            success:function (f, a) {
                jun.rztSecurityRoles.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-SecurityRoles').getForm().reset();
                    }
                }
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
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