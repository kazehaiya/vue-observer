import Vue from './src/index';
import Watcher from './src/watcher';

// 数据部分，添加初始化的观测者
const vm = new Vue({
  el: 'test',
  data: {
    name: ['test']
  }
});

// 模拟解析到 `{{ name }}` 触发的更新操作
new Watcher(vm, vm._data, 'name');
vm._data.name.push('newVal');
