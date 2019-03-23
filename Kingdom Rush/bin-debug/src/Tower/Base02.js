/**
 *
 * 地基02
 * @author
 *
 */
var Base02 = (function (_super) {
    __extends(Base02, _super);
    function Base02() {
        _super.call(this);
        this.cacheAsBitmap = true;
        var bm = Utils.createBitmapByName("Base02");
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.addChild(bm);
    }
    var __egretProto__ = Base02.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
    };
    return Base02;
})(Base);
Base02.prototype.__class__ = "Base02";
