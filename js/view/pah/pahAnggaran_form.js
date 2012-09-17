jun.PahAnggaranWin = Ext.extend(Ext.Window, {
    title:'Anggaran',
    modez:1,
    width:621,
    height:455,
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
                id:'form-PahAnggaran',
                layout:'absolute',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
//                    {
//                    xtype:'label',
//                    text:'Referensi:',
//                    x:5,
//                    y:5
//                    },
//                    {
//                        xtype:'textfield',
//                        //fieldLabel:'Doc. Ref',
//                        x:65,
//                        y:2,
//                        height:20,
//                        width:100,
//                        hideLabel:false,
//                        //hidden:true,
//                        name:'doc_ref',
//                        id:'doc_refid',
//                        ref:'../doc_ref',
//                        maxLength:15,
//                        //allowBlank: 1,
//                        //anchor:'100%',
//                        readOnly:true,
//                    },
                    {
                        xtype:'label',
                        text:'Periode Bulan:',
                        x:5,
                        y:5
                    },
                    new jun.comboBulan({
                        x:85,
                        y:2,
                        width:100,
                        height:20,
                        //fieldLabel:'Periode Bulan',
                        //hideLabel:false,
                        //anchor:'100%'
                    }),
                    {
                        xtype:'label',
                        text:'Periode Tahun:',
                        x:195,
                        y:5
                    },
                    {
                        xtype:'spinnerfield',
                        fieldLabel:'periode_tahun',
                        hideLabel:false,
                        //hidden:true,
                        name:'periode_tahun',
                        id:'periode_tahunid',
                        ref:'../periode_tahun',
                        maxLength:4,
                        minValue: 2000,
                        maxValue: 3000,
                        defaultValue: 2012,
                        x:275,
                        y:2,
                        width:100
                        //incrementValue: 1,
                        //anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Tanggal Entry:',
                        x:385,
                        y:5
                    },
                    {
                        xtype:'datefield',
                        ref:'../trans_date',
                        fieldLabel:'trans_date',
                        name:'trans_date',
                        id:'trans_dateid',
                        format:'d M Y',
                        x:465,
                        y:2,
                      //  width:100
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Saldo Kas Awal Bulan (Sisa anggaran bulan lalu):',
                        x:5,
                        y:35
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:32,
                        //width:200,
                        name:'saldoawal',
                        id:'saldoawalid',
                        ref:'../saldoawal',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Penerimaan Kas Bulan Ini:',
                        x:5,
                        y:65
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:62,
                        //width:200,
                        name:'kasmasuk',
                        id:'kasmasukid',
                        ref:'../kasmasuk',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Total Anggaran untuk Dialokasikan:',
                        x:5,
                        y:95
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:92,
                        //width:200,
                        name:'totalang',
                        id:'totalangid',
                        ref:'../totalang',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Total Anggaran Sudah Dialokasikan:',
                        x:5,
                        y:330
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:327,
                        //width:200,
                        name:'totalangsud',
                        id:'totalangsudid',
                        ref:'../totalangsud',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Total Anggaran Belum Dialokasikan:',
                        x:5,
                        y:360
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:357,
                        //width:200,
                        name:'totalangblm',
                        id:'totalangblmid',
                        ref:'../totalangblm',
                        readOnly:true,
                        anchor:'100%'
                    },
                    new jun.PahAnggaranDetilGrid({
                        x:5,
                        y:122,
                        height: 200,
                        frameHeader:false,
                        header:false,
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
        jun.PahAnggaranWin.superclass.initComponent.call(this);
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

            urlz = 'PondokHarapan/PahAnggaran/update/id/' + this.id;

        } else {

            urlz = 'PondokHarapan/PahAnggaran/create/';
        }

        Ext.getCmp('form-PahAnggaran').getForm().submit({
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
                jun.rztPahAnggaran.reload();

                var response = Ext.decode(a.response.responseText);

                if (this.closeForm) {

                    this.close();

                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahAnggaran').getForm().reset();
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