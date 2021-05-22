import { Get, JsonController } from "@blued-core/http-server";

@JsonController('/api')
export default class {
  @Get('/get')
  testGet() {
  }

}