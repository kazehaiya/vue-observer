import observe from './observe';
import Watcher from './watcher';

function watcherCallBack(value) {
  console.log(`内容更新啦！新值为：'${value}'`);
}

/**
 * Vue
 *
 * @class Vue
 */
export default class Vue {
  constructor(options) {
    // 获取 data 对象
    const { data = {} } = options;
    const vm = this;
    // 将 data 挂载到 vm 上
    vm._data = data;
    /**
     * 源码在此处进行对 props 和 methods 的 key 值判断
     * 禁止 data 内部声明的属性 key 值与它们冲突
     */
    // initData，添加 observe
    observe(data);
    /**
     * 源码在此处进行对 computed 和 watch 钩子进行初始化
     */
    // 模拟 watcher 监听 name 值变动
    new Watcher(vm, 'name', watcherCallBack);
  }
}
