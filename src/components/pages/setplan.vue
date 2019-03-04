<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;position: relative;" class="setplan">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">设置计划</x-header>
		</div>
		<div style="height: 30px;"></div>
		<group class="cardmanageindex cardmanageindexa">
			<cell :title="title" :inline-desc="weihao" is-link>
				<img slot="icon" width="45" style="display:block;margin-right:20px;border-radius: 50%;" :src="imgurl">
			</cell>
		</group>
		<group class="cardmanageindex cardmanageindexc">
			<x-input type="number" title="还款金额" v-model="monery" class="monery assa" placeholder="输入需要还款金额" mask="9999999999999999999999999999999999999999999" @on-blur="tuijiana"></x-input>
    		<x-input type="number" title="卡余额" v-model="erdu" class="erdu" placeholder="请输入准确的剩余额度" mask="9999999999999999999999999999999999999999999" @on-blur="tuijian"></x-input>
		</group>
		<group class="cardmanageindex cardmanageindexb">
			<x-address class="address ssasddsdsd" title="消费地" :list='kuaijielista' hide-district=true v-model='kuaijiea' placeholder="请选择" confirm-text="确定"></x-address>
    		<popup-picker class="dayshu" @click.native="hahahaha" disabled=true title="还款天数 " :data="kuaijielistb" v-model="kuaijieb" confirm-text="确定" @on-hide="change"></popup-picker>
		</group>
		<img src="./svg/arrow.svg" style="width: 18px;position: relative;left: 90vw;top: -110px;"/><br />
		<img src="./svg/arrow.svg" style="width: 18px;position: relative;left: 90vw;top: -84px;"/>
		<p class="ri">天</p>
		<!--<div style="position: relative;top: -65px;left: 20px;">
			<img src="./svg/info.svg" style="width: 20px;"/><span style="position: relative;top: -5px;left: 5px;">已为您推荐还款天数，您也可以自行更改</span>
		</div>-->
		<div class="cardbutton">
    		<x-button class="XB" :disabled="XB" @click.native="confirm()" type="warn">生成还款计划</x-button>
    	</div>
    	<div @click="funct" class="huoqua" style="height: 50px;display: inline-block;">
    		<div class="huoquaaa"  style="width: 100px;border-left: 1px solid #B0B0B0;padding-left: 10px;">获取还款天数</div>
    	</div>
    	<div class="mask" @click="mask" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: absolute;top: 0;left: 1px;display: none;"></div>
    	
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
				router.push('/cardlist')
			},
			confirm(){
				let _this = this
				/*生成通联代还计划   
				/user/repay/get/plan   
				传入参数 参数类型 必需 描述
				totalAmount Integer Y 还款总额
				balance Integer Y 账户余额
				creditCardId Long Y 信用卡ID
				repayDays Integer Y 还款天数
				city String Y 消费地区编码
				传出参数   
				totalFee Double  总手续费（元）
				totalAmount Double  还款总额（元）
				cardBalance Double  卡内余额（元）
				repayDays Integer  还款天数
				details Json  还款计划详情
				idx Integer  期数
				tradeTime Date  代扣时间
				tradeMoney Double  代扣金额（元）
				transferTime Date  代还时间
				transferMoney Double  代还金额（元）
				rateMoney Double  手续费（元）
				repayOrderFlag Integer  1、扣款， 2、还款
				mccName String  行业名称*/
				var y = _this.kuaijiea[1].replace(/0*$/g,'')
				var z = _this.kuaijiea[0].replace(/0*$/g,'')
				var repayDays = _this.kuaijieb.toString().replace('天','')
				var zy = z+y
				localStorage.setItem('totalAmount',_this.monery*100)
				localStorage.setItem('balance',_this.erdu*100)
				localStorage.setItem('repayDays',repayDays)
				localStorage.setItem('city',zy)
				setTimeout(function  () {
					router.push('/setplanlist')
				},300)
			},
			tuijiana(){
				
			},
			tuijian(){
					/*获取代还推荐还款天数   
					/user/repay/get/recomdays   
					传入参数 参数类型 必需 描述
					totalAmount Integer Y 还款总额
					balance Integer Y 账户余额
					creditCardId Long Y 信用卡ID
					传出参数   
					maxDays Integer  最大还款天数
					minDays Integer  最小还款天数
					recDays Integer  推荐还款天数*/
			},
			change(){
				if ($('.dayshu span').text().length == 1) {
					$('.ri').attr("style",'font-size: 17px;position: relative;top: -90px;left: 110px;display: inline-block;visibility: hidden;')
				}
				else{
					$('.ri').attr("style",'font-size: 17px;position: relative;top: -90px;left: 120px;display: inline-block;visibility: hidden;')
				}
			},
			hahahaha(){
				let _this = this;
				_this.kuaijielistb=[[]]
				if (parseInt(_this.monery)>=500) {
					if (_this.erdu>=500) {
						if (_this.erdu>=(parseFloat(_this.monery*0.05))) {
							axios.post(api + '/user/repay/get/recomdays?totalAmount=' + _this.monery*100 + '&balance=' + _this.erdu*100 + '&creditCardId=' + localStorage.getItem("yhcarda") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
								console.log(res.data)
								if (res.data.code === 0) {
									for (let x = 0;x<=(res.data.data.maxDays-res.data.data.minDays);x++) {
										_this.kuaijielistb[0].push(res.data.data.minDays+x+'天');
										$(".v-transfer-dom:nth-of-type(3) .vux-popup-dialog").show("blind",{direction:'down'},200)
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
						}else{
							_this.errorStatus = true
							_this.errorMsg = "卡余额不能低于还款金额的5%"
						}
					} else{
						_this.errorStatus = true
						_this.errorMsg = "卡余额不能低于500"
					}
				}else{
					_this.errorStatus = true
					_this.errorMsg = "还款金额至少500"
				}
			},
			funct(){
				let _this = this;
				_this.kuaijielistb=[[]]
				if (parseInt(_this.monery)>=500) {
					if (_this.erdu>=500) {
						if (_this.erdu>=(parseFloat(_this.monery*0.05))) {
						axios.post(api + '/user/repay/get/recomdays?totalAmount=' + _this.monery*100 + '&balance=' + _this.erdu*100 + '&creditCardId=' + localStorage.getItem("yhcarda")+ '&passWayId=' + localStorage.getItem("tongdaoid") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
							console.log(res.data)
							if (res.data.code === 0) {
								for (let x = 0;x<=(res.data.data.maxDays-res.data.data.minDays);x++) {
									_this.kuaijielistb[0].push(res.data.data.minDays+x+'天');
									_this.kuaijieb[0] = res.data.data.recDays+'天';
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
					}else{
							_this.errorStatus = true
							_this.errorMsg = "卡余额不能低于还款金额的5%"
						}
					} else{
						_this.errorStatus = true
						_this.errorMsg = "卡余额不能低于500"
					}
				}else{
					_this.errorStatus = true
					_this.errorMsg = "还款金额至少500"
				}
			},
			mask(){
				$(".v-transfer-dom:nth-of-type(3) .vux-popup-dialog").hide("blind",{direction:'down'},200)
				$('.mask').hide()
			},
			handleScrolla(){
				$('body>div:nth-of-type(2)>div').hide('blind',{direction:'down'},100)
				$('.mask').hide()
			},
			handleScrollb(){
				$('body>div:nth-of-type(3)>div').hide('blind',{direction:'down'},100)
				$('.mask').hide()
			},
		},
		created(){
			let _this = this
			_this.title = localStorage.getItem('yhnamea')
			_this.weihao = "尾号"+localStorage.getItem('yhweihaoa')
			_this.imgurl = localStorage.getItem('yhimga')
		},
		updated(){
			if ($('.address .vux-cell-value').text()!="未完善") {
				$('.address .vux-cell-value').attr("style","color: #000 !important;")
			} else{
				$('.address .vux-cell-value').attr("style","color: #999999;")
			}
			const _this = this;
			if (_this.monery >=500&&_this.erdu>=(parseFloat(_this.monery*0.05))&&_this.erdu>=500&&$('.address span').text()!="请选择"&&_this.kuaijieb !== '') {
				_this.XB = false;
			}else{
				_this.XB=true;
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
			input{
				position: relative;
				left: -30px !important;
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
	.ssasddsdsd .vux-cell-box:after{
		    border-bottom: none !important;
	}
	.ssasddsdsd{
		span{
			position: relative !important;
			left: -10px !important;
		}
	}
</style>
				