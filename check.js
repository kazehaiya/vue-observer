import Vue from './src/index';

const data = {
  name: 'test'
};

// 数据部分
const vm = new Vue({
  el: 'test',
  data
});

// 模拟更新 dom
vm._data.name = 'newVal';
