jun.PahChartMasterWin = Ext.extend(Ext.Window, {
    title: "Kode Rekening",
    modez: 1,
    width: 450,
    height: 270,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahChartMaster",
            labelWidth: 125,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "textfield",
                fieldLabel: "Kode Rekening",
                hideLabel: !1,
                name: "account_code",
                id: "account_codeid",
                ref: "../account_code2",
                maxLength: 15,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Nama Rekening",
                hideLabel: !1,
                name: "account_name",
                id: "account_nameid",
                ref: "../account_name",
                maxLength: 60,
                anchor: "100%"
            }, {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Kelompok Rekening",
                store: jun.rztPahChartTypes,
                hiddenName: "account_type",
                hiddenValue: "account_type",
                valueField: "id",
                forceSelection: !0,
                displayField: "name",
                anchor: "100%"
            }, new jun.comboActive({
                fieldLabel: "Status",
                hideLabel: !1,
                lazyRender: !0,
                width: 100,
                height: 20,
                name: "inactive",
                id: "inactiveid",
                ref: "../cmbActive",
                hiddenName: "inactive",
                hiddenValue: "inactive"
            }), {
                xtype: "textarea",
                fieldLabel: "Deskripsi",
                hideLabel: !1,
                name: "description",
                id: "descriptionid",
                ref: "../description",
                height: 75,
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
        }, jun.PahChartMasterWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.modez == 1 || this.modez == 2 ? this.btnSave.setVisible(!1) : this.btnSave.setVisible(!0);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahChartMaster/update/id/" + this.id : a = "PondokHarapan/PahChartMaster/create/", 
        Ext.getCmp("form-PahChartMaster").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahChartMaster.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahChartMaster").getForm().reset(), this.btnDisabled(!1));
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
                this.btnDisabled(false);
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
}), jun.PahSaldoAwalWin = Ext.extend(Ext.Window, {
    title: "Saldo Awal",
    modez: 1,
    width: 350,
    height: 170,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    iswin: !0,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahSaldoAwal",
            labelWidth: 125,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../trans_date",
                fieldLabel: "Tanggal Transaksi",
                name: "trans_date",
                id: "trans_dateid",
                format: "d M Y",
                anchor: "100%"
            }, {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Kode Rekening",
                store: jun.rztPahChartMaster,
                hiddenName: "pah_chart_master_account_code",
                hiddenValue: "pah_chart_master_account_code",
                valueField: "account_code",
                tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', "</div></tpl>"),
                matchFieldWidth: !1,
                itemSelector: "div.search-item",
                editable: !0,
                listWidth: 300,
                displayField: "account_code",
                forceSelection: !0,
                anchor: "100%"
            }, {
                xtype: "numericfield",
                fieldLabel: "Jumlah",
                hideLabel: !1,
                name: "amount",
                id: "amountid",
                ref: "../amount",
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
                text: "Batal",
                ref: "../btnCancel"
            } ]
        }, jun.rztPahChartMaster.reload(), jun.PahSaldoAwalWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0), Ext.getCmp("form-PahSaldoAwal").getForm().submit({
            url: "PondokHarapan/PahChartMaster/SetSaldoAwal/",
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("form-PahSaldoAwal").getForm().reset(), this.close();
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
                this.btnDisabled(false);
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