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
			//插入 前一个点连线与边界的交点
			p1 = this.getIntersect(w, h, delList[0], this.getPrePoint(delList[0]));
			pIndex = this.vertex.indexOf(this.getPrePoint(delList[0]));//插在前一个点的后面+
			this.vertex.splice(pIndex + 1, 0, p1);
			//插入 后一个点连线与边界的交点
			p2 = this.getIntersect(w, h, delList[0], this.getNextPoint(delList[0]));
			nIndex = this.vertex.indexOf(this.getNextPoint(delList[0]));//插在后一个点的前面
			this.vertex.splice(nIndex - 1, 0, p2);

			while (delList.length > 0) {
				point = delList.pop();
				this.vertex.splice(this.vertex.indexOf(point), 1);
			}
		} else if (outsideCount == 2) {
			if (!this.isOutside(w, h, this.getPrePoint(delList[0]))) 			//前一个点不在外部  [0]-(d0-1)(d1-2)-[3]
			{
				//删除点为[当前点]和[当前点的后一个点]
				if (!this.isOutside(w, h, this.getNextPoint(delList[0])))
					LogTrace.log("数据异常：存在超过2个点在裁切以后外框以外的多边形");
				//取前一个删除点和更前一个点的边界交点，替换删除点
				p1 = this.getIntersect(w, h, delList[0], this.getPrePoint(delList[0]));
				pIndex = this.vertex.indexOf(delList[0]);
				this.vertex[pIndex] = p1;
				//取后一个删除点和更后一个点的边界交点，替换删除点
				p2 = this.getIntersect(w, h, delList[1], this.getNextPoint(delList[1]));
				nIndex = this.vertex.indexOf(delList[1]);
				this.vertex[nIndex] = p2;
			}
			else 																//后一个点不在外部	[0]-(d1-1)(d0-2)-[3]
			{
				//删除点为[当前点]和[当前点的前一个点]
				if (!this.isOutside(w, h, this.getPrePoint(delList[0])))
					LogTrace.log("数据异常：存在超过2个点在裁切以后外框以外的多边形");
				p1 = this.getIntersect(w, h, delList[0], this.getNextPoint(delList[0]));
				pIndex = this.vertex.indexOf(delList[0]);
				this.vertex[pIndex] = p1;
				p2 = this.getIntersect(w, h, delList[1], this.getPrePoint(delList[1]));
				nIndex = this.vertex.indexOf(delList[1]);
				this.vertex[nIndex] = p2;
			}
			
			let list:Array<Object> = [];
			let key:any;
			for(key in list){
				let ele = list[key];
			}
			for(key in list){
				var ele=list[key];
			}

			//------------------检查是否同边-------------------
			if(p1.x == p2.x||p1.y == p2.y){
				return;
			}
			let px:number = 0;
			let py:
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
		//坐标系左上为原点  
		/**
		 *  ● │   │ ●
		 * ───┼───┼───
		 *    │   │   
		 * ───┼───┼───
		 *  ● │   │ ●
		 */
		if ((fromP.x < 0 || fromP.x > w) && (fromP.y < 0 || fromP.y > h)) {
			//根据比值计算交点
			let xbz: number;	//x的偏移比值
			let ybz: number;	//y的偏移比值
			if (fromP.y < 0) {	//左侧
				ybz = (toP.y - fromP.y) / toP.y;
				if (fromP.x < 0)	//左上
					xbz = (toP.x - fromP.x) / toP.x;
				else				//左下
					xbz = (fromP.x - toP.x) / (w - toP.x);
			}
			else {				//右侧
				ybz = (fromP.y - toP.y) / (h - toP.y);
				if (fromP.x < 0)	//右上
					xbz = (toP.x - fromP.x) / toP.x;
				else				//右下
					xbz = (fromP.x - toP.x) / (w - toP.x);
			}
			if (xbz > ybz) //交点在左边
			{
				if (fromP.x < 0) {
					dis1 = toP.x - fromP.x;
					dis2 = toP.x;
				}
				else {
					dis1 = fromP.x - toP.x;
					dis2 = w - toP.x;
				}
			}
			else {
				if (fromP.y < 0) {
					dis1 = toP.y - fromP.y;
					dis2 = toP.y;
				}
				else {
					dis1 = fromP.y - toP.y;
					dis2 = h - toP.y;
				}
			}
		}
		/**
		 *    │   │ 
		 * ───┼───┼───
		 *  ● │   │ ● 
		 * ───┼───┼───
		 *    │   │ 
		 */
		else if (fromP.x < 0 || fromP.x > w) {
			if (fromP.x < 0) {
				dis1 = toP.x - fromP.x;
				dis2 = toP.x;
			}
			else {
				dis1 = fromP.x - toP.x;
				dis2 = w - toP.x;
			}
		}
		/**
		 *    │ ● │ 
		 * ───┼───┼───
		 *    │   │   
		 * ───┼───┼───
		 *    │ ● │ 
		 */
		else {
			if (fromP.y < 0) {
				dis1 = toP.y - fromP.y;
				dis2 = toP.y;
			}
			else {
				dis1 = fromP.y - toP.y;
				dis2 = h - toP.y;
			}
		}
		let p: egret.Point = egret.Point.interpolate(fromP, toP, dis2 / dis1);
		//对点的位置坐一个近似取整，防止浮点型计算把一个点计算成多个
		if (Math.abs(p.x) < 2)
			p.x = 0;
		else if (Math.abs(w - p.x) < 2)
			p.x = w;
		if (Math.abs(p.y) < 2)
			p.y = 0;
		else if (Math.abs(p.y - h) < 2)
			p.y = h;
		return new Point2D(p.x, p.y);
	}
}