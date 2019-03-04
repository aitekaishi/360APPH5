<template>
	<div class="invite" style="width: 100vw;text-align: center;height: 100vh;position: relative;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		
	    <img v-show="tupian" @click="xianshi" style="width: 55vw;position: absolute;z-index: 20;top: 95vw;right: 22vw;" src="../../assets/invite/inviteeee.png"/>
		<div class="-mob-share-ui  -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="text-align: center">
		    <ul class="-mob-share-list" style="text-align: center;">
		        <li style="width: 40px;height: 40px;text-align: center;position: relative;top: -10px;" class="-mob-share-weibo"><p style="font-size: 16px;position: relative;left: -13px;top: 45px;">新浪微博</p></li>
		    </ul>
		    <ul class="-mob-share-list" style="text-align: center;">
		        <li style="width: 40px;height: 40px;text-align: center;position: relative;top: -10px;" class="-mob-share-qzone"><p style="font-size: 16px;position: relative;left: -11px;top: 45px;">QQ空间</p></li>
		    </ul>
		    <ul class="-mob-share-list">
		        <li style="width: 40px;height: 40px;text-align: center;position: relative;top: -10px;" class="-mob-share-weixin"><p style="font-size: 16px;position: relative;left: 2px;top: 45px;">微信</p></li>
		    </ul>
		    <ul class="-mob-share-list">
		        <li style="width: 40px;height: 40px;text-align: center;position: relative;top: -10px;" class="-mob-share-qq"><p style="font-size: 16px;position: relative;left: 2px;top: 45px;">QQ</p></li>
		    </ul>
		</div>
		<!--<div class="-mob-share-ui-bg" style="display: none !important;"></div>-->
		<figure v-show="tupiana" style="position: absolute;top: 30vh !important;margin: 0 auto;">
			<img @click="shua" src="../../assets/index/bbb.png" alt="" style="width: 50px;">
			<div style="height: 20px;"></div>
			<figcaption style="color: #999999;">网络不给力，请重新加载...</figcaption>
		</figure>
		<div class="mask" @click="maska" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: fixed;top: 0;left: 1px;z-index: 20000;display: none;"></div>
		<!--<div class="share">
				<figure class="figure" @click="sina">
					<img src="../../assets/invite/(sinaweibo)_SFont.CN.svg" style="width: 40px;"/>
					<figcaption>新浪微博</figcaption>
				</figure>
				<figure class="figure" @click="qzone">
					<img src="../../assets/invite/qzone.svg" style="width: 40px;"/>
					<figcaption>QQ空间</figcaption>
				</figure>
				
				<figure class="figure" @click="wecat">
					<img src="../../assets/invite/(WeChat)_SFont.CN.svg" style="width: 40px;"/>
					<figcaption>微信</figcaption>
				</figure>
				<figure @click="wx">
					<img src="../../assets/invite/(weixin_friend_circle)_SFont.CN.svg" style="width: 40px;"/>
					<figcaption>微信朋友圈</figcaption>
				</figure>
				<figure class="figure" @click="qq">
					<img src="../../assets/invite/(qq)_SFont.CN.svg" style="width: 40px;"/>
					<figcaption>QQ</figcaption>
				</figure>
			</div>-->
			<!--<img @click="invite" style="width: 55vw;position: absolute;z-index: 20;top: 95vw;right: 22vw;" src="../../assets/invite/invitef.png"/>
			--><img style="width: 100vw;" :src="src"/>
			<img @click="myinvite" style="position: absolute;width: 25px;right: 20px;z-index: 2;top: 20px;" src="../../assets/invite/invitetop.png"/>
			<div style="height: 50px;"></div>
		<tabbar>
	      	<tabbar-item link="/">
		        <img slot="icon" src="../../assets/index/indexa.png">
		        <span slot="label">首页</span>
	     	</tabbar-item>
		    <tabbar-item>
		        <img slot="icon" src="../../assets/index/inviteb.png">
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
    </div>
</template>

<script>
	import { Masker, XHeader, Swiper, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	export default {
		components: { Masker, XHeader, Swiper, Tabbar, TabbarItem, Grid, GridItem, Drawer, Loading,Toast,Badge },
		data() {
			return {
				errorStatus: false,
				errorMsg: '',
				loading: false,
				src:'',
				mask:false,
				urla:"",
				titlea:'',
				tupian:true,
				tupiana:false
			}
		},
		created() {
			let _this = this;
			localStorage.setItem('wallet',1)
			if(navigator.onLine){
				if (localStorage.getItem('yaoqinga')==1) {
					setTimeout(this.confirm,1)
				}else{
					setTimeout(this.confirm1,1)
				}
				_this.tupiana = false
				_this.tupian = true
				//alert('?code=liupan&ddd=20220020202'.replace('?code=','').replace(/\&.*/,''))
				if (localStorage.getItem('invite')==1) {
					location.reload()
					localStorage.setItem('invite',2)
				}
				//_this.loading = true
				axios.get(api + '/user/invite/getMyInviteImg?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
						_this.loading = false
						console.log(response.data.data.inviteLink)
							if (response.data.code === 0) {
								_this.src = response.data.data.sourceImg
								_this.urla = response.data.data.inviteLink
								_this.titlea = response.data.data.title
								localStorage.setItem("imgUrl",response.data.data.sourceImg)
								localStorage.setItem("title",response.data.data.title)//"邀你免费注册信用卡还款神器！5%卡内余额全额还款"
								localStorage.setItem("url",response.data.data.inviteLink)
								localStorage.setItem("content",response.data.data.content)//"360°车卡管家"
							}
							if (response.data.code === 110) {
								router.push('/login')
							}
					})
			}else{
				_this.tupian = false
				_this.tupiana = true
			}
			
			//let _this = this;
			/*if (navigator.connection.type=='none') {
				_this.tupian = false
				_this.tupiana = true
			} else{
				_this.tupiana = false
				_this.tupian = true*/
				//alert('?code=liupan&ddd=20220020202'.replace('?code=','').replace(/\&.*/,''))
				/*if (localStorage.getItem('invite')==1) {
					location.reload()
					localStorage.setItem('invite',2)
				}*/
				//_this.loading = true
				/*axios.get(api + '/user/invite/getMyInviteImg?' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
						_this.loading = false
						console.log(response.data.data.inviteLink)
							if (response.data.code === 0) {
								_this.src = response.data.data.sourceImg
								_this.urla = response.data.data.inviteLink
								_this.titlea = response.data.data.title
								localStorage.setItem("imgUrl",response.data.data.sourceImg)
								localStorage.setItem("title",response.data.data.title)//"邀你免费注册信用卡还款神器！5%卡内余额全额还款"
								localStorage.setItem("url",response.data.data.inviteLink)
								localStorage.setItem("content",response.data.data.content)//"360°车卡管家"
							}
							if (response.data.code === 110) {
								router.push('/login')
							}
					})
			}*/
			
		},
		mounted() {
        	//window.addEventListener('click', this.handleScroll, true)
 		},
 		methods: {
        	confirm() {
        		$('.-mob-share-ui').show('blind',{direction:'down'},100);
        		$(".mask").show('fade');
        	},
        	confirm1() {
        		$('.-mob-share-ui').hide('blind',{direction:'down'},100);
        		$(".mask").hide('fade');
        	},
        	myinvite(){
        		router.push("/myinvite")
        	},
			shua(){
				location.reload()
			},
			xianshi(){
				$('.-mob-share-ui').show('blind',{direction:'down'},100);
				$(".mask").show('fade');
			},
			maska(){
				$(".mask").hide('fade');
				$('.-mob-share-ui').hide('blind',{direction:'down'},100);
			}
 		}
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.-mob-share-weixin{
		background-image: url('../../assets/invite/(WeChat)_SFont.CN.svg')!important;
	}
	.-mob-share-weibo{
		background-image: url('../../assets/invite/(sinaweibo)_SFont.CN.svg')!important;
	}
	.-mob-share-qzone{
		background-image: url('../../assets/invite/qzone.svg')!important;
	}
	.-mob-share-qq{
		background-image: url('../../assets/invite/(qq)_SFont.CN.svg')!important;
	}
	.-mob-share-ui {
		ul{
			display: inline-block;
			margin: 0 !important;
		}
	}
	.-mob-share-ui{
		bottom: 0 !important;
		visibility: visible !important;
	}
</style>