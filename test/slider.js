define(['language','widget','messageCenter','FFF'], function(language,widget,mc) {

    function Slider() {
        widget.apply(this, arguments);
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
            value:"foo"
        },
        title:{
            value:"bar"
        },
        id:{
            value:"123"
        },
        boundingBox:{
            value:$('<div class="bbb"></div>')
        }
    }


    return language.core.extend(Slider, widget);

});
