/**游戏存档管理器 */
class SaveManager {
	private static _ins: SaveManager;

	//获取单例
	public static get instance(): SaveManager {
		if (!SaveManager._ins)
			SaveManager._ins = new SaveManager();
		return SaveManager._ins;
	}


	/**存指定的植物大区区域 */
	public savePlants(key: string, jsonStr: string): void {
		localStorage.setItem(Server_Map.T_MAP_PLANTS + key, jsonStr);
	}
}