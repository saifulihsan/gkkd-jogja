jun.MtGlTransstore = Ext.extend(Ext.data.JsonStore, {
			constructor : function(cfg) {
				cfg = cfg || {};
				jun.MtGlTransstore.superclass.constructor.call(this, Ext.apply(
								{
									storeId : 'MtGlTransStoreId',
									autoLoad : false,
									autoSave : false,
									root : 'results',
									totalProperty : 'total',
									fields : [{
												name : 'counter'
											}, {
												name : 'account'
											}, {
												name : 'debit',
												type : 'float'
											}, {
												name : 'kredit',
												type : 'float'
											}, {
												name : 'id_mobil'												
											}
											]
								}, cfg));
			},
			refreshData : function() {
				Ext.getCmp('tot_debit_id').setValue(this.sum('debit'));
				Ext.getCmp('tot_kredit_id').setValue(this.sum('kredit'));
			}
		});
jun.rztMtGlTrans = new jun.MtGlTransstore();
