/**
 *
 * 弓箭手02 动作资源类
 * @author
 *
 */
var ArrowShooter02 = (function (_super) {
    __extends(ArrowShooter02, _super);
    function ArrowShooter02() {
        _super.call(this);
        this.anchorX = 0.5;
        var data = RES.getRes("ArrowShooter02json");
        var texture = RES.getRes("ArrowShooter02png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcf.generateMovieClipData("ArrowShooter02");
        this.startLabel = "";
        this.endLabel = "";
        this.idleLabel = "idleDown";
    }
    var __egretProto__ = ArrowShooter02.prototype;
    return ArrowShooter02;
})(ArrowShooterBase);
ArrowShooter02.prototype.__class__ = "ArrowShooter02";
