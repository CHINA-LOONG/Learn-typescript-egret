/**
 *
 * 弓箭手02 动作资源类
 * @author
 *
 */
var ArrowShooter031 = (function (_super) {
    __extends(ArrowShooter031, _super);
    function ArrowShooter031() {
        _super.call(this);
        this.anchorX = 0.5;
        var data = RES.getRes("ArrowShooter031json");
        var texture = RES.getRes("ArrowShooter031png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcf.generateMovieClipData("ArrowShooter03_1");
        this.startLabel = "";
        this.endLabel = "";
        this.idleLabel = "idleDown";
    }
    var __egretProto__ = ArrowShooter031.prototype;
    return ArrowShooter031;
})(ArrowShooterBase);
ArrowShooter031.prototype.__class__ = "ArrowShooter031";
