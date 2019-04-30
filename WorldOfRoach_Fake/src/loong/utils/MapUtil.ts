/**
 * 地图相关算法
 * @author loong
 * @version 1.0
 */
class MapUtil {



	/**通过格子的编号获取格子中点坐标 */
	public static getPosByGrid(px: number, py: number): egret.Point {
		let p: egret.Point = new egret.Point();
		if (py % 2 == 0) {
			p.x = px * GameConfig.GRID_W;
			p.y = py / 2 * GameConfig.GRID_H;
		}
		else {
			p.x = px * TiledFloorBase.GW + GameConfig.GRID_W / 2;
			p.y = (py - 1) / 2 * TiledFloorBase.GH + GameConfig.GRID_H / 2;
		}
		return p;
	}

	/**根据像素值获取当前房间自查区域所在的xy */
	public static getRoomPosByPosition(px: number, py: number): egret.Point {
		let p: egret.Point = new egret.Point();
		p.x = Math.floor(px / GameConfig.ROOM_CHECK_W);
		p.y = Math.floor(py / GameConfig.ROOM_CHECK_H);
		return p;
	}
}