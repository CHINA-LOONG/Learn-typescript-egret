/**
 *
 * @author
 *
 */
var LoadBarEvent = (function (_super) {
    __extends(LoadBarEvent, _super);
    function LoadBarEvent(type, resName, bubbles, cancelable) {
        if (resName === void 0) { resName = ""; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._resName = "";
        this._resName = resName;
    }
    var __egretProto__ = LoadBarEvent.prototype;
    Object.defineProperty(__egretProto__, "resName", {
        get: function () {
            return this._resName;
        },
        enumerable: true,
        configurable: true
    });
    LoadBarEvent.CREATE = "create";
    return LoadBarEvent;
})(egret.Event);
LoadBarEvent.prototype.__class__ = "LoadBarEvent";
