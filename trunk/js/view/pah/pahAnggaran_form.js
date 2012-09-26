checkPeriodeAnggaran = function (){
    //console.info('Bulan ' + this.cmbBulan.value + 'Tahun ' + this.periode_tahun.defaultValue);
    Ext.Ajax.request({
        waitMsg:'Sedang Proses',
        url:'PondokHarapan/PahAnggaran/IsPeriodeExist/',
        params:{
            bulan:Ext.getCmp('periode_bulanid').getValue(),
            tahun:Ext.get('periode_tahunid').getValue(),
        },
        method:'POST',

        success:function (f, a) {
            var response = Ext.decode(f.responseText);
            if (response.success == false) {
                Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                });
            }
        },
        failure:function (f, a) {
            Ext.MessageBox.alert("Error", "Can't Communicate With The Server");

        }
    });
}

//var proxy = new Ext.data.HttpProxy({ url: "search-ajax.aspx" });

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
                    {
                        xtype:'label',
                        text:'Ref. Dokumen:',
                        x:5,
                        y:5
                    },
                    {
                        xtype:'textfield',
                        //fieldLabel:'Doc. Ref',
                        x:85,
                        y:2,
                        height:20,
                        width:100,
                        hideLabel:false,
                        //hidden:true,
                        name:'doc_ref',
                        id:'doc_refid',
                        ref:'../doc_ref',
                        maxLength:15,
                        //allowBlank: 1,
                        //anchor:'100%',
                        readOnly:true,
                    },
                    {
                        xtype:'label',
                        text:'Periode Bulan:',
                        x:195,
                        y:5
                    },
                    new jun.comboBulan({
                        x:275,
                        y:2,
                        width:100,
                        height:20,
                        ref:'../cmbBulan',
                        id:'periode_bulanid',

                    }),
                    {
                        xtype:'label',
                        text:'Periode Tahun:',
                        x:385,
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
                        minValue:2000,
                        maxValue:3000,
                        defaultValue:2012,
                        x:465,
                        y:2,
                        width:100,
                        onBlur:checkPeriodeAnggaran,
                        //incrementValue: 1,
                        //anchor:'100%'
                    },
//                    {
//                        xtype:'label',
//                        text:'Tanggal Entry:',
//                        x:385,
//                        y:5
//                    },
//                    {
//                        xtype:'datefield',
//                        ref:'../trans_date',
//                        fieldLabel:'trans_date',
//                        name:'trans_date',
//                        id:'trans_dateid',
//                        format:'d M Y',
//                        x:465,
//                        y:2,
//                      //  width:100
//                        //allowBlank: 1,
//                        anchor:'100%'
//                    },
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
                        height:200,
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
        this.cmbBulan.on('select', this.oncmbBulanchange, this);
        this.periode_tahun.on('spin', this.onperiodetahunchange, this);
        jun.rztPahAnggaranDetil.removeAll();
        jun.rztPahChartMaster.reload();
        if (this.modez == 1 || this.modez == 2) {
            jun.rztPahAnggaranDetil.proxy = new Ext.data.HttpProxy({ url: 'PondokHarapan/PahAnggaranDetil/index/id/' +this.id+ '/?output=json' });
            jun.rztPahAnggaranDetil.load();
        }
        var dt = new Date();
        this.periode_tahun.setValue(dt.format('Y'));
        this.cmbBulan.setValue(dt.format('n'));
    },



    onperiodetahunchange:function () {
        this.periode_tahun.focus();
    },

    oncmbBulanchange:function () {
        checkPeriodeAnggaran();
    },

    onActivate:function () {
        this.btnSave.hidden = false;
    },

    saveForm:function () {
        var urlz;

        if (this.modez == 1 || this.modez == 2) {

            urlz = 'PondokHarapan/PahAnggaran/update/id/' + this.id;

        } else {
            Ext.Ajax.request({
                waitMsg:'Sedang Proses',
                url:'PondokHarapan/PahAnggaran/IsPeriodeExist/',
                params:{
                    bulan:this.cmbBulan.value,
                    tahun:this.periode_tahun.defaultValue,
                },
                method:'POST',

                success:function (f, a) {
                    var response = Ext.decode(f.responseText);

                    if (response.success == false) {
                        Ext.MessageBox.show({
                            title:'Warning',
                            msg:response.msg,
                            buttons:Ext.MessageBox.OK,
                            icon:Ext.MessageBox.WARNING
                        });
                        return;
                    }

                },
                failure:function (f, a) {
                    Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                }
            });
            urlz = 'PondokHarapan/PahAnggaran/create/';
        }

        Ext.getCmp('form-PahAnggaran').getForm().submit({
            url:urlz,
            params:{
                bulanStr:this.cmbBulan.getRawValue(),
                detil:Ext.encode(Ext.pluck(jun.rztPahAnggaranDetil.data.items, 'data')),
            },
            timeOut:1000,
            waitMsg:'Sedang Proses',
            scope:this,

            success:function (f, a) {


                var response = Ext.decode(a.response.responseText);


                if (this.modez == 0) {
                    Ext.MessageBox.show({
                        title:'Anggaran',
                        msg:"Anggaran bulan " + response.bulan + " tahun " + response.tahun +
                            " berhasil disimpan.<br /> Ref. Dokumen : " + response.id,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('form-PahAnggaran').getForm().reset();
                }
                jun.rztPahAnggaran.reload();
                this.close();
            },

            failure:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                if (response != undefined) {
                    Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                } else {
                    Ext.MessageBox.show({
                        title:'Anggaran',
                        msg:"Anggaran bulan " + response.bulan + " tahun " + response.tahun +
                            " gagal disimpan.<br /> Alasan : " + response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.ERROR
                    });
                }
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