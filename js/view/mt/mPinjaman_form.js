jun.MtPinjamanWin = Ext.extend(Ext.Window, {
    title:'Peminjaman Kendaraan',
    modez:1,
    id:'pah-win-pinjam',
    width:900,
    height:570,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    resizable:false,
    iswin:true,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'pah-form-Transfer-bank',
                labelWidth:100,
                labelAlign:'left',
                layout:'absolute',
                ref:'formz',
                anchor:'100% 100%',
                border:false,
                items:[ 
                            {
                                xtype:'label',
                                text:'No.Pinjam',
                                x:5,
                                y:5
                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'no_pinjam',
                                id:'no_pinjam',                    
                                maxLength:15,
                                //allowBlank: ,
                                x:100,
                                y:2,
                                height:20,
                                width:200,
                            },
                            {
                                xtype:'label',
                                text:'Nama Konsumen',
                                x:5,
                                y:35
                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'nama_konsumen',
                                id:'nama_konsumen',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:100,
                                y:32,
                                height:20,
                                width:200,
                            },
                            {
                                xtype:'label',
                                text:'Tanda Pengenal',
                                x:5,
                                y:65

                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'tanda_pengenal',
                                id:'tanda_pengenal',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:100,
                                y:62,
                                height:20,
                                width:200,
                            },   
                            {
                                xtype:'label',
                                text:'Tanggal Transaksi',
                                x:540,
                                y:5
                            },
                            {
                                xtype:'xdatefield',
                                hideLabel:false,
                                //hidden:true,
                                name:'tanggal_transaksi',
                                id:'tanggal_transaksi',
                                maxLength:40,
                                //allowBlank: 1,
                                x:660,
                                y:2,
                                height:20,
                                width:200,
                            },
                            {
                                xtype:'label',
                                text:'Kelompok Konsumen',
                                x:540,
                                y:35
                            },
                            {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'kelompok_konsumen',
                                hiddenValue:'konsumen_kel',
                                valueField:'kelompok_konsumen',
                                forceSelection:true,
                                displayField:'name',
                                x:660,
                                y:32,
                                height:20,
                                width:200,
                            },
                             {
                                xtype:'label',
                                text:'No Identitas',
                                x:540,
                                y:65
                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'no_identitas',
                                id:'no_identitas',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:62,
                                height:20,
                                width:200,
                            },
                            
                             {
                                xtype:'label',
                                text:'Jaminan:',
                                x:5,
                                y:95
                            },
                            {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'jaminan',
                                hiddenValue:'jaminan_kel',
                                valueField:'jaminan',
                                forceSelection:true,
                                displayField:'name',
                                x:100,
                                y:92,
                                height:20,
                                width:200,
                            },
                           
                            {
                                xtype:'textarea',
                                name:'jaminan_lain',
                                id:'jaminan_lain',
                                height:'70',
                                width:'400',
                                x:100,
                                y:122
                         
                            },
                            
                            
                            {
                                xtype:'label',
                                text:'Season',
                                x:540,
                                y:95
                                
                            },
                            {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'season',
                                hiddenValue:'season_kel',
                                valueField:'season',
                                forceSelection:true,
                                displayField:'name',
                                x:660,
                                y:95,
                                height:20,
                                width:200,
                         
                            }, {
                                xtype:'label',
                                text:'Tanggal Pinjam',
                                x:5,
                                y:215
                            },
                            {
                                xtype:'xdatefield',
                                hideLabel:false,
                                //hidden:true,
                                name:'tanggal_pinjam',
                                id:'tanggal_pinjam',
                                maxLength:40,
                                //allowBlank: 1,
                                x:100,
                                y:212,
                                height:20,
                                width:100,
                            },{
                                xtype:'label',
                                text:'Jam Pinjam',
                                x:208,
                                y:215
                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'jampinjam',
                                id:'jampinjam',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:280,
                                y:212,
                                height:20,
                                width:50,
                            }, {
                                xtype:'label',
                                text:'Lama Sewa',
                                x:340,
                                y:215
                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'lama_bulan',
                                id:'lama_bulan',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:410,
                                y:212,
                                height:20,
                                width:50,
                            },   {
                                xtype:'label',
                                text:'(bulan)',
                                x:470,
                                y:215
                            }, {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'lama_hari',
                                id:'lama_hari',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:520,
                                y:212,
                                height:20,
                                width:50,
                            },
                              {
                                xtype:'label',
                                text:'(hari)',
                                x:580,
                                y:215
                            },{
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'lama_jam',
                                id:'lama_jam',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:620,
                                y:212,
                                height:20,
                                width:50,
                            },
                              {
                                xtype:'label',
                                text:'(jam)',
                                x:680,
                                y:215
                            },
                             
                            {
                                xtype:'label',
                                text:'Rencana Tgl Kembali',
                                x:5,
                                y:245
                            },
                            {
                                xtype:'xdatefield',
                                hideLabel:false,
                                //hidden:true,
                                name:'rencana_tanggal_kembali',
                                id:'rencana_tanggal_kembali',
                                maxLength:40,
                                //allowBlank: 1,
                                x:100,
                                y:242,
                                height:20,
                                width:100,
                            },
                            
                             {
                                xtype:'label',
                                text:'Jam Kembali',
                                x:208,
                                y:245
                            },
                            {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'jam_kembali',
                                id:'jam_kembali',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:280,
                                y:242,
                                height:20,
                                width:50,
                            },  {
                                xtype:'label',
                                text:'ONGKOS SEWA',
                                x:5,
                                y:275
                            },
                              {
                                xtype:'label',
                                text:'No Polisi',
                                x:5,
                                y:305

                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'nopolisi',
                                id:'nopolisi',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:100,
                                y:302,
                                height:20,
                                width:100,
                            },
                               {
                                xtype:'label',
                                text:'Jenis Mobil',
                                x:210,
                                y:305
                            },
                            
                             {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'jenis_mobil',
                                hiddenValue:'jenis_mobil_kel',
                                valueField:'jenis_mobil',
                                forceSelection:true,
                                displayField:'name',
                                x:280,
                                y:302,
                                height:20,
                                width:200,
                            }, 
                            
                            
                             {
                                xtype:'label',
                                text:'Driver',
                                x:5,
                                y:335
                            },
                            
                             {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'driver',
                                hiddenValue:'driver_kel',
                                valueField:'driver',
                                forceSelection:true,
                                displayField:'name',
                                x:100,
                                y:332,
                                height:20,
                                width:100,
                            },{
                                xtype:'label',
                                text:'Nama Driver',
                                x:210,
                                y:335
                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'namadriver',
                                id:'namadriver',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:280,
                                y:332,
                                height:20,
                                width:150,
                            },{
                                xtype:'label',
                                text:'Bensin',
                                x:5,
                                y:365
                            },
                            
                             {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'bensin',
                                hiddenValue:'bensin_kel',
                                valueField:'bensin',
                                forceSelection:true,
                                displayField:'name',
                                x:100,
                                y:362,
                                height:20,
                                width:100,
                            },{
                                xtype:'label',
                                text:'Cara Bayar',
                                x:5,
                                y:395
                            },
                            
                             {
                                xtype:'combo',
                                typeAhead:true,
                                triggerAction:'all',
                                lazyRender:true,
                                mode:'local',
                                store:jun.rztMtChartTypes,
                                hiddenName:'carabayar',
                                hiddenValue:'carabayar_kel',
                                valueField:'carabayar',
                                forceSelection:true,
                                displayField:'name',
                                x:100,
                                y:392,
                                height:20,
                                width:100,
                            }
                            ,{
                                xtype:'label',
                                text:'Bukti Transfer',
                                x:210,
                                y:395
                            },
                            
                             {
                                 xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'buktitransfer',
                                id:'buktitransfer',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:290,
                                y:392,
                                height:20,
                                width:150,
                            },
                             {
                                xtype:'label',
                                text:'Ongkos Sewa Mobil',
                                x:540,
                                y:245
                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_sewa',
                                id:'ongkos_sewa',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:242,
                                height:20,
                                width:200,
                            },
                            {
                                xtype:'label',
                                text:'Driver',
                                x:540,
                                y:275
                            },
                            
                             {
                                 xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_driver',
                                id:'ongkos_driver',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:272,
                                height:20,
                                width:200,
                            },
                            
                            {
                                xtype:'label',
                                text:'Bensin',
                                x:540,
                                y:305
                            },
                            
                             {
                                 xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_bensin',
                                id:'ongkos_bensin',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:305,
                                height:20,
                                width:200,
                            },
                             {
                                xtype:'label',
                                text:'Total Ongkos Sewa',
                                x:540,
                                y:335
                            },
                            
                             {
                                 xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_totsewa',
                                id:'ongkos_totsewa',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:332,
                                height:20,
                                width:200,
                            },
                            
                              {
                                xtype:'label',
                                text:'discount',
                                x:540,
                                y:365
                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_discount',
                                id:'ongkos_discount',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:362,
                                height:20,
                                width:200,
                            },  
                            {
                                xtype:'label',
                                text:'Total All',
                                x:540,
                                y:395
                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_all',
                                id:'ongkos_all',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:392,
                                height:20,
                                width:200,
                            },
                             {
                                xtype:'label',
                                text:'DP',
                                x:540,
                                y:425
                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_dp',
                                id:'ongkos_dp',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:422,
                                height:20,
                                width:200,
                            },
                             {
                                xtype:'label',
                                text:'Sisa Tagihan',
                                x:540,
                                y:455
                            },
                            
                             {
                                xtype:'textfield',
                                hideLabel:false,
                                //hidden:true,
                                name:'ongkos_sisa',
                                id:'ongkos_sisa',                           
                                maxLength:15,
                                //allowBlank: ,
                                x:660,
                                y:452,
                                height:20,
                                width:200,
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
        jun.rztMtBankAccounts.reload();
        jun.MtTranferBankWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //this.cmbBankAsal.on('select', this.oncmbBankAsalChange, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
       // this.cmbBankAsal.on('focus', this.onLoadBank, this);
      //  this.cmbBankTujuan.on('focus', this.onLoadBank, this);
        this.on('close', this.onWinClose, this);

    },
    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onWinClose:function () {
        jun.rztMtBankAccounts.clearFilter();
    },
    onLoadBank:function () {
        jun.rztMtBankAccounts.FilterData();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    oncmbBankAsalChange:function (cmb, newVal, oldVal) {
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'Mahkotrans/MtBankTrans/GetBalance/',
            params:{
                id:this.cmbBankAsal.getValue(),
            },
            success:function (response) {
                var response = Ext.decode(response.responseText);
                Ext.getCmp('bank_bal_id').setValue(response.id);
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;

        urlz = 'Mahkotrans/MtBankTrans/createtransfer/';
        Ext.getCmp('pah-form-Transfer-bank').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title:'Transfer',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.ERROR
                    });
                    this.btnDisabled(false);
                    return;
                } else {
                    Ext.MessageBox.show({
                        title:'Transfer',
                        msg:response.msg + "<br /> Ref. Dokumen : " + response.id,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('pah-form-Transfer-bank').getForm().reset();
                }
                jun.rztMtBankTrans.reload();
                this.close();
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