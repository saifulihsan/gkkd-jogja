jun.<?php echo $this->modelClass; ?>Win = Ext.extend(Ext.Window, {
    title: '<?php echo $this->modelClass; ?>',
    modez:1,
    width: 400,
    height: 300,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,    
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #DFE8F6; padding: 10px',
                id:'form-<?php echo $this->modelClass; ?>',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref:'formz',
                border:false,
                items: [
                <?php foreach ($this->tableSchema->columns as $column): ?>
                <?php if (!$column->isPrimaryKey): ?>
                    <?php echo " " . $this->generateExtField($this->modelClass, $column) . " \n"; ?>
                <?php endif; ?>
                <?php endforeach; ?>
                   
                  ]
            }];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref:'../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.<?php echo $this->modelClass; ?>Win.superclass.initComponent.call(this);
//        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        if (this.modez == 1 || this.modez == 2) {
            this.btnSave.setVisible(false);
        } else {
            this.btnSave.setVisible(true);
        }
    },

    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
            
    saveForm : function()
    {
        this.btnDisabled(true);
            var urlz;
            if(this.modez == 1 || this.modez== 2) {
                    
                    urlz= '<?php echo $this->getModule()->getName();?>/<?php echo $this->modelClass; ?>/update/id/' + this.id;
                    
                } else {
                    
                    urlz= '<?php echo $this->getModule()->getName();?>/<?php echo $this->modelClass; ?>/create/';
                }
             
            Ext.getCmp('form-<?php echo $this->modelClass; ?>').getForm().submit({
                url:urlz,
                timeOut: 1000,
                scope: this,
                success: function(f,a){
                    jun.rzt<?php echo $this->modelClass; ?>.reload();
                    var response = Ext.decode(a.response.responseText);
                    Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                    });
                    if(this.modez == 0){
                        Ext.getCmp('form-<?php echo $this->modelClass; ?>').getForm().reset();
                        this.btnDisabled(false);
                    }
                    if(this.closeForm){
                        this.close();
                    }
                },
                failure:function (f, a) {
                    var response = Ext.decode(a.response.responseText);
                    Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                    });
                    this.btnDisabled(false);
                }

            });

    },
    
    onbtnSaveCloseClick: function()
    {
        this.closeForm = true;
        this.saveForm(true);
    },
    
    onbtnSaveclick: function()
    {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function(){
        this.close();
    }
   
});