<template>
  <div class="settingindex" style="width:100vw;height: 100vh;overflow-x: hidden;">
    <loading :show="loading"></loading>
    <toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
    <toast v-model="changePasswordSuccess" type="text">清除成功</toast>
    <x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">设置</x-header>
    <group style="position: relative;top: -20px;">
    	<cell title="清除缓存" class='assa'  @click.native="qingchu"></cell>
      <cell v-show="sss" title="修改密码" is-link link="/changePassword"></cell>
    </group>
    <div>
      <div v-show="sss" style="text-align: center;font-size: 17px;background: #D33C3C;padding-top: 8px;padding-bottom: 8px;width: 90vw;margin: 0 auto; color: #FFF; border-radius: 5px;" @click="showa">退出登录</div>
    </div>
    <actionsheet v-model="show" :menus="menus" @on-click-menu="click" show-cancel @on-click-menu-menu1='loginOut'></actionsheet>
  </div>
</template>

<script>
  import {ViewBox, Group, XButton, Tabbar, TabbarItem, Grid, GridItem, Cell, Toast, XHeader, Loading,Actionsheet } from 'vux'
  import api from '../../components/other/api-url'
  import globalPM from '../../components/other/global-parameter'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import router from '../../router/index'
  export default {
    components: {ViewBox, Group, XButton, Tabbar, TabbarItem, Grid, GridItem, Cell, Toast, XHeader, Loading,Actionsheet },
    data () {
      return {
      	errorStatus: false,
				errorMsg: '',
        loading: false,
        changePasswordSuccess:false,
        show:false,
        menus: {
        menu1: "退出登录",
        sss:false,
      },
      }
    },
    methods: {
      loginOut () {
        let _this = this
        _this.loading = true
        axios.post(api + '/user/logout?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (response) {
          console.log(response)
          _this.loading = false
          localStorage.removeItem('uid')
          localStorage.removeItem('token')
          localStorage.removeItem('nickName')
          localStorage.removeItem('userHeader')
          _this.errorMsg = '退出成功'
	        _this.errorStatus = true
          setTimeout(function  () {
	      		router.push('/my')
	      	},500)
        }).catch(function (error) {
          console.log(error)
          
        })
      },
      back(){
      	router.push('/my')
      },
      qingchu(){
      	let _this = this;
      	_this.changePasswordSuccess = true
      },
      showa(){
      	let _this = this;
      	_this.show = true
      }
    },
    created(){
    	let _this = this;
    	if (localStorage.getItem('isLogin')=='true') {
    		_this.sss = true
    	} else{
    		_this.sss = false
    	}
    }
  }
</script>
<style lang="less">
	 @import url("../../assets/main.less");
	 @import url("../../assets/update.less");
	 .vux-actionsheet-menu-default:nth-of-type(2){
	 	display: none;
	 }
</style>
