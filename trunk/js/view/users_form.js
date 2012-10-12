Ext.apply(Ext.form.VTypes, {

    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText : 'Passwords do not match'
});

jun.UsersWin = Ext.extend(Ext.Window, {
    title:'Users',
    iconCls: 'asp-user2',
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
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
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
                        //displayField: 'Jemaat::model()->representingColumn()',
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
                        inputType: 'password'
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
                        inputType: 'password',
                        vtype: 'password',
                        initialPassField: 'passwordid' // id of the initial password field
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../last_visit_date',
                        fieldLabel:'last_visit_date',
                        name:'last_visit_date',
                        id:'last_visit_dateid',
                        //  format: 'Y-mm-dd',
                        hidden:true,
                        value:new Date(),
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
                        width:100,
                        height:20,
                        ref:'../cmbActive',
                        id:'statusid',
                        value:1,
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
                        //displayField: 'SecurityRoles::model()->representingColumn()',
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
        jun.UsersWin.superclass.initComponent.call(this);
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
            urlz = 'general/Users/update/id/' + this.id;
        } else {
            urlz = 'general/Users/create/';
        }
        Ext.getCmp('form-Users').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
//            waitMsg:'Sedang Proses',
            scope:this,
            success:function (f, a) {
                jun.rztUsers.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-Users').getForm().reset();
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