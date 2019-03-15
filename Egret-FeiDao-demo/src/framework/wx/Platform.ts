/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
    /** 是否debug */
    isdebug(): any
    /**获取用户头像 需要授权 */
    getUserInfo(h): Promise<any>;

    /**登陆 获取logincode */
    login(): Promise<any>

    /**埋点初始化 */
    initmta(): Promise<any>;

    /**添加埋点 */
    mtaLoad(id, data): Promise<any>

    /**分享 */
    share(title, imageUrl, query): Promise<any>

    /**游戏圈 */
    createGameClubButton(left, top, w, h): Promise<any>;
    hideClubButton(): any;
    destroyClubButton(): any;
    showClubButton(): any;

    /**意见反馈 */
    createFeedback(): Promise<any>;
    feedbackShow(): any;
    feedbackDestroy(): any;
    feedbackHide(): any;

    /**手机震动*/
    vibrate(short): Promise<any>;

    checkUpdate(): any;
    /**banner */
    bannershow(id, h): any;
    bannerdestroy(): any;
    bannerhide(): any;
    bannerError(): any;
    getSystemInfoSync(): any;
    createUserButton(h): any
    getMenuButtonBoundingClientRect(w, h): any

    createRewardedVideoAd(obj):Promise<any>

    /** */

    /** */

    /** */

    /** */

    /** */
}

class DebugPlatform implements Platform {
    isdebug() {
        return true;
    }
    checkUpdate() {

    }
    async getUserInfo(h) {
        return { nickName: "skybear", gender: 1, avatarUrl: "" }
    }
    async login() {
        return {code:"debug_logincode"};
    }
    async initmta() {

    }
    async mtaLoad(id, data) {

    }
    async share(title, imageUrl, query) {
        
    }
    async createGameClubButton(left, top, w, h) {

    }
    async vibrate(short) {

    }
    async createRewardedVideoAd(obj) {
        return null;
    }
    bannershow(id, h) {

    }
    bannerdestroy() {

    }
    bannerhide() {

    }
    bannerError() {

    }
    getSystemInfoSync() {
        return { screenWidth: 750, screenHeight: 1334 };
    }
    createUserButton(h) {

    }
    hideClubButton() {
    }
    showClubButton() {

    }
    destroyClubButton() {

    }
    async  createFeedback() {

    }
    feedbackShow() {
    }
    feedbackDestroy() {
    }
    feedbackHide() {
    }
    getMenuButtonBoundingClientRect(w, h) {
        return { top: 48, width: 64, height: 64 };
    }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}





