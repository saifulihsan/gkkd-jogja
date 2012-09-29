jun.SecurityRolesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.SecurityRolesstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'SecurityRolesStoreId',
            url: 'general/SecurityRoles/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'role'},
{name:'description'},
{name:'sections'},
{name:'areas'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztSecurityRoles = new jun.SecurityRolesstore();
//jun.rztSecurityRoles.load();
