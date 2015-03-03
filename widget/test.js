define(['FFF','zepto','rect'], function(FFF,$,rect) {
    var F = FFF.FFF;
    var Rect = rect.Rect;

    function Test() {
        Rect.apply(this, arguments);
    }

    


    F.extend(Test, Rect, {
        
        render: function() {
            this.callParent();
            this.getBoundingBox().css('margin-left', Math.random() * 100 + 'px');
        }
       
    });

    return {
        Test: Test
    };

})
