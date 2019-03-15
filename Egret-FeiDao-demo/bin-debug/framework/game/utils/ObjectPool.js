var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectPool = (function () {
    function ObjectPool() {
    }
    ObjectPool.returnItem = function (classType, item) {
        if (item == null)
            return;
        var list;
        if (!this.pools.hasOwnProperty(classType)) {
            list = [];
            this.pools[classType] = list;
        }
        else {
            list = this.pools[classType];
        }
        item.reset();
        if (list.indexOf(item) >= 0) {
            console.warn("return objcet error: have same object type " + classType + "?");
            return;
        }
        list.push(item);
    };
    /**
     *Get one item from pool
     * @param classType：
     * @return
     *
     */
    ObjectPool.getObject = function (classType) {
        var poolList;
        if (!this.pools.hasOwnProperty(classType)) {
            poolList = [];
            this.pools[classType] = poolList;
        }
        else {
            poolList = this.pools[classType];
        }
        if (poolList.length > 0) {
            return poolList.shift();
        }
        var obj_class = egret.getDefinitionByName(classType);
        if (obj_class == null) {
            console.error("ObjectPool:" + "\"" + classType + "\"" + " not found please check!!!");
            return;
        }
        var obj = new obj_class();
        if (obj == null) {
            console.error("getObject:" + "\"" + classType + "\"" + " is  not a IPool  children!! please check!!!");
            return;
        }
        return obj;
    };
    //dictionary
    ObjectPool.pools = new Object();
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map