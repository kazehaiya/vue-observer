import observe from './observe';

/**
 * Vue
 *
 * @class Vue
 */
export default class Vue {
  /**
   * Creates an instance of Vue.
   *
   * @param {Object} options
   * @memberof Vue
   */
  constructor(options) {
    // 获取 data 对象
    const { data = {} } = options;
    const vm = this;
    // 将 data 挂载到 vm 上
    vm._data = data;
    // watcher 数组
    vm._watchers = [];
    /**
     * 源码在此处进行对 props 和 methods 的 key 值判断
     * 禁止 data 内部声明的属性 key 值与它们冲突
     */
    // 添加 observe
    observe(data);
    // 以下处理对 options 上的 watch 方法
  }
}
