<template>
  <div class="newbillindexa" style="height: 100vh;width: 100vw;overflow-x: hidden;">
    <loading :show="loading"></loading>
	<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
    <x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">快捷消费</x-header>
    <div style="padding: 15px 4vw;color: #999999;">请选择快捷消费通道</div>
    <div class="nameindex nameindexa" @click="peoplea" style="display: none;">
    	<div style="float: left;">
    		<p style="color: #FFF;">通道一(推荐)</p>
    		<div style="height: 8px;"></div>
    		<p style="font-size: 13px;color: #FFF;">交易时间段:{{timea}}</p>
    		<div style="height: 8px;"></div>
    		<p style="font-size: 13px;color: #FFF;">费率:{{feilva}}%+{{menerya}}元/笔</p>
    	</div>
    	<div style="float: right;">
    		<div style="height: 35px;"></div>
    		<div class="name"></div>
    		<div style="height: 26px;"></div>
    	</div>
    </div>
    <div style="color: #FFF;font-size: 12px;width: 50px;position: relative;top: -38px;left: 67vw;padding: 2px 7px;border-radius: 5px;border: 1px solid #FFF;display: none;" @click="wayfacea()">交易说明</div>
   
    <div class="nameindex nameindexb" @click="peopleb">
    	<div style="float: left;">
    		<p style="color: #FFF;">通道一(推荐)</p>
    		<div style="height: 8px;"></div>
    		<p style="font-size: 13px;color: #FFF;">交易时间段:{{timeb}}</p>
    		<div style="height: 8px;"></div>
    		<p style="font-size: 13px;color: #FFF;">费率:{{feilvb}}%+{{meneryb}}元/笔</p>
    	</div>
    	<div style="float: right;">
    		<div style="height: 35px;"></div>
    		<div class="name"></div>
    		<div style="height: 26px;"></div>
    	</div>
    </div>
    <div style="color: #FFF;font-size: 12px;width: 50px;position: relative;top: -38px;left: 67vw;padding: 2px 7px;border-radius: 5px;border: 1px solid #FFF;" @click="wayfaceb()">交易说明</div>
    
    <div class="nameindex nameindexc" @click="peoplec" style="display: none;">
    	<div style="float: left;">
    		<p style="color: #FFF;">通道三</p>
    		<div style="height: 8px;"></div>
    		<p style="font-size: 13px;color: #FFF;">交易时间段:{{timec}}</p>
    		<div style="height: 8px;"></div>
    		<p style="font-size: 13px;color: #FFF;">费率:{{feilvc}}%+{{meneryc}}元/笔</p>
    	</div>
    	<div style="float: right;">
    		<div style="height: 35px;"></div>
    		<div class="name"></div>
    		<div style="height: 26px;"></div>
    	</div>
    </div>
    <div style="color: #FFF;font-size: 12px;width: 50px;position: relative;top: -38px;left: 67vw;padding: 2px 7px;border-radius: 5px;border: 1px solid #FFF;display: none;" @click="wayfacec()">交易说明</div>
    <div class="mask" @click="mask" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: absolute;top: 0;left: 1px;display: none;"></div>
	<div class="mamama">
      <x-dialog v-model="showdialog" hide-on-blur=true>
        <div @click="showdialog = false,close=false" class="dialogindexaa" style="text-align: left;">
          	<h4 style="text-align: center;">快捷消费-通道{{name}}说明</h4>
        	<div style="height: 9px;"></div>
        	<div>
        		<h4 style="font-size: 15px;">支持银行</h4>
        		<p style="white-space: pre-wrap;font-size: 12px;">{{subBanks}}</p>
        	</div> 
        	<div style="height: 9px;"></div>
        	<div>
        		<h4 style="font-size: 15px;">手续费</h4>
        		<p style="white-space: pre-wrap;font-size: 12px;">{{rateFee}}</p>
        	</div>
        	<div style="height: 9px;"></div>
        	<div>
        		<h4 style="font-size: 15px;">最小交易金额</h4>
        		<p style="white-space: pre-wrap;font-size: 12px;">{{tradeTime}}</p>
        	</div>
        	<div style="height: 9px;"></div>
        	<div>
        		<h4 style="font-size: 15px;">到账时间</h4>
        		<p style="white-space: pre-wrap;font-size: 12px;">{{payTime}}</p>
        	</div> 
        </div>
        </x-dialog>
    </div>	
	<img id="close" v-show="close" @click="closea" src="../../../assets/guanbi.png" width="30px" style="position: fixed;top: 90vh;z-index: 100000 !important;display: inline-block;"/>
  </div>
</template>

<script>
  import {ViewBox, XHeader, Group, XInput, Cell, XButton, Toast,Tab, TabItem,Loading,XDialog} from 'vux'
  import api from '../../../components/other/api-url'
  import globalPM from '../../../components/other/global-parameter'
  import axios from 'axios'
  import MD5 from 'md5'
  import Cookies from 'js-cookie'
  import router from '../../../router/index'
  export default {
    components: {ViewBox, XHeader, Group, XInput, Cell, XButton, Toast,Tab, TabItem,Loading,XDialog},
    data () {
      return {
        loading:false,
			errorStatus: false,
        errorMsg: '',
        showdialog:false,
        close:false,
        content:'',
        /*timea:'',
        feilva:'',
        menerya:'',*/
        timeb:'',
        feilvb:'',
        meneryb:'',
        /*timec:'',
        feilvc:'',
        meneryc:'',*/
        name:'',
        subBanks:'',
        rateFee:'',
        tradeTime:'',
        payTime:'',
      }
    },
    methods: {
    	closea(){
				const _this = this;
				_this.showdialog = false;
				_this.close = false;
			},
	    back(){
	    		router.push('/')
	    },
    	peoplea(){
    		let _this = this
    		localStorage.setItem('wayId',localStorage.getItem('wayida'))
    		localStorage.setItem('minPayment',_this.minPaymenta)
    		localStorage.setItem('needSms',_this.needSmsa)
    		setTimeout(function  () {
    			router.push('/QpayIndex')
    		},500)
    	},
    	peopleb(){
    		let _this = this
    		localStorage.setItem('wayId',localStorage.getItem('wayidc'))
    		localStorage.setItem('minPayment',_this.minPaymentb)
    		localStorage.setItem('needSms',_this.needSmsb)
    		setTimeout(function  () {
    			router.push('/QpayIndex')
    		},500)
    	},
    	peoplec(){
    		let _this = this
    		localStorage.setItem('wayId',localStorage.getItem('wayidb'))
    		localStorage.setItem('minPayment',_this.minPaymentc)
    		localStorage.setItem('needSms',_this.needSmsc)
    		setTimeout(function  () {
    			router.push('/QpayIndex')
    		},500)
    	},
    	/*获取通道支持的银行列表   
			/user/repay/support/banks   
			传入参数 参数类型 必需 描述
			passWayId Long Y 通道ID*/
    	wayfacea(){
    		let _this = this
    		_this.loading = true
    		axios.get(api + '/user/payment/desc?passWayId=' + localStorage.getItem("wayida") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
    			_this.loading = false
		      	console.log("支持银行a")
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	_this.showdialog = true;
		          _this.close = true;
				 			_this.subBanks = response.data.data.subBanks
				 			_this.rateFee = response.data.data.rateFee
				 			_this.tradeTime = response.data.data.minAmount
				 			_this.payTime = response.data.data.payTime
				 			if (response.data.data.passWayId == 4) {
				 				_this.name = '一'
				 			} else if (response.data.data.passWayId == 1) {
				 				_this.name = '一'
				 			} else{
				 				_this.name = '一'
				 			}
		        }
		        else{
		        	_this.errorStatus = true
							_this.errorMsg = response.data.msg
		        }
		        if (response.data.code === 110) {
		          router.push('/login')
		        }
		    })
    	},
    	wayfaceb(){
    		let _this = this
    		_this.loading = true
    		axios.get(api + '/user/payment/desc?passWayId=' + localStorage.getItem("wayidc") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
    			_this.loading = false
		      	console.log("支持银行b")
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	_this.showdialog = true;
		          _this.close = true;
				 			_this.subBanks = response.data.data.subBanks
				 			_this.rateFee = response.data.data.rateFee
				 			_this.tradeTime = response.data.data.minAmount
				 			_this.payTime = response.data.data.payTime
				 			if (response.data.data.passWayId == 4) {
				 				_this.name = '一'
				 			} else if (response.data.data.passWayId == 1) {
				 				_this.name = '一'
				 			} else{
				 				_this.name = '一'
				 			}
		        }
		        else{
		        	_this.errorStatus = true
							_this.errorMsg = response.data.msg
		        }
		        if (response.data.code === 110) {
		          router.push('/login')
		        }
		    })
    	},
    	wayfacec(){
    		let _this = this
    		_this.loading = true
    		axios.get(api + '/user/payment/desc?passWayId=' + localStorage.getItem("wayidb") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
    			_this.loading = false
		      	console.log("支持银行c")
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	_this.showdialog = true;
		          _this.close = true;
				 			_this.subBanks = response.data.data.subBanks
				 			_this.rateFee = response.data.data.rateFee
				 			_this.tradeTime = response.data.data.minAmount
				 			_this.payTime = response.data.data.payTime
				 			if (response.data.data.passWayId == 4) {
				 				_this.name = '一'
				 			} else if (response.data.data.passWayId == 1) {
				 				_this.name = '一'
				 			} else{
				 				_this.name = '一'
				 			}
		        }
		        else{
		        	_this.errorStatus = true
							_this.errorMsg = response.data.msg
		        }
		        if (response.data.code === 110) {
		          router.push('/login')
		        }
		    })
    	},
    	mask(){
			console.log("mask")
			$(".cell-pay").hide('blind',{direction:'down'})
			$(".mask").hide('fade')
			if ($(".imga,.remove").hasClass("havea")) {
				$(".imga,.remove").addClass("havea")
			}else{
				$(".imga,.remove").addClass("havea")
			}
		},
    },
		/*获取通道列表   
		/user/payment/getPassWays   
		传入参数 参数类型 必需 描述
		传出参数   
		id long  通道ID
		passWayName string  通道名称
		passWayRate double  通道费率
		singleTradeRate double  单笔交易手续费 元
		tradeTime date  交易时间段
		needSmsCode Integer  是否需要非H5发送验证码 0、不需要 1、需要
		minPayment double  快捷支付最小金额（元）*/
    created(){
    	let _this = this;
    	axios.post(api + '/user/payment/getPassWays?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (response) {
    			_this.loading = false
		      	console.log("支持银行")
		        console.log(response.data)
		        if (response.data.code === 0) {
				 			/*localStorage.setItem("wayida",response.data.data[0].id)
				 			localStorage.setItem("wayidb",response.data.data[2].id)*/
				 			localStorage.setItem("wayidc",response.data.data[0].id)
				 			/*_this.timea = response.data.data[0].tradeTime
				 			_this.minPaymenta = response.data.data[0].minPayment
				 			_this.needSmsa = response.data.data[0].needSms
				 			_this.feilva = response.data.data[0].passWayRate
				 			_this.menerya = response.data.data[0].singleTradeRate*/
				 			_this.timeb = response.data.data[0].tradeTime
				 			_this.minPaymentb = response.data.data[0].minPayment
				 			_this.needSmsb = response.data.data[0].needSms
				 			_this.feilvb = response.data.data[0].passWayRate
				 			_this.meneryb = response.data.data[0].singleTradeRate
				 			/*_this.timec = response.data.data[1].tradeTime
				 			_this.minPaymentc = response.data.data[1].minPayment
				 			_this.needSmsc = response.data.data[1].needSms
				 			_this.feilvc = response.data.data[1].passWayRate
				 			_this.meneryc = response.data.data[1].singleTradeRate*/
		        }
		        if (response.data.code === 110) {
		        	 router.push('/login')
		        }
		    })
	},
}
</script>
<style lang="less">
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.newbillindexa {
		.nameindex{
			background-size: 100% 100%;
  		-moz-background-size: 100% 100%;
  		-webkit-background-size: 100% 100%;
			width:86vw;
			height:83px;
			margin:0 auto;
			padding:10px 20px 10px 10px;
			box-shadow: 2px 5px 20px #E7EAED;
			.name{
			    content: " ";
			    display: inline-block;
			    height: 10px;
			    width: 10px;
			    border-width: 2px 2px 0 0;
			    border-color: #FFF;
			    border-style: solid;
			    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
			    float: right;
			    top: 40px;
		    }
		}
		.nameindexa{
			background-image: url(../../../assets/invite/xxx.png);
		}
		.nameindexb{
			background-image: url(../../../assets/invite/xxx.png);
		}
		.nameindexc{
			background-image: url(../../../assets/invite/zzz.png);
		}
	}
	#close{
		left: ~"calc(50% - 15px)" !important;
	}
	.weui-dialog{
		width: 70% !important;
		max-width: 2000px !important;
		height: 60vh;
		padding:2rem;
		.dialogindexaa{
			height: 60vh !important;
			overflow-y: scroll;
		}
		.dialogindexaa::-webkit-scrollbar {
	        display: none;
	    }
	}
	#close{
		z-index: 100000 !important;
		display: inline-block;
		left: 49vw;
	}
</style>