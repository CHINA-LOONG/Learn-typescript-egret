var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerVO = (function () {
    function PlayerVO() {
        this.knife_num = 0;
        /** 离圆心的距离 */
        this.dis_from_circle = 64;
        this.direction = 0;
    }
    PlayerVO.prototype.clear = function () {
        this.skinvo = null;
    };
    PlayerVO.prototype.reset = function () {
        this.skinvo = null;
    };
    PlayerVO.prototype.destroy = function () {
    };
    return PlayerVO;
}());
__reflect(PlayerVO.prototype, "PlayerVO", ["IPool"]);
window['PlayerVO'] = PlayerVO;
//# sourceMappingURL=PlayerVO.js.map