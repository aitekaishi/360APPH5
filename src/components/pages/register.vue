<template>
  <div class="registerindex" style="height: 100vh;background: #FFF;width: 100vw;overflow-x: hidden;">
    <toast v-model="securityCodeSuccess" type="text" time=3000>验证码已发送</toast>
    <toast v-model="errorInfoStatus" type="text" time=3000>{{errorInfo}}</toast>
    <div class="register">
			<x-header style="background: #A073FA !important;" :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">注册</x-header>
    </div>
    <group class="registera">
      <x-input title="" class='assaasaasa' @input="changeDisabled"   placeholder="请输入手机号码" v-model="mobileNumber" type="number"></x-input>
			<div style="height: 60px;"></div>
      <x-input class="assaasaasa" title="" type="number" @input="changeDisabled" placeholder="请输入验证码" v-model="securityCode"></x-input>
      <x-button  id="securityCodezzz" type="primary" mini :disabled="securityCodeDisabled"
                  @click.native="getSecurityCode">获取验证码
        </x-button>
    </group>
    <div style="height: 5px;"></div>
    <grid :cols="1" class="cs">
      <grid-item class="scan-QR" @click.native="scanQRCode">
        <img v-show="haha" src="./svg/(Scan)_SFont.CN.svg" alt="">
        <!--<h4 style="display: none;">{{infoText}}</h4>-->
        <h4 v-show="name"><img :src='stateSrc'/></h4>
        <p class="grid-center" v-model="activationCode">{{qrCodeText}}</p>
      </grid-item>
    </grid>
		<p @click="liupanpan" style="text-align: center;position: relative;top: -70px;color: #4989F4;font-size: 12px;">没有激活码>>></p>
    <div class="registerbuttona">
      <x-button @click.native="register" type="warn" :disabled="btnDisabled">下一步</x-button>
    </div>
		<div class="plate">
				<x-dialog v-model="showdialog" hide-on-blur=true>
					<div class="dialogindex" style="text-align: left;">
						<div style="height: 10px;"></div>
							<p style="text-align: center;border-bottom: 1px solid #D9D9D9;padding-bottom: 10px;font-weight: 600;color: #000000 !important;width: 100%;">如何获取激活码?</p>
							<div style="height: 10px;"></div>
							<div style="padding-bottom: 15px;padding-left: 10px;padding-right: 10px;font-size: 13px;">方法1：<span>请咨询您的推荐人，获取激活码</span></div>
							<div style="padding-left: 10px;padding-right: 10px;font-size: 13px;"><p style="color: #000000 !important;">方法2：</p><span style="display: inline-block;position: relative;left: 45px;width: 60vw;top: -20px;">致电全国服务热线<span style="color: #4989F4;">400-8953-360</span>,向客服咨询激活码</span></div>
							<div style="padding-bottom: 10px;padding-left: 10px;padding-right: 10px;font-size: 13px;"><p style="color: #000000 !important;">方法3：</p><span style="display: inline-block;position: relative;left: 45px;width: 60vw;top: -20px;">关注公众号"360度车卡管家app",获取更多信息</span></div>
							<div style="color: #FFF;background: #D33C3C;font-size: 13px;text-align: center;padding: 15px;width: 96%; position: absolute;left: -10px;top: 47.5vh;" @click="showdialog = false">我知道了</div>
				</div>
					</x-dialog>
			</div>	
  </div>
</template>
<script>
  import {ViewBox, XHeader, Group, XInput, Cell, XButton, Grid, GridItem, Toast,Loading,XDialog} from 'vux'
  import api from '../../components/other/api-url'
  import globalPM from '../../components/other/global-parameter'
  import axios from 'axios'
  import MD5 from 'md5'
  import base64 from 'base-64'
 //var base64 = require('base-64');
  import Cookies from 'js-cookie'
  import router from '../../router/index'
  import scanQR from '../../assets/login/register-scan.png'
  import scanSuccess from '../../assets/login/success.png'
  export default {
    components: {ViewBox, XHeader, Group, XInput, Cell, XButton, Grid, GridItem, Toast,Loading,XDialog},
    data () {
      return {
        mobileNumber: '',
        securityCode: '',
        activationCode: '',
        btnDisabled: true,
        securityCodeDisabled: true,
        securityCodeSuccess: false,
        errorInfoStatus: false,
        errorInfo: '',
        stateSrc: scanSuccess,
        qrCodeText: '点击扫描激活码',
        infoText: '',
        loading: false,
				showdialog:false,
				securityCodea:'',
				name:false,
				haha:true,
      }
    },
    methods: {
			liupanpan(){
				let _this = this;
				_this.showdialog = true
			},
    	back(){
    		router.push('/login')
    	},
      changeDisabled () {
        
      },
      getSecurityCode () {
        let wait = 60
        function time (o) {
          if (wait === 0) {
            o.removeAttribute('disabled')
            o.innerHTML = '获取验证码'
            wait = 60
          } else {
            o.setAttribute('disabled', 'disabled')
            o.innerHTML = '重新发送(' + wait + ')'
            wait--
            setTimeout(function () {
              time(o)
            }, 1000)
          }
        }
        time(document.getElementById('securityCodezzz'));
        const _this = this; 
        //alert(this.mobileNumber.substring(this.mobileNumber.length-4))
        var base = base64.encode(this.mobileNumber.substring(this.mobileNumber.length-4));
        var basestr =  base.substring(base.length-4);
        var stringA='appVersion=1.0.0&osType=ANDRIOD&phone='+ this.mobileNumber + '&valid=0&validType=1&version=1.0.0';
				var stringSignTemp=stringA+basestr;
				var sign=MD5(stringSignTemp).toUpperCase();
       //alert(x)
        axios.post(api + '/user/sendValidCode?phone=' + this.mobileNumber + '&validType=1&valid=0&osType=ANDRIOD&appVersion=1.0.0&version=1.0.0'+'&sign=' + sign).then(function (response) {
          if (response.data.code === 0) {
          	console.log(response.data)
            _this.securityCodeSuccess = true
          } else {
            wait = 0
            _this.errorInfoStatus = true
            _this.errorInfo = response.data.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      register () {
        const _this = this
				localStorage.setItem('soujihao',_this.mobileNumber)
				localStorage.setItem('yanzhenma',_this.securityCode)
				var base = base64.encode(this.mobileNumber.substring(this.mobileNumber.length-4));
				var basestr =  base.substring(base.length-4);
        var stringA='appVersion=1.0.0&osType=ANDRIOD&phone='+ this.mobileNumber + '&valid=0'+'&validCode=' + _this.securityCode +'&validType=1&version=1.0.0';
				var stringSignTemp=stringA+basestr;
				var sign=MD5(stringSignTemp).toUpperCase();
				axios.post(api + '/user/checkValidCode?phone=' + _this.mobileNumber + '&validCode=' + _this.securityCode + '&validType=1&valid=0&osType=ANDRIOD&appVersion=1.0.0&version=1.0.0'+'&sign=' + sign).then(function (response) {
          console.log(response.data)
          if (response.data.code === 0) {
            if(localStorage.getItem('activationCode')!=null){
            	setTimeout(function(){
								router.push('/registera')
							},500)
            }else{
            	_this.errorInfoStatus = true
            	_this.errorInfo = "您还未扫描激活码"
            }
          } else {
          	//您还未扫描激活码
            _this.errorInfoStatus = true
            _this.errorInfo = response.data.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      scanQRCode () {
        const _this = this
        const wx = this.$wechat
        axios.post(api + '/baseconfig/getWxSign?' + 'url=' + location.href + '&uid=' + '&valid=0' + globalPM).then(function (response) {
          console.log(response.data.code)
          console.log(response.data)
          if (response.data.code !== 0) {
            _this.errorInfoStatus = true
            _this.errorInfo = response.data.msg
            _this.loading = false
            return
          }
          wx.config({
            debug: false,
            appId: response.data.data.appId,
            timestamp: response.data.data.timestamp,
            nonceStr: response.data.data.nonceStr,
            signature: response.data.data.signature,
            jsApiList: ['checkJsApi', 'scanQRCode']
          })
          wx.error(function (res) {
            alert('出错了：' + res.errMsg)
          })
          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['scanQRCode'],
              success: function (res) {
              }
            })
            wx.scanQRCode({
              needResult: 1,
              scanType: 'QRCode',
              success: function (res) {
                var result = encodeURI(res.resultStr)
                axios.post(api + '/activation/valid?' + 'activationCode=' + result + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (response) {
                  if (response.data.code !== 0) {
                    _this.errorInfoStatus = true
                    _this.errorInfo = response.data.msg
                    _this.loading = false
                    return
                  }
                  _this.name = true
                  _this.activationCode = result
									localStorage.setItem("activationCode",_this.activationCode)
                  _this.infoText = '验证成功'
                  _this.qrCodeText = '验证成功'
                  _this.haha = false
       
                })
              }
            })
          })
        })
      }

    },
    computer: {},
		updated(){
			//判断提交按钮可以点击
			const _this = this;
			if (this.mobileNumber.length == 11) {
				this.securityCodeDisabled = false
			}
			if (this.mobileNumber.length == 11 && this.securityCode.length === 6) {
				this.btnDisabled = false
			} else {
				this.btnDisabled = true
			}
			if (_this.mobileNumber.length == 12) {
						let e = _this.mobileNumber
						_this.mobileNumber = e.substr(0,(e.length-1))
					}
			if (_this.securityCode.length == 7) {
						let e = _this.securityCode
						_this.securityCode = e.substr(0,(e.length-1))
					}
		},
		created(){
			localStorage.removeItem('activationCode');
			console.log(base64.encode(1234));
		}
  }
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
  .scan-QR {
    text-align: center;
    color: #666;
    background: #fff;
    img {
      width: 2rem;
    }
    p {
      font-size: .7rem;
    }
  }
  #securityCodezzz {
    background-color: #FFF;
    width: 80px !important;
    padding: 0 !important;
    color: #D33C3C !important;
    border: 1px solid #D33C3C;
    position: absolute !important;
    top: 105px !important;
    left: ~"calc(91% - 80px)" !important;
		font-size: 12px !important;
		transform: scale(0.9) !important;
  }
  .register{
		.vux-header{
			z-index: 2;
			
		}
	}
	.registera{
		.vux-x-input.disabled{
				color: #000000 !important;
				background: none !important;
				-webkit-text-fill-color: #000000 !important;
			}
			input{
				position: relative;
				left: 0 !important;
			}
		.staina{
			input{
				position: relative;
				top:30px !important;
				left: 0;
				z-index: 10000;
			}
			
		}
		.weui-cell {
     padding: 0 !important;
     position: relative;
				left: 0 !important;
}
.weui-cell:before{
	left: 0 !important;
}
		position: relative;
		height: 210px;
		background: #FFF;
		.weui-cell{
			width: 80vw !important;
			margin:0 auto !important;
			.weui-icon-clear{
				display: none !important;
			}
		}
		.weui-cells:after,.weui-cell:before{
			width: 80vw !important;
			margin: 0 auto !important;
		}
		.weui-cells:after{
			margin-left: 14.8vw !important;
		}
		.weui-cell__ft{
			position: relative;
			left: 10vw;
		}
		.weui-cell:nth-of-type(1){
			margin-top: 30px !important;
		}
		.weui-cells:before{
			border: none !important;
		}
		.stain{
			input{
				color: #FFF !important;
			}
			
		}
	}
	.weui-grid:after{
		border: none !important;
	}
	.registerbuttona{
		position: relative;
		width: 90vw;
		margin: 0 auto;
		top: -30px;
	}
	.cs{
		position: relative;
		top: -70px;
	}
	.plate{
		.weui-dialog{
			 padding: 0px;
			     width: 80%!important;
					 height: 50vh !important;
					 .dialogindex{
					 	height: 60vh !important;
					 	overflow-y: scroll;
					 }
			.dialogindex{
				height: 50vh;
				overflow-y: scroll;
			}
		}
	}
		
</style>
