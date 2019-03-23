/**
*
* 文字进度
* @author
*
*/
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.createView();
    }
    var __egretProto__ = LoadingUI.prototype;
    __egretProto__.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    __egretProto__.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
})(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
