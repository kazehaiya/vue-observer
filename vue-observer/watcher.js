import Dep from './dep';

export default class Watcher {
  /**
   * Creates an instance of Watcher.
   * @param {Vue} vm                  对应的 Vue 组件
   * @param {String} key              更新的 key
   * @param {Function} cb             触发的回调方法
   * @memberof Watcher
   */
  constructor(vm, key, cb) {
    const obj = vm._data;
    this.vm = vm;
    // 将 Dep.target 指向自己
    Dep.target = this;
    // 获取该实例的 data 属性以及 watch 到的键值
    this.obj = obj;
    this.key = key;
    // 获取回调方法（订阅者函数）
    this.cb = cb;
    // 触发 observe 里面的 getter 方法
    this.value = obj[key];
    // 回收依赖，以免多余的调用（update 方法的调用会触发 getter）
    Dep.target = null;
  }

  /**
   * 将本 watcher 添加到管家 Dep 中
   *
   * @param {Dep} dep
   * @memberof Watcher
   */
  addDep(dep) {
    dep.addSub(this);
  }

  /**
   * setter 后，触发更新 DOM
   *
   * @memberof Watcher
   */
  update() {
    // 获取 setter 的新值，将新值反馈给订阅者
    // constructor 如果最后没有回收依赖且 setter 内没有进行传入值得判断
    // 此处会发生死循环的情况（此处触发了 getter 但已经没有 Dep.target 对象了）
    const newVal = this.obj[this.key];
    this.value = newVal;
    // 触发 DOM 更新
    this.cb(newVal);
  }
}
