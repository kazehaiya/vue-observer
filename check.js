import Vue from './src/index';

// 测试部分
const vm = new Vue({
  el: 'test',
  data: {
    name: 'testName'
  }
});

console.log(vm);
