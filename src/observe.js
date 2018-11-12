import Dep from './dep';
import { def, isObject, copyAugment, dependArray } from './utils';
import { arrayMethods } from './array';

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

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
      // 如果视图部分有对应的对象渲染
      if (Dep.target) {
        dep.depend();
        // 如果值是对象的情况
        if (childObj) {
          childObj.dep.depend();
          // 考虑到对象为 Array 的情况
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      // 如果赋予的值与原值没变化则忽略
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      // 如果没有 set 方法则忽略赋值
      if (getter && !setter) {
        return;
      }
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
    // 数组进行单独处理
    if (Array.isArray(value)) {
      // 重写部分改变数组的方法
      copyAugment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * 遍历数组，观察其中的每一个值（对象属性的值）
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
      defineReactive(obj, key);
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
