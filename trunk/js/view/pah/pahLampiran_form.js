jun.PahLampiranWin = Ext.extend(Ext.Window, {
    title:'Donasi Non Tunai',
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
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PahLampiran',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Donatur',
                        hideLabel:false,
                        //hidden:true,
                        name:'nama',
                        id:'namaid',
                        ref:'../nama',
                        maxLength:100,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date',
                        fieldLabel:'Tanggal Transaksi',
                        name:'trans_date',
                        id:'trans_dateid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Keterangan',
                        hideLabel:false,
                        //hidden:true,
                        name:'keterangan',
                        id:'keteranganid',
                        ref:'../keterangan',
                        height:'75px',
                        anchor:'100%'
                        //allowBlank: 1
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Satuan',
                        hideLabel:false,
                        //hidden:true,
                        name:'satuan',
                        id:'satuanid',
                        ref:'../satuan',
                        maxLength:45,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'numericfield',
                        fieldLabel:'Jumlah',
                        hideLabel:false,
                        //hidden:true,
                        name:'qty',
                        id:'qtyid',
                        ref:'../qty',
                        //maxLength: 30,
                        //allowBlank: 1,
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
        jun.PahLampiranWin.superclass.initComponent.call(this);
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
            urlz = 'PondokHarapan/PahLampiran/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahLampiran/create/';
        }
        Ext.getCmp('form-PahLampiran').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPahLampiran.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PahLampiran').getForm().reset();
                    this.btnDisabled(false);
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