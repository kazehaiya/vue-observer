let target = null;

// （私人管家）依赖收集
class Dep {
  constructor() {
    this.subscriberList = [];
  }

  // 将当前的 watcher 加入 dep 中
  addSub(watcher) {
    this.subscriberList.push(watcher)
  }

  // 添加订阅方法
  depend() {
    if (target) {
      target.addDep(this);
    }
  }

  // 发布者更新消息，触发所有的订阅方法
  notify() {
    this.subscriberList.forEach(sub => {
      sub.update();
    });
  }
}

// （平台）观察者
class Watcher {
  constructor(data = {}, key = '', cb = () => {}) {
    this.cb = cb;
    this._data = data;
    this.key = key;

    target = this;
    // 触发 getter，存储本 watcher
    this.value = data[key];
    // 防止反复触发
    target = null;
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    const newVal = this._data[this.key];
    this.value = newVal;
    this.cb(newVal);
  }
}

// （发布者和管家的联系方式）监听器
function observer(data = {}) {
  Object.keys(data).forEach(key => {
    let val = data[key];
    const dep = new Dep();

    Object.defineProperty(data, key, {
      get() {
        if (target) {
          // get 时添加依赖
          dep.depend();
        }
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        // set 时触发更新
        val = newVal;
        dep.notify();
      }
    })
  });
}

// 发布者
const publisher = {
  bookName: 'book',
  bookContent: 'hello world'
}

// 管家开始观测发布者
observer(publisher);

// 订阅者在平台上订阅发布者的部分信息
new Watcher(publisher, 'bookName', name => {
  console.log(`new book name is ${name}`);
});
new Watcher(publisher, 'bookContent', content => {
  console.log(`new book content is ${content}`);
});


// 发布者发布信息
publisher.bookName = 'new book';
publisher.bookContent = 'new content';
