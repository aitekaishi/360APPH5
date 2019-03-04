<template>
	<div class="myinviteindex" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;position: relative;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: ''}">我的邀请</x-header>
		<img src="../../assets/invite/myinvite.png" style="width: 100%;height: 160px;margin-top: 10px;"/>
		<div>
			<div class="myinvitea">
				<p>已获得提成</p>
				<p>{{m1}}<span>元</span></p>
			</div>
			<div class="myinviteb">
				<p>已邀请好友</p>
				<p>{{m2}}人</p>
			</div>
		</div>
		<div id="myinvite">
			<div v-for="myinvite in invitelist" :key="myinvite.createTime" style="border-bottom: 1px solid #999999;margin: 20px;height: 88px;">
				<div style="text-align: left;">
					<b style="font-size: 14px;line-height: 28px;">{{myinvite.phone}}</b>
					<div style="font-size: 14px;color: #999999;line-height: 28px;">注册日期</div>
					<div style="font-size: 14px;color: #999999;line-height: 28px;">是否开通会员</div>
				</div>
				<div style="text-align: right;position: relative;top: -83px;">
					<b style="font-size: 14px;color: #7CCF7C;line-height: 28px;">已注册</b>
					<div style="font-size: 14px;color: #999999;line-height: 28px;">{{myinvite.createTime.substr(0,10)}}</div>
					<div style="font-size: 14px;color: #999999;line-height: 28px;">{{myinvite.level==1?"未开通":"已开通"}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { XButton, XHeader, Tabbar, TabbarItem, Group, XInput, Drawer, Loading,Toast,Badge,Marquee, MarqueeItem,Swiper,Cell} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	export default {
		components: { XButton, XHeader, Tabbar, TabbarItem, Group, XInput, Drawer, Loading,Toast,Badge ,Marquee, MarqueeItem,Swiper,Cell},
		data() {
			return {
				errorStatus: false,
				errorMsg: '',
				loading: false,
				m1:'',
				m2:'',
				invitelist:[]
			}
		},
		methods: {
			
		},
		created() {
			localStorage.setItem('invite',1)
			let _this = this;
			axios.get(api + '/user/invite/getMyInvite?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		       console.log(response.data.data)
		        if (response.data.code === 0) {
		        	if (response.data.data.invateIncome == 0) {
		        		_this.m1 = (response.data.data.invateIncome).toFixed(1)
		        		_this.m2 = response.data.data.invateRecord
		        	} else{
		        		_this.m1 = (response.data.data.invateIncome).toFixed(2)
		        		_this.m2 = response.data.data.invateRecord
		        	}
		        }
		        if (response.data.code === 110) {
		        	router.push('/login')
		        }
		    })
		    axios.get(api + '/user/invite/getMyInviteList?'+ '&pageNo=' + 1 + "&pageSize="+ 100000000 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	_this.invitelist = response.data.data.list
		        }
		        if (response.data.code === 110) {
		        	router.push('/login')
		        }
		    })
		},
		mounted () {
			
	  	},
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.myinvitea,.myinviteb{
		position: absolute;
		top: 105px;
		p:nth-of-type(1){
			color: #FFF;
			font-size: 12px;
		}
		p:nth-of-type(2){
			margin-top: 10px;
			color: #FFF;
			font-size: 20px;
			font-weight: 500;
			span{
				color: #FFF;
				font-size: 18px;
				display: inline-block;position: relative;
				top: -2px;
			}
		}
	}
	.myinvitea{
		left: 17vw;
	}
	.myinviteb{
		left: 65vw;
	}
</style>