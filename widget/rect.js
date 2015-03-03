define(['FFF','zepto'], function(FFF,$) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Rect() {
        Widget.apply(this, arguments);
    }

    Rect.ATTRS = {
        color: {
            value: 'blue',
            changeFn:function(obj){
                // console.log(obj);
            }
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


    F.extend(Rect, Widget, {
        renderUI: function() {
            this.getBoundingBox().width(this.getWidth()).height(this.getHeight()).css('background-color', this.getColor());
            this.getBoundingBox().append('<p>我的面积是:' + this.getArea() + '</p>');
        },  
        bindUI: function() {
            
        },
        syncUI: function() {

        },
        render: function() {
            this.callParent();
            this.getBoundingBox().css('margin-left', Math.random() * 100 + 'px');
        },
        destructor: function() {

        },
        initialize: function() {
        }
    });

    return {
        Rect: Rect
    };

})
