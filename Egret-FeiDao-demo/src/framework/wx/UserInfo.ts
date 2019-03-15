/**
 * 用户信息
 * 
 */
class UserInfo {
	public constructor() {
	}

	/** ----------------------------------------------  微信用户信息  ------------------------------------------------------- */

	public avatarUrl: string;
	public city: string;
	public country: string;
	/** 性别 1男 */
	public gender: number;
	public language: string;
	public nickname: string;
	public province: string;

	/** 是否授权 */
	public auth:boolean = false;
	public token:string;
}