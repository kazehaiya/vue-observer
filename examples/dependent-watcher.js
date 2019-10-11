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

// 中间依赖的平台
const dep = new Dep();
// 发布者（data 对象中的属性，为了方便处理，直接扩出来了，写成对象也行）
const bookName = "Hello World";
const bookContent = "This is a book";
const publishInfo = ''; // 消息提示
// 订阅者（method 方法）
const target = function () {
  publishInfo = `The book ${bookName}‘s content is ${bookContent}`;
}

// 订阅者还未订阅信息
console.log(publishInfo); // ‘’

// 订阅者在平台上添加订阅事件，并推送用户目前的最新信息
dep.depend();
target();
console.log(publishInfo) // The book Hello World‘s content is This is a book

// publisher 更新消息
bookContent = 'The content is "Hello World"';
// 平台还未处理前，原信息没有改变
console.log(publishInfo) // The book Hello World‘s content is This is a book

// 平台观察到 publisher 更新内容了，更新了用户的通知信息
dep.notify();
// 呈现更新后的信息
console.log(publishInfo) // The book Hello World‘s content is The content is "Hello World"
