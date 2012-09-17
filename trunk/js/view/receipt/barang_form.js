jun.BarangWin = Ext.extend(Ext.Window, {
    title:'Barang',
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
                id:'form-Barang',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'ref',
                        hideLabel:false,
                        //hidden:true,
                        name:'ref',
                        id:'refid',
                        ref:'../ref',
                        maxLength:10,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'desc',
                        hideLabel:false,
                        //hidden:true,
                        name:'desc',
                        id:'descid',
                        ref:'../desc',
                        anchor:'100%'
                        //allowBlank: 1
                    },
                    {
                        xtype:'numberfield',
                        fieldLabel:'harga',
                        hideLabel:false,
                        //hidden:true,
                        name:'harga',
                        id:'hargaid',
                        ref:'../harga',
                        maxLength:100,
                        decimalSeparator:'.',
                        decimalPrecision:2,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'checkbox',
                        fieldLabel:'inactive',
                        hideLabel:false,
                        //hidden:true,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
                        maxLength:1,
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
        jun.BarangWin.superclass.initComponent.call(this);
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

            urlz = 'user/Barang/update/id/' + this.id;

        } else {

            urlz = 'user/Barang/create/';
        }

        Ext.getCmp('form-Barang').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
            waitMsg:'Sedang Proses',
            scope:this,

            success:function (f, a) {
                jun.rztBarang.reload();

                var response = Ext.decode(a.response.responseText);

                if (this.closeForm) {

                    this.close();

                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-Barang').getForm().reset();
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