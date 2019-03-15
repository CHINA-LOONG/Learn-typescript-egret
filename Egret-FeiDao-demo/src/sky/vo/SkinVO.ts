class SkinVO {
	public constructor() {
	}

	public id:number;

	/** 0免费 1看视频解锁 2邀请好友解锁 */
	public type:number;
	/** 不免费的需要的最大次数 */
	public max:number;
	/** 当前次数 */
	public crtValue:number;

	/** 0已解锁 1未解锁 */
	public state:number;
}