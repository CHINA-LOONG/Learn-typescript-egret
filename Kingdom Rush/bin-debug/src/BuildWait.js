/**
 *
 * 建造等待动画
 * @author
 *
 */
var BuildWait = (function (_super) {
    __extends(BuildWait, _super);
    function BuildWait(name) {
        _super.call(this);
        this.buildType = { "ArrowTower01": "building1", "ShieldTower01": "building2", "MagicTower01": "building3", "ExploTower01": "building4" };
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        var res = this.buildType[name];
        this.bm = Utils.createBitmapByName(res);
        this.addChild(this.bm);
        this.bm = Utils.createBitmapByName("buildbarbg");
        this.bm.x = 23;
        this.bm.y = 23;
        this.addChild(this.bm);
        this.bm = Utils.createBitmapByName("buildbartop");
        this.bm.x = 24;
        this.bm.y = 24;
        this.bm.width = 1; //37
        this.addChild(this.bm);
        this.building();
    }
    var __egretProto__ = BuildWait.prototype;
    __egretProto__.building = function () {
        var that = this;
        TweenLite.to(this.bm, 1.5, { width: 37, ease: Linear.easeNone, onComplete: function () {
            that.dispatchEvent(new ToolEvent(ToolEvent.BUILD_COMP));
        } });
    };
    return BuildWait;
})(egret.Sprite);
BuildWait.prototype.__class__ = "BuildWait";
