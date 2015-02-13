define(['language', 'attribute', 'eventEmitter'], function(language, Attribute, EventEmitter) {

    var Attribute = Attribute.Attribute;
    var EventEmitter = EventEmitter.EventEmitter;
    var L = language.language;

    /**
     * FFF基础类,所有类都讲继承Base
     */
    function Base() {
        Attribute.apply(this, arguments);
        EventEmitter.apply(this, arguments);
    }

    L.mix(Base.prototype, Attribute.prototype, false);
    L.mix(Base.prototype, EventEmitter.prototype, false);


    return {
        Base: Base
    };

});
