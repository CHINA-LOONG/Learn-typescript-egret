declare const wx: any
class WxApi extends egret.EventDispatcher {
	public constructor() {
		super();
	}

	private static _instance: WxApi;
	public static getInstance(): WxApi {
		if (this._instance == null) {
			this._instance = new WxApi();
		}
		return this._instance;
	}

	private rewardAd;

	/**登录 code */
	public logincode: string;

	/**初始化是否完成 */
	public inited: boolean;

	public userInfo: UserInfo;


	public onShow(){
		if(platform.isdebug()){
			return;
		}
		
	}

	public offShow(){
		if(platform.isdebug()){
			return;
		}
	}

	public async init() {
		this.inited = false;
		//登录
		let res = await platform.login();
		this.logincode = res.code;
		console.log("logincode:", res.code);

		platform.checkUpdate();
		this.onShare();
		this.initRewardVideoAd();

		//获取用户信息
		let userinfo = new UserInfo();
		userinfo.avatarUrl = "";
		userinfo.city = "";
		userinfo.country = "";
		userinfo.gender = 2;
		userinfo.language = "";
		userinfo.nickname = "玩家";
		userinfo.province = "";
		userinfo.auth = false;
		this.userInfo = userinfo;

		// HttpCommand.getInstance().once(HttpEvent.getToken, this.getTokenResponse, this);
		// HttpCommand.getInstance().getToken(this.logincode); 
	}

	/** 二，得到token以后把微信的用户信息以后发给服务器 */
	private getTokenResponse(e: HttpEvent) {
		if (e.data == "ioerror") {
			GameConst.save_server = false;
		}
		else if (e.data == "fail") {
			GameConst.save_server = false;
		}
		else {
			GameConst.save_server = true;
			this.userInfo.token = e.data.token;
		}

		// HttpCommand.getInstance().once(HttpEvent.getUser, this.getUserResponse, this);
		// HttpCommand.getInstance().getUser();
	}

	/** 预加载激励视频 */
	public initRewardVideoAd() {
		if (platform.isdebug()) {
			return;
		}
		this.rewardAd = wx.createRewardedVideoAd({ adUnitId: GameConst.rewardAdId })

		this.rewardAd.onLoad(() => {
			console.log('激励视频 广告加载成功')
		})

		this.rewardAd.onError(err => {
			console.log("rewardAderror:", err)
		})

		this.rewardAd.onClose(res => {
			// 用户点击了【关闭广告】按钮
			let state: number;
			// 小于 2.1.0 的基础库版本，res 是一个 undefined
			if (res && res.isEnded || res === undefined) {
				// 正常播放结束，可以下发游戏奖励
				state = 0;
				this.rewardAdCDStart();
			}
			else {
				// 播放中途退出，不下发游戏奖励
				state = 1;
			}
			this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
		})

	}

	private adtype: number;
	/** 观看视频 关闭视频监听GameEvent.REWARDAD_CLOSE_EVENT
	 * @param type 观看视频来源类型 WATCHTYPE.XXXX
	 */
	public showRewardAd(type: number) {
		this.adtype = type;
		if (this.rewardAd != null) {
			try {
				this.rewardAd.show()
					.catch(err => {
						console.log("showRewardAd:", err);
					})
			}
			catch (e) {
				console.log("rewardAd:", e);
			}
		}
	}

	private starttime: number;
	private rewardAdCDStart() {
		this.starttime = new Date().getTime();

		this.setLocalDataByString("rewardcd", this.starttime + "");
	}
	public getRewardCD(): number {
		let nowtime = new Date().getTime();
		if (this.starttime == null) {
			return 0;
		}
		else {
			return 180 - Math.floor((nowtime - this.starttime) / 1000);
		}
	}

	private dispatchGameEvent(eventname: string, data: any, logstr: string = "暂无视频可观看") {
		console.log("dispatchGameEvent:", eventname, this.adtype, data);
		if (eventname == GameEvent.REWARDAD_CLOSE_EVENT && (data == 2 || data == 3)) {
			this.toast(logstr);
		}
		let event = new GameEvent(eventname);
		event.data = { type: this.adtype, data: data };
		this.dispatchEvent(event);
	}

	/**存取本地数据 */
	public setLocalDataByObject(key: string, obj: Object) {
		let value: string = JSON.stringify(obj);
		this.setLocalDataByString(key, value);
	}
	/**存取本地数据 */
	public setLocalDataByString(key: string, value: any) {
		if (platform.isdebug()) {
			return null;
		}
		try {
			wx.setStorageSync(key, value);
		}
		catch (e) {
			return null;
		}
	}
	/**读取本地数据 */
	public getLocalData(key: string) {
		if (platform.isdebug()) {
			return null;
		}
		try {
			return wx.getStorageSync(key);
		}
		catch (e) {
			return null;
		}
	}
	/**删除缓存指定 */
	public clearLocalData(key: string) {
		if (platform.isdebug()) {
			return null;
		}
		try {
			return wx.removeStorageSync(key);
		}
		catch (e) {
			return null;
		}
	}



	public toast(str: string) {
		if (platform.isdebug()) {
			return null;
		}
		wx.showToast({
			title: str,
			icon: 'none',
			duration: 3000
		});
	}

	public share(type: number = 1, data: any = null) {
		if (platform.isdebug()) {
			return;
		}
		let title: string = "";
		let r = Math.floor(Math.random() * 3 + 1);
		let img: string = "resource/assets/share/share" + r + ".jpg";
		let query: string = "";

		switch (type) {
			case SHARETYPE.SHARE:
				title = "我飞刀玩的贼6，快来击败我";
				img = img;
				break;
			case SHARETYPE.SHOWOFF:
				title = "小李飞刀，弹无虚发";
				img = img;
				break;
		}

		wx.shareAppMessage({
			title: title,
			imageUrl: img,
			query: query
		})
	}

	/**监听用户点击右上角菜单的“转发”按钮时触发的事件
	 * @param query 转发携带参数 必须是 key1=val1&key2=val2 的格式 用于区分其他用户点开这个分享链接时是否打开排行榜等操作
	 */
	private onShare(query: string = "rightup=1") {
		if (platform.isdebug()) {
			return;
		}
		wx.showShareMenu();
		this.updateShareMenu(true);
		wx.onShareAppMessage(function () {
			return {
				title: "小李飞刀，弹无虚发",
				imageUrl: "resource/assets/share/share1.jpg",
				query: ""
			}
		})
	}

	/**转发参数 */
	private updateShareMenu(withShareTicket: boolean) {
		wx.updateShareMenu({
			withShareTicket: withShareTicket,
			success: res => {
				console.log("updateShareMenu:success:", res);
			},
			fail: res => {
				console.log("updateShareMenu:fail:", res);
			},
			complete: () => {
				console.log("updateShareMenu:complete:");
			}
		})
	}
}