class GameLogic {
	public constructor() {
	}
	private static instance: GameLogic;
	public static getInstance(): GameLogic {
		if (this.instance == null) {
			this.instance = new GameLogic();
		}
		return this.instance;
	}

	private ui: GameUI;
	/** bgId,skinId,num */
	private args: any;

	public gamestate: number;

	public openUI(con: any, _ui: GameUI, arg: any = null): void {
		if (this.ui == null) {
			this.ui = _ui;
			this.args = arg;
			con.addChild(this.ui);
			this.ui.logic = this;
			if (this.ui.inited) {
				this.init();
			}
		}
	}

	public init() {
		console.log("GameLogic.init", this.ui.inited, this.ui.logic);
		this.checkFit();
		this.initData();
		this.initView();
		this.initEvent();
	}

	private checkFit() {

	}

	private initData() {

	}

	private initView() {
		//地图
		Maplogic.getInstance().openUI(this.ui, new MapCon(), this.args);
		//操作的摇杆
		RockerLogic.getInstance().openUI(this.ui, new Rocker());

		this.initRank();
		this.startGame();
	}

	/** --------------------------------- rank --------------------------- */

	private initRank() {
		for (let i = 1; i <= 5; i++) {
			this.ui['lbl_rank' + i + '_name'].text = "";
			this.ui['lbl_rank' + i + '_num'].text = "";
			this.ui['lbl_rank' + i + '_src'].texture = null;
		}
	}

	private myrank:number;
	public updateRank(arr: Player[]) {
		this.myrank = 1;
		for (let i = 1; i <= 5; i++) {
			let player = arr[i - 1];
			if (player != null) {
				if(player.vo.id == 0){
					this.myrank = i;
				}
				this.ui['lbl_rank' + i + '_name'].text = player.vo.name;
				this.ui['lbl_rank' + i + '_num'].text = player.vo.knife_num + "";
				this.ui['lbl_rank' + i + '_src'].texture = RES.getRes("yuan_" + player.vo.bg_id);
			}
			else {
				this.ui['lbl_rank' + i + '_name'].text = "";
				this.ui['lbl_rank' + i + '_num'].text = "";
				this.ui['lbl_rank' + i + '_src'].texture = null;
			}
		}
		if(this.myrank == 1 && arr.length == 1){
			this.gameover();
		}
	}


	private game_countId: number;
	/**开始游戏 */
	private startGame() {
		platform.bannershow(GameConst.bannerAdId, GameData.stageHeight);

		this.ui.gp_over.x = -this.ui.gp_over.width;
		this.ui.gp_over.visible = false;
		this.gamestate = GAMESTATE.START;
		RockerLogic.getInstance().start();	//摇杆逻辑启动
		Maplogic.getInstance().start();		//地图逻辑启动

		this.lefttime = DesignConst.gametime;
		this.game_countId = egret.setInterval(this.countDown, this, 1000);
	}

	private lefttime: number;
	private countDown() {
		this.lefttime--;
		this.ui.lbl_count.text = TimeUtil.ParseTime2Format(this.lefttime, "m:s");
		if (this.lefttime <= 0) {
			this.gameover();
		}
	}

	public gameover() {
		this.ui.lbl_rank.text = "第" + this.myrank + "名";
		this.ui.gp_over.visible = true;
		egret.Tween.get(this.ui.gp_over).to({ x: 0 }, 600);

		this.gamestate = GAMESTATE.OVER;
		egret.clearInterval(this.game_countId);

		this.openHit();

		RockerLogic.getInstance().clear();
		Maplogic.getInstance().stop();
	}

	private initEvent() {
		GameData.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
		this.ui.lbl_showoff.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShowoff,this);
		this.ui.lbl_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
	}

	private clickShowoff(){
		WxApi.getInstance().share(SHARETYPE.SHOWOFF);
	}

	private clickBack(){
		BeginLogic.getInstance().openUI(GameData.main,new BeginUI());
		this.clear();
	}

	private enterframe() {
		if (this.gamestate == GAMESTATE.START) {
			Maplogic.getInstance().enterframe();
		}
	}

	private clearEvent() {		
		GameData.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
		this.ui.lbl_showoff.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShowoff,this);
		this.ui.lbl_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
	}

	private clickStart() {
		if (this.ui != null && this.ui.parent != null) {
			this.ui.parent.removeChild(this.ui);
		}
	}

	public clear() {
		Maplogic.getInstance().clear();
		RockerLogic.getInstance().clear();
		this.clearEvent();
		if(this.ui != null && this.ui.parent != null){
			this.ui.parent.removeChild(this.ui);
		}
		this.ui = null;
	}

	/** 恢复碰撞 */
	public openHit() {
		GameData.GameStage.$hitTest = egret.DisplayObjectContainer.prototype.$hitTest;
	}

	/**---------------------------------------------------------------------------------------------- */

	
}