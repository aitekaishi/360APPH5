<template>
	<div style="height: 100vh;width: 100vw;overflow: hidden;" class="zzzz">
		<loading :show="loading"></loading>
    	<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: ''}">获取验证码-通道{{nex}}</x-header>
		</div>
		<div class="idcardiphone">
    		<span>验证码将发送到您的支付卡预留手机号，请您注意查收</span>
		</div>
    	<group class="abc">
    		<x-input title="验证码" type="number" class="XI" mask="999999" @on-change="onchange()" v-model="value"></x-input>
    	</group>
    	<div id="cccc">{{s}}s后重新发送</div>
    	<a id="ddddd" @click="restart()" style="cursor: pointer;">获取验证码</a>
    	<div class="binding">
    		<x-button class="XB" :disabled="XB" @click.native="binding()" type="warn">提交</x-button>
    	</div>
    	<div style="height: 200px;"></div>
 	</div>
</template>

<script>
	import {XButton,XHeader,Group,XInput,Loading,Toast} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	export default {
		components: {XButton,XHeader,Group,XInput,Loading,Toast},
		data (){ 
			return {
				nex:'',
				loading:false,
				errorStatus: false,
        		errorMsg: '',
				s:60,
				numa:'',
				numb:'',
				XB:true,
				value:'',
				type:'default'
			}
		},
		methods:{
			restart:function  () {
				const _this = this
				/*快捷支付第三方验证码发送接口   
					/user/payment/send/thirdsms   
					传入参数 参数类型 必需 描述
					cardId Long  Y  支付卡ID
					amount Integer Y 快捷支付金额（分）
					wayId Long Y 通道ID
					传出参数 
					orderNo String  订单编号*/
				let amount = localStorage.getItem("inputmonery")*100
				axios.post(api + '/user/payment/send/thirdsms?cardId=' + localStorage.getItem("payId") + '&amount=' + amount + '&wayId=' + localStorage.getItem("wayId")+ '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res.data)
					if (res.data.code === 0) {
						document.getElementById("cccc").style.display = "inline-block"
						document.getElementById("ddddd").style.display = "none"
						let i =59;
						_this.s = 60
						let out	= setInterval(function  () {
							_this.s=i;i--
							if (i==-1) {
								_this.s = ""
								document.getElementById("cccc").style.display = "none"
								document.getElementById("ddddd").style.display = "inline-block"
								clearInterval(out)
							}
						},1000)
						localStorage.setItem("orderNo",res.data.data.orderNo)//订单编号
						//router.push('/historybill')
					}
					else {
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
				})
			},
			/*验证支付卡短信验证码   
			/user/payment/validPayCard   
			传入参数 参数类型 必需 描述
			id Long Y id
			validCode String Y 验证码
			传出参数   */
			binding:function  () {
				let _this = this;
				let amount = localStorage.getItem("inputmonery")*100
				axios.post(api + '/user/payment/pay2third?cardId=' + localStorage.getItem("payId") + '&amount=' + amount + '&wayId=' + localStorage.getItem("wayId") + '&orderNo=' + localStorage.getItem("orderNo") + '&valiCode=' + _this.value + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false;
					console.log(res.data);
					if (res.data.code === 0) {
						router.push('/QpayIndex')
					}else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
					})
			},
			//获取
			onchange:function  () {
				
			}
		},
		created (){
			const _this = this;
			if (localStorage.getItem('wayId')==1) {
				_this.nex = "一"
			}else if (localStorage.getItem('wayId')==2) {
				_this.nex = "一"
			}
			else if (localStorage.getItem('wayId')==4) {
				_this.nex = "一"
			}
			console.log("进入idcodeacquire")
			console.log(localStorage.getItem("iphonenum"))
			console.log(localStorage.getItem("iphonenuma"))
			console.log(localStorage.getItem("iphonenumb"))
			console.log(localStorage.getItem('creditcardnum'))
			_this.numa = localStorage.getItem("iphonenuma")
			_this.numb = localStorage.getItem("iphonenumb")
			let i =59;
			let out	= setInterval(function  () {
				_this.s=i;i--
				if (i==-1) {
					_this.s = ""
					document.getElementById("cccc").style.display = "none"
					document.getElementById("ddddd").style.display = "inline-block"
					clearInterval(out)
				}
			},1000)
		},
		updated(){
			//判断提交按钮可以点击
			const _this = this
			if (_this.value.length==6) {
				_this.XB = false;
			}else{
				_this.XB=true;
			}
		}
	}
</script>
<style lang="less">
	@import url("less/x-header.less");
	@import url("less/boundaccount.less");
	@import url("less/default.less");
	@import url("less/button.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.idcardiphone{
		padding: 0.2rem 0 0 1rem;
		span{
			color: #A4A4A4;
			font-size: 1rem;
			word-break: break-all !important;word-wrap:break-word !important;white-space: pre-wrap;
			display: inline-block;
			position: relative;
			top: 0.5rem;
		}
	}
	.XI{
		background: #FFF;
	}
	.weui-input{
		margin-left: 1rem;
	}
		
	.binding{
		margin-top: 2rem;
		text-align: center;
		.XB{
			width: 90%;
		}
	}
	#cccc{
		float: right;position: relative;top: -40px;font-size: 13px;color: #D84C29;
		padding: 0.3rem;width: 120px;text-align: center;border-left: 1px solid #999999;
		left: 10px;display: inline-block;
	}
	#ddddd{
		float: right;position: relative;top: -40px;left:14px;font-size: 13px;color: #D84C29 !important;padding: 0.3em;width: 120px;text-align: center;
		border-left: 1px solid #999999;display: none;
		
	}
</style>
				