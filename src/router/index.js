import Vue from 'vue'
import Router from 'vue-router'
// 页面
import index from '@/components/pages/index'
import singleday from '@/components/pages/singleday'
import singledaya from '@/components/pages/singledaya'
import protocol from '@/components/pages/protocol'
import wallet from '@/components/pages/wallet'
import invite from '@/components/pages/invite'
import my from '@/components/pages/my'
import vip from '@/components/pages/vip'
import register from '@/components/pages/register'
import registera from '@/components/pages/registera'
import setting from '@/components/pages/setting'
import forgotPassword from '@/components/pages/forgot-password'
import changePassword from '@/components/pages/changePassword'
import notice from '@/components/pages/notice'
import noticelist from '@/components/pages/noticelist'
import withdraw from '@/components/pages/withdraw'
import withdrawlist from '@/components/pages/withdrawlist'
import withdrawsuccess from '@/components/pages/withdrawsuccess'
import myinvite from '@/components/pages/myinvite'
import mycar from '@/components/pages/my-car'
import addcar from '@/components/pages/add-car'
import safe from '@/components/pages/safe'
import version from '@/components/pages/version'
import marquee from '@/components/pages/marquee'
import withdrawbill from '@/components/pages/withdrawbill'
import fenrun from '@/components/pages/fenrun'
import yitixian from '@/components/pages/yitixian'
import tichen from '@/components/pages/tichen'
import withdrawinfoa from '@/components/pages/withdrawinfoa'
import withdrawinfob from '@/components/pages/withdrawinfob'
import business from '@/components/pages/business'
import code from '@/components/pages/code'
import newbill from '@/components/pages/newbill'
import tenant from '@/components/pages/tenant'
import cardlist from '@/components/pages/cardlist'
import cardmanage from '@/components/pages/cardmanage'
import setplan from '@/components/pages/setplan'
import setplanlist from '@/components/pages/setplanlist'
import planDetails from '@/components/pages/planDetails'
import planDetailsa from '@/components/pages/planDetailsa'
import record from '@/components/pages/record'
import setplansuc from '@/components/pages/setplansuc'
import boundcreditcarda from '@/components/pages/quickpayment/boundcreditcarda'
import face from '@/components/pages/knowface/face'
import userId from '@/components/pages/knowface/userId'
import idinfo from '@/components/pages/knowface/identity'
import QpayIndex from '@/components/pages/quickpayment/QpayIndex'
import boundcreditcard from '@/components/pages/quickpayment/boundcreditcard'
import boundaccount from '@/components/pages/quickpayment/boundaccount'
import emptybill from '@/components/pages/quickpayment/empty-bill'
import infobilla from '@/components/pages/quickpayment/info-billa'
import infobillb from '@/components/pages/quickpayment/info-billb'
import infobillc from '@/components/pages/quickpayment/info-billc'
import infobillaa from '@/components/pages/info-billaa'
import infobillbb from '@/components/pages/info-billbb'
import infobillcc from '@/components/pages/info-billcc'
import historybill from '@/components/pages/quickpayment/historybill'
import cardinfo from '@/components/pages/quickpayment/cardinfo'
import cardinfoa from '@/components/pages/quickpayment/cardinfoa'
import idcodeacquire from '@/components/pages/quickpayment/idcodeacquire'
import idcodeacquirea from '@/components/pages/quickpayment/idcodeacquirea'
import idcodepay from '@/components/pages/quickpayment/idcodepay'
import kuaijielist from '@/components/pages/quickpayment/kuaijielist'
import login from '@/components/pages/login'

import zaohui1 from '@/components/pages/zaohui1'
import zaohui2 from '@/components/pages/zaohui2'
import zaohui3 from '@/components/pages/zaohui3'
import zaohui4 from '@/components/pages/zaohui4'

import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)
Vue.use(Router)

export default new Router({
  routes: [
  {
      path: '/passwordd',
      name: 'passwordd',
      component: zaohui4,
      meta: {
        title: '重置密码成功'
      }
    },
  {
      path: '/passwordc',
      name: 'passwordc',
      component: zaohui3,
      meta: {
        title: '找回密码'
      }
    },
  {
      path: '/passwordb',
      name: 'passwordb',
      component: zaohui2,
      meta: {
        title: '找回密码'
      }
    },
  {
      path: '/passworda',
      name: 'passworda',
      component: zaohui1,
      meta: {
        title: '找回密码'
      }
    },
  {
      path: '/protocol',
      name: 'protocol',
      component: protocol,
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: wallet,
      meta: {
        title: '钱包'
      }
    },
    {
      path: '/singleday',
      name: 'singleday',
      component: singleday,
      meta: {
        title: '单笔限额'
      }
    },{
      path: '/singledaya',
      name: 'singledaya',
      component: singledaya,
      meta: {
        title: '单日限额'
      }
    },
    {
      path: '/kuaijielist',
      name: 'kuaijielist',
      component: kuaijielist,
      meta: {
        title: '快捷消费'
      }
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: forgotPassword,
      meta: {
        title: '找回密码'
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: invite,
      meta: {
        title: '邀请'
      }
    },
    {
      path: '/setplan',
      name: 'setplan',
      component: setplan,
      meta: {
        title: '设置计划'
      }
    },
    {
      path: '/setplanlist',
      name: 'setplanlist',
      component: setplanlist,
      meta: {
        title: '设置计划'
      }
    },
    {
      path: '/planDetails',
      name: 'planDetails',
      component: planDetails,
      meta: {
        title: '计划详情'
      }
    },
    {
      path: '/planDetailsa',
      name: 'planDetailsa',
      component: planDetailsa,
      meta: {
        title: '计划详情'
      }
    },
    {
      path: '/record',
      name: 'record',
      component: record,
      meta: {
        title: '分期记录'
      }
    },
    {
      path: '/setplansuc',
      name: 'setplansuc',
      component: setplansuc,
      meta: {
        title: '提交成功'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        title: '我的'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/vip',
      name: 'vip',
      component: vip,
      meta: {
        title: '开通会员'
      }
    },
    {
      path: '/cardmanage',
      name: 'cardmanage',
      component: cardmanage,
      meta: {
        title: '卡管理'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册'
      }
    },
		{
			path: '/registera',
			name: 'registera',
			component: registera,
			meta: {
				title: '注册'
			}
		},
    {
      path: '/setting',
      name: 'setting',
      component: setting,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/face',
      name: 'face',
      component: face,
      meta: {
        title: '人脸识别'
      }
    },
    {
      path: '/userId',
      name: 'userId',
      component: userId,
      meta: {
        title: '认证用户'
      }
    },
    {
      path: '/idinfo',
      name: 'idinfo',
      component: idinfo,
      meta: {
        title: '身份信息确认'
      }
    },
    {
      path: '/QpayIndex',
      name: 'QpayIndex',
      component: QpayIndex,
      meta: {
        title: '向商家付款'
      }
    },
    {
      path: '/emptybill',
      name: 'emptybill',
      component: emptybill,
      meta: {
        title: '空账单'
      }
    },
    {
      path: '/boundaccount',
      name: 'boundaccount',
      component: boundaccount,
      meta: {
        title: '绑定收款账户'
      }
    },
    {
      path: '/infobilla',
      name: 'infobilla',
      component: infobilla,
      meta: {
        title: '已提交，请稍后'
      }
    },
    {
      path: '/infobillb',
      name: 'infobillb',
      component: infobillb,
      meta: {
        title: '提交成功'
      }
    },
    {
      path: '/infobillc',
      name: 'infobillc',
      component: infobillc,
      meta: {
        title: '提交成功'
      }
    },
    {
      path: '/infobillaa',
      name: 'infobillaa',
      component: infobillaa,
      meta: {
        title: '已提交，请稍后'
      }
    },
    {
      path: '/infobillbb',
      name: 'infobillbb',
      component: infobillbb,
      meta: {
        title: '提交成功'
      }
    },
    {
      path: '/infobillcc',
      name: 'infobillcc',
      component: infobillcc,
      meta: {
        title: '提交成功'
      }
    },
    {
      path: '/historybill',
      name: 'historybill',
      component: historybill,
      meta: {
        title: '历史账单'
      }
    },
    {
      path: '/cardinfo',
      name: 'cardinfo',
      component: cardinfo,
      meta: {
        title: '完善信用卡信息'
      }
    },
    {
      path: '/cardinfoa',
      name: 'cardinfoa',
      component: cardinfoa,
      meta: {
        title: '完善信用卡信息'
      }
    },
    {
      path: '/boundcreditcard',
      name: 'boundcreditcard',
      component: boundcreditcard,
      meta: {
        title: '绑定信用卡'
      }
    },
    {
      path: '/boundcreditcarda',
      name: 'boundcreditcarda',
      component: boundcreditcarda,
      meta: {
        title: '绑定信用卡'
      }
    },
    {
      path: '/idcodeacquire',
      name: 'idcodeacquire',
      component: idcodeacquire,
      meta: {
        title: '获取验证码'
      }
    },
    {
      path: '/idcodeacquirea',
      name: 'idcodeacquirea',
      component: idcodeacquirea,
      meta: {
        title: '获取验证码'
      }
    },
    {
      path: '/idcodepay',
      name: 'idcodepay',
      component: idcodepay,
      meta: {
        title: '获取验证码'
      }
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice,
      meta: {
        title: '消息'
      }
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword,
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw,
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/withdrawsuccess',
      name: 'withdrawsuccess',
      component: withdrawsuccess,
      meta: {
        title: '提现成功'
      }
    },
    {
      path: '/myinvite',
      name: 'myinvite',
      component: myinvite,
      meta: {
        title: '我的邀请'
      }
    },
    {
      path: '/mycar',
      name: 'mycar',
      component: mycar,
      meta: {
        title: '我的车辆'
      }
    },
    {
      path: '/addcar',
      name: 'addcar',
      component: addcar,
      meta: {
        title: '添加车辆'
      }
    },
    {
      path: '/safe',
      name: 'safe',
      component: safe,
      meta: {
        title: '安全保障'
      }
    },
    {
      path: '/version',
      name: 'version',
      component: version,
      meta: {
        title: '版本号'
      }
    },
    {
      path: '/marquee',
      name: 'marquee',
      component: marquee,
      meta: {
        title: '系统通知'
      }
    },
    {
      path: '/withdrawlist',
      name: 'withdrawlist',
      component: withdrawlist,
      meta: {
        title: '添加银行卡'
      }
    },
    {
      path: '/withdrawbill',
      name: 'withdrawbill',
      component: withdrawbill,
      meta: {
        title: '提现记录'
      }
    },
    {
      path: '/noticelist',
      name: 'noticelist',
      component: noticelist,
      meta: {
        title: '消息详情'
      }
    },
    {
      path: '/fenrun',
      name: 'fenrun',
      component: fenrun,
      meta: {
        title: '分润收益'
      }
    },
    {
      path: '/tichen',
      name: 'tichen',
      component: tichen,
      meta: {
        title: '提成收益'
      }
    },
    {
      path: '/yitixian',
      name: 'yitixian',
      component: yitixian,
      meta: {
        title: '已提现'
      }
    },
    {
      path: '/withdrawinfoa',
      name: 'withdrawinfoa',
      component: withdrawinfoa,
      meta: {
        title: '提现详情'
      }
    },
    {
      path: '/withdrawinfob',
      name: 'withdrawinfob',
      component: withdrawinfob,
      meta: {
        title: '提现详情'
      }
    },
    {
      path: '/business',
      name: 'business',
      component: business,
      meta: {
        title: '我的交易'
      }
    },
    {
      path: '/code',
      name: 'code',
      component: code,
      meta: {
        title: '升级会员'
      }
    },
    {
      path: '/newbill',
      name: 'newbill',
      component: newbill,
      meta: {
        title: '账单分期'
      }
    },
    {
      path: '/tenant',
      name: 'tenant',
      component: tenant,
      meta: {
        title: '商户入网'
      }
    },
    {
      path: '/cardlist',
      name: 'cardlist',
      component: cardlist,
      meta: {
        title: '卡列表'
      }
    }                       
  ]
})
