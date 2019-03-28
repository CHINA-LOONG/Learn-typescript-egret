class Pol2D {

	public centerPoint: Point2D;
	public vertex: Array<Point2D>;
	public isos: boolean = false;

	public constructor(points: Array<Point2D>) {
		this.vertex = points;
	}

	public cutself(w: number, h: number): void {
		let key: any;
		let point: Point2D;
		/**准备删除的点列表 */
		let delList: Array<Point2D> = [];
		for (key in this.vertex) {
			point = this.vertex[key];
			//检测顶点是否在地图外侧
			if (this.isOutside(w, h, point)) {
				if (this.isOutside(w, h, this.getPrePoint(point)) && this.isOutside(w, h, this.getNextPoint(point)))
					delList.push(point);
			}
		}
		while (delList.length > 0) {
			point = delList.pop();
			this.vertex.splice(this.vertex.indexOf(point), 1);
		}
		let outsideCount: number = 0;
		for (key in this.vertex) {
			point = this.vertex[key];
			if (this.isOutside(w, h, point)) {
				delList.push(point);
				outsideCount++;
			}
		}
		if (outsideCount == 0) {
			return;
		}
		this.isos = outsideCount > 0;
		if (outsideCount > 2) {
			LogTrace.log("数据异常：存在超过2个点在裁切以后外框以外的多边形");
		}
		let p1: Point2D;
		let p2: Point2D;
		let pIndex: number;
		let nIndex: number;
		if (outsideCount == 1) {
			p1 = this.getIntersect(w,h,delList[0],this.getPrePoint(delList[0]));
			
		}
	}

	/**
	 * 是否在边界外
	 * @param w
	 * @param h
	 * @param target
	 * @return
	 */
	private isOutside(w: number, h: number, target: Point2D): boolean {
		return target.x < 0 || target.y < 0 || target.x > w || target.y > h;
	}


	/**
	 * 获取他的上一个
	 * @param target
	 * @return
	 */
	public getPrePoint(target: Point2D): Point2D {
		let returnPoint: Point2D;
		let index: number = this.vertex.indexOf(target);
		if (index < 0) {
			return null;
		}
		if (index == 0) {
			returnPoint = this.vertex[this.vertex.length - 1];
		}
		else {
			returnPoint = this.vertex[index - 1];
		}
		if (returnPoint == target) {
			LogTrace.log("数据异常：这个四边形只有两个点");
		}
		return returnPoint;
	}

	/**
	 * 获取他的下一个点
	 * @param target
	 * @return
	 */
	public getNextPoint(target: Point2D): Point2D {
		var returnPoint: Point2D;
		var index: number = this.vertex.indexOf(target);
		if (index < 0)
			return null;
		if (index == this.vertex.length - 1)
			returnPoint = this.vertex[0];
		else
			returnPoint = this.vertex[index + 1];
		if (returnPoint == target)
			LogTrace.log("数据异常：这个四边形只有两个点");
		return returnPoint;
	}
	/**
	 * 获取一个和外边框相交的点
	 * @param w
	 * @param h
	 * @param fromP 在框外的点
	 * @param toP 在框内的点
	 * @return
	 */
	private getIntersect(w: number, h: number, fromP: Point2D, toP: Point2D): Point2D {
		let dis1: number;
		let dis2: number;
		if ((fromP.x < 0 || fromP.x > w) && (fromP.y < 0 || fromP.y > h)) {
			let xbz: number;
			let ybz: number;
			if (fromP.y < 0) {
				ybz = (toP.y - fromP.y) / toP.y;
				if (fromP.x < 0)
					xbz = (toP.x - fromP.x) / toP.x;
				else
					xbz = (fromP.x - toP.x) / (w - toP.x);
			}
			else {
				ybz = (fromP.y - toP.y) / (h - toP.y);
				if (fromP.x < 0)
					xbz = (toP.x - fromP.x) / toP.x;
				else
					xbz = (fromP.x - toP.x) / (w - toP.x);
			}
			if (xbz > ybz) {

			}
			else {

			}
		}

		return null;
	}
}