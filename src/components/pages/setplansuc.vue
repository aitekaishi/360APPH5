<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;position: relative;" class="setplansuc">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">提交成功</x-header>
		</div>
		<div style="height: 70px;"></div>
		<div style="text-align: center;" class="setplanlistdiva">
			<img style="width: 90px;" src="./svg/sucess.svg"/>
			<p style="font-size: 20px;">设置成功</p>
			<div style="height: 5px;"></div>
			<div style="color: red;">预计{{time}}，最后一笔汇款完成</div>
			<div style="height: 5px;"></div>
			<div style="width: 80vw;margin: 0 auto;color: rgb(153,153,153);">代还款期间，请确保卡内余额充足，否则会影响代还款成功率!</div>
		</div>
		<div style="height: 60px;"></div>
		<div class="setplanlistdivb">
			<span @click="confirm">完成</span>
			<span @click="confirma">查看详情</span>
		</div>
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
				loading:false,
				errorStatus: false,
        		errorMsg: '',
        		time:'',
			}
		},
		methods:{
			back(){
				router.push('/cardlist')
			},
			confirma(){
				router.push('/planDetailsa')
			},
			confirm(){
				router.push('/cardlist')
			}
		},
		created(){
			let _this = this
			_this.time = localStorage.getItem("timesuc")
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
	.setplansuc{
		background: #FFF;
		.setplanlistdivb{
			width:80vw;
			margin: 0 auto;
			span{
				text-align: center;
				border-radius: 15px;
				padding: 6px 10px;
				width: 100px;
				display: inline-block;
				border: 1px solid #D33C3C;
			}
			span:nth-of-type(1){
				color: #D33C3C;
			}
			span:nth-of-type(2){
				color: #FFF;
				float: right;
				background: #D33C3C;
			}
		}
	}
</style>
				