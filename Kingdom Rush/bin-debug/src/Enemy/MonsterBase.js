/**
 *
 * 怪物基类
 * @author
 *
 */
var MonsterBase = (function (_super) {
    __extends(MonsterBase, _super);
    function MonsterBase() {
        _super.call(this);
        /**是否被攻击*/
        this.beAttack = false;
        /**开火延迟*/
        this.fireDelay = 0;
        /**时间累计*/
        this.timesum = 0;
        /**死亡中*/
        this.dieVoiceArr = ["monster_die1", "monster_die2", "monster_die3", "monster_die4"];
        //申明状态机
        this.fsm = new StateMachine(this);
        //血条
        this.lifeBar = new LifeBar();
        this.addChild(this.lifeBar);
    }
    var __egretProto__ = MonsterBase.prototype;
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
                this.target.target = null;
                this.target = null;
            }
        }
    };
    /**-------------------------------------------------------------实时刷新---------------------------------------------------------------*/
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
        if (_angle >= 0 && _angle <= 60 || _angle >= 300 && _angle <= 360) {
            this.stateLabel = "walking";
            this.view.scaleX = 1;
        }
        else if (_angle > 60 && _angle < 120) {
            this.stateLabel = "walkingDown";
        }
        else if (_angle >= 120 && _angle <= 240) {
            this.stateLabel = "walking";
            this.view.scaleX = -1;
        }
        else if (_angle > 240 && _angle < 300) {
            this.stateLabel = "walkingUp";
        }
    };
    ////////////////////////////////状态执行
    /**闲置中*/
    __egretProto__.idling = function () {
        if (!(this.curState == 0 /* idleState */)) {
            this.curState = 0 /* idleState */;
            this.view.gotoAndStop(this.stateLabel);
        }
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
        //判断目标!=null 则切换到闲置状态
        if (this.target != null) {
            this.fsm.changeState(0 /* idleState */);
        }
        this.checkLast(this.stateLabel);
    };
    /**移动完毕*/
    __egretProto__.movingEnd = function () {
        if (!(this.curState == 2 /* moveEndState */)) {
            this.curState = 2 /* moveEndState */;
            //this.fsm.changeState(stateType.idleState);//敌人不要这句
            //console.log("arrive");
            this.canClear = true;
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
        //攻击完毕敌人若死亡切换到移动状态
        if (this.target == null) {
            this.fsm.changeState(1 /* moveState */);
        }
        else {
            //循环攻击
            if (this.timesum >= this.fireDelay) {
                //攻击之前检测目标是否活着
                this.moveOrFight();
                this.fsm.changeState(3 /* fightState */);
                this.timesum = 0;
            }
        }
    };
    __egretProto__.dying = function () {
        if (!(this.curState == 5 /* deadState */)) {
            this.curState = 5 /* deadState */;
            this.view.gotoAndPlay(this.stateLabel);
            //死亡音效
            var idx = Math.floor(Math.random() * 4);
            SoundManager.playEffect(this.dieVoiceArr[idx]);
        }
        this.checkLastEnd(this.stateLabel);
    };
    /**死亡完毕-可以消除*/
    __egretProto__.dyingEnd = function () {
        if (!(this.curState == 6 /* deadEndState */)) {
            this.curState = 6 /* deadEndState */;
            this.beKill = true;
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
    __egretProto__.checkLastEnd = function (curLabel) {
        var nextFrameNum = this.view.currentFrame + 1;
        var label = this.view._getFrameLabelForFrame(nextFrameNum).name;
        if (label != curLabel || this.view.currentFrame >= this.view.totalFrames) {
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
    /**判断目标!=null 且目标距离达到攻击距离时则切换到攻击状态 若目标==null则切换到移动状态*/
    __egretProto__.moveOrFight = function () {
        if (this.target != null) {
            if (this.beAttack)
                this.fsm.changeState(3 /* fightState */);
            else
                this.fsm.changeState(0 /* idleState */);
        }
        else {
            this.beAttack = false;
            this.fsm.changeState(1 /* moveState */);
        }
    };
    return MonsterBase;
})(VectorElements);
MonsterBase.prototype.__class__ = "MonsterBase";
