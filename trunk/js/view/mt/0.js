jun.renderMtChartType = function(val, meta, record) {
    //jun.rztMtChartTypes.reload();
    var store = jun.rztMtChartTypes;
    var index = store.find('id', val);
    var record = store.getAt(index);
    return record.data.name;
};
var renderMtChartMaster = function(val, meta, record) {
    //jun.rztMtChartMaster.reload();
    var store = jun.rztMtChartMaster;
    var index = store.find('account_code', val);
    var record = store.getAt(index);
    return record.data.account_name;
};
jun.getMobil = function(val) {
    var store = jun.rztMtMobil;
    var index = store.find('id_mobil', val);
    return store.getAt(index);
};
jun.getKelompokPelanggan = function(val) {
    var store = jun.rztMtKelompokPelanggan;
    var index = store.find('id_kelompok', val);
    return store.getAt(index);
};
jun.tandaPengenal = new Ext.data.ArrayStore({
    fields: ['tandaVal', 'tandaName'],
    data: [
        ['KTP', 'KTP'],
        ['SIM', 'SIM'],
        ['KTM', 'KTM'],
        ['PASPOR', 'PASPOR'],
        ['KITAS', 'KITAS'],
    ]
});
jun.comboTandaPengenal = Ext.extend(Ext.form.ComboBox, {
    displayField: 'tandaName',
    valueField: 'tandaVal',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
//    name: 'tanda_pengenal',
//    hiddenName: 'tanda_pengenal',
//    hiddenValue: 'tanda_pengenal',
    emptyText: 'Pilih tanda pengenal...',
    selectOnFocus: true,
    initComponent: function() {
        this.store = jun.tandaPengenal;
        jun.comboActive.superclass.initComponent.call(this);
    }
});
jun.storeSeason = new Ext.data.ArrayStore({
    fields: ['seasonVal', 'seasonName'],
    data: [
        [0, 'Low Season'],
        [1, 'High Season'],        
    ]
});
jun.cmbSeason = Ext.extend(Ext.form.ComboBox, {
    displayField: 'seasonName',
    valueField: 'seasonVal',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    name: 'season',
    hiddenName: 'season',
    hiddenValue: 'season',
    emptyText: 'Pilih season...',
    selectOnFocus: true,
    initComponent: function() {
        this.store = jun.storeSeason;
        jun.comboActive.superclass.initComponent.call(this);
    }
});
jun.storeJaminan = new Ext.data.ArrayStore({
    fields: ['jaminanVal', 'jaminanName'],
    data: [
        ['Kartu Keluarga', 'Kartu Keluarga'],
        ['Sepeda Motor', 'Sepeda Motor'],
        ['Sertifikat Tanah', 'Sertifikat Tanah'],
        ['Laptop', 'Laptop']
    ]
});
jun.cmbJaminan = Ext.extend(Ext.form.ComboBox, {
    displayField: 'jaminanName',
    valueField: 'jaminanVal',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
//    name: 'jaminan',
//    hiddenName: 'jaminan',
//    hiddenValue: 'jaminan',
    emptyText: 'Pilih jaminan...',
    selectOnFocus: true,
    initComponent: function() {
        this.store = jun.storeJaminan;
        jun.comboActive.superclass.initComponent.call(this);
    }
});