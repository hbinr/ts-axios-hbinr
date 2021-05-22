import { encode, isDate, isObject } from "./util"

/**
 * 构建请求url，处理入参(可能是对象,数字,时间等)后，将其拼接成正确的URL
 * 如: 
 *    1. url: /base/get， params: {a:1,b:2} => /base/get?a=1&b=2 普通对象
 *    2. url: /base/get， params: { foo: ['bar', 'baz']} => /base/get?foo[]=bar&foo[]=baz'  参数为数组
 *    3. url: /base/get， params: {date} => /base/get?date=2019-04-01T05:55:39.030Z, date 后面拼接的是 date.toISOString() 的结果
 *    4. url: /base/get， params: {foo: '@:$, '} => /base/get?foo=@:$+ 特殊字符支持
 *    5. url: /base/get， params: {foo: 'bar',baz: null} => /base/get?foo=bar 对于值为 null 或者 undefined 的属性，不会添加到 url 参数中
 *    6. url: /base/get#hash， params: {foo: 'bar'} => /base/get?foo=bar 丢弃 url 中的哈希标记
 *    7. url: /base/get?foo=bar， params: {foo: 'bar'} => /base/get?foo=bar&bar=baz 保留 url 中已存在的参数
 * 
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

  // 3. 遍历 params，分别处理不同类型的字段
  // Object.keys() 返回对象的可枚举字符串属性 和 方法 的名称。
  // params: {foo:"bar"}, 那么key的值为： foo
  Object.keys(params).forEach((key) => {
    // 获取每个属性(字段)的值
    const val = params[key]

    if (!Boolean(val)) {
      // 等效于：if (val === null || typeof val === 'undefined') {
      return // return 不会跳出循环，而是跳过本次循环
    }
    let values: string[]

    if (Array.isArray(val)) { // 属性类型为数组
      values = val
      key += '[]' // 属性名为arrs，那么会拼接为 arrs[]
    } else {
      values = [val] // 属性类型不为数组,将其存到 values 数组中
    }

    values.forEach((val) => {

      if (isDate(val)) { // 属性类型为时间
        // 以ISO格式返回日期作为字符串值。
        val = val.toISOString() //  eg: 2021-05-22T12:04:25.159Z

      } else if (isObject(val)) { // 属性类型为对象
        val = JSON.stringify(val) // 对象字符串, eg: "bar", "baz"
      }
      // 对 key 和 val 进行编码
      keyValArr.push(`${encode(key)}=${encode(val)}`) // keyValArr eg: [ 'foo=%22bar%22', 'arrs[]=%22bar%22', 'arrs[]=%22baz%22' ]
    })

  })

  // 将每个键值对用 '&' 连接起来, 因为URL中有多个查询条件，便使用 & 拼接
  // eg: foo=%22bar%22&arrs[]=%22bar%22&arrs[]=%22baz%22&date=2021-05-22T13:06:45.683Z
  let serializedParams = keyValArr.join('&')

  if (serializedParams) { // 非空数组才开始处理

    // 处理url中的哈希标记, 这些哈希值以 # 开头。
    // 找到 # 所在位置，取该位置前半部分
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 最后处理本身url是否自带参数，eg：/base/get?foo=bar
    // 第一种情况：有，要保留 url 中已存在的参数，便用 & 拼接之后的参数
    // 第二种情况：无，便先拼接 ?, 表示后面是参数，再拼接serializedParams
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
