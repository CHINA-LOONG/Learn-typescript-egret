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
var RolePlayer = (function (_super) {
    __extends(RolePlayer, _super);
    function RolePlayer(vo) {
        return _super.call(this, vo) || this;
    }
    RolePlayer.prototype.setState = function (v) {
        var up = false;
        if (this.state == PLAYERSTATE.DEFENCE && v == PLAYERSTATE.MOVE) {
            up = true;
        }
        _super.prototype.setState.call(this, v);
        // if(up){
        // 	this.updateKnifes();
        // }
    };
    RolePlayer.prototype.wait = function () {
        _super.prototype.wait.call(this);
    };
    RolePlayer.prototype.move = function () {
    };
    RolePlayer.prototype.defence = function () {
        _super.prototype.defence.call(this);
    };
    /** 每一帧执行 */
    RolePlayer.prototype.update = function () {
        _super.prototype.update.call(this);
        this.checkBound();
        Maplogic.getInstance().updateMapCrood();
    };
    /**边界判断 */
    RolePlayer.prototype.checkBound = function () {
        var dis = this.vo.radius - this.vo.circleRadius;
        if (this.x < dis) {
            this.x = dis;
        }
        else if (this.x > DesignConst.mapwidth - dis) {
            this.x = DesignConst.mapwidth - dis;
        }
        if (this.y < dis) {
            this.y = dis;
        }
        else if (this.y > DesignConst.mapheight - dis) {
            this.y = DesignConst.mapheight - dis;
        }
        return false;
    };
    RolePlayer.prototype.updateDirection = function (dir) {
        this.vo.direction = dir;
        if (dir == null) {
            this.state = PLAYERSTATE.DEFENCE;
        }
        else {
            this.state = PLAYERSTATE.MOVE;
        }
    };
    RolePlayer.prototype.clear = function () {
    };
    RolePlayer.prototype.reset = function () {
    };
    RolePlayer.prototype.destroy = function () {
    };
    return RolePlayer;
}(Player));
__reflect(RolePlayer.prototype, "RolePlayer");
//# sourceMappingURL=RolePlayer.js.map