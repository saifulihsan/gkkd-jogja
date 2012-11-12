jun.PahAnggaranDetilWin = Ext.extend(Ext.Window, {
    title:'Alokasi',
    modez:1,
    width:335,
    height:140,
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
                id:'form-PahAnggaranDetil',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'combo',
                        ref:'../cmbCodeRek',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kode Rekening',
                        store:jun.rztPahChartMaster,
                        hiddenName:'pah_chart_master_account_code',
                        hiddenValue:'pah_chart_master_account_code',
                        valueField:'account_code',
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        displayField:'account_code',
                        listWidth:300,
                        anchor:'100%',
                        ref:'../cmbkode',
                        lastQuery:''
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
                        value:0,
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
        jun.rztPahChartMaster.reload();
        jun.PahAnggaranDetilWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbkode.on('focus', this.onLoadChartMaster, this);
        this.on('close', this.onWinClose, this);
    },
    onLoadChartMaster:function () {
        jun.rztPahChartMaster.FilterData();
    },
    onWinClose:function () {
        jun.rztPahChartMaster.clearFilter();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        var index_kode = jun.rztPahAnggaranDetil.find('pah_chart_master_account_code', this.cmbkode.value);
        if (index_kode > -1 && this.modez == 0) {
            Ext.MessageBox.show({
                title:'Error',
                msg:'Kode rekening sudah di dipakai!',
                buttons:Ext.MessageBox.OK,
                icon:Ext.MessageBox.ERROR
            });
            return;
        }
        if (Ext.getCmp('totalangblmid').getValue() < this.amount.value) {
            Ext.MessageBox.show({
                title:'Error',
                msg:'Alokasi melebihi anggaran!',
                buttons:Ext.MessageBox.OK,
                icon:Ext.MessageBox.ERROR
            });
            return;
        }
        if (this.modez > 0) {
            var index = jun.rztPahAnggaranDetil.find('pah_chart_master_account_code', this.id);
            if (index > -1)
                jun.rztPahAnggaranDetil.removeAt(index);
        }
        var detil = jun.rztPahAnggaranDetil.recordType;
        var e = new detil({
            pah_chart_master_account_code:this.cmbkode.value,
            amount:parseFloat(this.amount.value)
        });
        jun.rztPahAnggaranDetil.insert(0, e);
        jun.rztPahAnggaranDetil.refreshData();
        if (this.closeForm)
            this.close();
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