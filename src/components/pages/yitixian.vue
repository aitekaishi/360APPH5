<template>
	<div class="yitixianindex" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">已提现</x-header>
		<div v-show="item.state==4" style="background: #FFF;height: 50px;border-bottom: 1px solid #F8F8F8;padding: 0 20px;" @click="querybill(item.id)" v-for="item in payment" :key="item.id">
  			<div class="yitixianindexa">
  				<span style="position: relative;float: left;top: 5px;">已打款</span><br />
  				<p style="color: #999999;font-size: 12px;position: relative;float: left;top: 5px;">{{item.createTime}}</p>
  			</div>
  			<div style="text-align: right;float: right;position: relative;top: -10px;">
  				<span class="green">+{{(item.amount)}}</span>
  			</div>
  		</div>
  		<div class="emptybill" v-show="empty" style="background: #F8F8F8 !important;">
  			<div style="height: 150px;"></div>
    		<img src="../../assets/zhanwushuju.png" alt="历史账单" /><br />
    		<p style="font-size: 16px !important;">暂无记录</p>
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
				payment:'',
        		empty:false
			}
		},
		methods: {
			querybill(id){
				let _this = this
				axios.get(api + '/user/wallet/getWithDrawInfo?id=' + id + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	router.push('/withdrawinfob')
		        	localStorage.setItem('idd',id)
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
			back(){
				router.push('/wallet')
			}
		},
		created() {
			let _this = this
			axios.get(api + '/user/wallet/withDrawHistoryList?pageNo=1&pageSize=10000000' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data.data.list)
		        if (response.data.code === 0) {
		        	_this.payment = response.data.data.list
		        	if(localStorage.getItem('alreadyDeposit') == 0.00){
		        		_this.empty = true
		        	}else{
		        		_this.empty = false
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
	.yitixianindex{
		.green{
			color: rgb(124,207,124);
		}
		.red{
			color: rgb(233,85,120);
		}
		.black{
			color: rgb(51,51,51);
		}
		
	}
</style>