class BeginPlayer extends Player {
	public constructor(vo: PlayerVO) {
		super(vo);
		this.touchEnabled = true;
		this.touchChildren = false;
	}

	private icon: egret.Bitmap;
	public beginstate: number;

	/** 每一帧执行 */
	public update() {
		this.con.rotation += this.vo.turn_speed;
	}

	protected initView() {
		super.initView();
		this.state = PLAYERSTATE.DEFENCE;
		this.lbl_name.text = "+2";
		this.icon = new egret.Bitmap();
		this.addChild(this.icon);
	}

	protected updateKnifes() {
		if (this.knifes == null || this.knifes.length == 0) {
			super.updateKnifes();
			return;
		}
		let n = this.vo.knife_num;
		if (n >= DesignConst.player_knife_max) {
			n = DesignConst.player_knife_max;
		}
		for (let i = 0; i < this.knifes.length; i++) {
			let knife = this.knifes[i];
			knife.texture = RES.getRes("dao_" + this.vo.skinvo.id);
			knife.scaleX = knife.scaleY = 1;
			knife.anchorOffsetX = knife.width / 2;
			knife.anchorOffsetY = -this.vo.radius;
			knife.rotation = 360 * i / n;
		}
	}

	public updateCenter(s: number) {
		this.beginstate = s;
		switch (s) {
			case BEGINSTATE.NORMAL:
				this.lbl_name.text = "玩家"
				this.lbl_name.width = this.bg_diameter;
				this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
				this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
				this.lbl_name.y = 0;
				this.lbl_name.visible = true;
				this.icon.visible = false;
				break;
			case BEGINSTATE.WATCHADD:
				this.icon.texture = RES.getRes("game_json.video");
				this.icon.anchorOffsetX = this.icon.width / 2;
				this.icon.anchorOffsetY = this.icon.height / 2;
				this.icon.y = - 10;
				this.icon.visible = true;
				this.lbl_name.text = "+3";
				this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
				this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
				this.lbl_name.y = this.icon.height / 2 + 2;
				break;
			case BEGINSTATE.SHAREADD:
				this.icon.texture = RES.getRes("game_json.share");
				this.icon.anchorOffsetX = this.icon.width / 2;
				this.icon.anchorOffsetY = this.icon.height / 2;
				this.icon.y = - 10;
				this.icon.visible = true;
				this.lbl_name.text = "+2";
				this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
				this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
				this.lbl_name.y = this.icon.height / 2 + 2;
				break;
		}
	}

	protected updateLblName() {

	}

	public clear() {

	}

	public reset() {

	}

	public destroy() {

	}
}