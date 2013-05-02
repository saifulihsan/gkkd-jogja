jun.MtSuppliersWin = Ext.extend(Ext.Window, {
    title:'Pemasok',
    iconCls:'silk13-package',
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
                id:'form-MtSuppliers',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Pemasok',
                        hideLabel:false,
                        //hidden:true,
                        name:'supp_name',
                        id:'supp_nameid',
                        ref:'../supp_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Ref. Pemasok',
                        hideLabel:false,
                        //hidden:true,
                        name:'supp_ref',
                        id:'supp_refid',
                        ref:'../supp_ref',
                        maxLength:30,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'E-Mail',
                        hideLabel:false,
                        //hidden:true,
                        name:'mail_address',
                        id:'mail_addressid',
                        ref:'../mail_address',
                        anchor:'100%'
                        //allowBlank:
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Alamat',
                        hideLabel:false,
                        //hidden:true,
                        name:'address',
                        id:'addressid',
                        ref:'../address',
                        anchor:'100%',
                        height:50
                        //allowBlank:
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
                        width:100,
                        height:20,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
                        hiddenName:'inactive',
                        hiddenValue:'inactive',
                    }),
                    {
                        xtype:'textarea',
                        fieldLabel:'Keterangan',
                        hideLabel:false,
                        //hidden:true,
                        name:'notes',
                        id:'notesid',
                        ref:'../notes',
                        anchor:'100%',
                        height:50
                        //allowBlank:
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
        jun.MtSuppliersWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        if (this.modez == 1 || this.modez == 2) {            
            this.btnSave.setVisible(false);
        } else {            
            this.btnSave.setVisible(true);
        }
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
            urlz = 'Mahkotrans/MtSuppliers/update/id/' + this.id;
        } else {
            urlz = 'Mahkotrans/MtSuppliers/create/';
        }
        Ext.getCmp('form-MtSuppliers').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztMtSuppliers.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-MtSuppliers').getForm().reset();
                    }
                }
                this.btnDisabled(false);
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
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