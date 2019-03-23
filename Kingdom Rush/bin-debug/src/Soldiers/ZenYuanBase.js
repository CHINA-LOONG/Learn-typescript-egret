/**
 *
 * 怪物基类
 * @author
 *
 */
var ZenYuanBase = (function (_super) {
    __extends(ZenYuanBase, _super);
    function ZenYuanBase() {
        _super.call(this);
        /**是否移动到目标*/
        this.moveToTarget = false;
        /**开火延迟*/
        this.fireDelay = 0;
        /**时间累计*/
        this.timesum = 0;
        //相对于集结点的偏移量
        this.xoffset = 0;
        this.yoffset = 0;
        /**是否在集结点*/
        this.atjijie = false;
        /**攻击范围最大半径*/
        this.maxSoldRadius = 60;
        /**攻击范围最小半径*/
        this.minSoldRadius = 40;
        /**存在时间*/
        this.sumTime = 0;
        this.totalTime = 30000;
        /**攻击音效数组*/
        this.voiceArr = ["shield_fire1", "shield_fire2", "shield_fire3"];
        this.ratioSoldY = this.minSoldRadius / this.maxSoldRadius;
        //申明状态机
        this.fsm = new StateMachine(this);
        //血条
        this.lifeBar = new LifeBar();
        this.addChild(this.lifeBar);
    }
    var __egretProto__ = ZenYuanBase.prototype;
    /**设置新的路径点 并移动*/
    __egretProto__.setPath2 = function (v2d) {
        this.posArr.length = 0;
        this.posArr.push(v2d);
        this.fsm.changeState(1 /* moveState */);
        //塔类侦听事件 这里发送消息
    };
    /**检测生命*/
    __egretProto__.live = function () {
        if (this._hp <= 0) {
            this.fsm.changeState(5 /* deadState */);
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
            this.lifeBar.setProgress(this._hp, this.life);
        },
        enumerable: true,
        configurable: true
    });
    /**销毁*/
    __egretProto__.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        if (this.target != null) {
            this.target.target = null;
            this.target = null;
        }
    };
    /**碰撞检测*/
    __egretProto__.hittest = function () {
        if (this.target != null) {
            this.target.hp -= this.damage;
            if (this.target.hp <= 0) {
                var idx = this.targets.indexOf(this.target);
                if (idx != -1)
                    this.targets.splice(idx, 1);
                idx = this.atargets.indexOf(this.target);
                if (idx != -1)
                    this.atargets.splice(idx, 1);
                this.target.target = null;
                this.target = null;
            }
        }
    };
    /**-----------------------------------------------------------------帧事件----------------------------------------------------------------------*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        //攻击间隔
        this.timesum += advancedTime;
        //状态刷新
        this.fsm.onEnterFrame(advancedTime);
        //向量刷新(移动)
        _super.prototype.onEnterFrame.call(this, advancedTime);
        //clear
        if (this.canClear) {
            ObjectPool.getInstance().destroyObject(this);
        }
    };
    /**移动方向判断*/
    __egretProto__.getMoveAngle = function (_angle) {
        //设置起始标签
        if (_angle >= 0 && _angle <= 90 || _angle >= 270 && _angle <= 360) {
            this.stateLabel = "running";
            this.view.scaleX = 1;
        }
        else if (_angle > 90 && _angle < 270) {
            this.stateLabel = "running";
            this.view.scaleX = -1;
        }
    };
    ////////////////////////////////状态执行
    /**闲置中*/
    __egretProto__.idling = function () {
        if (!(this.curState == 0 /* idleState */)) {
            this.curState = 0 /* idleState */;
            this.view.gotoAndStop(this.stateLabel);
        }
        //闲置中判断敌人!=null 若进入攻击范围则切换到攻击状态 否则切换到移动状态移动到能攻击敌人的范围 若敌人==null 则回到集结点
        this.moveOrFight();
    };
    /**移动中*/
    __egretProto__.moving = function () {
        //移动角度判断
        this.getMoveAngle(this._angle);
        if (!(this.curState == 1 /* moveState */)) {
            this.curState = 1 /* moveState */;
            this.view.gotoAndPlay(this.stateLabel);
        }
        this.checkLast(this.stateLabel);
    };
    /**移动完毕*/
    __egretProto__.movingEnd = function () {
        if (!(this.curState == 2 /* moveEndState */)) {
            this.curState = 2 /* moveEndState */;
            this.fsm.changeState(0 /* idleState */); //本方这句
        }
    };
    /**攻击中*/
    __egretProto__.fighting = function () {
        if (!(this.curState == 3 /* fightState */)) {
            this.curState = 3 /* fightState */;
            this.view.gotoAndPlay(this.stateLabel);
            //攻击方向
            if (this.target != null) {
                if (this.x <= this.target.x) {
                    this.view.scaleX = 1;
                }
                else {
                    this.view.scaleX = -1;
                }
            }
            //播放攻击音效
            var idx = Math.floor(Math.random() * 3);
            SoundManager.playEffect(this.voiceArr[idx]);
        }
        this.checkLastEnd(this.stateLabel);
    };
    /**攻击完毕-碰撞检测*/
    __egretProto__.fightingEnd = function () {
        if (!(this.curState == 4 /* fightEndState */)) {
            this.curState = 4 /* fightEndState */;
            //console.log("hittest");
            this.hittest();
            this.timesum = 0;
        }
        //攻击完毕敌人若死亡切换到闲置状态
        if (this.target == null) {
            //若敌人数组为[]则回到集结点
            //if(this.targets.length == 0) {
            //this.setPath2(this.jijieDian);
            //} else {
            this.fsm.changeState(0 /* idleState */);
        }
        else {
            //循环攻击
            if (this.timesum >= this.fireDelay) {
                this.fsm.changeState(3 /* fightState */);
                this.timesum = 0;
            }
        }
    };
    /**死亡中*/
    __egretProto__.dying = function () {
        if (!(this.curState == 5 /* deadState */)) {
            this.curState = 5 /* deadState */;
            this.view.gotoAndPlay(this.stateLabel);
        }
        this.checkLastEnd(this.stateLabel);
    };
    /**死亡完毕-可以消除*/
    __egretProto__.dyingEnd = function () {
        if (!(this.curState == 6 /* deadEndState */)) {
            this.curState = 6 /* deadEndState */;
            //console.log("士兵canClear");
            this.canClear = true;
        }
    };
    /**循环播放检查*/
    __egretProto__.checkLast = function (str) {
        var nextFrameNum = this.view.currentFrame + 1;
        var mz = this.view._getFrameLabelForFrame(nextFrameNum).name;
        if (mz != str) {
            this.view.gotoAndPlay(str);
        }
    };
    /**播放结束检查*/
    __egretProto__.checkLastEnd = function (str) {
        var nextFrameNum = this.view.currentFrame + 1;
        var mz = this.view._getFrameLabelForFrame(nextFrameNum).name;
        if (mz != str || this.view.currentFrame >= this.view.totalFrames) {
            this.view.stop();
            if (this.curState == 3 /* fightState */) {
                this.fsm.changeState(4 /* fightEndState */);
            }
            else if (this.curState == 5 /* deadState */) {
                this.fsm.changeState(6 /* deadEndState */);
            }
        }
    };
    ////////////////////////////////状态切换
    /**闲置*/
    __egretProto__.isIdle = function () {
        this.stateLabel = "idle";
        return true;
    };
    /**移动*/
    __egretProto__.isMove = function () {
        //this.stateLabel = "walking";
        return true;
    };
    /**攻击*/
    __egretProto__.isFighting = function () {
        this.stateLabel = "fighting";
        return true;
    };
    /**死亡*/
    __egretProto__.isDead = function () {
        this.stateLabel = "dead";
        return true;
    };
    ////////////////////////////////状态判断
    /**闲置中判断敌人!=null 且若进入攻击范围则切换到攻击状态 否则切换到移动状态移动到能攻击敌人的范围 若敌人==null 则回到集结点*/
    __egretProto__.moveOrFight = function () {
        //获取目标敌人 互设目标
        this.getTarget();
        //移动到和攻击目标
        if (this.target != null) {
            //移动到目标地点
            if (!this.moveToTarget) {
                this.moveToTarget = true;
                this.target.beAttack = false;
                //判断x,y距离
                var tx;
                var ty;
                if (this.target.x < this.x)
                    tx = this.target.x + 16;
                else
                    tx = this.target.x - 16;
                ty = this.target.y;
                this.atjijie = false;
                this.setPath2(new Vector2D(tx, ty));
            }
            else {
                this.moveToTarget = false;
                //移动完毕后攻击
                this.fsm.changeState(3 /* fightState */);
                this.target.beAttack = true;
            }
        }
        else {
            this.moveToTarget = false;
            //若敌人数组为0且没在集结点则回到集结点
            //是否移动中判断
            if (this.atargets.length == 0) {
                if (!this.atjijie) {
                    this.atjijie = true;
                    this.setPath2(this.jijieDian);
                }
            }
        }
    };
    //寻找敌人
    __egretProto__.getTarget = function () {
        //筛选数组(进入士兵攻击的范围)
        var i;
        this.atargets = [];
        for (i = 0; i < this.targets.length; i++) {
            var obj = this.targets[i];
            var isin = Utils.containsXY(obj.x, obj.y, this.x, this.y, this.maxSoldRadius, this.ratioSoldY);
            var index = this.atargets.indexOf(obj);
            if (isin) {
                if (index == -1)
                    this.atargets.push(obj);
            }
            else {
                if (index != -1)
                    this.atargets.splice(index, 1);
            }
        }
        //互设目标
        var j;
        var tarlen = this.atargets.length;
        if (tarlen > 0) {
            if (this.target == null) {
                for (j = 0; j < tarlen; j++) {
                    var tar = this.atargets[j];
                    if (tar.target == null) {
                        tar.target = this;
                        this.target = tar;
                        break;
                    }
                }
            }
        }
    };
    return ZenYuanBase;
})(VectorElements);
ZenYuanBase.prototype.__class__ = "ZenYuanBase";
