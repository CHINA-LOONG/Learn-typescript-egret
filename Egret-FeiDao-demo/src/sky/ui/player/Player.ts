class Player extends egret.DisplayObjectContainer implements IPool {
	public constructor(vo: PlayerVO) {
		super();

		this.touchEnabled = false;
		this.touchChildren = false;
		this.vo = vo;
		this.init();
	}

	protected bg_diameter: number;
	public bg: BaseBitmap;
	protected lbl_name: BaseTextField;
	public knifes: BaseBitmap[];
	protected con: egret.DisplayObjectContainer;
	protected frame: number = 0;

	public vo: PlayerVO;


	protected init() {
		this.initData();
		if (this.vo != null) {
			this.initView();
		}
	}

	protected initData() {
		this.knifes = [];
		this.knife_index = 0;
	}

	public updateVO(vo: PlayerVO) {
		this.vo = vo;
		if (this.bg == null) {
			this.initView();
		}
		else {
			this.bg.texture = RES.getRes("yuan_" + this.vo.bg_id);
			this.updateView();
			this.updateKnifes();
		}
	}


	protected initView() {
		this.con = new egret.DisplayObjectContainer();
		this.addChild(this.con);

		this.bg = ObjectPool.getObject("BaseBitmap") as BaseBitmap;
		this.bg.texture = RES.getRes("yuan_" + this.vo.bg_id);
		this.addChild(this.bg);

		this.lbl_name = ObjectPool.getObject("BaseTextField") as BaseTextField;
		this.lbl_name.fontFamily = "SimHei";
		this.lbl_name.textAlign = "center"
		this.lbl_name.text = this.vo.name;
		this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
		this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
		this.addChild(this.lbl_name);

		this.state = PLAYERSTATE.WAIT;

		this.updateView();
		this.updateKnifes();
	}

	private _state: number;
	public get state(): number {
		return this._state;
	}
	public set state(v: number) {
		if (this._state == v) {
			return;
		}
		this.setState(v);
	}

	protected setState(v: number) {
		this._state = v;
		switch (v) {
			case PLAYERSTATE.WAIT:
				this.wait();
				break;
			case PLAYERSTATE.MOVE:
				this.move();
				break;
			case PLAYERSTATE.DEFENCE:
				this.defence();
				break;
			case PLAYERSTATE.DEAD:

				break;
		}
	}

	protected wait() {
		this.x = Math.random() * DesignConst.mapwidth;
		this.y = Math.random() * DesignConst.mapheight;
	}

	protected move() {

	}

	protected defence() {
		this.vo.direction = null;
		this.updateKnifes();
	}

	/**边界判断 */
	protected checkBound(): boolean {
		return false;
	}

	/**转向
	 * @param a 当b为null时 角度直接改变成a，否则a-b随机一个范围
	 * @param b 当b为null时 角度直接改变成a，否则a-b随机一个范围
	 */
	public changeDirection(a: number = 0, b: number = 360) {
		if (b == null) {
			this.vo.direction = a;
		}
		else {
			this.vo.direction = GameUtil.between(a, b, 0);
		}
	}

	/**每帧更新坐标 */
	protected updateCrood() {
		let hu = this.vo.direction * Math.PI / 180;
		this.x += this.vo.move_speed * Math.sin(hu);
		this.y -= this.vo.move_speed * Math.cos(hu);
	}

	/** 每一帧执行 */
	public update() {
		this.con.rotation += this.vo.turn_speed;//更新转动
		//更新位置
		if (this.vo.direction != null && this.vo.move_speed != null) {
			this.updateCrood();
		}
		//检测吃球
		this.checkEatKnife();
		this.frame++;
		//防御的时候每40帧播放一个光圈
		if (this.state == PLAYERSTATE.DEFENCE && this.frame % 40 == 0) {
			this.addCircle();
		}
		if (this.frame % 4 == 0) {
			this.knife_index++;
			if (this.knife_index >= this.knifes.length) {
				this.knife_index = 0;
			}
			this.updateKnifeInArr(this.knife_index);
		}

	}
	//防御的光圈
	protected addCircle() {
		let bmp = ObjectPool.getObject("BaseBitmap") as BaseBitmap;
		let r = Math.floor(Math.random() * 5 + 1);
		bmp.texture = RES.getRes("yuan_" + r);
		this.addChildAt(bmp, 0);
		bmp.width = this.bg_diameter;
		bmp.height = this.bg_diameter;
		bmp.anchorOffsetX = this.vo.circleRadius;
		bmp.anchorOffsetY = this.vo.circleRadius;
		let s = 2.4;
		egret.Tween.get(bmp).to({ scaleX: s, scaleY: s, alpha: 0 }, 1200).call((bmp) => {
			if (bmp != null && bmp.parent != null) {
				bmp.parent.removeChild(bmp);
			}
		}, this, [bmp]);
	}

	public addKnifeNum(n: number) {
		this.vo.knife_num += n;
		this.updateKnifes();
	}

	public removeKnife(i: number) {
		let knife = this.knifes[i];
		if (knife != null) {
			this.vo.knife_num--;
			this.knifes.splice(i, 1);
			if (knife.parent != null) {
				knife.parent.removeChild(knife);
			}
		}
	}

	/**检测吃球 */
	public checkEatKnife() {
		let n = Maplogic.getInstance().dealEatKnifes(this.x, this.y, this.vo.radius);
		if (n > 0) {
			this.vo.knife_num += n;
			this.updateKnifes();
		}
	}

	protected updateView() {
		this.updateBg();
		this.updateLblName();
	}
	/**
	 * 更新拥有的飞刀外观 以及状态 
	 */
	protected updateKnifes() {
		let n = this.vo.knife_num;
		if (n >= DesignConst.player_knife_max) {
			n = DesignConst.player_knife_max;
		}

		if (this.state == PLAYERSTATE.MOVE || this.state == PLAYERSTATE.WAIT) {
			let knife_height = 115;
			this.vo.radius = knife_height * n / 2 / Math.PI;
		}
		else {
			this.vo.radius = 115 * n / 2 / Math.PI;
			// this.vo.radius = this.vo.circleRadius / DesignConst.knifescale;
		}
		// console.log("updateKnifes:", this.vo.radius, n);

		// if (this.bg1 == null) {
		// 	this.bg1 = new egret.Bitmap(RES.getRes("yuan_" + this.vo.bg_id));
		// 	this.bg1.alpha = 0.5;
		// 	this.addChildAt(this.bg1, 0);
		// }
		// this.bg1.width = this.vo.radius * 2;
		// this.bg1.height = this.vo.radius * 2;
		// this.bg1.anchorOffsetX = this.vo.radius;
		// this.bg1.anchorOffsetY = this.vo.radius;

		for (let i = 0; i < n; i++) {
			let v = this.vo.skinvo;
			let knife = this.knifes[i];
			if (knife == null) {
				knife = ObjectPool.getObject("BaseBitmap") as BaseBitmap;
				knife.texture = RES.getRes("dao_" + v.id);
				knife.scaleX = knife.scaleY = DesignConst.knifescale;
				knife.anchorOffsetX = knife.width / 2;
				if (this.state == PLAYERSTATE.DEFENCE) {
					knife.anchorOffsetY = -this.vo.circleRadius / 2 + knife.height;
					console.log("defence:", knife.anchorOffsetY, -this.vo.circleRadius, knife.height);

				}
				else {
					knife.anchorOffsetY = -this.vo.radius + knife.height;
				}
				this.knifes.push(knife);
			}
			this.con.addChild(knife);
		}
	}
	private bg1: egret.Bitmap;

	protected knife_index: number;

	/**
	 * 更新飞刀的半径
	 */
	protected updateKnifeInArr(i: number) {
		let knife = this.knifes[i];
		if (knife != null) {
			let n = this.vo.knife_num;
			if (n >= DesignConst.player_knife_max) {
				n = DesignConst.player_knife_max;
			}

			if (this.state == PLAYERSTATE.MOVE || this.state == PLAYERSTATE.WAIT) {
				let knife_height = 115;
				if (this.vo.knife_num < 4) {
					this.vo.radius = knife_height * 4 / 2 / Math.PI;
				}
				else {
					this.vo.radius = knife_height * n / 2 / Math.PI;
				}
			}
			if (this.state == PLAYERSTATE.DEFENCE) {
				knife.anchorOffsetX = knife.width / 2;
				knife.anchorOffsetY = -this.vo.circleRadius / 2 - knife.height / 2;
				knife.rotation = 360 * i / n;
			}
			else {
				knife.anchorOffsetX = (-this.vo.radius + knife.width / 2) / DesignConst.knifescale;
				knife.anchorOffsetY = knife.height / 2 / DesignConst.knifescale;
				knife.rotation = 360 * i / n;
			}
		}

	}

	/**
	 * 更新背景的显示坐标大小
	 */
	protected updateBg() {
		this.bg_diameter = this.vo.circleRadius * 2;
		this.bg.width = this.bg_diameter;
		this.bg.height = this.bg_diameter;
		this.bg.anchorOffsetX = this.vo.circleRadius;
		this.bg.anchorOffsetY = this.vo.circleRadius;
	}
	/**
	 * 更新玩家名字大小位置
	 */
	protected updateLblName() {
		this.lbl_name.size = this.vo.circleRadius < 50 ? 24 : 32;
		this.lbl_name.width = this.bg_diameter;
		this.lbl_name.anchorOffsetX = this.lbl_name.width / 2;
		this.lbl_name.anchorOffsetY = this.lbl_name.height / 2;
	}

	public updateDirection(r: number) {

	}

	public updateRadius() {

	}

	public clear() {

	}

	public reset() {

	}

	public destroy() {

	}
}

window['Player'] = Player;