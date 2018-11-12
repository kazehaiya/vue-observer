import Vue from './src/index';

// 数据部分
const vm = new Vue({
  el: 'test',
  data: {
    name: ['test']
  }
});

vm._data.name.push('newVal');
