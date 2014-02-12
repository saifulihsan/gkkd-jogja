jun.SecurityRolesWin = Ext.extend(Ext.Window, {
    title: "Hak Akses",
    modez: 1,
    width: 400,
    height: 500,
    layout: "form",
    modal: !0,
    padding: 3,
    closeForm: !1,
    iswin: !0,
    initComponent: function() {
        this.items = [ {
            xtype: "form",
            frame: !1,
            bodyStyle: "background-color: #E4E4E4; padding: 10px",
            id: "form-SecurityRoles",
            labelWidth: 100,
            labelAlign: "left",
            layout: "accordion",
            ref: "formz",
            border: !1,
            anchor: "100% 100%",
            items: [ {
                xtype: "panel",
                title: "Deskripsi",
                layout: "form",
                bodyStyle: "background-color: #E4E4E4; padding: 10px",
                items: [ {
                    xtype: "textfield",
                    fieldLabel: "Nama",
                    hideLabel: !1,
                    name: "role",
                    id: "roleid",
                    ref: "../role",
                    maxLength: 30,
                    anchor: "100%"
                }, {
                    xtype: "textfield",
                    fieldLabel: "Deskripsi",
                    hideLabel: !1,
                    name: "description",
                    id: "descriptionid",
                    ref: "../description",
                    maxLength: 50,
                    anchor: "100%"
                } ]
            }, {
                xtype: "panel",
                title: "Pondok Asuh Harapan",
                layout: "form",
                bodyStyle: "background-color: #E4E4E4; padding: 10px",
                defaultType: "checkbox",
                items: [ {
                    fieldLabel: "Master",
                    labelSeparator: "",
                    boxLabel: "Kode Rekening (Grid)",
                    name: "fav-animal-cat"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Kode Rekening (Add)",
                    name: "kodeadd"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Kode Rekening (Edit)",
                    name: "kodeedit"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Kas dan Bank (Grid)",
                    name: "kas"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Kas dan Bank (Add)",
                    name: "kasadd"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Kas dan Bank (Edit)",
                    name: "kasedit"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Anak (Grid)",
                    name: "anak"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Anak (Add)",
                    name: "anakadd"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Anak (Edit)",
                    name: "anakedit"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Grup Anak",
                    name: "grup"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Pemasok",
                    name: "pemasok"
                }, {
                    fieldLabel: "",
                    labelSeparator: "",
                    boxLabel: "Sub Aktivitas",
                    name: "sub"
                } ]
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
        }, jun.SecurityRolesWin.superclass.initComponent.call(this), this.on("activate", this.onActivate, this), 
        this.btnSaveClose.on("click", this.onbtnSaveCloseClick, this), this.btnSave.on("click", this.onbtnSaveclick, this), 
        this.btnCancel.on("click", this.onbtnCancelclick, this);
    },
    btnDisabled: function(a) {
        this.btnSave.setDisabled(a), this.btnSaveClose.setDisabled(a);
    },
    onActivate: function() {
        this.btnSave.hidden = !1;
    },
    saveForm: function() {
        this.btnDisabled(!0);
        var a;
        this.modez == 1 || this.modez == 2 ? a = "general/SecurityRoles/update/id/" + this.id : a = "general/SecurityRoles/create/", 
        Ext.getCmp("form-SecurityRoles").getForm().submit({
            url: a,
            timeOut: 1e3,
            scope: this,
            success: function(a, b) {
                jun.rztSecurityRoles.reload();
                var c = Ext.decode(b.response.responseText);
                this.closeForm ? this.close() : (c.data != undefined && Ext.MessageBox.alert("Pelayanan", c.data.msg), 
                this.modez == 0 && Ext.getCmp("form-SecurityRoles").getForm().reset()), this.btnDisabled(!1);
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
});