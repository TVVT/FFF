define(['language', 'attribute', 'eventEmitter'], function(language, attribute, eventEmitter) {

    var Attribute = attribute.Attribute;
    var EventEmitter = eventEmitter.EventEmitter;
    var L = language.language;

    /**
     * FFF基础类,所有类都讲继承Base
     */
    function Base() {
        EventEmitter.apply(this, arguments);
        Attribute.apply(this, arguments);
        __initBase__.apply(this, arguments);
    }

    Base.prototype.callParent = function(){
        var me = this;
        var method = this.callParent.caller;
        var parentClass = method.__owner__.superclass;
        var methodName = method.__name__;
        var superMethod = parentClass.prototype[methodName];

        if(superMethod){
            superMethod.apply(me,arguments);
        }
    };

    L.mix(Base.prototype, Attribute.prototype, false);
    L.mix(Base.prototype, EventEmitter.prototype, false);

    function __initBase__(){
        var args = arguments[0];
        var initializers = [];
        var ctx = this;
        // 重置默认属性以及相关操作
        if (typeof args === 'object') {
            var key;
            for (key in args) {
                var cName = key.charAt(0).toUpperCase() + key.substr(1);
                if (this.hasOwnProperty('set' + cName)) {
                    this['set' + cName](args[key]);
                }
            }
        }

        while(ctx.constructor.prototype.hasOwnProperty('initialize')){
            initializers.push(ctx.initialize);
            ctx = ctx.superclass || {};
        }

        for (var i = initializers.length - 1; i >= 0; i--) {
            initializers[i].apply(this, arguments);
        }
    }

    return {
        Base: Base
    };

});
