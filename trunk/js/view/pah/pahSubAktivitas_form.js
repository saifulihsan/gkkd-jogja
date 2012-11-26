jun.PahSubAktivitasWin = Ext.extend(Ext.Window, {
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
                id:'form-PahSubAktivitas',
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
                        store:jun.rztPahChartMaster,
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
                        name:'desc',
                        id:'descid',
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
        jun.rztPahChartMaster.reload();
        jun.PahSubAktivitasWin.superclass.initComponent.call(this);
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
        jun.rztPahChartMaster.clearFilter();
    },
    onLoadChartMaster:function () {
        jun.rztPahChartMaster.FilterData();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokHarapan/PahSubAktivitas/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahSubAktivitas/create/';
        }
        Ext.getCmp('form-PahSubAktivitas').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPahSubAktivitas.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahSubAktivitas').getForm().reset();
                    }
                }
                this.btnDisabled(false);
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