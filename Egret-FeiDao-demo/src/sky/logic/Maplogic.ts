class Maplogic {
	public constructor() {
	}
	private static instance: Maplogic;
	public static getInstance(): Maplogic {
		if (this.instance == null) {
			this.instance = new Maplogic();
		}
		return this.instance;
	}


	private ui: MapCon;
	private bgs: egret.Bitmap[];

	public role: RolePlayer;
	private players: Map<Player> = {};
	private knifes: Map<KnifePlayer> = {};
	private knife_num: number;
	private knife_hash: number;
	/** bgId,skinId,num */
	private args: any;

	public openUI(con: any, _ui: MapCon, arg: any = null): void {
		if (this.ui == null) {
			this.ui = _ui;
			this.args = arg;
			con.addChildAt(this.ui, 0);
			this.ui.logic = this;
			this.init();
		}
	}
	//初始化界面
	private init() {
		this.initBg();
		this.initKnifes();
		this.initPlayers();
		this.updateMapCrood();
	}

	/**初始化地图，使用生产的3*3位图作为地图 */
	private initBg() {
		this.bgs = [];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				let bg = Maplogic.getInstance().getMapBg(DesignConst.mapwidth / 3, DesignConst.mapheight / 3);
				bg.x = j * DesignConst.mapwidth / 3;
				bg.y = i * DesignConst.mapheight / 3;
				this.ui.addChild(bg);
			}
		}
	}

	/** ------------------------------- players ------------------------- */
	/**初始化角色 */
	private initPlayers() {
		//ai球
		for (let i = 0; i < DesignConst.ai_num; i++) {
			this.addPlayer(i + 1);			//AIID=1/2/3/4/5
		}

		//玩家球
		let myvo = this.getRolePlayerVO();
		this.role = new RolePlayer(myvo);
		this.players[myvo.id] = this.role;   //玩家ID=0
		this.ui.addChild(this.role);
		//设置摇杆要控制的球
		RockerLogic.getInstance().setControlPlayer(this.role);
	}

	public addPlayer(id) {
		let vo = this.getAIPlayerVO(id);
		let ai = ObjectPool.getObject("AIPlayer") as AIPlayer;
		ai.updateVO(vo);
		this.ui.addChild(ai);
		this.players[vo.id] = ai;
	}
	public removePlayer(id) {
		if (id == 0) {
			GameLogic.getInstance().gameover();
			return;
		}
		let player = this.players[id];
		if (player != null) {
			player.clear();
			if (player.parent != null) {
				player.parent.removeChild(player);
			}
			delete this.players[id];
		}
	}

	private clearPlayers() {
		for (let id in this.players) {
			this.removePlayer(id)
		}
	}

	/** ------------------------------ knifes ----------------- */

	/** 检测吃球 */
	public dealEatKnifes(x, y, r): number {
		let p1 = new egret.Point(x, y);
		let n: number = 0;
		for (let id in this.knifes) {
			let knife = this.knifes[id];
			if (knife != null && knife.state == KNIFESTATE.NORMAL) {
				let p2 = new egret.Point(knife.x, knife.y);
				let dis = egret.Point.distance(p1, p2);
				if (dis <= r) {
					n++;
					this.removeKnife(id);
				}
			}
		}
		return n;
	}
	/**初始化场景中的随机飞刀 */
	private initKnifes() {
		this.knife_num = 0;
		this.knife_hash = 0;
		for (let i = 0; i < DesignConst.knife_max; i++) {
			this.addKnife(this.knife_hash);
		}
	}

	private checkKnifes() {
		if (this.knife_num < DesignConst.knife_max) {
			this.addKnife(this.knife_hash);
		}
	}

	public flyToMap(id, srcx, srcy) {
		if (this.ui == null) {
			return;
		}
		let knife = ObjectPool.getObject("KnifePlayer") as KnifePlayer;
		knife.init(id, false);
		this.ui.addChild(knife);
		this.knifes[knife.id] = knife;
		this.knife_num++;
		this.knife_hash++;
		knife.x = srcx;
		knife.y = srcy;
		let x = srcx + Math.random() * 1200 - 600;
		let y = srcy + Math.random() * 1200 - 600;
		let p = this.checkBound(x, y, 30);

		egret.Tween.get(knife, { loop: true }).to({ rotation: 360 }, 300);
		egret.Tween.get(knife).to({ x: p.x, y: p.y }, 1200).call(() => {
			knife.state = KNIFESTATE.NORMAL;
			egret.Tween.removeTweens(knife);
		}, this);
	}

	public checkBound(x, y, dis): egret.Point {
		if (x < dis) {
			x = dis;
		}
		else if (x > DesignConst.mapwidth - dis) {
			x = DesignConst.mapwidth - dis;
		}
		if (y < dis) {
			y = dis;
		}
		else if (y > DesignConst.mapheight - dis) {
			y = DesignConst.mapheight - dis;
		}
		return new egret.Point(x, y);
	}

	public addKnife(id) {
		if (this.ui == null) {
			return;
		}
		let knife = ObjectPool.getObject("KnifePlayer") as KnifePlayer;
		knife.init(id);
		this.ui.addChild(knife);
		this.knifes[knife.id] = knife;
		this.knife_num++;
		this.knife_hash++;
	}
	public removeKnife(id) {
		let knife = this.knifes[id];
		if (knife != null) {
			knife.clear();
			if (knife.parent != null) {
				knife.parent.removeChild(knife);
			}
			delete this.knifes[id];
			this.knife_num--;
		}
	}

	private clearKnifes() {
		for (let id in this.knifes) {
			this.removeKnife(id)
		}
		this.knife_num = 0;
		this.knife_hash = 0;
	}


	/** ----------------------------------------------------------------------- */

	public start() {
		this.enter_count = 0;
		/**一秒钟后AI角色开始移动 */
		egret.setTimeout(() => {
			for (let id in this.players) {
				let p = this.players[id];
				if (p.vo.id != 0) {
					p.state = PLAYERSTATE.MOVE;
				}
			}
		}, this, 1000);
	}

	public stop() {
		for (let id in this.players) {
			let p = this.players[id];
			p.clear();
		}
	}

	public getBeginPlayerVO(): PlayerVO {
		let vo = ObjectPool.getObject("PlayerVO") as PlayerVO;
		vo.bg_id = "1";
		vo.knife_num = 4;
		vo.circleRadius = 48;
		vo.turn_speed = 4;
		vo.dis_from_circle = -16;
		vo.name = "玩家";
		vo.skinvo = SkinLogic.getInstance().getSkinVOByID(3);

		return vo;
	}

	private getRolePlayerVO(): PlayerVO {
		let vo = ObjectPool.getObject("PlayerVO") as PlayerVO;
		vo.id = 0;
		vo.bg_id = this.args.bgId;
		vo.knife_num = this.args.num;
		vo.skinvo = SkinLogic.getInstance().getSkinVOByID(this.args.skinId);
		vo.circleRadius = 32;
		vo.turn_speed = DesignConst.role_turn_speed;
		vo.move_speed = DesignConst.role_move_speed;
		vo.name = WxApi.getInstance().userInfo.nickname;
		return vo;
	}

	private getAIPlayerVO(id: number): PlayerVO {
		let vo = ObjectPool.getObject("PlayerVO") as PlayerVO;
		vo.id = id;
		vo.bg_id = GameUtil.between(1, 5) + "";
		vo.knife_num = 4;
		vo.skinvo = SkinLogic.getInstance().getSkinVOByID(GameUtil.between(1, 5));
		vo.circleRadius = 32;
		vo.turn_speed = DesignConst.ai_turn_speed;
		vo.move_speed = DesignConst.ai_move_speed;
		vo.name = "电脑" + vo.id;
		return vo;
	}

	private scale: number = 1;
	private stepx: number;
	private stepy: number;
	public canchange: boolean = true;
	/**玩家球位置改变时 地图跟着改变 */
	public updateMapCrood() {
		if (this.ui == null) {
			return;
		}
		this.ui.scaleX = this.ui.scaleY = this.scale;
		let tarx = - (this.role.x) * this.scale + GameData.stageWidth / 2;
		let tary = - (this.role.y) * this.scale + GameData.stageHeight / 2;

		this.ui.x = tarx;
		this.ui.y = tary;
	}

	private enter_count: number;
	public enterframe() {
		this.updatePlayerBalls();
		if (this.enter_count % DesignConst.knife_frest_rate == 0) {
			this.checkKnifes();
		}
		this.enter_count++;
	}


	private sortPlayers(a: Player, b: Player): number {
		if (a.vo.knife_num > b.vo.knife_num) {
			return -1;
		}
		else {
			return 1;
		}
	}

	/**更新玩家球状态 */
	public updatePlayerBalls() {
		let arr: Player[] = [];
		for (let id in this.players) {
			let player = this.players[id];
			arr.push(player);
		}
		//排序 并刷新排行榜
		arr.sort(this.sortPlayers);
		GameLogic.getInstance().updateRank(arr);

		this.updatePlayerBallsState(arr);

	}
	/**更新玩家状态  坐标-->吞噬-->逃逸-->追击-->block */
	private updatePlayerBallsState(arr: Player[]) {
		//包含了所有玩家角色
		while (arr.length > 0) {
			let p = arr.shift();
			p.update();
			this.setPlayerBallsState(p, arr);
		}
	}

	private setPlayerBallsState(srcplayer: Player, tarplayers: Player[]) {
		let eated: boolean = false;
		for (let i = 0; i < tarplayers.length; i++) {
			let tarplayer = tarplayers[i];
			eated = this.dealHit(srcplayer, tarplayer);
			//srcplayer被吃掉了 return
			if (eated) {
				return;
			}
		}
	}

	private dealHit(srcplayer: Player, tarplayer: Player) {
		let dis = srcplayer.vo.radius + tarplayer.vo.radius;
		if (srcplayer.state == PLAYERSTATE.DEFENCE || tarplayer.state == PLAYERSTATE.DEFENCE) {
			dis += 30;
		}
		let p1 = new egret.Point(srcplayer.x, srcplayer.y);
		let p2 = new egret.Point(tarplayer.x, tarplayer.y);
		let b1 = egret.Point.distance(p1, p2) < dis;
		if (b1) {
			let src_kill: number;
			let tar_kill: number;
			let p3: egret.Point;
			let p4: egret.Point;//knife在地图中的坐标
			let p5: egret.Point;
			let p6: egret.Point;//tarknife在地图中的坐标
			// if (tarplayer.state != PLAYERSTATE.DEFENCE) {
			for (let i: number = 0; i < srcplayer.knifes.length; i++) {
				let knife = srcplayer.knifes[i];
				if (srcplayer.state == PLAYERSTATE.DEFENCE) {
					p3 = knife.localToGlobal(knife.width / 2, knife.height);
				}
				else {
					p3 = knife.localToGlobal(knife.width / 2, knife.height / 2);
				}
				p4 = this.ui.globalToLocal(p3.x, p3.y);//knife在地图中的坐标
				//先检测tar圆心，优先击杀
				let d2 = egret.Point.distance(p4, p2);
				if (d2 < tarplayer.vo.circleRadius) {//击杀tar
					if (tarplayer.vo.id == 0) {
						platform.vibrate(true);
					}
					this.removePlayer(tarplayer.vo.id);
					return;
				}

				//遍历飞刀
				for (let j = 0; j < tarplayer.knifes.length; j++) {
					let tarknife = tarplayer.knifes[j];
					if (tarplayer.state == PLAYERSTATE.DEFENCE) {
						p5 = tarknife.localToGlobal(tarknife.width / 2, tarknife.height);
					}
					else {
						p5 = tarknife.localToGlobal(tarknife.width / 2, tarknife.height / 2);
					}
					p6 = this.ui.globalToLocal(p5.x, p5.y);//tarknife在地图中的坐标

					//先检测src圆心，优先击杀
					d2 = egret.Point.distance(p6, p1);
					if (d2 < srcplayer.vo.circleRadius) {//击杀src
						if (srcplayer.vo.id == 0) {
							platform.vibrate(true);
						}
						this.removePlayer(srcplayer.vo.id);
						return;
					}

					d2 = egret.Point.distance(p4, p6);
					let b2 = d2 < tarknife.height / 2;
					let ss: boolean = false;
					if (b2) {//飞刀击杀	
						if (srcplayer.state == PLAYERSTATE.DEFENCE && tarplayer.state != PLAYERSTATE.DEFENCE) {//src处于防御状态,tar不是防御状态
							if (Math.random() < 0.3) {
								srcplayer.removeKnife(i);
								if (srcplayer.vo.id == 0) {
									ss = true;
								}
								this.flyToMap(this.knife_hash, p4.x, p4.y);
							}
							tarplayer.removeKnife(j);
							if (tarplayer.vo.id == 0) {
								ss = true;
							}
							this.flyToMap(this.knife_hash, p6.x, p6.y);
							if (ss) {
								platform.vibrate(true);
							}
							return;
						}
						if (tarplayer.state == PLAYERSTATE.DEFENCE && srcplayer.state != PLAYERSTATE.DEFENCE) {//tar处于防御状态，src不是
							if (Math.random() < 0.3) {
								tarplayer.removeKnife(i);
								if (tarplayer.vo.id == 0) {
									ss = true;
								}
								this.flyToMap(this.knife_hash, p4.x, p4.y);
							}
							if (srcplayer.vo.id == 0) {
								ss = true;
							}
							srcplayer.removeKnife(j);
							this.flyToMap(this.knife_hash, p6.x, p6.y);
							if (ss) {
								platform.vibrate(true);
							}
							return;
						}
						if (tarplayer.state == PLAYERSTATE.DEFENCE && srcplayer.state == PLAYERSTATE.DEFENCE) {//2个都处于防御状态
							srcplayer.removeKnife(i);
							this.flyToMap(this.knife_hash, p4.x, p4.y);
							tarplayer.removeKnife(j);
							this.flyToMap(this.knife_hash, p6.x, p6.y);
							if (srcplayer.vo.id == 0 || tarplayer.vo.id == 0) {
								ss = true;
							}
							if (ss) {
								platform.vibrate(true);
							}
							return;
						}

						//都不在防御状态
						if (srcplayer.knifes.length > tarplayer.knifes.length) {//大的飞刀 有概率不掉飞刀
							if (Math.random() < 0.8) {
								srcplayer.removeKnife(i);
								if (srcplayer.vo.id == 0) {
									ss = true;
								}
								this.flyToMap(this.knife_hash, p4.x, p4.y);
							}
							tarplayer.removeKnife(j);
							if (tarplayer.vo.id == 0) {
								ss = true;
							}
							this.flyToMap(this.knife_hash, p6.x, p6.y);
						}
						else if (srcplayer.knifes.length < tarplayer.knifes.length) {
							if (Math.random() < 0.8) {
								tarplayer.removeKnife(i);
								if (tarplayer.vo.id == 0) {
									ss = true;
								}
								this.flyToMap(this.knife_hash, p4.x, p4.y);
							}
							if (srcplayer.vo.id == 0) {
								ss = true;
							}
							srcplayer.removeKnife(j);
							this.flyToMap(this.knife_hash, p6.x, p6.y);
						}
						else {
							srcplayer.removeKnife(i);
							this.flyToMap(this.knife_hash, p4.x, p4.y);
							tarplayer.removeKnife(j);
							this.flyToMap(this.knife_hash, p6.x, p6.y);
							if (srcplayer.vo.id == 0 || tarplayer.vo.id == 0) {
								ss = true;
							}
						}
						if (ss) {
							platform.vibrate(true);
						}
						return;
					}
				}
			}
			// }
		}
		return false;
	}

	public clear() {
		this.clearKnifes();
		this.clearPlayers();

		if (this.ui != null && this.ui.parent != null) {
			this.ui.parent.removeChild(this.ui);
		}
		this.ui = null;
	}



	/** ------------------------------------------------------------------------------------ */

	public getMapBg(w: number, h: number): egret.Bitmap {
		let unit = 68;
		let w1 = Math.ceil(w / unit);
		let h1 = Math.ceil(h / unit);
		let con = new egret.DisplayObjectContainer();
		for (let i = 0; i < h1; i++) {
			for (let j = 0; j < w1; j++) {
				let r = Math.random();
				let src = r < 0.9 ? 2 : (r < 0.95 ? 1 : 3);
				let bmp = new egret.Bitmap(RES.getRes("game_json.di_" + src));
				bmp.x = j * unit;
				bmp.y = i * unit;
				con.addChild(bmp);
			}
		}
		return GameUtil.drawBitmapFromDisObject(con, new egret.Rectangle(0, 0, w, h), 1);
	}
}