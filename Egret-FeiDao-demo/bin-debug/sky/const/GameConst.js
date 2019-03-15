var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.rewardAdId = "";
    GameConst.bannerAdId = "";
    /** rubbish */
    GameConst.s1 = "adunit-";
    /** 是否使用服务器存储 */
    GameConst.save_server = false;
    GameConst.version = 4;
    GameConst.localversion = "localversion";
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var KNIFESTATE;
(function (KNIFESTATE) {
    KNIFESTATE[KNIFESTATE["NORMAL"] = 0] = "NORMAL";
    KNIFESTATE[KNIFESTATE["FLYING"] = 1] = "FLYING";
})(KNIFESTATE || (KNIFESTATE = {}));
var GAMESTATE;
(function (GAMESTATE) {
    GAMESTATE[GAMESTATE["START"] = 1] = "START";
    GAMESTATE[GAMESTATE["OVER"] = 2] = "OVER";
})(GAMESTATE || (GAMESTATE = {}));
var PLAYERSTATE;
(function (PLAYERSTATE) {
    PLAYERSTATE[PLAYERSTATE["WAIT"] = 1] = "WAIT";
    PLAYERSTATE[PLAYERSTATE["MOVE"] = 2] = "MOVE";
    PLAYERSTATE[PLAYERSTATE["DEFENCE"] = 3] = "DEFENCE";
    PLAYERSTATE[PLAYERSTATE["DEAD"] = 4] = "DEAD";
})(PLAYERSTATE || (PLAYERSTATE = {}));
var SKINSTATE;
(function (SKINSTATE) {
    SKINSTATE[SKINSTATE["UNLOCK"] = 0] = "UNLOCK";
    SKINSTATE[SKINSTATE["LOCK"] = 1] = "LOCK";
})(SKINSTATE || (SKINSTATE = {}));
var BEGINSTATE;
(function (BEGINSTATE) {
    BEGINSTATE[BEGINSTATE["NORMAL"] = 0] = "NORMAL";
    BEGINSTATE[BEGINSTATE["LOCK"] = 1] = "LOCK";
    BEGINSTATE[BEGINSTATE["TRYPLAY"] = 2] = "TRYPLAY";
    BEGINSTATE[BEGINSTATE["SHAREADD"] = 3] = "SHAREADD";
    BEGINSTATE[BEGINSTATE["WATCHADD"] = 4] = "WATCHADD";
})(BEGINSTATE || (BEGINSTATE = {}));
var SHARETYPE;
(function (SHARETYPE) {
    SHARETYPE[SHARETYPE["SHARE"] = 0] = "SHARE";
    SHARETYPE[SHARETYPE["SHOWOFF"] = 1] = "SHOWOFF";
})(SHARETYPE || (SHARETYPE = {}));
var WATCHTYPE;
(function (WATCHTYPE) {
    WATCHTYPE[WATCHTYPE["ADDKNIFE"] = 0] = "ADDKNIFE";
    WATCHTYPE[WATCHTYPE["TRYPLAY"] = 1] = "TRYPLAY";
})(WATCHTYPE || (WATCHTYPE = {}));
//# sourceMappingURL=GameConst.js.map