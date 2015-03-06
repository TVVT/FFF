/**
 * Created by lb on 15/3/5.
 */
define('baseTest', ['FFF','base'], function(FFF,base) {
    var F = FFF.FFF;
    var Base = base.Base;


    function BaseTest() {
        Base.apply(this, arguments);
    }


    F.extend(BaseTest, Base,{
        widthSync:function(args){
            args.testPro = '1234';
        }
    });

    return {
        BaseTest: BaseTest
    };

});


define('myBaseTest', ['FFF','baseTest'], function(FFF,baseTest) {
    var F = FFF.FFF;
    var BaseTest = baseTest.BaseTest;


    function MyBaseTest() {
        BaseTest.apply(this, arguments);
    }


    F.extend(MyBaseTest, BaseTest,{
        widthSync:function(args){
            this.callParent(args);
            args.testMe = '1111';
        }


    });

    return {
        MyBaseTest: MyBaseTest
    };

});


//子类无widthSync方法
define('myBt', ['FFF','myBaseTest'], function(FFF,myBaseTest) {
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


//子类有widthSync方法
//
define('myBt1', ['FFF','myBaseTest'], function(FFF,myBaseTest) {
    var F = FFF.FFF;
    var MyBaseTest = myBaseTest.MyBaseTest;


    function MyBt1() {
        MyBaseTest.apply(this, arguments);
    }


    F.extend(MyBt1, MyBaseTest,{
        widthSync:function(args){
            args.testBt = '2222';
        }
    });

    return {
        MyBt1: MyBt1
    };

});




//子类无widthSync方法
require(['myBt'], function(myBt) {


    var MyBt = myBt.MyBt;
    var myBt = new MyBt();


    QUnit.test('base-callParent方法测试-子类无widthSync方法', function(assert) {

        var obj ={};

        myBt.widthSync(obj);


        assert.equal(obj.testMe,'1111','子类无widthSync方法');
       assert.equal(obj.testPro,'1234','子类无widthSync方法');


    });


});



require(['myBt1'], function(myBt1) {


    var MyBt1 = myBt1.MyBt1;
    var myBt = new MyBt1();


    QUnit.test('base-callParent方法测试-子类无widthSync方法', function(assert) {

        var obj ={};

        myBt.widthSync(obj);
      

        assert.equal(obj.testMe,undefined,'结果无testMe');
       assert.equal(obj.testPro,undefined,'结果无testPro');
       assert.equal(obj.testBt,'2222','结果无testPro');


    });


});




