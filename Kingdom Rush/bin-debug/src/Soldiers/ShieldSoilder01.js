/**
 *
 * 防御士兵01
 * @author
 *
 */
var ShieldSoldier01 = (function (_super) {
    __extends(ShieldSoldier01, _super);
    function ShieldSoldier01() {
        _super.call(this);
        this.anchorX = 0.5;
        this.anchorY = 1;
        //获取纹理
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        var data = RES.getRes("ShieldSoilder01json");
        var texture = RES.getRes("ShieldSoilder01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("ShieldSoilder01");
        this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //血条
        this.lifeBar = new LifeBar();
        this.addChild(this.lifeBar);
        this.lifeBar.x = 27;
        this.lifeBar.y = 10;
        //初始数据
        this.startLabel = "";
        this.endLabel = "";
        this.idleLabel = "idle";
        this.speed = 0.3;
        this.damage = 4;
        this.life = 40;
    }
    var __egretProto__ = ShieldSoldier01.prototype;
    /**创建-初始化*/
    __egretProto__.onCreate = function () {
        this.canClear = false;
        this.hp = 300;
        this.view.gotoAndStop(1);
    };
    /**检测生命*/
    __egretProto__.live = function () {
        if (this._hp <= 0) {
            this.canClear = true;
        }
        if (this._hp > this.life) {
            this._hp = this.life;
        }
    };
    Object.defineProperty(__egretProto__, "hp", {
        get: function () {
            return this._hp;
        },
        /**生命值变动*/
        set: function (value) {
            this._hp = value;
            this.live();
            //change lifeBar
            this.lifeBar.setProgress(this._hp, this.life);
        },
        enumerable: true,
        configurable: true
    });
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        if (this.stat == "idle") {
            this.view.gotoAndStop(1);
        }
        else if (this.stat == "running") {
            this.view.gotoAndPlay("running");
        }
        else if (this.stat == "fighting") {
            this.view.gotoAndPlay("fighting");
        }
        else if (this.stat == "dead") {
            this.view.gotoAndPlay("dead");
        }
        //死亡
        if (this.view.currentLabel == "deadEnd") {
            this.canClear = true;
        }
        //销毁
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    /**发射 参数：方向*/
    __egretProto__.setStat = function (stat, direct) {
        /*
        if(stat == "idle"){
            this.startLabel = "idle";
            this.endLabel= "idle";
        }else if(stat == "running"){
            this.startLabel = "running";
            this.endLabel= "runningEnd";
        }else if(stat == "fighting"){
            this.startLabel = "fighting";
            this.endLabel= "fightingEnd";
        }else if(stat == "dead"){
            this.startLabel = "dead";
            this.endLabel= "deadEnd";
        }
        */
        this.startLabel = stat;
        this.endLabel = stat + "End";
        this.stat = stat;
        this.view.gotoAndPlay(this.startLabel);
    };
    return ShieldSoldier01;
})(ShieldSoldierBase);
ShieldSoldier01.prototype.__class__ = "ShieldSoldier01";
