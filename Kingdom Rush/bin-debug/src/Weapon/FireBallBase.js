/**
 *
 * 火球类
 * @author
 *
 */
var FireBallBase = (function (_super) {
    __extends(FireBallBase, _super);
    function FireBallBase() {
        _super.call(this);
        /**是否运行过程中*/
        this.isTravel = false;
        /**是否击中目标*/
        this.isHit = false;
        /**是否跟踪目标*/
        this.follow = false;
        /**攻击范围最大半径*/
        this.maxSoldRadius = 40;
        /**攻击范围最小半径*/
        this.minSoldRadius = 30;
        //申明状态机
        this.fsm = new StateMachine(this);
    }
    var __egretProto__ = FireBallBase.prototype;
    /**刷新*/
    __egretProto__.update = function () {
        if (this.follow) {
        }
    };
    /**闲置中*/
    __egretProto__.idling = function () {
        if (!(this.curState == 0 /* idleState */)) {
            this.curState = 0 /* idleState */;
        }
    };
    /**移动中*/
    __egretProto__.moving = function () {
        //移动角度判断
        //this.getMoveAngle(this._angle);
        if (!(this.curState == 1 /* moveState */)) {
            this.curState = 1 /* moveState */;
        }
    };
    /**移动完毕*/
    __egretProto__.movingEnd = function () {
        if (!(this.curState == 2 /* moveEndState */)) {
            this.curState = 2 /* moveEndState */;
            this.fsm.changeState(0 /* idleState */); //本方这句
            //console.log("arrive");
            this.hittest();
        }
    };
    /**闲置*/
    __egretProto__.isIdle = function () {
        //console.log("isIdle");
        return true;
    };
    /**移动*/
    __egretProto__.isMove = function () {
        //console.log("isMove");
        return true;
    };
    __egretProto__.setPosArr = function () {
        this._pathIndex = 0;
        this.posArr.length = 0;
        var v2d = new Vector2D(this.p1.x, this.p1.y);
        this.posArr.push(v2d);
        this.fsm.changeState(1 /* moveState */);
    };
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        _super.prototype.onEnterFrame.call(this, advancedTime);
        //this.rotation = this._angle;
        //状态刷新
        this.fsm.onEnterFrame(advancedTime);
        //刷新
        this.update();
        //旅行
        if (this.isTravel) {
            this.view.gotoAndPlay("travel");
            this.isTravel = false;
        }
        //击中
        if (this.isHit) {
            this.view.gotoAndPlay("hit");
            this.isHit = false;
        }
        //播放完成
        if (this.view.currentLabel == "hitEnd") {
            this.canClear = true;
        }
        if (this.view.currentLabel == "travelEnd") {
            this.view.gotoAndPlay("travel");
        }
        //销毁
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    /**碰撞检测*/
    __egretProto__.hittest = function () {
        //允许攻击角度
        var disx = this.x - this.p1.x < 0 ? this.p1.x - this.x : this.x - this.p1.x;
        var disy = this.y - this.p1.y < 0 ? this.p1.y - this.y : this.y - this.p1.y;
        if (disx <= 1 && disy <= 1) {
            //在椭圆范围内的允许碰撞筛选数组(进入炮弹攻击的范围)
            var i;
            this.atargets = [];
            for (i = 0; i < this.targets.length; i++) {
                var obj = this.targets[i];
                var isin = Utils.containsXY(obj.x, obj.y, this.x, this.y, this.maxSoldRadius, this.ratioSoldY);
                var index = this.atargets.indexOf(obj);
                if (isin && obj.hp > 0) {
                    if (index == -1)
                        this.atargets.push(obj);
                }
                else {
                    if (index != -1)
                        this.atargets.splice(index, 1);
                }
            }
            for (i = 0; i < this.atargets.length; i++) {
                var obj = this.atargets[i];
                obj.hp -= this.damage;
            }
            //击中敌人效果
            this.isHit = true;
        }
    };
    return FireBallBase;
})(VectorElements);
FireBallBase.prototype.__class__ = "FireBallBase";
