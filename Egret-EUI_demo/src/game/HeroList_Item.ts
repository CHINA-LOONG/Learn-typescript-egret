class HeroList_Item extends eui.ItemRenderer {
	public ck_select: eui.CheckBox;
	public constructor() {
		super();
		this.skinName = "resource/game_skins/skins_item/heroItem.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplate, this);
	}

	private onComplate() {
		this.ck_select.addEventListener(eui.UIEvent.CHANGE, (e) => {
			this.data.isSelected = this.ck_select.selected;
		}, this);
	}

	protected dataChanged() {
		egret.log(this.data.name);
		this.ck_select.selected = this.data.isSelected;
	}
}