/**
 * 地板接口
 * @author loong
 * @version 1.0
 */
interface IFloor {
	/**创建当前地板 */
	createFloor(p:egret.DisplayObjectContainer,px:number,py:number):void;
	/**移除当前地板 */
	removeFloor():IFloor;
	/**获取当前地板的类型 */
	getType():number;
	/**当前焦点对象站上时调用 */
	standOn():void;
}