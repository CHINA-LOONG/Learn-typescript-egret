/**
 *
 * @author
 *
 */
var MagicBullet010203 = (function (_super) {
    __extends(MagicBullet010203, _super);
    function MagicBullet010203() {
        _super.call(this);
        //获取纹理
        this.view = new egret.MovieClip();
        this.addChild(this.view);
        this.anchorX = this.anchorY = 0.5;
        var data = RES.getRes("MagicBullet010203json");
        var texture = RES.getRes("MagicBullet010203png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.view.movieClipData = mcf.generateMovieClipData("MagicBullet010203");
        //设置数据属性
        //this.damage = 100;
    }
    var __egretProto__ = MagicBullet010203.prototype;
    /**创建-初始化*/
    __egretProto__.onCreate = function () {
        this.canClear = false;
        this.isHit = false;
        this.follow = false;
        this.isTravel = true;
        this.target = null;
        this._maxSpeed = 2;
        this.fsm.changeState(0 /* idleState */);
        this.curState = 0 /* idleState */;
    };
    /**初始化 运动路径点 并移动*/
    __egretProto__.init = function (p1, tar) {
        this.target = tar;
        this._position.x = this.x = p1.x;
        this._position.y = this.y = p1.y;
        this.setPosArr();
    };
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
    };
    return MagicBullet010203;
})(MagicBulletBase);
MagicBullet010203.prototype.__class__ = "MagicBullet010203";
