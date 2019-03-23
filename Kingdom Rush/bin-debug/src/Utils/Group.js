/**
 *
 * 对象管理类
 * @author
 *
 */
var Group = (function () {
    function Group() {
    }
    var __egretProto__ = Group.prototype;
    Group.selectItem = function (item) {
        //重选还是反选
        if (Group.selectedItem) {
            if (Group.selectedItem == item) {
                Group.selectedItem.reselectItem();
                return;
            }
            Group.selectedItem.deselectItem();
        }
        //选中
        Group.selectedItem = item;
        if (Group.selectedItem) {
            Group.selectedItem.selectItem();
            //选中音效
            SoundManager.playEffect("select");
        }
    };
    Group.dispose = function () {
        Group.selectedItem = null;
    };
    return Group;
})();
Group.prototype.__class__ = "Group";
