<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;position: relative;" class="cardmanage">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">卡管理</x-header>
		</div>
		<group class="cardmanageindex cardmanageindexa">
			<cell :title="title" :inline-desc="weihao" is-link>
				<img slot="icon" width="50" style="display:block;margin-right:20px;border-radius: 50%;" :src="imgurl">
			</cell>
		</group>
		<group class="cardmanageindex cardmanageindexb">
			<popup-picker class='assa' title="账单日 : " popup-title="日期选择" :data="kuaijielista" v-model="kuaijiea" confirm-text="确定" disabled=true @on-change="namea"></popup-picker>
    		<popup-picker title="还款日 : " popup-title="日期选择"  :data="kuaijielistb" v-model="kuaijieb" confirm-text="确定" disabled=true @on-change="nameb"></popup-picker>
		</group>
		<div class="xgai">
			<p @click="deletea()" style="font-size: 18px;position: relative;left: 85vw;color: red;top: -175px;visibility: hidden;">删除</p>
			<p @click="xgaiaa()" style="font-size: 14px;position: relative;left: 85vw;color: blue;top: -133px;">修改</p>
			<p @click="xgaibb()" style="font-size: 14px;position: relative;left: 85vw;color: blue;top: -106px;">修改</p>
		</div>
		<group class="cardmanageindex cardmanageindexc">
    		<x-input class='assa' title="单笔限额 : " readonly=true v-model="inputmoneya" type='number' mask="9999999999999999999999999999999999999999999"></x-input>
    		<x-input title="单日限额 : " readonly=true v-model="inputmoneyb" type='number' mask="9999999999999999999999999999999999999999999"></x-input>
		</group>
		<div class="xgaia">
			<p @click="deletea()" style="font-size: 18px;position: relative;left: 85vw;color: red;top: -175px;visibility: hidden;">删除</p>
			<p @click="xgaiaaa()" :class="{blue:uuu==0,bluea:uuu==1}" style="font-size: 14px;position: relative;left: 85vw;top: -133px;">修改</p>
			<p @click="xgaibbb()" :class="{blue:uuu==0,bluea:uuu==1}" style="font-size: 14px;position: relative;left: 85vw;top: -106px;">修改</p>
		</div>
		<p @click="deletea()" style="font-size: 14px;color: #D84C29;background: #FFF;padding: 15px;text-align: center;position: relative;top: -150px;">删除</p>
    	<div class="cardmanagemask" @click="mask" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: absolute;top: 0;left: 1px;display: none;"></div>
    	<div class="mamama">
	      <x-dialog class="sasasasa" v-model="showdialog" hide-on-blur=true>
		        <div class="dialogindex" style="text-align: center;word-wrap:break-word">
		          	<h4 style="font-size: 16px;">提示</h4>
		          	<div style="margin-top: 15px;font-size: 16px;text-align: left;">您确定要删除尾号{{weihao1}}的{{title}}信用卡吗？</div>
		          	<x-button @click.native="closea" type="warn" style="margin-top: 50px;width: 20vw !important;display: inline-block;color: #000;background: #fff;text-align: left;font-size: 16px !important;font-weight: 600;">取消</x-button>
		          	<x-button @click.native="closeb" type="warn" style="margin-top: 50px;width: 20vw !important;display: inline-block;color: #000;background: #fff;text-align: right;font-size: 16px !important;font-weight: 600;">删除</x-button>
				</div>
				<div style="height: 1px;width: 100vw;background: #999999;position: relative;left: -20px;top: -50px;"></div>
				<div style="height: 50px;width: 1px;margin: 0 auto;background: #999999;position: relative;top: -50px;"></div>
	        </x-dialog>
	        
	    </div>
	</div>
</template>

<script>
	import store from '@/store'
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,ChinaAddressV4Data,Toast,Loading,Confirm,XDialog} from 'vux'
	import api from '../../components/other/api-url'
  	import globalPM from '../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import '../../../static/js/bankCardAttribution'
	import bin from './bin.json'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,Toast,Loading,Confirm,XDialog},
		data (){ 
			return {
				show:false,
				XB:false,
				loading:false,
				errorStatus: false,
        		errorMsg: '',
        		title:"",
        		weihao:"",
        		weihao1:"",
        		imgurl:'',
        		showdialog:false,
        		kuaijielista:[['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']],
        		kuaijielistb:[['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']],
        		
        		kuaijiea:[],
        		kuaijieb:[],
        		ddd:true,
        		inputmoneya:'',
        		inputmoneyb:'',
        		uuu:'',
			}
		},
		methods:{
			back(){
				router.push('/cardlist')
			},
			/*卡管理（修改账单日、还款日、单笔限额、单日限额）   
			/user/repay/updateCard   
			id Long Y 卡ID
			billDay Integer Y 账单日
			payDay Integer Y 还款日
			singleAmount Integer Y 单笔限额 （单位分）
			dayAmount Integer Y 单日限额（单位分）*/
			namea(){
				let _this = this
				//_this.kuaijiea = _this.kuaijiea.toString().replace('','')
				axios.post(api + '/user/repay/updateCard?id=' + localStorage.getItem("yhcard") + '&billDay=' + _this.kuaijiea.toString().split('日')[0].replace('','') + '&payDay=' + _this.kuaijieb.toString().split('日')[0].replace('','')+ '&singleAmount=' + _this.inputmoneya*100 + '&dayAmount=' + _this.inputmoneyb*100 + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
					}else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			},
			closea(){
				const _this = this;
				_this.showdialog = false;
			},
			closeb(){
				const _this = this;
				_this.showdialog = false;
				axios.post(api + '/user/repay/unBindRepayCard?id=' + localStorage.getItem("yhcard") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
						_this.errorMsg = "删除成功"
						_this.errorStatus = true
						setTimeout(function  () {
							router.push('/cardlist')
						},500)
					}else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			},
			nameb(){
				let _this = this
				//_this.kuaijieb = _this.kuaijieb.toString().replace('','')
				axios.post(api + '/user/repay/updateCard?id=' + localStorage.getItem("yhcard") + '&billDay=' + _this.kuaijiea.toString().split('日')[0].replace('','') + '&payDay=' + _this.kuaijieb.toString().split('日')[0].replace('','')+ '&singleAmount=' + _this.inputmoneya*100 + '&dayAmount=' + _this.inputmoneyb*100 + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
					}else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			},
			deletea(){
				console.log("删除")
				let _this = this
				_this.showdialog = true;
			},
			
			xgaiaa(){
				$('body>div:nth-of-type(2)>div').show('blind',{direction:'down'},100)
				$('.cardmanagemask').show()
			},
			xgaiaaa(){
				let _this = this
				//$('.cardmanageindexc .vux-x-input:nth-of-type(1) input').focus()
				localStorage.setItem('a',_this.kuaijiea.toString().split('日')[0].replace('',''))
				localStorage.setItem('b',_this.kuaijieb.toString().split('日')[0].replace('',''))
				if (localStorage.getItem('subUpdate')==0) {
					router.push('/singleday')
				}
			},
			xgaibbb(){
				let _this = this
				//$('.cardmanageindexc .vux-x-input:nth-of-type(2) input').focus()
				localStorage.setItem('a',_this.kuaijiea.toString().split('日')[0].replace('',''))
				localStorage.setItem('b',_this.kuaijieb.toString().split('日')[0].replace('',''))
				if (localStorage.getItem('subUpdate')==0) {
					router.push('/singledaya')
				}
			},
			xgaibb(){
				$('body>div:nth-of-type(3)>div').show('blind',{direction:'down'},100)
				$('.cardmanagemask').show()
			},
			handleScrolla(){
				$('body>div:nth-of-type(2)>div').hide('blind',{direction:'down'},100)
				$('.cardmanagemask').hide()
			},
			handleScrollb(){
				$('body>div:nth-of-type(3)>div').hide('blind',{direction:'down'},100)
				$('.cardmanagemask').hide()
			},
			mask(){
				$('.cardmanagemask').hide()
				$('body>div:nth-of-type(2)>div').hide('blind',{direction:'down'},100)
				$('body>div:nth-of-type(3)>div').hide('blind',{direction:'down'},100)
			}
		},
		created(){
			let _this = this
			_this.uuu = localStorage.getItem('subUpdate')
			_this.title = localStorage.getItem('yhname')
			_this.weihao = "尾号"+'('+localStorage.getItem('yhweihao')+')'
			_this.weihao1 = localStorage.getItem('yhweihao')
			_this.imgurl = localStorage.getItem('yhimg')
			_this.kuaijiea = [localStorage.getItem('zdanri')+'日']
			_this.kuaijieb = [localStorage.getItem('huankuanri')+'日']
			_this.inputmoneya = localStorage.getItem('singleAmount')
			_this.inputmoneyb = localStorage.getItem('dayAmount')
			if (localStorage.getItem('subUpdate')==1) {
				_this.ddd = true
			} else{
				_this.ddd = true
			}
		},
		updated(){
		},
		mounted(){
			document.getElementsByClassName('vux-popup-header-right')[0].addEventListener('click', this.handleScrolla, true);
			document.getElementsByClassName('vux-popup-header-right')[1].addEventListener('click', this.handleScrollb, true);
		}
	}
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.cardmanage .cardbutton{
		width: 100%;
		margin: 0 auto;
	}
	.cardmanage .cardmanageindex{
		position: relative;
		top: -20px;
	}
	.cardmanage{
		.vux-cell-box{
			.vux-popup-picker-select{
				text-align: left !important;
				margin-left: 10px !important;
				span{
					color: #000 !important;
				}
			}
		}
		.weui-cell__ft:after{
			border-color: #FFF !important;
			opacity: 0 !important;
		}
		.cardmanageindexa{
			.weui-cell__ft{
				color: red !important; 
			}
			
			.weui-cell{
				padding: 25px 15px !important;
			}
		}
		.cardmanageindexb{
			.weui-cell__ft{
				color: blue !important; 
			}
		}
		.cardmanageindexc{
			position: relative;
			top: -100px;
			.weui-label{
				width: 80px !important;
			}
			.vux-x-input.disabled{
				color: #000 !important;
			}
		}
		.xgaia{
			position: relative;
			top: -80px;
		}
	}
	.blue{
		color: blue;
	}
	.bluea{
		color: #999999;
	}
	.cardmanageindexc .weui-input {
	    position: relative;
	    left: -20px!important;
	}
	.sasasasa{
		.weui-dialog{
			height: 180px !important;
		}
	}
</style>
				