/**
 * Created by lb on 15/3/5.
 */
define('testOffAll', ['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function TestOffAll() {
        Widget.apply(this, arguments);
    }

    F.extend(TestOffAll, Widget);

    return {
        TestOffAll: TestOffAll
    };
});



require(['testOffAll'], function(testOffAll) {
    var TestOffAll = testOffAll.TestOffAll;
    var testOffAll1 = new TestOffAll();



    QUnit.test('offAll-注销所有事件', function(assert) {
        expect(2);

        //test绑定自定义的fireHouse以及publish事件
        testOffAll1.on('fireHouse', function(obj) {
            assert.ok(true, '自定义事件绑定测试：' + obj.target);
        });
        testOffAll1.on('publish', function(obj) {
            assert.ok(true, '自定义事件绑定测试：' + obj.target);
        });

        //手动触发自定义的fireHouse事件
        //传递给事件处理程序的额外参数target。
        testOffAll1.trigger('fireHouse', {
            target: '我是testOffAll1,fireHouse'
        });
        testOffAll1.trigger('fireHouse', {
            target: '我是testOffAll1,publish'
        });

        //移除fireHouse事件处理函数
        testOffAll1.offAll();

        //再次手动触发自定义的fireHouse事件
        //此时应该不触发任何事件
        testOffAll1.trigger('fireHouse', {
            target: '我是testOffAll1,fireHouse'
        });
        testOffAll1.trigger('fireHouse', {
            target: '我是testOffAll1,publish'
        });



    });



});