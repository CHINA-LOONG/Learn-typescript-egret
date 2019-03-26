/**
 * 历史数据简装类
 */
class HistoryData {
	/**
	 * 是否有历史数据
	 */
	public hasData:boolean = false;
	public has:number = 0;

	public initHistoryData(obj:Object):void{
		this.hasData = (obj["has"] == 1);
	}
}