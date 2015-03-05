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




require(['myBt'], function(myBt) {


    var MyBt = myBt.MyBt;
    var myBt = new MyBt();


    QUnit.test('base-callParent方法测试', function(assert) {

        var obj ={};

        myBt.widthSync(obj);


       assert.equal(obj.testPro,'1234','callParent方法测试');

        assert.equal(obj.testMe,'1111','callParent方法测试');

    });


});