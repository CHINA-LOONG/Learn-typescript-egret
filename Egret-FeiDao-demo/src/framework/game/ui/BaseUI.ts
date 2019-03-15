class BaseUI extends eui.Component {
	public constructor(skinname) {
		super();
		this.skinName = skinname;
	}

	protected img_bg: eui.Image;
	protected rect_bg: eui.Rect;

	protected args: any;

	public logic:any;
	public inited:boolean;


	protected childrenCreated() {
		super.childrenCreated();
		
		this.checkFit();
		this.initData();
		this.initView();
		this.initEvent();

		if(this.logic != null){
			this.logic.init();
		}
		this.inited = true;
	}

	/**适配处理 */
	protected checkFit() {
		this.height = GameData.stageHeight;
		if (this.img_bg != null) {
			this.img_bg.height = GameData.stageHeight;
		}
		if (this.rect_bg != null) {
			this.rect_bg.height = GameData.stageHeight;
		}
	}

	/**初始化数据 */
	protected initData() {

	}

	/**初始化界面 */
	protected initView() {

	}

	/**初始化事件 */
	protected initEvent() {
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
	}

	protected clearEvent() {
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
	}

	protected clear() {
		this.clearEvent();
		if(this.logic != null){
			this.logic.clear();
		}
		this.logic = null;
	}

	protected close() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}
}