jun.Usersstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.Usersstore.superclass.constructor.call(this, Ext.apply({
            storeId:'UsersStoreId',
            url:'general/Users/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'user_id'},
                {name:'password'},
                {name:'last_visit_date'},
                {name:'inactive'},
                {name:'nij'},
                {name:'security_roles_id'},
            ]
        }, cfg));
    }
});
jun.rztUsers = new jun.Usersstore();
//jun.rztUsers.load();
