// Create a variable to hold our EXT Form Panel.
// Assign various config options as seen.
jun.login = new Ext.extend(Ext.Window, {
    //labelWidth:80,
    width:300,
    height:140,
    layout:'form',
    url:'site/authLogin/',
    modal:true,
    closable:false,
    resizable:false,
    plain:true,
    border:false,
    title:'Please Login',
    padding:5,
    //defaultType:'textfield',
    //id:'form-Login',
    // Specific attributes for the text fields for username / password.
    // The "name" attribute defines the name of variables sent to the server.
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-Login',
                //labelWidth: 100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                plain:true,
                items:[
                    {
                        xtype:'textfield',
                        hideLabel:false,
                        //hidden:true,
                        id:'usernameid',
                        ref:'../username',
                        maxLength:128,
                        //allowBlank: ,
                        anchor:'100%',
                        fieldLabel:'Username',
                        name:'loginUsername',
                        allowBlank:false
                    },
                    {
                        xtype:'textfield',
                        hideLabel:false,
                        //hidden:true,
                        id:'passwordid',
                        ref:'../password',
                        maxLength:128,
                        //allowBlank: ,
                        anchor:'100%',
                        fieldLabel:'Password',
                        name:'loginPassword',
                        inputType:'password',
                        allowBlank:false
                    }
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Login',
                    hidden:false,
                    ref:'../btnLogin'
                }
            ]
        };
        jun.login.superclass.initComponent.call(this);
        this.btnLogin.on('click', this.onbtnLoginClick, this);
    },
    onbtnLoginClick:function () {
        Ext.getCmp('form-Login').getForm().submit({
            //method:'POST',
            url:'site/login',
            waitTitle:'Connecting',
            waitMsg:'Sending data...',
            success:function () {
                var redirect = 'index.php';
                window.location = redirect;
                //Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
//				   if (btn == 'ok'){
//		                        var redirect = 'test.asp'; 
//		                        window.location = redirect;
//                                   }
//			        });
            },
            failure:function (form, action) {
                if (action.failureType == 'server') {
                    obj = Ext.util.JSON.decode(action.response.responseText);
                    Ext.Msg.alert('Login Failed!', obj.errors.reason);
                } else {
                    Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText);
                }
                login.getForm().reset();
            }
        });
    }
    // All the magic happens after the user clicks the button
    //this.buttons = [{
//                text:'Login',
//                formBind: true,
//                scope: this,	 
//                // Function that fires when user clicks the button 
//                handler:function(){ 
//                    
//                    
//                } 
});
jun.ViewportUi = Ext.extend(Ext.Viewport, {
    layout:'border',
    initComponent:function () {
        this.items = [
            {
                xtype:'box',
                region:'north',
                //html: '<div id="header"><h1>RS ol</h1><span id=usrlogin></span></div>',
                applyTo:'header',
                height:30
            },
            {
                xtype:'container',
                autoEl:'div',
                region:'west',
                height:20
            },
            {
                xtype:'container',
                autoEl:'div',
                region:'east',
                height:20
            },
            {
                xtype:'container',
                autoEl:'div',
                region:'south',
                height:20
            }
        ];
        jun.ViewportUi.superclass.initComponent.call(this);
    }
});
jun.win = new Ext.extend(Ext.Window, {
    layout:'fit',
    width:300,
    height:150,
    closable:false,
    resizable:false,
    plain:true,
    border:false,
    initComponent:function () {
        this.items = [jun.login];
        jun.win.superclass.initComponent.call(this);
    }

});
Ext.onReady(function () {
    var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
            //callback : firebugWarning
        });
    }
    hideMask.defer(50);
    Ext.QuickTips.init();
    var myViewport = new jun.login({
        //var myViewport = new jun.login({
        //renderTo: Ext.getBody()
    });
    myViewport.show();
    //var logz = Ext.get('usrlogin')
    //logz.highlight();
    //jun.rztUser.load();
    //jun.rztSjp.load();
    //jun.rztRrawat.load();
    //jun.rztKlsrawat.load();
});
//Ext.onReady(function(){
//    Ext.QuickTips.init(); 
//	// This just creates a window to wrap the login form. 
//	// The login object is passed to the items collection.       

//win.show();
//});