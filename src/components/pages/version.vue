<template>
	<div class="versionindex" style="height: 100vh;overflow-x: hidden;width: 100vw;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">版本号</x-header>
		<div style="background: #FFF;position: relative;top: -20px;">
			<figure>
				<img src="../../assets/my/logo.png" style="width: 20%;"/>
				<p style="height: 10px;"></p>
				<p style="font-size: 20px;">360度车卡管家</p>
				<p style="color: #999999;">3.0.0</p>
				<p style="height: 30px;"></p>
			</figure>
		</div>
		<group class='version'>
			<cell @click.native="addpayment()" title="版本更新" v-model="paycard" is-link></cell>
		</group>
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
				paycard:"已经是最新版本"
			}
		},
		methods: {
			back(){
				router.push('/my')
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
		text-align: center;
		padding-top: 70px;
	}
	.version{
		position: relative;
		top: -20px;
		.weui-cell__ft{
			color: #999999 !important;
			font-size: 14px !important;
		}
	}
</style>