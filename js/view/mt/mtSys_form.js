jun.MtSysWin = Ext.extend(Ext.Window, {
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
                id:'form-MtSys',
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
        jun.MtSysWin.superclass.initComponent.call(this);
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
            urlz = 'Mahkotrans/MtSys/update/id/' + this.id;
        } else {
            urlz = 'Mahkotrans/MtSys/create/';
        }
        Ext.getCmp('form-MtSys').getForm().submit({
            url:urlz,
            timeOut:1000,

            scope:this,
            success:function (f, a) {
                jun.rztMtSys.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-MtSys').getForm().reset();
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