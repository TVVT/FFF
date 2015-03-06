/**
 * Created by lb on 15/3/5.
 */
define('testTrigger', ['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function TestTrigger() {
        Widget.apply(this, arguments);
    }


    F.extend(TestTrigger, Widget);

    return {
        TestTrigger: TestTrigger
    };

});


require(['testTrigger'], function(testTrigger) {


    var TestTrigger = testTrigger.TestTrigger;
    var testTrigger1 = new TestTrigger();


    QUnit.test('tirgger-触发事件绑定测试', function(assert) {
        testTrigger1.on('fireMe', function(obj) {
            assert.ok(true, '自定义事件fireMe触发测试：');
        });
        testTrigger1.trigger('fireMe');
    });



    QUnit.test('tirgger-触发事件绑定测试(额外参数target)', function(assert) {

        //testTrigger1绑定自定义的fireHouse事件
        testTrigger1.on('fireHouse', function(obj) {
            assert.ok(obj.target == '我是testTrigger1', '传递给事件处理程序的额外参数target');
        });
        //手动触发自定义的fireHouse事件
        //传递给事件处理程序的额外参数target。
        testTrigger1.trigger('fireHouse', {
            target: '我是testTrigger1'
        });
    });


});