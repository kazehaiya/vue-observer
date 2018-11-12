import Dep from './dep';

export default class Watcher {
  constructor(vm, obj, key) {
    this.vm = vm;
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }

  /**
   * 添加 Dep
   *
   * @param {Dep} dep
   * @memberof Watcher
   */
  addDep(dep) {
    dep.addSub(this);
  }

  /**
   * 触发更新 DOM
   *
   * @memberof Watcher
   */
  update() {
    console.log('内容更新啦！');
    // 获得新值
    this.value = this.obj[this.key];
  }
}
