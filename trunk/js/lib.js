/**
 * Copyright(c) 2011
 *
 * Licensed under the terms of the Open Source LGPL 3.0
 * http://www.gnu.org/licenses/lgpl.html
 * @author Greivin Britton, brittongr@gmail.com
 *     
 * @changes
 * No currency symbol by default    
 * No decimalPrecision in config
 * Supporting any character as thousand separator
 * Improved getFormattedValue
 * Removed unnecessary code to create format template, now using float.toFixed(this.decimalPrecission)    
 */
	
Ext.ux.NumericField = function(config){
	var defaultConfig = 
    {
		style: 'text-align:right;'
    };
    
    Ext.ux.NumericField.superclass.constructor.call(this, Ext.apply(defaultConfig, config));

    //Only if thousandSeparator doesn't exists is assigned when using decimalSeparator as the same as thousandSeparator
	if(this.useThousandSeparator && this.decimalSeparator == ',' && Ext.isEmpty(config.thousandSeparator))
		this.thousandSeparator = '.';
	else
		if(this.allowDecimals && this.thousandSeparator == '.' && Ext.isEmpty(config.decimalSeparator))
			this.decimalSeparator = ',';
		
    this.onFocus = this.onFocus.createSequence(this.onFocus);
};

Ext.extend(Ext.ux.NumericField, Ext.form.NumberField, 
{
    currencySymbol: null,
	useThousandSeparator: true,
	thousandSeparator: ',',
	alwaysDisplayDecimals: false,
	setValue: function(v){
	   Ext.ux.NumericField.superclass.setValue.call(this, v);
       
	   this.setRawValue(this.getFormattedValue(this.getValue()));
    },
	/**
	 * No more using Ext.util.Format.number, Ext.util.Format.number in ExtJS versions
	 * less thant 4.0 doesn't allow to use a different thousand separator than "," or "."
	 * @param {Number} v
	 */
    getFormattedValue: function(v){
       
		if (Ext.isEmpty(v) || !this.hasFormat()) 
            return v;
	    else 
        {
			var neg = null;
			
			v = (neg = v < 0) ? v * -1 : v;	
			v = this.allowDecimals && this.alwaysDisplayDecimals ? v.toFixed(this.decimalPrecision) : v;
			
			if(this.useThousandSeparator)
			{
				if(this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator))
					throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
				
				if(this.thousandSeparator == this.decimalSeparator)
					throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
				
				var v = String(v);
		
				var ps = v.split('.');
                ps[1] = ps[1] ? ps[1] : null;
                
                var whole = ps[0];
                
                var r = /(\d+)(\d{3})/;

				var ts = this.thousandSeparator;
				
                while (r.test(whole)) 
                    whole = whole.replace(r, '$1' + ts + '$2');
            
			    v = whole + (ps[1] ? this.decimalSeparator + ps[1] : '');
			}
			
			return String.format('{0}{1}{2}', (neg ? '-' : ''), (Ext.isEmpty(this.currencySymbol) ? '' : this.currencySymbol + ' '), v);
        }
    },
    /**
     * overrides parseValue to remove the format applied by this class
     */
    parseValue: function(v){
		//Replace the currency symbol and thousand separator
        return Ext.ux.NumericField.superclass.parseValue.call(this, this.removeFormat(v));
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} v
     */
    removeFormat: function(v){
        if (Ext.isEmpty(v) || !this.hasFormat()) 
            return v;
        else 
        {
			v = v.replace(this.currencySymbol + ' ', '');
			
			v = this.useThousandSeparator ? v.replace(new RegExp('[' + this.thousandSeparator + ']', 'g'), '') : v;
			//v = this.allowDecimals && this.decimalPrecision > 0 ? v.replace(this.decimalSeparator, '.') : v;
			
            return v;
        }
    },
    /**
     * Remove the format before validating the the value.
     * @param {Number} v
     */
    getErrors: function(v){
        return Ext.ux.NumericField.superclass.getErrors.call(this, this.removeFormat(v));
    },
	hasFormat: function()
	{
		return this.decimalSeparator != '.' || this.useThousandSeparator == true || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;	
	},
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function(){
		this.setRawValue(this.removeFormat(this.getRawValue()));
    }
});
Ext.reg('numericfield', Ext.ux.NumericField);

//support start from 3.4.1
//Ext.define('PVE.form.ComboGrid', {
//    extend: 'Ext.form.ComboBox',
//    requires: [
//        'Ext.grid.Panel'
//    ],
//    alias: ['widget.PVE.form.ComboGrid'],
//
//    // copied from ComboBox
//    createPicker: function() {
//        var me = this,
//            picker,
//            menuCls = Ext.baseCSSPrefix + 'menu',
//            opts = Ext.apply({
//                selModel: {
//                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
//                },
//                floating: true,
//                hidden: true,
//                ownerCt: me.ownerCt,
//                cls: me.el.up('.' + menuCls) ? menuCls : '',
//                store: me.store,
//                displayField: me.displayField,
//                focusOnToFront: false,
//                pageSize: me.pageSize
//            }, me.listConfig, me.defaultListConfig);
//
//        // NOTE: we simply use a grid panel
//        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);
//        picker = me.picker = Ext.create('Ext.grid.Panel', opts);
//
//        // hack: pass getNode() to the view
//        picker.getNode = function() {
//            picker.getView().getNode(arguments);
//        };
//
//        me.mon(picker, {
//            itemclick: me.onItemClick,
//            refresh: me.onListRefresh,
//            scope: me
//        });
//
//        me.mon(picker.getSelectionModel(), {
//            selectionChange: me.onListSelectionChange,
//            scope: me
//        });
//
//        return picker;
//    }
//});

Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.XDateField
 * @extends Ext.form.DateField
 */
Ext.ux.form.XDateField = Ext.extend(Ext.form.DateField, {
    submitFormat:'Y-m-d'
    ,onRender:function() {

        // call parent
        Ext.ux.form.XDateField.superclass.onRender.apply(this, arguments);

        var name = this.name || this.el.dom.name;
        this.hiddenField = this.el.insertSibling({
            tag:'input'
            ,type:'hidden'
            ,name:name
            ,value:this.formatHiddenDate(this.parseDate(this.value))
        });
        this.hiddenName = name; // otherwise field is not found by BasicForm::findField
        this.el.dom.removeAttribute('name');
        this.el.on({
            keyup:{scope:this, fn:this.updateHidden}
            ,blur:{scope:this, fn:this.updateHidden}
        }, Ext.isIE ? 'after' : 'before');

        this.setValue = this.setValue.createSequence(this.updateHidden);

    } // eo function onRender

    ,onDisable: function(){
        // call parent
        Ext.ux.form.XDateField.superclass.onDisable.apply(this, arguments);
        if(this.hiddenField) {
            this.hiddenField.dom.setAttribute('disabled','disabled');
        }
    } // of function onDisable

    ,onEnable: function(){
        // call parent
        Ext.ux.form.XDateField.superclass.onEnable.apply(this, arguments);
        if(this.hiddenField) {
            this.hiddenField.dom.removeAttribute('disabled');
        }
    } // eo function onEnable

    ,formatHiddenDate : function(date){
        if(!Ext.isDate(date)) {
            return date;
        }
        if('timestamp' === this.submitFormat) {
            return date.getTime()/1000;
        }
        else {
            return Ext.util.Format.date(date, this.submitFormat);
        }
    }

    ,updateHidden:function() {
        this.hiddenField.dom.value = this.formatHiddenDate(this.getValue());
    } // eo function updateHidden

}); // end of extend

// register xtype
Ext.reg('xdatefield', Ext.ux.form.XDateField);

jun.example = function(){
    var msgCt;

    function createBox(t, s){
        return ['<div class="msg">',
            '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
            '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
            '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
            '</div>'].join('');
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.slideIn('t').pause(5).ghost("t", {remove:true});
        },

        init : function(){
            /*
             var t = Ext.get('exttheme');
             if(!t){ // run locally?
             return;
             }
             var theme = Cookies.get('exttheme') || 'aero';
             if(theme){
             t.dom.value = theme;
             Ext.getBody().addClass('x-'+theme);
             }
             t.on('change', function(){
             Cookies.set('exttheme', t.getValue());
             setTimeout(function(){
             window.location.reload();
             }, 250);
             });*/

            var lb = Ext.get('lib-bar');
            if(lb){
                lb.show();
            }
        }
    };
}();

jun.example.shortBogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.';
jun.example.bogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.</p>';

jun.bulan = new Ext.data.ArrayStore({
    fields: ['noBulan', 'namaBulan'],
    data : [[1,'Januari'],[2,'Februari'],[3,'Maret'],[4,'April'],[5,'Mei'],[6,'Juni'],[7,'Juli'],
        [8,'Agustus'],[9,'September'],[10,'Oktober'],[11,'November'],[12,'Desember']
    ]
});

jun.comboBulan = Ext.extend(Ext.form.ComboBox,{
    displayField:'namaBulan',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    emptyText:'Pilih bulan...',
    selectOnFocus:true,
    initComponent: function(){
        this.store = jun.bulan;
        jun.comboBulan.superclass.initComponent.call(this);
    }
});

Ext.onReady(jun.example.init, jun.example);

// old school cookie functions
var Cookies = {};
Cookies.set = function(name, value){
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape (value) +
        ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
};

Cookies.get = function(name){
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while(i < clen){
        j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return Cookies.getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if(i == 0)
            break;
    }
    return null;
};

Cookies.clear = function(name) {
    if(Cookies.get(name)){
        document.cookie = name + "=" +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
};

Cookies.getCookieVal = function(offset){
    var endstr = document.cookie.indexOf(";", offset);
    if(endstr == -1){
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
};

Ext.ux.Spinner = Ext.extend(Ext.util.Observable, {
    incrementValue: 1,
    alternateIncrementValue: 5,
    triggerClass: 'x-form-spinner-trigger',
    splitterClass: 'x-form-spinner-splitter',
    alternateKey: Ext.EventObject.shiftKey,
    defaultValue: 0,
    accelerate: false,

    constructor: function(config){
        Ext.ux.Spinner.superclass.constructor.call(this, config);
        Ext.apply(this, config);
        this.mimicing = false;
    },

    init: function(field){
        this.field = field;

        field.afterMethod('onRender', this.doRender, this);
        field.afterMethod('onEnable', this.doEnable, this);
        field.afterMethod('onDisable', this.doDisable, this);
        field.afterMethod('afterRender', this.doAfterRender, this);
        field.afterMethod('onResize', this.doResize, this);
        field.afterMethod('onFocus', this.doFocus, this);
        field.beforeMethod('onDestroy', this.doDestroy, this);
    },

    doRender: function(ct, position){
        var el = this.el = this.field.getEl();
        var f = this.field;

        if (!f.wrap) {
            f.wrap = this.wrap = el.wrap({
                cls: "x-form-field-wrap"
            });
        }
        else {
            this.wrap = f.wrap.addClass('x-form-field-wrap');
        }

        this.trigger = this.wrap.createChild({
            tag: "img",
            src: Ext.BLANK_IMAGE_URL,
            cls: "x-form-trigger " + this.triggerClass
        });

        if (!f.width) {
            this.wrap.setWidth(el.getWidth() + this.trigger.getWidth());
        }

        this.splitter = this.wrap.createChild({
            tag: 'div',
            cls: this.splitterClass,
            style: 'width:13px; height:2px;'
        });
        this.splitter.setRight((Ext.isIE) ? 1 : 2).setTop(10).show();

        this.proxy = this.trigger.createProxy('', this.splitter, true);
        this.proxy.addClass("x-form-spinner-proxy");
        this.proxy.setStyle('left', '0px');
        this.proxy.setSize(14, 1);
        this.proxy.hide();
        this.dd = new Ext.dd.DDProxy(this.splitter.dom.id, "SpinnerDrag", {
            dragElId: this.proxy.id
        });

        this.initTrigger();
        this.initSpinner();
    },

    doAfterRender: function(){
        var y;
        if (Ext.isIE && this.el.getY() != (y = this.trigger.getY())) {
            this.el.position();
            this.el.setY(y);
        }
    },

    doEnable: function(){
        if (this.wrap) {
            this.disabled = false;
            this.wrap.removeClass(this.field.disabledClass);
        }
    },

    doDisable: function(){
        if (this.wrap) {
            this.disabled = true;
            this.wrap.addClass(this.field.disabledClass);
            this.el.removeClass(this.field.disabledClass);
        }
    },

    doResize: function(w, h){
        if (typeof w == 'number') {
            this.el.setWidth(w - this.trigger.getWidth());
        }
        this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth());
    },

    doFocus: function(){
        if (!this.mimicing) {
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Ext.get(Ext.isIE ? document.body : document).on("mousedown", this.mimicBlur, this, {
                delay: 10
            });
            this.el.on('keydown', this.checkTab, this);
        }
    },

    // private
    checkTab: function(e){
        if (e.getKey() == e.TAB) {
            this.triggerBlur();
        }
    },

    // private
    mimicBlur: function(e){
        if (!this.wrap.contains(e.target) && this.field.validateBlur(e)) {
            this.triggerBlur();
        }
    },

    // private
    triggerBlur: function(){
        this.mimicing = false;
        Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        this.el.un("keydown", this.checkTab, this);
        this.field.beforeBlur();
        this.wrap.removeClass('x-trigger-wrap-focus');
        this.field.onBlur.call(this.field);
    },

    initTrigger: function(){
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },

    initSpinner: function(){
        this.field.addEvents({
            'spin': true,
            'spinup': true,
            'spindown': true
        });

        this.keyNav = new Ext.KeyNav(this.el, {
            "up": function(e){
                e.preventDefault();
                this.onSpinUp();
            },

            "down": function(e){
                e.preventDefault();
                this.onSpinDown();
            },

            "pageUp": function(e){
                e.preventDefault();
                this.onSpinUpAlternate();
            },

            "pageDown": function(e){
                e.preventDefault();
                this.onSpinDownAlternate();
            },

            scope: this
        });

        this.repeater = new Ext.util.ClickRepeater(this.trigger, {
            accelerate: this.accelerate
        });
        this.field.mon(this.repeater, "click", this.onTriggerClick, this, {
            preventDefault: true
        });

        this.field.mon(this.trigger, {
            mouseover: this.onMouseOver,
            mouseout: this.onMouseOut,
            mousemove: this.onMouseMove,
            mousedown: this.onMouseDown,
            mouseup: this.onMouseUp,
            scope: this,
            preventDefault: true
        });

        this.field.mon(this.wrap, "mousewheel", this.handleMouseWheel, this);

        this.dd.setXConstraint(0, 0, 10)
        this.dd.setYConstraint(1500, 1500, 10);
        this.dd.endDrag = this.endDrag.createDelegate(this);
        this.dd.startDrag = this.startDrag.createDelegate(this);
        this.dd.onDrag = this.onDrag.createDelegate(this);
    },

    onMouseOver: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpHoverClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-overup' : 'x-form-spinner-overdown';
        this.trigger.addClass(this.tmpHoverClass);
    },

    //private
    onMouseOut: function(){
        this.trigger.removeClass(this.tmpHoverClass);
    },

    //private
    onMouseMove: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        if (((Ext.EventObject.getPageY() > middle) && this.tmpHoverClass == "x-form-spinner-overup") ||
            ((Ext.EventObject.getPageY() < middle) && this.tmpHoverClass == "x-form-spinner-overdown")) {
        }
    },

    //private
    onMouseDown: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpClickClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-clickup' : 'x-form-spinner-clickdown';
        this.trigger.addClass(this.tmpClickClass);
    },

    //private
    onMouseUp: function(){
        this.trigger.removeClass(this.tmpClickClass);
    },

    //private
    onTriggerClick: function(){
        if (this.disabled || this.el.dom.readOnly) {
            return;
        }
        var middle = this.getMiddle();
        var ud = (Ext.EventObject.getPageY() < middle) ? 'Up' : 'Down';
        this['onSpin' + ud]();
    },

    //private
    getMiddle: function(){
        var t = this.trigger.getTop();
        var h = this.trigger.getHeight();
        var middle = t + (h / 2);
        return middle;
    },

    //private
    //checks if control is allowed to spin
    isSpinnable: function(){
        if (this.disabled || this.el.dom.readOnly) {
            Ext.EventObject.preventDefault(); //prevent scrolling when disabled/readonly
            return false;
        }
        return true;
    },

    handleMouseWheel: function(e){
        //disable scrolling when not focused
        if (this.wrap.hasClass('x-trigger-wrap-focus') == false) {
            return;
        }

        var delta = e.getWheelDelta();
        if (delta > 0) {
            this.onSpinUp();
            e.stopEvent();
        }
        else
        if (delta < 0) {
            this.onSpinDown();
            e.stopEvent();
        }
    },

    //private
    startDrag: function(){
        this.proxy.show();
        this._previousY = Ext.fly(this.dd.getDragEl()).getTop();
    },

    //private
    endDrag: function(){
        this.proxy.hide();
    },

    //private
    onDrag: function(){
        if (this.disabled) {
            return;
        }
        var y = Ext.fly(this.dd.getDragEl()).getTop();
        var ud = '';

        if (this._previousY > y) {
            ud = 'Up';
        } //up
        if (this._previousY < y) {
            ud = 'Down';
        } //down
        if (ud != '') {
            this['onSpin' + ud]();
        }

        this._previousY = y;
    },

    //private
    onSpinUp: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinUpAlternate();
            return;
        }
        else {
            this.spin(false, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },

    //private
    onSpinDown: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinDownAlternate();
            return;
        }
        else {
            this.spin(true, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },

    //private
    onSpinUpAlternate: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(false, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },

    //private
    onSpinDownAlternate: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(true, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },

    spin: function(down, alternate){
        var v = parseFloat(this.field.getValue());
        var incr = (alternate == true) ? this.alternateIncrementValue : this.incrementValue;
        (down == true) ? v -= incr : v += incr;

        v = (isNaN(v)) ? this.defaultValue : v;
        v = this.fixBoundries(v);
        this.field.setRawValue(v);
    },

    fixBoundries: function(value){
        var v = value;

        if (this.field.minValue != undefined && v < this.field.minValue) {
            v = this.field.minValue;
        }
        if (this.field.maxValue != undefined && v > this.field.maxValue) {
            v = this.field.maxValue;
        }

        return this.fixPrecision(v);
    },

    // private
    fixPrecision: function(value){
        var nan = isNaN(value);
        if (!this.field.allowDecimals || this.field.decimalPrecision == -1 || nan || !value) {
            return nan ? '' : value;
        }
        return parseFloat(parseFloat(value).toFixed(this.field.decimalPrecision));
    },

    doDestroy: function(){
        if (this.trigger) {
            this.trigger.remove();
        }
        if (this.wrap) {
            this.wrap.remove();
            delete this.field.wrap;
        }

        if (this.splitter) {
            this.splitter.remove();
        }

        if (this.dd) {
            this.dd.unreg();
            this.dd = null;
        }

        if (this.proxy) {
            this.proxy.remove();
        }

        if (this.repeater) {
            this.repeater.purgeListeners();
        }
        if (this.mimicing){
            Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        }
    }
});

//backwards compat
Ext.form.Spinner = Ext.ux.Spinner;

Ext.ux.form.SpinnerField = Ext.extend(Ext.form.NumberField, {
    actionMode: 'wrap',
    deferHeight: true,
    autoSize: Ext.emptyFn,
    onBlur: Ext.emptyFn,
    adjustSize: Ext.BoxComponent.prototype.adjustSize,

    constructor: function(config) {
        var spinnerConfig = Ext.copyTo({}, config, 'incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass');

        var spl = this.spinner = new Ext.ux.Spinner(spinnerConfig);

        var plugins = config.plugins
            ? (Ext.isArray(config.plugins)
            ? config.plugins.push(spl)
            : [config.plugins, spl])
            : spl;

        Ext.ux.form.SpinnerField.superclass.constructor.call(this, Ext.apply(config, {plugins: plugins}));
    },

    // private
    getResizeEl: function(){
        return this.wrap;
    },

    // private
    getPositionEl: function(){
        return this.wrap;
    },

    // private
    alignErrorIcon: function(){
        if (this.wrap) {
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
    },

    validateBlur: function(){
        return true;
    }
});

Ext.reg('spinnerfield', Ext.ux.form.SpinnerField);

//backwards compat
Ext.form.SpinnerField = Ext.ux.form.SpinnerField;