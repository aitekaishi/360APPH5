<template>
	<div class="xxx" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<div class="loginaaa">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">提现详情</x-header>
    		<img src="../../assets/svg/-ionicons-svg-md-close.svg" @click="setting"/>
   		</div>
   		<div style="background: #FFF;height: 65vh;">
   			<div style="text-align: center;width: 80vw;margin: 0 auto;padding: 50px 0 40px 0;border-bottom: 1px solid #D9D9D9;">
   				<p style="font-size: 15px;">余额提现-{{bankname}}({{weihao}})</p>
   				<p style="font-size: 25px;">{{menory}}</p>
   			</div>
   			<div style="text-align: center;width: 80vw;margin: 0 auto;padding: 10px 0 0 0;">
   				<div style="float: left;text-align: left;">
   					<p style="color: #999999;line-height: 33px;">当前状态</p>
   					<p style="color: #999999;line-height: 33px;">提现金额</p>
   					<p style="color: #999999;line-height: 33px;">提交时间</p>
   					<p style="color: #999999;line-height: 33px;">到账时间</p>
   					<p style="color: #999999;line-height: 33px;">提现银行卡</p>
   					<p style="color: #999999;line-height: 33px;">提现单号</p>
   				</div>
   				<div style="float: right;text-align: right;">
   					<p v-show="statea" style="line-height: 33px;">待审核</p>
   					<p v-show="stateb" style="line-height: 33px;">审核通过</p>
   					<p v-show="statec" style="line-height: 33px;">未通过</p>
   					<p v-show="stated" style="line-height: 33px;">已打款</p>
   					<p style="line-height: 33px;">￥{{menory}}</p>
   					<p style="line-height: 33px;">{{time1}}</p>
   					<p style="line-height: 33px;">{{time2}}</p>
   					<p style="line-height: 33px;">{{bankname}}({{weihao}})</p>
   					<p style="line-height: 33px;">{{no}}</p>
   				</div>
   			</div>
   		</div>
	</div>
</template>

<script>
	import { ViewBox, XHeader, Swiper, Tabbar, TabbarItem,  Drawer, Loading,Toast,Badge,Group,Cell, Grid, GridItem,XInput,XButton} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import AvatarCropper from 'vue-avatar-cropper'
	import MD5 from 'md5'
	export default {
		components: { ViewBox, XHeader, Swiper, Tabbar, TabbarItem, Drawer, Loading,Toast,Badge ,Group,Cell,Grid, GridItem,AvatarCropper,XInput,XButton},
		data() {
			return {
				errorStatus: false,
				errorMsg: '',
				loading: false,
				bankname:'',
				weihao:'',
				menory:'',
				no:'',
				time1:'',
				time2:'',
				statea:false,
				stateb:false,
				statec:false,
				stated:false,
			}
		},
		methods: {
	      setting(){
	      	router.push("/withdrawbill")
	      },
		},
		created() {
			let _this = this
			axios.get(api + '/user/wallet/getWithDrawInfo?id=' + localStorage.getItem('idd') + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
	        console.log(response.data)
	        if (response.data.code === 0) {
	        	_this.bankname = response.data.data.bankName
	        	_this.weihao = response.data.data.bankCardEndCode
	        	_this.menory = (response.data.data.amount).toFixed(1)
	        	_this.no = response.data.data.orderNo
	        	_this.time1 = response.data.data.createTime
	        	_this.time2 = response.data.data.updateTime
	        	switch (response.data.data.state){
				case 1:
					_this.statea = true;
					_this.stateb = false;
					_this.statec = false;
					_this.stated = false;
					break;
				case 2:
					_this.statea = false;
					_this.stateb = true;
					_this.statec = false;
					_this.stated = false;
					break;
				case 3:
					_this.statea = false;
					_this.stateb = false;
					_this.statec = true;
					_this.stated = false;
					break;
				case 4:
					_this.statea = false;
					_this.stateb = false;
					_this.statec = false;
					_this.stated = true;
					break;
				default:
					break;
				}
	        }
	        else{
	        	_this.errorStatus = true
            	_this.errorMsg = response.data.msg
	        }
	        if (response.data.code === 110) {
	        	router.push('/login')
	        }
	      	}).catch(function () {
	
	      	})
		},
		updated(){
			
		},
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.loginaaa{
		text-align: center;
		img:nth-of-type(1){
			width: 25px;position: relative;z-index: 100000;float: left;margin-left: 10px; top:-33px;
		}
		.vux-header{
			.left-arrow:before{
				width: 0 !important;
				height: 0 !important;
				display: none !important; 
			}
		}
	}
</style>