/**
 *
 * 主类事件
 * @author
 *
 */
var MainEvent = (function (_super) {
    __extends(MainEvent, _super);
    function MainEvent(type, resName, bubbles, cancelable) {
        if (resName === void 0) { resName = ""; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._resName = "";
        this._resName = resName;
    }
    var __egretProto__ = MainEvent.prototype;
    Object.defineProperty(__egretProto__, "resName", {
        get: function () {
            return this._resName;
        },
        enumerable: true,
        configurable: true
    });
    MainEvent.OPENLOADBAR = "openloadbar";
    MainEvent.REMOVE = "remove";
    MainEvent.LOADCOMP = "loadcomp";
    return MainEvent;
})(egret.Event);
MainEvent.prototype.__class__ = "MainEvent";
