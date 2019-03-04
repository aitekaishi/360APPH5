<template>
  <div class="forgotpassword" style="height: 100vh;background: #FFF !important;">
    <toast v-model="errorInfoStatus" type="text" time=3000>{{errorInfo}}</toast>
    <x-header style="background: #A073FA !important;" :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">重置密码成功</x-header>
    <div style="height: 100px;"></div>
    <div style="width: 90vw;text-align: center;margin: 0 auto;">
    	<figure style="text-align: center;display: inline-block;"><img src="../../assets/password/组 486.png" style="width: 90px;"/><figcaption style="color: #333333;font-size: 23px;">成功设置新密码</figcaption></figure>
    </div>
    <div style="height: 50px;"></div>
    <div style="text-align: center;color: #999999;font-size: 17px;">您可以使用新手机号登录了</div>
    <div style="height: 80px;"></div>
    <div>
      <x-button class="aaaaaaaaaaa" @click.native="changePassword" :disabled="btnDisabled">完成</x-button>
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
        btnDisabled: false,
        errorInfoStatus: false,
        errorInfo: ''
      }
    },
    methods: {
    	back(){
    		router.push('/passwordc')
    	},
      changePassword () {
        const _this = this
        router.push('/login')
      },
    },
    computer: {},
    updated(){
			
		},
  }
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.aaaaaaaaaaa{
		width: 80vw !important;
		background: #FFFFFF !important;
		color: #D33C3C !important;
		border: 1px solid #D33C3C !important;
		border-radius: 35px !important;
	}
</style>
