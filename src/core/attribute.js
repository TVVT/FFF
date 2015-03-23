/**
 * Attribute处理类
 * 这里暂时放入Base
 */
define(['language'], function(language) {

    var L = language.language;

    function Attribute() {
        this.__initAttr__();
    }

    /**
     * 初始化所有属性 ATTRS
     * 注：如果extend中做过类属性的继承，那么此处将要改动
     */
    Attribute.prototype.__initAttr__ = function() {
        var attrs = mergeATTRS(this.constructor);
        addPrivates(this, attrs);
    };

    /**
     * merge所有父类的attrs
     * @param  {Function} cls 需要mergeATTRS属性的类
     * @param  {Object} attrs 需要merge的attrs
     * @return {Object} mixAttrs merge过所有父类ATTRS的attrs
     * 注：如果子类和父类的key一样，那么覆盖
     */
    function mergeATTRS(cls, attrs) {

        var mixAttrs = attrs || {};

        if (cls.hasOwnProperty('ATTRS')) {
            //如果子类拥有同名的属性,默认使用子类的,即不覆盖
            L.mix(mixAttrs, cls.ATTRS, false);
        }

        if (cls.superclass) {
            mergeATTRS(cls.superclass, mixAttrs);
        }

        return mixAttrs;
    }


    /**
     * 添加私有属性
     * @param  {Object} obj 目标Object
     * @param  {Object} attrs 需要设置的属性对象
     */
    function addPrivates(obj, attrs) {

        var setProp = L.setProp;
        attrs = L.clone(attrs);

        Object.keys(attrs).forEach(function(key) {

            var cName = key.charAt(0).toUpperCase() + key.substr(1);
            var setter = 'set' + cName;
            var getter = 'get' + cName;
            var delter = 'del' + cName;

            var cacheVal = attrs[key].value;

            if (attrs[key].hasOwnProperty('changeFn') && obj.on) {
                obj.on(key + 'Change', attrs[key].changeFn, obj);
            }


            setProp(false,obj,key,cacheVal);

            if (!attrs[key].hasOwnProperty('valueFn')) {
                obj[setter] = function(val) {

                    var preValue = obj[getter]();

                    setProp(true, obj, key, function() {
                        if (attrs[key].hasOwnProperty('valueFn')) {
                            cacheVal = attrs[key].valueFn.call(obj);
                        }
                        return cacheVal;
                    }, function(val) {
                        cacheVal = val;
                    });

                    if (attrs[key].hasOwnProperty('set')) {
                        var settedValue = attrs[key].set.call(obj, val);
                        Object.getOwnPropertyDescriptor(obj, key).set(settedValue);
                    } else {
                        Object.getOwnPropertyDescriptor(obj, key).set(val);
                    }

                    obj.trigger(key + 'Change', {
                        value: obj[getter](),
                        preValue: preValue
                    });

                    setProp(false, obj, key, obj[getter]());
                };
            }

            obj[getter] = function() {
                var tempVal = '';

                setProp(true, obj, key, function() {
                    if (attrs[key].hasOwnProperty('valueFn')) {
                        cacheVal = attrs[key].valueFn.call(obj);
                    }
                    return cacheVal;
                }, function(val) {
                    cacheVal = val;
                });
                if (attrs[key].hasOwnProperty('get')) {
                    tempVal = attrs[key].get.call(obj, Object.getOwnPropertyDescriptor(obj, key).get());
                } else {
                    tempVal = Object.getOwnPropertyDescriptor(obj, key).get();
                }

                setProp(false,obj,key,tempVal);

                return tempVal;
            };

            obj[delter] = function() {
                defineProperty(obj, key, {
                    enumerable: true,
                    configurable: true
                });
                delete obj[key];
                delete obj[setter];
                delete obj[getter];
                delete obj[delter];

            };
        });
    }

    return {
        Attribute: Attribute
    };
});
