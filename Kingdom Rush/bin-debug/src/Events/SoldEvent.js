/**
 *
 * 士兵事件
 * @author
 *
 */
var SoldEvent = (function (_super) {
    __extends(SoldEvent, _super);
    function SoldEvent(type, obj, arr, bubbles, cancelable) {
        if (obj === void 0) { obj = null; }
        if (arr === void 0) { arr = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._obj = obj;
        this._arr = arr;
    }
    var __egretProto__ = SoldEvent.prototype;
    Object.defineProperty(__egretProto__, "obj", {
        get: function () {
            return this._obj;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "arr", {
        get: function () {
            return this._arr;
        },
        enumerable: true,
        configurable: true
    });
    SoldEvent.SELECT = "select";
    SoldEvent.DESELECT = "deselect";
    SoldEvent.MOVE = "move";
    return SoldEvent;
})(egret.Event);
SoldEvent.prototype.__class__ = "SoldEvent";
