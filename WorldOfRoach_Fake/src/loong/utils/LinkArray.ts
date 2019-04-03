/**
 * 特殊的链表数组,可通过排序链表成员中的某个字段达到效果排序的效果
 * 为满足一些特殊需求,这里只排序从小到大.
 * 该数组主要用于实时排序,但大部分参与排序对象是静止不动的时候效果更佳
 * @author loong
 * @version 1.0
 */
class LinkArray {

	/**是否在添加元素的时候自动排序,只能通过buildLink来实现 */
	private _autoLink: boolean = false;
	/**排序字段 */
	private _sortArg: string;
	/**内部数组 */
	private _list: Array<ILink> = new Array<ILink>();
	/**开始 */
	private _start: ILink;
	/**结束 */
	private _end: ILink;
	/**遍历对象 */
	private _ite: ILink;


	/**
	 * 像link中添加一个对象
	 * @param 添加的元素 必须实现ILink
	 * @returns 添加的元素所在位置(排序后的)
	 */
	public put(ele: any): number {
		if (this._autoLink) {
			if (this._list.length == 0) {
				this._list.push(ele);
				return 0;
			}
			return this.insertEle(ele, 0, this._list.length);
		}
		else {
			this._list.push(ele);
			return this._list.length - 1;
		}
	}

	/**
	 * 将一个元素按照指定的规则插入到一个范围内
	 * @param sIndex
	 * @param eIndex
	 * @returns 插入元素后元素索引
	 */
	private insertEle(ele: any, sIndex: number, eIndex: number): number {
		if (sIndex != eIndex) {
			if (ele[this._sortArg] < this._list[sIndex][this._sortArg])				//取出排序字段的值小于开始元素，插入开始位置
				return this.insertEle(ele, sIndex, sIndex);
			else if (ele[this._sortArg] >= this._list[eIndex - 1][this._sortArg])	//取出排序字段的值大于结束元素，插入结束位置
				return this.insertEle(ele, eIndex, eIndex);
			else {
				let cutIndex: number = Math.floor((eIndex - sIndex) / 2) + sIndex;	//二分法获取中间元素索引
				if (ele[this._sortArg] <= this._list[cutIndex][this._sortArg])
					return this.insertEle(ele, sIndex, cutIndex);
				else
					return this.insertEle(ele, cutIndex, eIndex);
			}
		}
		else {
			let len: number = this._list.length;
			this._list.splice(sIndex, 0, ele);	//在确定的位置插入元素
			if (sIndex == 0)						//加在开头
			{
				this._start = ele;				//设置起始元素
				if (this._list.length > sIndex + 1)	//链接新插入元素
				{
					this._list[sIndex].setNext(this._list[sIndex + 1]);
					this._list[sIndex + 1].setPre(this._list[sIndex]);
				}
			}
			else if (sIndex >= len)				//加在末尾
			{
				this._end = ele;
				this._list[sIndex].setPre(this._list[sIndex - 1]);
				this._list[sIndex - 1].setNext(this._list[sIndex]);
			}
			else								//加在中间
			{
				this._list[sIndex - 1].setNext(this._list[sIndex]);
				this._list[sIndex].setPre(this._list[sIndex - 1]);
				this._list[sIndex].setNext(this._list[sIndex + 1]);
				this._list[sIndex + 1].setPre(this._list[sIndex]);
			}
			return sIndex;
		}
	}

}