var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AIPlayer = (function (_super) {
    __extends(AIPlayer, _super);
    function AIPlayer(vo) {
        return _super.call(this, vo) || this;
    }
    /** 每一帧执行 */
    AIPlayer.prototype.update = function () {
        _super.prototype.update.call(this);
        this.checkState();
    };
    /**游荡机制 */
    AIPlayer.prototype.checkState = function () {
        //边界-->转向
        if (this.checkBound()) {
            return;
        }
        //3秒-->转向
        this.checkTime();
    };
    /**边界判断 */
    AIPlayer.prototype.checkBound = function () {
        var bool = false;
        var a = 0;
        var b = 360;
        var dis = this.vo.radius - this.vo.circleRadius;
        if (this.x < dis) {
            this.x = dis;
            bool = true;
            b = 180;
        }
        else if (this.x > DesignConst.mapwidth - dis) {
            this.x = DesignConst.mapwidth - dis;
            bool = true;
            a = 180;
            b = 360;
        }
        if (this.y < dis) {
            this.y = dis;
            bool = true;
            if (b == 180) {
                a = 90;
                b = 180;
            }
            else if (a == 180) {
                a = 180;
                b = 270;
            }
            else {
                a = 90;
                b = 270;
            }
        }
        else if (this.y > DesignConst.mapheight - dis) {
            this.y = DesignConst.mapheight - dis;
            bool = true;
            if (b == 180) {
                a = 0;
                b = 90;
            }
            else if (a < 0) {
                a = -90;
                b = 0;
            }
            else {
                a = -90;
                b = 90;
            }
        }
        if (bool) {
            this.changeDirection(a, b);
        }
        return bool;
    };
    /**判断时间 每3秒变一次 */
    AIPlayer.prototype.checkTime = function () {
        var newtime = egret.getTimer();
        var changetime = 3000;
        if (newtime - this.lasttime >= 3000) {
            this.lasttime = newtime;
            this.changeDirection();
        }
    };
    /**每帧更新坐标 */
    AIPlayer.prototype.updateCrood = function () {
        var hu = this.vo.direction * Math.PI / 180;
        this.x += this.vo.move_speed * Math.sin(hu);
        this.y -= this.vo.move_speed * Math.cos(hu);
    };
    AIPlayer.prototype.wait = function () {
        this.x = Math.random() * DesignConst.mapwidth;
        this.y = Math.random() * DesignConst.mapheight;
    };
    AIPlayer.prototype.move = function () {
        this.changeDirection();
    };
    AIPlayer.prototype.defence = function () {
        this.updateKnifes();
    };
    AIPlayer.prototype.clear = function () {
    };
    AIPlayer.prototype.reset = function () {
    };
    AIPlayer.prototype.destroy = function () {
    };
    return AIPlayer;
}(Player));
__reflect(AIPlayer.prototype, "AIPlayer");
window['AIPlayer'] = AIPlayer;
//# sourceMappingURL=AIPlayer.js.map