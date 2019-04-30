/**
 * 世界构造器
 * 一个随机形状的地图，在构造地图的过程中不能将游戏主显示线程卡死。这个可以后期再做处理
 */
class WorldMakerManager implements IRender {

	private static _ins: WorldMakerManager;
	public static get instance(): WorldMakerManager {
		if (WorldMakerManager._ins == null)
			WorldMakerManager._ins = new WorldMakerManager();
		return WorldMakerManager._ins;
	}


	private _sizeW: number = 800;
	private _sizeH: number = 800;

	//开始创建地图,缺少异常处理
	//?如何创造一个看上去很自然的海岸线呢？
	//?需要设计一个线程接口来实现异步的运算?
	/**开始创建地图 */
	public createWorld(): void {
		//设置加载界面的文案
		GameManager.instance.setMainLoadingInfo(LanguageData.instance.getLang(10001));
		//每个x一个元素，每个y一个元素
		let points: Array<number> = RandomUtil.getRandomPoints(this._sizeW, this._sizeH, 10, 1000);
		//构建地图生成类
		let lloy: LloydUtil = new LloydUtil(points, this._sizeH, this._sizeW);
		//构造三角形图
		lloy.delaunay();
		//算出多边形图
		lloy.voronoi();

		// GameManager.instance.setMainLoadinglloy(lloy);
		//三角形优化算法
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		lloy.optimization();
		// GameManager.instance.setMainLoadinglloy(lloy);

		//构建柏林噪声数据
		let nosis: any = PerlinNoiseUtil.noise2D(500, 500);
		//初始化地图数据
		GameData.mapData.initData(lloy.Polgons, this._sizeW, this._sizeH);
		//优化海岸线--通过噪声数据划分区块功能
		GameData.mapData.adjustCoast(0.58, nosis);
		//初始化区域--构建多边形区域点网和区域网
		GameData.mapData.initArea();
		//检测地形 -- 区分海洋湖泊，构建湖泊
		GameData.mapData.checkTerrain();
		//修正湖泊
		GameData.mapData.amendLake(6, 8);
		//检查陆地?区分大陆块和岛屿
		//修正岛屿?如果有业务的需要才需要修正岛屿
		//创建海拔图（每快陆地都应该有自己的海拔）
		GameData.mapData.initAltitude(5, 8, 2);
		//创建河流
		GameData.mapData.initRiver(1, 1, 5, 8, 10);
		//修正湿度--降水量
		GameData.mapData.initHumidity();
		//修正地图的地形为最终地形
		GameData.mapData.buildLand();
		//增加绿洲
		GameData.mapData.amendOasis(3);//增加绿洲
		//------------下面是业务部分-----------
		//设置玩家的出生坐标--地图中的坐标
		let bornPoint = GameData.mapData.getBorn();
		GameData.playerData.posX = bornPoint.x;
		GameData.playerData.posY = bornPoint.y;

		//序列号地图数据
		let baseMap:string = JSON.stringify(GameData.mapData.getDb());
		//将当前地图数据写入到本地
		localStorage.setItem(Server_Map.T_MAP_BASE,baseMap);
		//初始化植被数据
		GameData.plantData.resetConfig();
		this.drawTr(true);
		//创建迷雾
		FogForGrid.instance.init(this._sizeW,this._sizeH);
	}

	/**绘制地图-河流信息图片
	 * 
	 */
	private drawTr(debug:boolean=false):void{
		let map:egret.Shape = GameData.mapData.getMapBaseTexture(800,800);
		let ttr:egret.RenderTexture = new egret.RenderTexture();
		ttr.drawToTexture(map);
		GameData.mapData.baseMap = ttr;
		let river:egret.Shape = GameData.mapData.getRiverTexture(800,800);
		ttr.drawToTexture(river);
		GameData.mapData.riverMap = ttr;
		if(debug){
			WindowsMgr.instance.gameStage().addChild(map);
			if(GameConfig.showRiver)
				WindowsMgr.instance.gameStage().addChild(river);
		}
	}

	public rebuildWorld(str:string):void{
		//加载地图json数据
		GameData.mapData.build(JSON.parse(str));
		//绘制地图randertexture
		this.drawTr();
		//加载迷雾
		FogForGrid.instance.rebuild(this._sizeW,this._sizeH);
	}

	/**
	 * 刷新函数
	 */
	public renderUpdate(interval:number):void
	{
		
	}
}