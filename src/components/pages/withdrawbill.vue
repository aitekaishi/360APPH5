<template>
	<div class="ddd" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;background: #F8F8F8 !important;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">提现记录</x-header>
		<div style="height: 10px;"></div>
		<div style="background: #FFF;height: 50px;border-bottom: 1px solid #F8F8F8;padding: 0 20px;" @click="querybill(item.id)" v-for="item in payment" :key="item.id">
  			<div>
  				<span style="position: relative;float: left;top: 15px;">{{item.amount}}.0元</span><br />
  			</div>
  			<div style="text-align: right;float: right;position: relative;top: -20px;">
  				<span v-show="item.state==4" class="green">已打款</span>
  				<span v-show="item.state==3" class="red">未通过</span>
  				<span v-show="item.state==1" class="black">待审核</span>
  				<span v-show="item.state==2" class="black">审核通过</span>
  				<p style="color: #999999;font-size: 12px;">{{item.createTime}}</p>
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
					/*{amount:20000,state:4,createTime:"2018-8-8aaaaaaa",proFee:44,id:1},
    				{amount:20000,state:4,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:1,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:3,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:1,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:2,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:1,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:4,createTime:"2018-8-8aaaaaaa",proFee:44,id:1},
    				{amount:20000,state:4,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:1,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:3,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:1,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:2,createTime:"2018-8-8",proFee:44,id:2},
    				{amount:20000,state:1,createTime:"2018-8-8",proFee:44,id:2},*/
				],
        		empty:false
			}
		},
		methods: {
			querybill(id){
				let _this = this
				axios.get(api + '/user/wallet/getWithDrawInfo?id=' + id + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	router.push('/withdrawinfoa')
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
			axios.get(api + '/user/wallet/withDrawHistoryList?pageNo=1&pageSize=1000000' + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
	        console.log(response.data.data.list)
	        if (response.data.code === 0) {
	        	_this.payment = response.data.data.list
	        	if(response.data.data.list.length == 0){
	        		_this.empty = true
	        	}
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
		color: red;
	}
	.black{
		color: rgb(51,51,51);
	}
</style>