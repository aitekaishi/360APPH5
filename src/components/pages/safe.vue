<template>
	<div class="safeindex" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">安全保障</x-header>
		<figure>
			<img src="../../assets/my/safe.png" style="width: 120px;"/>
			<div style="height: 5px;"></div>
			<p>合作伙伴-阳光保险集团</p>
			<div style="height: 5px;"></div>
			<a style="color: blue;text-decoration: underline;" href="https://mproperty.sinosig.com/mobile/daoshua/indexNew.html">立即购买</a>
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
		margin-top: 20px;
	}
	
</style>