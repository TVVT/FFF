/**
 * MessageCenter
 */

define(['language', 'eventEmitter'], function (L, eventEmitter) {
    var L = language.language;
    L.messageCenter = {
        __events__: {},
        /**
         * 在全局消息中心注册事件
         * @param obj   监听该事件的对象
         * @param evt   事件名
         * @param callback  事件处理回调函数
         * @returns {L.messageCenter}
         */
        on: function (obj, evt, callback) {
            this.__events__[evt] || (this.__events__[evt] = []);
            this.__events__[evt].push({
                fn: callback,
                scope: obj
            });
            return this;
        },
        /**
         * 触发消息中心事件
         * @param evt   事件名
         * @param data  代入数据
         * @returns {L.messageCenter}
         */
        fire: function (evt, data) {
            if (this.__events__.hasOwnProperty(evt)) {
                var ev = this.__events__[evt];
                ev.forEach(function (o) {
                    o.fn.call(this, o.scope, data);
                });
            }
            return this;
        },
        /**
         * 注销事件
         * @param evt   事件名
         * @param exclude   需要排除的对象
         * @returns {L.messageCenter}
         */
        off: function (evt, exclude) {
            if (this.__events__.hasOwnProperty(evt)) {
                var ev = this.__events__[evt];
                ev.forEach(function (o, index) {
                    if (o.scope === exclude) {
                        ev.splice(index, 1);
                    }
                });

            }
            return this;
        }
    };

    return L.messageCenter;
});
