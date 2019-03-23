/**
 *
 * 所有塔基类
 * @author
 *
 */
var TowerBase = (function (_super) {
    __extends(TowerBase, _super);
    function TowerBase() {
        _super.call(this);
        /**敌人数组*/
        this.targets = [];
        /**射程范围最大半径*/
        this.maxRadius = 140;
        /**射程范围最小半径*/
        this.minRadius = 100;
    }
    var __egretProto__ = TowerBase.prototype;
    /**销毁自身*/
    __egretProto__.destory = function () {
    };
    /**塔初始化*/
    __egretProto__.init = function () {
    };
    /**实时刷新*/
    __egretProto__.onEnterFrame = function (advancedTime) {
    };
    return TowerBase;
})(Base);
TowerBase.prototype.__class__ = "TowerBase";
