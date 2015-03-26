require(['FFF'],function (FFF) {
    var F= FFF.FFF;
    //type test
    QUnit.test('type方法测试', function(assert) {
        assert.equal(F.type('test'),'string', 'is string');
        assert.equal(F.type(1),'number', 'is number');
        assert.equal(F.type(false),'boolean', 'is boolean');
        assert.ok(true,'passed!');
    });


    //clone test
    QUnit.test('clone方法测试',function(assert){
        var $body=$('body');
        var cloneBody=F.clone($body);
        assert.deepEqual(cloneBody[0].OutHTML,$body[0].OutHTML,'F.clone() test passed!');
        // var $$body=document.querySelector('body');
        // var cloneDom=F.clone($$body);
        // assert.deepEqual(cloneDom,document.querySelector('body'),'passed!!')
    });
    //mix test
    QUnit.test('mix方法测试',function(assert){
        var r={
            width:'230',
            color:'red'
        };
        var s={
            height:'111',
            color:'blue'
        };
        F.mix(r,s,true);
        assert.deepEqual(r.color,s.color,'F.mix() test step1 passed!');
        assert.deepEqual(r.height,'111','F.mix() test step2 passed!F.mix() test passed!');
    });
    //extend test
    QUnit.test('extend方法测试',function(assert){
        function Shape(){
            this.action='walk';
        }

        function T(){}
        F.extend(T,Shape,{
            color:'yellow'
        });
        var myT=new T();
        assert.deepEqual(myT instanceof Shape,true,'F.extend() test passed 1!');
        assert.deepEqual(myT.color,'yellow','F.extend() test passed 2!');
    });
});