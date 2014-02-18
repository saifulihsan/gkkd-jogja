jun.PeSubAktivitasWin = Ext.extend(Ext.Window, {
    title: "Sub Aktivitas",
    modez: 1,
    width: 400,
    height: 275,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PeSubAktivitas",
            labelWidth: 100,
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
                hiddenName: "account_code",
                hiddenValue: "account_code",
                valueField: "account_code",
                matchFieldWidth: !1,
                itemSelector: "div.search-item",
                tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', "</div></tpl>"),
                listWidth: 300,
                forceSelection: !0,
                displayField: "account_code",
                editable: !0,
                anchor: "100%",
                ref: "../cmbKode",
                lastQuery: ""
            }, {
                xtype: "textfield",
                fieldLabel: "Nama",
                hideLabel: !1,
                name: "nama",
                id: "namaid",
                ref: "../nama",
                maxLength: 50,
                anchor: "100%"
            }, new jun.comboActive({
                fieldLabel: "Status",
                hideLabel: !1,
                width: 100,
                height: 20,
                name: "inactive",
                id: "inactiveid",
                ref: "../cmbActive",
                hiddenName: "inactive",
                hiddenValue: "inactive"
            }), {
                xtype: "textarea",
                fieldLabel: "Keterangan",
                hideLabel: !1,
                name: "desc_",
                id: "desc_id",
                ref: "../desc",
                anchor: "100%",
                height: 100
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
        }, jun.rztPeChartMaster.reload(), jun.PeSubAktivitasWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.on("close", this.onWinClose, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.cmbKode.on("focus", this.onLoadChartMaster, this), 
        this.modez == 1 || this.modez == 2 ? this.btnSave.setVisible(!1) : this.btnSave.setVisible(!0);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onWinClose: function() {
        jun.rztPeChartMaster.clearFilter();
    },
    onLoadChartMaster: function() {
        jun.rztPeChartMaster.FilterData();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokEfata/PeSubAktivitas/update/id/" + this.id : a = "PondokEfata/PeSubAktivitas/create/", 
        Ext.getCmp("form-PeSubAktivitas").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPeSubAktivitas.reload();
                var c = Ext.decode(b.response.responseText);
                Ext.MessageBox.show({
                    title: "Info",
                    msg: c.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), this.modez == 0 && (Ext.getCmp("form-PeSubAktivitas").getForm().reset(), this.btnDisabled(!1)), 
                this.closeForm && this.close();
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