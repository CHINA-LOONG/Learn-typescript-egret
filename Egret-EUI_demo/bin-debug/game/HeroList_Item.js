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
var HeroList_Item = (function (_super) {
    __extends(HeroList_Item, _super);
    function HeroList_Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/game_skins/skins_item/heroItem.exml";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onComplate, _this);
        return _this;
    }
    HeroList_Item.prototype.onComplate = function () {
        var _this = this;
        this.ck_select.addEventListener(eui.UIEvent.CHANGE, function (e) {
            _this.data.isSelected = _this.ck_select.selected;
        }, this);
    };
    HeroList_Item.prototype.dataChanged = function () {
        egret.log(this.data.name);
        this.ck_select.selected = this.data.isSelected;
    };
    return HeroList_Item;
}(eui.ItemRenderer));
__reflect(HeroList_Item.prototype, "HeroList_Item");
//# sourceMappingURL=HeroList_Item.js.map