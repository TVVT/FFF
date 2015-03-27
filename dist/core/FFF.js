define(['base', 'language', 'widget'], function (base, language, widget) {

    var L = language.language;
    var Base = base.Base;
    var Widget = widget.Widget;


    var VERSION = '0.1.2';

    function FFF() {
        this.version = VERSION;
        Base.apply(this, arguments);
    }

    FFF.STATICS = {
        Language: L,
        Base: Base,
        Widget: Widget
    };


    //让FFF拥有Language类的static方法
    L.mix(FFF.prototype, L);

    L.extend(FFF, Base, FFF.STATICS);

    var F = new FFF();

    window.FFF = F;

    return {
        FFF: F
    };

});