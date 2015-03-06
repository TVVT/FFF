/**
 * Created by lb on 15/3/5.
 */

require(['FFF'], function(FFF) {
    var F = FFF.FFF;

    var receiver = {
        width: 100,
        height: 200
    };

    var supplier = {
        width: 300,
        left: 200
    };

    QUnit.test('mix-混合两个Object的属性,默认不覆盖目标已有属性', function(assert) {
        //混合两个Object的属性
        //默认不覆盖目标已有属性
        F.mix(receiver, supplier);


        assert.equal(receiver.left, 200, 'receiver中拥有supplier中的left');
        assert.equal(receiver.width, 100, '默认不覆盖目标已有属性');
    });



    var receiver1 = {
        width: 100,
        height: 200
    };

    var supplier1 = {
        width: 300,
        left: 200
    };


    QUnit.test('mix-混合两个Object的属性,覆盖目标已有属性', function(assert) {
        //混合两个Object的属性
        //覆盖目标已有属性
        F.mix(receiver1, supplier1, true);
        
        assert.equal(receiver1.left, 200, 'receiver中拥有supplier中的left');
        assert.equal(receiver1.width, 300, '覆盖目标已有属性');
    });


});