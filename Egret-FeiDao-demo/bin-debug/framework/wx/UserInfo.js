var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 用户信息
 *
 */
var UserInfo = (function () {
    function UserInfo() {
        /** 是否授权 */
        this.auth = false;
    }
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
