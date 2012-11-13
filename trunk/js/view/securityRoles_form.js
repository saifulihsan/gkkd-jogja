jun.SecurityRolesWin = Ext.extend(Ext.Window, {
    title:'Hak Akses',
    modez:1,
    width:400,
    height:500,
    layout:'form',
    modal:true,
    padding:3,
    closeForm:false,
    iswin:true,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-SecurityRoles',
                labelWidth:100,
                labelAlign:'left',
                layout:'accordion',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
                    {
                        xtype:'panel',
                        title:'Deskripsi',
                        layout:'form',
//                        padding:5,
                        bodyStyle:'background-color: #E4E4E4; padding: 10px',
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel:'Nama',
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
                                fieldLabel:'Deskripsi',
                                hideLabel:false,
                                //hidden:true,
                                name:'description',
                                id:'descriptionid',
                                ref:'../description',
                                maxLength:50,
                                //allowBlank: 1,
                                anchor:'100%'
                            }
                        ]
                    },
                    {
                        xtype:'panel',
                        title:'Pondok Asuh Harapan',
                        layout:'form',
                        bodyStyle:'background-color: #E4E4E4; padding: 10px',
                        defaultType: 'checkbox',
                        items:[
                            {
                                fieldLabel: 'Master',
                                labelSeparator: '',
                                boxLabel: 'Kode Rekening (Grid)',
                                name: 'fav-animal-cat'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Kode Rekening (Add)',
                                name: 'kodeadd'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Kode Rekening (Edit)',
                                name: 'kodeedit'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Kas dan Bank (Grid)',
                                name: 'kas'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Kas dan Bank (Add)',
                                name: 'kasadd'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Kas dan Bank (Edit)',
                                name: 'kasedit'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Anak (Grid)',
                                name: 'anak'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Anak (Add)',
                                name: 'anakadd'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Anak (Edit)',
                                name: 'anakedit'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Grup Anak',
                                name: 'grup'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Pemasok',
                                name: 'pemasok'
                            },
                            {
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: 'Sub Aktivitas',
                                name: 'sub'
                            },
                        ]
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
            urlz = 'general/SecurityRoles/update/id/' + this.id;
        } else {
            urlz = 'general/SecurityRoles/create/';
        }
        Ext.getCmp('form-SecurityRoles').getForm().submit({
            url:urlz,
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