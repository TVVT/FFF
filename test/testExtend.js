 /**
 * Created by toms on 15/3/20.
 */

require(['FFF'], function(FFF) {
    var F = FFF.FFF;

     function ParentCalss(){
         
     };

     ParentCalss.prototype ={
     	constructor:ParentCalss,
     	name:'toms',
     	age:20,
     	say:function(){
     		alert("OK");
     	}
     }; 

    function ChildrenClass(){
     	 
     };

     ChildrenClass.prototype={
     	constructor:ChildrenClass,
     	sex:'男',
     	age:22
     };
   

    QUnit.test('extend-继承方法', function(assert) { 
         
    	F.extend(ChildrenClass, ParentCalss,{
    		email:'test@g.com'
    	}); 

    	var heClass = new ChildrenClass();


        assert.equal(heClass.name, 'toms', 'ChildrenClass继承了ParentCalss，有了name属性');

        assert.equal(heClass.age, 22, 'ChildrenClass继承了ParentCalss，有了覆盖了ParentCalss的age的值');

        assert.equal(heClass.email, 'test@g.com', 'ChildrenClass继承了可传参数的属性，有了email属性');  
   
        assert.equal(heClass instanceof ParentCalss, true, 'ParentCalss包含heClass实例对象');  
     
    });
      

});

define('parentClass',['FFF'],function(FFF){
	var F = FFF.FFF,
        Widget = F.Widget;

     function ParentClass(){
         Widget.apply(this, arguments);
     };

     ParentClass.ATTRS = {
     	tel:{
     		value:123,
     		changeFn:function(obj){
     			console.log(obj.value+"----"+obj.preValue);
     		}
     	},
     	name:{
     		value:'toms',
     		changeFn:function(obj){
     			console.log(obj.value+"----"+obj.preValue);
     		}
     	}
     }; 

     F.extend(ParentClass,Widget);

     return {
     	ParentClass:ParentClass
     }

});


define('childrenClass',['FFF','parentClass'],function(FFF,ParentClass){
	  var F = FFF.FFF,
        Widget = F.Widget; 
       var ParentClass = ParentClass.ParentClass
     function ChildrenClass(){
     	  ParentClass.apply(this, arguments);
     };
      ChildrenClass.ATTRS = {
      	 tel:{
     		value:456,
     		changeFn:function(obj){
     			console.log(obj.value+"----"+obj.preValue);
     		}
     	}
     };

     F.extend(ChildrenClass, ParentClass,{
    		email:'test@g.com'
     }); 



     return {
     	ChildrenClass:ChildrenClass
     }

});


require(['FFF','childrenClass'], function(FFF,ChildrenClass) {
   var F = FFF.FFF;  
    QUnit.test('extend-ATTRS-继承方法', function(assert) {  

    	var heClass = new ChildrenClass.ChildrenClass();


        assert.equal(heClass.getName(), 'toms', 'ChildrenClass继承了ParentCalss，有了name属性');

        
     
    });
      

});