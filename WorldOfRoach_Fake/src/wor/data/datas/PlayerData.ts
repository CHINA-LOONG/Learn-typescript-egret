/**
 * 角色信息
 */
class PlayerData {
	public id: number;
	/**玩家名字 */
	public name: string;
	/**角色在地图中的坐标X */
	public posX: number;
	/**角色在地图中的坐标Y */
	public posY: number;
	/**生命值 */
	public hp: number = 0;
	/**饥饿值 */
	public full: number = 0;
	/**运气值 */
	public lk: number = 0;
	/**最大生命 */
	public hpMax: number = 0;
	/**最大饥饿 */
	public fullMax: number = 0;
	/**最大幸运 */
	public lkMax: number = 0;
	public time: number = 0;//时间
}