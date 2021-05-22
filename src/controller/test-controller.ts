import { Get, JsonController } from "@blued-core/http-server";
import { buildURL } from '../helper/url';

@JsonController('/api')
export default class {
  @Get('/get')
  testGet() {
    const date = new Date()

    let params = {
      foo: 'bar',
      arrs: ['bar', 'baz'],
      date
    }

    return buildURL('/api/get', params)
  }

}