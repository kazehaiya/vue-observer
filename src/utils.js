/**
 * 定义一个属性
 *
 * @export
 * @param {Object} obj
 * @param {String} key
 * @param {*} val
 * @param {boolean} [enumerable]
 */
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * 判断是否是对象
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 * 为 array 添加原生方法支持（对原生的部分方法注入了监听）
 *
 * @param {Object} target
 * @param {Object} src
 * @param {Array<string>} keys
 */
export function copyAugment (target, src, keys) {
  for (const key of keys) {
    def(target, key, src[key]);
  }
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 *
 * @param {Array} value
 */
export function dependArray(value) {
  for (const item of value) {
    // 为每一项值（已经加入观测的）添加 watcher
    item && item.__ob__ && item.__ob__.dep.depend();
    // 如果该数组中的某一项还是 Array 则递归
    if (Array.isArray(item)) {
      dependArray(item);
    }
  }
}