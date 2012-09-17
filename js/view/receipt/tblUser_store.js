jun.TblUserstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.TblUserstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'TblUserStoreId',
            url: 'user/TblUser/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'username'},
{name:'password'},
{name:'email'},
{name:'level'},
{name:'nick'},
{name:'complete'},
                
            ]
        }, cfg));
    }
});
jun.rztTblUser = new jun.TblUserstore();
jun.rztTblUser.load();
