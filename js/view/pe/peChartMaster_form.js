jun.PeChartMasterWin = Ext.extend(Ext.Window, {
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
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeChartMaster',
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
                        store:jun.rztPeChartTypes,
                        hiddenName:'account_type',
                        hiddenValue:'account_type',
                        valueField:'id',
                        forceSelection:true,
                        displayField:'name',
                        anchor:'100%'
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
                        lazyRender:true,
                        width:100,
                        height:20,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../cmbActive',
                        hiddenName:'inactive',
                        hiddenValue:'inactive',
                    }),
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
        jun.PeChartMasterWin.superclass.initComponent.call(this);
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
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    btnDisabled:function (status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokEfata/PeChartMaster/update/id/' + this.id;
        } else {
            urlz = 'PondokEfata/PeChartMaster/create/';
        }
        Ext.getCmp('form-PeChartMaster').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPeChartMaster.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PeChartMaster').getForm().reset();
                    }
                    this.btnDisabled(false);
                }
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
jun.PeSaldoAwalWin = Ext.extend(Ext.Window, {
    title:'Saldo Awal',
    modez:1,
    width:350,
    height:170,
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
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PeSaldoAwal',
                labelWidth:125,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
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
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kode Rekening',
                        store:jun.rztPeChartMaster,
                        hiddenName:'account_code',
                        hiddenValue:'account_code',
                        valueField:'account_code',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        editable:true,
                        listWidth:300,
                        displayField:'account_code',
                        forceSelection:true,
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
        jun.rztPeChartMaster.reload();
        jun.PeSaldoAwalWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(true);
        Ext.getCmp('form-PeSaldoAwal').getForm().submit({
            url:'PondokEfata/PeChartMaster/SetSaldoAwal/',
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
                    Ext.getCmp('form-PeSaldoAwal').getForm().reset();
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