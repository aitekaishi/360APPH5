<template>
  <div class="forgotpassword" style="height: 100vh;background: #FFF !important;">
    <toast v-model="securityCodeSuccess" type="text" time=3000>验证码已发送</toast>
    <toast v-model="changePasswordSuccess" type="text" time=3000>密码修改成功！</toast>
    <toast v-model="errorInfoStatus" type="text" time=3000>{{errorInfo}}</toast>
    <x-header style="background: #A073FA !important;" :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">找回密码</x-header>
    <group class="forgot">
      <x-input title="" class='assaasaasaa' @input="changeDisabled" v-model="mobileNumber" placeholder="请输入手机号码" type="number"></x-input>
               <div style="height: 0;"></div>
      <x-input title="" @input="changeDisabled" v-model="securityCode" type="number" class="weui-vcode zzz assaasaasaa" placeholder="请输入验证码">
        <x-button slot="right" id="securityCodeaaa" type="primary" mini :disabled="securityCodeDisabled"
                  @click.native="getSecurityCode">获取验证码
        </x-button>
      </x-input>
      <div style="height: 10px;"></div>
      <x-input class='assaasaasaa' title="" @input="changeDisabled" type="password" v-model="newPassword" placeholder="设置新密码,由6-18位字母或数字组合"></x-input>
      <div style="height: 10px;"></div>
      <x-input class="assaasaasaa" title="" @input="changeDisabled" type="password" v-model="confirmPassword" placeholder="请再次确认新密码"></x-input>
    </group>
		<div style="height: 10px;"></div>
    <div>
      <x-button class="buttom" @click.native="changePassword" type="warn" :disabled="btnDisabled">完成</x-button>
    </div>
    <div style="height: 10px;"></div>
    <div style="text-align: center;"><a @click="zaohui" style="color: #5979E3 !important;text-decoration: underline !important;">手机收不到短信？</a></div>
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
        mobileNumber: '',
        securityCode: '',
        newPassword: '',
        confirmPassword: '',
        btnDisabled: true,
        securityCodeDisabled: true,
        securityCodeSuccess: false,
        changePasswordSuccess: false,
        errorInfoStatus: false,
        errorInfo: ''
      }
    },
    methods: {
    	zaohui(){
    		router.push('/passworda')
    	},
    	back(){
    		router.push('/login')
    	},
      changeDisabled () {
      	const _this = this;
        if (this.mobileNumber.length == 11 && this.securityCode.length == 6 && this.newPassword.length > 5 && this.confirmPassword.length > 5 && this.newPassword === this.confirmPassword) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
        
      },
      getSecurityCode () {
        const _this = this
        var base = base64.encode(this.mobileNumber.substring(this.mobileNumber.length-4));
        var basestr =  base.substring(base.length-4);
        var stringA='appVersion=1.0.0&osType=ANDRIOD&phone='+ this.mobileNumber + '&valid=0&validType=2&version=1.0.0';
				var stringSignTemp=stringA+basestr;
				var sign=MD5(stringSignTemp).toUpperCase();
        axios.post(api + '/user/sendValidCode?phone=' + this.mobileNumber + '&validType=2&valid=0' + globalPM +'&sign=' + sign).then(function (response) {
        	console.log(response.data)
          if (response.data.code === 0) {
            _this.securityCodeSuccess = true
            let wait = 60

        function time (o) {
          if (wait === 0) {
            o.removeAttribute('disabled')
            o.innerHTML = '获取验证码'
            wait = 60
          } else {
            o.setAttribute('disabled', 'disabled')
            o.innerHTML = '(' + wait + ')s重新发送'
            wait--
            setTimeout(function () {
              time(o)
            }, 1000)
          }
        }
        time(document.getElementById('securityCodeaaa'))
          } else {
            _this.errorInfoStatus = true
            _this.errorInfo = response.data.msg
          }
        })
      },
      changePassword () {
        const _this = this
        axios.post(api + '/user/findPasswd?loginName=' + this.mobileNumber + '&passwd=' + MD5(this.newPassword) + '&validCode=' + this.securityCode + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (response) {
          if (response.data.code === 0) {
            _this.changePasswordSuccess = true
            setTimeout(function  () {
	          	 router.push('/login')
	          },1000)
          } else {
            _this.errorInfoStatus = true
            _this.errorInfo = response.data.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    computer: {},
    updated(){
			const _this = this;
			if (_this.securityCode.length == 7) {
						let e = _this.securityCode
						_this.securityCode = e.substr(0,(e.length-1))
					}
			if (_this.mobileNumber.length == 11) {
						_this.securityCodeDisabled = false
					}
			if (_this.mobileNumber.length == 12) {
						let e = _this.mobileNumber
						_this.mobileNumber = e.substr(0,(e.length-1))
					}
			
		},
  }
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
  #securityCodeaaa{
    background-color: #FFF;
    color: #D33C3C !important;
    border: 1px solid #D33C3C;
    z-index: 10000 !important;
    padding: 0;
  	margin: 0;
  	width: 90px !important;
  	position: relative;
  	top: -8px !important;
  	font-size: 12px !important;
		transform: scale(0.9) !important;
		left: ~"calc(100% - 80px)" !important;
  }
  .zzz{
  	.weui-icon-clear:before{
  		display: none;
  	}
  }
  .forgot{
  	.weui-cells{
  		padding: 20px;
  	}
  	.weui-input {
	    margin-left: 0 !important;
	}
  	.weui-btn{
  		    padding-top: 0!important;
    		padding-bottom: 0!important;
  	}
  	.weui-cells:after{
  		border-bottom: none !important;
  	}
  	.weui-cells:before{
  		border-top: none !important;
  	}
  }
</style>
