<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;" class="withdrawlistindex">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">商户入网</x-header>
		</div>
		<div style="height: 5px;"></div>
		<div class="mycard" style="margin-left: 10px;">请选择储蓄卡信息</div>
		<div style="height: 5px;"></div>
		<div class="sccountinfo" style="height: 250px;">
			<group>
				<cell class='assa' title="姓名" v-model="name"></cell>
				<x-input class='assa' title='银行卡号' v-model="cardNum" placeholder="请填写" text-align="right" mask="9999 9999 9999 9999 9999" max=27></x-input>
				<cell class="banknamee assa" title="银行名称" v-model="bankName"></cell>
				<x-address class="address" title="开户行所在地" :list='listAddress' :value='value' hide-district=true v-model='value' placeholder="请选择" @click.native="address()"></x-address>
				<popup-picker class="kaihu" title="开户行名称" @click.native="fen()" @on-hide="xuanzhe" :data="fenHang" v-model="fenHangv" confirm-text="确定" placeholder="请选择"></popup-picker>
				<popup-picker style="display: none;" class="kaihu1" title="开户行名称" @click.native="fen()" @on-change="xuanzhe1" :data="fenHang1" v-model="fenHangv1" confirm-text="确定" placeholder="请选择"></popup-picker>
			</group>
		</div>
		<div class="iphoneNo" style="position: relative;top: 1rem;">
			<group>
				<x-input type='number' class='assa' title="预留手机号" v-model="phoneNum" text-align="right" max=11 placeholder="请输入银行预留号码" mask='99999999999'></x-input>
				<x-input type='number' class="idcard" show-clear=true mask='999999' max=6 v-model="idcode"  placeholder="请输入验证码"></x-input>
			</group>
			<div class="idcardbutton">
				<div id="ccc">{{s}}s后重新发送</div>
    			<a id="dddd" @click="restart()" style="cursor: pointer;">获取验证码</a>
			</div>
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
		<div class="nextcard">
    		<x-button class="XB" :disabled="XB" @click.native="next()"  :type="type">提交</x-button>
    	</div>
    	<div style="width: 100vw;font-size: 12px;text-align: left;word-break: keep-all;color: #999999;padding-left: 5vw;position: relative;top: -95px;">说明:此操作是为了保证消费的真实性，对代还功能没有影响</div>
		<p>{{fenhangID}}</p>
	</div>
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
				bankName:"",//银行名称，可填
				idcode:'',//验证码
				listAddress:ChinaAddressV4Data,
				value: [],//开户所在地
				type:'warn',
				fenHang:[[]],
				fenHang1:[[]],
				fenHangv:['请选择'],
				fenHangv1:['请选择'],
				s:60,
				name:"",
				fenhangID:'',
				showdialog:false,
			}
		},
		methods:{
			address(){
				$('.vux-popup-mask').show()
			},
			back(){
				router.push('/newbill')
				//document.write(https://zechang-360intelligent-user.oss-cn-shenzhen.aliyuncs.com/binNum.json)
			},
			/*商户提交入网信息   
			/user/repay/submitNetIn   
			传入参数 参数类型 必需 描述
			bankCard string  卡号
			prov string  省行政划编码
			provName string  省名称
			city string  市行政划编码
			cityName string  市名称
			userBankPhone string  银行预留手机号
			validCode string  手机验证码
			subbranchId string  支行ID*/
			next:function  () {
				const _this = this
				var x = _this.cardNum.replace(/\s+/g,"");//卡号
				var y = _this.value[1].replace(/0*$/g,'');//市代码
				var z = _this.value[0].replace(/0*$/g,'');//省代码
				var a = localStorage.getItem("subbranchId");//支行ID
				var provName = $('.withdrawlistindex .address span').text().split(/\s/g)[0];
				var cityName = $('.withdrawlistindex .address span').text().split(/\s/g)[1];
				console.log(localStorage.getItem("subbranchId"));
				console.log(_this.idcode)
				if (localStorage.getItem('tongdaoid')==5) {
					axios.post(api + '/user/repay/jxdk/submitNetIn?userBankPhone=' + _this.phoneNum + '&bankCard=' + x + '&prov=' + z  + '&provName=' + provName  + '&city=' + y  + '&cityName=' + cityName  + '&subbranchId=' + localStorage.getItem("subbranchId") + '&validCode=' + _this.idcode + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res.data)
					if (res.data.code === 0) {
						_this.errorStatus = true
						_this.errorMsg = '商户入网成功'
						setTimeout(function  () {
							router.push('/cardlist')
						},1000)
					} else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
				})
				} else{
					axios.post(api + '/user/repay/submitNetIn?userBankPhone=' + _this.phoneNum + '&bankCard=' + x + '&prov=' + z  + '&provName=' + provName  + '&city=' + y  + '&cityName=' + cityName  + '&subbranchId=' + localStorage.getItem("subbranchId") + '&validCode=' + _this.idcode + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res.data)
					if (res.data.code === 0) {
						_this.errorStatus = true
						_this.errorMsg = '商户入网成功'
						setTimeout(function  () {
							router.push('/cardlist')
						},1000)
					} else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
				})
				}
				
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
				$('div.v-transfer-dom:nth-of-type(3)').hide()
				var provName = $('.withdrawlistindex .address span').text().split(/\s/g)[0];
				var cityName = $('.withdrawlistindex .address span').text().split(/\s/g)[1];
				console.log(provName)
				console.log(cityName)
				const _this = this
				if ($('.withdrawlistindex .vux-popup-picker-placeholder').text().trim()!="请选择") {
					_this.loading = true
					_this.fenHang=[[]]
					_this.fenHang1=[[]]
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
								_this.fenHang1[0].push(res.data.data[q].id)
							}
						}else{
							_this.errorStatus = true
							_this.errorMsg = res.data.msg
						}
			          	if (res.data.code === 110) {router.push('/login')}
					})
				}
			},
			xuanzhe(){
				let _this = this;
				console.log(_this.fenHang1[0])
				for (let q = 0;q<_this.fenHang[0].length;q++) {
					//alert(_this.fenHang[0][q] == $(".sccountinfo .kaihu span").text())
					if (_this.fenHang[0][q] == $(".sccountinfo .kaihu span").text()) {
						localStorage.setItem("subbranchId",_this.fenHang1[0][q]);
					}
				}
				//alert(localStorage.getItem('subbranchId'))
			},
			//重新发送验证码
			restart:function  () {
				let _this = this;
				if (_this.phoneNum.length == 11) {
					var base = base64.encode(_this.phoneNum.substring(_this.phoneNum.length-4));
	        		var basestr =  base.substring(base.length-4);
	        		//alert(base)
	       			 var stringA='appVersion=1.0.0'+'&osType=ANDRIOD'+'&phone=' + _this.phoneNum + '&token=' + localStorage.getItem('token')+ '&type=1'+ '&uid=' + localStorage.getItem('uid') + '&valid=0&version=1.0.0';
					var stringSignTemp=stringA+basestr;
					var sign=MD5(stringSignTemp).toUpperCase();
					_this.loading = true
					if (localStorage.getItem('tongdaoid')==5) {
						axios.post(api + '/user/repay/jxdk/sendValidCode?phone=' + _this.phoneNum + '&type=1' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM+'&sign=' + sign).then(function (res) {
							_this.loading = false
							console.log(res.data);
							if (res.data.code === 0) {
								_this.errorStatus = true;
								_this.errorMsg = '验证码发送成功';
								document.getElementById("ccc").style.display = "inline-block"
								document.getElementById("dddd").style.display = "none"
								let i =59;
								_this.s = 60
								let out	= setInterval(function  () {
									_this.s=i;i--
									if (i==-1) {
										_this.s = ""
										document.getElementById("ccc").style.display = "none"
										document.getElementById("dddd").style.display = "inline-block"
										clearInterval(out)
									}
								},1000)
							}else{
								_this.errorStatus = true
								_this.errorMsg = res.data.msg
							}
						})
					} else{
						axios.post(api + '/user/repay/sendValidCode?phone=' + _this.phoneNum + '&type=1' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM+'&sign=' + sign).then(function (res) {
							_this.loading = false
							console.log(res.data);
							if (res.data.code === 0) {
								_this.errorStatus = true;
								_this.errorMsg = '验证码发送成功';
								document.getElementById("ccc").style.display = "inline-block"
								document.getElementById("dddd").style.display = "none"
								let i =59;
								_this.s = 60
								let out	= setInterval(function  () {
									_this.s=i;i--
									if (i==-1) {
										_this.s = ""
										document.getElementById("ccc").style.display = "none"
										document.getElementById("dddd").style.display = "inline-block"
										clearInterval(out)
									}
								},1000)
							}else{
								_this.errorStatus = true
								_this.errorMsg = res.data.msg
							}
						})
					}
					
				} else{
					_this.errorStatus = true
					_this.errorMsg = '请输入正确的手机号'
				}
				
			},
		},
		created(){
			console.log($('.banknamee .weui-cell__ft').text())
			let _this = this
			axios.post(api + '/user/real/info?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log(res.data)
				if (res.data.code === 0) { 
					_this.name = res.data.data.realName
				}
	          	if (res.data.code === 110) {router.push('/login')}
			})
			/*axios.post(api + '/user/repay/jxdk/getPreInputBankCard?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log(res.data)
				if (res.data.code === 0) { 
					_this.name = res.data.data.realName
				}
	          	if (res.data.code === 110) {router.push('/login')}
			})*/
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
				$('.banknamee .weui-cell__ft').attr("style","color: #000 !important;")
			} else{
				$('.banknamee .weui-cell__ft').attr("style","color: #999999 !important;")
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
		margin-top: -1.2rem;
		span{
			white-space: pre-wrap !important;
		}
	}
	.idcardbutton{
		width: 120px;
		padding-top: 0.5rem;
		position: relative;
		top: -2.8rem;
		float: right;
		border-left: 1px solid #DBDBDB;
		.idcardbuttonA{
			color: #DC5152;
			padding-left: 0.8rem;
			border-left: 1px solid #A9A9A9;
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
	#ccc{
		float: right;position: relative;top: 0;font-size: 14px;color: #D84C29;left: 12px;
		padding: 0.3rem;width: 120px;text-align: center;display: none;border-left: 1px solid #999999;
	}
	#dddd{
		float: right;position: relative;top: 0;left:10px;font-size: 14px;color: #D84C29 !important;display: inline-block;padding: 0.3em;width: 120px;text-align: center;
		border-left: 1px solid #999999;
		
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
				