const assert = require('assert');
try{
  //assert.equal(1,'1','equal');//真实的与期望的不符合输出错误信息
  assert.notEqual(1,'1','notEqual')//与 assert.equal() 相反
  //assert.notDeepStrictEqual(1,"1",'notDeepStrictEqual');//与 assert.deepStrictEqual() 相反
  //assert.deepStrictEqual(1, "1","deepStrictEqual");//真实的与期望的不深度符合输出错误信息
  //assert.fail('失败');
  //assert.ifError(0)//如果 value 不为 undefined 或 null，则抛出 value
}catch (e) {
  console.log(e.message)
}
