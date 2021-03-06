/**
 *
 * @author
 *
 */
var FireBall = (function (_super) {
    __extends(FireBall, _super);
    function FireBall() {
        _super.call(this);
        this.ratioSoldY = this.minSoldRadius / this.maxSoldRadius;
        //获取纹理
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        this.anchorX = 0.5;
        this.anchorY = 1;
        var data = RES.getRes("stone1json");
        var texture = RES.getRes("stone1png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("stone1");
        this.view.anchorX = 0.5;
        this.view.x = this.view.width / 2;
        //设置数据属性
        //this.damage = 100;
    }
    var __egretProto__ = FireBall.prototype;
    /**创建-初始化*/
    __egretProto__.onCreate = function () {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.isTravel = true;
        //this.target = null;
        this._maxSpeed = 5;
        this.fsm.changeState(0 /* idleState */);
        this.curState = 0 /* idleState */;
    };
    /**初始化 运动路径点 并移动*/
    __egretProto__.init = function (xnum, ynum) {
        //console.log(xnum + "   " + ynum);
        this.p1 = new egret.Point(xnum, ynum);
        this._position.x = this.x = xnum;
        this._position.y = this.y = ynum - 480;
        this.setPosArr();
    };
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    return FireBall;
})(FireBallBase);
FireBall.prototype.__class__ = "FireBall";
