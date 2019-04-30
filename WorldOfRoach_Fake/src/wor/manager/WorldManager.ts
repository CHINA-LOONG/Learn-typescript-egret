/**
 * 世界与场景相关的逻辑类
 * @author loong
 * @version 1.0
 */
class WorldManager {
	private static _ins: WorldManager;
	public static get instance(): WorldManager {
		if (WorldManager._ins == null)
			WorldManager._ins = new WorldManager();
		return WorldManager._ins;
	}
	
	/**当前与主角互动的 */
	public focusOptionRole: IRole = null;//当前与主角互动的

	
	/**设置当前与操作对象互动的对象 */
	public setOptionRole(role: IRole): void {
		if (role != this.focusOptionRole) {
			this.focusOptionRole = role;
			//通知界面更新
			WindowsMgr.instance.updateWindow(UpdateType.MAP_OPT_CHANGE, [WindowType.CURB_BAR]);
		}
	}

}