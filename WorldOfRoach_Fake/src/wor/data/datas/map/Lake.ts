/**
 * 湖泊
 */
class Lake {

	private static ccId: number = 0;
	/**湖泊ID */
	public id: number;
	/**湖泊包含区域 */
	private _areas: Array<number> = new Array<number>();

	public constructor() {
		Lake.ccId++;
		this.id = Lake.ccId;
	}

	/**添加一个区域ID */
	public addArea(areaId: number): void {
		if (this._areas.indexOf(areaId) < 0)
			this._areas.push(areaId);
	}
	
	 /**获取湖泊包含的区域 */
	public getAreas(): Array<number> {
		return this._areas;
	}

	public checkSefl(): void {
		LogTrace.log("LakeID=" + this.id + " AreaCount=" + this._areas.length);
	}
}