jun.PahGlTransWin = Ext.extend(Ext.Window, {
    title: "PahGlTrans",
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
            id: "form-PahGlTrans",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "textfield",
                fieldLabel: "type",
                hideLabel: !1,
                name: "type",
                id: "typeid",
                ref: "../type",
                maxLength: 6,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "type_no",
                hideLabel: !1,
                name: "type_no",
                id: "type_noid",
                ref: "../type_no",
                maxLength: 11,
                anchor: "100%"
            }, {
                xtype: "datefield",
                ref: "../tran_date",
                fieldLabel: "tran_date",
                name: "tran_date",
                id: "tran_dateid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "account",
                store: jun.rztPahChartMaster,
                hiddenName: "account",
                hiddenValue: "account",
                valueField: "account_code",
                displayField: "account_code2",
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "memo_",
                hideLabel: !1,
                name: "memo_",
                id: "memo_id",
                ref: "../memo_",
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "amount",
                hideLabel: !1,
                name: "amount",
                id: "amountid",
                ref: "../amount",
                maxLength: 30,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "person_type_id",
                hideLabel: !1,
                name: "person_type_id",
                id: "person_type_idid",
                ref: "../person_type_id",
                maxLength: 11,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "person_id",
                hideLabel: !1,
                name: "person_id",
                id: "person_idid",
                ref: "../person_id",
                maxLength: 30,
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
        }, jun.PahGlTransWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahGlTrans/update/id/" + this.id : a = "PondokHarapan/PahGlTrans/create/", 
        Ext.getCmp("form-PahGlTrans").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahGlTrans.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahGlTrans").getForm().reset());
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