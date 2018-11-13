import Vue from './src/index';

// 数据部分，添加初始化的观测者
const vm = new Vue({
  el: 'test',
  data: {
    name: 'test'
  }
});

vm._data.name = 'newvalue'
