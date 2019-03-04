<template>
	<div class="tttt" style="height: 180vw;background-color: #f8f8f8;overflow: hidden;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back" class="xH">认证用户</x-header>
		</div>
		<div class="containeruser">
			<div class="containeruserA A1" id="A">
				<img id="one" src="../../../assets/web/transprant.png"/>
			</div>
		</div>
		<div class="containeruserBA">
			<input type="file" @change="cameraA" class="file" id="A1" accept="image/*" capture="camera" style="cursor: pointer;"/>
			<img src="../../../assets/web/camera.png"/>
		</div>
		<div class="span">
			<span>请上传身份证正面照片</span>
		</div>
		<div class="containeruser" id="twoIDA">
			<div class="containeruserA A2" id="B">
				<img id="two" src="../../../assets/web/transprant.png"/>
			</div>
		</div>
		<div class="containeruserBB">
			<input type="file" @change="cameraB" class="file file2" id="A2" accept="image/*" capture="camera" style="cursor: pointer;"/>
			<img src="../../../assets/web/camera.png"/>
		</div>
		<div class="span" id="twoIDC">
			<span>请上传身份证国徽面照片</span>
		</div>
		<div class="noticeID">
			<img src="../../../assets/web/notice.png"/>
			<span>
				&nbsp;&nbsp;点击图片可以重新上传
			</span>
		</div>
    	<div class="readingID">
    		<x-button class="XB" :disabled="XB" @click.native="face()"  type="warn">下一步</x-button>
    		<img id="arr" src=""/>
    	</div>
  </div>
</template>

<script>
	import {XButton,XHeader,Toast,Loading} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	import imga from '../../../assets/web/transprant.png'
	export default {
		components: {XButton,XHeader,Toast,Loading},
		data (){ 
			return {
				XB:true,
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
				var f = document.getElementById('A1')
				formData.append('file', f.files[0])
				formData.append('type', 3)
 				if (typeof(f.files[0])!="undefined") {
 					console.log(f.files[0])
 					var reader = new FileReader();
 					var imgFile;
 					reader.onload=function(e) {
				        imgFile = e.target.result;
				        $("#one").attr('src', imgFile);
				
				    };
				    reader.readAsDataURL(f.files[0]);
 				}
 				axios.post(api + '/file/upload?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM,formData, {
		          headers: {
		            'Content-Type': 'multipart/form-data'
		          }
		       }).then(function (res) {
					console.log(res.data.data)
					console.log(typeof(res.data.data))
					_this.loading = false
					if(res.data.code === 0) {
						localStorage.setItem("headera",res.data.data)
						console.log("headera")
						console.log(localStorage.getItem('headera'))
					}else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
					if(res.data.code === 110) {
						router.push('/login')
					}
				})
			},
			cameraB(){
				let _this = this
				_this.loading = true
		        let formData = new FormData()
				var f = document.getElementById('A2')
				formData.append('file', f.files[0])
				formData.append('type', 3)
 				if (typeof(f.files[0])!="undefined") {
 					console.log(f.files[0])
 					var reader = new FileReader();
 					var imgFile;
 					reader.onload=function(e) {
				        imgFile = e.target.result;
				        $("#two").attr('src', imgFile);
				    };
				    reader.readAsDataURL(f.files[0]);
 				}
 				axios.post(api + '/file/upload?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM,formData, {
		          headers: {
		            'Content-Type': 'multipart/form-data'
		          }
		       }).then(function (res) {
					console.log(res.data.data)
					console.log(typeof(res.data.data))
					_this.loading = false
					if(res.data.code === 0) {
						localStorage.setItem("headerb",res.data.data)
						console.log("headerb")
						console.log(localStorage.getItem('headerb'))
					}else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
					if(res.data.code === 110) {
						router.push('/login')
					}
				})
			},
			face(){
				router.push('/idinfo')
			},
			back(){
				router.push('/face')
			}
		},
		created(){
			console.log('userId')
			console.log(localStorage.getItem("header"))
		},
		mounted(){
			
		},
		updated(){
			//判断提交按钮可以点击
			const _this = this
			if (localStorage.getItem('headera')!=="undefined"&&localStorage.getItem('headerb')!=="undefined") {
				_this.XB = false;
			}else{
				_this.XB=true
			}
		}
	}		
</script>
<style lang="less">
	@import url("less/x-header.less");
	@import url("less/button.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.containeruser{
		width: 100%;
		text-align: center;
		.containeruserA{
			width:85%;
			background:#DDDDDD;
			border-radius: 5vw;
			margin: 5vw auto;
			overflow: hidden;
			height: 47vw;	
			padding:0;
			img{
				width: 100%;
			}
		}
	}
	.containeruserBB,.containeruserBA{
		position: relative;
		width: 100%;
		text-align: center;
		img{
			position: relative;
			width: 17%;
			top: -57vw;
			left: 0;
		}
		.file{
			width: 100%;
			height: 20vw;
			position: relative;
			opacity: 0;
			background: red;
			z-index: 1000000;
		}
		#A1{
			top: -38vw;
		}
		#A2{
			top: -73vw;
		}
	}
	.containeruserBB{
		img{
			top: -92vw;
		}
	}
	.readingID{
		text-align: center;
		position: relative;
		.XB{
		width: 90%;
		position: relative;
		top: -74vw;
		}
	}
	.span{
		color: rgb(51,51,51);
		text-align: center;
		font-size: 0.9rem;
		position: relative;
		top: -38vw;
	}
	#twoIDA{
		position: relative;
		top: -35vw;
	}
	#twoIDC{
		position: relative;
		top: -73vw;
	}
	.noticeID{
		text-align: center;
		position: relative;
		top: -70vw;
		img{
			width: 18px;
			position: relative;
			top: 20px !important;
		}
		span{
			color: rgb(153,153,153);
			display: inline-block;
			position: relative;
			top: -0.3rem;
		}
	}
	/*@media screen and (orientation: portrait) {
		
    }
	@media screen and (orientation: landscape) {
		
	}*/
	#one,#two{
		position: relative;
		top: -80px !important;
		transform: rotate(270deg);
		-webkit-transform: rotate(270deg);
		-moz-transform: rotate(270deg);
	}
</style>
				