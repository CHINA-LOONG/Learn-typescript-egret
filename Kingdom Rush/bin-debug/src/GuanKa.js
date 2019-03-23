/**
 *
 * 关卡数据
 * @author
 *
 */
var GuanKa = (function () {
    function GuanKa() {
    }
    var __egretProto__ = GuanKa.prototype;
    /**获取关卡状态*/
    GuanKa.getData = function () {
        return GuanKa.data;
    };
    /**所有关卡当前状态(小旗旗)*/
    GuanKa.data = [
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
    return GuanKa;
})();
GuanKa.prototype.__class__ = "GuanKa";
