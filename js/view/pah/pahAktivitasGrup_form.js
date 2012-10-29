jun.PahAktivitasGrupWin = Ext.extend(Ext.Window, {
    title:'Grup Anak',
    modez:1,
    width:400,
    height:190,
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
                id:'form-PahAktivitasGrup',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Grup',
                        hideLabel:false,
                        //hidden:true,
                        name:'name',
                        id:'nameid',
                        ref:'../name',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Keterangan',
                        hideLabel:false,
                        //hidden:true,
                        name:'notes',
                        id:'notesid',
                        ref:'../notes',
                        anchor:'100%',
                        height:'50px'
                        //allowBlank: 1
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
                    })
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
        jun.PahAktivitasGrupWin.superclass.initComponent.call(this);
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
            urlz = 'PondokHarapan/PahAktivitasGrup/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahAktivitasGrup/create/';
        }
        Ext.getCmp('form-PahAktivitasGrup').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPahAktivitasGrup.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PahAktivitasGrup').getForm().reset();
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