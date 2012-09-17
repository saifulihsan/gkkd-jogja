

jun.NotaWin = Ext.extend(Ext.Window, {
    //autoDestroy:true,
    title:'Buat Nota Baru',
    modez:1,
    width:826,
    height:455,
    layout:'form',
    modal:true,
    resizable:false,
    padding:5,
//    closeForm:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-Nota',
//                labelWidth:100,
//                labelAlign:'left',
                anchor:'100% 100%',
                layout:'absolute',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'label',
                        text:'Reference:',
                        x:5,
                        y:5
                    },
                    {
                        xtype:'textfield',
                        x:75,
                        y:2,
                        height:20,
                        width:150,
                        name:'doc_ref',
                        id:'doc_refid',
                        ref:'../doc_ref',
                        maxLength:20
                    },
                    {
                        xtype:'label',
                        text:'Tanggal:',
                        x:5,
                        y:30
                    },
                    {
                        xtype:'datefield',
                        ref:'../trans_date',
//                        fieldLabel: 'trans_date',
                        name:'trans_date',
                        id:'trans_dateid',
                        format:'d/m/Y',
                        x:75,
                        y:27,
                        width:150,
                        height:20
                    },
                    {
                        xtype:'label',
                        text:'Sales:',
                        x:250,
                        y:5
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        //mode:'local',
                        store:jun.rztSales,
                        hiddenName:'sales_id',
                        hiddenValue:'sales_id',
                        valueField:'sales_id',
                        x:320,
                        y:2,
                        width:150,
                        height:20,
                        //displayField: 'Sales::model()->representingColumn()',
                        displayField:'ref',
                        //allowBlank:false,
                        //  anchor: '100%'
                    },
                    {
                        xtype:'label',
                        text:'Pelanggan:',
                        x:250,
                        y:30
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        //mode:'local',
                        x:320,
                        y:27,
                        height:20,
                        store:jun.rztCustomers,
                        hiddenName:'customer_id',
                        hiddenValue:'customer_id',
                        valueField:'customer_id',
                        width:150,
                        //displayField: 'Customers::model()->representingColumn()',
                        displayField:'name',
                        //allowBlank:false,
                        //anchor: '100%'
                    },
                    new jun.NotaDtlGrid({modez:this.id}),
                    {
                        xtype:'label',
                        text:'Total:',
                        x:570,
                        y:312
                    },
                    {
                        xtype:'textfield',
                        x:640,
                        y:310,
                        height:20,
                        width:150,
                        name:'total_1',
                        id:'total_1id',
                        ref:'../total_1',
                        maxLength:20
                        //allowBlank: 1,
                        //anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Diskon:',
                        x:570,
                        y:337
                    },
                    {
                        xtype:'textfield',
                        x:640,
                        y:335,
                        height:20,
                        width:150,
                        name:'disc',
                        id:'discid',
                        ref:'../disc',
                        maxLength:20
                        //allowBlank: 1,
                        //anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Grand Total:',
                        x:570,
                        y:362
                    },
                    {
                        xtype:'textfield',
                        x:640,
                        y:360,
                        height:20,
                        width:150,
                        name:'total_2',
                        id:'total_2id',
                        ref:'../total_2',
                        maxLength:20
                        //allowBlank: 1,
                        //anchor:'100%'
                    }

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
        jun.NotaWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        if(this.modez > 0){
            this.btnSave.hidden = true;
            this.btnSaveClose.hidden = true;
            this.btnCancel.text = 'Tutup';
        } else{
            this.btnSave.hidden = false;
            this.btnSaveClose.hidden = false;
            this.btnCancel.text = 'Batal';
        }
    },

    onActivate:function () {

        this.btnSave.hidden = false;

    },

    saveForm:function () {
        var urlz;

        if (this.modez == 1 || this.modez == 2) {

            urlz = 'user/Nota/update/id/' + this.id;

        } else {

            urlz = 'user/Nota/create/';
        }


        Ext.getCmp('form-Nota').getForm().submit({
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
                jun.rztNota.reload();

                var response = Ext.decode(a.response.responseText);
                var id = response.id;
                Ext.getCmp('docs-jun.NotaDtlGrid').stopEditing();
                jun.store.saveData(id);
                jun.store.save();

                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {

                    }
                    Ext.getCmp('form-Nota').getForm().reset();
                    jun.store.removeAll();
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