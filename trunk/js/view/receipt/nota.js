jun.Nota=Ext.extend(Ext.Window, {
    title: 'Nota',
    height: 381,
    width: 826,
    modez:1,
    layout: 'absolute',
    bodyPadding: 10,
    closable: true,
    //title: 'My Form',
    initComponent: function() {
        this.items = [
                {
                xtype: 'form',                
                frame: false,
                bodyStyle: 'background-color: #DFE8F6; padding: 10px',
                id:'form-Nota-new',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items:[{
                    xtype: 'datefield',
                    x: 10,
                    y: 40,
                    width: 200,
                    fieldLabel: 'Tanggal',
                    labelPad: 0,
                    labelWidth: 75
                },
                {
                    xtype:'gridpanel',
                    x: 10,
                    y: 70,
                    height: 160,
                    frameHeader: false,
                    header: false,
                    title: 'My Grid Panel',
                    hideHeaders: false,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'String'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'number',
                            text: 'Number'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'date',
                            text: 'Date'
                        },
                        {
                            xtype: 'booleancolumn',
                            dataIndex: 'bool',
                            text: 'Boolean'
                        }
                    ],
                    viewConfig: {

                    }
                },
                {
                    xtype: 'combobox',
                    x: 270,
                    y: 10,
                    fieldLabel: 'Sales',
                    labelPad: 0,
                    labelWidth: 75
                },
                {
                    xtype: 'combobox',
                    x: 270,
                    y: 40,
                    fieldLabel: 'Pelanggan',
                    labelPad: 0,
                    labelWidth: 75
                },
                {
                    xtype: 'numberfield',
                    x: 570,
                    y: 240,
                    fieldLabel: 'Total',
                    labelPad: 0,
                    hideTrigger: true
                },
                {
                    xtype: 'numberfield',
                    x: 570,
                    y: 288,
                    fieldLabel: 'Grand Total',
                    labelPad: 0,
                    hideTrigger: true
                },
                {
                    xtype: 'numberfield',
                    x: 570,
                    y: 264,
                    fieldLabel: 'Jumlah Diskon',
                    labelPad: 0,
                    hideTrigger: true
                },
                {
                    xtype: 'button',
                    x: 690,
                    y: 320,
                    width: 110,
                    text: 'Cancel'
                },
                {
                    xtype: 'button',
                    x: 570,
                    y: 320,
                    width: 110,
                    text: 'Save & Close'
                },
                {
                    xtype: 'button',
                    x: 450,
                    y: 320,
                    width: 110,
                    text: 'Save'
                },
                {
                    xtype: 'textfield',
                    x: 10,
                    y: 10,
                    fieldLabel: 'Reference',
                    labelPad: 0,
                    labelWidth: 75
                }
            ]
        }];       
        
        jun.Nota.superclass.initComponent.call(this);
        
	}
        
    });