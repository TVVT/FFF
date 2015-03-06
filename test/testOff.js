/**
 * Created by lb on 15/3/5.
 */
define('testOff', ['FFF'], function(FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function TestOff() {
        Widget.apply(this, arguments);
    }


    F.extend(TestOff, Widget);

    return {
        TestOff: TestOff
    };

});


require(['testOff'], function(testOff) {


    var TestOff = testOff.TestOff;
    var testOff1 = new TestOff();


    QUnit.test('off-移除一个事件处理函数', function(assert) {
        expect(1);


        //testOff1绑定自定义的fireHouse事件
        testOff1.on('fireHouse', function(obj) {
            assert.ok(true, '事件触发成功');
        });

        //手动触发自定义的fireHouse事件
        testOff1.trigger('fireHouse');

        //移除fireHouse事件处理函数
        testOff1.off('fireHouse');

        //再次手动触发自定义的fireHouse事件
        testOff1.trigger('fireHouse');
    });


});