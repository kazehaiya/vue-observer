import Vue from './vue-observer/index';

// 数据部分，添加初始化的观测者（内部只监听了 name 值的变动）
const vm = new Vue({
  el: 'test',
  data: {
    name: 'test'
  }
});

vm._data.name = 'newvalue';
