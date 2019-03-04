<template>
	<div class="index" style="text-align: center;width: 100vw;background: #F8F8F8;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="bell">
    		<img @click="notice" src="../../assets/index/notice.png" style="width: 25px;float: left;cursor: pointer;"/>
    		<badge :text="badge" class="badge" v-show="badgeshow"></badge>
    		<img src="../../assets/svg/erji1.svg" style="width: 25px; float: right;" @click="kefu"/>
    		<div style="height: 80px;"></div>
    		<div class="bella">
    			<div style="margin-top: 2px;" @click="bill">
	    			<img src="../../assets/index/zhinenghuankuang.png"/>
	    			<p style="height: 5px;"></p>
	    			<p>账单分期</p>
	    		</div>
	    		<div @click="kuaijie">
	    			<img src="../../assets/index/kuaijiezhifu.png"/>
	    			<p>快捷消费</p>
	    		</div>
    		</div>
    	</div>
    	<div class="bellb">
    		<div style="height: 10px;"></div>
    		<img src="../../assets/svg/laba.svg" style="top: 10px;"/>
    		<marquee>
		       <marquee-item v-for="x in liupan" :key="x" @click.native="marquee" interval=3000>{{x}}</marquee-item>
		    </marquee>
    	</div>
    	<swiper :list="imgList" :aspect-ratio="400/800" dots-position="center" auto></swiper>
    	<div style="height: 50px;"></div>
    	<div style="float: left;font-weight: 800;font-size: 14px;height: 40px;">
    		<span style="width: 6px;height: 16px;background: #ED5342;display: inline-block;margin-left: 5vw;"></span>
    		&nbsp;更多功能
    	</div>
    	<div style="height: 25px;"></div>
    	<div class="moreindex">
    		<div class="carindex haha" @click="index(3)">
    			<div style="height: 10px;"></div>
    			<p style="position: relative;text-align: left;left: -70px;">车务查询<br /></p>
    			<span style="text-align: left;display: block;position: relative;left: 3vw;">足不出户,全国代办</span>
    			<img style="float: right;margin-right: 15px;margin-top: 10px;" src="../../assets/index/car.png"/>
    		</div>
    		<div @click="index(5)" class="pointindex haha">
    			<div style="height: 10px;"></div>
    			<p style="position: relative;text-align: left;left: 5vw;">积分兑换<br /></p>
    			<span style="text-align: left;display: block;position: relative;left: 3vw;">变废为宝,直接变现</span>
    			<img style="float: right;margin-right: 10px;position: relative;top: -5px;" src="../../assets/index/point.png"/>
    		</div>
    		<div class="rightindex">
    			<div class="life"  @click="index(4)">
    				<div style="height: 10px;"></div>
    				<p>信用生活</p>
	    			<span>生活更便捷</span>
	    			<img src="../../assets/index/life.png"/>
	    		</div>
	    		<div class="help" @click="help()">
	    			<div style="height: 10px;"></div>
	    			<p>帮助中心</p>
	    			<span>哪里有疑问?</span>
	    			<img src="../../assets/index/help.png"/>
	    		</div>
	    		<div class="work" @click="hezuo">
	    			<div style="height: 10px;"></div>
	    			<p>申请合作</p>
	    			<span>成为合伙人</span>
	    			<img style="top: -10px;" src="../../assets/index/hezuo.png"/>
	    		</div>
    		</div>
    	</div>
    	<div style="text-align: center;padding: 10px 0;">
    		<p class="liupana" style="width: 165px;margin: 0 auto;font-size: 12px !important;color: #999999;">全国服务热线：400-8953-360</p>
    		<p style="width: 130px;margin: 0 auto;font-size: 12px !important;color: #999999;">服务时间：09:00-18:00</p>
    	</div>
    	<div style="height: 50px;"></div>
		<tabbar>
	      	<tabbar-item>
		        <img slot="icon" src="../../assets/index/indexb.png">
		        <span slot="label">首页</span>
	     	</tabbar-item>
		    <tabbar-item link="/invite">
		        <img slot="icon" src="../../assets/index/invitea.png">
	        	<span slot="label">邀请</span>
	      	</tabbar-item>
	      	<tabbar-item link="/wallet">
	        	<img slot="icon" src="../../assets/index/walleta.png">
	        	<span slot="label">钱包</span>
	     	</tabbar-item>
	      	<tabbar-item link="/my">
	        	<img slot="icon" src="../../assets/index/mya.png">
	        	<span slot="label">我的</span>
	      	</tabbar-item>
    	</tabbar>
    	<div class="mamama">
      <x-dialog v-model="showdialog" hide-on-blur=true>
        <div @click="showdialog = false,close=false" class="dialogindex" style="text-align: left;">
        	<h4 style="text-align: center;color: #D84C29;">温馨提示</h4>
        	<div style="height: 10px;"></div>
        	<div style="height: 2px;background: #D84C29;"></div>
        	<div style="height: 15px;"></div>
        	<p style="white-space: pre-wrap;">为了保障您的账户安全，请完善实名认证</p>
        	<div style="height: 30px;"></div>
        	<x-button style='border-radius: 5px;width: 35vw !important;height: 40px !important;background: #C1272D !important;padding: 0 !important;' type="warn" @click.native="closea">去实名认证</x-button>
        </div>
        </x-dialog>
    </div>	
    	<masker v-show="mask" style="height: 100vh;position: absolute;top: 0;left: 0;width: 100vw;z-index: 1001;" color="000" :opacity="0.6"></masker>
	</div>
</template>

<script>
	import { Masker, XHeader, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge,Marquee, MarqueeItem,Swiper,XDialog,XButton} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import '../../../static/js/dropload.js'
	import MD5 from 'md5'
	export default {
		components: { Masker, XHeader, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge ,Marquee, MarqueeItem,Swiper,XDialog,XButton},
		data() {
			return {
				errorStatus: false,
				errorMsg: '',
				loading: false,
				badge:'',
				badgeshow:false,
				liupan:[],
				imgList:[],
				mask:false,
				showdialog:false,
			}
		},
		methods: {
			getImage(){
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p){
					plus.io.resolveLocalFileSystemURL(p, function(entry){
						}, function(e){
					});
				}, function(e){
				}, {filename:'_doc/camera/',index:1});
			},
			closea(){
				router.push("/face")
			},
			bill(){
				const _this = this
				axios.post(api + '/user/real/state?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
	              _this.loading = false
	              console.log("判断实名认证")
	              console.log(response.data)
	              if (response.data.data.state === 1) {
	                router.push('/newbill')
	              }
	              if (response.data.data.state === 0) {
	              	_this.showdialog = true;
	              }
	              if (response.data.code === 110) {
		            router.push('/login')
		          }
	           })
			},
			notice(){
				router.push('/notice');
			},
			kefu(){
				window.open('https://zechang360.kf5.com/kchat?supportbox=1&active_in_iframe=0&lang=zh_CN#/chatbox?robot=1&t='+new Date().getTime())
			},
			help(){
				window.open('https://zechang360.kf5.com/hc/','_self')
			},
			marquee(){
				router.push('/marquee')
			},
			hezuo(){
				location.href = "http://h5.zechang360.com/agent/index.html"
			},
			kuaijie(){
				const _this = this
				axios.post(api + '/user/real/state?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (resa) {
	              _this.loading = false
	              console.log(resa.data)
	              if (resa.data.data.state === 1) {
	                router.push('/kuaijielist')
	              }
	              if (resa.data.data.state === 0) {
	                _this.showdialog = true;
	              }
	              if (resa.data.code === 110) {
		            router.push('/login')
		          }
	           })
			},
			index: function (id) {
	        const _this = this
	        axios.post(api + '/baseconfig/functionLink?&id=' + id + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
	          _this.loading = false
	          console.log(response.data)
	          var url = response.data.data
	          if (response.data.code === 0) {
	            location.href = response.data.data
	            return
	          }
	          if (response.data.code === 110) {
	            router.push('/login')
	          }
	        })
	      }
		},
		created() {
			localStorage.setItem('wallet',1)
			localStorage.setItem('yaoqinga',2)
			localStorage.setItem('invite',1)
			if (localStorage.getItem("uid") == null) {
				router.push('/login')
			}
			let _this = this
			_this.imgList = localStorage.getItem('imgList')
		      axios.get(api + '/baseconfig/index?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        if (response.data.code === 0) {
		          let imgList = []
		          for (let i = 0; i < response.data.data.length; i++) {
		          	if(response.data.data[i].type == 2){
		              	imgList.push({
			              url: 'invite',
			              img: response.data.data[i].image,
			              title: ''
			            })
		              }
		            else{
		            	imgList.push({
			              url: response.data.data[i].link,
			              img: response.data.data[i].image,
			              title: ''
			            })
		            }
		          }
		          _this.imgList = imgList;
		          localStorage.setItem('imgList',_this.imgList)
		       
		        }
		        if (response.data.code === 110) {
		          let imgList = []
		          for (let i = 0; i < response.data.data.length; i++) {
		            imgList.push({
		              url: '/login',
		              img: response.data.data[i].image,
		              title: ''
		            })
		          }
		          _this.imgList = imgList
		        }
		      }).catch(function () {
		
		      })
		      //获取未读消息条数
		      axios.get(api + '/message/unread/count?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		      	console.log("未读消息条数")
		        console.log(response.data)
		        if (response.data.code === 0) {
		          if (response.data.data == 0) {
		          	_this.badgeshow = false
		          }
		          else{
		          	_this.badgeshow = true
		          	_this.badge = response.data.data
		          }
		        }
		        if (response.data.code === 110) {
		          router.push('/login')
		        }
		      })
		      //获取版本接口
			axios.post(api + '/baseconfig/version?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log("版本接口")
				console.log(res.data)
		        if (res.data.code === 0) {
		        	if (res.data.data.version_id != '3.0.0') {
		        		
		        	}
		        }
		        if (res.data.code === 110) {
		            router.push('/login')
		        }
			})
			axios.get(api + '/message/page?type=2'+ '&pageNo=' + 1 + "&pageSize="+ 3 + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
				console.log('获取系统通知')
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	for (let i = 0;i<response.data.data.length;i++) {
		        		_this.liupan.push(response.data.data[i].title)
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
	.bell{
		background: -webkit-linear-gradient(left top, #EE3F3F , #EC6444); /* Safari 5.1 - 6.0 */
		  background: -o-linear-gradient(bottom right, #EE3F3F, #EC6444); /* Opera 11.1 - 12.0 */
		  background: -moz-linear-gradient(bottom right, #EE3F3F, #EC6444); /* Firefox 3.6 - 15 */
		  background: linear-gradient(to bottom right, #EE3F3F , #EC6444); /* 标准的语法 */
		padding: 20px !important;
		height:180px;
		.badge{
			background: #FF9100;
			padding: 0 2px;
			float: left;
			position: relative;
			left:-18px;
			width:14px;
			height:12px;
			line-height:12px;
		}
		img{
			cursor: pointer;
		}
	}
	.bella{
		width: 65vw;
		margin: 0 auto;
		div{
			display: inline-block;
			p{
				color: #FFF;
			}
		}
		div:nth-of-type(1){
			float: left;
			img{
				width: 58px;
				height: 50px;
			}
		}
		div:nth-of-type(2){
			float: right;
		}
	}
	.bellb{
		background: #FFF;
		padding-bottom: 20px !important;
		height: 24px;
		img{
			width: 25px;
			float: left;
			margin-left: 5vw;
		}
		.vux-marquee{
			width: 75vw;
			top: 11px;
			text-align: left !important;
			margin: 0 1vw 0 15vw;
			font-size: 15px;
			text-overflow: ellipsis !important;
			li{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
	.vux-slider{
		
		top: 20pt;
		height: 100px !important;
	}
	.vux-swiper{
		border-radius: 7px !important;
		margin: 0 auto;
		width: 90vw !important;
		height: 100px !important;
	}
	.vux-indicator{
		
		top: 73px;
		z-index: 1000;
	}
	.moreindex{
		width: 100vw;
		height: 210px;
		background: #FFF;
		.haha{
			width: 50vw;
			height: 105px;
			border-bottom: 1px solid #F0F0F0;
			border-right: 1px solid #F0F0F0;
			p{
				font-size: 14px;
				font-weight: 600;
			}
			span{
				font-size: 10px;
				color: #999999;
				display: inline-block;
				transform: scale(0.9);
				
			}
		}
		.life,.help,.work{
			width: 50vw;
			border-bottom: 1px solid #F0F0F0;
			height: 69px;
		}
		.rightindex{
			float: right;
			position: absolute;
			top: 440px;
			right: 0;
			p{
				font-size: 14px;
				font-weight: 600;
				position: relative;
				left: -20px;
				
			}
			span{
				font-size: 12px;
				color: #999999;
				position: relative;
				top: -17px;
				display: inline-block;
				transform: scale(0.9);
			}
			img{
				position: relative;
				left: 15px;
				top: -15px;
			}
		}
	}
	.kf5-chatSupport-btn{
		position: absolute !important;
		top: 20px !important;
	}
	.kf5-chatSupport-icon15:before{
		content: ''!important;
	}
	.kf5-chatSupport-style3{
		background: red !important;
		color: #ED5342 !important;
	}
	.vux-marquee li{
	font-size: 12px !important;
	position: relative;
	top: 3px !important;
}
</style>