/**
 * 基础框架
 * 包含继承,mix,namespace等基础方法
 * @return {Object}   FFF
 */
define(['zepto'], function($) {

    var TYPES = {
        'undefined': 'undefined',
        'number': 'number',
        'boolean': 'boolean',
        'string': 'string',
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Function]': 'function',
        '[object RegExp]': 'regexp',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object Error]': 'error'
    };

    var TOSTRING = Object.prototype.toString;

    /*
    F -> the First store
    F -> Fast
    F -> Front-end
     */
    var language = {
        /**
         * [extend 继承方法]
         * @param  {Function} subClass   子类
         * @param  {Function} superClass 父类
         * @param {object} px prototype properties to add/override.
         * @return {Function}        继承父类之后的子类
         * TODO: 类属性是否需要继承?
         * TODO: 需要加上一个callParent的判断，用于对父类的属性做修改
         */
        extend: function(subClass, superClass, px) {
            if (!superClass || !subClass) {
                throw new Error("extend failed, please check that all dependencies are included!");
            }

            //extend spo == superc prototype origin
            var sp = Object.create(superClass.prototype),
                spo = Object.create(superClass.prototype);
            var rp = subClass.prototype;

            // add prototype overrides
            if (px) {
                language.__override__(rp, px, subClass);
            }

            //mix subc prototype
            language.__override__(sp, rp, subClass);



            subClass.prototype = sp;
            subClass.prototype.constructor = subClass;
            /**
             * 存储父类原型链
             */
            subClass.prototype.superclass = spo;
            /**
             * 存储父类类属性
             */
            subClass.superclass = superClass;

            return subClass;
        },
        /**
         * [mix 混合两个Object的属性]
         * @param  {Object} receiver  接受supplier的属性
         * @param  {Object} supplier  提供属性给receiver
         * @param  {Boolean} overwrite 是否覆盖属性
         * @return {Object}           mix后的Object
         */
        mix: function(receiver, supplier, overwrite) {
            Object.keys(supplier).forEach(function(o) {
                if (overwrite) {
                    receiver[o] = supplier[o];
                } else {
                    if (!receiver.hasOwnProperty(o)) {
                        receiver[o] = supplier[o];
                    }
                }
            });
            return receiver;
        },
        /**
         * [ __override__ 私有方法 混合两个Object的属性 并且在属性上加入owner和name]
         * @param  {Object} receiver  接受supplier的属性
         * @param  {Object} supplier  提供属性给receiver
         * @param  {Object} cls 需要添加的owner
         * @return {Object}           mix后的Object
         */
        __override__: function(receiver, supplier, cls) {
            Object.keys(supplier).forEach(function(o) {
                receiver[o] = supplier[o];
                receiver[o].__owner__ = cls;
                receiver[o].__name__ = o;
            });
            return receiver;
        },

        type: function(o) {
            return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
        },
        clone: function(obj) {
            if (obj === null || obj === undefined) {
                return obj;
            }

            // DOM nodes
            if (obj.nodeType && obj.cloneNode) {
                return obj.cloneNode(true);
            }

            if ($.zepto.isZ(obj)) {
                return obj.clone();
            }

            var type = language.type(obj),
                i, j, k, clone, key;

            // Date
            if (type === 'date') {
                return new Date(obj.getTime());
            }

            // Array
            if (type === 'array') {
                i = obj.length;

                clone = [];

                while (i--) {
                    clone[i] = language.clone(obj[i]);
                }
            }
            // Object
            else if (type === 'object' && obj.constructor === Object) {
                clone = {};

                for (key in obj) {
                    clone[key] = language.clone(obj[key]);
                }

            }

            return clone || obj;
        },

        /**
         * [setProp 设置属性]
         * @param {[type]} fMask [是否只读]
         * @param {[type]} fObj  [目标对象]
         * @param {[type]} fKey  [需要设置的属性]
         * @param {[type]} fGet  [get方法]
         * @param {[type]} fSet  [set方法]
         */
        setProp: function(fMask, fObj, fKey, fGet, fSet) {
            var fDesc = {};
            if (fMask) {
                // accessor descriptor
                if (fGet) {
                    fDesc.get = fGet;
                } else {
                    delete fDesc.get;
                }
                if (fSet) {
                    fDesc.set = fSet;
                } else {
                    delete fDesc.set;
                }
                delete fDesc.value;
                delete fDesc.writable;
            } else {
                // data descriptor
                if (arguments.length > 3) {
                    fDesc.value = fGet;
                } else {
                    delete fDesc.value;
                }
                fDesc.writable = fMask;
                delete fDesc.get;
                delete fDesc.set;
            }
            fDesc.enumerable = fMask;
            fDesc.configurable = true;
            Object.defineProperty(fObj, fKey, fDesc);
            return fObj;
        }
    };
    return {
        language: language
    };

});
