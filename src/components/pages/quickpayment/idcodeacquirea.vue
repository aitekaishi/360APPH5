<template>
	<div  style="height: 100vh;width: 100vw;overflow: hidden;" class="ggg">
		<loading :show="loading"></loading>
    	<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">获取验证码</x-header>
		</div>
		<div class="idcardiphone">
    		<span style="word-break: break-all !important;word-wrap:break-word !important;white-space: pre-wrap;">绑定银行卡需要短信确认，验证码已发送至手机 : {{numa}}****{{numb}}，请按提示操作。</span><br />
		</div>
    	<group>
    		<x-input class="XI" type="number" mask="999999" @on-change="onchange()" placeholder="验证码" max=6 v-model="value"></x-input>
    	</group>
    	<div id="cccc">{{s}}s后重新发送</div>
    	<a id="ddddd" @click="restart()" style="cursor: pointer;">获取验证码</a>
    	<div class="binding">
    		<x-button class="XB" :disabled="XB" @click.native="binding()" type="warn">完成绑定</x-button>
    	</div>
    	<div class="mamama">
	      <x-dialog v-model="showdialog" hide-on-blur=true>
		        <div class="dialogindex" style="text-align: center;word-wrap:break-word">
		          	<h4 style="font-size: 18px;font-weight: 500;">绑卡成功</h4>
		          	<div style="margin-top: 25px;font-size: 16px;text-align: center;">交易前请确定已在银联开通支付认证，认证方式：拨打95516按1再按7</div>
		          	<div style="height: 30px;"></div>
		          	<div style="height: 1px;background: #CDCDCD;width: 100vw;position: relative;left: -10vw;"></div>
		          	<div style="height: 15px;"></div>
		          	<span @click="guanbi" style="display: inline-block;width: 50%;height: 30px;font-size: 16px;color: #0000FF;">好的</span><a href="tel:95516" style="display: inline-block;width: 50%;height: 30px;font-size: 16px;">拨打电话</a>
		          	<div style="height: 20vw;width: 1px;background: #CDCDCD;position: absolute;left: 40vw;top: 149px;"></div>
				</div>
	        </x-dialog>
	    </div>
    	<div style="height: 200px;"></div>
 </div>
</template>

<script>
	import {XButton,XHeader,Group,XInput,Loading,Toast,XDialog} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	export default {
		components: {XButton,XHeader,Group,XInput,Loading,Toast,XDialog},
		data (){ 
			return {
				loading:false,
				errorStatus: false,
        		errorMsg: '',
				s:60,
				numa:'',
				numb:'',
				XB:true,
				value:'',
				type:'default',
				showdialog:false,
			}
		},
		methods:{
			guanbi(){
				let _this = this;
				_this.showdialog = false;
				router.push('/cardlist')
			},
			back(){
				router.push('/cardinfoa')
			},
			/*重发绑消费卡短信验证码   
			/user/repay/reSendBindCardMsg   
			传入参数 参数类型 必需 描述
			id long  卡ID*/
			restart:function  () {
				let _this = this
				axios.post(api + '/user/repay/reSendBindCardMsg?id=' + localStorage.getItem("xiaofeiid") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data);
					_this.errorMsg = res.data.msg
			        _this.errorStatus = true
				})
				document.getElementById("cccc").style.display = "inline-block"
				document.getElementById("ddddd").style.display = "none"
				let i =59;
				;
				_this.s = 60
				let out	= setInterval(function  () {
					_this.s=i;i--
					if (i==-1) {
						_this.s = ""
						document.getElementById("s").style.display = "none"
						document.getElementById("b").style.display = "inline-block"
						clearInterval(out)
					}
				},1000)
			},
			/*绑信用卡验证短信验证码   
			/user/repay/validSms   
			传入参数 参数类型 必需 描述
			id long  卡ID
			validCode string  短信验证码*/
			binding:function  () {
				let _this = this;
				console.log(_this.value)
				axios.post(api + '/user/repay/validSms?id=' + localStorage.getItem("xiaofeiid") + '&validCode=' + _this.value + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false;
					console.log(res.data);
					if (res.data.code === 0) {
						_this.showdialog = true
					}else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
				})
			},
		},
		created (){
			const _this = this;
			console.log("进入idcodeacquire")
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
			if (_this.value!=='') {
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
		padding: 0 1.3rem 0 1.3rem;
		span{
			color: #A4A4A4;
			font-size: 1rem;
			display: inline-block;
			position: relative;
			top: 10px;
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
		padding: 0.3rem;width: 120px;text-align: center;display: inline-block;border-left: 1px solid #999999;
		left: 10px;
	}
	#ddddd{
		float: right;position: relative;top: -40px;left:14px;font-size: 13px;color: #D84C29 !important;display: none;padding: 0.3em;width: 120px;text-align: center;
		border-left: 1px solid #999999;
		
	}
	
</style>
				