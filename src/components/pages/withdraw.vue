<template>
	<div class="eee" style="height: 100vh;width: 100vw;text-align: center;overflow: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">余额提现</x-header>
		<div class="contentwith">
			<div style="height: 0.1px;"></div>
			<group class="withdraw">
				<cell @click.native="addpayment()" class='assa' title="提现账户" v-model="paycard" is-link></cell>
			</group>
			<div style="height: 20px;"></div>
			<div style="margin-left: 15px;">提现金额<span style="font-size: 14px;">(最低提现金额为100元)</span></div>
			<x-input @click.native = "sass" type="number" title="￥" v-model="inputmoney" class="monery"></x-input>
			<div style="height: 1px;background: #D9D9D9;width: 50vw;position: relative;left: 14vw;top: -10px;"></div>
    		<div @click="quanbu" style="position: relative;left: 55px;font-size: 12px;color: #999999;">余额￥{{m}},&nbsp;<a>全部提现</a></div>
    		<div style="height: 20px;"></div>
		</div>
		<x-button style="margin-top: 50px;" @click.native="changePassword" type="warn" :disabled="btnDisabled">提现</x-button>
		<div class="liupan" style="display: none;z-index: 1000;width: 100vw;position: absolute;bottom: 0;min-height: 40vh;background: #FFF;">
    		<div style="background: #F8F8F8; width: 100vw;height: 30px;padding-bottom: 5px;padding-top: 11px;border-bottom: 1px solid #cdcdcd;">
    			<div style="font-weight: 700;width: 100vw;">选择提现账户</div>
    			<div style="margin-left: 1rem;cursor: pointer;color: #4A8AF4;float: left;position: relative;top: -20px;z-index: 1000;" @click="endit()">解绑</div>
    			<div style=" margin-right: 1rem;cursor: pointer;color: #4A8AF4;float: right;position: relative;top: -20px;z-index: 1000;" @click="add()">添加</div>
    			<div style="width: 100%;height: 0;clear: both;"></div>
    			<div v-for="item in paycardlist" :key="item.id" style="border-bottom: 1px solid #cdcdcd;height: 50px;position: relative;top: -10px;text-align: center;">
    					
    					
    					<div style="position: relative;text-align: left;padding-left: 30px;"><img class="havea imga" @click="remove(item.id,item.bankCardType)"  src="../pages/svg/_ionicons_svg_md-remove-circle-outline.svg" style="width: 28px;z-index: 10000;top: 12px;"/> </div>
    				<div class="shanchu" :id=item.id @click="liupan(item.id,item.bankCardType)" style="background: #E64340;color:#FFF;z-index: 1000;visibility: hidden;position: relative;top: -20px !important;left: 81vw;padding: 0 !important;">删除</div>
    					 <div style="text-align: center;position: relative;top: -45px;width: 100vw;">
    						<img :src=item.bankImg style="width: 28px;height: 28px;border-radius: 50%;"/>
    						<span @click="xuanzhe(item.id)" style="display: inline-block;position: relative;top: -8px;">{{item.bankName+'('+item.bankCardEndCode+")"}}</span>
    					</div>
    			</div>
    		</div>
    	</div>
    	<div class="mask" @click="mask" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: absolute;top: 0;left: 1px;display: none;"></div>
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
				paycard:"请添加银行卡",
				m:'',
				inputmoney:'',
				btnDisabled:true,
				paycardlist:[],//支付卡名称(后四位)
			}
		},
		methods: {
			sass(){
				//alert("dsddsd")
			},
			back(){
				router.push('/wallet')
			},
			quanbu(){
				let _this = this
				_this.inputmoney = _this.m
			},
			changePassword(){//钱包申请提现
				let _this = this
				//钱包申请提现
				/*bankCardId Long Y 银行卡ID
				bankCardType Long Y 银行卡类型
				amount Long Y 提现金额（分）*/
				console.log(localStorage.getItem('tixiantype'))
				console.log(localStorage.getItem('tixianid'))
				console.log(_this.inputmoney*100)
				axios.post(api + '/user/wallet/widthDraw?amount=' + _this.inputmoney*100 + '&bankCardId=' + localStorage.getItem('tixianid') + '&bankCardType=' + localStorage.getItem('tixiantype') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res.data)
			        if (res.data.code === 0) {
			        	router.push('/withdrawsuccess')
			        }
			        else{
			        	_this.errorMsg = res.data.msg
						_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			},
			addpayment(){
				const _this = this
				if (localStorage.getItem('length')==0) {
					router.push("/withdrawlist")
				} else{
					$(".mask").show('fade')
					console.log($('.mask').attr("style"))
					$(".liupan").show('blind',{direction:'down'},100)
				}
			},
			mask(){
				console.log("mask")
				$(".liupan").hide('blind',{direction:'down'},100)
				$(".shanchu").attr("style",'background: #E64340;color:#FFF;;padding: 0 5px;z-index: 1000;visibility: hidden;position: relative;top: -20px !important;left: 80vw;')
				$(".mask").hide('fade')
				$(".imga").addClass("havea")
			},
			//编辑支付卡
			endit(){
				console.log("endit")
				let _this = this;
				$(".imga").removeClass("havea")
			},
			remove(id,type){
				let _this = this
				if (type == 1) {
					_this.errorStatus = true
					_this.errorMsg = '该卡为快捷支付结算卡,无法删除!'
				}else{
					$("#"+id).attr("style",'background: #E64340;color:#FFF;;padding: 0 5px;z-index: 1000;visibility: visible;position: relative;top: -20px !important;left: 80vw;')
				}
			},
			liupan(id,type){
				let _this = this;
				axios.post(api + '/user/wallet/unBindBankCard?id=' + id + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res.data)
			        if (res.data.code === 0) {
			        		_this.errorStatus = true
							_this.errorMsg = '解绑成功'
							axios.post(api + '/user/wallet/getWithDrawBankCard?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
								console.log(res.data)
						        if (res.data.code === 0) {
						        	_this.paycardlist = res.data.data
						        	_this.paycard = res.data.data[0].bankName+'('+res.data.data[0].bankCardEndCode+')'
						        	
						        }
						        if (res.data.code === 110) {
						            router.push('/login')
						        }
							})
			        }else{
			        	_this.errorMsg = res.data.msg
						_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			},
			add(){
				router.push("/withdrawlist")
			},
			xuanzhe(id){
				const _this = this;
				for (let i = 0;i<_this.paycardlist.length;i++) {
					if (_this.paycardlist[i].id == id) {
						_this.paycard = _this.paycardlist[i].bankName+'('+_this.paycardlist[i].bankCardEndCode+')';
						$(".liupan").hide('blind',{direction:'down'},100)
						$(".mask").hide('fade');
						localStorage.setItem("tixianid",_this.paycardlist[i].id)
						localStorage.setItem("tixiantype",_this.paycardlist[i].bankCardType)
						console.log(localStorage.getItem('tixianid'))
						console.log(localStorage.getItem('tixiantype'))
					}
				}
			}
		},
		created() {
		  	let _this = this
		  	if ($('.withdraw .weui-cell__ft').text().trim()=='请添加银行卡') {
				$('.withdraw .weui-cell__ft').attr("style",'color: #999999 !important;')
			} else{
				$('.withdraw .weui-cell__ft').attr("style",'color: #000 !important;')
			}
			//获取我的钱包详情
			axios.post(api + '/user/wallet/info?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log(res.data)
		        if (res.data.code === 0) {
		        	if (res.data.data.balance == 0) {
		        		_this.m = parseFloat(res.data.data.balance).toFixed(2)
		        	} else{
		        		_this.m = parseFloat(res.data.data.balance).toFixed(2)
		        	}
		        }
		        if (res.data.code === 110) {
		            router.push('/login')
		        }
			})
			/*获取提现银行卡列表   
			/user/wallet/getWithDrawBankCard   
			传入参数 参数类型 必需 描述
			传出参数   
			id long  id
			bankCardType integer  银行卡类型1 快捷支付结算卡 2 钱包提现绑定卡
			bankCardEndCode string  银行卡尾号
			bankName string  银行名称
			bankImg string*/  
			axios.post(api + '/user/wallet/getWithDrawBankCard?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log(res.data)
				localStorage.setItem('length',res.data.data.length)
				console.log("aaa")
		        if (res.data.code === 0) {
		        	_this.paycardlist = res.data.data
		        	_this.paycard = res.data.data[0].bankName+'('+res.data.data[0].bankCardEndCode+')'
		        	localStorage.setItem("tixianid",_this.paycardlist[0].id)
					localStorage.setItem("tixiantype",_this.paycardlist[0].bankCardType)
		        	
		        }
		        if (res.data.code === 110) {
		            router.push('/login')
		        }
			})
		},
		updated () {
			let _this = this
			if (_this.inputmoney>=100) {
				_this.btnDisabled = false
			}else{
				_this.btnDisabled = true
			}
			if ($('.withdraw .weui-cell__ft').text().trim()=='请添加银行卡') {
				$('.withdraw .weui-cell__ft').attr("style",'color: #999999 !important;')
			} else{
				$('.withdraw .weui-cell__ft').attr("style",'color: #000 !important;')
			}
	  	},
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.withdraw{
		.weui-cells:before{
			border-top: none !important;
		}
		label{
			float: left;
		}
		.weui-cells:after{
			width: 83vw;
			left: 15px;
		}
		
	}
	.contentwith{
		box-shadow: 2px 2px 2px #999999,-2px 2px 2px #999999;
		width: 90vw;
		background: #FFF;
		margin: 0 auto;
		border-radius: 5px !important;
		position: relative;
		top: 20px;
		text-align: left;
		.vux-x-input{
			width: 50vw !important;
			position: relative;
			left: 10vw;
		}
		.weui-cell:before{
			top: 35px;
			left: 20px;
		}
		a{
			color: dodgerblue;
			text-decoration: underline;
		}
	}
	.havea{
		visibility: hidden;
	}
	.sdsdsd:after{
content: ''; position: absolute; top: -10px; left: 15px; border-bottom: 1px solid #D9D9D9; -webkit-box-sizing: border-box; box-sizing: border-box; width: 200%; height: 200%; -webkit-transform: scale(0.5); transform: scale(0.5); -webkit-transform-origin: left top; transform-origin: left top; }

</style>