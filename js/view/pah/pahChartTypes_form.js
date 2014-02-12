jun.PahChartTypesWin = Ext.extend(Ext.Window, {
    title: "PahChartTypes",
    modez: 1,
    width: 400,
    height: 300,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahChartTypes",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "textfield",
                fieldLabel: "name",
                hideLabel: !1,
                name: "name",
                id: "nameid",
                ref: "../name",
                maxLength: 60,
                anchor: "100%"
            }, {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "class_id",
                store: jun.rztPahChartClass,
                hiddenName: "class_id",
                hiddenValue: "class_id",
                valueField: "id",
                displayField: "class_name",
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "parent",
                hideLabel: !1,
                name: "parent",
                id: "parentid",
                ref: "../parent",
                maxLength: 10,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "inactive",
                hideLabel: !1,
                name: "inactive",
                id: "inactiveid",
                ref: "../inactive",
                anchor: "100%"
            } ]
        } ], this.fbar = {
            xtype: "toolbar",
            items: [ {
                xtype: "button",
                text: "Simpan",
                hidden: !1,
                ref: "../btnSave"
            }, {
                xtype: "button",
                text: "Simpan & Tutup",
                ref: "../btnSaveClose"
            }, {
                xtype: "button",
                text: "Batal",
                ref: "../btnCancel"
            } ]
        }, jun.PahChartTypesWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahChartTypes/update/id/" + this.id : a = "PondokHarapan/PahChartTypes/create/", 
        Ext.getCmp("form-PahChartTypes").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahChartTypes.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahChartTypes").getForm().reset());
            },
            failure: function (f, a) {
                switch (a.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert(a.response.statusText, a.response.responseText);
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', a.result.msg);
                }
            }
        });
    },
    onbtnSaveCloseClick: function() {
        this.closeForm = !0, this.saveForm(!0);
    },
    onbtnSaveclick: function() {
        this.closeForm = !1, this.saveForm(!1);
    },
    onbtnCancelclick: function() {
        this.close();
    }
});