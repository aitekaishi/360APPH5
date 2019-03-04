<template>
	<div class="withsuccess" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<x-header :left-options="{showBack: false,backText: '',preventGoBack:true}" @on-click-back="back">提现成功</x-header>
		<figure>
			<img src="../../assets/wallet/success.png" style="width: 90px;"/>
			<div style="height: 5px;"></div>
			<p style="font-size: 20px;font-weight: 600;">提现成功</p>
			<div style="height: 10px;"></div>
			<p style="color: #999999;">预计3-5个工作日内到账</p>
			<x-button style="margin-top: 50px;" @click.native="changePassword" type="warn">完成</x-button>
		
		</figure>
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
			}
		},
		methods: {
			changePassword(){
				router.push('/withdraw')
			}
		},
		created() {
			
		},
		mounted () {
			
	  	},
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	figure{
		margin-top: 80px;
	}
</style>