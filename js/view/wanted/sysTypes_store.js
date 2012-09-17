jun.SysTypesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.SysTypesstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'SysTypesStoreId',
            url: 'Wanted/SysTypes/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'type_id'},
{name:'type_no'},
{name:'next_reference'},
                
            ]
        }, cfg));
    }
});
jun.rztSysTypes = new jun.SysTypesstore();
jun.rztSysTypes.load();
