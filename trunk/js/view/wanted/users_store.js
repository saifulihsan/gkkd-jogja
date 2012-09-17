jun.Usersstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Usersstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'UsersStoreId',
            url: 'Wanted/Users/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'user_id'},
{name:'password'},
{name:'real_name'},
{name:'role_id'},
{name:'phone'},
{name:'email'},
{name:'language'},
{name:'date_format'},
{name:'date_sep'},
{name:'tho_sep'},
{name:'dec_sep'},
{name:'theme'},
{name:'page_size'},
{name:'prices_dec'},
{name:'qty_dec'},
{name:'rates_dec'},
{name:'percent_dec'},
{name:'show_gl'},
{name:'show_codes'},
{name:'show_hints'},
{name:'last_visit_date'},
{name:'query_size'},
{name:'graphic_links'},
{name:'pos'},
{name:'print_profile'},
{name:'rep_popup'},
{name:'sticky_doc_date'},
{name:'startup_tab'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztUsers = new jun.Usersstore();
jun.rztUsers.load();
