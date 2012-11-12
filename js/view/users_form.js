Ext.apply(Ext.form.VTypes, {
    password:function (val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    passwordText:'Passwords do not match'
});
jun.UsersWin = Ext.extend(Ext.Window, {
    title:'Users',
    iconCls:'asp-user2',
    modez:1,
    width:425,
    height:250,
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
                id:'form-Users',
                labelWidth:125,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Nama Jemaat',
                        store:jun.rztJemaat,
                        hiddenName:'nij',
                        hiddenValue:'nij',
                        valueField:'nij',
                        forceSelection:true,
                        displayField:'real_name',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'User Id',
                        hideLabel:false,
                        //hidden:true,
                        name:'user_id',
                        id:'user_idid',
                        ref:'../user_id',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Password',
                        hideLabel:false,
                        //hidden:true,
                        name:'password',
                        id:'passwordid',
                        ref:'../password',
                        maxLength:100,
                        //allowBlank: ,
                        anchor:'100%',
                        inputType:'password'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Confirm Password',
                        hideLabel:false,
                        //hidden:true,
                        name:'password-cfrm',
                        id:'password-cfrmid',
                        ref:'../password-cfrm',
                        maxLength:100,
                        anchor:'100%',
                        inputType:'password',
                        vtype:'password',
                        initialPassField:'passwordid' // id of the initial password field
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
                        width:100,
                        height:20,
                        ref:'../cmbActive',
                        id:'statusid',
                    }),
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Rule',
                        store:jun.rztSecurityRoles,
                        hiddenName:'security_roles_id',
                        hiddenValue:'security_roles_id',
                        valueField:'id',
                        forceSelection:true,
                        displayField:'role',
                        //allowBlank:false,
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
        jun.rztJemaat.reload();
        jun.rztSecurityRoles.reload();
        jun.UsersWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    btnDisabled:function (status) {
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
            urlz = 'general/Users/update/id/' + this.id;
        } else {
            urlz = 'general/Users/create/';
        }
        Ext.getCmp('form-Users').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztUsers.reload();
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
                    Ext.getCmp('form-Users').getForm().reset();
                }
                this.btnDisabled(false);
            },
            failure:function (f, a) {
                if (a.failureType == "client")
                    return;
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
jun.PasswordWin = Ext.extend(Ext.Window, {
    title:'Ganti Password',
    iconCls:'asp-access',
    modez:1,
    width:425,
    height:170,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-Password',
                labelWidth:150,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Password Lama',
                        hideLabel:false,
                        //hidden:true,
                        name:'passwordold',
                        id:'passwordoldid',
                        ref:'../passwordold',
                        maxLength:100,
                        allowBlank:false,
                        anchor:'100%',
                        inputType:'password'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Password Baru',
                        hideLabel:false,
                        //hidden:true,
                        name:'password',
                        id:'passwordid',
                        ref:'../password',
                        maxLength:100,
                        allowBlank:false,
                        anchor:'100%',
                        inputType:'password'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Konfirmasi Password Baru',
                        hideLabel:false,
                        //hidden:true,
                        name:'password-cfrm',
                        id:'password-cfrmid',
                        ref:'../password-cfrm',
                        maxLength:100,
                        anchor:'100%',
                        inputType:'password',
                        vtype:'password',
                        initialPassField:'passwordid' // id of the initial password field
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
                    text:'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.rztJemaat.reload();
        jun.rztSecurityRoles.reload();
        jun.PasswordWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    btnDisabled:function (status) {
        this.btnSave.setDisabled(status);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(true);
        Ext.getCmp('form-Password').getForm().submit({
            url:'general/users/UpdatePass',
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                this.close();
            },
            failure:function (f, a) {
                if (a.failureType == "client")
                    return;
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