import Dep, { pushTarget, popTarget } from './dep';

export default class Watcher {
  constructor(vm) {
    Dep.target = vm;
  }

  update() {
    console.log('触发 watcher');
  }
}