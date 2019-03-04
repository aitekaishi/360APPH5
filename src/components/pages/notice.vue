<template>
	<div class="noticeindex" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;position: relative;background: #FFF;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">消息</x-header>
		<a @click="readered" style="color: #FFF;text-decoration: underline;position: absolute;top: 15px;z-index: 10000;right: 15px;cursor: pointer;">全部已读</a>
		<div v-show="nomessage" style="height: 10px;background: #FFF;"></div>
		<div class="nomessage" v-show="nomessage">
			暂无数据~
		</div>
		<div style="height: 7px;background: #F8F8F8;"></div>
		<div id="scrollnotice">
			<ul>
				<li class="noticea" v-for="notice in noticelist" :key="notice.id" @click="noticelista(notice.id)">
					<img src="../../assets/index/Group 430.png"/>
					<p id="title" :class="{onep:true,coloraaaa:!notice.state}">{{notice.title}}</p>
					<p class="twop">{{notice.description}}</p>
					<img class="imga" v-show=!notice.state src="../../assets/index/xuanzong.png" style="width: 13px;position: relative;top: -45px;left: -10px;"/>
					<p class="threep">{{notice.createTime}}</p>
				</li>
			</ul>
		</div>
		<div class="emptybill" v-show="empty">
  			<div style="height: 100px;"></div>
    		<img src="../../assets/zhanwushuju.png" alt="历史账单" /><br /><br />
    		<p>暂无记录</p>
		</div>
		<!--<div style="position: absolute;bottom: 0;text-align: center;width: 100vw;" v-show = nomessage>没有更多了~</div>-->
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
				noticelist:[
					/*{id:1,title:'555555555555555555555555555',state:1,content:'我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:1,content:'我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:0,content:'我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:1,content:'我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:1,content:'我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:0,content:'我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},{id:1,title:'555555555555555555555555555',state:1,content:'我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:1,content:'我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'},
					{id:1,title:'555555555555555555555555555',state:0,content:'我爱你你i1ni1我爱你我爱你',createTime:'2018-6-7:12:00'}
				*/
				],
				weidu:true,
				nomessage:false,
				morea:false,
				empty:false,
			}
		},
		methods: {
			readered(){
				let _this = this
				axios.get(api + '/message/read/all?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
					console.log("全部已读")
					_this.loading = false
			        console.log(response.data)
			        if (response.data.code === 0) {
			        	axios.get(api + '/message/page?type=1'+ '&pageNo=' + 1 + "&pageSize="+ 1000000000 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
			        		console.log("用户消息列表2")
					        console.log(response.data)
					        if (response.data.code === 0) {
					        	if (response.data.data.length == 0) {
					        		//_this.nomessage = true
					        	}else if (response.data.data.length > 0) {
					        		_this.noticelist = response.data.data
					        	}
					        }
					        if (response.data.code === 110) {
					        	router.push('/login')
					        }
					    })
			        }
			        if (response.data.code === 110) {
			        	router.push('/login')
			        }
			    })
			},			
			back(){
				router.push('/')
			},
			noticelista(id){
				let _this = this
				localStorage.setItem("noticeid",id)
				axios.get(api + '/message/read?id='+ id + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		      	console.log("用户消息列表1")
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	if (response.data.data.length == 0) {
		        		//_this.nomessage = true
		        	}else if (response.data.data.length > 0) {
		        		_this.noticelist = response.data.data
		        	}
		        }
		        if (response.data.code === 110) {
		        	router.push('/login')
		        }
	      	})
				router.push('/noticelist')
			}
		},
		created() {
		  	let _this = this
	      	axios.get(api + '/message/page?type=1'+ '&pageNo=' + 1 + "&pageSize="+ 1000000000 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		      	console.log("用户消息列表1")
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
	.coloraaaa{
		color: #000 !important;
	}
	.noticea{
		border: none !important;
		padding: 15px;
		margin-top: 2px;
		background: #FFF !important;
		height: 60px !important;
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
			left: 25px;
		}
		.twop{
			font-size: 12px !important;
			position: relative;
			left: 25px;
			top: 15px;
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
			top: -40px;
			font-size: 12px;
    		transform: scale(0.8);
		}
		#title{
			width: 45vw;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	@charset "utf-8";
.nomessage{
	position: absolute;color: #999999;font-size: 20px;font-weight: 500;
	top: 50vh;
	margin-left: ~"calc(50% - 41px)" !important;
}
</style>