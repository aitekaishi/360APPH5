<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;" class="rrr">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">商户入网-通道{{nex}}</x-header>
		</div>
		<div style="height: 5px;"></div>
		<div class="mycard" style="margin-left: 10px;">请选择储蓄卡信息</div>
		<div style="height: 5px;"></div>
		<div class="sccountinfoaaa" style="height: 230px;">
			<group>
				<cell class="name assa" title="姓名" v-model="username"></cell>
				<x-input class='assa' title='银行卡号' v-model="cardNum" placeholder="请填写" text-align="right" mask="9999 9999 9999 9999 9999" max=27></x-input>
				<cell class="banknameee assa" title="银行名称" v-model="bankName"></cell>
				<x-address class="address" title="开户行所在地" :list='listAddress'  hide-district=true v-model='value' placeholder="请选择" @click.native="addressa()"></x-address>
				<popup-picker class="kaihu" title="开户行名称" @click.native="fen()" @on-hide="xuanzhe" :data="fenHang" v-model="fenHangv" confirm-text="确定" placeholder="请选择"></popup-picker>
				<popup-picker style="display: none;" class="kaihu1" title="开户行名称" @click.native="fen()" @on-change="xuanzhe1" :data="fenHang1" v-model="fenHangv1" confirm-text="确定" placeholder="请选择"></popup-picker>
			</group>
		</div>
		<div style="height: 2rem; background: #FFF;"></div>
		<div class="iphoneNoaaa">
			<group>
				<x-input class='assa' title="预留手机号" type="number" v-model="phoneNum" text-align="right" placeholder="请输入银行预留号码" ></x-input>
				<x-input class="idcard" type="number" show-clear=true v-model="idcode"  placeholder="请输入验证码"></x-input>
			</group>
			<div class="idcardbutton">
				<div id="c">{{s}}s后重新发送</div>
    			<a id="d" @click="restart()" style="cursor: pointer;">获取验证码</a>
			</div>
		</div>
		<div class="nextcard">
    		<x-button class="XB" :disabled="XB" @click.native="next()"  :type="type">提交</x-button>
    </div>
    <div class="shanchushan shanchushana" v-show="aaaa" @click="shanchuaaa"><img src="../../../assets/shanchua.png"/></div>
    <div class="shanchushan shanchushanb" v-show="bbbb" @click="shanchuaab"><img src="../../../assets/shanchua.png"/></div>
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
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import bin from '../bin.json'
	import base64 from 'base-64'
	import MD5 from 'md5'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,Toast,Loading,Confirm,XDialog},
		data (){ 
			return {
				nex:'',
				username:'',
				show:false,
				XB:true,
				loading:false,
				errorStatus: false,
        		errorMsg: '',
				phoneNum:'',
				cardNum:'',//结算卡卡号
				bankName:"未知银行",//银行名称，可填
				idcode:'',//验证码
				listAddress:ChinaAddressV4Data,
				value: [],//开户所在地
				type:'warn',
				fenHang:[[]],
				fenHangv:['请选择'],
				fenHang1:[[]],
				fenHangv1:['请选择'],
				s:60,
				name:"",
				showdialog:false,
				aaaa:true,
				bbbb:true,
			}
		},
		methods:{
			/*绑定结算卡   
			/user/payment/submitSettleCard   
			传入参数 参数类型 必需 描述
			cardNo String Y 卡号
			phone String Y 预留手机号
			validCode String Y 验证码
			prov String Y 省划行政码
			city String Y 市划行政码
			provName String N 省名称
			cityName String N 市名称
			subbranchId String N 开户支行ID
			wayId Long Y 通道ID*/
			back(){
				console.log("fff")
				router.push('/QpayIndex')
			},
			shanchuaaa(){
				let _this = this;
				_this.cardNum = ''
				$('.shanchushana').attr('style','opacity: 0;')
			},
			shanchuaab(){
				let _this = this;
				_this.phoneNum = ''
				$('.shanchushanb').attr('style','opacity: 0;')
			},
			addressa(){
				$('.vux-popup-mask').show()
			},
			xuanzhe(){
				let _this = this;
				for (let q = 0;q<_this.fenHang[0].length;q++) {
					console.log(_this.fenHang[0][q])
					//alert(_this.fenHang[0][q] == $(".sccountinfoaaa .kaihu span").text())
					if (_this.fenHang[0][q] == $(".sccountinfoaaa .kaihu span").text()) {
						localStorage.setItem("subbranchId",_this.fenHang1[0][q]);
						console.log(_this.fenHang1[0][q])
					}
				}
				//alert(localStorage.getItem('subbranchId'))
			},
			/*绑定结算卡   
			/user/payment/submitSettleCard   
			传入参数 参数类型 必需 描述
			cardNo String Y 卡号
			phone String Y 预留手机号
			validCode String Y 验证码
			prov String Y 省划行政码
			city String Y 市划行政码
			provName String N 省名称
			cityName String N 市名称
			subbranchId String N 开户支行ID
			wayId Long Y 通道ID*/
			next:function  () {
				//cardNo,phone,validCode,prov,city,provName,cityName,subbranchId,wayId,uid,token,valid,osType,appVersion,version
			
				const _this = this
				var x = _this.cardNum.replace(/\s+/g,"");//卡号
				var y = _this.value[1].replace(/0*$/g,'');//市代码
				var z = _this.value[0].replace(/0*$/g,'');//省代码
				var a = localStorage.getItem("subbranchId");//支行ID
				var provName = $('.rrr .address span').text().split(/\s/g)[0];
				var cityName = $('.rrr .address span').text().split(/\s/g)[1];
				var basea = base64.encode(_this.phoneNum.substring(_this.phoneNum.length-4));
	        		var basestra =  basea.substring(basea.length-4);
	        		//alert(base)
	        		//["appVersion", "cardNo", "city", "cityName", "osType", "phone", "prov", "provName", "subbranchId", "token", "uid", "valid", "validCode", "version", "wayId"]
	       			 var stringAa='appVersion=1.0.0'+'&cardNo='+ x +'&city='+ y+'&cityName='+ cityName +'&osType=ANDRIOD'+'&phone=' + _this.phoneNum+'&prov='+ z +'&provName='+ provName+'&subbranchId='+ a  + '&token=' + localStorage.getItem('token')+ '&uid=' + localStorage.getItem('uid') + '&valid=0'+ '&validCode=' + _this.idcode+'&version=1.0.0'+ '&wayId=' + localStorage.getItem('wayId');
	       			//alert(stringAa)
					var stringSignTempa=stringAa+basestra;
					var signa=MD5(stringSignTempa).toUpperCase();
				console.log(localStorage.getItem("subbranchId"));
				console.log(_this.idcode)
				axios.post(api + '/user/payment/submitSettleCard?phone=' + _this.phoneNum + '&cardNo=' + x + '&validCode=' + _this.idcode + '&prov=' + _this.value[0].replace(/0*$/g,'') +'&city=' + _this.value[1].replace(/0*$/g,'')+ '&provName=' + provName + '&cityName=' + cityName + '&subbranchId=' + localStorage.getItem("subbranchId") + '&wayId=' + localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM+'&sign=' + signa).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
						_this.errorStatus = true
						_this.errorMsg = '绑定成功'
						setTimeout(function () {
							router.push('/QpayIndex')
						},1000)
					} else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {
		          		router.push('/login')
		          	}
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
				$('div.v-transfer-dom:nth-of-type(3)').hide()
				var provName = $('.rrr .address span').text().split(/\s/g)[0];
				var cityName = $('.rrr .address span').text().split(/\s/g)[1];
				console.log(provName)
				console.log(cityName)
				const _this = this
				if ($('.rrr .vux-popup-picker-placeholder').text().trim()!="请选择") {
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
			/*绑定结算卡发送验证码   
			/user/payment/sendValidCode   
			传入参数 参数类型 必需 描述
			phone String Y 预留手机号
			wayId Long Y 通道ID*/
			restart:function  () {
				let _this = this;
				var base = base64.encode(_this.phoneNum.substring(_this.phoneNum.length-4));
	        		var basestr =  base.substring(base.length-4);
	        		//alert(base)
	       			 var stringA='appVersion=1.0.0'+'&osType=ANDRIOD'+'&phone=' + _this.phoneNum + '&token=' + localStorage.getItem('token')+ '&uid=' + localStorage.getItem('uid') + '&valid=0&version=1.0.0'+ '&wayId=' + localStorage.getItem('wayId');
	       			 //alert(stringA)
					var stringSignTemp=stringA+basestr;
					var sign=MD5(stringSignTemp).toUpperCase();
					localStorage.setItem('lal',sign)
				if (_this.phoneNum.length == 11) {
					axios.post(api + '/user/payment/sendValidCode?phone=' + _this.phoneNum+ '&wayId=' + localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM+'&sign=' + sign).then(function (res) {
						_this.loading = false
						console.log(res.data);
						console.log(_this.phoneNum);
						if (res.data.code === 0) {
							_this.errorStatus = true
							_this.errorMsg = '验证码发送成功'
							document.getElementById("c").style.display = "inline-block"
							document.getElementById("d").style.display = "none"
							let i =59;
							_this.s = 60
							let out	= setInterval(function  () {
								_this.s=i;i--
								if (i==-1) {
									_this.s = ""
									document.getElementById("c").style.display = "none"
									document.getElementById("d").style.display = "inline-block"
									clearInterval(out)
								}
							},1000)
						}else{
							_this.errorStatus = true;
							_this.errorMsg = res.data.msg;
						}
					})
				} else{
					_this.errorStatus = true;
					_this.errorMsg = '请输入正确的手机号';
				}
				
			},
		},
		created(){
			let _this = this;
			_this.cardNum = localStorage.getItem('chuxukanum');
			_this.phoneNum = localStorage.getItem('shoujinum');
			_this.bankName = localStorage.getItem('yinghangname');
			if (_this.cardNum == '') {
				_this.aaaa = true;
				$('.shanchushana').attr('style','opacity: 0;')
				$('.sccountinfoaaa .weui-input').attr('style','position: relative;right: 0!important;text-align: right;')
			}
			if (_this.cardNum != '') {
				_this.aaaa = true;
				$('.shanchushana').attr('style','opacity: 1;')
				$('.sccountinfoaaa .weui-input').attr('style','position: relative;left: -30px!important;text-align: right;')
			};
			if (_this.phoneNum == '') {
				$('.shanchushanb').attr('style','opacity: 0;')
				_this.bbbb = true;
				$('.iphoneNoaaa .assa .weui-input').attr('style','position: relative;right: 0!important;text-align: right;')
			}
			if (_this.phoneNum != '') {
				_this.bbbb = true;
				$('.shanchushanb').attr('style','opacity: 1;')
				$('.iphoneNoaaa .assa .weui-input').attr('style','position: relative;left: -30px!important;text-align: right;')
			};
			console.log(['cardNo','phone','validCode','prov','city','provName','cityName','subbranchId','wayId','uid','token','valid','osType','appVersion','version'].sort())
			_this.username = localStorage.getItem('name');
			if (localStorage.getItem('wayId')==1) {
				_this.nex = "一";
			}else if (localStorage.getItem('wayId')==2) {
				_this.nex = "一";
			}
			else if (localStorage.getItem('wayId')==4) {
				_this.nex = "一";
			}
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
			if (_this.phoneNum.length == 12) {
						let e = _this.phoneNum
						_this.phoneNum = e.substr(0,(e.length-1))
					}
			if (_this.idcode.length == 7) {
						let e = _this.idcode
						_this.idcode = e.substr(0,(e.length-1))
					}
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
			if (_this.cardNum == '') {
				_this.aaaa = true;
				$('.shanchushana').attr('style','opacity: 0;')
				$('.sccountinfoaaa .weui-input').attr('style','position: relative;right: 0!important;text-align: right;')
			}
			if (_this.cardNum != '') {
				_this.aaaa = true;
				$('.shanchushana').attr('style','opacity: 1;')
				$('.sccountinfoaaa .weui-input').attr('style','position: relative;left: -30px!important;text-align: right;')
			};
			if (_this.phoneNum == '') {
				$('.shanchushanb').attr('style','opacity: 0;')
				_this.bbbb = true;
				$('.iphoneNoaaa .assa .weui-input').attr('style','position: relative;right: 0!important;text-align: right;')
			}
			if (_this.phoneNum != '') {
				_this.bbbb = true;
				$('.shanchushanb').attr('style','opacity: 1;')
				$('.iphoneNoaaa .assa .weui-input').attr('style','position: relative;left: -30px!important;text-align: right;')
			};
			
		},
		mounted(){
			
		}
	}
</script>
<style lang="less">
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.nextcard{
		margin-top: 5rem;
		text-align: center;
		.XB{
		width: 90%;
		}
	}
	.sccountinfoaaa{
		span{
			white-space: pre-wrap !important;
		}
		.vux-cell-box:not(:first-child):before{
			border-top: none !important;
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
	#c{
		float: right;position: relative;top: 0;font-size: 14px;color: #D84C29;left: 12px;
		padding: 0.3rem;width: 120px;text-align: center;display: none;border-left: 1px solid #999999;
	}
	#d{
		float: right;position: relative;top: 0;left:10px;font-size: 14px;color: #D84C29 !important;display: inline-block;padding: 0.3em;width: 120px;text-align: center;
		border-left: 1px solid #999999;
		
	}
	.banknameee .weui-cell__ft{
		color: #999999 !important; 
	}
	.rrr{
		.name{
			.weui-cell__ft{
				color: #000 !important; 
			}
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
	.shanchushan{
		float: right;
		position: relative;
	}
	.shanchushana{
		opacity: 0;
		top: -440px;
		right: 15px;
	}
	.shanchushanb{
		opacity: 0;
		top: -213px;
		left: 3px;
	}	
</style>
				