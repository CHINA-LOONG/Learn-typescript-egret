/**
 *
 * 魔法塔01
 * @author
 *
 */
var MagicTower01 = (function (_super) {
    __extends(MagicTower01, _super);
    //两位shooter
    //private st: ArrowShooter01;
    function MagicTower01() {
        _super.call(this);
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        this.bm = Utils.createBitmapByName("MagicTower01");
        this.addChild(this.bm);
        ////利用对象池创建MagicTower01
    }
    var __egretProto__ = MagicTower01.prototype;
    return MagicTower01;
})(egret.Sprite);
MagicTower01.prototype.__class__ = "MagicTower01";
