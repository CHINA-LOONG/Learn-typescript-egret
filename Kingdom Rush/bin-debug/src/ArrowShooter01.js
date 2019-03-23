/**
 *
 * 弓箭手01
 * @author
 *
 */
var ArrowShooter01 = (function (_super) {
    __extends(ArrowShooter01, _super);
    function ArrowShooter01() {
        _super.call(this);
        var data = RES.getRes("ArrowShooter01json");
        var texture = RES.getRes("ArrowShooter01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcf.generateMovieClipData("ArrowShooter01");
        //this.addEventListener(egret.Event.ENTER_FRAME,this.enH,this);
        this.gotoAndPlay("shootDown", -1);
        this.anchorX = 0.5;
    }
    var __egretProto__ = ArrowShooter01.prototype;
    __egretProto__.onEnterFrame = function (advancedTime) {
        //console.log(advancedTime);
    };
    return ArrowShooter01;
})(egret.MovieClip);
ArrowShooter01.prototype.__class__ = "ArrowShooter01";
