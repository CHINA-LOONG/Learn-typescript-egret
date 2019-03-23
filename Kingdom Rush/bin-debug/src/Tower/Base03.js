/**
 *
 * 地基02
 * @author
 *
 */
var Base03 = (function (_super) {
    __extends(Base03, _super);
    function Base03() {
        _super.call(this);
        this.cacheAsBitmap = true;
        var bm = Utils.createBitmapByName("Base03");
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.addChild(bm);
    }
    var __egretProto__ = Base03.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
    };
    return Base03;
})(Base);
Base03.prototype.__class__ = "Base03";
