/**
*
* 魔法塔03_2
* @author
*
*/
var MagicTower03_2 = (function (_super) {
    __extends(MagicTower03_2, _super);
    function MagicTower03_2() {
        _super.call(this);
        this.minRadius = 100;
        this.maxRadius = 140;
        this.ratioY = this.minRadius / this.maxRadius;
        this.anchorX = 0.5;
        this.anchorY = 1;
        this.bm = Utils.createBitmapByName("MagicTower03_2");
        this.addChild(this.bm);
        //创建MagicWizard01
        this.st = new MagicWizard010203();
        this.st.x = 48;
        this.st.y = 0;
        this.addChild(this.st);
        //初始化数据
        this.fireDelay = 1000;
    }
    var __egretProto__ = MagicTower03_2.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
        //实时刷新射手动作
        this.st.onEnterFrame(advancedTime);
        //进入范围敌人数组为空则直接返回
        if (this.atargets.length == 0) {
            this.timesum = this.fireDelay - 299;
            return;
        }
        //取进入范围数组第一个
        this.target = this.atargets[0];
        //确定敌人方向
        if (this.target.y <= this.sy - 22) {
            this.direct = "up";
        }
        if (this.target.y > this.sy - 22) {
            this.direct = "down";
        }
        //发射间隔
        this.timesum += advancedTime;
        if (this.timesum < this.fireDelay) {
            if (this.fireDelay - this.timesum < 300 && !this.isfire) {
                this.st.fire(this.direct);
                this.isfire = true;
            }
            return;
        }
        this.timesum = 0;
        this.isfire = false;
        //射击音效
        this.playFireVoice();
        //射击
        var p1;
        //魔法球产生坐标点
        if (this.direct == "down") {
            p1 = new egret.Point(this.sx - 9, this.sy - 58);
        }
        else {
            p1 = new egret.Point(this.sx + 5, this.sy - 58);
        }
        //this.st.fire(this.direct);
        //利用对象池产生弓箭对象并进行碰撞检测
        this.weapon = ObjectPool.getInstance().createObject(MagicBullet010203);
        this.weapon.damage = 28;
        this.contentLayer.addChild(this.weapon);
        this.weapon.init(p1, this.target);
    };
    return MagicTower03_2;
})(MagicTowerBase);
MagicTower03_2.prototype.__class__ = "MagicTower03_2";
