<template>
	<div class="infobillcc" style="height: 100vh;width: 100vw;"> 
		<div class="boundaccount index infobill">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back" class="xH">账单详情</x-header>
		</div>
		<div class="aqirebilla" style="text-align: center;margin-top: 40px;">
    		<img src="../../assets/web/Zfail.png" alt="支付失败"  style="width: 60px;"/><br /><br />
    		<p>支付失败</p>
		</div>
		<div class="hrbilla"></div>
		<div class="billainfo">
			<group>
				
				<cell class='infobilla' title="交易金额" v-model="valuea"></cell>
				<cell class='infobilla' title="结算金额" v-model="valueb"></cell>
				<cell class='infobilla' title="手续费" v-model="valuec"></cell>
				<cell class='infobilla' title="支付通道" v-model="valuez"></cell>
				<cell class='infobilla' title="支付银行卡" v-model="valued"></cell>
				<cell class='infobilla' title="结算银行卡" v-model="valuee"></cell>
				<cell class='infobilla' title="提交时间" v-model="valuef"></cell>
				<cell class='infobilla' title="支付时间" v-model="valueg"></cell>
				<cell class='infobilla' title="订单编号" v-model="valueh"></cell>
			</group>
		</div>
		<div style="height: 10px; background: #F8F8F8;"></div>
  </div>
</template>

<script>
	//已提交，请稍后
	import {ViewBox, XHeader, Group, XInput, Cell, XButton, Toast} from 'vux'
  import api from '../../components/other/api-url'
  import globalPM from '../../components/other/global-parameter'
  import axios from 'axios'
  import MD5 from 'md5'
  import Cookies from 'js-cookie'
  import router from '../../router/index'
	export default {
		components: {XHeader,Group,Cell},
		data (){ 
			return {
				valuez:'',
				valuea:'',
				valueb:'--',
				valuec:'--',
				valued:'',
				valuee:'',
				valuef:'',
				valueg:'--',
				valueh:'',
			}
		},
		methods:{
			back:function  () {
				router.push('/business')
			}
		},
		created(){
			const _this = this;
			axios.post(api + '/user/payment/info?id=' + localStorage.getItem('id') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
				_this.loading = false
				console.log(res.data);
				if(res.data.code === 0) {
					var x
					if ((parseInt(res.data.data.passWayId)+1)==1) {
						x = "一"
					} else if ((parseInt(res.data.data.passWayId)+1)==2) {
						x = "二"
					} else{
						x = "三"
					}
					_this.valuea = '￥'+(parseFloat(res.data.data.amount)/100).toFixed(2);
					_this.valued = res.data.data.cardBankName + '(' + res.data.data.cardNo + ')';
					_this.valuee = res.data.data.settleSubBankName + '(' + res.data.data.settleCardNo + ')';
					_this.valuef = res.data.data.createTime;
					_this.valueh = res.data.data.orderNo;
					_this.valuez ="通道" + x;
				}
				if(res.data.code === 110) {
					router.push('/login')
				}
			})
		}
	}
</script>

<style lang="less">
	@import url("quickpayment/less/infobill.less");
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
</style>
