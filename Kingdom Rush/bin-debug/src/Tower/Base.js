/**
 *
 * @author
 *
 */
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.call(this);
    }
    var __egretProto__ = Base.prototype;
    //
    __egretProto__.selectItem = function () {
        //console.log("地基选中");
        this.dispatchEvent(new TowerEvent(TowerEvent.SHOWTOOL, this));
    };
    __egretProto__.deselectItem = function () {
        //console.log("地基取消");
        this.dispatchEvent(new TowerEvent(TowerEvent.HIDETOOL, this));
    };
    __egretProto__.reselectItem = function () {
        //console.log("地基重选");
        this.dispatchEvent(new TowerEvent(TowerEvent.HIDETOOL, this));
        Group.dispose();
    };
    return Base;
})(egret.Sprite);
Base.prototype.__class__ = "Base";
