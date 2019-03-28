class MainLoaderWindow extends GameWindow {

	private _bgShape: egret.Shape;
	public message: eui.Label;

	public constructor() {
		super();
		this.layerType = LayerType.LAYER_POP;
		this.typeName = WindowType.MAIN_LOADING;
	}


	protected childrenCreated(): void {
		this._bgShape = new egret.Shape();
		this._bgShape.graphics.beginFill(0x000000, 1);
		this._bgShape.graphics.drawRect(0, 0, 1, 1);
		this._bgShape.graphics.endFill();
		this.addChildAt(this._bgShape, 0);
		super.childrenCreated();
		this.message.visible = false;
	}

	public resize(): void {
		super.resize();
		if (this._bgShape == null)
			return;
		this._bgShape.scaleX = WindowsMgr.stageWidth;
		this._bgShape.scaleY = WindowsMgr.stageHeight;
	}

	/**
     * 捕获到对应的通知
     */
	public update(updateType: number, updateObject: any): void {
		switch (updateType) {
			case UpdateType.MAIN_LOADING_SET:
				this.message.text = updateObject;
				break;
			case UpdateType.MAIN_LOADING_MAP:
				this.updateDrawMap(updateObject as LloydUtil);
				break;
		}
	}

	private updateDrawMap(lloy: LloydUtil): void {
		if (!lloy)
			return;
		this.drawBackground();
		this.drawMap(lloy);

		this.drawTriangle(lloy);
		this.drawPolgon(lloy);
	}

	private _drawBG: egret.Shape;
	private drawBackground() {
		if (!this._drawBG) {
			this._drawBG = new egret.Shape();
		}
		this._drawBG.graphics.clear();
		let bg = this._drawBG;

		bg.graphics.beginFill(0xffffff, 1);
		bg.graphics.drawRect(0, 0, WindowsMgr.stageWidth, WindowsMgr.stageHeight);
		bg.graphics.endFill();

		this.addChild(bg);
	}

	private _drawMap: egret.Shape;
	private drawMap(lloy: LloydUtil) {
		if (!this._drawMap) {
			this._drawMap = new egret.Shape();
		}
		this._drawMap.graphics.clear();
		let map = this._drawMap;

		let point = this.rePoint(new Point2D(0, 0));
		map.graphics.beginFill(0x0000ff, 0.2);
		map.graphics.drawRect(point.x, point.y, this.reDistance(800), this.reDistance(800));
		map.graphics.endFill();

		this.addChild(map);
	}

	private _drawTri: egret.Shape;
	private drawTriangle(lloy: LloydUtil) {
		if (!this._drawTri) {
			this._drawTri = new egret.Shape();
		}
		this._drawTri.graphics.clear();
		let line = this._drawTri;

		let key: any;
		let tri: Tri2D;
		line.graphics.lineStyle(1, 0xff0000);

		let drawList: Array<Edge2D> = new Array<Edge2D>();
		let edge: Edge2D;
		for (key in lloy.tris) {
			tri = lloy.tris[key];
			for (let i = 0; i < tri.edges.length; i++) {
				edge = tri.edges[i];
				if (drawList.indexOf(edge) < 0) {
					drawList.push(edge);
					let p1 = this.rePoint(edge.startPoint);
					let p2 = this.rePoint(edge.endPoint);
					line.graphics.moveTo(p1.x, p1.y);
					line.graphics.lineTo(p2.x, p2.y);
				}
			}

		}
		this.addChild(line);
	}

	private _drawPol: egret.Shape;
	private drawPolgon(lloy: LloydUtil) {
		if (!this._drawPol) {
			this._drawPol = new egret.Shape();
		}
		this._drawPol.graphics.clear();
		let line = this._drawPol;

		let key: any;
		let pol: Pol2D;
		line.graphics.lineStyle(1, 0x00ff00);
		for (key in lloy.polgons) {
			pol = lloy.polgons[key];
			let start = pol.vertex[0];
			let p1 = this.rePoint(start);
			line.graphics.moveTo(p1.x, p1.y);
			let temp = pol.getNextPoint(start);
			while (start != temp) {
				let p2 = this.rePoint(temp);
				line.graphics.lineTo(p2.x, p2.y);
				temp = pol.getNextPoint(temp);
			}
			line.graphics.lineTo(p1.x, p1.y);

			// for (let i = 1; i < pol.vertex.length; i++) {
			// 	let p2 = this.rePoint(pol.vertex[i]);
			// 	line.graphics.lineTo(p2.x, p2.y);
			// }
		}
		this.addChild(line);
	}


	private rePoint(p: Point2D): egret.Point {
		let returnP: egret.Point = new egret.Point(p.x / 20 + this.stage.stageWidth / 2, p.y / 20 + this.stage.stageHeight / 2);
		return returnP;
	}
	private reDistance(d: number): number {
		return d / 20;
	}
}