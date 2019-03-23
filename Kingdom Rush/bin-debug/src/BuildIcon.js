/**
 *
 * 建造工具icon
 * @author
 *
 */
var BuildIcon = (function (_super) {
    __extends(BuildIcon, _super);
    function BuildIcon(towerName) {
        _super.call(this);
        //升级直接 ArrowTower02 ArrowTower03 以此类推
        this.dic = {
            "ArrowTower01": { "className": "ArrowTower01", "res": "gj01", "price": 60 },
            "ShieldTower01": { "className": "ShieldTower01", "res": "dp01", "price": 70 },
            "MagicTower01": { "className": "MagicTower01", "res": "mf01", "price": 100 },
            "ExploTower01": { "className": "ExploTower01", "res": "zd01", "price": 125 },
            "ArrowTower02": { "className": "ArrowTower02", "res": "sj", "price": 100 },
            "ShieldTower02": { "className": "ShieldTower02", "res": "sj", "price": 100 },
            "MagicTower02": { "className": "MagicTower02", "res": "sj", "price": 100 },
            "ExploTower02": { "className": "ExploTower02", "res": "sj", "price": 100 },
            "SellTower": { "className": "SellTower", "res": "sell", "price": 60 }
        };
        this.className = this.dic[towerName].className; //获取类名
        var res = this.dic[towerName].res; //获取资源名
        this.price = this.dic[towerName].price; //获取价格
        //icon
        this.bm = Utils.createBitmapByName(res);
        this.addChild(this.bm);
        if (towerName == "SellTower")
            return;
        //textbg
        this.bm = Utils.createBitmapByName("cashbg");
        this.bm.x = 8;
        this.bm.y = 32;
        this.addChild(this.bm);
        //text
    }
    var __egretProto__ = BuildIcon.prototype;
    return BuildIcon;
})(egret.Sprite);
BuildIcon.prototype.__class__ = "BuildIcon";
