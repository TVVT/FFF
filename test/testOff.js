/**
 * Created by lb on 15/3/5.
 */
define('slider', ['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Slider() {
        Widget.apply(this, arguments);
    }


    F.extend(Slider, Widget);

    return {
        Slider: Slider
    };

});


require(['slider'], function(slider) {


    var Slider = slider.Slider;
    var slider1 = new Slider();


    QUnit.test('off-移除一个事件处理函数', function(assert) {
        expect(2);


        //slider1绑定自定义的fireHouse事件
        slider1.on('fireHouse', function(obj) {
            assert.ok(true, '事件触发成功');
        });

        //手动触发自定义的fireHouse事件
        slider1.trigger('fireHouse');

        //移除fireHouse事件处理函数
        slider1.off('fireHouse');

        //再次手动触发自定义的fireHouse事件
        slider1.trigger('fireHouse');
    });


});