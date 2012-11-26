jun.PahBankAccountsWin = Ext.extend(Ext.Window, {
    title:'Kas dan Bank',
    modez:1,
    width:425,
    height:320,
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
                id:'form-PahBankAccounts',
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
                        forceSelection:true,
                        hiddenName:'account_code',
                        hiddenValue:'account_code',
                        valueField:'account_code',
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        displayField:'account_code',
                        listWidth:300,
                        editable:true,
                        anchor:'100%',
                        ref:'../cmbKode',
                        lastQuery:''
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Kas/Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_account_name',
                        id:'bank_account_nameid',
                        ref:'../bank_account_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nama Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_name',
                        id:'bank_nameid',
                        ref:'../bank_name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Nomer Rekening Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_account_number',
                        id:'bank_account_numberid',
                        ref:'../bank_account_number',
                        maxLength:100,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Atas Nama',
                        hideLabel:false,
                        //hidden:true,
                        name:'atas_nama',
                        id:'atas_namaid',
                        ref:'../atas_nama',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'Telepon',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_phone',
                        id:'bank_phoneid',
                        ref:'../bank_phone',
                        maxLength:50,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Alamat Bank',
                        hideLabel:false,
                        //hidden:true,
                        name:'bank_address',
                        id:'bank_addressid',
                        ref:'../bank_address',
                        anchor:'100%',
                        height:50
                        //allowBlank: 1
                    },
                    new jun.comboActive({
                        fieldLabel:'Status',
                        hideLabel:false,
                        width:100,
                        height:20,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
                        hiddenName:'inactive',
                        hiddenValue:'inactive',
                    }),
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
        jun.PahBankAccountsWin.superclass.initComponent.call(this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbKode.on('focus', this.onLoadBank, this);
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
    onLoadBank:function () {
        jun.rztPahChartMaster.FilterData();
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokHarapan/PahBankAccounts/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahBankAccounts/create/';
        }
        Ext.getCmp('form-PahBankAccounts').getForm().submit({
            url:urlz,
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
                if (this.modez == 0) {
                    Ext.getCmp('form-PahBankAccounts').getForm().reset();
                }
                jun.rztPahBankAccounts.reload();
                this.btnDisabled(false);
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