/**
 *
 * 怪物基类
 * @author
 *
 */
var ShieldSoldierBase = (function (_super) {
    __extends(ShieldSoldierBase, _super);
    function ShieldSoldierBase() {
        _super.call(this);
        /**是否允许移动*/
        this.isMoving = false;
    }
    var __egretProto__ = ShieldSoldierBase.prototype;
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        if (this.isMoving) {
            this.onWalking(advancedTime);
        }
    };
    /**
    * 走动 每帧触发
    */
    __egretProto__.onWalking = function (advancedTime) {
        //分轴速度
        this.moveTime -= advancedTime;
        this.tx = this.xspeed * advancedTime;
        this.ty = this.yspeed * advancedTime * 1;
        //人物移动
        this.x += this.tx;
        this.y += this.ty;
        //移动结束
        if (this.moveTime <= 0) {
            this.nextPoint = null;
            this.nextStep();
        }
    };
    /*
     * 走向下一路径点
     */
    __egretProto__.nextStep = function () {
        if (this.nextPoint == null) {
            if (this.posArr == null || this.posArr.length == 0) {
                //走动完毕
                //this.player.stopMove();
                this.canClear = true;
                this.isMoving = false;
                return;
            }
            //开始坐标
            this.startPoint = new egret.Point(this.x, this.y);
            //结束坐标
            this.nextPoint = this.posArr.shift();
            //取得角度
            var angle = Math.atan2(this.nextPoint.y - this.startPoint.y, this.nextPoint.x - this.startPoint.x);
            //根据角度范围来确定自身scaleX
            //var jd = (angle * 180 / Math.PI + 360) % 360;
            //this.player.setMoveAngle(jd);
            //两点距离
            var dis = egret.Point.distance(this.startPoint, this.nextPoint);
            //s/ms
            var s = this.speed * 60 / 1000;
            //ms
            this.moveTime = dis / s;
            this.xspeed = s * Math.cos(angle);
            this.yspeed = s * Math.sin(angle);
        }
    };
    return ShieldSoldierBase;
})(Elements);
ShieldSoldierBase.prototype.__class__ = "ShieldSoldierBase";
