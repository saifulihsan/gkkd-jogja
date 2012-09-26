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
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
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
                        itemSelector: 'div.search-item',
                        tpl:new Ext.XTemplate(
                            '<tpl for="."><div class="search-item">',
                            '<h3><span">{account_code} - {account_name}</span></h3><br />{description}',
                            '</div></tpl>'
                        ),
                        displayField:'account_code',
                        listWidth:300,
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
        jun.PahAnggaranDetilWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        jun.rztPahChartMaster.reload();
    },

    onActivate:function () {

        this.btnSave.hidden = false;

    },

    saveForm:function () {
        if(jun.rztPahAnggaranDetil.find('pah_chart_master_account_code', this.cmbCodeRek.value) > -1){
            Ext.MessageBox.show({
                title:'Error',
                msg:'Kode rekening sudah di dipakai!',
                buttons: Ext.MessageBox.OK,
                icon:Ext.MessageBox.ERROR
            });
            return;
        }
        var detil = jun.rztPahAnggaranDetil.recordType;
        var e = new detil({
            pah_chart_master_account_code:this.cmbCodeRek.value,
            amount:parseFloat(this.amount.value)
        });

        jun.rztPahAnggaranDetil.insert(0, e);
        jun.rztPahAnggaranDetil.refreshData();
        this.close();


//        var urlz;
//
//        if (this.modez == 1 || this.modez == 2) {
//
//            urlz = 'PondokHarapan/PahAnggaranDetil/update/id/' + this.id;
//
//        } else {
//
//            urlz = 'PondokHarapan/PahAnggaranDetil/create/';
//        }

//        Ext.getCmp('form-PahAnggaranDetil').getForm().submit({
//            url:urlz,
//
//            timeOut:1000,
//            waitMsg:'Sedang Proses',
//            scope:this,
//
//            success:function (f, a) {
//                jun.rztPahAnggaranDetil.reload();
//
//                var response = Ext.decode(a.response.responseText);
//
//                if (this.closeForm) {
//
//                    this.close();
//
//                } else {
//                    if (response.data != undefined) {
//                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
//                    }
//                    if (this.modez == 0) {
//                        Ext.getCmp('form-PahAnggaranDetil').getForm().reset();
//                    }
//                }
//
//            },
//
//            failure:function (f, a) {
//                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
//            }
//
//        });

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