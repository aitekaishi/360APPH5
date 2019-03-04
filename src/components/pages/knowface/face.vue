<template>
	<div class="hhh" style="height: 100vh; background-color: #f8f8f8; width: 100vw;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">人脸识别</x-header>
		</div>
		<div class="take">
    		<img :src="man"/><br />
    		<span>请将人脸正对屏幕进行拍照</span>
		</div>
    	<div class="reading">
    		<input type="file" class="file" id="A3" accept="image/*" capture="camera" @change="cameraA"/>
    		<x-button class="XB" :disabled="XB" @click.native="face()"  type="warn">准备好了，开始吧</x-button>
    	</div>
  </div>
</template>

<script>
	import {XButton,XHeader,Loading,Toast} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	import man from "../../../assets/web/man.png"
	export default {
		components: {XButton,XHeader,Loading,Toast},
		data (){ 
			return {
				XB:false,
				man:man,
				src:'',
				a:"liupan",
				loading:false,
				errorStatus: false,
        		errorMsg: '',
			}
		},
		methods:{
			cameraA(){
		       	let _this = this
		       	_this.loading = true
		        let formData = new FormData()
		        let imagefile = document.getElementById("A3")
		        formData.append('file', imagefile.files[0])
		        formData.append('type', 3)
				axios.post(api + '/file/upload?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM,formData, {
		          headers: {
		            'Content-Type': 'multipart/form-data'
		          }
		       }).then(function (res) {
					console.log(res.data)
					console.log(typeof(res.data.data))
					_this.loading = false
					if(res.data.code === 0) {
						localStorage.setItem("header",res.data.data)
						router.push('/userId')
					}
					_this.errorMsg = res.data.msg
					_this.errorStatus = true
					if(res.data.code === 110) {
						router.push('/login')
					}
				})
			},
			back(){
				router.push('/')
			}
		},
	}
</script>
<style lang="less">
	@import url("less/x-header.less");
	@import url("less/button.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.take{
		margin: 7rem auto;
		text-align: center;
		img{
			width: 50%;
		}
		span{
			display: inline-block;
			margin-top: 10vw;
			color: rgb(51,51,51);
			font-size: 0.9rem;
		}
	}
	.reading{
		margin-top: -5vw;
		text-align: center;
		input{
			position: relative;
			display: inline-block;
			z-index: 2!important;
			width: 100vw;
			height: 50px;
			background: yellow !important;
			opacity: 0;
		}
		.XB{
			width: 90%;
			z-index: 1 !important;
			position: relative;
			top: -50px;
		}
	}
</style>
				