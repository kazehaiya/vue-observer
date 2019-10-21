class Observer {
  constructor() {
    this.subscriberList = [];
  }

  // 添加订阅方法
  addSubscriber(subscribFunc) {
    if (subscribFunc && !this.subscriberList.includes(subscribFunc)) {
      this.subscriberList.push(func);
    }
  }

  // 发布者更新消息，触发所有的订阅方法
  notify() {
    this.subscriberList.forEach(subscribFunc => subscribFunc());
  }
}

// 观察者
const observer = new Observer();
// 发布者
const publisher = { bookName: 'Hello' }
// 订阅者
const subscriber = function () {
  console.log(`The publisher your followed update the book ${publisher.bookName}`);
}

// 订阅者订阅事件需要平台完成
observer.addSubscriber(subscriber);

// 发布者更新消息
publisher.bookName = 'Hello World';

// 平台根据订阅者设置的事件通知订阅者，你有新订阅信息
observer.notify();
