/**
 *
 * 防御塔01
 * @author
 *
 */
var ShieldTower01 = (function (_super) {
    __extends(ShieldTower01, _super);
    //两位shooter
    //private st: ShieldSoilder01;
    function ShieldTower01() {
        _super.call(this);
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        this.bm = Utils.createBitmapByName("ShieldTower01");
        this.addChild(this.bm);
        ////利用对象池创建ShieldSoilder01
    }
    var __egretProto__ = ShieldTower01.prototype;
    return ShieldTower01;
})(egret.Sprite);
ShieldTower01.prototype.__class__ = "ShieldTower01";
