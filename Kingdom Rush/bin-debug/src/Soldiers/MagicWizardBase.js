/**
 *
 * 法师基类
 * @author
 *
 */
var MagicWizardBase = (function (_super) {
    __extends(MagicWizardBase, _super);
    function MagicWizardBase() {
        _super.call(this);
    }
    var __egretProto__ = MagicWizardBase.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
        this.checkLastEnd(this.stateLabel);
    };
    /**发射 参数：方向*/
    __egretProto__.fire = function (direct) {
        if (direct == "down") {
            this.stateLabel = "shoot_down";
            this.idleLabel = "idleDown";
        }
        else if (direct == "up") {
            this.stateLabel = "shoot_up";
            this.idleLabel = "idleUp";
        }
        this.gotoAndPlay(this.stateLabel);
    };
    /**播放结束检查*/
    __egretProto__.checkLastEnd = function (str) {
        var nextFrameNum = this.currentFrame + 1;
        var mz = this._getFrameLabelForFrame(nextFrameNum).name;
        if (mz != str || this.currentFrame >= this.totalFrames) {
            this.gotoAndStop(this.idleLabel);
        }
    };
    return MagicWizardBase;
})(egret.MovieClip);
MagicWizardBase.prototype.__class__ = "MagicWizardBase";
