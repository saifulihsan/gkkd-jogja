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
                        minValue: 2000,
                        maxValue: 3000,
                        defaultValue: 2012,
                        x:465,
                        y:2,
                        width:100
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
        this.cmbBulan.on('select',this.oncmbBulanchange,this);
        this.periode_tahun.on('spin',this.onperiodetahunchange,this);
    },

    checkPeriodeAnggaran:function(){
        //console.info('Bulan ' + this.cmbBulan.value + 'Tahun ' + this.periode_tahun.defaultValue);
        Ext.Ajax.request({
            waitMsg: 'Sedang Proses',
            url: 'PondokHarapan/PahAnggaran/IsPeriodeExist/',
            params:{
                bulan:this.cmbBulan.value,
                tahun:this.periode_tahun.defaultValue,
            },
            method: 'POST',

            success: function(f, a){

            },
            failure: function(f, a){
                var response = Ext.decode(f.responseText);
                Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon:Ext.MessageBox.ERROR
                });
            }
        });
    },

    onperiodetahunchange:function (){
        this.checkPeriodeAnggaran();
    },

    oncmbBulanchange:function (){
        this.checkPeriodeAnggaran();
    },

    onActivate:function () {
        this.btnSave.hidden = false;
        var dt = new Date();
        this.periode_tahun.setValue(dt.format('Y'));
        this.cmbBulan.setValue(dt.format('n'));
    },

    saveForm:function () {
        var urlz;

        if (this.modez == 1 || this.modez == 2) {

            urlz = 'PondokHarapan/PahAnggaran/update/id/' + this.id;

        } else {
            Ext.Ajax.request({
                waitMsg: 'Sedang Proses',
                url: 'PondokHarapan/PahAnggaran/IsPeriodeExist/',
                params:{
                    bulan:this.cmbBulan.value,
                    tahun:this.periode_tahun.defaultValue,
                },
                method: 'POST',

                success: function(f, a){

                },
                failure: function(f, a){
                    var response = Ext.decode(f.responseText);
                    Ext.MessageBox.show({
                        title:'Warning',
                        msg:response.msg,
                        buttons: Ext.MessageBox.OK,
                        icon:Ext.MessageBox.ERROR
                    });
                    return;
                }
            });
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