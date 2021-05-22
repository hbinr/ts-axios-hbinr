const toSring = Object.prototype.toString

/**
 * 判断是否为 Date 类型，返回值使用了 类型保护 
 * @param params any
 * @returns boolean 
 */
export function isDate(params: any): params is Date {
  return toSring.call(params) === '[object Date]'
}
/**
 * 判断是否为 Object 类型
 * @param params any
 * @returns boolean 
 */
export function isObject(params: any): params is Object {
  return params ?? typeof params === 'object'
}

/**
 * 将实际请求中的 url (已经被ASCII编码)  改为统一资源标识符（URI）的有效组成部分。
 * 即将转义后的 url 再转义后回来
 * @param val 请求URL
 * @returns 编码后的URL
 */
export function encode(val: string): string {
  // 对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode
  return encodeURIComponent(val)
    .replace(/%40/g, '@') // 将 /%40/g 替换为 @, 以下同理
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
