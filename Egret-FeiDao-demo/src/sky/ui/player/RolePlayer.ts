class RolePlayer extends Player {
	public constructor(vo: PlayerVO) {
		super(vo);
	}

	protected setState(v:number){
		let up:boolean = false;
		if(this.state == PLAYERSTATE.DEFENCE && v == PLAYERSTATE.MOVE){
			up = true;
		}
		super.setState(v);

		// if(up){
		// 	this.updateKnifes();
		// }
	}

	protected wait() {
		super.wait();
	}

	protected move() {
		
	}

	protected defence() {
		super.defence();
	}

	/** 每一帧执行 */
	public update() {
		super.update();

		this.checkBound();
		Maplogic.getInstance().updateMapCrood();
	}

	/**边界判断 */
	protected checkBound(): boolean {
		let dis = this.vo.radius - this.vo.circleRadius;
		if (this.x < dis) {
			this.x = dis;
		}
		else if (this.x > DesignConst.mapwidth - dis) {
			this.x = DesignConst.mapwidth - dis;
		}

		if (this.y < dis) {
			this.y = dis;
		}
		else if (this.y > DesignConst.mapheight - dis) {
			this.y = DesignConst.mapheight - dis;
		}
		return false;
	}

	public updateDirection(dir) {
		this.vo.direction = dir;
		if (dir == null) {
			this.state = PLAYERSTATE.DEFENCE;
		}
		else{
			this.state = PLAYERSTATE.MOVE;
		}
	}

	public clear() {

	}

	public reset() {

	}

	public destroy() {

	}
}