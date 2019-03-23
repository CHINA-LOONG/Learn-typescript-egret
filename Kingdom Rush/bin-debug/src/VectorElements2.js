/**
 *
 * 所有具有转向行为对象的基类
 * @author
 *
 */
var VectorElements2 = (function (_super) {
    __extends(VectorElements2, _super);
    function VectorElements2() {
        _super.call(this);
        /**路径点*/
        this.posArr = [];
        /**最大移动速度*/
        this._maxSpeed = 0.3;
        /**移动角度*/
        this._angle = 0;
        /**到达阈值*/
        this._arrivalThreshold = 2;
        /**路径阈值(pathThreshold)相当于航点间距 别和_arrivalThreshold值一样 容易造成到达冲突*/
        this._pathThreshold = 5;
        this._position = new Vector2D();
        this._velocity = new Vector2D();
        this._steeringForce = new Vector2D();
    }
    var __egretProto__ = VectorElements2.prototype;
    /**实时刷新*/
    __egretProto__.onEnterFrame = function (advancedTime) {
        //console.log(this.curState);
        if (this.curState != 1 /* moveState */)
            return;
        //路径寻路点
        console.log("moving");
        this.followPath(this.posArr);
        this._velocity = this._velocity.add(this._steeringForce);
        this._steeringForce = new Vector2D();
        // 截断速度保证不超过最大速度
        this._velocity.truncate(this._maxSpeed);
        // 位置向量+速度向量
        this._position = this._position.add(this._velocity);
        // 更新位置
        this.x = this.position.x;
        this.y = this.position.y;
        // 设置自身角度
        this._angle = (this._velocity.angle * 180 / Math.PI + 360) % 360;
    };
    Object.defineProperty(__egretProto__, "position", {
        get: function () {
            return this._position;
        },
        /**
        * 读写位置向量
        */
        set: function (value) {
            this._position = value;
            this.x = this._position.x;
            this.y = this._position.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "velocity", {
        get: function () {
            return this._velocity;
        },
        /**
        * 读写加速度向量
        */
        set: function (value) {
            this._velocity = value;
        },
        enumerable: true,
        configurable: true
    });
    //-------------------------------------------------------------------------------------------------------------------
    /**寻找行为*/
    __egretProto__.seek = function (target) {
        var desiredVelocity = target.subtract(this._position); //目标向量减去当前向量
        desiredVelocity.normalize(); //将当前向量转化成单位向量
        desiredVelocity = desiredVelocity.multiply(this._maxSpeed); //数与向量的乘积
        var force = desiredVelocity.subtract(this._velocity);
        this._steeringForce = this._steeringForce.add(force);
    };
    /**到达行为*/
    __egretProto__.arrive = function (target) {
        var desiredVelocity = target.subtract(this._position); //向量差
        desiredVelocity.normalize();
        var dist = this._position.dist(target);
        if (dist > this._arrivalThreshold) {
            desiredVelocity = desiredVelocity.multiply(this._maxSpeed);
        }
        else {
            desiredVelocity = desiredVelocity.zero();
            this._velocity = this._velocity.zero(); //速度向量设置为0
            //敌人路径点走完表示逃脱，本方走完则状态切换到移动完成
            this.fsm.changeState(2 /* moveEndState */);
        }
        var force = desiredVelocity.subtract(this._velocity); //力向量=向量差-速度向量
        this._steeringForce = this._steeringForce.add(force);
    };
    /**跟随路径点*/
    __egretProto__.followPath = function (path, loop) {
        if (loop === void 0) { loop = false; }
        var wayPoint = path[this._pathIndex];
        if (wayPoint == null)
            return;
        //this._isarrival = false;
        if (this._position.dist(wayPoint) < this._pathThreshold) {
            if (this._pathIndex >= path.length - 1) {
                if (loop) {
                    this._pathIndex = 0;
                }
            }
            else {
                this._pathIndex++;
            }
        }
        if (this._pathIndex >= path.length - 1 && !loop) {
            this.arrive(wayPoint);
        }
        else {
            this.seek(wayPoint);
        }
    };
    return VectorElements2;
})(Elements);
VectorElements2.prototype.__class__ = "VectorElements2";
