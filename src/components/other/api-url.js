/* eslint-disable */
// 接口切换开关
const dev = false

let url = ''
if (dev) {
  url = 'http://test.api.zechang360.com'
} else {
  url = 'http://app.api.zechang360.com'
}
export default url