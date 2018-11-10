import Dep from './dep';

/**
 * 判断是否是对象
 *
 * @param {Object} obj
 * @returns
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

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
  // 创建一个连接桥
  const dep = new Dep();
  // 获取属性的描述符
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  // 获取该属性的 getter 和 setter
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }
  // 如果 val 是对象则需要深度 observe
  // 如果不是对象则此处的 childObj 为 undefiend
  let childObj = observe(val);
  // 为观测对象对应属性添加 setter 和 getter
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        // 如果值不是 undefiend
        if (childObj) {
          childObj.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (getter && !setter) return
      // 赋新值
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 重新监听值
      childObj = observe(newVal);
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
  /**
   * Creates an instance of Observer.
   *
   * @param {any} value
   * @memberof Observer
   */
  constructor(value) {
    // 获取传入的需要观测的参数
    this.value = value;
    this.value.__ob__ = this;
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
    const arrayLen = items.length;
    for (let index = 0; index < arrayLen; index++) {
      observe(items[index]);
    }
  }

  /**
   * 遍历所有的属性，并为每个属性添加 getter 和 setter
   *
   * @param {Object} obj
   * @memberof Observer
   */
  walk(obj) {
    const objectKeys = Object.keys(obj);
    const objLength = objectKeys.length;
    for (let index = 0; index < objLength; index++) {
      defineReactive(obj, objectKeys[index]);
    }
  }
}

/**
 * 导出观察者实现方法
 *
 * @export
 * @param {any} value
 * @returns
 */
export default function observe(value) {
  // 传入为对象，非对象则无返回值（得考虑属性值为对象的情况）
  if (!isObject(value)) return;
  let ob;
  // 当已经有观察者了则无需再新增观察者
  if (value.__ob__ !== undefined && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}
