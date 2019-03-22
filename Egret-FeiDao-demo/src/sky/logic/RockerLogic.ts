class RockerLogic {
	public constructor() {
	}
	private static instance: RockerLogic;
	public static getInstance(): RockerLogic {
		if (this.instance == null) {
			this.instance = new RockerLogic();
		}
		return this.instance;
	}

	private ui: Rocker;
	private ballRadius: number = 0;      //小球半径
	private circleRadius: number = 0;    //圆环半径
	private centerX: number = 0;         //中心点坐标
	private centerY: number = 0;
	private touchID: number;             //触摸ID

	public openUI(con: any, _ui: Rocker, arg: any = null): void {
		if (this.ui == null) {
			this.ui = _ui;
			con.addChild(this.ui);
			if (this.ui.inited) {
				this.init();
			}
			this.ui.logic = this;
		}
		this.ui.visible = false;
	}

	public init() {
		console.log("RockerLogic.init", this.ui.inited, this.ui.logic);
		this.ballRadius = this.ui.ball.height / 2;
		this.circleRadius = this.ui.circle.height / 2;
		//获取中心点
		this.centerX = this.circleRadius;
		this.centerY = this.circleRadius;
		//设置锚点
		this.ui.anchorOffsetX = this.circleRadius;
		this.ui.anchorOffsetY = this.circleRadius;
		this.ui.ball.anchorOffsetX = this.ballRadius;
		this.ui.ball.anchorOffsetY = this.ballRadius;
		//设置小球初始位置
		this.ui.ball.x = this.centerX;
		this.ui.ball.y = this.centerY;

		this.initCrood();
	}

	public initCrood() {
		//摇杆在屏幕初始位置
		this.ui.x = GameData.GameStage.stageWidth / 2;
		this.ui.y = GameData.GameStage.stageHeight - this.circleRadius - 50;
	}

	private started: boolean;
	//启动虚拟摇杆 (监听事件根据实际情况设置，不然点一下UI上的其他按钮，也会触发虚拟摇杆事件。)
	public start() {
		this.started = true;
		if (!GameData.GameStage.hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
			GameData.GameStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);

		}
		if (!GameData.GameStage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
			GameData.GameStage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

		}
		if (!GameData.GameStage.hasEventListener(egret.TouchEvent.TOUCH_MOVE)) {
			GameData.GameStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);

		}
	}

	//停止虚拟摇杆
	public stop() {
		this.started = false;
		GameData.GameStage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		GameData.GameStage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		GameData.GameStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.touchID = null;
	}

	//触摸开始，显示虚拟摇杆
	private onTouchBegin(e: egret.TouchEvent) {
		if (Maplogic.getInstance().role != null && Maplogic.getInstance().role.state == PLAYERSTATE.DEAD) {
			return;
		}
		this.ui.visible = true;
		//点击摇杆时 屏蔽所有碰撞
		GameData.GameStage.$hitTest = (x, y) => this.ui;
		this.touchID = e.touchPointID;
		this.ui.x = e.stageX;
		this.ui.y = e.stageY;
		this.p1.x = this.ui.x;
		this.p1.y = this.ui.y;
		this.ui.ball.x = this.centerX;
		this.ui.ball.y = this.centerY;
	}

	//触摸移动，设置小球的位置
	private p1: egret.Point = new egret.Point();
	private p2: egret.Point = new egret.Point();
	private changetime: number;
	private onTouchMove(e: egret.TouchEvent) {
		if (Maplogic.getInstance().role != null && Maplogic.getInstance().role.state == PLAYERSTATE.DEAD) {
			return;
		}
		//获取手指和虚拟摇杆的距离
		this.p1.x = this.ui.x;
		this.p1.y = this.ui.y;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		let dist = egret.Point.distance(this.p1, this.p2);
		var angle: number = Math.atan2(e.stageY - this.ui.y, e.stageX - this.ui.x);
		//手指距离在圆环范围内
		if (dist <= (this.circleRadius - this.ballRadius)) {
			this.ui.ball.x = this.centerX + e.stageX - this.ui.x;
			this.ui.ball.y = this.centerY + e.stageY - this.ui.y;
			//手指距离在圆环范围外
		} else {
			this.ui.ball.x = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
			this.ui.ball.y = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
		}
		if (dist >= 3) {
			let p1 = new egret.Point(this.ui.ball.x, this.ui.ball.y);
			let p2 = new egret.Point(this.centerX, this.centerY);
			let dis = egret.Point.distance(p1, p2);
			let rate = dis / (this.circleRadius - this.ballRadius);
			this.moveBall(angle, rate);
		}
		this.changetime = egret.getTimer();
		e.stopImmediatePropagation();
	}

	//触摸结束，隐藏虚拟摇杆
	public onTouchEnd(e: egret.TouchEvent) {
		GameLogic.getInstance().openHit();
		this.touchID = null;
		if (Maplogic.getInstance().role != null && Maplogic.getInstance().role.state == PLAYERSTATE.DEAD) {
			return;
		}

		this.ui.visible = false;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		if (this.controlplayer != null) {
			this.controlplayer.updateDirection(null);
		}
		this.initCrood();
		//小球恢复初始位置
		this.ui.ball.x = this.centerX;
		this.ui.ball.y = this.centerY;
	}
	private controlplayer: RolePlayer;
	/**要控制的球 */
	public setControlPlayer(ball: RolePlayer) {
		this.controlplayer = ball;
	}

	/**球体移动 */
	private moveBall(hu, rate) {
		if (this.controlplayer != null) {
			let dir = hu * 180 / Math.PI + 90;
			this.controlplayer.updateDirection(dir);
		}
	}

	public clear() {
		this.controlplayer = null;
		this.stop();
		if(this.ui != null && this.ui.parent != null){
			this.ui.parent.removeChild(this.ui);
		}
		this.ui = null;
	}
}