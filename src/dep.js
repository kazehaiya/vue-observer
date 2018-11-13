/**
 * 依赖收集部分，是 watcher 与数据部分的桥梁，主要实现了以下两个功能：
 * 1.用 addSub 方法可以在目前的 Dep 对象中增加一个 Watcher 的订阅操作；
 * 2.用 notify 方法通知目前 Dep 对象的 subs 中的所有 Watcher 对象触发更新操作。
 *
 * @export
 * @class Dep
 */
export default class Dep {
  constructor() {
    // 收集到的 watcher 依赖全部存入此数组内
    this.subs = [];
  }

  /**
   * 添加一项 watcher
   *
   * @param {Watcher} sub
   * @memberof Dep
   */
  addSub(sub) {
    this.subs.push(sub);
  }

  /**
   * 当前的 Dep 有绑定对象时，则向数组内添加该对象
   *
   * @memberof Dep
   */
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  /**
   * 通知所有的 watcher 更新
   *
   * @memberof Dep
   */
  notify() {
    // 获取一个备份，以免处 bug
    const subs = this.subs.slice();
    const subsLen = subs.length;
    for (let index = 0; index < subsLen; index++) {
      subs[index].update();
    }
  }
}

// 目标 watcher 对象
Dep.target = null;