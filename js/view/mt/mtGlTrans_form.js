jun.MtGlTransWin = Ext.extend(Ext.Window, {
    title: "Jurnal Umum",
    modez: 1,
    width: 800,
    height: 455,
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
            id: "form-MtGlTrans",
            labelWidth: 150,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "xdatefield",
                ref: "../tran_date",
                fieldLabel: "Tanggal Transaksi",
                name: "tran_date",
                id: "tran_dateid",
                format: "d M Y"
            }, new jun.MtGlTransGrid({
                height: 285,
                frameHeader: !1,
                header: !1
            }), {
                xtype: "numericfield",
                fieldLabel: "Total Debit",
                hideLabel: !1,
                name: "tot_debit",
                id: "tot_debit_id",
                readOnly: !0,
                ref: "../TotDebit"
            }, {
                xtype: "numericfield",
                fieldLabel: "Total Kredit",
                hideLabel: !1,
                name: "tot_kredit",
                id: "tot_kredit_id",
                readOnly: !0,
                ref: "../TotKredit"
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
        }, jun.rztMtGlTrans.removeAll(), jun.MtGlTransWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    onActivate: function() {
        this.btnSave.hidden = !1, jun.rztMtGlTrans.refreshData();
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    saveForm: function() {
        this.btnDisabled(!0);
        if (this.TotDebit.value != this.TotKredit.value) {
            Ext.MessageBox.alert("Error", "Total Debit dan Total Kredit harus sama."), this.btnDisabled(!1);
            return;
        }
        if (parseFloat(this.TotDebit.value) === 0 || parseFloat(this.TotKredit.value) === 0) {
            Ext.MessageBox.alert("Error", "Total Debit atau Total Kredit tidak boleh nol."), 
            this.btnDisabled(!1);
            return;
        }
        Ext.getCmp("form-MtGlTrans").getForm().submit({
            url: "Mahkotrans/MtGlTrans/CreateJurnalUmum?output=json",
            params: {
                detil: Ext.encode(Ext.pluck(jun.rztMtGlTrans.data.items, "data"))
            },
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                this.btnDisabled(!1);
                if (c.success == 0) {
                    Ext.MessageBox.show({
                        title: "Jurnal Umum",
                        msg: "Jurnal umum gagal disimpan.<br /> Alasan :" + c.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    return;
                }
                Ext.MessageBox.show({
                    title: "Jurnal Umum",
                    msg: c.msg + "<br /> Ref. Dokumen : " + c.id,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("form-MtGlTrans").getForm().reset(), jun.rztMtGlTrans.removeAll(), 
                this.close();
            },
            failure: function(a, b) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server"), this.btnDisabled(!1);
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
}), jun.MtGlTransDetilWin = Ext.extend(Ext.Window, {
    title: "Alokasi",
    modez: 1,
    width: 335,
    height: 165,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    debit: !0,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-MtGlTransDetil",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            ref: "formz",
            border: !1,
            items: [ {
                xtype: "combo",
                ref: "../cmbkode",
                typeAhead: !0,
                triggerAction: "all",
                allowBlank: !1,
                forceSelection: !0,
                mode: "local",
                fieldLabel: "Kode Rekening",
                store: jun.rztMtChartMaster,
                hiddenName: "mt_chart_master_account_code",
                hiddenValue: "mt_chart_master_account_code",
                valueField: "account_code",
                matchFieldWidth: !1,
                itemSelector: "div.search-item",
                tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', "</div></tpl>"),
                displayField: "account_code",
                listWidth: 300,
                anchor: "100%",
                lastQuery: ""
            }, {
                xtype: "combo",
                ref: "../mobil",
                typeAhead: !0,
                triggerAction: "all",
                lazyRender: !0,
                mode: "local",
                fieldLabel: "No. Polisi",
                store: jun.rztMtMobil,
                hiddenName: "id_mobil",
                hiddenValue: "id_mobil",
                valueField: "id_mobil",
                displayField: "nopol",
                allowBlank: !0,
                anchor: "100%"
            }, {
                xtype: "numericfield",
                fieldLabel: "Jumlah",
                hideLabel: !1,
                name: "amount",
                id: "amountid",
                ref: "../amount",
                maxLength: 30,
                value: 0,
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
        }, jun.rztMtMobil.reload(), jun.rztMtChartMaster.reload(), jun.MtGlTransDetilWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnCancel.on("click", this.onbtnCancelclick, this), 
        this.cmbkode.on("focus", this.onLoadChartMaster, this), this.on("close", this.onWinClose, this);
    },
    onLoadChartMaster: function() {
        jun.rztMtChartMaster.FilterData();
    },
    onWinClose: function() {
        jun.rztMtChartMaster.clearFilter();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        if (parseFloat(this.amount.value) === 0) {
            Ext.MessageBox.alert("Error", "Jumlah tidak boleh 0");
            return;
        }
        var a = jun.rztMtGlTrans.find("account", this.cmbkode.value);
        if (a > -1 && this.modez == 0) {
            Ext.MessageBox.show({
                title: "Error",
                msg: "Kode rekening sudah di dipakai!",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            return;
        }
        var b = jun.rztMtGlTrans.recordType, c = new b({
            account: this.cmbkode.value,
            debit: this.debit ? parseFloat(this.amount.value) : 0,
            kredit: this.debit ? 0 : parseFloat(this.amount.value),
            id_mobil: this.mobil.value
        });
        jun.rztMtGlTrans.insert(jun.rztMtGlTrans.getCount(), c), jun.rztMtGlTrans.refreshData(), 
        Ext.getCmp("form-MtGlTransDetil").getForm().reset(), this.closeForm && this.close();
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