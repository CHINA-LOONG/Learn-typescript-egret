class SkinLogic {
	public constructor() {
	}

	private static instance: SkinLogic;
    public static getInstance(): SkinLogic {
        if (this.instance == null) {
            this.instance = new SkinLogic();
        }
        return this.instance;
    }


	private skins:Map<SkinVO>;

	public initSkinData(){
		this.skins = {};
		let data = RES.getRes("data_json");
		for(let key in data){
			let o = data[key];
			let vo = new SkinVO();
			vo.id = parseInt(o.id);
			vo.type = parseInt(o.type);
			vo.max = parseInt(o.max);
			vo.state = SKINSTATE.UNLOCK;
			this.skins[vo.id] = vo;
		}
	}

	public getSkinVOByID(id:number):SkinVO{
		return this.skins[id];
	}
}