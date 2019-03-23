/**
 *
 * 节点类
 * @author
 *
 */
var NodePoint = (function () {
    function NodePoint(x, y) {
        this.walkable = true;
        this.x = x;
        this.y = y;
    }
    var __egretProto__ = NodePoint.prototype;
    return NodePoint;
})();
NodePoint.prototype.__class__ = "NodePoint";
