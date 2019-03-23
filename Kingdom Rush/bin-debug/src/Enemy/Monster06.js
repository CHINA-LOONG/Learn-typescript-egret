/**
 *
 * 怪物编号03
 * @author
 *
 */
var Monster06 = (function (_super) {
    __extends(Monster06, _super);
    function Monster06() {
        _super.call(this);
        this.addTexture();
    }
    var __egretProto__ = Monster06.prototype;
    /**添加纹理 初始化数据*/
    __egretProto__.addTexture = function () {
        //描点位置
        this.anchorX = 0.5;
        this.anchorY = 1;
        //获取纹理
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        var data = RES.getRes("Monster06json");
        var texture = RES.getRes("Monster06png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("Monster06");
        this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //血条位置
        this.lifeBar.x = 17;
        this.lifeBar.y = 5;
        //初始不会变化的数值数据
        this.offy = 10;
        this.fireDelay = 1000;
    };
    /**创建*/
    __egretProto__.onCreate = function () {
        //数据初始化
        this.posArr = [];
        this._pathIndex = 0;
        //状态初始化
        this.timesum = 0;
        this.lifeBar.reSet();
        this.canClear = false;
        this.beKill = false;
        this.beAttack = false;
        this.target = null;
        this.fsm.changeState(0 /* idleState */);
        this.curState = 0 /* idleState */;
    };
    /**初始化 运动路径点*/
    __egretProto__.init = function (arr, life, speed, damage, value) {
        //属性
        this.hp = this.life = life;
        this._maxSpeed = speed;
        this.damage = damage;
        this.value = value;
        //路径
        this._position.x = this.x = arr[0][0];
        this._position.y = this.y = arr[0][1];
        var i = 1;
        var len = arr.length;
        var v2d;
        //X坐标随机错开
        var offy = Math.round(10 - Math.random() * 20); //Y坐标随机错开
        for (i; i < arr.length; i++) {
            v2d = new Vector2D(arr[i][0], arr[i][1] + offy);
            this.posArr.push(v2d);
        }
        this.fsm.changeState(1 /* moveState */);
    };
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    return Monster06;
})(MonsterBase);
Monster06.prototype.__class__ = "Monster06";
