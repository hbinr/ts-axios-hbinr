/**
 * 处理请求中的url，
 * @param url 请求URL
 * @param params  请求参数
 * @returns 构建后的URL
 */
export function buildURL(url: string, params?: any): string {
  // 1. 如果请求参数，则直接返回 url
  if (!Boolean(params)) {
    return url
  }
  // 2. 需要遍历 params,将其结果存到键值对数组中
  const keyValArr: string[] = []

  // 3. 遍历 params,
  /**
   *  Object.keys() 返回对象的可枚举字符串属性 和 方法 的名称。
   *  params: {foo:"bar"}
   *  那么key的值为： foo
   *
   */

  Object.keys(params).forEach((key) => {
    console.log('key: ', key);
  })

  encode(url)
  return url
}
/**
 * 将文本字符串编码为统一资源标识符（URI）的有效组成部分。
 * @param val 请求URL
 * @returns 编码后的URL
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@') // 将 /%40/g 替换为 @, 以下同理
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
