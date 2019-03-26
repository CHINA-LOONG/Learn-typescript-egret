class ProxyMgr {
	private static _ins: ProxyMgr;
	static get instance(): ProxyMgr {
		if (!this._ins)
			this._ins = new ProxyMgr();
		return this._ins;
	}

	private _moduleMap: Map<number, ModuleBase>;

	/**
	 * 初始化通讯模块
	 */
	public constructor() {
		ServerVirtual.build();
		this._moduleMap = new Map();
		this._moduleMap.set(ModuleType.USER,new UserModule(ModuleType.USER));
	}
	
	/**
	 * 向服务端发起请求
	 */
	public request(mt:number,pxy:number,msg:string=""):void{
		
		//在真实的有后端的情况是
		//1.进行封装
		//2.发送给服务端
		//-----------------下面是当前模拟的结果-------------
		this._moduleMap.get(mt).requestToServer(pxy,msg);
	}

	/**
	 * 服务端返回信息
	 */
	public response(mt:number,pxy:number,msg:string =""):void{
		this._moduleMap.get(mt).responseFromServer(pxy,msg);
	}
}