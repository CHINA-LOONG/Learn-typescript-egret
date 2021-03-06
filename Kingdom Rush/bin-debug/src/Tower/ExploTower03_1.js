/**
 *
 * 炮塔03_1
 * @author
 *
 */
var ExploTower03_1 = (function (_super) {
    __extends(ExploTower03_1, _super);
    function ExploTower03_1() {
        _super.call(this);
        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        var data = RES.getRes("ExploTower031json");
        var texture = RES.getRes("ExploTower031png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("ExploTower03_1");
        this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //初始化数据
        this.fireDelay = 2000;
    }
    var __egretProto__ = ExploTower03_1.prototype;
    /**实时刷新*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
        //进入范围敌人数组为空则直接返回
        if (this.atargets.length == 0) {
            this.timesum = this.fireDelay - 299;
            return;
        }
        //取进入范围数组第一个
        this.target = this.atargets[0];
        //发射间隔
        this.timesum += advancedTime;
        if (this.timesum < this.fireDelay) {
            if (this.fireDelay - this.timesum < 300 && !this.isfire) {
                this.view.gotoAndPlay("shoot"); //发射动作
                this.isfire = true;
            }
            return;
        }
        this.timesum = 0;
        this.isfire = false;
        //炮弹产生坐标点
        var p1;
        p1 = new egret.Point(this.sx, this.sy - 46);
        //利用对象池产生弓箭对象并进行碰撞检测
        this.weapon = ObjectPool.getInstance().createObject(Explo031);
        this.weapon.damage = 18;
        this.weapon.targets = this.atargets;
        this.weapon.init(p1, this.target, this.target.offy);
        this.contentLayer.addChild(this.weapon);
    };
    return ExploTower03_1;
})(ExploTowerBase);
ExploTower03_1.prototype.__class__ = "ExploTower03_1";
