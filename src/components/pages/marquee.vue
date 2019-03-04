<template>
	<div class="marqueeindex" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;position: relative;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">系统通知</x-header>
		<div style="height: 10px;background: #FFF;"></div>
		<div class="nomessage" v-show="nomessage">
			暂无通知~
		</div>
		<img class="zuixing" v-show="news" src="../../assets/index/zuixing.png"/>
		<div id="scrollnotice">
			<div class="noticeb" v-for="notice in noticelist" :key="notice.id">
				<p style="height: 10px;"></p>
				<p style="font-size: 12px;color: #000000;">{{notice.title}}</p>
				<div style="height: 15px;background: #FFF;"></div>
				<p style="font-size: 12px;white-space: pre-wrap;display: inline-block;text-align: left;word-wrap:break-word ;word-break:break-all;color: #000000;">{{notice.content}}</p>
				<div style="height: 40px;background: #FFF;"></div>
				<p style="font-size: 12px; text-align: right;margin-right: 10px;color: #000000;">--360度车卡管家</p>
				<p class="time" style="color: #999999; font-size: 12px;transform: scale(0.9);text-align: right;position: relative;left: 10px;">{{notice.createTime.substr(0,10)}}</p>
				<div style="height: 20px;background: #FFF;"></div>
			</div>
		</div>
		<div class="emptybill" v-show="empty">
  			<div style="height: 300px;"></div>
    		<img src="../../assets/zhanwushuju.png" alt="历史账单" /><br /><br />
    		<p>暂无记录</p>
		</div>
		<load-more v-show = "shuaxinga" class="shuaxing" :tip="tip"></load-more>
		<img @click="shuaxingc" v-show="shuaxing" style="position: fixed;bottom: 10px;width: 25px;right: 10px;z-index: 10000;" src="../../assets/svg/-ionicons-svg-md-refresh.svg"/>
		<p v-show="morea" style="position: fixed;bottom: 10px;text-align: center;width: 100vw;padding-left: 10px;">{{message}}</p>
	</div>
</template>

<script>
	import { LoadMore, XHeader, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge,Marquee, MarqueeItem,Swiper} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	export default {
		components: { LoadMore, XHeader, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge ,Marquee, MarqueeItem,Swiper},
		data() {
			return {
				errorStatus: false,
				errorMsg: '',
				loading: false,
				noticelist:[],
				weidu:true,
				//shuaxing:true,
				//shuaxinga:false,
				tip:"正在加载",
				message:'没有更多了~',
				nomessage:false,
				morea:false,
				news:true,
				empty:false,
				
			}
		},
		methods: {		
			back(){
				router.push('/')
			},
			shuaxingc(){
				let _this = this;
				_this.shuaxing = false
				//_this.shuaxinga = true
				_this.morea = false
				console.log(localStorage.getItem("pageSize"))
				setTimeout(function  () {
					_this.shuaxinga = false
					axios.get(api + '/message/page?type=2'+ '&pageNo=' + 1 + "&pageSize="+ 1000000 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
			        console.log(response.data)
			        _this.shuaxing = true
			        if (response.data.code === 0) {
			        	if (response.data.data.length < localStorage.getItem("pageSize")) {
			        		_this.message = "没有更多了~"
			        		_this.morea = true
			        		_this.shuaxing = false
			        	} else{
			        		_this.noticelist = response.data.data
			        		localStorage.setItem("pageSize",parseInt(localStorage.getItem("pageSize"))+4)
			        	}
			        }
			        if (response.data.code === 110) {
			        	router.push('/login')
			        }
			      })
				},1000)
			}
		},
		created() {
		  let _this = this
	      axios.get(api + '/message/page?type=2'+ '&pageNo=' + 1 + "&pageSize="+ 1000000 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
	        console.log(response.data)
	        if (response.data.code === 0) {
	        	if (response.data.data.length == 0) {
	        		_this.empty = true
	        	}else if (response.data.data.length > 0) {
	        		_this.empty = false
	        		_this.noticelist = response.data.data
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
	.color{
		color: #000 !important;
	}
	li{
		list-style: none;
	}
	.noticeb{
		border: none !important;
		padding: 3vw;
		width: 87vw;
		background: #FFF !important;
		margin: 15px auto;
		border-radius: 5px;
		padding-bottom: 0;
		img{
			width:50px;
			float: left;
			position: relative;
			top: 5px;
		}
		.onep{
			color: #999999;
			text-align: left;
			position: relative;
			left: 10px;
		}
		.twop{
			font-size: 13px !important;
			position: relative;
			left: 10px;
			top: 13px;
			color: #999999;
			text-overflow: ellipsis;
			overflow: hidden;
			padding-right: 5px;
			text-align: left;
		}
		.threep{
			float: right;
			color: #999999;
			position: relative;
			top: -45px;
		}
	}
	@charset "utf-8";

.shuaxing{
	position: fixed;
	bottom:  -12px;
	width: 100vw !important;
}
.nomessage{
	position: absolute;color: #999999;font-size: 20px;font-weight: 500;
	top: 50vh;
	margin-left: ~"calc(50% - 41px)" !important;
}
.zuixing{
	position: absolute;top: 70px;left: 3.5vw;
	width: 60px;
}
</style>