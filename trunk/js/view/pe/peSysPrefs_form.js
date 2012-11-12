jun.PeSysPrefsWin = Ext.extend(Ext.Window, {
    title:'Setting',
    modez:1,
    width:400,
    height:200,
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
                id:'form-PeSysPrefs',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama',
                        hideLabel:false,
                        //hidden:true,
                        name:'name',
                        id:'nameid',
                        ref:'../nama',
                        anchor:'100%'
                        //allowBlank: 1
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nilai',
                        hideLabel:false,
                        //hidden:true,
                        name:'value',
                        id:'valueid',
                        ref:'../value',
                        anchor:'100%'
                        //allowBlank: 1
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
        jun.PeSysPrefsWin.superclass.initComponent.call(this);
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
            urlz = 'PondokEfata/PeSysPrefs/update/id/' + this.id;
        } else {
            urlz = 'PondokEfata/PeSysPrefs/create/';
        }
        Ext.getCmp('form-PeSysPrefs').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPeSysPrefs.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PeSysPrefs').getForm().reset();
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