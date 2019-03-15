var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
        this.mainScene = new MainScene();
        this.playerScene = new PlayerScene();
        this.heroScene = new HeroScene();
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            if (!this.sceneManager) {
                this.sceneManager = new SceneManager();
            }
            return this.sceneManager;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 设置根场景
    */
    SceneManager.prototype.setStage = function (s) {
        this._stage = s;
    };
    SceneManager.prototype.toMainScene = function () {
        if (!this.mainScene.parent) {
            this._stage.addChild(this.mainScene);
        }
        this.removeOther(null);
    };
    SceneManager.prototype.removeOther = function (scene) {
        var _this = this;
        var arr = [this.playerScene, this.heroScene];
        arr.forEach(function (item) {
            if (scene === item) {
                return;
            }
            if (item.parent) {
                _this.mainScene.removeChild(item);
            }
        });
    };
    SceneManager.prototype.toPlayerScene = function () {
        this.removeOther();
        this.mainScene.addChild(this.playerScene);
    };
    SceneManager.prototype.toHeroScene = function () {
        this.removeOther();
        this.mainScene.addChild(this.heroScene);
    };
    SceneManager.prototype.toGoodsScene = function () {
        this.removeOther();
    };
    SceneManager.prototype.toAboutScene = function () {
        this.removeOther();
    };
    SceneManager.prototype.showInfo = function (arr) {
        var text = '你选择了: ';
        if (arr.length === 0) {
            text = '厉害了什么都不选';
        }
        else {
            text += arr.toString();
        }
        var img = new egret.Bitmap();
        img.texture = RES.getRes('toast-bg_png');
        this.mainScene.addChild(img);
        img.x = this.mainScene.width / 2 - img.width / 2;
        img.y = 500;
        img.height = 40;
        // 新建一个label用来显示
        var label = new egret.TextField();
        label.text = text;
        label.size = 20;
        SceneManager.instance.mainScene.addChild(label);
        label.x = SceneManager.instance.mainScene.width / 2 - label.width / 2;
        label.y = 510;
        label.height = 40;
        // 创建一个定时器,1000毫秒后删除label
        var timer = new egret.Timer(1000, 1);
        timer.start();
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
            SceneManager.instance.mainScene.removeChild(label);
            SceneManager.instance.mainScene.removeChild(img);
        }, this);
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map