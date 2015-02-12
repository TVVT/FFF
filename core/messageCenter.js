/**
 * MessageCenter
 */
define(['language'], function (language) {

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
            this.__events__[evt] || (this.__events__[evt] = {});
            this.__events__[evt][obj.getId()] = {
                fn: callback,
                scope: obj
            };
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
                Object.keys(ev).forEach(function (o) {
                    ev[o].fn.call(this, ev[o].scope, data);
                });
            }
            return this;
        },
        /**
         * 注销事件
         * @param evt   事件名
         * @returns {L.messageCenter}
         */
        off: function (evt) {
            if (this.__events__.hasOwnProperty(evt)) {
                delete this.__events__[evt];
            }
            return this;
        }
    };

    return L.messageCenter;
});
