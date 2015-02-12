define(['language', 'widget'], function(language, widget) {
    var L = language.language,
        Widget = widget.Widget;

    function Rect() {
        Widget.apply(this, arguments);
    }

    Rect.ATTRS = {
        boundingBox: {
            value: $('<div class="rect"></div>')
        },
        color: {
            value: 'blue'
        },
        width: {
            value: 100
        },
        height: {
            value: 100
        },
        area: {
            valueFn: function() {
                return this.getWidth() * this.getHeight();
            },
            get: function() {
                return this.getWidth() * this.getHeight();
            }
        }

    }

    Rect.prototype = {
        renderUI: function() {
            this.getBoundingBox().width(this.getWidth()).height(this.getHeight()).css('background-color',this.getColor());
            this.getBoundingBox().append('<p>我的面积是:' + this.getArea() + '</p>');
        },
        bindUI: function() {

        },
        syncUI: function() {

        },
        render: function() {
            this.superclass.render.call(this);
            this.getBoundingBox().css('margin-left',Math.random()*100+'px');
        },
        destructor: function() {

        },
        initialize:function(){

        }
    }

    L.core.extend(Rect, Widget);

    return {
        Rect: Rect
    };

})
