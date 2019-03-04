<template>
	<div class="aaaaaaa" style="height: 100vh;width: 100vw;background: #FFF;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index" @click="created()">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back" class="xH">历史账单</x-header>
		</div>
		<img src="../../../assets/timeri.png" style="width: 25px;position: absolute;top: 53px;right: 10px;z-index: 10;"/>
		
      <datetime class= "datetimea" v-model="minuteListValue" format="YYYY-MM" @on-confirm="datename()" year-row='{value}年' month-row='{value}月'></datetime>
    <div class="wwww1" v-show="a">{{chaxuriqi}}</div>
		<div v-show="a" v-for="item in test" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<!--<span id="bank">通道一</span>-->
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
  		<div v-show="b">
  			<div class="wwww1" v-show="a1">2019年10月</div>
		<div v-for="item in test1" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a2">2019年9月</div>
		<div v-for="item in test2" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a3">2019年8月</div>
		<div v-for="item in test3" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a4">2019年7月</div>
		<div v-for="item in test4" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a5">2019年6月</div>
		<div v-for="item in test5" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a6">2019年5月</div>
		<div v-for="item in test6" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a7">2019年4月</div>
		<div v-for="item in test7" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a8">2019年3月</div>
		<div v-for="item in test8" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a9">2019年2月</div>
		<div v-for="item in test9" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a10">2019年1月</div>
		<div v-for="item in test10" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a11">2018年12月</div>
		<div v-for="item in test11" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a12">2018年11月</div>
		<div v-for="item in test12" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a13">2018年10月</div>
		<div v-for="item in test13" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a14">2018年9月</div>
		<div v-for="item in test14" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a15">2018年8月</div>
		<div v-for="item in test15" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a16">2018年7月</div>
		<div v-for="item in test16" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a17">2018年6月</div>
		<div v-for="item in test17" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a18">2018年5月</div>
		<div v-for="item in test18" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a19">2018年4月</div>
		<div v-for="item in test19" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a20">2018年3月</div>
		<div v-for="item in test20" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a21">2018年2月</div>
		<div v-for="item in test21" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a22">2018年1月</div>
		<div v-for="item in test22" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a23">2017年12月</div>
		<div v-for="item in test23" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a24">2017年11月</div>
		<div v-for="item in test24" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
		<div class="wwww1" v-show="a25">2017年10月</div>
		<div v-for="item in test25" class="historybill" @click="querybill(item.id)" :key="item.orderNo">
		<div class="left">
			<span id="monery">￥{{(item.amount/100).toFixed(2)}}</span><br />
			<span id="poundage">手续费:￥{{(item.proFee/100).toFixed(2)}}</span><br />
			<span id="bank">通道一</span>
		</div>
		<div class="right">
			<span id="state" v-show="item.state==3" class="black">已提交,待处理</span>
			<span id="state" v-show="item.state==1" class="green">支付成功</span>
			<span id="state" v-show="item.state==2" class="red">支付失败</span><br />
			<span id="date">{{item.payTime}}</span>
		</div>
	</div>
  		</div>
  		<div class="emptybill" v-show="empty">
  			<div style="height: 150px;"></div>
    		<img src="../../../assets/zhanwushuju.png" alt="历史账单" /><br /><br />
    		<p>当月无交易信息，请选择您需要查看的交易时间</p>
		</div>
	</div>
</template>
<!--<span id="bank">{{item.cardBankName + '(' + item.cardNo + ')'}}-通道{{(item.passWayId+1)==1?"一":(item.passWayId+1)==2?"二":"三"}}</span>-->
<script>
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,Card,Loading,Toast,Datetime } from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,Card,Loading,Toast,Datetime },
		data (){ 
			return {
				loading:false,
				errorStatus: false,
        		errorMsg: '',
        		test1:[],test2:[],test3:[],test4:[],test5:[],test6:[],test7:[],test8:[],test9:[],test10:[],test11:[],
				test12:[],test13:[],test14:[],test15:[],test16:[],test17:[],test18:[],test19:[],test20:[],test21:[],
				test22:[],test23:[],test24:[],test25:[],test:[],
				a1:"",a2:"",a3:"",a4:"",a5:"",a6:"",a7:"",a8:"",a9:"",a10:"",a11:"",a12:"",a13:"",a14:"",
				a15:"",a16:"",a17:"",a18:"",a19:"",a20:"",a21:"",a22:"",a23:"",a24:"",a25:'',a:'',
				minuteListValue:'',
				errorStatus:false,
				errorMsg:'',
				b:false,
				chaxuriqi:'',
				empty:false,
			}
		},
		methods:{
			back(){
				router.push('/QpayIndex')
			},
			datename(){
				let _this = this;
				setTimeout(function  () {
					_this.minuteListValue
					axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + _this.minuteListValue + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					_this.a = true
					var x = _this.minuteListValue.split('-')
					_this.chaxuriqi = x[0]+'年'+x[1]+ "月"
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							//_this.a = true
							_this.test = res.data.data
							//_this.b = false;
							_this.empty = false
						}else{
							//_this.a = false
							/*_this.errorStatus = true
							_this.errorMsg = '当月暂无数据'*/
							//_this.b = true
							_this.empty = true
							_this.test = ''
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
				},10)
			},
			//查询账单详情,id(订单编号)
			querybill(id){
				const _this = this
				axios.post(api + '/user/payment/info?id=' + id + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					
					console.log(res.data)
					localStorage.setItem('id',id)
					if(res.data.code === 0) {
						//根据状态跳转订单详情
						if (res.data.data.state === 1) {
							router.push('/infobillb')
						} 
						else if (res.data.data.state === 2) {
							router.push('/infobillc')
						}
						else if (res.data.data.state === 3) {
							router.push('/infobilla')
						}
					}
					else{
						_this.errorMsg = res.data.msg
						_this.errorStatus = true
					}
					if(res.data.code === 110) {
						router.push('/login')
					}
				})
			}
		},
		created(){
			console.log("created")
			let _this = this
			var myDate=new Date()
		    var seperator1 = "-";
		    var month = myDate.getMonth() + 1;
		    var strDate = myDate.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
			var currentdate1 = myDate.getFullYear() + seperator1 + month; 
			axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + currentdate1 + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					_this.a = true
					_this.chaxuriqi = myDate.getFullYear()+'年'+month+ "月"
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							//_this.a = true
							_this.test = res.data.data
							
							_this.empty = false
						}else{
							//_this.a = false
							_this.empty = true
							_this.test = ''
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
			/*/user/payment/page   
			传入参数 参数类型 必需 描述
			pageNo Integer  Y 页码
			pageSize Integer Y 页面条数
			传出参数（List)   
			id Long  订单ID
			orderNo String  订单编号
			cardNo String   支付卡号
			settleCardNo String  结算卡号
			amount Integer  交易金额（分）
			settleAmount Integer  结算金额 （分）
			state Integer  状态 0、已创建 1、成功 2、失败 3、已提交，待处理
			createTime Date  提交时间
			payTime Date  支付时间
			proFee Integer  手续费 （分）
			cardBankName String  支付卡银行名称
			settleSubBankName String  结算卡银行名称*/
			/*axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-10' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a1 = true
							_this.test1 = res.data.data
						}else{
							_this.a1 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-09' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a2 = true
							_this.test2 = res.data.data
						}else{
							_this.a2 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-08' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a3 = true
							_this.test3 = res.data.data
						}else{
							_this.a3 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-07' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a4 = true
							_this.test4 = res.data.data
						}else{
							_this.a4 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-06' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a5 = true
							_this.test5 = res.data.data
						}else{
							_this.a5 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-05' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a6 = true
							_this.test6 = res.data.data
						}else{
							_this.a6 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-04' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a7 = true
							_this.test7 = res.data.data
						}else{
							_this.a7 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-03' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a8 = true
							_this.test8 = res.data.data
						}else{
							_this.a8 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-02' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a9 = true
							_this.test9 = res.data.data
						}else{
							_this.a9 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2019-01' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a10 = true
							_this.test10 = res.data.data
						}else{
							_this.a10 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-12' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a11 = true
							_this.test11 = res.data.data
						}else{
							_this.a11 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-11' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0dsdsdsd")
					console.log(res.data.data.length)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a12 = true
							_this.test12 = res.data.data
						}else{
							_this.a12 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-10' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a13 = true
							_this.test13 = res.data.data
						}else{
							_this.a13 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-09' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a14 = true
							_this.test14 = res.data.data
						}else{
							_this.a14 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-08' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a15 = true
							_this.test15 = res.data.data
						}else{
							_this.a15 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-07' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a16 = true
							_this.test16 = res.data.data
						}else{
							_this.a16 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-06' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a17 = true
							_this.test17 = res.data.data
						}else{
							_this.a17 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-05' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a18 = true
							_this.test18 = res.data.data
						}else{
							_this.a18 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-04' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a19 = true
							_this.test19 = res.data.data
						}else{
							_this.a19 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-03' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a20 = true
							_this.test20 = res.data.data
						}else{
							_this.a20 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-02' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a21 = true
							_this.test21 = res.data.data
						}else{
							_this.a21 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2018-01' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a22 = true
							_this.test22 = res.data.data
						}else{
							_this.a22 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2017-12' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a23 = true
							_this.test23 = res.data.data
						}else{
							_this.a23 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2017-11' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a24 = true
							_this.test24 = res.data.data
						}else{
							_this.a24 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		    	axios.post(api + '/user/payment/page?pageNo=1&pageSize=1000&yearMonth=' + '2017-10' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.length>0) {
							_this.a25 = true
							_this.test25 = res.data.data
						}else{
							_this.a25 = false
						}
						
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})*/
		},
	}
</script>
<style lang="less">
	@import url("less/x-header.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.datetimea{
		width: 10px;
		height: 0;
		float: right;
		position: relative;
		z-index: 1000;
		span{
			color:rgba(1,1,1,0);
		}
	}
	div,a,img {
    -webkit-tap-highlight-color: rgba(255,255,255,0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select:none;
}
	.aaaaaaa{
		.historybill{
			height: 60px;
			padding: 15px 20px;
			border-bottom: 1px solid rgb(238,238,238);
			position: relative;
			background: #FFF;
			.green{
				color: rgb(124,207,124);
			}
			.red{
				color: rgb(233,85,120);
			}
			.black{
				color: rgb(51,51,51);
			}
		}
		#monery{
			font-size: 14px !important;
			color: rgb(218,76,69);
		}
		#poundage{
			display: inline-block;
			font-size: 12px !important;
			transform: scale(0.8);
			color: rgb(153,153,153);
		}
		#bank{
			display: inline-block;
			margin-left: 4pt;
			font-size: 12px !important;
			color: rgb(153,153,153);
		}
		#state{
			float: right;
			font-size: 12px !important;
			display: inline-block;
			margin-top: 8pt;
		}
		#date{
			font-size: 12pt;
			color: #999999;
			float: right;
			display: inline-block;
			margin-top: 20pt;
		}
		.left{
			float: left;
			position: relative;
			top: -3px;
		}
		.right{
			float: right;
			position: relative;
			top: -10px;
		}
		span{
			font-size: 13px !important;
		}
	}
	.wwww1{
		padding: 5px 10px;background: #f8f8f8;
		color: #999999;
		position: relative;
	}
	.datetimea .weui-cell__ft:after{
		    border-color: rgba(1,1,1,0) !important;
	}
</style>
				