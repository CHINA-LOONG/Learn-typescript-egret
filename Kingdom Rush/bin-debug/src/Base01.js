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
        this.anchorX = this.anchorY = 0.5;
        this.addChild(bm);
    }
    var __egretProto__ = Base01.prototype;
    return Base01;
})(egret.Sprite);
Base01.prototype.__class__ = "Base01";
