class UserModule extends ModuleBase {
	public constructor(id: number) {
		super(id);
		this.registHandler(ProxyType.USER_GETHISTORY,this.userHistoryHandler);
	}

	/**
	 * 网络请求返回处理
	 * 数据处理
	 * 界面更新
	 */
	private userHistoryHandler(type: number, msg: string): string {
		if (type == UserModule.TYPE_RQ)
			return msg;
		else {
			let obj:Object = JSON.parse(msg);
			GameData.historyData.initHistoryData(obj);
			WindowsMgr.instance.updateWindow(UpdateType.USER_HISTORY_BACLL,[WindowType.START_WINDOW],null);
		}
		return  null;
	}

}