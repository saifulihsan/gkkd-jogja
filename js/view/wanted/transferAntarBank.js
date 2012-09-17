jun.BankTransfer = Ext.extend(Ext.Window, {
    title: 'BankTrans',
    modez:1,
    width: 400,
    height: 300,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #DFE8F6; padding: 10px',
                id:'form-BankTrans',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'type',
                        hideLabel:false,
                        //hidden:true,
                        name:'type',
                        id:'typeid',
                        ref:'../type',
                        maxLength: 6,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'trans_no',
                        hideLabel:false,
                        //hidden:true,
                        name:'trans_no',
                        id:'trans_noid',
                        ref:'../trans_no',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender:true,
                        mode: 'local',
                        fieldLabel: 'bank_act',
                        store: jun.rztBankAccounts,
                        hiddenName:'bank_act',
                        hiddenValue:'bank_act',
                        valueField: 'id',
                        //displayField: 'BankAccounts::model()->representingColumn()',
                        displayField: 'bank_account_name',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'ref',
                        hideLabel:false,
                        //hidden:true,
                        name:'ref',
                        id:'refid',
                        ref:'../ref',
                        maxLength: 40,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'datefield',
                        ref:'../trans_date',
                        fieldLabel: 'trans_date',
                        name:'trans_date',
                        id:'trans_dateid',
                        format: 'd M Y',
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'amount',
                        hideLabel:false,
                        //hidden:true,
                        name:'amount',
                        id:'amountid',
                        ref:'../amount',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'dimension_id',
                        hideLabel:false,
                        //hidden:true,
                        name:'dimension_id',
                        id:'dimension_idid',
                        ref:'../dimension_id',
                        maxLength: 11,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'dimension2_id',
                        hideLabel:false,
                        //hidden:true,
                        name:'dimension2_id',
                        id:'dimension2_idid',
                        ref:'../dimension2_id',
                        maxLength: 11,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'person_type_id',
                        hideLabel:false,
                        //hidden:true,
                        name:'person_type_id',
                        id:'person_type_idid',
                        ref:'../person_type_id',
                        maxLength: 11,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'person_id',
                        hideLabel:false,
                        //hidden:true,
                        name:'person_id',
                        id:'person_idid',
                        ref:'../person_id',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'datefield',
                        ref:'../reconciled',
                        fieldLabel: 'reconciled',
                        name:'reconciled',
                        id:'reconciledid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },

                ]
            }];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref:'../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.BankTransfer.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);

    },

    onActivate: function(){

        this.btnSave.hidden = false;

    },

    saveForm : function()
    {
        var urlz;

        if(this.modez == 1 || this.modez== 2) {

            urlz= 'Wanted/BankTrans/update/id/' + this.id;

        } else {

            urlz= 'Wanted/BankTrans/create/';
        }

        Ext.getCmp('form-BankTrans').getForm().submit({
            url:urlz,
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
                jun.rztBankTrans.reload();

                var response = Ext.decode(a.response.responseText);

                if(this.closeForm){

                    this.close();

                }else{
                    if(response.data != undefined){
                        Ext.MessageBox.alert("Pelayanan",response.data.msg);
                    }
                    if(this.modez == 0){
                        Ext.getCmp('form-BankTrans').getForm().reset();
                    }
                }

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

jun.BankTransferGrid=Ext.extend(Ext.grid.GridPanel ,{
    title:"BankTrans",
    id:'docs-jun.BankTransGrid',
    width:400,
    height:250,
    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'id',
            sortable:true,
            resizable:true,
            dataIndex:'id',
            width:100
        },
        {
            header:'type',
            sortable:true,
            resizable:true,
            dataIndex:'type',
            width:100
        },
        {
            header:'trans_no',
            sortable:true,
            resizable:true,
            dataIndex:'trans_no',
            width:100
        },
        {
            header:'bank_act',
            sortable:true,
            resizable:true,
            dataIndex:'bank_act',
            width:100
        },
        {
            header:'ref',
            sortable:true,
            resizable:true,
            dataIndex:'ref',
            width:100
        },
        {
            header:'trans_date',
            sortable:true,
            resizable:true,
            dataIndex:'trans_date',
            width:100
        },
        /*
         {
         header:'amount',
         sortable:true,
         resizable:true,
         dataIndex:'amount',
         width:100
         },
         {
         header:'dimension_id',
         sortable:true,
         resizable:true,
         dataIndex:'dimension_id',
         width:100
         },
         {
         header:'dimension2_id',
         sortable:true,
         resizable:true,
         dataIndex:'dimension2_id',
         width:100
         },
         {
         header:'person_type_id',
         sortable:true,
         resizable:true,
         dataIndex:'person_type_id',
         width:100
         },
         {
         header:'person_id',
         sortable:true,
         resizable:true,
         dataIndex:'person_id',
         width:100
         },
         {
         header:'reconciled',
         sortable:true,
         resizable:true,
         dataIndex:'reconciled',
         width:100
         },
         */

    ],
    initComponent: function(){
        this.store = jun.rztBankTrans;
        this.bbar = {
            items: [
                {
                    xtype: 'paging',
                    store: this.store,
                    displayInfo: true,
                    pageSize: 10
                }]
        };

        this.tbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    ref: '../btnEdit'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    ref: '../btnDelete'
                }
            ]
        };
        jun.BankTransferGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },

    getrow: function(sm, idx, r){
        this.record = r;

        var selectedz = this.sm.getSelections();
    },

    loadForm: function(){
        var form = new jun.BankTransWin({modez:0});
        form.show();
    },

    loadEditForm: function(){

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if(selectedz == ""){
            Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.BankTransWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },

    deleteRec : function(){
        Ext.MessageBox.confirm('Pertanyaan','Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
    },

    deleteRecYes : function(){

        var record = this.sm.getSelected();

        // Check is list selected
        if(record == ""){
            Ext.MessageBox.alert("Warning","Anda Belum Memilih Jenis Pelayanan");
            return;
        }

        Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: 'Wanted/BankTrans/delete/id/' + record.json.id,
            //url: 'index.php/api/BankTrans/delete/' + record[0].json.nosjp,
            method: 'POST',

            success: function(response){
                jun.rztBankTrans.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

            },
            failure: function(response){
                Ext.MessageBox.alert('error','could not connect to the database. retry later');
            }
        });

    }
})
