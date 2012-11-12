jun.PeDonaturWin = Ext.extend(Ext.Window, {
    title:'Donatur',
    modez:1,
    width:400,
    height:290,
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
                id:'form-PeDonatur',
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
                        name:'name',
                        id:'nameid',
                        ref:'../name',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Telepon',
                        hideLabel:false,
                        //hidden:true,
                        name:'phone',
                        id:'phoneid',
                        ref:'../phone',
                        maxLength:30,
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
                        //                        value:1,
                    }),
                    {
                        xtype:'textarea',
                        fieldLabel:'Alamat',
                        hideLabel:false,
                        //hidden:true,
                        name:'alamat',
                        id:'alamatid',
                        ref:'../alamat',
                        anchor:'100%',
                        height:100
                        //allowBlank: 1
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
                        //allowBlank:false,
                        anchor:'100%',
                        editable:false,
                        ref:'../cmbkode',
                        lastQuery:''
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
        jun.PeDonaturWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.on('close', this.onWinClose, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbkode.on('focus', this.onLoadChartMaster, this);
    },
    onLoadChartMaster:function () {
        jun.rztPeChartMaster.FilterData();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onWinClose:function () {
        jun.rztPeChartMaster.clearFilter();
    },
    saveForm:function () {
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokEfata/PeDonatur/update/id/' + this.id;
        } else {
            urlz = 'PondokEfata/PeDonatur/create/';
        }
        Ext.getCmp('form-PeDonatur').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPeDonatur.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-PeDonatur').getForm().reset();
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