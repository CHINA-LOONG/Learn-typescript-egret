/**
 * 消息通知类型
 * 模块号+四位消息自增号 --每个对应数据结构
 */
class UpdateType {
    /**玩家历史数据返回 */
    public static USER_HISTORY_BACLL: number = 10001;
    /**自己的位置变化 */
    public static MAP_SELF_MOVE: number = 20001;
    /**互动对象发生变化 */
    public static MAP_OPT_CHANGE: number = 20002;
    /**加载进度设置 */
    public static MAIN_LOADING_SET: number = 9990001;

    /**绘制地图过程 */
    public static MAIN_LOADING_MAP: number = 9990002;
    /**绘制地图色值 */
    public static MAIN_LOADING_COLOR: number = 9990003;
}