/**
 *
 * 建造工具
 * @author
 *
 */
var BuildTool = (function (_super) {
    __extends(BuildTool, _super);
    //根据当前选中对象类型生成建造工具
    function BuildTool(obj) {
        _super.call(this);
        this.cacheAsBitmap = true;
        this.anchorX = this.anchorY = 0.5;
        this.scaleX = this.scaleY = 0.5;
        this.alpha = 0;
        //工具圆圈
        this.bm = Utils.createBitmapByName("yuan");
        this.addChild(this.bm);
        //生成建造工具ICON
        this.createTools(obj);
        //展开动画
        TweenMax.to(this, 0.1, { alpha: 1, scaleX: 1, scaleY: 1 });
    }
    var __egretProto__ = BuildTool.prototype;
    /**根据当前选中对象类型生成建造工具*/
    __egretProto__.createTools = function (obj) {
        var icon;
        if (obj instanceof Base01) {
            icon = new BuildIcon("ArrowTower01");
            icon.x = -4;
            icon.y = -4;
            icon.touchEnabled = true;
            icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.iconClickHandle, this);
            this.addChild(icon);
            icon = new BuildIcon("ShieldTower01");
            icon.x = 75;
            icon.y = -4;
            icon.touchEnabled = true;
            icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.iconClickHandle, this);
            this.addChild(icon);
            icon = new BuildIcon("MagicTower01");
            icon.x = -4;
            icon.y = 70;
            icon.touchEnabled = true;
            icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.iconClickHandle, this);
            this.addChild(icon);
            icon = new BuildIcon("ExploTower01");
            icon.x = 75;
            icon.y = 70;
            icon.touchEnabled = true;
            icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.iconClickHandle, this);
            this.addChild(icon);
        }
        else if (obj instanceof ArrowTower01) {
            icon = new BuildIcon("ArrowTower02");
            icon.x = 36;
            icon.y = -14;
            icon.touchEnabled = true;
            icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.iconClickHandle, this);
            this.addChild(icon);
            icon = new BuildIcon("SellTower");
            icon.x = 43;
            icon.y = 98;
            icon.touchEnabled = true;
            icon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.iconClickHandle, this);
            this.addChild(icon);
        }
    };
    /**建造icon点击事件*/
    __egretProto__.iconClickHandle = function (e) {
        var className = e.currentTarget.className;
        var price = e.currentTarget.price;
        this.dispatchEvent(new ToolEvent(ToolEvent.CHANGE_BUILD, className, price));
    };
    /**隐藏工具*/
    __egretProto__.hide = function () {
        var that = this;
        TweenMax.to(that, 0.1, { alpha: 0, scaleX: 0.5, scaleY: 0.5, onComplete: function () {
            if (that.parent != null) {
                that.parent.removeChild(that);
            }
        } });
    };
    return BuildTool;
})(egret.Sprite);
BuildTool.prototype.__class__ = "BuildTool";
