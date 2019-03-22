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
var BaseTextField = (function (_super) {
    __extends(BaseTextField, _super);
    function BaseTextField() {
        return _super.call(this) || this;
    }
    BaseTextField.prototype.clear = function () {
    };
    BaseTextField.prototype.reset = function () {
        this.text = "";
        this.width = null;
        this.height = null;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = 0;
    };
    BaseTextField.prototype.destroy = function () {
    };
    return BaseTextField;
}(egret.TextField));
__reflect(BaseTextField.prototype, "BaseTextField", ["IPool"]);
window['BaseTextField'] = BaseTextField;
