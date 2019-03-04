<template>
  <div class="changeoassword" style="height: 100vh;background: #FFF;width: 100vw;overflow: hidden;text-align: center;">
    <toast v-model="feedbackStatus" type="text" time=3000>{{feedbackMsg}}</toast>
    <x-header style="background: #A073FA !important;" :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">修改密码</x-header>
    <div style="height: 20px;"></div>
    <group class="forgota">
      <x-input title=" " class='assa' placeholder="请输入您的旧密码" @input="changeDisabled" type="password" v-model="oldPassword" :min="6"></x-input>
      <x-input title=" " class='assa' placeholder="请设置您的新密码" @input="changeDisabled" type="password" v-model="newPassword" :min="6"></x-input>
      <x-input title=" " class='assa' placeholder="请再次确认新密码" @input="changeDisabled" type="password" v-model="confirmPassword" :min="6"></x-input>
			
    </group>
    <div style="text-align: center;">
      <x-button class="buttom" @click.native="changePassword" type="warn" :disabled="btnDisabled">完成</x-button>
      <div style="top: -240px;" class="passworddiv"></div>
      <div style="top: -105px;" class="passworddiv"></div>
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
  export default {
    components: {ViewBox, XHeader, Group, XInput, Cell, XButton, Toast},
    data () {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        btnDisabled: true,
        feedbackStatus: false,
        feedbackMsg: '',
      }
    },
    methods: {
    	back(){
    		router.push('/setting');
    	},
      changeDisabled () {
        if (this.oldPassword.length > 0 && this.newPassword.length > 0 && this.confirmPassword.length > 0 && this.newPassword === this.confirmPassword) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      },
      changePassword () {
        let _this = this
        axios.post(api + '/user/modifyPasswd?&passwd=' + MD5(this.oldPassword) + '&newPasswd=' + MD5(this.newPassword) + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
          console.log(res)
          if (res.data.code === 0) {
            _this.feedbackStatus = true
            _this.feedbackMsg = "修改密码成功"
            setTimeout(function  () {
            	router.push('/login')
            },1000)
          } else {
            _this.feedbackStatus = true
            _this.feedbackMsg = res.data.msg
          }
        }).catch()
      }
    },
  }
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
  .forgota{
  	position: relative;
  	top: -10px;
  	left:-8px;
  	.weui-cells{
  		padding: 20px;
  	}
  	.weui-cells:after{
  		border-bottom: none !important;
  	}
  	.weui-cells:before{
  		border-top: none !important;
  	}
  	input{
  		position: relative;
  		top: 10px;
  		left: -44px;
  	}
  }
  .forgota .weui-cells:after{
  	width: ~"calc(100% - 53px)";
  	position: absolute;
  	left: 30px !important;
  	top: 210px;
  }
  .buttom{
  	width: 90% !important;
  }
</style>