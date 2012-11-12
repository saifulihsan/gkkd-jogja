jun.PahChartTypesWin = Ext.extend(Ext.Window, {
    title:'PahChartTypes',
    modez:1,
    width:400,
    height:300,
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
                id:'form-PahChartTypes',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'name',
                        hideLabel:false,
                        //hidden:true,
                        name:'name',
                        id:'nameid',
                        ref:'../name',
                        maxLength:60,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'class_id',
                        store:jun.rztPahChartClass,
                        hiddenName:'class_id',
                        hiddenValue:'class_id',
                        valueField:'id',
                        //displayField: 'PahChartClass::model()->representingColumn()',
                        displayField:'class_name',
                        //allowBlank:false,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'parent',
                        hideLabel:false,
                        //hidden:true,
                        name:'parent',
                        id:'parentid',
                        ref:'../parent',
                        maxLength:10,
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'inactive',
                        hideLabel:false,
                        //hidden:true,
                        name:'inactive',
                        id:'inactiveid',
                        ref:'../inactive',
                        //allowBlank: ,
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
        jun.PahChartTypesWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokHarapan/PahChartTypes/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahChartTypes/create/';
        }
        Ext.getCmp('form-PahChartTypes').getForm().submit({
            url:urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
//
            scope:this,
            success:function (f, a) {
                jun.rztPahChartTypes.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahChartTypes').getForm().reset();
                    }
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