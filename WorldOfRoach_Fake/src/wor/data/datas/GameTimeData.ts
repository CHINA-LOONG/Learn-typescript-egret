/**
 * 游戏时间类
 */
class GameTimeData implements IRender { 

	public static PM: string = "PM";
	public static AM: string = "AM";


	private _costT: number = 0;
	/**游戏时长 天 */
	public day: number = 0;
	/**游戏时长 时 */
	public hour: number = 0;
	/**游戏时长 分 */
	public min: number = 0;
	/**是AM或PM */
	public pd: string = "";
	/**是否是夜晚 */
	public isLight:boolean = false;

	public constructor() {
	}


	public play():void{
		this.synGameTime();
		RenderMgr.instance.registRender(this);
	}
	/**同步游戏时间 */
	private synGameTime():void{
		this.min = GameData.playerData.time%60;
		this.hour = Math.trunc(GameData.playerData.time/60)%24;
		this.day = Math.trunc(GameData.playerData.time/(60*24));
		this.day += 1;//从第一天开始计时
		this.pd = this.hour<12?GameTimeData.AM:GameTimeData.PM;
		this.isLight = this.hour>=20||this.hour<6;
	}
	
	/**刷新游戏时间 */
	public renderUpdate(interval: number): void {
		this._costT +=interval;
		//循环每秒的时间计时
		if(this._costT>=GameConfig.game_time_t_my){
			this._costT = this._costT - GameConfig.game_time_t_my;
			GameData.playerData.time+=1;
			this.synGameTime();
		}
	}
}