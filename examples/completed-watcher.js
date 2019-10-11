let target = null;

class Dep {
  constructor() {
    this.subscriberList = [];
  }

  // 添加订阅方法
  depend() {
    if (target && !this.subscriberList.includes(target)) {
      this.subscriberList.push(target);
    }
  }

  // 发布者更新消息，触发所有的订阅方法
  notify() {
    this.subscriberList.forEach(sub => sub());
  }
}
