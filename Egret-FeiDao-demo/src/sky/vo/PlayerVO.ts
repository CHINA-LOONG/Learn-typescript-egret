class PlayerVO implements IPool {
	public constructor() {
		
	}

	public id:number;

	public name:string;
	
	public bg_id:string;

	public skinvo:SkinVO;
	/** 飞刀的数量 */
	public knife_num:number = 0;

	public circleRadius:number;
	
	public radius:number;

	public eatRadius:number;

	/** 离圆心的距离 */
	public dis_from_circle:number = 64;
	/** 飞刀转的速度 */
	public turn_speed:number;

	public move_speed:number;

	public direction:number = 0;

	public isdefence:boolean;


	public clear() {
		this.skinvo = null;
	}

	public reset() {
		this.skinvo = null;
	}

	public destroy() {

	}
}

window['PlayerVO'] = PlayerVO;