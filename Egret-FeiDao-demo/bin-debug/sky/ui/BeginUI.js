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
var BeginUI = (function (_super) {
    __extends(BeginUI, _super);
    function BeginUI() {
        return _super.call(this, "BeginSkin") || this;
    }
    return BeginUI;
}(BaseUI));
__reflect(BeginUI.prototype, "BeginUI");
//# sourceMappingURL=BeginUI.js.map