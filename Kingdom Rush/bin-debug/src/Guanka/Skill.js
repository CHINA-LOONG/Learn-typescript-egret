/**
 *
 * 技能
 * @author
 *
 */
var Skill = (function (_super) {
    __extends(Skill, _super);
    function Skill() {
        _super.call(this);
    }
    var __egretProto__ = Skill.prototype;
    __egretProto__.init = function (off, on, cdtime) {
        this.off = off;
        this.on = on;
        this.cdtime = cdtime;
        this.initbm();
        //技能图片
        this.skillbm.texture = RES.getRes(off);
    };
    /**技能释放*/
    __egretProto__.setPoint = function (xpos, ypos) {
        _super.prototype.setPoint.call(this, xpos, ypos);
        console.log("释放技能");
    };
    return Skill;
})(SkillBase);
Skill.prototype.__class__ = "Skill";
