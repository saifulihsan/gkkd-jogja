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

Ext.ux.NumericField = function(config) {
    var defaultConfig = {
        style: 'text-align:right;'
    };
    Ext.ux.NumericField.superclass.constructor.call(this, Ext.apply(defaultConfig, config));
    //Only if thousandSeparator doesn't exists is assigned when using decimalSeparator as the same as thousandSeparator
    if (this.useThousandSeparator && this.decimalSeparator == ',' && Ext.isEmpty(config.thousandSeparator)) this.thousandSeparator = '.';
    else if (this.allowDecimals && this.thousandSeparator == '.' && Ext.isEmpty(config.decimalSeparator)) this.decimalSeparator = ',';
    this.onFocus = this.onFocus.createSequence(this.onFocus);
};
Ext.extend(Ext.ux.NumericField, Ext.form.NumberField, {
    currencySymbol: null,
    useThousandSeparator: true,
    thousandSeparator: ',',
    alwaysDisplayDecimals: false,
    setValue: function(v) {
        Ext.ux.NumericField.superclass.setValue.call(this, v);
        this.setRawValue(this.getFormattedValue(this.getValue()));
    },
    /**
     * No more using Ext.util.Format.number, Ext.util.Format.number in ExtJS versions
     * less thant 4.0 doesn't allow to use a different thousand separator than "," or "."
     * @param {Number} v
     */
    getFormattedValue: function(v) {
        if (Ext.isEmpty(v) || !this.hasFormat()) return v;
        else {
            var neg = null;
            v = (neg = v < 0) ? v * -1 : v;
            v = this.allowDecimals && this.alwaysDisplayDecimals ? v.toFixed(this.decimalPrecision) : v;
            if (this.useThousandSeparator) {
                if (this.useThousandSeparator && Ext.isEmpty(this.thousandSeparator)) throw ('NumberFormatException: invalid thousandSeparator, property must has a valid character.');
                if (this.thousandSeparator == this.decimalSeparator) throw ('NumberFormatException: invalid thousandSeparator, thousand separator must be different from decimalSeparator.');
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
    parseValue: function(v) {
        //Replace the currency symbol and thousand separator
        return Ext.ux.NumericField.superclass.parseValue.call(this, this.removeFormat(v));
    },
    /**
     * Remove only the format added by this class to let the superclass validate with it's rules.
     * @param {Object} v
     */
    removeFormat: function(v) {
        if (Ext.isEmpty(v) || !this.hasFormat()) return v;
        else {
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
    getErrors: function(v) {
        return Ext.ux.NumericField.superclass.getErrors.call(this, this.removeFormat(v));
    },
    hasFormat: function() {
        return this.decimalSeparator != '.' || this.useThousandSeparator == true || !Ext.isEmpty(this.currencySymbol) || this.alwaysDisplayDecimals;
    },
    /**
     * Display the numeric value with the fixed decimal precision and without the format using the setRawValue, don't need to do a setValue because we don't want a double
     * formatting and process of the value because beforeBlur perform a getRawValue and then a setValue.
     */
    onFocus: function() {
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
    submitFormat: 'Y-m-d',
    onRender: function() {

        // call parent
        Ext.ux.form.XDateField.superclass.onRender.apply(this, arguments);
        var name = this.name || this.el.dom.name;
        this.hiddenField = this.el.insertSibling({
            tag: 'input',
            type: 'hidden',
            name: name,
            value: this.formatHiddenDate(this.parseDate(this.value))
        });
        this.hiddenName = name; // otherwise field is not found by BasicForm::findField
        this.el.dom.removeAttribute('name');
        this.el.on({
            keyup: {
                scope: this,
                fn: this.updateHidden
            },
            blur: {
                scope: this,
                fn: this.updateHidden
            }
        }, Ext.isIE ? 'after' : 'before');
        this.setValue = this.setValue.createSequence(this.updateHidden);
    } // eo function onRender
    ,
    onDisable: function() {
        // call parent
        Ext.ux.form.XDateField.superclass.onDisable.apply(this, arguments);
        if (this.hiddenField) {
            this.hiddenField.dom.setAttribute('disabled', 'disabled');
        }
    } // of function onDisable
    ,
    onEnable: function() {
        // call parent
        Ext.ux.form.XDateField.superclass.onEnable.apply(this, arguments);
        if (this.hiddenField) {
            this.hiddenField.dom.removeAttribute('disabled');
        }
    } // eo function onEnable
    ,
    formatHiddenDate: function(date) {
        if (!Ext.isDate(date)) {
            return date;
        }
        if ('timestamp' === this.submitFormat) {
            return date.getTime() / 1000;
        } else {
            return Ext.util.Format.date(date, this.submitFormat);
        }
    },
    updateHidden: function() {
        this.hiddenField.dom.value = this.formatHiddenDate(this.getValue());
    } // eo function updateHidden
}); // end of extend

// register xtype
Ext.reg('xdatefield', Ext.ux.form.XDateField);
jun.example = function() {
    var msgCt;

    function createBox(t, s) {
        return ['<div class="msg">', '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>', '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>', '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>', '</div>'].join('');
    }

    return {
        msg: function(title, format) {
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(document.body, {
                    id: 'msg-div'
                }, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {
                html: createBox(title, s)
            }, true);
            m.slideIn('t').pause(5).ghost("t", {
                remove: true
            });
        },
        init: function() {
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
            if (lb) {
                lb.show();
            }
        }
    };
}();
jun.example.shortBogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.';
jun.example.bogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.</p>';
jun.bulan = new Ext.data.ArrayStore({
    fields: ['noBulan', 'namaBulan'],
    data: [
        ['01', 'Januari'],
        ['02', 'Februari'],
        ['03', 'Maret'],
        ['04', 'April'],
        ['05', 'Mei'],
        ['06', 'Juni'],
        ['07', 'Juli'],
        ['08', 'Agustus'],
        ['09', 'September'],
        ['10', 'Oktober'],
        ['11', 'November'],
        ['12', 'Desember']
    ]
});
jun.comboBulan = Ext.extend(Ext.form.ComboBox, {
    displayField: 'namaBulan',
    valueField: 'noBulan',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    //triggerAction:'all',
    emptyText: 'Pilih bulan...',
    selectOnFocus: true,
    lastQuery: '',
    initComponent: function() {
        this.store = jun.bulan;
        jun.comboBulan.superclass.initComponent.call(this);
    }
});
jun.methodPay = new Ext.data.ArrayStore({
    fields: ['payVal', 'payName'],
    data: [
        ['Tunai', 'Tunai'],
        ['Debet', 'Debet'],
        ['Transfer', 'Transfer'],
        ['Cek', 'Cek'],
        ['Bilyet Giro (BG)', 'Bilyet Giro (BG)']
    ]
});
jun.comboPayment = Ext.extend(Ext.form.ComboBox, {
    displayField: 'payName',
    valueField: 'payVal',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    emptyText: 'Pilih cara bayar...',
    selectOnFocus: true,
    //    lastQuery:'',
    initComponent: function() {
        this.store = jun.methodPay;
        jun.comboPayment.superclass.initComponent.call(this);
        //        this.hiddenName = 'trans_via';
        //        this.hiddenValue = 'payVal';
    }
});
jun.Gender = new Ext.data.ArrayStore({
    fields: ['code', 'desc'],
    data: [
        ['M', 'Laki-laki'],
        ['F', 'Perempuan']
    ]
});
jun.cmbGender = Ext.extend(Ext.form.ComboBox, {
    displayField: 'desc',
    valueField: 'code',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    emptyText: 'Pilih jenis kelamin...',
    selectOnFocus: true,
    name: 'gender',
    hiddenName: 'gender',
    hiddenValue: 'gender',
    initComponent: function() {
        this.store = jun.Gender;
        jun.comboPayment.superclass.initComponent.call(this);
        //        this.hiddenName = 'trans_via';
        //        this.hiddenValue = 'payVal';
    }
});
/*status aktif*/
jun.active = new Ext.data.ArrayStore({
    fields: ['activeVal', 'activeName'],
    data: [
        [0, 'Aktif'],
        [1, 'Non Aktif']
    ]
});
jun.comboActive = Ext.extend(Ext.form.ComboBox, {
    displayField: 'activeName',
    valueField: 'activeVal',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    typeAhead: true,
    triggerAction: 'all',
    name: 'inactive',
    hiddenName: 'inactive',
    hiddenValue: 'inactive',
    emptyText: 'Pilih status...',
    selectOnFocus: true,
    initComponent: function() {
        this.store = jun.active;
        jun.comboActive.superclass.initComponent.call(this);
    }
});
/*active*/
jun.renderActive = function(val, meta, record) {
    return val == 1 ? 'Non Aktif' : 'Aktif';
}
Ext.onReady(jun.example.init, jun.example);
// old school cookie functions
var Cookies = {};
Cookies.set = function(name, value) {
    var argv = arguments;
    var argc = arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var path = (argc > 3) ? argv[3] : '/';
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
};
Cookies.get = function(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    var j = 0;
    while (i < clen) {
        j = i + alen;
        if (document.cookie.substring(i, j) == arg) return Cookies.getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
};
Cookies.clear = function(name) {
    if (Cookies.get(name)) {
        document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
};
Cookies.getCookieVal = function(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
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
    constructor: function(config) {
        Ext.ux.Spinner.superclass.constructor.call(this, config);
        Ext.apply(this, config);
        this.mimicing = false;
    },
    init: function(field) {
        this.field = field;
        field.afterMethod('onRender', this.doRender, this);
        field.afterMethod('onEnable', this.doEnable, this);
        field.afterMethod('onDisable', this.doDisable, this);
        field.afterMethod('afterRender', this.doAfterRender, this);
        field.afterMethod('onResize', this.doResize, this);
        field.afterMethod('onFocus', this.doFocus, this);
        field.beforeMethod('onDestroy', this.doDestroy, this);
    },
    doRender: function(ct, position) {
        var el = this.el = this.field.getEl();
        var f = this.field;
        if (!f.wrap) {
            f.wrap = this.wrap = el.wrap({
                cls: "x-form-field-wrap"
            });
        } else {
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
    doAfterRender: function() {
        var y;
        if (Ext.isIE && this.el.getY() != (y = this.trigger.getY())) {
            this.el.position();
            this.el.setY(y);
        }
    },
    doEnable: function() {
        if (this.wrap) {
            this.disabled = false;
            this.wrap.removeClass(this.field.disabledClass);
        }
    },
    doDisable: function() {
        if (this.wrap) {
            this.disabled = true;
            this.wrap.addClass(this.field.disabledClass);
            this.el.removeClass(this.field.disabledClass);
        }
    },
    doResize: function(w, h) {
        if (typeof w == 'number') {
            this.el.setWidth(w - this.trigger.getWidth());
        }
        this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth());
    },
    doFocus: function() {
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
    checkTab: function(e) {
        if (e.getKey() == e.TAB) {
            this.triggerBlur();
        }
    },
    // private
    mimicBlur: function(e) {
        if (!this.wrap.contains(e.target) && this.field.validateBlur(e)) {
            this.triggerBlur();
        }
    },
    // private
    triggerBlur: function() {
        this.mimicing = false;
        Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        this.el.un("keydown", this.checkTab, this);
        this.field.beforeBlur();
        this.wrap.removeClass('x-trigger-wrap-focus');
        this.field.onBlur.call(this.field);
    },
    initTrigger: function() {
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },
    initSpinner: function() {
        this.field.addEvents({
            'spin': true,
            'spinup': true,
            'spindown': true
        });
        this.keyNav = new Ext.KeyNav(this.el, {
            "up": function(e) {
                e.preventDefault();
                this.onSpinUp();
            },
            "down": function(e) {
                e.preventDefault();
                this.onSpinDown();
            },
            "pageUp": function(e) {
                e.preventDefault();
                this.onSpinUpAlternate();
            },
            "pageDown": function(e) {
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
    onMouseOver: function() {
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpHoverClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-overup' : 'x-form-spinner-overdown';
        this.trigger.addClass(this.tmpHoverClass);
    },
    //private
    onMouseOut: function() {
        this.trigger.removeClass(this.tmpHoverClass);
    },
    //private
    onMouseMove: function() {
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        if (((Ext.EventObject.getPageY() > middle) && this.tmpHoverClass == "x-form-spinner-overup") || ((Ext.EventObject.getPageY() < middle) && this.tmpHoverClass == "x-form-spinner-overdown")) {}
    },
    //private
    onMouseDown: function() {
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpClickClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-clickup' : 'x-form-spinner-clickdown';
        this.trigger.addClass(this.tmpClickClass);
    },
    //private
    onMouseUp: function() {
        this.trigger.removeClass(this.tmpClickClass);
    },
    //private
    onTriggerClick: function() {
        if (this.disabled || this.el.dom.readOnly) {
            return;
        }
        var middle = this.getMiddle();
        var ud = (Ext.EventObject.getPageY() < middle) ? 'Up' : 'Down';
        this['onSpin' + ud]();
    },
    //private
    getMiddle: function() {
        var t = this.trigger.getTop();
        var h = this.trigger.getHeight();
        var middle = t + (h / 2);
        return middle;
    },
    //private
    //checks if control is allowed to spin
    isSpinnable: function() {
        if (this.disabled || this.el.dom.readOnly) {
            Ext.EventObject.preventDefault(); //prevent scrolling when disabled/readonly
            return false;
        }
        return true;
    },
    handleMouseWheel: function(e) {
        //disable scrolling when not focused
        if (this.wrap.hasClass('x-trigger-wrap-focus') == false) {
            return;
        }
        var delta = e.getWheelDelta();
        if (delta > 0) {
            this.onSpinUp();
            e.stopEvent();
        } else if (delta < 0) {
            this.onSpinDown();
            e.stopEvent();
        }
    },
    //private
    startDrag: function() {
        this.proxy.show();
        this._previousY = Ext.fly(this.dd.getDragEl()).getTop();
    },
    //private
    endDrag: function() {
        this.proxy.hide();
    },
    //private
    onDrag: function() {
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
    onSpinUp: function() {
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinUpAlternate();
            return;
        } else {
            this.spin(false, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },
    //private
    onSpinDown: function() {
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinDownAlternate();
            return;
        } else {
            this.spin(true, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },
    //private
    onSpinUpAlternate: function() {
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(false, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },
    //private
    onSpinDownAlternate: function() {
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(true, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },
    spin: function(down, alternate) {
        var v = parseFloat(this.field.getValue());
        var incr = (alternate == true) ? this.alternateIncrementValue : this.incrementValue;
        (down == true) ? v -= incr : v += incr;
        v = (isNaN(v)) ? this.defaultValue : v;
        v = this.fixBoundries(v);
        this.field.setRawValue(v);
    },
    fixBoundries: function(value) {
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
    fixPrecision: function(value) {
        var nan = isNaN(value);
        if (!this.field.allowDecimals || this.field.decimalPrecision == -1 || nan || !value) {
            return nan ? '' : value;
        }
        return parseFloat(parseFloat(value).toFixed(this.field.decimalPrecision));
    },
    doDestroy: function() {
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
        if (this.mimicing) {
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
        var plugins = config.plugins ? (Ext.isArray(config.plugins) ? config.plugins.push(spl) : [config.plugins, spl]) : spl;
        Ext.ux.form.SpinnerField.superclass.constructor.call(this, Ext.apply(config, {
            plugins: plugins
        }));
    },
    // private
    getResizeEl: function() {
        return this.wrap;
    },
    // private
    getPositionEl: function() {
        return this.wrap;
    },
    // private
    alignErrorIcon: function() {
        if (this.wrap) {
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
    },
    validateBlur: function() {
        return true;
    }
});
Ext.reg('spinnerfield', Ext.ux.form.SpinnerField);
//backwards compat
Ext.form.SpinnerField = Ext.ux.form.SpinnerField;
Ext.namespace("Ext.ux.grid");

/**
 * @class Ext.ux.grid.GridHeaderFilters
 * @extends Ext.util.Observable
 * 
 * Plugin that enables filters in columns headers.
 * 
 * To add a grid header filter, put the "filter" attribute in column configuration of the grid column model.
 * This attribute is the configuration of the Ext.form.Field to use as filter in the header or an array of fields configurations.<br>
 * <br>
 * The filter configuration object can include some special attributes to manage filter configuration:
 * <ul>
 * <li><code>filterName</code>: to specify the name of the filter and the corresponding HTTP parameter used to send filter value to server. 
 * If not specified column "dataIndex" attribute will be used, if more than one filter is configured for the same column, the filterName will be the "dataIndex" followed by filter index (if index &gt; 0)</li>
 * <li><code>value</code>: to specify default value for filter. If no value is provided for filter (in <code>filters</code> plugin configuration parameter or from loaded status), 
 * this value will be used as default filter value</li>
 * <li><code>filterEncoder</code>: a function used to convert filter value returned by filter field "getValue" method to a string. Useful if the filter field getValue() method
 * returns an object that is not a string</li>
 * <li><code>filterDecoder</code>: a function used to convert a string to a valid filter field value. Useful if the filter field setValue(obj) method
 *                         needs an object that is not a string</li>
 * <li><code>applyFilterEvent</code></li>: a string that specifies the event that starts filter application for this filter field. If not specified, the "applyMode" is used. (since 1.0.10)</li>
 *    </ul>
 * <br>
 * Filter fields are rendered in the header cells within an <code>Ext.Panel</code> with <code>layout='form'</code>.<br>
 * For each filter you can specify <code>fieldLabel</code> or other values supported by this layout type.<br>
 * You can also override panel configuration using <code>containerConfig</code> attribute.<br>
 * <br>
 * This plugin enables some new grid methods:
 * <ul>
 * <li>getHeaderFilter(name)</li>
 * <li>getHeaderFilterField(name)</li> 
 * <li>setHeaderFilter(name, value)</li> 
 * <li>setHeaderFilters(object, [bReset], [bReload])</li>
 * <li>resetHeaderFilters([bReload])</li>
 * <li>applyHeaderFilters([bReload])</li>
 * </ul>
 * The "name" is the filterName (see filterName in each filter configuration)
 * 
 * @author Damiano Zucconi - http://www.isipc.it
 * @version 2.0.6 - 03/03/2011
 */
Ext.ux.grid.GridHeaderFilters = function(cfg) {
    if (cfg) Ext.apply(this, cfg);
};

Ext.extend(Ext.ux.grid.GridHeaderFilters, Ext.util.Observable, {
    /**
     * @cfg {Number} fieldHeight
     * Height for each filter field used by <code>autoHeight</code>.
     */
    fieldHeight: 22,
    /**
     * @cfg {Number} padding
     * Padding for filter fields. Default: 2
     */
    fieldPadding: 1,
    /**
     * @cfg {Boolean} highlightOnFilter
     * Enable grid header highlight if active filters 
     */
    highlightOnFilter: true,
    /**
     * @cfg {String} highlightColor
     * Color for highlighted grid header
     */
    highlightColor: 'yellow',
    /**
     * @cfg {String} highlightCls
     * Class to apply to filter header when filters are highlighted. If specified overrides highlightColor.
     * See <code>highlightOnFilter</code>. 
     */
    highlightCls: null,
    /**
     * @cfg {Boolean} stateful
     * Enable or disable filters save and restore through enabled Ext.state.Provider
     */
    stateful: true,
    /**
     * @cfg {String} applyMode
     * Sets how filters are applied. If equals to "auto" (default) the filter is applyed when filter field value changes (change, select, ENTER).
     * If set to "enter" the filters are applied only when user push "ENTER" on filter field.<br> 
     * See also <code>applyFilterEvent</code> in columnmodel filter configuration: if this option is specified in
     * filter configuration, <code>applyMode</code> value will be ignored and filter will be applied on specified event.
     * @since Ext.ux.grid.GridHeaderFilters 1.0.6
     */
    applyMode: "auto",
    /**
     * @cfg {Object} filters
     * Initial values for filters (mapped with filters names). If this object is defined,
     * its attributes values overrides the corresponding filter values loaded from grid status or <code>value</code> specified in column model filter configuration.<br>
     * Values specified into column model configuration (filter <code>value</code> attribute) are ignored if this object is specified.<br>
     * See <code>filtersInitMode</code> to understand how these values are mixed with values loaded from grid status.
     * @since Ext.ux.grid.GridHeaderFilters 1.0.9
     */
    filters: null,
    /**
     * @cfg {String} filtersInitMode
     * If <code>filters</code> config value is specified, this parameter defines how these values are used:
     * <ul>
     * <li><code>replace</code>: these values replace all values loaded from grid status (status is completely ignored)</li>
     * <li><code>merge</code>: these values overrides values loaded from status with the same name. Other status values are keeped and used to init filters.</li>
     * </ul>
     * This parameter doesn't affect how filter <code>value</code> attribute is managed: it will be always ignored if <code>filters</code> object is specified.<br>
     * Default = 'replace'
     */
    filtersInitMode: 'replace',
    /**
     * @cfg {Boolean} ensureFilteredVisible
     * If true, forces hidden columns to be made visible if relative filter is set. Default = true.
     */
    ensureFilteredVisible: true,
    cfgFilterInit: false,
    /**
     * @cfg {Object} containerConfig
     * Base configuration for filters container of each column. With this attribute you can override filters <code>Ext.Container</code> configuration.
     */
    containerConfig: null,
    /**
     * @cfg {Number} labelWidth
     * Label width for filter containers Form layout. Default = 50.
     */
    labelWidth: 50,
    fcc: null,
    filterFields: null,
    filterContainers: null,
    filterContainerCls: 'x-ghf-filter-container',
    init: function(grid) {
        this.grid = grid;

        var gv = this.grid.getView();
        gv.updateHeaders = gv.updateHeaders.createSequence(function() {
            this.renderFilters.call(this);
        }, this).createInterceptor(function() {
            this.destroyFilters.call(this);
            return true;
        }, this);
        this.grid.on({
            scope: this,
            render: this.onRender,
            resize: this.onResize,
            columnresize: this.onColResize,
            reconfigure: this.onReconfigure,
            beforedestroy: this.destroyFilters
        });
        //this.grid.on("columnmove", this.renderFilters, this);
        if (this.stateful) {
            this.grid.on("beforestatesave", this.saveFilters, this);
            this.grid.on("beforestaterestore", this.loadFilters, this);
        }

        //Column hide event managed
        this.grid.getColumnModel().on("hiddenchange", this.onColHidden, this);

        this.grid.addEvents(
        /**
         * @event filterupdate
         * <b>Event enabled on the GridPanel</b>: fired when a filter is updated
         * @param {String} name Filter name
         * @param {Object} value Filter value
         * @param {Ext.form.Field} el Filter field
         */'filterupdate');

        this.addEvents(
        /**
         * @event render
         * Fired when filters render on grid header is completed
         * @param {Ext.ux.grid.GridHeaderFilters} this
         */ {
            'render': true
        });

        //Must ignore filter config value ?
        this.cfgFilterInit = Ext.isDefined(this.filters) && this.filters !== null;
        if (!this.filters) this.filters = {};

        //Configuring filters
        this.configure(this.grid.getColumnModel());

        Ext.ux.grid.GridHeaderFilters.superclass.constructor.call(this);

        if (this.stateful) {
            if (!Ext.isArray(this.grid.stateEvents)) this.grid.stateEvents = [];
            this.grid.stateEvents.push('filterupdate');
        }

        //Enable new grid methods
        Ext.apply(this.grid, {
            headerFilters: this,
            getHeaderFilter: function(sName) {
                if (!this.headerFilters) return null;
                return this.headerFilters.filters[sName];
            },
            setHeaderFilter: function(sName, sValue) {
                if (!this.headerFilters) return;
                var fd = {};
                fd[sName] = sValue;
                this.setHeaderFilters(fd);
            },
            setHeaderFilters: function(obj, bReset, bReload) {
                if (!this.headerFilters) return;
                if (bReset) this.resetHeaderFilters(false);
                if (arguments.length < 3) var bReload = true;
                var bOne = false;
                for (var fn in obj) {
                    if (this.headerFilters.filterFields[fn]) {
                        var el = this.headerFilters.filterFields[fn];
                        this.headerFilters.setFieldValue(el, obj[fn]);
                        this.headerFilters.applyFilter(el, false);
                        bOne = true;
                    }
                }
                if (bOne && bReload) this.headerFilters.storeReload();
            },
            getHeaderFilterField: function(fn) {
                if (!this.headerFilters) return;
                if (this.headerFilters.filterFields[fn]) return this.headerFilters.filterFields[fn];
                else return null;
            },
            resetHeaderFilters: function(bReload) {
                if (!this.headerFilters) return;
                if (arguments.length == 0) var bReload = true;
                for (var fn in this.headerFilters.filterFields) {
                    var el = this.headerFilters.filterFields[fn];
                    if (Ext.isFunction(el.clearValue)) {
                        el.clearValue();
                    } else {
                        this.headerFilters.setFieldValue(el, '');
                    }
                    this.headerFilters.applyFilter(el, false);
                }
                if (bReload) this.headerFilters.storeReload();
            },
            applyHeaderFilters: function(bReload) {
                if (arguments.length == 0) var bReload = true;
                this.headerFilters.applyFilters(bReload);
            }
        });

    },
    /**
     * @private
     * Configures filters and containers starting from grid ColumnModel
     * @param {Ext.grid.ColumnModel} cm The column model to use
     */
    configure: function(cm) {
        /*Filters config*/
        var filteredColumns = cm.getColumnsBy(function(cc) {
            if (Ext.isObject(cc.filter) || Ext.isArray(cc.filter)) return true;
            else return false;
        });

        /*Building filters containers configs*/
        this.fcc = {};
        for (var i = 0; i < filteredColumns.length; i++) {
            var co = filteredColumns[i];
            var fca = co.filter;
            if (!Ext.isArray(fca)) fca = [fca];
            for (var ci = 0; ci < fca.length; ci++) {
                var fc = Ext.apply({
                    filterName: ci > 0 ? co.dataIndex + ci : co.dataIndex
                }, fca[ci]);
                Ext.apply(fc, {
                    columnId: co.id,
                    dataIndex: co.dataIndex,
                    hideLabel: Ext.isEmpty(fc.fieldLabel),
                    anchor: '100%'
                });

                if (!this.cfgFilterInit && !Ext.isEmpty(fc.value)) {
                    this.filters[fc.filterName] = Ext.isFunction(fc.filterEncoder) ? fc.filterEncoder.call(this, fc.value) : fc.value;
                }
                delete fc.value;

                /*
                 * Se la configurazione del field di filtro specifica l'attributo applyFilterEvent, il filtro verrà applicato
                 * in corrispondenza di quest'evento specifico
                 */
                if (fc.applyFilterEvent) {
                    fc.listeners = {
                        scope: this
                    };
                    fc.listeners[fc.applyFilterEvent] = function(field) {
                        this.applyFilter(field);
                    };
                    delete fc.applyFilterEvent;
                } else {
                    //applyMode: auto o enter
                    if (this.applyMode === 'auto' || this.applyMode === 'change' || Ext.isEmpty(this.applyMode)) {
                        //Legacy mode and deprecated. Use applyMode = "enter" or applyFilterEvent
                        fc.listeners = {
                            change: function(field) {
                                var t = field.getXType();
                                if (t == 'combo' || t == 'datefield') { //avoid refresh twice for combo select 
                                    return;
                                } else {
                                    this.applyFilter(field);
                                }
                            },
                            specialkey: function(el, ev) {
                                ev.stopPropagation();
                                if (ev.getKey() == ev.ENTER) el.el.dom.blur();
                            },
                            select: function(field) {
                                this.applyFilter(field);
                            },
                            scope: this
                        };
                    } else if (this.applyMode === 'enter') {
                        fc.listeners = {
                            specialkey: function(el, ev) {
                                ev.stopPropagation();
                                if (ev.getKey() == ev.ENTER) {
                                    this.applyFilters();
                                }
                            },
                            scope: this
                        };
                    }
                }

                //Looking for filter column index
                var containerCfg = this.fcc[fc.columnId];
                if (!containerCfg) {
                    containerCfg = {
                        cls: this.filterContainerCls,
                        border: false,
                        bodyBorder: false,
                        /*layout: 'vbox',
                                 layoutConfig: {align: 'stretch', padding: this.padding},*/
                        labelSeparator: '',
                        labelWidth: this.labelWidth,
                        layout: 'form',
                        style: {},
                        items: []
                    };
                    if (this.containerConfig) Ext.apply(containerCfg, this.containerConfig);
                    this.fcc[fc.columnId] = containerCfg;
                }
                containerCfg.items.push(fc);
            }
        }
    },
    renderFilterContainer: function(columnId, fcc) {
        if (!this.filterContainers) this.filterContainers = {};
        //Associated column index
        var ci = this.grid.getColumnModel().getIndexById(columnId);
        //Header TD
        var td = this.grid.getView().getHeaderCell(ci);
        td = Ext.get(td);
        //Patch for field text selection on Mozilla
        if (Ext.isGecko) td.dom.style.MozUserSelect = "text";
        td.dom.style.verticalAlign = 'top';
        //Render filter container
        fcc.width = td.getWidth() - 3;
        var fc = new Ext.Container(fcc);
        fc.render(td);
        //Container cache
        this.filterContainers[columnId] = fc;
        //Fields cache    
        var height = 0;
        if (!this.filterFields) this.filterFields = {};
        var fields = fc.findBy(function(cmp) {
            return !Ext.isEmpty(cmp.filterName);
        });
        if (!Ext.isEmpty(fields)) {
            for (var i = 0; i < fields.length; i++) {
                var filterName = fields[i].filterName;
                /*if(this.filterFields[filterName])
                         {
                         //Ext.destroy(this.filterFields[filterName])
                         delete this.filterFields[filterName];
                         }*/
                this.filterFields[filterName] = fields[i];
                height += fields[i].getHeight();
            }
        }

        return fc;
    },
    renderFilters: function() {
        if (!this.fcc) return;
        for (var cid in this.fcc) {
            this.renderFilterContainer(cid, this.fcc[cid]);
        }
        this.setFilters(this.filters);
        this.highlightFilters(this.isFiltered());
    },
    onRender: function() {
        this.renderFilters();
        if (this.isFiltered()) {
            this.applyFilters(false);
        }
        this.fireEvent("render", this);
    },
    getFilterField: function(filterName) {
        return this.filterFields ? this.filterFields[filterName] : null;
    },
    /**
     * Sets filter values by values specified into fo.
     * @param {Object} fo Object with attributes filterName = value
     * @param {Boolean} clear If current values must be cleared. Default = false
     */
    setFilters: function(fo, clear) {
        this.filters = fo;

        if (this.filters && this.filterFields) {
            //Delete filters that doesn't match with any field
            for (var fn in this.filters) {
                if (!this.filterFields[fn]) delete this.filters[fn];
            }

            for (var fn in this.filterFields) {
                var field = this.filterFields[fn];
                var value = this.filters[field.filterName];
                if (Ext.isEmpty(value)) {
                    if (clear) this.setFieldValue(field, '');
                } else this.setFieldValue(field, value);
            }
        }
    },
    onColResize: function(index, iWidth) {
        if (!this.filterContainers) return;
        var colId = this.grid.getColumnModel().getColumnId(index);
        var cnt = this.filterContainers[colId];
        if (cnt) {
            if (isNaN(iWidth)) iWidth = 0;
            var filterW = (iWidth < 3) ? 0 : (iWidth - 3);
            cnt.setWidth(filterW);
            //Thanks to ob1
            cnt.doLayout(false, true);
        }
    },
    /**
     * @private
     * Resize filters containers on grid resize
     * Thanks to dolittle
     */
    onResize: function() {
        var n = this.grid.getColumnModel().getColumnCount();
        for (var i = 0; i < n; i++) {
            var td = this.grid.getView().getHeaderCell(i);
            td = Ext.get(td);
            this.onColResize(i, td.getWidth());
        }
    },
    onColHidden: function(cm, index, bHidden) {
        if (bHidden) return;
        var cw = this.grid.getColumnModel().getColumnWidth(index);
        this.onColResize(index, cw);
    },
    onReconfigure: function(grid, store, cm) {
        this.destroyFilters();
        this.configure(cm);
        this.renderFilters();
    },
    saveFilters: function(grid, status) {
        var vals = {};
        for (var name in this.filters) {
            vals[name] = this.filters[name];
        }
        status["gridHeaderFilters"] = vals;
        return true;
    },
    loadFilters: function(grid, status) {
        var vals = status.gridHeaderFilters;
        if (vals) {
            if (this.cfgFilterInit) {
                if (this.filtersInitMode === 'merge') Ext.apply(vals, this.filters);
            } else this.filters = vals;
        }
    },
    isFiltered: function() {
        for (var k in this.filters) {
            if ( /*this.filterFields && this.filterFields[k] && */ !Ext.isEmpty(this.filters[k])) return true;
        }
        return false;
    },
    highlightFilters: function(enable) {
        if (!this.highlightOnFilter) return;
        if (!this.filterContainers) return;
        if (!this.grid.getView().mainHd) return;

        var tr = this.grid.getView().mainHd.child('.x-grid3-hd-row');
        if (!Ext.isEmpty(this.highlightCls)) {
            if (enable) tr.addClass(this.highlightCls);
            else tr.removeClass(this.highlightCls);
        } else {
            tr.setStyle('background-color', enable ? this.highlightColor : '');
        }
        /*for(var i=0; i < this.grid.getColumnModel().getColumnCount(); i++) 
                 {
                 var hc = Ext.get(this.grid.getView().getHeaderCell(i));
                 if(!Ext.isEmpty(this.highlightCls))
                 {
                 if(enable)
                 hc.addClass(this.highlightCls);
                 else
                 hc.removeClass(this.highlightCls);
                 }
                 else
                 {
                 hc.setStyle('background-color',enable ? this.highlightColor : 'transparent');
                 }
                 }*/
        /*var color = enable ? this.highlightColor : 'transparent';
                 for(var fn in this.filterContainers)
                 {
                 var fc = this.filterContainers[fn];
                 if(fc.rendered)
                 {
                 if(!Ext.isEmpty(this.highlightCls))
                 {
                 if(enable)
                 fc.getEl().addClass(this.highlightCls);
                 else
                 fc.getEl().removeClass(this.highlightCls);
                 }
                 else
                 fc.getEl().setStyle('backgroundColor',color);
                 }
                 }*/
    },
    getFieldValue: function(eField) {
        if (Ext.isFunction(eField.filterEncoder)) return eField.filterEncoder.call(eField, eField.getValue());
        else return eField.getValue();
    },
    setFieldValue: function(eField, value) {
        if (Ext.isFunction(eField.filterDecoder)) value = eField.filterDecoder.call(eField, value);
        eField.setValue(value);
    },
    applyFilter: function(el, bLoad) {
        if (arguments.length < 2) bLoad = true;
        if (!el) return;

        if (!el.isValid()) return;

        if (el.disabled && !Ext.isDefined(this.grid.store.baseParams[el.filterName])) return;

        var sValue = this.getFieldValue(el);

        if (el.disabled || Ext.isEmpty(sValue)) {
            delete this.grid.store.baseParams[el.filterName];
            delete this.filters[el.filterName];
        } else {
            this.grid.store.baseParams[el.filterName] = sValue;
            this.filters[el.filterName] = sValue;

            if (this.ensureFilteredVisible) {
                //Controllo che la colonna del filtro applicato sia visibile
                var ci = this.grid.getColumnModel().getIndexById(el.columnId);
                if ((ci >= 0) && (this.grid.getColumnModel().isHidden(ci))) this.grid.getColumnModel().setHidden(ci, false);
            }
        }

        //Evidenza filtri se almeno uno attivo
        this.highlightFilters(this.isFiltered());

        this.grid.fireEvent("filterupdate", el.filterName, sValue, el);

        if (bLoad) this.storeReload();
    },
    applyFilters: function(bLoad) {
        if (arguments.length < 1) bLoad = true;
        for (var fn in this.filterFields) {
            this.applyFilter(this.filterFields[fn], false);
        }
        if (bLoad) this.storeReload();
    },
    storeReload: function() {
        if (!this.grid.store.lastOptions) return;
        var slp = {
            start: 0
        };
        if (this.grid.store.lastOptions.params && this.grid.store.lastOptions.params.limit) slp.limit = this.grid.store.lastOptions.params.limit;
        this.grid.store.load({
            params: slp
        });
    },
    getFilterContainer: function(columnId) {
        return this.filterContainers ? this.filterContainers[columnId] : null;
    },
    destroyFilters: function() {
        if (this.filterFields) {
            for (var ff in this.filterFields) {
                Ext.destroy(this.filterFields[ff]);
                delete this.filterFields[ff];
            }
        }

        if (this.filterContainers) {
            for (var ff in this.filterContainers) {
                Ext.destroy(this.filterContainers[ff]);
                delete this.filterContainers[ff];
            }
        }

    }
});