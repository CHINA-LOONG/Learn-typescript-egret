class AIPlayer extends Player {
	public constructor(vo: PlayerVO) {
		super(vo);
	}


	/** 每一帧执行 */
	public update() {
		super.update();

		this.checkState();
	}

	/**游荡机制 */
	private checkState() {
		//边界-->转向
		if (this.checkBound()) {
			return;
		}

		//3秒-->转向
		this.checkTime();
	}

	/**边界判断 */
	public checkBound(): boolean {
		let bool: boolean = false;

		let a = 0;
		let b = 360;
		let dis = this.vo.radius - this.vo.circleRadius;
		if (this.x < dis) {
			this.x = dis;
			bool = true;
			b = 180;
		}
		else if (this.x > DesignConst.mapwidth - dis) {
			this.x = DesignConst.mapwidth - dis;
			bool = true;
			a = 180;
			b = 360;
		}

		if (this.y < dis) {
			this.y = dis;
			bool = true;
			if (b == 180) {
				a = 90;
				b = 180;
			}
			else if (a == 180) {
				a = 180;
				b = 270;
			}
			else {
				a = 90;
				b = 270;
			}
		}
		else if (this.y > DesignConst.mapheight - dis) {
			this.y = DesignConst.mapheight - dis;
			bool = true;
			if (b == 180) {
				a = 0;
				b = 90;
			}
			else if (a < 0) {
				a = -90;
				b = 0;
			}
			else {
				a = -90;
				b = 90;
			}

		}
		if (bool) {//到达边界 随机转向
			this.changeDirection(a, b);
		}

		return bool;
	}

	/**上一次改变方向的时间 */
	private lasttime: number;
	/**改变方向的时间 */
	private changetime: number;
	/**判断时间 每3秒变一次 */
	private checkTime() {
		let newtime = egret.getTimer();
		let changetime = 3000;
		if (newtime - this.lasttime >= 3000) {
			this.lasttime = newtime;
			this.changeDirection();
		}
	}

	/**每帧更新坐标 */
	protected updateCrood() {
		let hu = this.vo.direction * Math.PI / 180;
		this.x += this.vo.move_speed * Math.sin(hu);
		this.y -= this.vo.move_speed * Math.cos(hu);
	}

	protected wait() {
		this.x = Math.random() * DesignConst.mapwidth;
		this.y = Math.random() * DesignConst.mapheight;
	}

	protected move() {
		this.changeDirection();
	}

	protected defence() {
		this.updateKnifes();
	}

	public clear() {

	}

	public reset() {

	}

	public destroy() {

	}
}

window['AIPlayer'] = AIPlayer;