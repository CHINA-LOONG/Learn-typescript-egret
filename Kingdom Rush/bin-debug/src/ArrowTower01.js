/**
 *
 * 弓箭塔01
 * @author
 *
 */
var ArrowTower01 = (function (_super) {
    __extends(ArrowTower01, _super);
    function ArrowTower01() {
        _super.call(this);
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        this.bm = Utils.createBitmapByName("ArrowTower01");
        this.addChild(this.bm);
        ////利用对象池创建ArrowShooter01
        this.st = ObjectPool.getInstance().createObject(ArrowShooter01);
        this.st.x = 36;
        this.st.y = 15;
        this.addChild(this.st);
        this.st = ObjectPool.getInstance().createObject(ArrowShooter01);
        this.st.x = 50;
        this.st.y = 15;
        this.addChild(this.st);
        console.log(ObjectPool.getInstance()._list.length);
    }
    var __egretProto__ = ArrowTower01.prototype;
    return ArrowTower01;
})(egret.Sprite);
ArrowTower01.prototype.__class__ = "ArrowTower01";
