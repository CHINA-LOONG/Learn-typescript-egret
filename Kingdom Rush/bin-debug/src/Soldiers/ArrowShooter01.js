/**
 *
 * 弓箭手01 动作资源类
 * @author
 *
 */
var ArrowShooter01 = (function (_super) {
    __extends(ArrowShooter01, _super);
    function ArrowShooter01() {
        _super.call(this);
        this.anchorX = 0.5;
        var data = RES.getRes("ArrowShooter01json");
        var texture = RES.getRes("ArrowShooter01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcf.generateMovieClipData("ArrowShooter01");
        this.startLabel = "";
        this.endLabel = "";
        this.idleLabel = "idleDown";
    }
    var __egretProto__ = ArrowShooter01.prototype;
    return ArrowShooter01;
})(ArrowShooterBase);
ArrowShooter01.prototype.__class__ = "ArrowShooter01";
