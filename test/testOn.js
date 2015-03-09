/**
 * Created by lb on 15/3/5.
 */
define('testOn', ['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function TestOn() {
        Widget.apply(this, arguments);
    }


    F.extend(TestOn, Widget);

    return {
        TestOn: TestOn
    };

});


require(['testOn'], function(testOn) {


    var TestOn = testOn.TestOn;
    var testOn1 = new TestOn();


    QUnit.test('on-自定义事件绑定测试', function(assert) {
        testOn1.on('fireMe', function(obj) {
            assert.ok(true, '自定义事件fireMe绑定测试：');
        });
        testOn1.trigger('fireMe');
    });



    QUnit.test('on-自定义事件绑定测试(额外参数target)', function(assert) {

        //testOn1绑定自定义的fireHouse事件
        testOn1.on('fireHouse', function(obj) {
            assert.ok(obj.target == '我是testOn1', '传递给事件处理程序的额外参数target');
        });
        //手动触发自定义的fireHouse事件
        //传递给事件处理程序的额外参数target。
        testOn1.trigger('fireHouse', {
            target: '我是testOn1'
        });
    });


});