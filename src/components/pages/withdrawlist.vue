<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;" class="rrr">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">添加银行卡</x-header>
		</div>
		<div style="height: 5px;"></div>
		<div class="mycard" style="margin-left: 10px;">请选择储蓄卡信息</div>
		<div style="height: 5px;"></div>
		<div class="sccountinfo" style="height: 230px;">
			<group>
				<cell class="name assa" title="姓名" v-model="name"></cell>
				<x-input class='assa' title='银行卡号' v-model="cardNum" placeholder="请填写" text-align="right" mask="9999 9999 9999 9999 9999" max=27></x-input>
				<cell class="banknameee assa" title="银行名称" v-model="bankName"></cell>
				<x-address class="address" title="开户行所在地" :list='listAddress'  hide-district=true v-model='value' placeholder="请选择" @click.native="address()"></x-address>
				<popup-picker class="kaihu" title="开户行名称" @click.native="fen()" :data="fenHang" v-model="fenHangv" confirm-text="确定" placeholder="请选择"></popup-picker>
			</group>
		</div>
		<div style="height: 2rem; background: #FFF;"></div>
		<div class="iphoneNo">
			<group>
				<x-input class='assa' title="预留手机号" type="number" v-model="phoneNum" text-align="right" max=11 placeholder="请输入银行预留号码" mask='99999999999'></x-input>
				<x-input class="idcard" type="number" show-clear=true mask='999999' max=6 v-model="idcode"  placeholder="请输入验证码"></x-input>
			</group>
			<div class="idcardbutton">
				<div id="sss">{{s}}s后重新发送</div>
    			<a id="bbb" @click="restart()" style="cursor: pointer;">获取验证码</a>
			</div>
		</div>
		<div class="nextcard">
    		<x-button class="XB" :disabled="XB" @click.native="next()"  :type="type">提交</x-button>
    </div>
    <div class="mamama">
	      	<x-dialog v-model="showdialog" hide-on-blur=true>
		        <div @click="showdialog = false,close=false" class="dialogindex" style="text-align: center;word-wrap:break-word">
		          	<h4 style="text-align: center;color: #D84C29;">温馨提示</h4>
		        	<div style="height: 10px;"></div>
		        	<div style="height: 2px;background: #D84C29;"></div>
		        	<div style="height: 15px;"></div>
		          	<p style="white-space: pre-wrap;">此地区性银行卡不支持绑定，请更换银行卡再试！</p>
		          	<div style="height: 30px;"></div>
		          	<x-button style='border-radius: 5px;width: 35vw !important;height: 40px !important;background: #C1272D !important;padding: 0 !important;' type="warn" @click.native="closeaa">我知道了</x-button>
				</div>
	        </x-dialog>
	    </div>
	<div style="height: 50px;"></div></div>
</template>

<script>
	import store from '@/store'
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,ChinaAddressV4Data,Toast,Loading,Confirm,XDialog} from 'vux'
	import api from '../../components/other/api-url'
  	import globalPM from '../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import '../../../static/js/bankCardAttribution'
	import bin from './bin.json'
	import base64 from 'base-64'
	import MD5 from 'md5'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,Toast,Loading,Confirm,XDialog},
		data (){ 
			return {
				show:false,
				XB:true,
				loading:false,
				errorStatus: false,
        		errorMsg: '',
				phoneNum:'',//预留手机号
				cardNum:'',//结算卡卡号
				bankName:"未知银行",//银行名称，可填
				idcode:'',//验证码
				listAddress:ChinaAddressV4Data,
				value: [],//开户所在地
				type:'warn',
				fenHang:[[]],
				fenHangv:['请选择'],
				s:60,
				name:"",
				showdialog:false,
			}
		},
		methods:{
			address(){
				$('.vux-popup-mask').show()
			},
			back(){
				router.push('/withdraw')
				//document.write(https://zechang-360intelligent-user.oss-cn-shenzhen.aliyuncs.com/binNum.json)
			},
			next:function  () {
				const _this = this
				var x = _this.cardNum.replace(/\s+/g,"");
				console.log($('.kaihu .vux-cell-value').text())
				console.log(_this.idcode)
				axios.post(api + '/user/wallet/bindBankCard?bankPhone=' + _this.phoneNum + '&bankCard=' + x + '&validCode=' + _this.idcode + '&realName=' + _this.name +'&sourceBank=' + $('.kaihu .vux-cell-value').text() + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res.data)
					if (res.data.code === 0) {
						_this.errorStatus = true
						_this.errorMsg = '绑定成功'
						setTimeout(function  () {
							router.push('/withdraw')
						},1000)
					} else{
						_this.errorStatus = true
					_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
				})
			},
			//获取储蓄卡支行
			/*/baseconfig/getAreaSubbranch   
			传入参数 参数类型 必需 描述
			areaCode String Y 市区代码
			areaCodeProvince String Y 省区代码
			cardNo String Y 储蓄卡号
			传出参数   
			id long  ID
			bankName String  支行名称*/
			fen:function  () {
				const _this = this
				$('div.v-transfer-dom:nth-of-type(3)').hide()
				if ($('.address .vux-popup-picker-placeholder').text().trim()!="请选择") {
					_this.fenHang=[[]]
					var x = _this.cardNum.replace(/\s+/g,"");
					var y = _this.value[1].replace(/0*$/g,'')
					var z = _this.value[0].replace(/0*$/g,'')
					console.log(y)
					console.log(z)
					axios.post(api + '/baseconfig/getAreaSubbranch?areaCode=' + y + '&areaCodeProvince=' + z + '&cardNo=' + x  + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
						_this.loading = false
						console.log(res.data)
						if (res.data.code === 0) {
							if (res.data.data.length==0) {
								_this.showdialog = true
								$('.vux-popup-mask').hide()
								$('div.v-transfer-dom:nth-of-type(3)').hide()
							} else{
								$('.vux-popup-mask').show()
								$('div.v-transfer-dom:nth-of-type(3)').show()
							}
							for (let q = 0;q<res.data.data.length;q++) {
								_this.fenHang[0].push(res.data.data[q].bankName)
							}
						}else{
							_this.errorStatus = true
							_this.errorMsg = res.data.msg
						}
			          	if (res.data.code === 110) {router.push('/login')}
					})
				}
			},
			//重新发送验证码
			restart:function  () {
				let _this = this;
				var base = base64.encode(_this.phoneNum.substring(_this.phoneNum.length-4));
	        		var basestr =  base.substring(base.length-4);
	        		//alert(base)
	       			 var stringA='appVersion=1.0.0'+'&osType=ANDRIOD'+'&phone=' + _this.phoneNum + '&token=' + localStorage.getItem('token')+ '&uid=' + localStorage.getItem('uid') + '&valid=0&version=1.0.0';
					var stringSignTemp=stringA+basestr;
					var sign=MD5(stringSignTemp).toUpperCase();
				if (_this.phoneNum.length == 11) {
					axios.post(api + '/user/wallet/sendValidCode?phone=' + _this.phoneNum + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM+'&sign=' + sign).then(function (res) {
						_this.loading = false
						console.log(res.data);
						console.log(_this.phoneNum);
						if (res.data.code === 0) {
							_this.errorStatus = true
							_this.errorMsg = '验证码发送成功'
							document.getElementById("sss").style.display = "inline-block"
							document.getElementById("bbb").style.display = "none"
							let i =59;
							_this.s = 60
							let out	= setInterval(function  () {
								_this.s=i;i--
								if (i==-1) {
									_this.s = ""
									document.getElementById("sss").style.display = "none"
									document.getElementById("bbb").style.display = "inline-block"
									clearInterval(out)
								}
							},1000)
						}else{
							_this.errorStatus = true
							_this.errorMsg = res.data.msg
						}
					})
				} else{
					_this.errorStatus = true
					_this.errorMsg = '请输入正确的手机号'
				}
				
			},
		},
		created(){
			let _this = this
			console.log(_this.bankName)
			
			axios.post(api + '/user/real/info?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log(res.data)
				if (res.data.code === 0) { 
					_this.name = res.data.data.realName
				}
	          	if (res.data.code === 110) {router.push('/login')}
			})
		},
		updated(){
			//判断提交按钮可以点击
			const _this = this;
			if (_this.phoneNum !== ''&&_this.cardNum !== ''&&_this.bankName !== ''&&_this.idcode !== ''&&_this.value !== ''&&$('.kaihu .vux-popup-picker-value').text()!="请选择") {
				_this.XB = false;
			}else{
				_this.XB=true;
			}
			if ($('.address .vux-cell-value').text()!="请选择") {
				$('.address .vux-cell-value').attr("style","color: #000 !important;")
			} else{
				$('.address .vux-cell-value').attr("style","color: #999999;")
			}
			if ($('.kaihu .vux-cell-value').text()!="请选择") {
				$('.kaihu .vux-cell-value').attr("style","color: #000 !important;")
			} else{
				$('.kaihu .vux-cell-value').attr("style","color: #999999;")
			}
			if (_this.bankName!="未知银行") {
				$('.banknameee .weui-cell__ft').attr("style","color: #000 !important;")
			} else{
				$('.banknameee .weui-cell__ft').attr("style","color: #999999 !important;")
			}
			var c = _this.cardNum.replace(/\s+/g,"");
			for (let b = 0;b<bin.length;b++) {
				if (c.length>5) {
					if (c == bin[b].bin) {
						_this.bankName = bin[b].bankName.replace(/-.*/g,'')
					}
				} else{
					_this.bankName = "未知银行"
				}
			}
		},
		mounted(){
			
		}
	}
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.nextcard{
		margin-top: 5rem;
		text-align: center;
		.XB{
		width: 90%;
		}
	}
	.sccountinfo{
		span{
			white-space: pre-wrap !important;
		}
		.vux-cell-box:not(:first-child):before{
			border-top: none !important;
		}
		.weui-input {
    position: relative;
    left: 0 !important;
}
	}
	.idcardbutton{
		width: 107px;
		padding-top: 0.5rem;
		position: relative;
		top: -2.8rem;
		float: right;
		border: none !important;
		.idcardbuttonA{
			color: #DC5152;
			padding-left: 0.8rem;
			&:hover{
				cursor: pointer;
			}
		}
	}
	.weui-dialog{
		margin-top: 12rem !important;
		border-radius: 15px !important;
	}
	.weui-dialog__bd{
		min-height: 10px !important;
	}
	.weui-dialog__ft{
		a{
			color: #016BFF !important; 
			&:hover{
				background: #DEDEDE;
			}
		}
	}
	
	.weui-icon-clear{
		margin-right: 1.5rem;
	}
	.a *{
		border: none !important;
	}
	#sss{
		float: right;position: relative;top: 0;font-size: 14px;color: #D84C29;left: 12px;
		padding: 0.3rem;width: 120px;text-align: center;display: none;border-left: 1px solid #999999;
	}
	#bbb{
		float: right;position: relative;top: 0;left:10px;font-size: 14px;color: #D84C29 !important;display: inline-block;padding: 0.3em;width: 120px;text-align: center;
		border-left: 1px solid #999999;
	}
	.rrr{
		.name{
			.weui-cell__ft{
				color: #000 !important; 
			}
		}
	}
	.banknameee .weui-cell__ft{
		color: #999999 !important;
	}
	.iphoneNo{
		.weui-input {
    position: relative;
    left: 0 !important;
}
	}
	.address .vux-cell-box:after{
	    content: " ";
	    position: absolute;
	    left: 0;
	    top: 50px;
	    right: 0;
	    height: 1px;
	    border-bottom: 1px solid #D9D9D9;
	    color: #D9D9D9;
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    -webkit-transform: scaleY(0.5);
	    transform: scaleY(0.5);
	    left: 15px;
	}
</style>
				