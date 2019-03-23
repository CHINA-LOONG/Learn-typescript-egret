/**
 *
 * 炮塔01
 * @author
 *
 */
var ExploTower01 = (function (_super) {
    __extends(ExploTower01, _super);
    function ExploTower01() {
        _super.call(this);
        this.anchorX = 0.5;
        this.anchorY = 0.7;
        var data = RES.getRes("ExploTower01json");
        var texture = RES.getRes("ExploTower01png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcf.generateMovieClipData("ExploTower01");
        this.play(-1);
    }
    var __egretProto__ = ExploTower01.prototype;
    return ExploTower01;
})(egret.MovieClip);
ExploTower01.prototype.__class__ = "ExploTower01";
