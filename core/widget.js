define(['base', 'language', 'zepto'], function(Base, L, $) {

    function Widget() {
        Base.apply(this, arguments);
        __initWidget__.apply(this, arguments);
    }

    /**
     * Interface
     * @return {[type]} [description]
     */
    Widget.prototype.initialize = function() {};
    Widget.prototype.renderUI = function() {};
    Widget.prototype.bindUI = function() {};
    Widget.prototype.syncUI = function() {};
    Widget.prototype.destructor = function() {};

    /**
     * 渲染方法
     * @param {Object} container对象 用来Append的容器以及方法 exp: after , before , append...
     * @return {Object} 对象本身
     */
    Widget.prototype.render = function(obj) {

        var containerObj = obj ? obj : {
            container: $('body'),
            type: 'append'
        };

        this.renderUI();
        this.bindUI();
        this.syncUI();
        var container = $.zepto.isZ(containerObj.container) ? containerObj.container : $(containerObj.container);
        var boundingBox = $.zepto.isZ(this.getBoundingBox()) ? this.getBoundingBox() : $(this.getBoundingBox());
        containerObj.container[containerObj.type](boundingBox);

        return this;
    }

    Widget.prototype.destory = function() {
        return this;
    }


    Widget.ATTRS = {
        boundingBox: {
            value: 'widget'
        }
    }

    /**
     * 从父类开始调用所有子类的initialize方法
     * 这样initialize方法将成为所有控件的入口
     * TODO:是否每一个initialize都需要传入参数
     * 目前是都传入的
     */
    function __initWidget__() {
        var initializers = [];
        var ctx = this;
        var args = arguments[0];
        do {
            initializers.push(ctx.initialize);
            ctx = ctx.superclass || {};
        } while (ctx.constructor.prototype.hasOwnProperty('initialize'));
        for (var i = initializers.length - 1; i >= 0; i--) {
            initializers[i].apply(this, arguments);
            // if (i == 0 && arguments.length > 0) {
            //     initializers[i].apply(this,arguments);
            // }else{
            //     initializers[i].apply(this);
            // }
        };

        // 重置默认属性以及相关操作
        if (typeof args === 'object') {
            for (key in args) {
                if (this.constructor.ATTRS[key]) {
                    var cName = key.charAt(0).toUpperCase() + key.substr(1);
                    this['set' + cName](args[key]);
                };
            }
        };
    }

    return L.core.extend(Widget, Base);

});
