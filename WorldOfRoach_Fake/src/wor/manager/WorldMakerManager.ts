/**
 * 世界构造器
 * 一个随机形状的地图，在构造地图的过程中不能将游戏主显示线程卡死。这个可以后期再做处理
 */
class WorldMakerManager {

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
	public createWorld(): void {
		GameManager.instance.setMainLoadingInfo(LanguageData.instance.getLang(10001));
		//每个x一个元素，每个y一个元素
		let points: Array<number> = RandomUtil.getRandomPoints(this._sizeW, this._sizeH, 1, 10);
		let lloy: LloydUtil = new LloydUtil(points, this._sizeH, this._sizeW);

		lloy.delaunay();
		lloy.voronoi();


		//------------下面是业务部分-----------
		//设置玩家的出生坐标
		let bornPoint = GameData.mapData.getBorn();
		GameData.playerData.posX = bornPoint.x;
		GameData.playerData.posY = bornPoint.y;
	}

}