jun.PahReportMutasiWin = Ext.extend(Ext.Window, {
    title: 'Mutasi Kas di Tangan',
    modez:1,
    width: 300,
    height: 150,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    iswin:true,
    ajaxSubmit:false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #DFE8F6; padding: 10px',
                id:'form-PahReportMutasiWin',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_mulai',
                        fieldLabel:'Dari Tanggal',
                        name:'trans_date_mulai',
                        id:'trans_date_mulaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date_sampai',
                        fieldLabel:'Sampai Tanggal',
                        name:'trans_date_sampai',
                        id:'trans_date_sampaiid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                ]
            }];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Save to Excel',
                    hidden: false,
                    ref:'../btnSave'
                },
            ]
        };
        jun.PahReportMutasiWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
//        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
//        this.btnCancel.on('click', this.onbtnCancelclick, this);

    },

    onActivate: function(){

        this.btnSave.hidden = false;

    },

    saveForm : function()
    {

        Ext.getCmp('form-PahReportMutasiWin').getForm().submit({
            url:'PondokHarapan/PahBankTrans/print/',
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut: 1000,
            waitMsg: 'Sedang Proses',
            scope: this,

            success: function(f,a){
//                var response = Ext.decode(a.response.responseText);
//                if(this.closeForm){
//                    this.close();
//                }else{
//                    if(response.data != undefined){
//                        Ext.MessageBox.alert("Pelayanan",response.data.msg);
//                    }
//                    if(this.modez == 0){
//                        Ext.getCmp('form-PahChartTypes').getForm().reset();
//                    }
//                }

            },

            failure: function(f,a){
                Ext.MessageBox.alert("Error","Can't Communicate With The Server");
            }

        });

    },

    onbtnSaveCloseClick: function()
    {
        this.closeForm = true;
        this.saveForm(true);
    },

    onbtnSaveclick: function()
    {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function(){
        this.close();
    }

});
