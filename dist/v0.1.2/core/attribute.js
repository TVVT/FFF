define(["language"],function(e){function n(){this.__initAttr__()}function r(e,n){var i=n||{};return e.hasOwnProperty("ATTRS")&&t.mix(i,e.ATTRS,!1),e.superclass&&r(e.superclass,i),i}function i(e,n){var r=t.setProp;n=t.clone(n),Object.keys(n).forEach(function(t){var i=t.charAt(0).toUpperCase()+t.substr(1),s="set"+i,o="get"+i,u="del"+i,a=n[t].value;n[t].hasOwnProperty("changeFn")&&e.on&&e.on(t+"Change",n[t].changeFn,e),r(!1,e,t,a),n[t].hasOwnProperty("valueFn")||(e[s]=function(i){var s=e[o]();r(!0,e,t,function(){return n[t].hasOwnProperty("valueFn")&&(a=n[t].valueFn.call(e)),a},function(e){a=e});if(n[t].hasOwnProperty("set")){var u=n[t].set.call(e,i);Object.getOwnPropertyDescriptor(e,t).set(u)}else Object.getOwnPropertyDescriptor(e,t).set(i);e.trigger(t+"Change",{value:e[o](),preValue:s}),r(!1,e,t,e[o]())}),e[o]=function(){var i="";return r(!0,e,t,function(){return n[t].hasOwnProperty("valueFn")&&(a=n[t].valueFn.call(e)),a},function(e){a=e}),n[t].hasOwnProperty("get")?i=n[t].get.call(e,Object.getOwnPropertyDescriptor(e,t).get()):i=Object.getOwnPropertyDescriptor(e,t).get(),r(!1,e,t,i),i},e[u]=function(){defineProperty(e,t,{enumerable:!0,configurable:!0}),delete e[t],delete e[s],delete e[o],delete e[u]}})}var t=e.language;return n.prototype.__initAttr__=function(){var e=r(this.constructor);i(this,e)},{Attribute:n}});