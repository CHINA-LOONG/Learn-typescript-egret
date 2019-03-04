var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MyGrid = (function (_super) {
    __extends(MyGrid, _super);
    function MyGrid() {
        var _this = _super.call(this) || this;
        _this.drawGrid();
        return _this;
    }
    MyGrid.prototype.drawGrid = function () {
        this.graphics.beginFill(0x0000ff);
        this.graphics.drawRect(0, 0, 50, 50);
        this.graphics.drawCircle(50, 50, 20);
        this.graphics.endFill();
        this.width = 200;
        this.height = 100;
        this.graphics.lineStyle(5, 0x00ff00, 0.3);
        this.graphics.drawArc(50, 50, 50, 0, 70, false);
        this.graphics.endFill();
    };
    return MyGrid;
}(egret.Shape));
__reflect(MyGrid.prototype, "MyGrid");
//# sourceMappingURL=MyGrid.js.map