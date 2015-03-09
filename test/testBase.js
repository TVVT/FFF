/**
 * Created by lb on 15/3/5.
 */
define('baseTest', ['FFF', 'base'], function(FFF, base) {
    var F = FFF.FFF;
    var Base = base.Base;


    function BaseTest() {
        Base.apply(this, arguments);
    }


    F.extend(BaseTest, Base, {
        widthSync: function(args) {
            args.testPro = '1234';
        }
    });

    return {
        BaseTest: BaseTest
    };

});


define('myBaseTest', ['FFF', 'baseTest'], function(FFF, baseTest) {
    var F = FFF.FFF;
    var BaseTest = baseTest.BaseTest;


    function MyBaseTest() {
        BaseTest.apply(this, arguments);
    }


    F.extend(MyBaseTest, BaseTest, {
        widthSync: function(args) {
            this.callParent(args);
            args.testMe = '1111';
        }


    });

    return {
        MyBaseTest: MyBaseTest
    };

});


/*===================================================================*/
//子类无widthSync方法
define('myBt', ['FFF', 'myBaseTest'], function(FFF, myBaseTest) {
    var F = FFF.FFF;
    var MyBaseTest = myBaseTest.MyBaseTest;


    function MyBt() {
        MyBaseTest.apply(this, arguments);
    }


    F.extend(MyBt, MyBaseTest);

    return {
        MyBt: MyBt
    };

});


//子类无widthSync方法
require(['myBt'], function(myBt) {


    var MyBt = myBt.MyBt;
    var myBt = new MyBt();


    QUnit.test('base-callParent方法测试-子类无widthSync方法', function(assert) {

        var obj = {};

        myBt.widthSync(obj);


        assert.equal(obj.testMe, '1111', '父类的testMe属性');
        assert.equal(obj.testPro, '1234', '父类的父类的testPro属性');


    });


});


/*===================================================================*/





//子类有widthSync方法
//不调用callParent
define('myBt1', ['FFF', 'myBaseTest'], function(FFF, myBaseTest) {
    var F = FFF.FFF;
    var MyBaseTest = myBaseTest.MyBaseTest;


    function MyBt1() {
        MyBaseTest.apply(this, arguments);
    }


    F.extend(MyBt1, MyBaseTest, {
        widthSync: function(args) {
            args.testBt = '2222';
        }
    });

    return {
        MyBt1: MyBt1
    };

});

//子类有widthSync方法
//不调用callParent
require(['myBt1'], function(myBt1) {


    var MyBt1 = myBt1.MyBt1;
    var myBt = new MyBt1();


    QUnit.test('base-callParent方法测试-子类有widthSync方法且不调用callParent', function(assert) {

        var obj = {};

        myBt.widthSync(obj);

        assert.equal(obj.testMe, undefined, '无父类的testMe属性');
        assert.equal(obj.testPro, undefined, '无父类的父类的testPro属性');
        assert.equal(obj.testBt, '2222', '自己的testBt属性');


    });


});

/*===================================================================*/


//子类有widthSync方法
//调用callParent
define('myBt2', ['FFF', 'myBaseTest'], function(FFF, myBaseTest) {
    var F = FFF.FFF;
    var MyBaseTest = myBaseTest.MyBaseTest;


    function MyBt2() {
        MyBaseTest.apply(this, arguments);
    }


    F.extend(MyBt2, MyBaseTest, {
        widthSync: function(args) {
            this.callParent(args);
            args.testMe = '2222';
        }
    });

    return {
        MyBt2: MyBt2
    };

});


//子类有widthSync方法
//调用callParent
require(['myBt2'], function(myBt2) {


    var MyBt2 = myBt2.MyBt2;
    var myBt = new MyBt2();


    QUnit.test('base-callParent方法测试-子类有widthSync方法且调用callParent', function(assert) {

        var obj = {};

        myBt.widthSync(obj);


        assert.equal(obj.testMe, '2222', '自己的testMe属性');
        assert.equal(obj.testPro, '1234', '父类的父类的testPro属性');


    });


});



/*===================================================================*/

define('baseInitTest', ['FFF', 'base'], function(FFF, base) {
    var F = FFF.FFF;
    var Base = base.Base;


    function BaseInitTest() {
        Base.apply(this, arguments);
    }

    BaseInitTest.ATTRS = {
        width:0
    };


    F.extend(BaseInitTest, Base);

    return {
        BaseInitTest: BaseInitTest
    };

});

require(['baseInitTest'], function(baseInitTest) {

    var BaseInitTest = baseInitTest.BaseInitTest;
 


    QUnit.test('base-构造方法属性设置测试', function(assert) {

            var test = new BaseInitTest({
                width:1234567
            });


            assert.equal(test.getWidth(),1234567,'构造方法属性设置测试');

    });


});





