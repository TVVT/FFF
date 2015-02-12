define(['language','widget','messageCenter','FFF'], function(language,widget,mc) {

    var L = language.language;
    var Widget = widget.Widget;

    function Slider() {
        Widget.apply(this, arguments);
    }


    Slider.prototype.initialize = function() {
    };

    Slider.prototype.renderUI = function() {
        var me = this;
    };
    Slider.prototype.bindUI = function() {

    };

    Slider.prototype.syncUI = function() {

    };
    Slider.prototype.destructor = function() {

    };

    Slider.ATTRS = {
        name:{
            valueFn:function(){
                return 'ooooooooo';
            },
            set:function(val){
                return val + 'abc ' + this.getCount();
            }
        },
        count:{
            value:1
        },
        boundingBox:{
            value:$('<div class="bbb"></div>')
        }
    }


    return L.core.extend(Slider, Widget);

});
