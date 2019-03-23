/**
 *
 * 移除游戏层事件
 * @author
 *
 */
var RemoveEvent = (function (_super) {
    __extends(RemoveEvent, _super);
    function RemoveEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var __egretProto__ = RemoveEvent.prototype;
    RemoveEvent.REMOVE = "remove";
    return RemoveEvent;
})(egret.Event);
RemoveEvent.prototype.__class__ = "RemoveEvent";
