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
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    MainScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.Group_mbtn.touchEnabled = true;
        this.Group_mbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target === _this.Group_mbtn) {
                console.log("點擊空白的位置");
                return;
            }
            var theBtn = e.target;
            // 在点击触发这个事件的时候,点击的那个btn已经变成了选中状态
            // 判断theBtn是否存在theBtn.selected属性且为true
            if (theBtn.selected && theBtn.selected != undefined) {
                _this.toggleBtn(theBtn);
            }
            else {
                // 当selected为false的时候,说明按钮在点击之前就是选中状态
                // 点击后变成了false,所以这里改回选中状态
                theBtn.selected = true;
            }
        }, this);
    };
    /**
 * 切换按钮
 */
    MainScene.prototype.toggleBtn = function (btn) {
        // 先把所有的按钮都设置为不选中
        for (var i = 0; i < this.Group_mbtn.numChildren; i++) {
            var theBtn = this.Group_mbtn.getChildAt(i);
            theBtn.selected = false;
        }
        if (!btn) {
            return;
        }
        // 把传进来的btn设置为选中状态
        btn.selected = true;
        var index = this.Group_mbtn.getChildIndex(btn);
        switch (index) {
            case 0:
                SceneManager.instance.toPlayerScene();
                this.setChildIndex(this.Group_mbtn, this.numChildren); //这是提到开启界面的上层
                break;
            case 1:
                SceneManager.instance.toHeroScene();
                this.setChildIndex(this.Group_mbtn, this.numChildren);
                break;
            case 2:
                // SceneManager.instance.toPlayerScene();
                this.setChildIndex(this.Group_mbtn, this.numChildren);
                break;
            case 3:
                // SceneManager.instance.toPlayerScene();
                this.setChildIndex(this.Group_mbtn, this.numChildren);
                break;
            default:
                break;
        }
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainScene.js.map