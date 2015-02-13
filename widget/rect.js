define(['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

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

    Rect.STATICS = {
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

    F.extend(Rect, Widget,Rect.STATICS);

    return {
        Rect: Rect
    };

})
