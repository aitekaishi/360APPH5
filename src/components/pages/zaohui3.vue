<template>
  <div class="forgotpassword" style="height: 100vh;background: #FFF !important;">
    <toast v-model="errorInfoStatus" type="text" time=3000>{{errorInfo}}</toast>
    <x-header style="background: #A073FA !important;" :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">找回密码</x-header>
    <div style="height: 20px;"></div>
    <div style="width: 90vw;text-align: center;margin: 0 auto;">
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 541.png" style="width: 30px;"/><figcaption style="color: #D33C3C;">身份认证</figcaption></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 547.png" style="width: 75px;position: relative;top: -33px;"/></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 548.png" style="width: 30px;"/><figcaption style="color: #D33C3C;">重置密码</figcaption></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 542.png" style="width: 75px;position: relative;top: -33px;"/></figure>
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 545.png" style="width: 30px;"/><figcaption style="color: #B7B7B7;position: relative;left: 15px;">完成<span style="color: #FFFFFF;">认证</span></figcaption></figure>
    </div>
    <div style="height: 40px;"></div>
    <input style="outline: none;border: none;display: block;border-bottom: 1px solid #EEEEEE;width: 80vw;padding-bottom: 10px;margin: 0 auto;" type="number" v-model="a" placeholder="请输入新手机号"/>
    <div style="height: 50px;"></div>
    <input style="outline: none;border: none;display: block;border-bottom: 1px solid #EEEEEE;width: 80vw;padding-bottom: 10px;margin: 0 auto;" v-model="b" placeholder="请输入验证码"/>
    <div style="width: 80vw;margin: 0 auto;"><div @click="fasong" style="width: 70px;padding: 3px 5px;border-radius: 5px;color: #DA4C45;border: 1px solid #DA4C45;float: right;position: relative;top: -45px;">获取验证码</div></div>
    <div style="height: 50px;"></div>
    <div>
      <x-button class="buttom" @click.native="changePassword" type="warn" :disabled="btnDisabled">确认</x-button>
    </div>
    <div style="height: 10px;"></div>
    <div style="text-align: center;color: #999999;font-size: 12px;">新手机号绑定后，原手机号不可以登录</div>
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
        btnDisabled: true,
        errorInfoStatus: false,
        errorInfo: ''
      }
    },
    methods: {
    	back(){
    		router.push('/passwordb')
    	},
      changePassword () {
        const _this = this
        router.push('passwordd')
      },
      fasong(){
      	
      }
    },
    computer: {},
    updated(){
			const _this = this;
			if (_this.a.length == 12) {
				let e = _this.a
				_this.a = e.substr(0,(e.length-1))
			}
			if (_this.b.length == 7) {
				let e = _this.b
				_this.b = e.substr(0,(e.length-1))
			}
			if (_this.a.length == 11 && _this.b.length == 6) {
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
	.aaaaaaaaaa{
		background: #FFFFFF !important;
		color: #D33C3C !important;
		border: 1px solid #D33C3C !important;
	}
</style>
