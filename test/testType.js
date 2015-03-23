 /**
 * Created by toms on 15/3/20.
 */

require(['FFF'], function(FFF) {
    var F = FFF.FFF;

    var typeobj = ['1','true','test',[],{'name':'test'},1,1.2,false,undefined,null,NaN,function(){},new Date(),/^h/,new Error()]; 

   

    QUnit.test('type-判断类型', function(assert) { 

        assert.equal(F.type(typeobj[0]), 'string', '"1":是string类型');
        assert.equal(F.type(typeobj[1]), 'string', '"true":是string类型');
        assert.equal(F.type(typeobj[2]), 'string', '"test":是string类型');
        assert.equal(F.type(typeobj[3]), 'array',   '"[]":array类型');
        assert.equal(F.type(typeobj[4]), 'object',  '"{"name":"test"}":是object类型');
        assert.equal(F.type(typeobj[5]), 'number',  '1:是nbumber类型');
        assert.equal(F.type(typeobj[6]), 'number',  '1.2:是nbumber类型');
        assert.equal(F.type(typeobj[7]), 'boolean',  'false:是boolean类型');
        assert.equal(F.type(typeobj[8]), 'undefined',  'undefined:是undefined类型');
        assert.equal(F.type(typeobj[9]), 'null',  'null:是null类型');
        assert.equal(F.type(typeobj[10]), 'number',  'NaN:是number类型');
        assert.equal(F.type(typeobj[11]), 'function',  'function(){}:是function类型');
        assert.equal(F.type(typeobj[12]), 'date',  'new Date():是date类型');
        assert.equal(F.type(typeobj[13]), 'regexp',  '/^h/:是regexp类型');
        assert.equal(F.type(typeobj[14]), 'error',  'new Error():是error类型');
     
    });
     


});