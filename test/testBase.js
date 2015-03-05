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
        widthSync:function(){
            this.testPro = '1234';
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
        widthSync:function(){
            this.callParent();
        }


    });

    return {
        MyBaseTest: MyBaseTest
    };

});



require(['myBaseTest'], function(myBaseTest) {


    var MyBaseTest = myBaseTest.MyBaseTest;
    var myBaseTest1 = new MyBaseTest();


    QUnit.test('base-callParent方法测试', function(assert) {

        myBaseTest1.widthSync();

       assert.equal(myBaseTest1.testPro,'1234','callParent方法测试');

    });


});