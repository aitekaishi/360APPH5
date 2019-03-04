import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
	state: {
		inputMonery:1000,//输入金额
		settleList:[],//收款账户
		settleNo:'',//收款卡
		creditList:[],//信用卡账户
		creditNo:'',//信用卡
		realName:'',//真实姓名
	},
	modules:{
		//首页
		QpayIndex:{
			state:{
				inputMonery:'',//输入金额
				settleList:[[]],//收款账户
				settleNo:'',//收款卡
				creditList:[[]],//信用卡账户
				creditNo:'',//信用卡
				realName:'',//真实姓名
				bankname:'',//银行名称
				bankcard:'',//卡号后四位
			}
		},
		//结算卡
		boundaccount:{
			state:{
				y:''
			}
		}
	}
	
})