<template>
	<div class="yitixianindexnamea" style="width:100vw;overflow-x: hidden;height: 100vh;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text">{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">确认计划</x-header>
		<p style="position: relative;top: -45px;left: 70vw;width: 100px;text-align: right;" :class="{green:statea==3||statea==6||statea==9||statea==14,red:statea==4||statea==7||statea==15,statezz:statea!=3&&statea!=4&&statea!=6&&statea!=7&&statea!=9&&statea!=14&&statea!=15}">{{statename}}</p>
		<group class='cardmanageindexz'>
			<cell class='assa' title="总还款金额" v-model="aaa"></cell>
			<cell class='assa' title="卡余额" v-model="bbb"></cell>
			<cell class='assa' title="还款天数" v-model="ccc"></cell>
			<cell title="总手续费" v-model="ddd"></cell>
		</group>
		<div class="textx" v-for="item in texta">
			<div class="textxa">
				<span>还款:{{item.transferMoney.toFixed(1)}}</span>
				<span>{{item.transferTime.substr(0,10)}}</span>
				<p>手续费:{{item.rateMoney}}</p>
			</div>
			<div class="textxb" v-for="itema in item.subPlanDetails">
				<div style="height: 10px;"></div>
				<div>
					<span>{{itema.idx}}、{{itema.tradeMoney}}元(消费)</span>
					<span>{{itema.tradeTime.substr(10)}}</span>
					<p :id=itema.idx  @click="haha(itema.idx)">{{itema.mccName}}</p>
				</div>
				<div style="height: 5px;"></div>
			</div>
			<div style="height: 20px;"></div>
		</div>
		<div style="height: 50px;"></div>
		<div class="cardbutton">
    		<x-button class="XB" @click.native="confirm()" type="warn">确认还款计划</x-button>
    	</div>
    	<div style="height: 50px;"></div>
    	<div class="cell-paya" style="z-index: 1000;display: none;">
    		<div class="cell-title" style="background: #F8F8F8; width: 100%;">
    			<div style="float: left;margin-left: 1rem;cursor: pointer;color: blue;margin-bottom: 0.5rem;margin-top: 0.5rem;" @click="endit()">取消</div>
    			<div style="float: right; margin-right: 1rem;cursor: pointer;color: blue;margin-bottom: 0.5rem;margin-top: 0.5rem;visibility: hidden;" @click="adda()">添加</div>
    			<div style="width: 100%;height: 0px;clear: both;background: #F8F8F8;"></div>
    			<div style="width: 100%;height: 1px;background: #767676;"></div>
    			<div class="content" style="position: relative;top: 0 !important;">
    				<p style="position: relative;left: -16px;" @click="fun(1)">百货商超</p>
    				<p style="position: relative;left: -16px;" @click="fun(2)">餐饮</p>
    				<p style="position: relative;left: -16px;" @click="fun(3)">奢侈品</p>
    				<p style="position: relative;left: -16px;" @click="fun(4)">服饰</p>
    				<p style="position: relative;left: -16px;" @click="fun(5)">化妆品</p>
    				<p style="position: relative;left: -16px;" @click="fun(6)">运动健身</p>
    				<p style="position: relative;left: -16px;" @click="fun(7)">美容美发</p>
    				<p style="position: relative;left: -16px;" @click="fun(8)">洗浴按摩</p>
    				<p style="position: relative;left: -16px;" @click="fun(9)">加油站</p>
    				<p style="position: relative;left: -16px;" @click="fun(10)">酒吧娱乐</p>
    				<p style="position: relative;left: -16px;" @click="fun(11)">酒店住宿</p>
    				<p style="position: relative;left: -16px;" @click="fun(12)">电影院</p>
    				<p></p>
    			</div>
    		</div>
    	</div>
    	<div class="mask" @click="mask" style="width: 100%;height: 100%;background: rgba(0,0,0,0.6);position: absolute;top: 0;left: 1px;display: none;"></div>
    </div>
</template>

<script>
	import { XButton, XHeader, Tabbar, TabbarItem, Group, XInput, Drawer, Loading,Toast,Badge,Marquee, MarqueeItem,Swiper,Cell,PopupPicker} from 'vux'
	import api from '../../components/other/api-url'
	import globalPM from '../../components/other/global-parameter'
	import axios from 'axios'
	import Cookies from 'js-cookie'
	import router from '../../router/index'
	import hangye from '../hangye'
	export default {
		components: { XButton, XHeader, Tabbar, TabbarItem, Group, XInput, Drawer, Loading,Toast,Badge ,Marquee, MarqueeItem,Swiper,Cell,PopupPicker},
		data() {
			return {
				errorStatus: false,
				errorMsg: '',
				loading: false,
				statename:'',
				payment:[],
        		imgurl:'',
        		weihao:"",
        		statea:'',
        		title:"",
        		aaa:'',
        		bbb:'',
        		ccc:'',
        		ddd:'',
        		texta:[],
			}
		},
		methods: {
			/*通联代还计划修改行业类别接口   
			/user/repay/update/mcc   
			传入参数 参数类型 必需 描述
			creditCardId Long Y 信用卡ID
			idx Integer Y 序号
			mccid String Y 行业类别编码*/
			back(){
				router.push('/setplan')
			},
			fun(a){
				let _this = this;
				let mccid;
				switch (a){
					case 1:
						$('#'+localStorage.getItem('hahha')).text('百货商超')
						break;
					case 2:
						$('#'+localStorage.getItem('hahha')).text('餐饮')
						break;
					case 3:
						$('#'+localStorage.getItem('hahha')).text('奢侈品')
						break;
					case 4:
						$('#'+localStorage.getItem('hahha')).text('服饰')
						break;
					case 5:
						$('#'+localStorage.getItem('hahha')).text('化妆品')
						break;
					case 6:
						$('#'+localStorage.getItem('hahha')).text('运动健身')
						break;
					case 7:
						$('#'+localStorage.getItem('hahha')).text('美容美发')
						break;
					case 8:
						$('#'+localStorage.getItem('hahha')).text('洗浴按摩')
						break;
					case 9:
						$('#'+localStorage.getItem('hahha')).text('加油站')
						break;
					case 10:
						$('#'+localStorage.getItem('hahha')).text('酒吧娱乐')
						break;
					case 11:
						$('#'+localStorage.getItem('hahha')).text('酒店住宿')
						break;
					case 12:
						$('#'+localStorage.getItem('hahha')).text('电影院')
						break;
					default:
						break;
				}
				switch ($('#'+localStorage.getItem('hahha')).text()){
					case "百货商超":
						mccid = 'M001';
						break;
					case "餐饮":
						mccid = 'M002';
						break;
					case "奢侈品":
						mccid = 'M003';
						break;
					case "服饰":
						mccid = 'M004';
						break;
					case "化妆品":
						mccid = 'M005';
						break;
					case "运动健身":
						mccid = 'M006';
						break;
					case "美容美发":
						mccid = 'M007';
						break;
					case "洗浴按摩":
						mccid = 'M008';
						break;
					case "加油站":
						mccid = 'M009';
						break;
					case "酒吧娱乐":
						mccid = 'M0010';
						break;
					case "酒店住宿":
						mccid = 'M0011';
						break;
					case "电影院":
						mccid = 'M0012';
						break;
					default:
						break;
				}
				$(".cell-paya").hide('blind',{direction:'down'},100)
				$(".mask").hide('fade')
				axios.get(api + '/user/repay/update/mcc?creditCardId='+ localStorage.getItem("yhcarda")+ '&idx=' + localStorage.getItem('hahha') + '&mccid=' + mccid + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
			        console.log(res.data)
			        if (res.data.code === 0) {
			        }
			        else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
			        if (res.data.code === 110) {
			        	router.push('/login')
			        }
		      	})
			},
			mask(){
				console.log("mask")
				$(".cell-paya").hide('blind',{direction:'down'},100)
				$(".mask").hide('fade')
			},
			endit(){
				$(".cell-paya").hide('blind',{direction:'down'},100)
				$(".mask").hide('fade')
			},
			haha(x){
				localStorage.setItem("hahha",x);
				$('.cell-paya').show('blind',{direction:'down'},100)
				$(".mask").show('fade')
			},
			confirm(){
				//确认通联代还计划接口
				let _this = this;
				axios.get(api + '/user/repay/confirm/plan?creditCardId='+ localStorage.getItem("yhcarda") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
			        console.log(res.data)
			        if (res.data.code === 0) {
						localStorage.setItem('orderNoa',res.data.data)
						setTimeout(function  () {
							router.push('/setplansuc')
						},300)
			        }
			        else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
			        if (res.data.code === 110) {
			        	router.push('/login')
			        }
		      	})
			}
		},
		created() {
			/*生成通联代还计划   
			/user/repay/get/plan   
			传入参数 参数类型 必需 描述
			totalAmount Integer Y 还款总额
			balance Integer Y 账户余额
			creditCardId Long Y 信用卡ID
			repayDays Integer Y 还款天数
			city String Y 消费地区编码
			传出参数   
			totalFee Double  总手续费（元）
			totalAmount Double  还款总额（元）
			cardBalance Double  卡内余额（元）
			repayDays Integer  还款天数
			details Json  还款计划详情
			idx Integer  期数
			tradeTime Date  代扣时间
			tradeMoney Double  代扣金额（元）
			transferTime Date  代还时间
			transferMoney Double  代还金额（元）
			rateMoney Double  手续费（元）
			repayOrderFlag Integer  1、扣款， 2、还款
			mccName String  行业名称*/
			let _this = this
			axios.post(api + '/user/repay/get/plan?totalAmount=' + localStorage.getItem('totalAmount') + '&balance=' + localStorage.getItem('balance') + '&creditCardId=' + localStorage.getItem("yhcarda") + '&repayDays=' + localStorage.getItem('repayDays')+ '&city=' + localStorage.getItem('city') + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log(res.data)
					if (res.data.code === 0) {
						_this.aaa = res.data.data.totalAmount.toFixed(1)+'元'
						_this.bbb = res.data.data.cardBalance.toFixed(1)+"元"
						_this.ccc = res.data.data.repayDays+'天'
						_this.ddd = res.data.data.totalFee+"元"
						_this.texta = res.data.data.planDetails;
						localStorage.setItem('timesuc',res.data.data.planDetails[res.data.data.planDetails.length-1].transferTime.substring(0,10))
					}
					else{
						_this.errorStatus = true
						_this.errorMsg = res.data.msg
					}
		        	if (res.data.code === 110) {
		        		router.push('/login')
		        	}
				})
		},
		mounted () {
			
	  	},
	}
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
	.yitixianindexnamea{
		.cell-paya{
			width: 100% !important;
			position: absolute;
			bottom: 0;
			overflow: hidden;
			.content{
				height: 150px;
				overflow: scroll;
				p{
					text-align: center;
					font-size: 16px;
					line-height: 35px;
					height: 35px;
					color: #000000 !important;
				}
			}
		}
		.cardmanageindexz{
			position: relative;
			top: -20px;
			.vux-label{
				color: #000000;
			}
		}
		.textx{
			width:90vw;
			margin: 0 auto;
			.textxa{
				background: rgb(250,123,123);
				padding:15px 10px;
				height:25px;
				span,p{
					color:#FFF;
				}
				span:nth-of-type(2){
					float: right;
				}
				p{
					position: relative;
					top: -22px;
					text-align: center;
				}
			}
			.textxb{
				background: #FFF;
				padding:0 10px;
				height: 40px;
				font-size: 12px;
				text-align: center;
				span{
					display: inline-block;
				}
				span:nth-of-type(2){
					float: right;
				}
				span:nth-of-type(1){
					float: left;
					width: 110px;
					text-align: left;
				}
				p{
					position: relative;
					text-align: center;
					display: inline-block;
					border: 1px solid rgb(250,123,123);
					padding: 1px 8px;
					border-radius: 5px;
					color: rgb(250,123,123);
					position: relative;
    				left: -30px;
				}
			}
		}
		.vux-cell-box{
			display: inline-block;
			height: 30px;
			.vux-cell-value{
				line-height: 30px !important;
				color: rgb(250,123,123) !important;
				border: 1px solid rgb(250,123,123);
				padding: 0 10px;
				border-radius: 5px;
			}
		}
		.vux-cell-box:not(:first-child):before{
			border-top: none;
		}
		.weui-cell_access .weui-cell__ft:after{
			width: 0 !important;
			height: 0 !important;
			border-color: #FFF;
		}
	}
	.green{
		color: green;
	}
	.red{
		color: red;
	}
	.statezz{
		color: #999999;
	}
</style>