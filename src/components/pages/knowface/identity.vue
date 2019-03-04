<template>
	<div class="bbb" style="height: 100vh;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back" class="xH">确认身份信息</x-header>
		</div>
    	<div class="idinfo">
    		<group>
    			<cell class="cellname" title="姓名" :value="name"></cell>
    			<cell class="cellname" title="身份证号码" :value="idcard"></cell>
    		</group>
    	</div>
    	<div class="restartID">
    			<img src="../../../assets/web/notice.png"/>如身份信息有误请重新拍照
    	</div>
    	<div class="IDbutton">
    		<x-button class="XBbb" :disabled="XBA" @click.native="restart()"  type="warn">重新拍照</x-button>
    		<x-button class="XBbb" :disabled="XBB" @click.native="confirm()"  type="warn">确认</x-button>
    	</div>
  	</div>
</template>
<script>
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,Loading,Toast} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,Loading,Toast},
		data (){
			return {
				name:"",
				idcard:'',
				XBA:false,
				XBB:false,
				loading:false,
				errorStatus: false,
        		errorMsg: '',
			}
		},
		methods:{
			//重新拍照
			restart:function  () { 
				router.push('/face')
			},
			//确认成功实名认证完成
			confirm:function  () {
				let _this = this;
				_this.loading = true
				console.log(localStorage.getItem("headera"))
				axios.post(api + '/user/real/auth?userFaceImg=' + localStorage.getItem("header") + '&idCardFaceImg=' + localStorage.getItem("headera") + '&idCardBackImg=' + localStorage.getItem("headerb") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false;
					console.log(res.data);
					if (res.data.code === 0) {
						_this.errorStatus = true
						_this.errorMsg = "认证成功"
						setTimeout(function  () {
							router.push('/')
						},500)
					}else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		          	if (res.data.code === 110) {router.push('/login')}
				})
			},
			back(){
				router.push('/userId')
			}
		},
		created(){
			let _this = this;
			_this.loading = true
			console.log("身份证正面照扫描")
			console.log(localStorage.getItem("headera"))
			axios.post(api + '/user/real/ocr?idCardFaceImg=' + localStorage.getItem("headera") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				_this.loading = false;
				console.log(res.data);
				if (res.data.code === 0) {
					_this.name = res.data.data.realName
					_this.idcard = res.data.data.idCard
				}else{
					_this.name = ''
					_this.idcard = ''
					_this.errorStatus = true
					_this.errorMsg = res.data.msg
				}
	          	if (res.data.code === 110) {router.push('/login')}
			})
		}
	}
</script>
<style lang="less">
	@import url("less/x-header.less");
	@import url("less/button.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.idinfo{
		position: relative;
		margin-bottom: 40vw;
		top:-16px;
		.cell{
			padding: 1rem;
			font-size: 1.1rem;
		}
		.weui-cell__ft{
			color: #000;
		}
		.cellname{
			padding: 2vw;
			border-top: 1px solid #D9D9D9;
		}
		.weui-cell:before{
			border-top: none !important;
		}
		p{
			color: #000000 !important;
		}
	}
	.restartID{
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
		height: 2rem;
		line-height: 2rem;
		color: #999999 !important;
		position: relative;
		top: -30px;
		img{
			width: 18px !important;
			position: relative;
			top: 4px;
		}
	}
	.IDbutton{
		text-align: center;
		position: relative;
		top: -50px;
		.XBbb{
			margin: 0.2rem;
			display: inline-block;
			width: 43.5% !important;
		}
	}
</style>
				