"use strict";
// @ts-ignore
window.MESSANGER = /** @class */ (function () {
    function Messenger() {
    }
    Messenger.baseClass = function () {
        return /** @class */ (function () {
            function class_1() {
                this._messages = [];
            }
            class_1.prototype.emit = function (msg, data) {
                this._messages.push({ msg: msg, data: data });
            };
            class_1.prototype.on = function (name, callback) {
                if (this._messages.filter(function (_a) {
                    var msg = _a.msg;
                    return msg === name;
                })) {
                    callback();
                }
            };
            return class_1;
        }());
    };
    return Messenger;
}());
//# sourceMappingURL=global.js.map