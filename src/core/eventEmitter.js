/**
 * Handler 类
 * 暂时放在Base文件中
 */
define(['language'], function(language) {

    var L = language.language;

    function EventEmitter() {
        this.__events__ = {};
    }


    /**
     * 触发注册过的事件，暂时不抛出空事件的错误
     * @param  {String} evt 事件名
     * @param  {Object/Array} args 额外的参数
     * @return {Object} 实例对象
     */
    EventEmitter.prototype.trigger = function(evt, args) {
        if (this.__events__.hasOwnProperty(evt)) {
            var evtVal = this.__events__[evt];
            if (L.type(args) != 'array') {
                args = [args];
            }
            evtVal.forEach(function(o){
                o.handler.apply(o.scope, args);
            });
        }
        return this;
    };


    /**
     * @param evt 事件名
     * @param handler 事件处理函数
     * @param scope 作用域 默认为this
     * @returns {Object} 实例对象
     */
    EventEmitter.prototype.on = function(evt, handler, scope) {
        if (this.__events__.hasOwnProperty(evt)) {
            this.__events__[evt].push({
                handler: handler,
                scope: scope || this
            });
        } else {
            this.__events__[evt] = [{
                handler: handler,
                scope: scope || this
            }];
        }

        return this;
    };

    /**
     * 注销事件
     * @param  {String} evt 事件名
     * @return {Object} 实例对象
     */
    EventEmitter.prototype.off = function(evt) {
        if (this.__events__.hasOwnProperty(evt)) {
            delete this.__events__[evt];
        }
        return this;
    };


    /**
     * 销毁 class xx 上的所有全局绑定的事件
     * @param  {Object} target class实例
     * @return {Object} 实例对象
     */
    EventEmitter.prototype.offLink = function(target) {
        var events = this.__events__;
        Object.keys(events).forEach(function(key){
                events[key].forEach(function(scopeKey,i){
                        if(scopeKey.scope === target){
                            events[key].splice(i,1);
                        }
                });
        });
        return this;
    };

    /**
     * 注销所有事件
     * @return {Object} 实例对象
     */
    EventEmitter.prototype.offAll = function() {
        this.__events__ = {};
        return this;
    };

    return {
        EventEmitter: EventEmitter
    };
});
