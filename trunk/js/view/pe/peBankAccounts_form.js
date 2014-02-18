jun.PeBankAccountsWin = Ext.extend(Ext.Window, {
    title: "Kas dan Bank",
    modez: 1,
    width: 425,
    height: 320,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PeBankAccounts",
            labelWidth: 125,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "combo",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "Kode Rekening",
                store: jun.rztPeChartMaster,
                forceSelection: !0,
                hiddenName: "account_code",
                hiddenValue: "account_code",
                valueField: "account_code",
                matchFieldWidth: !1,
                itemSelector: "div.search-item",
                tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', "</div></tpl>"),
                displayField: "account_code",
                listWidth: 300,
                editable: !0,
                anchor: "100%",
                ref: "../cmbKode",
                lastQuery: ""
            }, {
                xtype: "textfield",
                fieldLabel: "Kas/Bank",
                hideLabel: !1,
                name: "bank_account_name",
                id: "bank_account_nameid",
                ref: "../bank_account_name",
                maxLength: 60,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Nama Bank",
                hideLabel: !1,
                name: "bank_name",
                id: "bank_nameid",
                ref: "../bank_name",
                maxLength: 60,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Nomer Rekening Bank",
                hideLabel: !1,
                name: "bank_account_number",
                id: "bank_account_numberid",
                ref: "../bank_account_number",
                maxLength: 100,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Atas Nama",
                hideLabel: !1,
                name: "atas_nama",
                id: "atas_namaid",
                ref: "../atas_nama",
                maxLength: 50,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Telepon",
                hideLabel: !1,
                name: "bank_phone",
                id: "bank_phoneid",
                ref: "../bank_phone",
                maxLength: 50,
                anchor: "100%"
            }, {
                xtype: "textarea",
                fieldLabel: "Alamat Bank",
                hideLabel: !1,
                name: "bank_address",
                id: "bank_addressid",
                ref: "../bank_address",
                anchor: "100%",
                height: 50
            }, new jun.comboActive({
                fieldLabel: "Status",
                hideLabel: !1,
                width: 100,
                height: 20,
                name: "inactive",
                id: "inactiveid",
                ref: "../inactive",
                hiddenName: "inactive",
                hiddenValue: "inactive"
            }) ]
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
        }, jun.rztPeChartMaster.reload(), jun.PeBankAccountsWin.superclass.initComponent.call(this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.cmbKode.on("focus", this.onLoadBank, this), 
        this.modez == 1 || this.modez == 2 ? this.btnSave.setVisible(!1) : this.btnSave.setVisible(!0);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onLoadBank: function() {
        jun.rztPeChartMaster.FilterData();
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokEfata/PeBankAccounts/update/id/" + this.id : a = "PondokEfata/PeBankAccounts/create/", 
        Ext.getCmp("form-PeBankAccounts").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), this.modez == 0 && Ext.getCmp("form-PeBankAccounts").getForm().reset(), jun.rztPeBankAccounts.reload(), 
                this.btnDisabled(!1), this.closeForm && this.close();
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