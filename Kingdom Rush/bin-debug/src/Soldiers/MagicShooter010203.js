/**
 *
 * 法师01
 * @author
 *
 */
var MagicShooter010203 = (function (_super) {
    __extends(MagicShooter010203, _super);
    function MagicShooter010203() {
        _super.call(this);
        this.anchorX = 0.5;
        var data = RES.getRes("MagicShooter010203json");
        var texture = RES.getRes("MagicShooter010203png");
        var mcf = new egret.MovieClipDataFactory(data, texture);
        this.movieClipData = mcf.generateMovieClipData("MagicShooter010203");
        this.startLabel = "";
        this.endLabel = "";
        this.idleLabel = "idleDown";
    }
    var __egretProto__ = MagicShooter010203.prototype;
    return MagicShooter010203;
})(MagicWizardBase);
MagicShooter010203.prototype.__class__ = "MagicShooter010203";
