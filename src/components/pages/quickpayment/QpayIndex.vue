<template>
	<div class="uuu" style="height: 100vh;width: 100vw;overflow-x: hidden !important;position: relative;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">向商家付款-通道{{nex}}</x-header>
			<img @click="hisiorybilla()" src="../../../assets/web/hisory.svg" style="width: 22px;height: 25px;position: absolute;top: 10px;left: 90vw;z-index: 1000;"/>
		</div>
		<div class="inputM">
    		<x-input title="￥   " v-model="inputmoney" type='number' class="monery" placeholder="输入金额" mask="9999999999999999999999999999999999999999999" ></x-input>
    		<span>交易手续费万分之60，单笔固定手续费1元</span>	
		</div>
    	<div class="Caccountindex">
    		<group>
    			<div class="settel">
    				<cell title="收款账户" class='assa'  @click.native="change()" v-model="settlecard" is-link></cell>
    			</div>
    			<div class="pay">
    				<cell @click.native="addpayment()" title="支付卡" v-model="paycard" is-link></cell>
    			</div>
    			<!--<popup-picker v-show="pop" @click.native="addpayway()" :data="kuaijielist" v-model="kuaijie" confirm-text="确定"></popup-picker>-->
    		</group>
    	</div>
    	<div  class="Caccountlishi" style="visibility: hidden;"><a @click="historybill()">查看支持银行列表</a></div>
    	<div class="confirmcard">
    		<x-button :disabled="XB" @click.native="confirm()" type="warn">提交</x-button>
    	</div>
    	<div class="cell-paya" style="display: none;z-index: 1000;text-align: left !important;background: #FFF;">
    		<div class="cell-title" style="width: 100%;min-height: 40vh;">
    			<div style="width: 100vw;">
    				<div class="maneaaaa" style=" width: 100vw;float: left;cursor: pointer;color: blue;background: #F8F8F8;padding: 10px;border-bottom: 1px solid #CDCDCD;" @click="endita()">取消</div>
    				<div style="float: right;cursor: pointer;color: blue;background: #F8F8F8;padding: 10px;position: relative;top: -42px;visibility: hidden;" @click="add()">添加</div>
    			
    			</div>
    			<div style="width: 100%;height: 0;clear: both;"></div>
    			<div class="content" v-for="item in paycardlista" style="text-align: center;background: #FFF;">
    				<div style="width: 100%;">
    					<img class="havea imga" src="../svg/_ionicons_svg_md-remove-circle-outline.svg" style="width: 30px;float: left;margin-left: 0;"/> 
    					<div>
    						<img :src=item.bankImg style="width: 30px;height: 30px;"/><span style="display: inline-block;position: relative;top: -8px;left: 10px;width: 50vw;text-align: left;">{{item.bankName+'('+item.bankCard+")"}}</span>
    					</div>
    					<span :id=item.id class="havea remove" style="float: right;background: #CF3C35;color: #FFF;padding: 0 0.5rem;margin-top: 5px;margin-right: 20px;position: relative;top: -35px;">删除</span>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="cell-pay" style="display: none;z-index: 1000;text-align: left !important;background: #FFF;">
    		<div class="cell-title" style="width: 100%;min-height: 40vh;">
    			<div style="width: 100vw;">
    				<div class="maneaaaa" style=" width: 100vw;float: left;cursor: pointer;color: blue;background: #F8F8F8;padding: 10px;border-bottom: 1px solid #CDCDCD;" @click="endit()">编辑</div>
    				<div style="float: right;cursor: pointer;color: blue;background: #F8F8F8;padding: 10px;position: relative;top: -43px;border-bottom: 1px solid #CDCDCD;" @click="add()">添加</div>
    			
    			</div>
    			<div style="width: 100%;height: 0;clear: both;"></div>
    			<div class="content" v-for="item in paycardlist" :key="item.creditCardId" style="text-align: center;background: #FFF;">
    				<div style="width: 100%;">
    					<img class="havea imga" @click="liupan(item.id)" src="../svg/_ionicons_svg_md-remove-circle-outline.svg" style="width: 30px;float: left;margin-left: 0;"/> 
    					<div>
    						<img :src=item.bankImg style="width: 30px;height: 30px;"/><span @click="choose(item.id)" style="display: inline-block;position: relative;top: -8px;left: 10px;width: 50vw;text-align: left;">{{item.bankName+'('+item.bankCard+")"}}</span>
    					</div>
    					<span :id=item.id class="havea remove" @click="remove(item.id)" style="float: right;background: #CF3C35;color: #FFF;padding: 0 0.5rem;margin-top: 5px;margin-right: 20px;position: relative;top: -35px;">删除</span>
    				</div>
    			</div>
    			<div class="content miss" style="height: 200px !important;"></div>
    		</div>
    	</div>
    	
    	<div class="mask" @click="mask" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: absolute;top: 0;left: 1px;display: none;"></div>
    	<img src="../../../assets/my/help.png" alt="" class="help1 qpay" @click="historybill()"/>
    	<div class="mamama">
	      	<x-dialog v-model="showdialog" hide-on-blur=true>
		        <div @click="showdialog = false,close=false" class="dialogindex" style="text-align: center;word-wrap:break-word">
		          	<h4 style="text-align: center;color: #D84C29;">温馨提示</h4>
		        	<div style="height: 10px;"></div>
		        	<div style="height: 2px;background: #D84C29;"></div>
		        	<div style="height: 15px;"></div>
		          	<p style="white-space: pre-wrap;">最小金额为10元,最小交易金额仅供参考，具体以各个银行实际每日限额为准</p>
		          	<div style="height: 30px;"></div>
		          	<x-button style='border-radius: 5px;width: 35vw !important;height: 40px !important;background: #C1272D !important;padding: 0 !important;' type="warn" @click.native="closeaa">我知道了</x-button>
				</div>
	        </x-dialog>
	    </div>	
	    <div class="mamama">
	      	<x-dialog v-model="showdialog1" hide-on-blur=true>
		        <div class="dialogindex" style="text-align: center;word-wrap:break-word">
		          	<h4 style="font-size: 16px;">提示</h4>
		          	<div style="margin-top: 15px;font-size: 16px;text-align: left;">您确定要删除尾号{{weihao1}}的{{title}}信用卡吗？</div>
		          	<x-button @click.native="closeaa" type="warn" style="margin-top: 50px;width: 20vw !important;display: inline-block;color: #000;background: #fff;text-align: left;font-size: 16px !important;font-weight: 600;">取消</x-button>
		          	<x-button @click.native="closebb" type="warn" style="margin-top: 50px;width: 20vw !important;display: inline-block;color: #000;background: #fff;text-align: right;font-size: 16px !important;font-weight: 600;">删除</x-button>
				</div>
	        </x-dialog>
	    </div>
	    <div class="mamama">
	      <x-dialog v-model="showdialogab" hide-on-blur=true>
	        <div @click="showdialogab = false,close=false" class="dialogindex" style="text-align: center;">
	        	<h4 style="text-align: center;color: #D84C29;">温馨提示</h4>
	        	<div style="height: 10px;"></div>
	        	<div style="height: 2px;background: #D84C29;"></div>
	        	<div style="height: 15px;"></div>
	        	<p style="white-space: pre-wrap;">入网认证，请先绑定您的储蓄卡</p>
	        	<div style="height: 30px;"></div>
	        	<x-button style='border-radius: 5px;width: 35vw !important;height: 40px !important;background: #C1272D!important;padding: 0 !important;' type="warn" @click.native="closeaaa">去入网认证</x-button>
	        </div>
        </x-dialog>
    </div>
   		<!--<img id="close" v-show="close" @click="closea" src="../svg/-ionicons-svg-ios-close-circle-outline.svg" width="30px" style="position: fixed;top: 90vh;z-index: 100000 !important;display: inline-block;"/>-->
   		<div style="height: 100px;"></div>
 	</div> 
</template>

<script>
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,Loading,Toast,Confirm,XDialog} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
  	import common from '../../../components/other/common'
	import router from '../../../router/index'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,Loading,Toast,Confirm,XDialog},
		data (){ 
			return {
				nex:'',
				cella:true,
				settlecard:'未绑定账户',//结算卡
				paycardlista:'',
				paycardlist:'',//支付卡名称(后四位)
				paycard:'未绑定支付卡',//当前支付卡名称(后四位)
				cardnum:'',//当前支付卡卡号
				XB:true,
				buttonType:'default',
				loading:false,
				errorStatus: false,
        		errorMsg: '',
        		inputmoney:'',//输入金额
        		show:false,//loading
        		kuaijielist:[["快捷支付方式1","快捷支付方式2"]],
        		kuaijie:['快捷支付方式1'],
        		pop:false,
        		showdialog:false,
        		close:false,
        		content:'',
        		showdialog1:false,
        		weihao1:'',
        		title:'',
        		showdialogab:false,
        		
			}
		},
		created(){
			localStorage.removeItem('ddddddddd')
			const _this = this;
			if (localStorage.getItem('wayId')==1) {
				_this.nex = "一"
			}else if (localStorage.getItem('wayId')==2) {
				_this.nex = "三"
			}
			else if (localStorage.getItem('wayId')==4) {
				_this.nex = "一"
			}
			/*获取支付卡   
			/user/payment/getPayCard   
			传入参数 参数类型 必需 描述
			wayId   
			传出参数   
			id Long  ID
			bankCard String Y 银行卡号
			bankName String Y 银行名称
			bankImg String Y 银行图片*/
			axios.post(api + '/user/payment/getPayCard?wayId='+ localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log("支付卡列表")
				console.log(res.data)
				_this.paycardlist = res.data.data
				if(res.data.code === 110) {
					router.push('/login')
				}
			})
			
			//快捷支付首页信息
			axios.post(api + '/user/payment/home?wayId='+ localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log("快捷支付首页信息")
				console.log(res.data)
				if (res.data.code === 0) {
					localStorage.setItem("shenfengzhen",res.data.data.cerdNo);//全局身份证号
					localStorage.setItem("name",res.data.data.realName);//全局姓名
					localStorage.setItem("payId",res.data.data.payId)//支付卡ID
					localStorage.setItem("bankname",res.data.data.payBankName)//支付卡银行
					localStorage.setItem("bankcard",res.data.data.payNo)//支付卡卡号
					if (res.data.data.payNo != '') {
						_this.paycard = res.data.data.payBankName+'('+res.data.data.payNo+')';
					}
				} 
			});
			/*获取当前结算卡信息   
			/user/payment/getSettleCard   
			传入参数 参数类型 必需 描述
			wayId
			传出参数   
			id Long  ID
			bankCard String Y 银行卡号
			bankName String Y 银行名称
			bankImg String Y 银行图片*/
			axios.post(api + '/user/payment/getSettleCard?wayId=' + localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				console.log("结算卡列表")
				console.log(res.data);
				_this.paycardlista = res.data.data
				_this.settlecard = res.data.data[0].bankName+'('+res.data.data[0].bankCard+')';
			})
		},
		methods:{
			liupan(id){
				if ($("#"+id).hasClass("havea")) {
					$("#"+id).removeClass("havea")
				} else if ($("#"+id).hasClass("havea") == false) {
					$("#"+id).addClass("havea")
				}
			},
			back(){
				router.push('/kuaijielist')
			},
			confirm:function  () {
				//提交成功
				const _this = this
				localStorage.setItem("inputmonery",_this.inputmoney);//输入金额
				/*if (parseInt(_this.inputmoney)<parseInt(localStorage.getItem('minPayment'))) {
					_this.errorStatus = true
					_this.errorMsg = "金额至少"+localStorage.getItem('minPayment')+'元'*/
				//}else{
					if (localStorage.getItem('needSms')==1) {
						axios.post(api + '/user/payment/send/thirdsms?cardId=' + localStorage.getItem("payId") + '&amount=' + parseInt(localStorage.getItem("inputmonery"))*100 + '&wayId=' + localStorage.getItem("wayId") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
							_this.loading = false;
							console.log(res.data);
							if (res.data.code === 0) {
								localStorage.setItem("orderNo",res.data.data.orderNo)
								_this.errorMsg = '提交成功'
	              				_this.errorStatus = true
								setTimeout(function  () {
									router.push('/idcodepay') 
								},300)
							}else if(res.data.code !== 0&&res.data.code != undefined){
								_this.errorStatus = true
								_this.errorMsg = res.data.msg
							}
				          	if (res.data.code === 110) {router.push('/login')}
						});
					}
					else{
						axios.post(api + '/user/payment/pay2third?cardId=' + localStorage.getItem("payId") + '&amount=' + parseInt(localStorage.getItem("inputmonery"))*100 + '&wayId=' + localStorage.getItem("wayId") + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
							_this.loading = false;
							console.log(res.data);
							if (res.data.code === 0) {
								_this.errorMsg = '提交成功'
	              				_this.errorStatus = true
								document.write(res.data.data.htmlContent)
							}else{
								_this.errorStatus = true
								_this.errorMsg = res.data.msg
							}
				          	if (res.data.code === 110) {router.push('/login')}
						});
					}
				//}
			},
			closeaa(){
				const _this = this;
				_this.showdialog1 = false;
			},
			closeaaa(){
				const _this = this;
				_this.showdialogab = false;
				router.push('/boundaccount')
			},
			closebb(){
				const _this = this;
				_this.showdialog1 = false;
				axios.post(api + '/user/payment/cancel?payCardId=' + localStorage.getItem('kaishishanchu') +'&wayId=' + localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res)
			        if (res.data.code === 0) {
			            _this.errorStatus = true
			        	_this.errorMsg = '解绑成功'
			        	setTimeout(function  () {
			        		location.reload()
			        	},300)
			        }
			        else{
			        	_this.errorStatus = true
			        	_this.errorMsg = res.data.msg
			        }
				})
			},
			closea(){
				const _this = this;
				_this.showdialog = false;
				_this.close = false;
			},
			//未绑定账户
			change:function  () {
				const _this = this;
				if(_this.settlecard === '未绑定账户'){
					_this.showdialogab = true;
					//router.push('/boundaccount')
				}else{
					$(".mask").show('fade')
					$(".cell-paya").show('blind',{direction:'down'},100)
				}
			},
			//绑定支付卡
			addpayment() {
				const _this = this
				if (_this.settlecard === "未绑定账户") {
					_this.errorStatus = true
					_this.errorMsg = "请先绑定收款账户"
				}
				else if (_this.settlecard !== "未绑定账户"&&_this.paycard === "未绑定支付卡") {
					router.push('/boundcreditcard')
				} else{
					$(".mask").show('fade')
					$(".cell-pay").show('blind',{direction:'down'},100)
				}
				if ($('.pay .weui-cell__ft').text().trim()==="未绑定支付卡") {
					_this.pop = false
					$('.pay .weui-cell__ft').attr("style","color: #999999 !important;")
				}
				else if ($('.pay .weui-cell__ft').text().trim()!=="未绑定支付卡") {
					_this.pop = true
					$('.pay .weui-cell__ft').attr("style","color: #000 !important;")
				}
			},
			//编辑支付卡
			endit(){
				if ($(".imga").hasClass("havea")) {
					$(".imga").removeClass("havea")
				}else if ($(".imga").hasClass("havea") == false) {
					$(".imga").addClass("havea")
				}
			},
			endita(){
				$(".cell-paya").hide('blind',{direction:'down'},100);
				$(".mask").hide('fade');
			},
			add(){
				console.log("add")
				router.push('/boundcreditcard')
			},
			adda(){
				console.log("add")
				router.push('/boundaccount')
			},
			//支付卡解绑接口   
			/*/user/payment/cancel   
			传入参数 参数类型 必需 描述
			payCardId Long  Y  支付卡ID*/
			remove(id){
				const _this = this
				axios.post(api + '/user/payment/cancel?payCardId=' + id +'&wayId=' + localStorage.getItem('wayId') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
					console.log(res)
			        if (res.data.code === 0) {
			            _this.errorStatus = true
			        	_this.errorMsg = '解绑成功'
			        	setTimeout(function  () {
			        		location.reload()
			        	},300)
			        }
			        else{
			        	_this.errorStatus = true
			        	_this.errorMsg = res.data.msg
			        }
				})
			},
			//选择第几张支付卡
			choose(id){
				const _this = this;
				for (let i = 0;i<_this.paycardlist.length;i++) {
					if (_this.paycardlist[i].id == id) {
						_this.paycard = _this.paycardlist[i].bankName+'('+_this.paycardlist[i].bankCard+')';
						$(".cell-pay").hide('blind',{direction:'down'},300)
						$(".mask").hide('fade');
						localStorage.setItem("bankname",_this.paycardlist[i].bankName)
						localStorage.setItem("bankcard",_this.paycardlist[i].bankCard)
						localStorage.setItem("payId",_this.paycardlist[i].id)//支付卡ID
					}
				}
			},
			/*快捷支付支持银行列表查询接口   
			/user/payment/support/banks   
			传入参数 参数类型 必需 描述
			wayId Long Y 通道ID*/
			historybill:function  () {
				const _this = this;
				_this.showdialog = true;
				_this.close = true;
			},
			hisiorybilla(){
				const _this = this;
				router.push('/historybill')
/*				axios.post(api + '/user/payment/page?&pageNo=' + 1 + '&pageSize=' + 10000 + '&yearMonth=' + '2018-10' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log("历史账单")
					console.log(res.data.data)
					if(res.data.code === 0) {
						router.push('/login')
					}
					if (res.data.data.length != 0) {
						
					}else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
					if(res.data.code === 110) {
						router.push('/login')
					}
				})*/
			},
			mask(){
				$(".cell-pay").hide('blind',{direction:'down'},100)
				$(".cell-paya").hide('blind',{direction:'down'},100)
				$(".mask").hide('fade')
				if ($(".imga,.remove").hasClass("havea")) {
					$(".imga,.remove").addClass("havea")
				}else{
					$(".imga,.remove").addClass("havea")
				}
			},
		},
		updated(){
			//判断提交按钮可以点击
			const _this = this
			if (_this.inputmoney.length>0&&_this.settlecard !== '未绑定账户'&&_this.kuaijie!=''&&_this.paycard !== '未绑定支付卡') {
				_this.XB = false;
			}else{
				_this.XB=true;
			}
			if ($('.pay .weui-cell__ft').text().trim()==="未绑定支付卡") {
				_this.pop = false
				$('.pay .weui-cell__ft').attr("style","color: #999999 !important;")
			}
			else if ($('.pay .weui-cell__ft').text().trim()!=="未绑定支付卡") {
				_this.pop = true
				$('.pay .weui-cell__ft').attr("style","color: #000 !important;")
			}
			if ($('.settel .weui-cell__ft').text().trim()==="未绑定账户") {
				$('.settel .weui-cell__ft').attr("style","color: #999999 !important;")
			}
			else if ($('.settel .weui-cell__ft').text().trim()!=="未绑定账户") {
				$('.settel .weui-cell__ft').attr("style","color: #000 !important;")
			}
		},
		mounted(){
			const _this = this
			console.log("mounted")
			if ($('.pay .weui-cell__ft').text().trim()==="未绑定支付卡") {
				_this.pop = false
				$('.pay .weui-cell__ft').attr("style","color: #999999 !important;")
			}
			else if ($('.pay .weui-cell__ft').text().trim()!=="未绑定支付卡") {
				_this.pop = true
				$('.pay .weui-cell__ft').attr("style","color: #000 !important;")
			}
			if ($('.settel .weui-cell__ft').text().trim()==="未绑定账户") {
				$('.settel .weui-cell__ft').attr("style","color: #999999 !important;")
			}
			else if ($('.settel .weui-cell__ft').text().trim()!=="未绑定账户") {
				$('.settel .weui-cell__ft').attr("style","color: #000 !important;")
			}
			//判断没有一张支付卡
			if(_this.paycardlist === ''){
				_this.paycard = "未绑定支付卡"
			}
		},
		watch:{
			
		}
	}
</script>
<style lang="less">
	@import url("less/default.less");
	@import url("less/button.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.inputM{
		input{caret-color:#000;}
		input::-webkit-input-placeholder{
		  color: #9C9C9C !important;
		}
		input:-moz-placeholder{
		  color: #9C9C9C !important;opacity: 1;
		}
		input::-moz-placeholder{
		  color: #9C9C9C !important;opacity: 1;
		}
		input:-ms-input-placeholder{
		  color: #9C9C9C !important;
		}
		span{
			color: rgb(153,153,153);
			display: inline-block;
			font-size: 12px;
			white-space: nowrap;
			position: relative;
			top: -2.7rem;
			left: 20vw;
			
		}
		.monery{
			background: #FFF;
			width: 85%;
			height: 3.2rem;
		}
		.weui-cell__hd{
			color:#C81522;
			margin-left: 0.5rem;
			font-size: 1.1rem;
		}
		.weui-input{
			margin-left: -0.5rem;
			color: rgb(223,97,98);
			font-size: 1.5rem;
			padding-bottom: 0.2rem;
		}
		.weui-cell{
			margin: 1rem auto;
			padding-bottom: 1rem;
			border-radius: 15px;
		}
		input{
			    position: relative;
    			left: -30px;
    			font-size: 25px !important;
		}
	}
	.Caccountindex{
		margin-top: -2rem;
		.vux-cell-box:nth-of-type(3){
			/*display: none;*/
			.vux-popup-picker-select{
				text-align: left !important;
			}
		}
		.vux-label{
			font-size: 1rem;
			color: #000 !important;
		}
		.weui-cell__ft{
			font-size: 1rem;
		}
		.vux-cell-value{
			color: #000 ;
		}
		.weui-cell:nth-of-type(2){
			border-top: 1px solid #DEDEDE;
		}
	}
	.Caccountlishi{
		float: right; 
		margin-right: 1rem;
		margin-top: 1rem;
		position: relative;
		a{
			color: #628CD8;
			font-size: 0.8rem;
			text-decoration: underline;
		}
		
	}
	.confirmcard{
		top: 3rem;
		text-align: center;
		position: relative;
		margin: 0 auto;
		width: 100vw;
		.XB{
			width: 100% !important;
		}
	}
	.vux-cell-box{
		border-top: 1px solid #D9D9D9;
	}
	.content{
		width: 100%;
		position: relative;
		padding: 10px 0 5px 10px;
		background: #FFF;
		top: -40px;
		border-bottom: 1px solid #CDCDCD;
	}
	.havea{
		visibility: hidden;
	}
	.cell-pay{
		width: 100% !important;
		position: absolute;
		bottom: 0;
	}
	.cell-paya{
		width: 100% !important;
		position: absolute;
		bottom: 0;
	}
	.color{
		color: red !important;
	}
	#close{
		left: ~"calc(50% - 15px)" !important;
	}
	.weui-dialog{
		width: 70% !important;
		max-width: 2000px !important;
		padding:15px;
		.dialogindex{
			overflow-y: scroll;
		}
		.dialogindex::-webkit-scrollbar {
	        display: none;
	    }
	}
	#close{
		z-index: 100000 !important;
		display: inline-block;
		left: 49vw;
	}
	.miss{
		display: none;
	}
	.missa{
		pointer-events: none;
	}
	.qpay{
		left: ~"calc(90% - 20px)" !important;
		top: 95px;
	}
</style>
				