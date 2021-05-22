import { buildURL } from "./url";
let param = {
  foo: 'bar',
}
buildURL('http://localhost:8080/ts-axios', param)