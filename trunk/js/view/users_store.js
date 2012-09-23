jun.Usersstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Usersstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'UsersStoreId',
            url: 'general/Users/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'user_id'},
{name:'password'},
{name:'role_id'},
{name:'last_visit_date'},
{name:'inactive'},
{name:'nij'},
                
            ]
        }, cfg));
    }
});
jun.rztUsers = new jun.Usersstore();
jun.rztUsers.load();
