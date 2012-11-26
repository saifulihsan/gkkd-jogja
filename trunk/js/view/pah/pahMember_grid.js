jun.PahReportPenghuniPondok = Ext.extend(Ext.Window, {
    title:'Daftar Penghuni Pondok',
    iconCls: 'silk13-report',
    modez:1,
    width:350,
    height:5,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    iswin:true,
    //ajaxSubmit:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                //url:'PondokHarapan/PahBankTrans/print/',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-PahReportPenghuniPondok',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
//                    {
//                        xtype:'xdatefield',
//                        ref:'../trans_date_mulai',
//                        fieldLabel:'Dari Tanggal',
//                        name:'trans_date_mulai',
//                        id:'trans_date_mulaiid',
//                        format:'d M Y',
//                        //allowBlank: 1,
//                        anchor:'100%'
//                    },
//                    {
//                        xtype:'xdatefield',
//                        ref:'../trans_date_sampai',
//                        fieldLabel:'Sampai Tanggal',
//                        name:'trans_date_sampai',
//                        id:'trans_date_sampaiid',
//                        format:'d M Y',
//                        //allowBlank: 1,
//                        anchor:'100%'
//                    },
                    {
                        xtype:'hidden', //should use the more standard hiddenfield
                        name:'format',
                        ref:'../format',
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_excel',
                    text:'Save to Excel',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-page_white_acrobat',
                    text:'Save to PDF',
                    hidden:false,
                    ref:'../btnPdf'
                },
                {
                    xtype:'button',
                    iconCls: 'silk13-printer',
                    text:'Print',
                    hidden:false,
                    ref:'../btnPrint'
                },
            ]
        };
        jun.PahReportMutasiWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        //        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnPdf.on('click', this.onbtnPdfclick, this);
        this.btnPrint.on('click', this.onbtnPrintclick, this);
    },
    onbtnPrintclick:function () {
//        var mulai = this.trans_date_mulai.hiddenField.dom.value;
//        var sampai = this.trans_date_sampai.hiddenField.dom.value;
        var win = window.open('', 'form', 'width=800,height=600,location=no,menubar=0,status=0,resizeable,scrollbars');
        win.document.write("<html><title>Daftar Penghuni Pondok</title><body>" +
            "<form id='form' method='POST' action='PondokHarapan/PahReport/CetakPenghuniPondok'>" +
            "<input type='hidden' name='format' value='html'>" +
            "</form></body></html>");
        win.document.close();
        win.document.getElementById('form').submit();
    },
    onbtnPdfclick:function () {
        //        var win = window.open('', 'form','width=800,height=600,resizeable,scrollbars');
        //        win.document.write("<html><title>test form</title><body>" +
        //            "<form id='form' method='POST' action='PondokHarapan/PahReport/MutasiKasDiTangan'>" +
        //            "<input type='hidden' name='trans_date_mulai' value='2012-03-01'>" +
        //            "<input type='hidden' name='trans_date_sampai' value='2012-10-02'>" +
        //            "<input type='hidden' name='format' value='pdf'>" +
        //            "</form></body></html>");
        //        win.document.close();
        //        win.document.getElementById('form').submit();
        //        return;
        Ext.getCmp('form-PahReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportMutasiWin').getForm().url = 'PondokHarapan/PahReport/CetakPenghuniPondok';
        this.format.setValue('pdf');
        Ext.getCmp('form-PahReportMutasiWin').getForm().submit();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    onbtnSaveclick:function () {

        //        newwindow=window.open('google.com','name','height=200,width=150');
        //        if (window.focus) {newwindow.focus()}
        //        return;
        Ext.getCmp('form-PahReportMutasiWin').getForm().standardSubmit = true;
        Ext.getCmp('form-PahReportMutasiWin').getForm().url = 'PondokHarapan/PahReport/CetakPenghuniPondok';
        this.format.setValue('excel');
        Ext.getCmp('form-PahReportMutasiWin').getForm().submit();
    }
});


jun.renderRealName = function (val, meta, record) {
    var store = jun.rztJemaat;
    var index = store.find('nij', val);
    var record = store.getAt(index);
    return record.data.real_name;
}
jun.PahMemberGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Daftar Penghuni Pondok",
    id:'docs-jun.PahMemberGrid',
    iconCls: 'silk-grid',
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'id',
            sortable:true,
            resizable:true,
            dataIndex:'id',
            hidden:true,
            width:100
        },
        {
            header:'Nama Penghuni Pondok',
            sortable:true,
            resizable:true,
            dataIndex:'jemaat_nij',
            renderer:jun.renderRealName,
            width:100
        },
        {
            header:'Status',
            dataIndex:'inactive',
            renderer:jun.renderActive,
        },
    ],
    initComponent:function () {
        this.store = jun.rztPahMemberbyName;
//        this.bbar = {
//            items:[
//                {
//                    xtype:'paging',
//                    store:this.store,
//                    displayInfo:true,
//                    pageSize:10
//                }
//            ]
//        };
        this.tbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'asp-user8_add',
                    text:'Tambah Penghuni Pondok',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    iconCls:'asp-user8_edit',
                    text:'Ubah Penghuni Pondok',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Print Daftar Penghuni Pondok',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.rztJemaat.reload();
        jun.rztPahMemberbyName.load();
        jun.PahMemberGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahMemberWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.PahMemberWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
    deleteRec:function () {
        var rep = new jun.PahReportPenghuniPondok();
        rep.show(this);
//        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
    },
    deleteRecYes:function (btn) {
        if (btn == 'no') {
            return;
        }
        var record = this.sm.getSelected();
        // Check is list selected
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Penghuni Pondok");
            return;
        }
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahMember/delete/id/' + record.json.id,
            //url: 'index.php/api/PahMember/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztPahMember.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
