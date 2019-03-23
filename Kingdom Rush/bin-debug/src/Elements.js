/**
 *
 * 场景中所有可被摧毁的对象的基类 塔除外
 * @author
 *
 */
var Elements = (function (_super) {
    __extends(Elements, _super);
    function Elements() {
        _super.call(this);
        /**敌人*/
        this.targets = [];
        /**是否可清除*/
        this.canClear = false;
    }
    var __egretProto__ = Elements.prototype;
    /**创建*/
    __egretProto__.onCreate = function () {
    };
    /**销毁*/
    __egretProto__.onDestroy = function () {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**移动*/
    __egretProto__.move = function () {
    };
    /**打击效果*/
    __egretProto__.onHit = function () {
    };
    /**帧事件*/
    __egretProto__.onEnterFrame = function (advancedTime) {
    };
    return Elements;
})(egret.Sprite);
Elements.prototype.__class__ = "Elements";
