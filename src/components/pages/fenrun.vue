<template>
	<div class="fenrunindex" style="height: 100vh;text-align: center;overflow-x: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">分润收益</x-header>
		<div style="height: 10px;"></div>
		<div style="background: #FFF;height: 55px;border-bottom: 1px solid #F8F8F8;padding: 0 20px;" v-for="item in payment" :key="item.id">
  			<div>
  				<span style="position: relative;float: left;top: 5px;">{{item.phone}}</span><br />
  				<span style="position: relative;float: left;top: 5px;font-size: 12px;color: #999999;">{{item.createTime}}</span>
  			</div>
  			<div style="text-align: right;float: right;position: relative;top: -10px;">
  				<span style="color: #49CB5F;">+&nbsp;{{(item.income).toFixed(2)}}</span>
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
				payment:[
					/*{phone:'188****5300',incomeType:'开通会员',createTime:"2018-8-8aaaaaaa",income:44},
    				{phone:'188****5300',incomeType:'开通会员',createTime:"2018-8-8aaaaaaa",income:44},
    				{phone:'188****5300',incomeType:'开通会员',createTime:"2018-8-8aaaaaaa",income:44},
    				{phone:'188****5300',incomeType:'开通会员',createTime:"2018-8-8aaaaaaa",income:44},
    				{phone:'188****5300',incomeType:'开通会员',createTime:"2018-8-8aaaaaaa",income:44},
    				{phone:'188****5300',incomeType:'开通会员',createTime:"2018-8-8aaaaaaa",income:44},*/
				],
        		empty:false
			}
		},
		methods: {
			back(){
				router.push('/wallet')
			}
		},
		created() {
			//用户分润收益列表
			let _this = this
			axios.get(api + '/user/wallet/getTradeIncomeList?pageNo=1&pageSize=1000000000' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        console.log(typeof(response.data.data.list))
		        if (response.data.code === 0) {
		        	_this.payment = response.data.data.list
		        	if(response.data.data.list.length == 0){
		        		_this.empty = true
		        	}else{
		        		_this.empty = false
		        	}
		        }else{
		        	_this.errorStatus = true
	           	 	_this.errorMsg = response.data.msg
		        }
		        if (response.data.code === 110) {
		        	router.push('/login') 
		        }
	      	}).catch(function () {
	      	
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
	.green{
		color: rgb(124,207,124);
	}
	.red{
		color: rgb(233,85,120);
	}
	.black{
		color: rgb(51,51,51);
	}
</style>