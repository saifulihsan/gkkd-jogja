jun.PeSubAktivitasWin = Ext.extend(Ext.Window, {
    title:'Sub Aktivitas',
    modez:1,
    width:400,
    height:275,
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
                id:'form-PeSubAktivitas',
                labelWidth:100,
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
                        store:jun.rztPeChartMaster,
                        hiddenName:'account_code',
                        hiddenValue:'account_code',
                        valueField:'account_code',
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        listWidth:300,
                        forceSelection:true,
                        displayField:'account_code',
                        editable:true,
                        anchor:'100%',
                        ref:'../cmbKode',
                        lastQuery:''
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama',
                        hideLabel:false,
                        //hidden:true,
                        name:'nama',
                        id:'namaid',
                        ref:'../nama',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
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
                        fieldLabel:'Keterangan',
                        hideLabel:false,
                        //hidden:true,
                        name:'desc_',
                        id:'desc_id',
                        ref:'../desc',
                        anchor:'100%',
                        height:100,
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
        jun.rztPeChartMaster.reload();
        jun.PeSubAktivitasWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.on('close', this.onWinClose, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbKode.on('focus', this.onLoadChartMaster, this);
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
    onWinClose:function () {
        jun.rztPeChartMaster.clearFilter();
    },
    onLoadChartMaster:function () {
        jun.rztPeChartMaster.FilterData();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokEfata/PeSubAktivitas/update/id/' + this.id;
        } else {
            urlz = 'PondokEfata/PeSubAktivitas/create/';
        }
        Ext.getCmp('form-PeSubAktivitas').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPeSubAktivitas.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PeSubAktivitas').getForm().reset();
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