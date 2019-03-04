<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;position: relative;" class="cardlistlist">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">卡列表</x-header>
		</div>
		<img src="./svg/add.svg" style="width: 17px;z-index: 101;position: relative;top: -32px;left: 92vw;" @click="kefu"/>
		<div class="xingyongka" v-show="xyklenght">共<span style="padding-left: 3px;padding-right: 3px;color: orangered;">{{xingyongka}}</span>张信用卡</div>
		<div v-show="!xyklenght" style="text-align: center;">
			<div style="height: 25px;"></div>
			<img src="../../assets/yhangka.png" style="width: 120px;"/>
			<div style="height: 20px;"></div>
			<p style="color: #999999;">添加信用卡</p>
			<p style="color: #999999;">即可享受安全快捷的支付体验</p>
			<div style="height: 20px;"></div>
		</div>
		<div class="cardlistlistindex" :class="{colorb:item.id%2!=0,colord:item.id%2==0&&item.id%3!=0,colora:item.id%2==0&&item.id%3==0&&item.id%5!=0,colorc:item.id%2==0&&item.id%3==0&&item.id%5==0}" v-for="item in cardlist" :key='item.id' style="width: 86vw;margin: 0 auto;padding: 12px;border-radius: 5px;margin-bottom: 20px;height: 160px;overflow: hidden;">
			<div class="one">
				<div style="height: 10px;"></div>
				<img :src=item.bankImg alt="" style="width: 25px;border-radius: 50%;border: 5px solid #FFF;position: relative;top: -8px;"/>
				<span style="color: #FFF;position: relative;top: -20px;left: 5px;font-size: 15px;width: 200px;display: inline-block;">{{item.bankName}}({{item.bankCardEndCode}})</span>
				<span style="font-size: 12px;color: #FFF;position: relative;left: 45px;width: 300px;display: inline-block;top: -20px;">账单日：{{item.billDay}}日&nbsp;&nbsp;还款日：{{item.payDay}}日</span>
				<p class="statea" style="line-height: 20px;">{{item.stateMsg}}</p>
				<!--<p class="statea" v-show="item.state==0" style="line-height: 33px;z-index: 100;">未设置</p>
   				<p class="statea" v-show='item.state==1' style="line-height: 33px;z-index: 100;">进行中</p>
   				<p class="statea" v-show='item.state==2' style="line-height: 33px;z-index: 100;">还款终止</p>
   				<p class="statea" v-show='item.state==3' style="line-height: 33px;z-index: 100;">已完成</p>-->
			</div>
			<div class="two" style="font-size: 25px;text-align: center;z-index: 2;position: relative;top: -30px;">
				<img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/>&nbsp;&nbsp;&nbsp;
				<img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/>&nbsp;&nbsp;&nbsp;
				<img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/><img style="width: 10px;" src="./svg/star.svg"/>&nbsp;&nbsp;&nbsp;
				<span style="font-size: 20px;color: #FFF;position: relative;top: 2px;">{{item.bankCardEndCode}}</span>
			</div>
			<div style="height: 10px;"></div>
			<div class="three" style="position: relative;top: -20px;">
				<span v-show='item.state!=1' @click="setjihua(item.id)">设置计划</span>
				<span v-show='item.state==1' @click="aaaa(item.id)">查看计划</span>
				<span @click="daihuanjilu" style="margin-left: 20px;">分期记录</span>
				<span @click="cardguanli(item.id)" style="padding: 3px 15px;float: right;z-index: 2;position: relative;">卡管理</span>
			</div>
			<!--<img :src=item.bankImg alt="" style="width: 39vw;border-radius: 50%;opacity: 0.2;position: relative;left: 53vw;top: -110px;"/>-->
		</div>
		<x-button style="background: #FFF;border: 1px solid #FFF !important;font-size: 16px !important;padding: 2px !important;" @click.native="kefu"><div style="color: #EC6B71;"><img src="./svg/add1.svg" style="width: 20px;position: relative;top: 4px;left: -6px;"/>添加信用卡</div></x-button>
		<a href="https://pay.feifanzhichuang.com/wxportal/creditCard/bankCards.do?org_id=001800060000" style="color: #4C8BF4;width: 100vw;text-align: center;display: inline-block;margin-top: 10px;text-decoration: underline;">没有信用卡？</a>
		<div v-show="empty" style="font-size: 16px;position: absolute;top: 50vh;width: 100vw;text-align: center;">暂无数据~</div>
	</div>
</template>

<script>
	import store from '@/store'
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,ChinaAddressV4Data,Toast,Loading,Confirm} from 'vux'
	import api from '../../components/other/api-url'
  	import globalPM from '../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import '../../../static/js/bankCardAttribution'
	import bin from './bin.json'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,Toast,Loading,Confirm},
		data (){ 
			return {
				empty:false,
				aaa:true,
				show:false,
				XB:true,
				loading:false,
				errorStatus: false,
        		errorMsg: '',
				cardlist:[],
				f:true,
				t:false,
				xingyongka:'',
				xyklenght:false,
			}
		},
		methods:{
			aaaa(id){
				let _this = this
				axios.post(api + '/user/repay/getRepayCardList?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log("卡列表")
					console.log(res.data)
					if (res.data.code === 0) {
						for (let i = 0 ;i<res.data.data.length;i++) {
							if(id == res.data.data[i].id){
								localStorage.setItem('orderNoa',res.data.data[i].orderNo)
								setTimeout(function  () {
									router.push('/planDetailsa')
								},300)
							}
						}
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			},
			setjihua(id){
				console.log('设置计划')
				let _this = this;
				axios.post(api + '/user/repay/getRepayCardList?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
						for (let i = 0;i<res.data.data.length;i++) {
							if (id == res.data.data[i].id) {
								localStorage.setItem('yhnamea',res.data.data[i].bankName)
								localStorage.setItem('yhweihaoa',res.data.data[i].bankCardEndCode)
								localStorage.setItem('yhcarda',res.data.data[i].id)
								localStorage.setItem('zdanria',res.data.data[i].billDay)
								localStorage.setItem('huankuanria',res.data.data[i].payDay)
								localStorage.setItem('yhimga',res.data.data[i].bankImg)
								setTimeout(function  () {
									router.push('/setplan')
								},100)
							}
						}
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			},
			daihuanjilu(){
				console.log('代还记录')
				router.push('/record')
			},
			cardguanli(id){
				console.log('卡管理');
				let _this = this;
				axios.post(api + '/user/repay/getRepayCardList?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
						for (let i = 0;i<res.data.data.length;i++) {
							if (id == res.data.data[i].id) {
								//alert(res.data.data[i].subUpdate)
								localStorage.setItem('yhname',res.data.data[i].bankName)
								localStorage.setItem('yhweihao',res.data.data[i].bankCardEndCode)
								localStorage.setItem('yhcard',res.data.data[i].id)
								localStorage.setItem('zdanri',res.data.data[i].billDay)
								localStorage.setItem('huankuanri',res.data.data[i].payDay)
								localStorage.setItem('yhimg',res.data.data[i].bankImg)
								localStorage.setItem('subUpdate',res.data.data[i].subUpdate)
								localStorage.setItem('singleAmount',res.data.data[i].singleAmount)
								localStorage.setItem('dayAmount',res.data.data[i].dayAmount)
								setTimeout(function  () {
									router.push('/cardmanage')
								},100)
							}
						}
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			},
			back(){
				router.push('/newbill')
			},
			kefu(){
				router.push('/boundcreditcarda')
			}
		},
		created(){
			let _this = this
			localStorage.removeItem('dddddd')
			if (localStorage.getItem("tongdaoid")==5) {
				axios.post(api + '/user/repay/jxdk/getRepayCardList?channelId=' + localStorage.getItem("tongdaoid") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log("卡列表")
				console.log(res.data)
				if (res.data.code === 0) {
					_this.cardlist = res.data.data	
					if (res.data.data.length > 0) {
						_this.xingyongka = res.data.data.length;
						_this.xyklenght = true
					} else{
						_this.xyklenght = false
					}
				}
	        	if (res.data.code === 110) {
	        		router.push('/login')
	        	}
			})
			} else{
				axios.post(api + '/user/repay/getRepayCardList?channelId=' + localStorage.getItem("tongdaoid") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log("卡列表")
				console.log(res.data)
				if (res.data.code === 0) {
					_this.cardlist = res.data.data	
					if (res.data.data.length > 0) {
						_this.xingyongka = res.data.data.length;
						_this.xyklenght = true
					} else{
						_this.xyklenght = false
					}
				}
	        	if (res.data.code === 110) {
	        		router.push('/login')
	        	}
			})
			}
			
		},
		updated(){
			
		},
		mounted(){
			
		}
	}
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.cardlistlist .three span{
		color: #FFF;
		border: 1px solid #FFF;
		display: inline-block;
		padding:5px 10px;
		border-radius: 5px;
	}
	.cardlistlist{
		.one{
			.statea{
				color: #FFF;
				position: relative;
				left: 70vw;
				top: -65px;
				width: 55px;
				text-align: right;
			}
		}
	}
	.colora{
		background: #EC6B71;
	}
	.colorb{
		background: #EB9757;
	}
	.colorc{
		background: #3FAC7D;
	}
	.colord{
		background: #3F8EAC;
	}
	.xingyongka{
		position: relative;top: -10px;
		left: ~"calc(7% - 6px)";
	}
</style>
				