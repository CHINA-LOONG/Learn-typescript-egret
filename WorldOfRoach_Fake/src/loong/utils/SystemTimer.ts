/**
 * 系统时间
 * @author loong
 * @version 1.0
 */
class SystemTimer {
	private static _startTime: number;
	public static init(): void {
		SystemTimer._startTime = new Date().getTime();
	}

	public static getTime(): number {
		return new Date().getTime() - SystemTimer._startTime;
	}
}