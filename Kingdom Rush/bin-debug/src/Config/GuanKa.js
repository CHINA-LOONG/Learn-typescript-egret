/**
 *
 * 关卡数据
 * @author
 *
 */
var GuanKaConfig = (function () {
    function GuanKaConfig() {
    }
    var __egretProto__ = GuanKaConfig.prototype;
    /**获取关卡状态*/
    GuanKaConfig.getData = function () {
        return GuanKaConfig.data;
    };
    /**每个关卡的资源组名*/
    GuanKaConfig.guankaData = ["guanka01load", "guanka02load", "guanka03load", "guanka04load", "guanka05load"];
    /**所有关卡当前状态(小旗旗)*/
    GuanKaConfig.data = [
        { "xpos": 250, "ypos": 80, "ispass": false },
        { "xpos": 325, "ypos": 102, "ispass": false },
        { "xpos": 325, "ypos": 162, "ispass": false },
        { "xpos": 250, "ypos": 188, "ispass": false },
        { "xpos": 140, "ypos": 225, "ispass": false },
        { "xpos": 270, "ypos": 344, "ispass": false },
        { "xpos": 427, "ypos": 274, "ispass": false },
        { "xpos": 505, "ypos": 370, "ispass": false },
        { "xpos": 603, "ypos": 320, "ispass": false },
        { "xpos": 550, "ypos": 238, "ispass": false },
        { "xpos": 490, "ypos": 188, "ispass": false },
        { "xpos": 480, "ypos": 96, "ispass": false }
    ];
    return GuanKaConfig;
})();
GuanKaConfig.prototype.__class__ = "GuanKaConfig";
