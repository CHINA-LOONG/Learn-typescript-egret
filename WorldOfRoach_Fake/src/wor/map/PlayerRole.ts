class PlayerRole extends FocusRole {
	/**玩家角色单例引用 */
	public static self: PlayerRole;

	public constructor() {
		super();
		PlayerRole.self = this;
		//设置角色类型
		this.type = RoleType.ROLE_PLAYER;
		//绘制角色外观
		let shape: egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xFF0000, 1);
		shape.graphics.drawRect(-30, -120, 60, 120);
		shape.graphics.endFill();
		this.addChild(shape);
		//设置角色速度？
		this.speedX = 8;
		this.speedY = 4;
	}

	/**角色的移动处理,这里的移动优化应该还可以继续优化 */
	public renderUpdate(interval: number): void {
		//检测当前是否在移动
		if (RockBarController.offset == 0)
			return;
		let tox: number = this.x + RockBarController.multX * this.speedX;
		let toy: number = this.y + RockBarController.multY * this.speedY;
		let standType: number = FloorLayer.floorSelf.getStandType(tox, toy);
		let canMove: boolean = false;
		//检测目标位置是否可以移动
		if (standType == StandType.LAND) {
			if (!StageLayer.self.hitTestRole(tox, toy))
				canMove = true;
			else {
				tox = this.x;
				toy = this.y + RockBarController.multY * this.speedY;
				if (!StageLayer.self.hitTestRole(tox, toy))
					canMove = true;
				else {

					tox = this.x + RockBarController.multX * this.speedX;
					toy = this.y;
					if (!StageLayer.self.hitTestRole(tox, toy))
						canMove = true;
				}
			}
			if (canMove) {
				this.x = tox;
				this.y = toy;
				this.checkPosY();
				//更新小地图上角色的位置
				WindowsMgr.instance.updateWindow(UpdateType.MAP_SELF_MOVE, [WindowType.MINI_MAP]);
			}
		}
	}


	/**错误位置修复 */
	public amendPosition(): void {
		//如果位置不合法进行玩家角色位置修复
		while (StageLayer.self.hitTestRole(this.x, this.y))
			this.y += 20;
	}
}