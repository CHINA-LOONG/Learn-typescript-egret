var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkinLogic = (function () {
    function SkinLogic() {
    }
    SkinLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SkinLogic();
        }
        return this.instance;
    };
    SkinLogic.prototype.initSkinData = function () {
        this.skins = {};
        var data = RES.getRes("data_json");
        for (var key in data) {
            var o = data[key];
            var vo = new SkinVO();
            vo.id = parseInt(o.id);
            vo.type = parseInt(o.type);
            vo.max = parseInt(o.max);
            vo.state = SKINSTATE.UNLOCK;
            this.skins[vo.id] = vo;
        }
    };
    SkinLogic.prototype.getSkinVOByID = function (id) {
        return this.skins[id];
    };
    return SkinLogic;
}());
__reflect(SkinLogic.prototype, "SkinLogic");
//# sourceMappingURL=SkinLogic.js.map