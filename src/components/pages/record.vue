<template>
	<div style="height: 100vh; width: 100vw;overflow-x: hidden;position: relative;background: #FFF;" class="setplanlistzzz">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="boundaccount index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">分期记录</x-header>
		</div>
		<div style="position: relative;">
   	<img src="../../assets/timeri.png" style="width: 25px;position: absolute;top: 5px;right: 10px;z-index: 10;"/>
  </div>
      <datetime class= "datetimea" v-model="minuteListValue" format="YYYY-MM" @on-confirm="datename()" year-row='{value}年' month-row='{value}月'></datetime>
    <div class="errerer" style="position: relative;">
    	<div class="wqwqwq" v-show="a">{{chaxuriqi}}</div>
		<div v-show="a" @click="xiangqing(item.orderNo)" v-for="item in test" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div v-show="b">
			<div class="wqwqwq" v-show="a1">2019年10月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test1" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a2">2019年9月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test2" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a3">2019年8月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test3" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a4">2019年7月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test4" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a5">2019年6月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test5" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a6">2019年5月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test6" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a7">2019年4月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test7" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a8">2019年3月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test8" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a9">2019年2月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test9" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a10">2019年1月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test10" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a11">2018年12月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test11" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a12">2018年11月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test12" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a13">2018年10月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test13" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a14">2018年9月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test14" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a15">2018年8月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test15" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a16">2018年7月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test16" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a17">2018年6月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test17" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a18">2018年5月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test18" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a19">2018年4月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test19" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a20">2018年3月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test20" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a21">2018年2月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test21" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a22">2018年1月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test22" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a23">2017年12月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test23" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a24">2017年11月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test24" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		<div class="wqwqwq" v-show="a25">2017年10月</div>
		<div @click="xiangqing(item.orderNo)" v-for="item in test25" :key="item.orderNo" style="background: #FFF;border-bottom: 1px solid #F8F8F8;padding: 3px 20px 0 10px;height: 70px;">
			<img :src=item.bankImg style="width: 44px;position: relative;top: 10px;"/>
			<div style="position: relative;top: -47px;left: 60px;">
				<p style="position: relative;left: -10px;color: #000000 !important;">{{item.bankName}}({{item.bankCardEndCode}})</p>
				<p style="font-size: 12px;position: relative;left: -10px;color: #000000 !important;">完成<span style="color: #D84C29;">{{item.finishPeriods}}/{{item.totalPeriods}}期</span></p>
			</div>
			<div style="font-size: 12px;color:#999999;position: relative;top: -46px;left: 49px;">{{item.createTime}}</div>
			<div style="float: right;position: relative;top: -105px;">
				<p style="width: 170px;text-align: right;color: #000000 !important;">￥{{item.totalAmount}}元</p>
				<p style="height: 18px;"></p>
				<p style="width: 170px;text-align: right;color: #999999;font-size: 12px;"><span style="color: #D84C29;">{{item.stateMsg}}</span></p>
			</div>
		</div>
		</div>
		<div class="emptybill" v-show="empty">
  			<div style="height: 150px;"></div>
    		<img src="../../assets/zhanwushuju.png" alt="历史账单" /><br /><br />
    		<p>当月无交易信息，请选择您需要查看的交易时间</p>
		</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store'
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,ChinaAddressV4Data,Toast,Loading,Confirm,Datetime} from 'vux'
	import api from '../../components/other/api-url'
  	import globalPM from '../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import '../../../static/js/bankCardAttribution'
	import bin from './bin.json'
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,PopupPicker,XAddress,Toast,Loading,Confirm,Datetime},
		data (){ 
			return {
				test1:[],test2:[],test3:[],test4:[],test5:[],test6:[],test7:[],test8:[],test9:[],test10:[],test11:[],
				test12:[],test13:[],test14:[],test15:[],test16:[],test17:[],test18:[],test19:[],test20:[],test21:[],
				test22:[],test23:[],test24:[],test25:[],test:[],
				time:'',
				lenght:'',
				today:'',
				a1:"",a2:"",a3:"",a4:"",a5:"",a6:"",a7:"",a8:"",a9:"",a10:"",a11:"",a12:"",a13:"",a14:"",
				a15:"",a16:"",a17:"",a18:"",a19:"",a20:"",a21:"",a22:"",a23:"",a24:"",a25:"",a:'',
				minuteListValue:'',
				errorStatus:false,
				errorMsg:'',
				b:true,
				chaxuriqi:'',
				empty:false,
			}
		},
		methods:{
			back(){
				router.push('/cardlist')
			},
			xiangqing(id){
				localStorage.setItem('orderNo',id)
				setTimeout(function  () {
					router.push('/planDetails')
				},100)
			},
			datename(){
				let _this = this;
				setTimeout(function  () {
					_this.minuteListValue
					axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + _this.minuteListValue + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data.list)
					_this.a = true
					var x = _this.minuteListValue.split('-')
							_this.chaxuriqi = x[0]+'年'+x[1]+ "月"
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							
							_this.test = res.data.data.list
							//_this.b = false;
	
							_this.empty = false
						}else{
							_this.empty = true
							_this.test = ''
							/*_this.errorStatus = true
							_this.errorMsg = '当月暂无数据'
							_this.b = true*/
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
		},
		created(){
			/*获取代还卡历史列表   
			/user/repay/getPlanList   
			传入参数 参数类型 必需 描述
			pageNo integer Y 页码
			pageSize integer N 分页大小 默认20
			yearMonth String N 查询年月（yyyy-MM）
			传出参数   
			id long  ID
			bankCardEndCode string  银行卡尾号
			bankName string  银行名称
			totalPeriods integer  总期数
			finishPeriods integer  已完成期数
			totalAmount double  还款总额（元）
			state   1 进行中 2 还款终止 3 已完成
			stateMsg string  状态提示
			bankImg string  银行图片
			createtime date  创建时间*/
			let _this = this
			var myDate=new Date()
		    var seperator1 = "-";
		    var month = myDate.getMonth() + 1;
		    var strDate = myDate.getDate();
		    if (month >= 1 && month <= 9) {
		        month = "0" + month;
		    }
			var currentdate1 = myDate.getFullYear() + seperator1 + month; 
			_this.today = myDate.getFullYear() + '年' + month + "月"
		    var date1 = '2017-5'.split("-");
		    var date2 = currentdate1.split("-");
		    //获取年,月数
		    var year1 = parseInt(date1[0]) , 
	        month1 = parseInt(date1[1]) , 
	        year2 = parseInt(date2[0]) , 
	        month2 = parseInt(date2[1]) , 
	        //通过年,月差计算月份差
	        months = (year2 - year1) * 12 + (month2-month1) + 1;
	        _this.lenght = months
    			/*let oldtime = 4
		    	let oldyear = 2017
		    for (let x = 0 ;x<months;x++) {
		    	oldtime = parseInt(oldtime) + 1
		    	if (oldtime >12) {
			        oldyear = oldyear+1
			        oldtime = 1
			    }
		    	if (oldtime >= 1 && oldtime <= 9) {
			        oldtime = "0" + oldtime;
			    }
		    	console.log(oldtime)
			    console.log(oldyear)
		    	var currentdate  = oldyear.toString() + "-" + oldtime.toString()*/
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + currentdate1 + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	
					console.log(res.data.data)
					_this.a = true
					_this.chaxuriqi = myDate.getFullYear()+'年'+month+ "月"
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							
							_this.test = res.data.data.list
							
							_this.empty = false
						}else{
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
		    	/*axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-09' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a2 = true
							_this.test2 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-08' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a3 = true
							_this.test3 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-07' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a4 = true
							_this.test4 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-06' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a5 = true
							_this.test5 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-05' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a6 = true
							_this.test6 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-04' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a7 = true
							_this.test7 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-03' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a8 = true
							_this.test8 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-02' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a9 = true
							_this.test9 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2019-01' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a10 = true
							_this.test10 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-12' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a11 = true
							_this.test11 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-11' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a12 = true
							_this.test12 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-10' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a13 = true
							_this.test13 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-09' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a14 = true
							_this.test14 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-08' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a15 = true
							_this.test15 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-07' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a16 = true
							_this.test16 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-06' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a17 = true
							_this.test17 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-05' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a18 = true
							_this.test18 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-04' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a19 = true
							_this.test19 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-03' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a20 = true
							_this.test20 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-02' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a21 = true
							_this.test21 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2018-01' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a22 = true
							_this.test22 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2017-12' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a23 = true
							_this.test23 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2017-11' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a24 = true
							_this.test24 = res.data.data.list
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
		    	axios.post(api + '/user/repay/getPlanList?pageNo=1&pageSize=1000&yearMonth=' + '2017-10' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
			    	console.log("0")
					console.log(res.data.data)
					if (res.data.code === 0) {
						if (res.data.data.list.length>0) {
							_this.a25 = true
							_this.test25 = res.data.data.list
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
		    	
		    	
		    /*}*/
		},
		updated(){
			
		},
		mounted(){
			
		}
	}
</script>
<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.wqwqwq{
		padding: 5px 10px;
		background: #F8F8F8;
	}
	.datetimea{
		width: 10px;
		height: 0;
		float: right;
		position: relative;
		z-index: 1000;
		top: -10px;
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
.datetimea .weui-cell__ft:after{
		    border-color: rgba(1,1,1,0) !important;
	}
</style>
				