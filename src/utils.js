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
