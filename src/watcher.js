import Dep from './dep';

export default class Watcher {
  /**
   * Creates an instance of Watcher.
   * @param {Vue} vm                  对应的 Vue 组件
   * @param {Object | Function} obj   组件的 data 对象/函数
   * @param {String} key              更新的 key
   * @memberof Watcher
   */
  constructor(vm, obj, key) {
    this.vm = vm;
    // 向 watcher 数组内新增一个 watcher
    vm._watchers.push(this);
    // 将 Dep.target 指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将 Dep.target 置空
    Dep.target = this;
    this.obj = obj;
    this.key = key;
    // 此处触发 getter
    this.value = obj[key];
    // 回收依赖，以免多余的调用
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

  /**
   * 销毁对象时回收所有的 dep 依赖
   *
   * @memberof Watcher
   */
  tearDown() {

  }
}
