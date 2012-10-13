jun.PahChartMasterWin = Ext.extend(Ext.Window, {
    title:'Kode Rekening',
    modez:1,
    width:450,
    height:270,
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
                id:'form-PahChartMaster',
                labelWidth:125,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Kode Rekening',
                        hideLabel:false,
                        //hidden:true,
                        name:'account_code',
                        id:'account_codeid',
                        ref:'../account_code2',
                        maxLength:15,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Rekening',
                        hideLabel:false,
                        //hidden:true,
                        name:'account_name',
                        id:'account_nameid',
                        ref:'../account_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kelompok Rekening',
                        store:jun.rztPahChartTypes,
                        hiddenName:'account_type',
                        hiddenValue:'account_type',
                        valueField:'id',
                        //displayField: 'PahChartTypes::model()->representingColumn()',
                        displayField:'name',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Inactive',
                        hideLabel:false,
                        //hidden:true,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Deskripsi',
                        hideLabel:false,
                        //hidden:true,
                        name:'description',
                        id:'descriptionid',
                        ref:'../description',
                        height:75,
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
        jun.PahChartMasterWin.superclass.initComponent.call(this);
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
            urlz = 'PondokHarapan/PahChartMaster/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahChartMaster/create/';
        }
        Ext.getCmp('form-PahChartMaster').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
            //                waitMsg: 'Sedang Proses',
            scope:this,
            success:function (f, a) {
                jun.rztPahChartMaster.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahChartMaster').getForm().reset();
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
jun.PahSaldoAwalWin = Ext.extend(Ext.Window, {
    title:'Saldo Awal',
    modez:1,
    width:350,
    height:140,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahSaldoAwal',
                labelWidth:125,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kode Rekening',
                        store:jun.rztPahChartMaster,
                        hiddenName:'pah_chart_master_account_code',
                        hiddenValue:'pah_chart_master_account_code',
                        valueField:'account_code',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        editable:true,
                        listWidth:300,
                        displayField:'account_code',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'numericfield',
                        fieldLabel:'Jumlah',
                        hideLabel:false,
                        //hidden:true,
                        name:'amount',
                        id:'amountid',
                        ref:'../amount',
                        maxLength:30,
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
                    text:'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.rztPahChartMaster.reload();
        jun.PahSaldoAwalWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        Ext.getCmp('form-PahSaldoAwal').getForm().submit({
            url:'PondokHarapan/PahChartMaster/SetSaldoAwal/',
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                Ext.getCmp('form-PahSaldoAwal').getForm().reset();
                this.close();
            },
            failure:function (f, a) {
                if (a.failureType == "client")
                    return;
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