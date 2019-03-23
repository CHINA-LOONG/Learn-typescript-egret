/**
 *
 * 弓箭手基类
 * @author
 *
 */
var ArrowShooterBase = (function (_super) {
    __extends(ArrowShooterBase, _super);
    function ArrowShooterBase() {
        _super.call(this);
    }
    var __egretProto__ = ArrowShooterBase.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
        if (this.currentLabel == this.endLabel) {
            this.gotoAndStop(this.idleLabel);
        }
    };
    /**发射 参数：方向*/
    __egretProto__.fire = function (direct) {
        if (direct == "downR") {
            this.startLabel = "shootDown";
            this.endLabel = "shootDownEnd";
            this.idleLabel = "idleDown";
            this.scaleX = 1;
        }
        else if (direct == "upR") {
            this.startLabel = "shootUp";
            this.endLabel = "shootUpEnd";
            this.idleLabel = "idleUp";
            this.scaleX = 1;
        }
        else if (direct == "downL") {
            this.startLabel = "shootDown";
            this.endLabel = "shootDownEnd";
            this.idleLabel = "idleDown";
            this.scaleX = -1;
        }
        else if (direct == "upL") {
            this.startLabel = "shootUp";
            this.endLabel = "shootUpEnd";
            this.idleLabel = "idleUp";
            this.scaleX = -1;
        }
        this.gotoAndPlay(this.startLabel);
        //console.log("fire");
    };
    return ArrowShooterBase;
})(egret.MovieClip);
ArrowShooterBase.prototype.__class__ = "ArrowShooterBase";
