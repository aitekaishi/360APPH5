<template>
	<div class="noticelistindex" style="height: 100vh;width:100vw;text-align: center;overflow-x: hidden;background: #FFF;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">消息详情</x-header>
		<div style="width: 100vw;height: 50vh;background: #FFF;padding: 15px;text-align: left;">
			<p style="font-size: 17px;">{{title}}</p>
			<p style="height: 10px;"></p>
			<p style="font-size: 12px;color: #999999;">{{createTime}}</p>
			<p style="height: 20px;"></p>
			<p style="white-space: pre-wrap !important;word-wrap:break-word;margin-right: 30px;font-size: 13px;">{{content}}</p>
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
				title:'',
				createTime:'',
				content:''
			}
		},
		methods: {
			back(){
				router.push('/notice')
			}
		},
		created() {
			let _this = this
			console.log(localStorage.getItem("noticeid"))
		      axios.get(api + '/message/page?type=1'+ '&pageNo=' + 1 + "&pageSize="+ 1000000000 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        _this.loading = false
		        if (response.data.code === 0) {
		        	for (let x = 0;x<response.data.data.length;x++) {
		        		if (localStorage.getItem('noticeid')==response.data.data[x].id) {
		        			_this.title = response.data.data[x].title
		        			_this.createTime = response.data.data[x].createTime
		        			_this.content = response.data.data[x].content
		        		}
		        	}
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
	figure{
		margin-top: 80px;
	}
</style>