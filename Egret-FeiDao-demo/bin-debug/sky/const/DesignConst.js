var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 策划配置 */
var DesignConst = (function () {
    function DesignConst() {
    }
    /** ------------------------------ map -------------------------- */
    DesignConst.mapwidth = 2000;
    DesignConst.mapheight = 3000;
    /** ------------------------------ game -------------------------- */
    DesignConst.gametime = 120;
    DesignConst.ai_num = 5;
    /** ------------------------------ kinfe -------------------------- */
    DesignConst.knife_frest_rate = 30;
    DesignConst.knifescale = 1;
    DesignConst.knife_max = 12;
    /** ------------------------------ player -------------------------- */
    DesignConst.role_move_speed = 5;
    DesignConst.role_turn_speed = 5;
    DesignConst.ai_move_speed = 4.5;
    DesignConst.ai_turn_speed = 5;
    DesignConst.eatSmallPlayerScale = 0.8;
    DesignConst.player_knife_max = 15;
    return DesignConst;
}());
__reflect(DesignConst.prototype, "DesignConst");
//# sourceMappingURL=DesignConst.js.map