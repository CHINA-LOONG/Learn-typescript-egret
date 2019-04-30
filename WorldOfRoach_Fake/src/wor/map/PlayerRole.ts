class PlayerRole extends FocusRole {
	/**玩家角色单例引用 */
	public static self:PlayerRole;

	public constructor() {
		super();
		PlayerRole.self = this;
		//设置角色类型
		this.type = RoleType.ROLE_PLAYER;
		//绘制角色外观
		let shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xFF0000,1);
		shape.graphics.drawRect(-30,-120,60,120);
		shape.graphics.endFill();
		this.addChild(shape);
		//设置角色速度？
		this.speedX = 8;
		this.speedY = 4;
	}

	/**错误位置修复 */
	public amendPosition():void{
		//如果位置不合法进行玩家角色位置修复
		while(StageLayer.self.hitTestRole(this.x,this.y))
			this.y += 20;
	}
}