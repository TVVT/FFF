define(['language', 'attribute', 'eventEmitter'], function(language, Attribute, EventEmitter) {

    var Attribute = Attribute.Attribute;
    var EventEmitter = EventEmitter.EventEmitter;
    var L = language.language;

    /**
     * FFF基础类,所有类都讲继承Base
     */
    function Base() {
        EventEmitter.apply(this, arguments);
        Attribute.apply(this, arguments);
    }

    Base.prototype.callParent = function(){
        var me = this;
        var method = this.callParent.caller;
        var parentClass = method.$owner.superclass;
        var methodName = method.$name;
        var superMethod = parentClass.prototype[methodName];

        if(superMethod){
            superMethod.apply(me,arguments)
        }
   
    };

    L.mix(Base.prototype, Attribute.prototype, false);
    L.mix(Base.prototype, EventEmitter.prototype, false);


    return {
        Base: Base
    };

});
