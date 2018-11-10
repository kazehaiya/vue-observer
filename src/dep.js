import Watcher from './watcher';

// 唯一值
let uid = 0;

/**
 * 依赖收集部分，是 watcher 与数据部分的桥梁
 *
 * @export
 * @class Dep
 */
export default class Dep {
  constructor() {
    // 唯一 id
    this.id = uid++;
    // 收集到的依赖全部存入此数组内
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
   * 移除一项 watcher
   *
   * @param {Watcher} sub
   * @memberof Dep
   */
  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
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
   * 通知所有的 watcher 更新视图
   *
   * @memberof Dep
   */
  notify() {
    // 获取一个备份，以免处 bug
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// 销毁对象，避免多余的收集
Dep.target = null;
const targetStack = [];

export function pushTarget(target) {
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  Dep.target = target;
}

export function popTarget() {
  Dep.target = targetStack.pop();
}
