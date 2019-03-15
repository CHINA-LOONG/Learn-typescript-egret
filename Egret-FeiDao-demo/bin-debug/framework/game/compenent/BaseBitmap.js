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
var BaseBitmap = (function (_super) {
    __extends(BaseBitmap, _super);
    function BaseBitmap() {
        return _super.call(this) || this;
    }
    BaseBitmap.prototype.clear = function () {
    };
    BaseBitmap.prototype.reset = function () {
        this.texture = null;
        this.width = 0;
        this.height = 0;
        this.alpha = 1;
        this.rotation = 0;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    };
    BaseBitmap.prototype.destroy = function () {
    };
    return BaseBitmap;
}(egret.Bitmap));
__reflect(BaseBitmap.prototype, "BaseBitmap", ["IPool"]);
window['BaseBitmap'] = BaseBitmap;
//# sourceMappingURL=BaseBitmap.js.map