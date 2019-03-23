/**
 *
 * 状态机
 *
 */
var stateType;
(function (stateType) {
    stateType[stateType["idleState"] = 0] = "idleState";
    stateType[stateType["moveState"] = 1] = "moveState";
    stateType[stateType["moveEndState"] = 2] = "moveEndState";
    stateType[stateType["fightState"] = 3] = "fightState";
    stateType[stateType["fightEndState"] = 4] = "fightEndState";
    stateType[stateType["deadState"] = 5] = "deadState";
    stateType[stateType["deadEndState"] = 6] = "deadEndState";
})(stateType || (stateType = {}));
;
var StateMachine = (function () {
    /**构造函数*/
    function StateMachine(obj) {
        this._obj = obj;
    }
    var __egretProto__ = StateMachine.prototype;
    /**改变状态*/
    __egretProto__.changeState = function (state) {
        this._curState = state;
    };
    /**实时刷新*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        switch (this._curState) {
            case 0 /* idleState */:
                if (this._obj.isIdle()) {
                    this._obj.idling();
                }
                break;
            case 1 /* moveState */:
                if (this._obj.isMove()) {
                    this._obj.moving();
                }
                break;
            case 2 /* moveEndState */:
                this._obj.movingEnd();
                break;
            case 3 /* fightState */:
                if (this._obj.isFighting()) {
                    this._obj.fighting();
                }
                break;
            case 4 /* fightEndState */:
                this._obj.fightingEnd();
                break;
            case 5 /* deadState */:
                if (this._obj.isDead()) {
                    this._obj.dying();
                }
                break;
            case 6 /* deadEndState */:
                this._obj.dyingEnd();
                break;
        }
    };
    Object.defineProperty(__egretProto__, "curState", {
        /**当前状态读取器*/
        get: function () {
            return this._curState;
        },
        enumerable: true,
        configurable: true
    });
    /**获取实例*/
    StateMachine.getInstance = function (obj) {
        if (StateMachine.instance == null) {
            StateMachine.instance = new StateMachine(obj);
        }
        return StateMachine.instance;
    };
    return StateMachine;
})();
StateMachine.prototype.__class__ = "StateMachine";
