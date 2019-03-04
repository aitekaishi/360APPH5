<template>
	<div style="height: 100vh;width: 100vw;overflow-x: hidden;">
    <loading :show="loading"></loading>
	<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
	<!--<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">升级会员</x-header>-->
	<!--<div @load="fun" style="height: 50px;"></div>-->
	<!--<x-button style="background: #79C540;color: #FFF;" @click.native="confirm()">确认支付</x-button>-->
  </div>
</template>

<script>
	import { ViewBox, XHeader, Swiper, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge,XButton} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import MD5 from 'md5'
	export default {
    components: { ViewBox, XHeader, Swiper, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge,XButton},
		data() {
			return {
				loading:false,
				errorStatus: false,
        		errorMsg: '',
			}
		},
		methods: {
			confirm(){
				let _this = this;
				_this.loading = false;
				WeixinJSBridge.invoke(
			      'getBrandWCPayRequest', {
			        "appId":"wxc092d5b22e278ae2", 
			        "timeStamp":localStorage.getItem('shijian'),
			        "nonceStr":localStorage.getItem('suiji'), 
			        "package":"prepay_id="+localStorage.getItem('parid'),     
			        "signType":"MD5",      
			        "paySign":localStorage.getItem('sign')
			      },
			      function(res){
			      if(res.err_msg == "get_brand_wcpay_request:ok" ){
			       	_this.errorMsg = "支付成功"
					_this.errorStatus = true
					setTimeout(function  () {
						router.push('/my')
					},500)
			      } 
			      else{
			      	_this.errorMsg = "支付失败"
					_this.errorStatus = true
					setTimeout(function  () {
						router.push('/vip')
					},500)
			      }
			   	});
			},
		},
		created() {
			let _this = this
			var code = location.search.replace('?code=','').replace(/\&.*/,'')
			axios.post(api + '/pay/upgrade/order?amount=16800&payType=1&tradeType=JSAPI&code=' + code + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				if(res.data.code === 0) {
					localStorage.setItem('parid',res.data.data.prePayId)
					localStorage.setItem('suiji',MD5(Math.random()).toUpperCase())
					localStorage.setItem("shijian",parseInt(new Date().getTime()/1000).toString())
					var stringA="appId=wxc092d5b22e278ae2&nonceStr="+localStorage.getItem('suiji')+'&package='+("prepay_id="+localStorage.getItem('parid'))+"&signType=MD5&timeStamp="+localStorage.getItem('shijian'); 
					var stringSignTemp=stringA+"&key=ienid2983j9823n9f23kjWUEI12KI8HU" 
					var sign=MD5(stringSignTemp).toUpperCase()
					localStorage.setItem('sign',sign)
				}else{
					_this.errorMsg = res.data.msg;
					_this.errorStatus = true;
				}
		        if (res.data.code === 110) {
		            router.push('/login')
		        }
			})
		},
		mounted() {
			let _this = this;
			_this.loading = true;
        	setTimeout(this.confirm,5000)
 		},
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.col{
		background: #1AAD19 !important;
	}
</style>