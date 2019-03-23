/**
 *
 * 地基01
 * @author
 *
 */
var Base01 = (function (_super) {
    __extends(Base01, _super);
    function Base01() {
        _super.call(this);
        this.cacheAsBitmap = true;
        var bm = Utils.createBitmapByName("empty01");
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.addChild(bm);
    }
    var __egretProto__ = Base01.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
    };
    return Base01;
})(Base);
Base01.prototype.__class__ = "Base01";
