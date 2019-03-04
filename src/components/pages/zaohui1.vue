<template>
  <div class="forgotpassword" style="height: 100vh;background: #FFF !important;">
    <toast v-model="errorInfoStatus" type="text" time=3000>{{errorInfo}}</toast>
    <x-header style="background: #A073FA !important;" :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">找回密码</x-header>
    <div style="height: 20px;"></div>
    <div style="width: 90vw;text-align: center;margin: 0 auto;">
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 541.png" style="width: 30px;"/><figcaption style="color: #D33C3C;">身份认证</figcaption></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 542.png" style="width: 75px;position: relative;top: -33px;"/></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 543.png" style="width: 30px;"/><figcaption style="color: #B7B7B7;">重置密码</figcaption></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 544.png" style="width: 75px;position: relative;top: -33px;"/></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 545.png" style="width: 30px;"/><figcaption style="color: #B7B7B7;position: relative;left: 15px;">完成<span style="color: #FFFFFF;">认证</span></figcaption></figure>
    </div>
    <div style="height: 40px;"></div>
    <input style="outline: none;border: none;display: block;border-bottom: 1px solid #EEEEEE;width: 80vw;padding-bottom: 10px;margin: 0 auto;" type="number" v-model="a" placeholder="您注册时填写的手机号"/>
    <div style="height: 50px;"></div>
    <input style="outline: none;border: none;display: block;border-bottom: 1px solid #EEEEEE;width: 80vw;padding-bottom: 10px;margin: 0 auto;" v-model="b" placeholder="您注册时绑定的身份证号"/>
    <div style="height: 50px;"></div>
    <input style="outline: none;border: none;display: block;border-bottom: 1px solid #EEEEEE;width: 80vw;padding-bottom: 10px;margin: 0 auto;" type="number" v-model="c" placeholder="您绑定过的银行卡号"/>
		<div style="height: 50px;"></div>
    <div>
      <x-button class="buttom" @click.native="changePassword" type="warn" :disabled="btnDisabled">已填写，下一步</x-button>
    </div>
  </div>
</template>

<script>
  import {ViewBox, XHeader, Group, XInput, Cell, XButton, Toast} from 'vux'
  import api from '../../components/other/api-url'
  import globalPM from '../../components/other/global-parameter'
  import axios from 'axios'
  import MD5 from 'md5'
  import Cookies from 'js-cookie'
  import router from '../../router/index'
  import base64 from 'base-64'
  export default {
    components: {ViewBox, XHeader, Group, XInput, Cell, XButton, Toast},
    data () {
      return {
      	a:'',
      	b:'',
      	c:'',
        btnDisabled: true,
        errorInfoStatus: false,
        errorInfo: ''
      }
    },
    methods: {
    	back(){
    		router.push('/forgotPassword')
    	},
      changePassword () {
        const _this = this
        router.push('passwordb')
      }
    },
    computer: {},
    updated(){
			const _this = this;
			if (_this.a.length == 12) {
				let e = _this.a
				_this.a = e.substr(0,(e.length-1))
			}
			if (_this.b.length == 19) {
				let e = _this.b
				_this.b = e.substr(0,(e.length-1))
			}
			if (_this.a.length == 11 && _this.b.length == 18 && _this.c != '') {
				_this.btnDisabled = false
			}else{
				_this.btnDisabled = true
			}
			
		},
  }
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
</style>
