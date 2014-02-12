jun.pahKasAwalStore = new Ext.data.JsonStore({
    root: "data",
    storeId: "kasAwalStore",
    url: "PondokHarapan/PahbankTrans/view",
    fields: [ {
        name: "type"
    }, {
        name: "ref"
    }, {
        name: "tgl"
    }, {
        name: "debit"
    }, {
        name: "kredit"
    }, {
        name: "neraca"
    }, {
        name: "person"
    } ],
    autoLoad: !1,
    autoSave: !1
}), jun.PahKasAwalGrid = Ext.extend(Ext.grid.GridPanel, {
    id: "docs-jun.KasAwalGrid",
    frameHeader: !1,
    header: !1,
    modal: !0,
    viewConfig: {
        forceFit: !0,
        getRowClass: function(a, b) {
            var c = a.get("type");
            if (c.indexOf("Saldo Awal -") !== -1) return "x-row-bold";
            if (c.indexOf("Saldo Akhir -") !== -1) return "x-row-bold";
        }
    },
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: !0
    }),
    columns: [ {
        header: "Type",
        resizable: !0,
        dataIndex: "type"
    }, {
        header: "Reference",
        sortable: !0,
        resizable: !0,
        dataIndex: "ref"
    }, {
        header: "Tanggal",
        sortable: !0,
        resizable: !0,
        dataIndex: "tgl"
    }, {
        header: "Debit",
        sortable: !0,
        resizable: !0,
        dataIndex: "debit",
        align: "right"
    }, {
        header: "Kredit",
        sortable: !0,
        resizable: !0,
        dataIndex: "kredit",
        align: "right"
    }, {
        header: "Neraca",
        sortable: !0,
        resizable: !0,
        dataIndex: "neraca",
        align: "right"
    }, {
        header: "Person/Item",
        sortable: !0,
        resizable: !0,
        dataIndex: "person"
    } ],
    initComponent: function() {
        this.store = jun.pahKasAwalStore, this.store.on({
            load: {
                fn: function(a, b, c) {},
                scope: this
            },
            loadexception: {
                fn: function(a, b, c, d) {
                    console.info("store loadexception, arguments:", arguments), console.info("error = ", d);
                },
                scope: this
            }
        }), this.store.on("beforeload", function(a, b) {
            var c = Ext.getCmp("periode_bulanid").getValue(), d = Ext.getCmp("periode_tahunid").getValue(), e = new Date(d + "-" + c + "-01");
            b.params = {
                bank_act: null,
                from_date: e.format("Y-m-d"),
                to_date: e.format("Y-m-t")
            };
        }), jun.PahKasAwalGrid.superclass.initComponent.call(this), this.store.load();
    },
    onbtnPrintClick: function() {
        Ext.getCmp("form-PahChartTypes").getForm().submit({
            url: "PondokHarapan/PahBankTrans/print/",
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
        }), Ext.Ajax.request({
            waitMsg: "Please Wait",
            url: "PondokHarapan/PahBankTrans/print/",
            params: {
                bank_act: Ext.getCmp("bank_act_banktrans").getValue(),
                from_date: new Date(Ext.getCmp("from_date_banktrans").getValue()).dateFormat("Y-m-d"),
                to_date: new Date(Ext.getCmp("to_date_banktrans").getValue()).dateFormat("Y-m-d")
            },
            success: function(a) {},
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
    getrow: function(a, b, c) {
        this.record = c;
        var d = this.sm.getSelections();
    },
    onbtnRefreshClick: function() {
        this.store.load();
    },
    loadForm: function() {
        var a = new jun.BankTransWin({
            modez: 0
        });
        a.show();
    },
    loadEditForm: function() {
        var a = this.sm.getSelected();
        if (a == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var b = a.json.id, c = new jun.BankTransWin({
            modez: 1,
            id: b
        });
        c.show(this), c.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        Ext.MessageBox.confirm("Pertanyaan", "Apakah anda yakin ingin menghapus data ini?", this.deleteRecYes, this);
    },
    deleteRecYes: function(a) {
        if (a == "no") return;
        var b = this.sm.getSelected();
        if (b == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }
        Ext.Ajax.request({
            waitMsg: "Please Wait",
            url: "Wanted/BankTrans/delete/id/" + b.json.id,
            method: "POST",
            success: function(a) {
                jun.rztBankTrans.reload(), Ext.Msg.alert("Pelayanan", "Delete Berhasil");
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
    }
}), pahcheckPeriodeAnggaran = function() {
    Ext.Ajax.request({
        url: "PondokHarapan/PahAnggaran/IsPeriodeExist/",
        params: {
            bulan: Ext.getCmp("periode_bulanid").getValue(),
            tahun: Ext.getCmp("periode_tahunid").getValue()
        },
        method: "POST",
        success: function(a, b) {
            var c = Ext.decode(a.responseText);
            c.success == 0 && Ext.MessageBox.show({
                title: "Warning",
                msg: c.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            }), pahgetsaldo();
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
}, pahgetsaldo = function() {
    Ext.Ajax.request({
        url: "PondokHarapan/PahAnggaran/getSaldo/",
        params: {
            bulan: Ext.getCmp("periode_bulanid").getValue(),
            tahun: Ext.getCmp("periode_tahunid").getValue()
        },
        method: "POST",
        success: function(a, b) {
            var c = Ext.decode(a.responseText);
            c.success == 0 ? Ext.MessageBox.show({
                title: "Warning",
                msg: c.msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            }) : (Ext.getCmp("saldoawalid").setValue(c.sisa), Ext.get("saldoawalid").focus(), 
            Ext.getCmp("kasmasukid").setValue(c.current), Ext.get("kasmasukid").focus(), Ext.getCmp("totalangid").setValue(c.total), 
            Ext.get("totalangid").focus(), Ext.get("doc_refid").focus(), jun.rztPahAnggaranDetil.refreshData());
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
}, jun.PahAnggaranWin = Ext.extend(Ext.Window, {
    title: "Anggaran",
    iconCls: "asp-pay",
    modez: 1,
    width: 621,
    height: 455,
    layout: "form",
    modal: !0,
    padding: 5,
    closeForm: !1,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-PahAnggaran",
            layout: "absolute",
            ref: "formz",
            border: !1,
            anchor: "100% 100%",
            items: [ {
                xtype: "label",
                text: "Ref. Dokumen:",
                x: 5,
                y: 5
            }, {
                xtype: "textfield",
                x: 85,
                y: 2,
                height: 20,
                width: 100,
                hideLabel: !1,
                name: "doc_ref",
                id: "doc_refid",
                ref: "../doc_ref",
                maxLength: 15,
                readOnly: !0
            }, {
                xtype: "label",
                text: "Periode Bulan:",
                x: 195,
                y: 5
            }, new jun.comboBulan({
                x: 275,
                y: 2,
                width: 100,
                height: 20,
                ref: "../cmbBulan",
                id: "periode_bulanid",
                name: "periode_bulan",
                hiddenName: "periode_bulan",
                hiddenValue: "periode_bulan"
            }), {
                xtype: "label",
                text: "Periode Tahun:",
                x: 385,
                y: 5
            }, {
                xtype: "spinnerfield",
                fieldLabel: "periode_tahun",
                hideLabel: !1,
                name: "periode_tahun",
                id: "periode_tahunid",
                ref: "../periode_tahun",
                maxLength: 4,
                minValue: 2e3,
                maxValue: 3e3,
                defaultValue: 2012,
                x: 465,
                y: 2,
                width: 100,
                onBlur: pahcheckPeriodeAnggaran
            }, {
                xtype: "label",
                text: "Saldo Kas Awal Bulan (Sisa anggaran bulan lalu):",
                x: 5,
                y: 35
            }, {
                xtype: "numericfield",
                x: 275,
                y: 32,
                name: "saldoawal",
                id: "saldoawalid",
                ref: "../saldoawal",
                readOnly: !0,
                anchor: "100%"
            }, {
                xtype: "label",
                text: "Penerimaan Kas Bulan Ini:",
                x: 5,
                y: 65
            }, {
                xtype: "numericfield",
                x: 275,
                y: 62,
                width: 275,
                name: "kasmasuk",
                id: "kasmasukid",
                ref: "../kasmasuk",
                readOnly: !0
            }, {
                xtype: "button",
                x: 556,
                y: 62,
                iconCls: "silk-information",
                name: "Detil",
                id: "Detilid",
                ref: "../btnDetil",
                anchor: "100%"
            }, {
                xtype: "label",
                text: "Total Anggaran untuk Dialokasikan:",
                x: 5,
                y: 95
            }, {
                xtype: "numericfield",
                x: 275,
                y: 92,
                name: "totalang",
                id: "totalangid",
                ref: "../totalang",
                readOnly: !0,
                anchor: "100%"
            }, {
                xtype: "label",
                text: "Total Anggaran Sudah Dialokasikan:",
                x: 5,
                y: 330
            }, {
                xtype: "numericfield",
                x: 275,
                y: 327,
                name: "totalangsud",
                id: "totalangsudid",
                ref: "../totalangsud",
                readOnly: !0,
                anchor: "100%"
            }, {
                xtype: "label",
                text: "Total Anggaran Belum Dialokasikan:",
                x: 5,
                y: 360
            }, {
                xtype: "numericfield",
                x: 275,
                y: 357,
                name: "totalangblm",
                id: "totalangblmid",
                ref: "../totalangblm",
                readOnly: !0,
                anchor: "100%"
            }, new jun.PahAnggaranDetilGrid({
                x: 5,
                y: 122,
                height: 200,
                frameHeader: !1,
                header: !1
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
        }, jun.rztPahAnggaranDetil.removeAll(), jun.rztPahChartMaster.reload(), jun.PahAnggaranWin.superclass.initComponent.call(this), 
        this.on("activate", this.onActivate, this), this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), 
        this.btnSave.on("click", this.onbtnSaveclick, this), this.btnCancel.on("click", this.onbtnCancelclick, this), 
        this.cmbBulan.on("select", this.oncmbBulanchange, this), this.periode_tahun.on("spin", this.onperiodetahunchange, this), 
        this.btnDetil.on("click", this.onbtnDetilclick, this);
        if (this.modez == 1 || this.modez == 2) jun.rztPahAnggaranDetil.proxy = new Ext.data.HttpProxy({
            url: "PondokHarapan/PahAnggaranDetil/index/id/" + this.id + "/?output=json"
        }), jun.rztPahAnggaranDetil.on({
            load: {
                fn: function(a, b, c) {
                    jun.rztPahAnggaranDetil.refreshData();
                }
            }
        }), jun.rztPahAnggaranDetil.load(), this.cmbBulan.readOnly = !0, this.periode_tahun.readOnly = !0;
        this.modez == 1 || this.modez == 2 ? this.btnSave.setVisible(!1) : this.btnSave.setVisible(!0);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onbtnDetilclick: function() {
        if (Ext.getCmp("periode_bulanid").getValue() == "" || Ext.getCmp("periode_tahunid").getValue() == "") {
            Ext.MessageBox.show({
                title: "Warning",
                msg: "Silahkan pilih bulan dan tahun anggaran terlebih dahulu.",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        win = new Ext.Window({
            layout: "fit",
            title: "Detil Mutasi Kas",
            modal: !0,
            width: 750,
            height: 400,
            items: new jun.PahKasAwalGrid(),
            buttons: [ {
                text: "Tutup",
                handler: function() {
                    win.close();
                }
            } ]
        }), win.show();
    },
    onperiodetahunchange: function() {
        if (Ext.getCmp("periode_tahunid").getValue() == "" || this.cmbBulan.value == undefined) return;
        this.periode_tahun.focus();
    },
    oncmbBulanchange: function() {
        var a = Ext.getCmp("periode_tahunid").getValue();
        if (Ext.getCmp("periode_tahunid").getValue() == "" || this.cmbBulan.value == undefined) return;
        pahcheckPeriodeAnggaran();
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "PondokHarapan/PahAnggaran/update/" : (Ext.Ajax.request({
            url: "PondokHarapan/PahAnggaran/IsPeriodeExist/",
            params: {
                bulan: this.cmbBulan.value,
                tahun: this.periode_tahun.defaultValue
            },
            method: "POST",
            success: function(a, b) {
                var c = Ext.decode(a.responseText);
                if (c.success == 0) {
                    Ext.MessageBox.show({
                        title: "Warning",
                        msg: c.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
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
        }), a = "PondokHarapan/PahAnggaran/create/"), Ext.getCmp("form-PahAnggaran").getForm().submit({
            url: a,
            params: {
                bulanStr: this.cmbBulan.getRawValue(),
                detil: Ext.encode(Ext.pluck(jun.rztPahAnggaranDetil.data.items, "data")),
                id: this.id
            },
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                var c = Ext.decode(b.response.responseText);
                if (c.success == 0) {
                    Ext.MessageBox.show({
                        title: "Anggaran",
                        msg: "Anggaran bulan " + c.bulan + " tahun " + c.tahun + " gagal disimpan.<br /> Alasan : " + c.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    }), this.btnDisabled(!1);
                    return;
                }
                this.modez == 0 && (Ext.MessageBox.show({
                    title: "Anggaran",
                    msg: "Anggaran bulan " + c.bulan + " tahun " + c.tahun + " berhasil disimpan.<br /> Ref. Dokumen : " + c.id,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                }), Ext.getCmp("form-PahAnggaran").getForm().reset(), this.btnDisabled(!1)), jun.rztPahAnggaran.reload(), 
                this.close();
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
    onloadrecordupdate: function() {
        pahgetsaldo();
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