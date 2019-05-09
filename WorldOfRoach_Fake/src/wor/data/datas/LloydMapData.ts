/**
 * 游戏地图数据
 */
class LloydMapData {

	//海拔：1-4,湖泊和海洋不受海拔影响
	public static SEA: number = 0x104E8B;
	public static LAKE: number = 0x1C86EE;
	/**雪-----海拔4 */
	public static F_4: number = 0xf8f8f8;//雪-----海拔4
	/**苔原 */
	public static F_3: number = 0xdddcbd;//苔原
	/**荒原 */
	public static F_2: number = 0xbbbbbb;//荒原
	/**焦土 */
	public static F_1: number = 0x999999;//焦土
	/**针叶林-----海拔3 */
	public static T_3: number = 0xccd4bc;//针叶林-----海拔3
	/**灌木丛 */
	public static T_2: number = 0xc4ccbc;//灌木丛
	/**高寒荒漠 */
	public static T_1: number = 0xe4e7cb;//高寒荒漠
	/**温带雨林-----海拔2 */
	public static W_4: number = 0xa5c3a9;//温带雨林-----海拔2
	/**温带落叶林 */
	public static W_3: number = 0xb4c8aa;//温带落叶林
	/**草原 */
	public static W_2: number = 0xc4d3ac;//草原
	/**高寒荒漠 */
	public static W_1: number = 0xe4e7cb;//高寒荒漠
	/**热带雨林-----海拔1 */
	public static O_4: number = 0x9dbba9;//热带雨林-----海拔1
	/**热带季雨林 */
	public static O_3: number = 0xaacba5;//热带季雨林
	/**草地 */
	public static O_2: number = 0xc4d3ac;//草地
	/**亚热带荒漠 */
	public static O_1: number = 0xe9ddc8;//亚热带荒漠
	public static _fixFloorTypes: number[] = [
		LloydMapData.SEA,
		LloydMapData.LAKE,
		LloydMapData.F_4,
		LloydMapData.F_3,
		LloydMapData.F_2,
		LloydMapData.F_1,
		LloydMapData.T_3,
		LloydMapData.T_2,
		LloydMapData.T_1,
		LloydMapData.W_4,
		LloydMapData.W_3,
		LloydMapData.W_2,
		LloydMapData.W_1,
		LloydMapData.O_4,
		LloydMapData.O_3,
		LloydMapData.O_2,
		LloydMapData.O_1,
	];
	private static _fixLen: number;
	/**小地图渲染图 */
	public baseMap: egret.RenderTexture;
	/**河流渲染贴图 */
	public riverMap: egret.RenderTexture;

	//---------过度参数--------
	public static LAND: number = 0x398d32;
	private _altitude: number = 0;//海拔系数
	public sizeX: number;
	public sizeY: number;
	private _areaDic: Map<number, Area2D> = new Map<number, Area2D>();
	private _polDic: Map<number, Pol2D> = new Map<number, Pol2D>();
	private _points: Map<number, AreaPoint> = new Map<number, AreaPoint>();
	//---------下面才是有用的数据,多边形数据---------
	private _areas: Array<Area2D> = new Array<Area2D>();	//所有的区域
	private _lakes: Array<Lake> = new Array<Lake>();		//地图所拥有的湖泊
	private _rivers: Array<River> = new Array<River>();		//地图所拥有的河流
	private _gridDic: Map<string, Array<Area2D>>;			//网络包含的区块列表
	private _gridDicW: number = 30;//地图区域的大小

	//将预备的地形从小到大进行排序
	public constructor() {
		LloydMapData._fixLen = LloydMapData._fixFloorTypes.length;
		LloydMapData._fixFloorTypes.sort(function (a: number, b: number): number {
			if (a > b)
				return 1;
			return -1;
		});
	}

	/**构建区域组 */
	private buildGridDic(w: number, h: number): void {
		this._gridDic = new Map<string, Array<Area2D>>();
		//计算地图横向区块数量
		let wCount: number = Math.floor(w / this._gridDicW) + 1;
		//计算地图纵向区块数量		
		let hCount: number = Math.floor(h / this._gridDicW) + 1;
		//通过纵横索引来加入区块列表
		for (let i: number = 0; i < wCount; i++) {
			for (let j: number = 0; j < hCount; j++) {
				this._gridDic.set(i + "_" + j, new Array<Area2D>());
			}
		}
	}
	/**初始化区域组 吧不同的区域划入组*/
	private initGridDic(): void {
		let key: any;
		let area: Area2D;
		for (key in this._areas) {
			area = this._areas[key];
			let pox: number = Math.floor(area.centerPoint.x / this._gridDicW);
			let poy: number = Math.floor(area.centerPoint.y / this._gridDicW);
			this._gridDic.get(pox + "_" + poy).push(area);
		}
	}

	public getFloorTypeByArea(px:number,py:number):number{
		//计算地图坐标点的场景区块坐标
		let pox: number = Math.floor(px / this._gridDicW);
		let poy: number = Math.floor(py / this._gridDicW);
		
		let arr: Array<Area2D>;
		let key: any;
		let area: Area2D;
		let minDst: number = 1000000;
		let targetType: number = 0;
		//获取上下左右九宫的区域尽兴判断
		for (var i: number = pox - 1; i <= pox + 1; i++) {
			for (var j: number = poy - 1; j <= poy + 1; j++) {
				arr = this._gridDic.get(i + "_" + j);
				if (arr == null)
					continue;
				for (key in arr) {
					area = arr[key];
					var dis: number = TriangleUtil.distance(px - area.centerPoint.x, py - area.centerPoint.y);
					if (dis < minDst) {
						minDst = dis;
						targetType = area.type;
					}
				}
			}
		}
		return targetType;
	}


	/**通过像素坐标获取地形类型对应的位图
	 * 如果在地形里没有找到对应的，则返回相近的
	 * @param pxpy--小地图坐标
	 */
	public getFloorType(px:number,py:number):number{
		let color:number[];
		//先从河流图片中检测是否是河流
		if(GameConfig.showRiver){
			color = this.riverMap.getPixel32(px,py);
			if(color[3]>=10)
				return LloydMapData.LAKE;
		}
		color = this.baseMap.getPixel32(px,py);
		let cType:number = color[0]<<16|color[1]<<8|color[2];
		if(LloydMapData._fixFloorTypes.indexOf(cType)<0)
			return -cType;
		return cType;
	}

	/** 根据大地图的方格xy坐标获取地图类型
	 * @param px--场景坐标
	 * @param py--场景坐标
	 */
	public getFloorTypeByPx(px:number,py:number):number{
		//进行转换成小地图的坐标
		px=Math.floor(px/GameConfig.map_cfx);
		//y坐标需要坐标转换
		py = this.baseMap.$bitmapHeight-Math.floor(py/GameConfig.map_cfy);
		return this.getFloorType(px,py);
	}

	/**从存储的信息中读取数据 */
	public build(obj:Object):void{
		this.sizeX = obj["w"];
		this.sizeY = obj["h"];

		this.buildGridDic(this.sizeX,this.sizeY);
		let pDic:Map<number,AreaPoint> = new Map<number,AreaPoint>();
		let p2dObj:Object;
		let p2d:AreaPoint;
		//读取顶点信息
		while(obj["p2d"].length>0){
			p2dObj = obj["p2d"].pop();
			p2d = new AreaPoint();
			p2d.id = p2dObj["id"];
			p2d.x = p2dObj["x"];
			p2d.y = p2dObj["y"];
			p2d.river = p2dObj["r"];
			pDic.set(p2d.id,p2d);
		}
		//读取区域和区域对应的顶点
		let area :Area2D;
		let areaObj:Object;
		let arr:Array<Object> = new Array<Object>();
		while(obj["areas"].length>0){
			area = new Area2D();
			areaObj = obj["areas"].pop();
			arr.push(areaObj);
			area.id = areaObj["id"];
			area.centerPoint = new egret.Point(areaObj["cp"].x,areaObj["cp"].y);
			area.type = areaObj["ty"];
			this._areaDic.set(area.id,area);
			this._areas.push(area);
			while(areaObj["vers"].length>0)
				area.vertex.push(pDic.get(areaObj["vers"].pop()));
		}
		//读取区域周围的区域
		while(arr.length>0){
			areaObj = arr.pop();
			area = this._areaDic.get(areaObj["id"]);
			while(areaObj["nears"].length>0)
				area.neighbor.push(this._areaDic.get(areaObj["nears"].pop()));
		}
		//读取河流的信息
		let riverObj:Object;
		let river:River;
		while(obj["river"].length>0){
			riverObj = obj["river"].pop();
			river = new River();
			this._rivers.push(river);
			river.startArea = this._areaDic.get(riverObj["id"]);
			//河流下游的点
			while(riverObj["ps"].length>0)
				river.downsteams.push(pDic.get(riverObj["ps"].shift()));
		}
		this.initGridDic();
	}

	/**
	 * 获取存储用的DB信息
	 */
	public getDb(): Object {
		let obj: Object = new Object();
		//记录地图的宽高
		obj["w"] = this.sizeX;
		obj["h"] = this.sizeY;
		//记录地图的区块顶点和河流
		obj["areas"] = new Array<any>();
		obj["p2d"] = new Array<any>();
		obj["river"] = new Array<any>();

		let key: any;
		let area: Area2D;
		let p2d: AreaPoint;
		let setsP: number[] = [];

		for (key in this._areas) {
			area = this._areas[key];
			let areaObj: Object = new Object();
			obj["areas"].push(areaObj);
			areaObj["id"] = area.id;
			areaObj["cp"] = area.centerPoint;
			areaObj["ty"] = area.type;
			areaObj["nears"] = new Array<any>();
			for (key in area.neighbor)
				areaObj["nears"].push(area.neighbor[key].id);

			areaObj["vers"] = new Array<any>();
			for (key in area.vertex)
				areaObj["vers"].push(area.vertex[key].id);

			for (key in area.vertex) {
				p2d = area.vertex[key];
				if (setsP.indexOf(p2d.id) >= 0)
					continue;
				setsP.push(p2d.id);
				let p2dObj: Object = new Object();
				p2dObj["id"] = p2d.id;
				p2dObj["x"] = p2d.x;
				p2dObj["y"] = p2d.y;
				p2dObj["r"] = p2d.river;
				obj["p2d"].push(p2dObj);
			}
		}
		//保存河流
		let river: River;
		for (key in this._rivers) {
			river = this._rivers[key];
			let r: Object = new Object();
			r["id"] = river.startArea.id;
			r["ps"] = new Array<any>();
			for (key in river.downsteams) {
				p2d = river.downsteams[key];
				r["ps"].push(p2d.id);
			}
			obj["river"].push(r);
		}
		return obj;
	}


	/**
	 * 赋值一份原始的多边形数据
	 * @param list 	多边形列表
	 * @param w	
	 * @param h	
	 */
	public initData(list: Array<Pol2D>, w: number, h: number): void {
		this.buildGridDic(w, h);
		this.sizeX = w;
		this.sizeY = h;
		this._altitude = 0;
		let key: any;
		let pol: Pol2D;
		//通过多边形，创建区域属性列表（用于划分湖泊/陆地）
		for (key in list) {
			pol = list[key];
			let area2D: Area2D = new Area2D();
			//设置ID
			area2D.id = pol.centerPoint.id;
			this._areaDic.set(area2D.id, area2D);
			this._polDic.set(area2D.id, pol);
			//设置中心点,多边形的重心
			area2D.centerPoint = new egret.Point(pol.centerPoint.x, pol.centerPoint.y);
			//设置是否为最外圈的多边形
			area2D.isOutside = pol.isos;

			//通过多边形顶点来构建区域的顶点
			let p2d: Point2D;
			for (key in pol.vertex) {
				p2d = pol.vertex[key];
				if (this._points.get(p2d.id) == null)
					this._points.set(p2d.id, new AreaPoint(p2d.x, p2d.y));
				let areaPoint: AreaPoint = this._points.get(p2d.id);
				areaPoint.id = p2d.id;
				area2D.vertex.push(areaPoint);
				if (areaPoint.areas.indexOf(area2D.id) < 0)
					areaPoint.areas.push(area2D.id);
			}
			this._areas.push(area2D);
		}
	}
	/**
	 * 调整陆地占比
	 * @param landDivWater 陆地占比
	 * @return
	 */
	public adjustCoast(land: number, btd: any): void {
		let areaTotal: number = 0;//区块总量计数
		let landCount: number = 0;//陆地总量计数
		// 500/800
		let xbl: number = btd.length / this.sizeX;
		// 500/800
		let ybl: number = btd[0].length / this.sizeY;
		let area: Area2D;
		let key: any;
		for (key in this._areas) {
			area = this._areas[key];
			//计算多边形顶点相对应噪声图的位置
			let xp: number = Math.floor(area.centerPoint.x * xbl);
			let yp: number = Math.floor(area.centerPoint.y * ybl);
			//获取多边形中心对应噪声图的数据 --这个数值对应地形的类型
			let color: number = btd[xp][yp];
			color += this._altitude;
			areaTotal++;
			if (color < 0x0000ff / 2 && !area.isOutside) {
				area.type = LloydMapData.LAND;//陆
				area.isWater = false;
				landCount++;
			}
			else {
				area.type = LloydMapData.SEA;//水
				area.isWater = true;
			}
		}
		//如果陆地过小，减低海平面再次计算
		if (landCount / areaTotal < land) {
			this._altitude -= 0x0000ff / 50;
			this.adjustCoast(land, btd);
		}
	}

	/**
	 * 初始化区域信息
	 * 1.多边形的相邻多变形
	 * 2.为每个顶点定义相邻的顶点
	 */
	public initArea() {
		let points: Array<number> = [];
		let key: any;
		let area: Area2D;
		let tri: Tri2D;
		let p2d: Point2D;
		let areaPoint: AreaPoint;
		for (key in this._areas) {
			area = this._areas[key];
			let pol: Pol2D = this._polDic.get(area.id);
			let ids: Array<number> = [];
			// 遍历多边形包含的三角形 -- 获取多边形相邻的多边形
			for (key in pol.centerPoint.tris) {
				tri = pol.centerPoint.tris[key];
				// 多边形的三角形三角形顶点
				for (key in tri.vertex) {
					p2d = tri.vertex[key];
					if (p2d.id != area.id						//非当前多边形
						&& ids.indexOf(p2d.id) < 0				//非遍历过顶点
						&& this._areaDic.get(p2d.id) != null	//是多边形中心点
					) {
						ids.push(p2d.id);
						//获取相邻的多边形
						area.neighbor.push(this._areaDic.get(p2d.id));
					}
				}
			}

			//构建相邻的顶点
			for (key in area.vertex) {
				//处理多边形每个顶点
				areaPoint = area.vertex[key];
				if (points.indexOf(areaPoint.id) >= 0)
					continue;
				//处理过的顶点进行标记
				points.push(areaPoint.id);
				//获取多边形对应的此顶点Point2D
				let targetPoint: Point2D = pol.getPointByID(areaPoint.id);
				//获取自身多边形的前一个点和后一个点
				if (areaPoint.nears.indexOf(this._points.get(pol.getNextPoint(targetPoint).id)) < 0)
					areaPoint.nears.push(this._points.get(pol.getNextPoint(targetPoint).id));
				if (areaPoint.nears.indexOf(this._points.get(pol.getPrePoint(targetPoint).id)) < 0)
					areaPoint.nears.push(this._points.get(pol.getPrePoint(targetPoint).id));

				let nerArea: Area2D;
				//遍历相邻多边形
				for (key in area.neighbor) {
					nerArea = area.neighbor[key];
					let nerPol: Pol2D = this._polDic.get(nerArea.id);
					//判断多边形是否包含此点——-相连接的点
					let insertPoint: Point2D = nerPol.getNextPoint(targetPoint);
					if (insertPoint != null && areaPoint.nears.indexOf(this._points.get(insertPoint.id)) < 0)
						areaPoint.nears.push(this._points.get(insertPoint.id));
					insertPoint = nerPol.getPrePoint(targetPoint);
					if (insertPoint != null && areaPoint.nears.indexOf(this._points.get(insertPoint.id)) < 0)
						areaPoint.nears.push(this._points.get(insertPoint.id));
				}
			}

		}
	}

	/**
	 * 检测地形包括下面几个操作
	 * 1.区分湖泊和海洋。
	 * 			排除海洋：和isoutSide链接的就是海洋
	 * 			剩下的就是湖泊
	 */
	public checkTerrain(): void {
		//获取第一块海洋
		let startOutSide: Area2D;
		//存储湖泊的列表
		let waters: Array<Area2D> = new Array<Area2D>();
		let key: any;
		let area: Area2D;
		for (key in this._areas) {
			area = this._areas[key];
			if (area.isWater) {
				if (startOutSide == null && area.isOutside)
					startOutSide = area;
				else
					waters.push(area);//临时存储
			}
		}
		let checkArea: Array<Area2D>;
		let nerAreas: Array<Area2D> = startOutSide.neighbor;
		let seaCount: number = nerAreas.length;
		//检测海洋周边的区域
		while (seaCount > 0) {
			checkArea = new Array<Area2D>();
			seaCount = 0;
			//遍历海洋周围区域
			for (key in nerAreas) {
				area = nerAreas[key];
				//如果相邻区域是水域--设置为海洋
				let index: number = waters.indexOf(area);
				if (index >= 0) {
					waters.splice(index, 1);	//删除海洋区域
					seaCount++;				//表示湖泊列表中仍有海洋
					let key1: any;
					for (key1 in area.neighbor) {
						let area1: Area2D = area.neighbor[key1];
						if (waters.indexOf(area1) >= 0)
							checkArea.push(area1);	//获取海洋周边的水域列表
					}
				}
			}
			nerAreas = checkArea;
		}
		for (key in waters) {
			area = waters[key];
			area.type = LloydMapData.LAKE;
		}
		while (waters.length > 0) {
			let lake: Lake = this.findLake(waters);
			lake.checkSefl();
			this._lakes.push(lake);
		}
	}

	/**
	 * 修正湖泊的数量 
	 * @param 湖泊最少数量
	 * @param 湖泊最大数量
	 */
	public amendLake(minCount: number, maxCount: number): void {
		//如果湖泊数量在可控制范围内
		if (this._lakes.length >= minCount && this._lakes.length <= maxCount)
			return;
		let lake: Lake;
		let areaIds: Array<number>;
		let area: Area2D;
		//湖泊太多进行删除
		while (this._lakes.length > maxCount) {
			lake = this._lakes[0];
			this._lakes.splice(0, 1);
			areaIds = lake.getAreas();
			for (let i: number = 0; i < areaIds.length; i++) {
				area = this._areaDic.get(areaIds[i]);
				area.type = LloydMapData.LAND;
				area.isWater = false;
			}
		}
		let targetPoint: number = minCount + Math.round(Math.random() * (maxCount - minCount));
		while (this._lakes.length < targetPoint)
			this.createRandomLake();
	}
	/**随机创建一个湖泊 */
	private createRandomLake(): void {
		let key: any;
		let startLakeArea: Area2D;
		let findInLand: boolean = false;
		let area: Area2D;
		//获取一块内陆地区
		for (key in this._areas) {
			startLakeArea = this._areas[key];
			if (this.isInLand(startLakeArea)) {
				findInLand = true;
				break;
			}
		}
		if (!findInLand)
			return;

		let preCount: number = 1;
		let preLakes: Array<Area2D> = new Array<Area2D>();
		preLakes.push(startLakeArea);
		let ners: Array<Area2D> = startLakeArea.neighbor;
		//随机湖泊大小2-5块区域
		let targetCount: number = Math.floor(2 + Math.random() * 3);
		let check: Array<Area2D>;
		while (preLakes.length < targetCount) {
			check = new Array<Area2D>();
			for (key in ners) {
				area = ners[key];
				if (preLakes.indexOf(area) < 0 && preLakes.length < targetCount && this.isInLand(area)) {
					preLakes.push(area);
					for (let i: number = 0; i < area.neighbor.length; i++) {
						check.push(area.neighbor[i]);
					}
				}
			}
			ners = check;
			//遍历一轮没有新增表示不能再增加
			if (preLakes.length == preCount)
				break;
			preCount = preLakes.length;
		}
		let lake: Lake = new Lake();
		for (key in preLakes) {
			area = preLakes[key];
			area.type = LloydMapData.LAKE;
			area.isWater = true;
			lake.addArea(area.id);
		}
		this._lakes.push(lake);
	}

	/**检查是否属于内陆 自身及周边是否是水*/
	private isInLand(area: Area2D): boolean {
		if (area.isWater)
			return false;
		let ners: Array<Area2D>;
		ners = area.neighbor;
		let isInLand: boolean = true;
		let key: any
		for (key in ners) {
			area = ners[key];
			if (area.isWater) {
				isInLand = false;
				break;
			}
		}
		return isInLand;
	}
	/** 检查是否属于内水*/
	private isInWater(area: Area2D): boolean {
		if (!area.isWater)
			return false;
		var ners: Array<Area2D>;
		ners = area.neighbor;
		var isInWater: boolean = true;
		var key: any;
		for (key in ners) {
			area = ners[key];
			if (!area.isWater) {
				isInWater = false;
				break;
			}
		}
		return isInWater;
	}

	/**
	 * 在一个数组中发现一个湖泊 
	 * 多个连接在一起的湖泊组合成一个
	 */
	private findLake(areas: Array<Area2D>): Lake {
		let lake: Lake = new Lake();
		let startArea: Area2D = areas[0];
		lake.addArea(startArea.id);
		areas.splice(0, 1);
		let key: any;
		let area: Area2D;
		let checkArea: Array<Area2D>;
		let nerAreas: Array<Area2D> = startArea.neighbor;
		let lakeCount: number = nerAreas.length;
		while (lakeCount > 0) {
			checkArea = new Array<Area2D>();
			lakeCount = 0;
			for (key in nerAreas) {
				area = nerAreas[key];
				let index: number = areas.indexOf(area);
				if (index >= 0) {
					lake.addArea(area.id);
					areas.splice(index, 1);
					lakeCount++;
					let key1: any;
					for (key1 in area.neighbor) {
						let area1: Area2D = area.neighbor[key1];
						if (areas.indexOf(area1) >= 0)
							checkArea.push(area1);
					}
				}
			}
			nerAreas = checkArea;
		}
		return lake;
	}


	/**获取所有的内陆 */
	private getAllInLand(initEle: boolean = false, minEle: number = 0, maxEle: number = 0): Array<Area2D> {
		let all: Array<Area2D> = new Array<Area2D>();
		let key: any;
		let area: Area2D;
		if (initEle) {
			for (key in this._areas) {
				area = this._areas[key];
				for (key in area.vertex) {
					area.vertex[key].elevation = -99999;
					if (area.isWater)
						area.vertex[key].river = 1;
				}
			}
		}
		for (key in this._areas) {
			area = this._areas[key];
			if (initEle) {
				let toEle: number = -100000;
				if (area.isWater && area.type != LloydMapData.LAKE)
					for (key in area.vertex)
						area.vertex[key].elevation = toEle;
			}
			if (this.isInLand(area) && (maxEle == 0 || (area.getElevation() >= minEle && area.getElevation() <= maxEle)))
				all.push(area);
		}
		return all;
	}


	/**
	 * 创建海拔,由高的海拔来覆盖低的海拔,海拔的变化必须衍生到海里
	 * 从小到大为大陆块增加山峰,非最大的大陆块只能有一个山峰，其余的都集中在最大的大陆板块?
	 * @param topMin 最高海拔最小数量
	 * @param topMax 最高海拔最大数量
	 * @param span 海拔的过渡数量
	 */
	public initAltitude(topMin: number, topMax: number, span: number): void {
		//计算需要多少个顶点海拔点
		let topCount: number = topMin + Math.floor(Math.random() * (topMax - topMin + 1));
		//将所有的内陆查询出来 --初始化所有顶点的海拔-99999
		let inlands: Array<Area2D> = this.getAllInLand(true);
		//还需要设置的海拔顶点
		while (topCount > 0) {
			//已经设置过海拔的点集列表
			let checked: number[] = [];
			//随机获取一个内陆的区域
			let randomIndex: number = Math.floor(Math.random() * inlands.length);
			//将要设置山峰的区域
			let targetArea: Area2D = inlands[randomIndex];
			//使用后从区域列表删除，以防重复
			inlands.splice(randomIndex, 1);
			let ners: Array<Area2D> = targetArea.neighbor;
			let key: any;
			let area: Area2D;
			//剔除连载一起的内陆区块--使用一块来表达
			//遍历所有相邻区域 --海拔最高点的区域周围不存在相同区域
			for (key in ners) {
				area = ners[key];
				let index: number = inlands.indexOf(area);
				if (index >= 0)
					inlands.splice(index, 1);
			}
			//获取设置山峰块的顶点
			let p2d: AreaPoint = targetArea.vertex[0];
			checked.push(p2d.id);
			//设置最高的海拔
			let toEle: number = 40;
			p2d.elevation = toEle;
			let nearPs: Array<AreaPoint> = p2d.nears;
			let checkPs: Array<AreaPoint>;
			//遍历上次遍历点集周边的点  --并没有跳过水域
			while (nearPs.length > 0) {
				checkPs = new Array<AreaPoint>();
				//没原理海拔最高点就减低海拔  海拔一次降低
				toEle -= span;
				//遍历区块index = 0的顶点相邻顶点
				for (key in nearPs) {
					p2d = nearPs[key];
					if (checked.indexOf(p2d.id) >= 0)
						continue;
					checked.push(p2d.id);
					if (p2d.elevation < toEle)
						p2d.elevation = toEle;
					for (key in p2d.nears) {
						if (checked.indexOf(p2d.nears[key].id) < 0		//还没有检测过的顶点
							&& p2d.nears[key].elevation != -100000)		//非靠近水域的顶点
							checkPs.push(p2d.nears[key]);
					}
				}
				nearPs = checkPs;
			}
			topCount--;
		}
	}

	/**
	 * 创建河流
	 * @param lakeMin 每个湖泊最少河流
	 * @param lakeMax 每个湖泊最大河流
	 * @param randomMin 随机河流条数
	 * @param randomMax 最大河流随机条数
	 * @param eleMin 随机河流的最小海拔限制
	 */
	public initRiver(lakeMin: number, lakeMax: number, randomMin: number, randomMax: number, eleMin: number): void {
		let lakeStarts: Array<Area2D> = new Array<Area2D>();
		let key: any;
		let lake: Lake;
		let riverCount: number;
		let area: Area2D;
		let p2d: AreaPoint;
		let river: River;

		//湖泊河流
		for (key in this._lakes) {
			lake = this._lakes[key];
			//随机此湖泊的河流数量
			riverCount = Math.floor(lakeMin + Math.random() * (lakeMax - lakeMin + 1));
			//循环创建每条河流
			while (riverCount > 0) {
				for (let i: number = 0; i < lake.getAreas().length; i++) {
					area = this._areaDic.get(lake.getAreas()[i]);
					//不属于湖泊中心就可以创建河流
					if (!this.isInWater(area))
						break;
				}
				//随机取一个顶点  --这个顶点为啥不是在水里
				p2d = area.vertex[Math.floor(area.vertex.length * Math.random())];
				//创建河流
				river = new River();
				//河流起点
				river.startArea = area;
				lakeStarts.push(area);//-----------设置河流不能顺着湖边走
				p2d.river++;//水量增加
				//河流路径
				river.downsteams.push(p2d);
				this._rivers.push(river);
				//海岸线和海内==-100000 -- 留到海里结束
				while (p2d.elevation != -100000) {
					p2d = AreaPoint.findDownstream(p2d, river);
					if (p2d == null)
						break;
					p2d.river++;
					river.downsteams.push(p2d);
				}
				riverCount--;
			}
		}

		//创建其他河流
		riverCount = Math.floor(randomMin + Math.random() * (randomMax - randomMin + 1));
		if (riverCount <= 0)
			return;
		//获取海拔在某个范围的内陆区域
		let allInLands: Array<Area2D> = this.getAllInLand(false, eleMin, 10000);
		while (riverCount > 0) {
			do {
				area = allInLands[Math.floor(Math.random() * allInLands.length)];
			} while (lakeStarts.indexOf(area) >= 0)//是否已经存在河流经过
			p2d = area.vertex[Math.floor(area.vertex.length * Math.random())];
			river = new River();
			river.startArea = area;
			lakeStarts.push(area);
			p2d.river++;
			river.downsteams.push(p2d);
			this._rivers.push(river);
			while (p2d.elevation != -100000) {
				p2d = AreaPoint.findDownstream(p2d, river);
				if (p2d == null)
					break;
				p2d.river++;
				river.downsteams.push(p2d);
			}
			riverCount--;
		}
	}

	/**
	 * 湿度  --感觉此代码有bug
	 * 分为1,2,3,4,5,6
	 */
	public initHumidity(): void {
		//先将湖泊的所有顶点设置为指定为最大湿度
		let key: any;
		let lake: Lake;
		let area: Area2D;
		let nearArea: Area2D;
		//此处应该存在bug，跳过已经遍历过一次的
		for (key in this._lakes) {
			lake = this._lakes[key];
			for (let i: number = 0; i < lake.getAreas().length; i++) {
				area = this._areaDic.get(lake.getAreas()[i]);
				for (key in area.neighbor) {
					nearArea = area.neighbor[key];
					//湖泊相邻单元格湿度加
					nearArea.humidity += Math.round(Math.random()) + 2;
				}
			}
		}
		let river: River;
		let p2d: AreaPoint;
		for (key in this._rivers) {
			river = this._rivers[key];
			river.startArea.humidity += 4;//河流的源头
			for (key in river.startArea.neighbor) {
				nearArea = river.startArea.neighbor[key];
				nearArea.humidity += 1;//河流源头相邻
			}
			let c: number = 0;
			for (key in river.downsteams) {
				c++;
				p2d = river.downsteams[key];
				for (key in p2d.areas) {
					area = this._areaDic.get(p2d.areas[key]);
					let add: number = 2 / c - 0.1;
					if (add > 1)
						add = 1;

					if (add < 0.5)
						area.humidity += 0.5;//河流节点周围
					else
						area.humidity += add;//河流节点周围
					for (key in area.neighbor) {
						area.neighbor[key].humidity += add;
					}
				}
			}
		}
	}


	/** 获取在某个地形包围中的某个地形*/
	private findInTerrain(type: number): Array<Area2D> {
		let all: Array<Area2D> = new Array<Area2D>();
		let key: any;
		let area: Area2D;
		for (key in this._areas) {
			area = this._areas[key];
			if (area.type != type)
				continue;
			let isInType: boolean = true;
			for (key in area.neighbor) {
				if (area.neighbor[key].type != type) {
					isInType = false;
					break;
				}
			}
			if (isInType)
				all.push(area);
		}
		return all;
	}

	/**
	 * 为地图增加绿洲
	 * 绿洲里必然有水源（这个根据业务开发）
	 * 绿洲就是1个区域的湿度为2~1的区域,绿洲里有一定的补给
	 */
	public amendOasis(addCount: number): void {
		let areas: Array<Area2D> = this.findInTerrain(LloydMapData.O_1);
		let randomIndex: number;
		let area: Area2D;
		let key: any;
		let needCount: number = addCount;
		while (needCount > 0 && areas.length > 0) {
			needCount--;
			randomIndex = Math.floor(Math.random() * areas.length);
			area = areas[randomIndex];
			areas.splice(randomIndex, 1);//删除防止重复设置为绿洲
			for (key in area.neighbor) {
				if (areas.indexOf(area.neighbor[key]) >= 0)
					areas.splice(areas.indexOf(area.neighbor[key]), 1);//删除防止周边被设置为绿洲
			}
			//两种地形设置各50%
			area.type = Math.random() >= 0.5 ? LloydMapData.O_2 : LloydMapData.O_3;
		}
		needCount = addCount;
		areas = this.findInTerrain(LloydMapData.W_2);
		while (needCount > 0 && areas.length > 0) {
			needCount--;
			randomIndex = Math.floor(Math.random() * areas.length);
			area = areas[randomIndex];
			areas.splice(randomIndex, 1);
			for (key in area.neighbor) {
				if (areas.indexOf(area.neighbor[key]) >= 0)
					areas.splice(areas.indexOf(area.neighbor[key]), 1);
			}
			area.type = Math.random() >= 0.5 ? LloydMapData.W_2 : LloydMapData.W_3;
		}
	}



	/**设定地形--根据海拔和湿度设置地形类型*/
	public buildLand(): void {
		let key: any;
		let area: Area2D;
		for (key in this._areas) {
			area = this._areas[key];
			if (area.isWater)
				continue;
			area.humidity = Math.round(area.humidity);//湿度取整
			let hbCount: number = 0;
			for (let i: number = 0; i < area.vertex.length; i++)
				hbCount += area.vertex[i].elevation;
			let ave: number = hbCount / area.vertex.length;//计算平均海拔
			if (ave > 30) {
				switch (area.humidity) {
					case 1: area.type = LloydMapData.F_1;
						break;
					case 2: area.type = LloydMapData.F_2;
						break;
					case 3: area.type = LloydMapData.F_3;
						break;
					default: area.type = LloydMapData.F_4;
						break;
				}
			}
			else if (ave > 20) {
				switch (area.humidity) {
					case 1: area.type = LloydMapData.T_1;
						break;
					case 2: area.type = LloydMapData.T_2;
						break;
					default: area.type = LloydMapData.T_3;
						break;
				}
			}
			else if (ave > 10) {
				switch (area.humidity) {
					case 1: area.type = LloydMapData.W_1;
						break;
					case 2: area.type = LloydMapData.W_2;
						break;
					case 3: area.type = LloydMapData.W_3;
						break;
					default: area.type = LloydMapData.W_4;
						break;
				}
			}
			else {
				switch (area.humidity) {
					case 1: area.type = LloydMapData.O_1;
						break;
					case 2: area.type = LloydMapData.O_2;
						break;
					case 3: area.type = LloydMapData.O_3;
						break;
					default: area.type = LloydMapData.O_4;
						break;
				}
			}
		}
	}


	/**
	 * 获取地图基础纹理
	 * @return 地图纹理图
	 * 地形类型对应相应的颜色
	 */
	public getMapBaseTexture(tsx: number = 800, tsy: number = 800): egret.Shape {
		//地图与数据x轴缩放
		let sx: number = tsx / this.sizeX;
		//地图与数据y轴缩放
		let sy: number = tsy / this.sizeY;

		let areaTotal: number = 0;
		let landCount: number = 0;
		let sp: egret.Shape = new egret.Shape();
		let area: Area2D;
		let key: any;
		for (key in this._areas) {
			area = this._areas[key];
			sp.graphics.lineStyle(2, area.type, 1, false);
			sp.graphics.beginFill(area.type, 1);
			sp.graphics.moveTo(Math.floor(area.vertex[0].x * sx), Math.floor(area.vertex[0].y * sy));
			for (let i: number = 1; i < area.vertex.length; i++)
				sp.graphics.lineTo(Math.floor(area.vertex[i].x * sx), Math.floor(area.vertex[i].y * sy));
			sp.graphics.lineTo(Math.floor(area.vertex[0].x * sx), Math.floor(area.vertex[0].y * sy));
			sp.graphics.endFill();
		}
		return sp;
	}


	public getRiverTexture(tsx: number = 800, tsy: number = 800): egret.Shape {



		var sx: number = tsx / this.sizeX;
		var sy: number = tsy / this.sizeY;
		var areaTotal: number = 0;
		var landCount: number = 0;

		let sp: egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0, 0.01);
		sp.graphics.drawRect(0, 0, tsx, tsy);
		sp.graphics.endFill();

		let area: Area2D;
		let key: any;
		let i: number;
		let rvP2d: AreaPoint;
		let river: River;
				for (key in this._rivers) {
			river = this._rivers[key];
			rvP2d = river.downsteams[0];
			sp.graphics.lineStyle(1, LloydMapData.LAKE, 1, true);
			sp.graphics.moveTo(river.startArea.centerPoint.x * sx, river.startArea.centerPoint.y * sy);
			for (i = 0; i < river.downsteams.length; i++) {
				sp.graphics.lineTo(river.downsteams[i].x * sx, river.downsteams[i].y * sy);
				if (river.downsteams[i].river > 1)
					sp.graphics.lineStyle(river.downsteams[i].river, LloydMapData.LAKE, 1, true);
				else
					sp.graphics.lineStyle(1, LloydMapData.LAKE, 1, true);
			}
		}
		return sp;
	}

	/**
	 * 获得出生点
	 * 在第一个湖泊的旁边一个随机位置 -- 地图中的位置
	 */
	public getBorn(): egret.Point {
		this.initGridDic();
		let lake: Lake = this._lakes[0];
		let key: any;
		let area: Area2D;
		for (key in lake.getAreas()) {
			area = this._areaDic.get(lake.getAreas()[key]);
			for (key in area.neighbor) {
				if (!area.neighbor[key].isWater)
					return new egret.Point(area.neighbor[key].centerPoint.x, area.neighbor[key].centerPoint.y);
			}
		}
		return null;
	}
}