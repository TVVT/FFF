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


    QUnit.test('on-自定义事件绑定测试', function(assert) {
        slider1.on('fireMe', function(obj) {
            assert.ok(true, '自定义事件fireMe绑定测试：');
        });
        slider1.trigger('fireMe');
    });



    QUnit.test('on-自定义事件绑定测试(额外参数target)', function(assert) {

        //slider1绑定自定义的fireHouse事件
        slider1.on('fireHouse', function(obj) {
            assert.ok(obj.target == '我是slider1', '传递给事件处理程序的额外参数target');
        });
        //手动触发自定义的fireHouse事件
        //传递给事件处理程序的额外参数target。
        slider1.trigger('fireHouse', {
            target: '我是slider1'
        });
    });


});