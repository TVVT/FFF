define(['base', 'language', 'zepto'], function(base, language, $) {

    var Base = base.Base;
    var L = language.language;

    function Widget() {
        Base.apply(this, arguments);
        __initWidget__.apply(this, arguments);
        this.isWidget = true;
        this.opt = arguments[0] || {};
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

        var $container = $.zepto.isZ(containerObj.container) ? containerObj.container : $(containerObj.container);
        var $boundingBox = $.zepto.isZ(this.getBoundingBox()) ? this.getBoundingBox() : $(this.getBoundingBox());

        if (obj && typeof obj == 'object' && obj.hasOwnProperty('container')) {
            $container[containerObj.type]($boundingBox);
        };

        if ($boundingBox.parent().length == 0) {
            if (!obj || typeof obj != 'object' || !obj.hasOwnProperty('container')) {
                $container[containerObj.type]($boundingBox);
            };
        };

        this.renderUI(obj);
        this.bindUI(obj);
        this.syncUI(obj);

        return this;
    }

    Widget.prototype.destory = function() {
        var that = this;
        that.destructor();
        Object.keys(that).forEach(function(key) {
            var value = that[key];
            if (value) {
                //如果是zepto对象 移除事件并且删除dom
                if ($.zepto.isZ(value)) {
                    value.off().remove();
                };
                //如果是dom节点 删除dom
                if (value.nodeType && 'nodeType' in value) {
                    value.parentNode.removeChild(value);
                };
                //如果是Widget实例
                if (value.isWidget) {
                    value.destory();
                };
                //如果是boundingBox 那么删除Zepto对象
                if (key == 'getBoundingBox') {
                    if ($.zepto.isZ(value())) {
                        value().off().remove();
                    } else {
                        $(value()).off().remove();
                    }
                };
            }
            that[key] = null;
        });
    }


    Widget.ATTRS = {
        boundingBox: {
            value: $('<div class="boundingBox"></div>')
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

        do {
            initializers.push(ctx.initialize);
            ctx = ctx.superclass || {};
        } while (ctx.constructor.prototype.hasOwnProperty('initialize'));

        for (var i = initializers.length - 1; i >= 0; i--) {
            initializers[i].apply(this, arguments);
        };
    }

    L.extend(Widget, Base);

    return {
        Widget: Widget
    };

});
