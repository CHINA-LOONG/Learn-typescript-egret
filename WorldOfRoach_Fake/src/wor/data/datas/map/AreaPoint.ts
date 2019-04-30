class AreaPoint extends egret.Point {

	/**顶点Id */
	public id: number = 0;
	/**相邻区域列表 */
	public nears: Array<AreaPoint> = [];//相邻的点
	/**此点区域列表 */
	public areas: Array<number> = [];//所属区域ID
	/**默认海拔 */
	public elevation: number = 10;//默认海拔
	public sorted: boolean = false;
	public river: number = 0;

	public constructor(tx: number = 0, ty: number = 0) {
		super(tx, ty);
	}
	/**
	 * 寻找下游
	 * 从小到大进行排序 --返回非河流中海拔最低的顶点
	 */
	public static findDownstream(p2d: AreaPoint, river: River): AreaPoint {
		if (!p2d.sorted) {
			p2d.sorted = true;
			//临点进行排序  小-->大
			p2d.nears.sort(function (a: AreaPoint, b: AreaPoint): number {
				if (a.elevation > b.elevation) return 1;
				else if (a.elevation == b.elevation) return 0;
				else return -1;
			});
		}
		//优先返回海拔低的顶点
		for (let i: number = 0; i < p2d.nears.length; i++) {
			//河流中不包含这个点
			if (river.downsteams.indexOf(p2d.nears[i]) < 0)
				return p2d.nears[i];
		}
		return null;
	}

}