import Dep from './dep';
import { def, isObject } from './utils';

/**
 * 当值为数组的情况
 *
 * @param {Array} value
 */
function dependArray(value) {
  const valueLen = value.length;
  let item;
  for (let i = 0; i < valueLen; i++) {
    item = value[i];
    // 为每一项值（已经加入观测的）添加 watcher
    item && item.__ob__ && item.__ob__.dep.depend();
    // 如果该数组项还是 Array 则递归
    if (Array.isArray(item)) {
      dependArray(item);
    }
  }
}

/**
 * 此处为对象每一项进行响应式改造
 *
 * @param {Object} obj
 * @param {String} key
 */
function defineReactive(obj, key) {
  let val;
  const dep = new Dep();
  // 获取属性的描述符
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  // 获取属性的访问器属性
  const getter = property && property.get;
  const setter = property && property.set;
  if (!getter || setter) {
    val = obj[key];
  }
  // 递归 observe 对象的值
  let childObj = observe(val);
  // 设置访问器属性
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      // if (Dep.target) {
      //   dep.depend();
      //   // 如果值不是 undefiend
      //   if (childObj) {
      //     childObj.dep.depend();
      //     if (Array.isArray(value)) {
      //       dependArray(value);
      //     }
      //   }
      // }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      // 如果赋予的值与原值没变化则忽略
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (getter && !setter) return;
      // 赋新值
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      // 监听新赋予的值
      childObj = observe(newVal);
      // 通知更新所有的 watcher
      dep.notify();
    }
  });
}

/**
 * 观察者
 *
 * @class Observer
 */
class Observer {
  constructor(value) {
    // 获取传入的需要观测的参数
    this.value = value;
    // 设置 __ob__ 属性
    def(value, '__ob__', this);
    // 待研究该方法的作用
    this.dep = new Dep();
    // 数组得特殊处理，对其每一项都 observe
    if (Array.isArray(value)) {
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * 对数组类进行观测
   * 实际上就是遍历数组，然后观察其中的每一个值
   *
   * @param {Array} items
   * @memberof Observer
   */
  observeArray(items) {
    for (const val of items) {
      observe(val);
    }
  }

  /**
   * 遍历所有的属性，并为每个属性添加 getter 和 setter
   *
   * @param {Object} obj
   * @memberof Observer
   */
  walk(obj) {
    for (const key in obj) {
      defineReactive(obj, obj[key]);
    }
  }
}

/**
 * 导出观察者实现方法
 *
 * @export
 * @param {any} value
 * @returns {Observer}
 */
export default function observe(value) {
  // 传入为对象，为其添加观测者
  if (!isObject(value)) {
    return;
  }
  let ob;
  // 如果已经设置了观察者则无需再次设置观察者
  if (value.__ob__ !== undefined && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
