jun.PahDonaturWin = Ext.extend(Ext.Window, {
    title: "Donatur",
    modez: 1,
    width: 400,
    height: 290,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahDonatur",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "textfield",
                fieldLabel: "Nama Donatur",
                hideLabel: !1,
                name: "name",
                id: "nameid",
                ref: "../name",
                maxLength: 50,
                anchor: "100%"
            }, {
                xtype: "textfield",
                fieldLabel: "Telepon",
                hideLabel: !1,
                name: "phone",
                id: "phoneid",
                ref: "../phone",
                maxLength: 30,
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
                fieldLabel: "Alamat",
                hideLabel: !1,
                name: "alamat",
                id: "alamatid",
                ref: "../alamat",
                anchor: "100%",
                height: 100
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
                anchor: "100%",
                editable: !1,
                ref: "../cmbkode",
                lastQuery: ""
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
        }, jun.rztPahChartMaster.reload(), jun.PahDonaturWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.on("close", this.onWinClose, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this), this.cmbkode.on("focus", this.onLoadChartMaster, this);
    },
    onLoadChartMaster: function() {
        jun.rztPahChartMaster.FilterData();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    onWinClose: function() {
        jun.rztPahChartMaster.clearFilter();
    },
    saveForm: function() {
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahDonatur/update/id/" + this.id : a = "PondokHarapan/PahDonatur/create/", 
        Ext.getCmp("form-PahDonatur").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztPahDonatur.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-PahDonatur").getForm().reset());
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