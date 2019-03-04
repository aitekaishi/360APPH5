<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;position: relative;" class="setplan">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">单日限额</x-header>
		</div>
		<div style="height: 30px;font-size: 16px;position: relative;top: -35px;z-index: 100000;color: #FFF;left: 85vw;" @click="wanchen">完成</div>
		<group class="cardmanageindex cardmanageindexc">
			<x-input type="number" title="输入金额" v-model="monery" class="monery" placeholder="请输入500-6000的金额" mask="9999999999999999999999999999999999999999999" @on-blur="tuijiana"></x-input>
    	</group>
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
				show:false,
				XB:true,
				loading:false,
				errorStatus: false,
        		errorMsg: '',
        		title:"",
        		monery:'',
        		erdu:'',
        		imgurl:'',
        		weihao:"",
        		kuaijielista:ChinaAddressV4Data,
        		kuaijiea:[],
        		kuaijielistb:[[]],
        		kuaijieb:[],
			}
		},
		methods:{
			back(){
				router.push('/cardmanage')
			},
			wanchen(){
				let _this = this
				if ((localStorage.getItem('singleAmount')>=100&&localStorage.getItem('singleAmount')<=1000)&&(_this.monery>=500&&_this.monery<=6000)) {
					axios.post(api + '/user/repay/updateCard?id=' + localStorage.getItem("yhcard") + '&billDay=' + localStorage.getItem("a") + '&payDay=' + localStorage.getItem("b")+ '&singleAmount=' +localStorage.getItem('singleAmount')*100+ '&dayAmount=' +  _this.monery*100 + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
						console.log(res.data)
						if (res.data.code === 0) {
							_this.errorMsg = "单日限额修改成功"
							_this.errorStatus = true
							localStorage.setItem('dayAmount',_this.monery)
							setTimeout(function  () {
								router.push('/cardmanage')
							},500)
						}else{
							_this.errorMsg = res.data.msg
							_this.errorStatus = true
						}
			        	if (res.data.code === 110) {
			        		router.push('/login')
			        	}
					})
				}else{
					_this.errorMsg = "单日限额在500-6000之间"
					_this.errorStatus = true
				}
			},
		},
		created(){
			let _this = this
			_this.monery = localStorage.getItem('dayAmount')
			_this.weihao = "尾号"+localStorage.getItem('yhweihaoa')
			_this.imgurl = localStorage.getItem('yhimga')
		},
		updated(){
			let _this = this
				if (_this.monery>6000) {
					_this.errorMsg = "单日限额在500-6000之间"
					_this.errorStatus = true
				}
		},
		mounted(){
			document.getElementsByClassName('vux-popup-header-right')[0].addEventListener('click', this.handleScrolla, true);
			document.getElementsByClassName('vux-popup-header-right')[1].addEventListener('click', this.handleScrollb, true);
			document.getElementsByClassName('vux-popup-header-left')[0].addEventListener('click', this.handleScrolla, true);
			document.getElementsByClassName('vux-popup-header-left')[1].addEventListener('click', this.handleScrollb, true);
		}
	}
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.setplan .cardbutton{
		width: 100%;
		margin: 0 auto;
		position: relative;
		top: -45px;
	}
	.setplan .cardmanageindex{
		position: relative;
		top: -30px;
	}
	.setplan{
		.weui-cell__ft:after{
			border-color: #FFF !important;
			opacity: 0 !important;
		}
		.cardmanageindexa{
			width: 92vw;
			margin: 0 auto;
			
			.weui-cells:after{
				border-bottom: none;
			}
			.vux-cell-primary{
				position: relative;
				left: -10px;
			}
			.weui-cells:before{
				border-top: none;
			}
			.weui-cell__ft{
				color: red !important; 
			}
			.weui-cells{
				height: 70px;
				border-radius: 5px !important;
			}
			img{
			}
		}
		.cardmanageindexb{
			.weui-cell__hd{
				width: 100px;
			}
			.vux-popup-picker-select{
				text-align: left !important;
				span{
					color: #000;
				}
			}
		}
		.cardmanageindexc{
			.vux-x-input{
				.weui-cell__hd{
					width: 100px;
				}
			}
		}
		.vux-cell-placeholder{
			color: #999999 !important; 
		}
		.ri{
			font-size: 17px;position: relative;top: -90px;left: 120px;display: inline-block;visibility: hidden;
		}
		img:nth-of-type(2){
			display: none;
		}
	}
	.huoqua{
		display: inline-block;
		color: #D84C29;
		padding-left: 15px;
		position: relative;
		top: -163px;
		left: 70vw;
		font-size: 12px;
	}
	.setplan .vux-cell-box{
		border-top: none !important;
	}
	.setplan .address{
		border-top: none !important;
	}
</style>
				