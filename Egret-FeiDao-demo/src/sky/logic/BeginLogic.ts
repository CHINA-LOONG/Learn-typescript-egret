class BeginLogic {
	public constructor() {
	}
	private static instance: BeginLogic;
	public static getInstance(): BeginLogic {
		if (this.instance == null) {
			this.instance = new BeginLogic();
		}
		return this.instance;
	}

	private ui: BeginUI;
	private bmp_bg: egret.Bitmap;
	private cast_bg: egret.Bitmap;
	private beginplayer: BeginPlayer;
	private crtVO: PlayerVO;

	public openUI(con: any, _ui: BeginUI, arg: any = null): void {
		if (this.ui == null) {
			this.ui = _ui;
			con.addChild(this.ui);
			this.ui.logic = this;
			if (this.ui.inited) {
				this.init();
			}
		}
	}

	public init() {
		console.log("BeginLogic.init", this.ui.inited, this.ui.logic);
		this.checkFit();
		this.initData();
		this.initView();
		this.initEvent();
	}

	private checkFit() {
		this.ui.gp_bg.height = this.ui.rect_bg.height = this.ui.img_bg.height = GameData.stageHeight;
	}
	//初始化公告信息
	private initData() {
		this.ui.lbl_cast_title.text = "2019.2.23更新公告";
		this.ui.lbl_cast.text = "1.优化防御状态；\n" +
			"2.修复飞刀被击飞后的所有都有震动效果的bug\n" +
			"\n" +
			"\n" +
			"\n" +
			"下次更新预告：\n" +
			"1.增加皮肤\n" +
			"2.增加击杀效果\n" +
			"";
	}
	//初始化界面内容 [背景/公告/角色]
	private initView() {
		//通过组合方式生成bitmap，作为背景
		this.bmp_bg = Maplogic.getInstance().getMapBg(GameData.stageWidth, GameData.stageHeight);
		this.ui.gp_bg.addChild(this.bmp_bg);

		//公告面板
		this.cast_bg = Maplogic.getInstance().getMapBg(640, 780);
		this.cast_bg.x = 55;
		this.cast_bg.y = 287;
		this.ui.gp_cast.addChildAt(this.cast_bg, 1);

		//角色参数
		this.crtVO = Maplogic.getInstance().getBeginPlayerVO();
		//设置角色的外观和赋值参数
		this.beginplayer = new BeginPlayer(this.crtVO);
		if (this.checkVersion()) {
			this.beginplayer.updateCenter(BEGINSTATE.NORMAL);
			this.ui.img_logo.visible = false;
		}
		else {
			// this.ui.img_logo.visible = true;
			//显示分享标志并修改名字+2
			this.beginplayer.updateCenter(BEGINSTATE.SHAREADD);
		}
		this.beginplayer.x = this.ui.width / 2;
		this.beginplayer.y = this.ui.img_left.y + this.ui.img_left.height / 2;
		this.ui.addChildAt(this.beginplayer, 2);

		//版本号检查，是否显示公告
		this.ui.gp_cast.visible = this.checkCast();

		platform.bannershow(GameConst.bannerAdId, GameData.stageHeight);
		platform.createGameClubButton(12.5, this.ui.lbl_quan.y - 52, GameData.stageWidth, GameData.stageHeight);
	}

	public checkVersion(): boolean {
		let time = new Date().getTime();
		console.log(time);

		let vtime = 1551083540959 + 1000 * 3600 * 24;
		return time < vtime;
	}

	private checkCast(): boolean {
		let localversion = WxApi.getInstance().getLocalData(GameConst.localversion);
		let v = parseInt(localversion);
		if (localversion == null || localversion == "") {
			v = 0;
		}
		WxApi.getInstance().setLocalDataByString(GameConst.localversion, GameConst.version + "");
		return v < GameConst.version;
	}

	private initEvent() {
		this.ui.lbl_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
		this.ui.img_closecast.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
		this.ui.img_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
		this.ui.lbl_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
		this.ui.lbl_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickAdd, this);
		this.ui.img_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
		this.ui.img_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
		this.beginplayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBeginPlayer, this);
		WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
		GameData.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);


	}

	private shareId: number;
	private clickBeginPlayer() {
		if (this.beginplayer != null && this.beginplayer.vo != null) {
			switch (this.beginplayer.beginstate) {
				case BEGINSTATE.LOCK:
				case BEGINSTATE.NORMAL:
					return;
				case BEGINSTATE.SHAREADD:
					WxApi.getInstance().share(SHARETYPE.SHARE);
					egret.lifecycle.onPause = () => {
						this.pause();
					}

					egret.lifecycle.onResume = () => {
						this.resume();
					}

					break;
				case BEGINSTATE.TRYPLAY:
					WxApi.getInstance().showRewardAd(WATCHTYPE.TRYPLAY);
					break;
				case BEGINSTATE.WATCHADD:
					WxApi.getInstance().showRewardAd(WATCHTYPE.ADDKNIFE);
					break;
			}

		}
	}

	private max: number = 5;
	private crt: number = 1;
	private clickLeft() {
		if (this.crt <= 1) {
			return;
		}
		this.crt--;
		this.ui.img_left.visible = this.crt > 1;
		this.ui.img_right.visible = this.crt < this.max;
		this.initSkin();
	}

	private clickRight() {
		if (this.crt >= this.max) {
			return;
		}
		this.crt++;
		this.ui.img_left.visible = this.crt > 1;
		this.ui.img_right.visible = this.crt < this.max;
		this.initSkin();
	}
	//更新角色的外观
	private initSkin() {
		let vo = SkinLogic.getInstance().getSkinVOByID(this.crt);
		if (vo != null) {
			this.crtVO.skinvo = vo;
			this.beginplayer.updateCenter(BEGINSTATE.SHAREADD);
			this.beginplayer.updateVO(this.crtVO);//已经创建过，不会有名字等赋值
		}
	}

	private clickAdd() {
		WxApi.getInstance().showRewardAd(WATCHTYPE.ADDKNIFE);
	}
	private addknife: number = 0;
	private watchReward(e: GameEvent) {
		if (e.data.data == 0) {
			if (e.data.type == WATCHTYPE.ADDKNIFE) {
				this.addknife = 5;
				WxApi.getInstance().toast("飞刀+3");
				this.beginplayer.updateCenter(BEGINSTATE.NORMAL);
			}
			else if (e.data.type == WATCHTYPE.TRYPLAY) {
				this.beginplayer.updateCenter(BEGINSTATE.SHAREADD);
				this.clickStart();
			}
		}
	}

	private closeCast() {
		this.ui.gp_cast.visible = false;
	}

	private enterframe() {
		if (this.beginplayer != null) {
			this.beginplayer.update();
		}
	}

	private clearEvent() {
		this.ui.lbl_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
		this.ui.img_closecast.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
		this.ui.img_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeCast, this);
		this.ui.lbl_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
		this.ui.lbl_add.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickAdd, this);
		this.ui.img_left.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLeft, this);
		this.ui.img_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRight, this);
		this.beginplayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBeginPlayer, this);
		WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
		GameData.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
	}

	private clickShare() {
		WxApi.getInstance().share(SHARETYPE.SHARE);
	}

	public pause() {
		console.log("beinglogic:pause");
		this.shareId = egret.setTimeout(() => {
			this.addknife = 2;
			if (this.beginplayer != null) {
				this.beginplayer.updateCenter(BEGINSTATE.WATCHADD);
			}
		}, this, 2500);
	}

	public resume() {
		console.log("beginloic:resume");

		egret.clearTimeout(this.shareId);
	}

	private clickStart() {
		if (this.beginplayer.state == BEGINSTATE.TRYPLAY || this.beginplayer.state == BEGINSTATE.LOCK) {
			return;
		}
		let obj = {
			/**背景 */
			bgId: this.crtVO.bg_id,
			/**皮肤 */
			skinId: this.crtVO.skinvo.id,
			/**飞刀数 */
			num: this.crtVO.knife_num + this.addknife
		}
		GameLogic.getInstance().openUI(GameData.main, new GameUI(), obj);
		if (this.ui != null && this.ui.parent != null) {
			this.ui.parent.removeChild(this.ui);
		}
	}

	public clear() {
		this.clearEvent();
		if (this.ui != null && this.ui.parent != null) {
			this.ui.parent.removeChild(this.ui);
		}
		this.ui = null;
		this.addknife = 0;
		this.beginplayer.clear();
		this.crtVO.clear();
		this.crtVO = null;
		this.beginplayer = null;
	}
}