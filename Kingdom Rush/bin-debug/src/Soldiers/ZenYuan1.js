/**
 *
 * 防御士兵01
 * @author
 *
 */
var ZenYuan1 = (function (_super) {
    __extends(ZenYuan1, _super);
    //每次点击生成长度为1的路径寻路点
    function ZenYuan1() {
        _super.call(this);
        //纹理
        this.addTexture();
    }
    var __egretProto__ = ZenYuan1.prototype;
    /**添加纹理 初始化数据*/
    __egretProto__.addTexture = function () {
        this.anchorX = 0.5;
        this.anchorY = 1;
        //获取纹理
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        var data = RES.getRes("ZenYuan1json");
        var texture = RES.getRes("ZenYuan1png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("ZenYuan1");
        this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //血条位置
        this.lifeBar.x = 27;
        this.lifeBar.y = 5;
        //初始不会变化的数据
        this._maxSpeed = 0.6;
        //this.damage = 4;
        //this.life = 400;
        this.fireDelay = 1000;
    };
    /**创建-初始化*/
    __egretProto__.onCreate = function () {
        this.hp = 400;
        this.posArr = [];
        this._pathIndex = 0;
        this.sumTime = 0;
        this.timesum = 0;
        this.lifeBar.reSet();
        this.lifeBar.visible = true;
        this.canClear = false;
        this.atjijie = false;
        this.moveToTarget = false;
        this.fsm.changeState(0 /* idleState */);
        this.curState = 0 /* idleState */;
        //this.view.touchEnabled = true;
        this.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.viewSelect, this);
    };
    /**初始化 运动路径点 并移动*/
    __egretProto__.init = function (arr) {
        this.atjijie = true;
        this._position.x = this.x = arr[0][0];
        this._position.y = this.y = arr[0][1];
        var i = 1;
        var len = arr.length;
        for (i; i < arr.length; i++) {
            this.jijieDian = new Vector2D(arr[i][0] + this.xoffset, arr[i][1] + this.yoffset);
            this.posArr.push(this.jijieDian);
        }
        this.fsm.changeState(1 /* moveState */);
    };
    /**设置新的集结点*/
    __egretProto__.setPoint = function (arr) {
        this.dispatchEvent(new SoldEvent(SoldEvent.MOVE, this, arr));
    };
    /**设置新的路径点 并移动*/
    __egretProto__.setPath = function (arr) {
        this.atjijie = true;
        this.posArr.length = 0;
        this.jijieDian = new Vector2D(arr[0] + this.xoffset, arr[1] + this.yoffset);
        this.posArr.push(this.jijieDian);
        this.fsm.changeState(1 /* moveState */);
        if (this.target == null)
            return;
        if (this.target.target != null) {
            this.target.target = null;
        }
        this.target = null;
        //塔类侦听事件 这里发送消息
    };
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
        //计算多少秒后死亡
        this.sumTime += advancedTime;
        if (this.sumTime >= this.totalTime) {
            this.hp = 0;
            this.lifeBar.reSet();
            this.lifeBar.visible = false;
            this.getMoveAngle(90);
            this.sumTime = 0;
        }
    };
    /**鼠标选中对象*/
    __egretProto__.viewSelect = function (e) {
        //Group.selectItem(this);
    };
    /**销毁*/
    __egretProto__.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.view.touchEnabled = false;
        //this.view.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.viewSelect,this);
    };
    return ZenYuan1;
})(ZenYuanBase);
ZenYuan1.prototype.__class__ = "ZenYuan1";
