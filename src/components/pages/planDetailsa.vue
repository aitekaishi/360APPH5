<template>
	<div class="yitixianindexname" style="width:100vw;overflow-x: hidden;height: 100vh;">
		<loading :show="loading"></loading>
		<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">计划详情</x-header>
		<group class="cardmanageindex cardmanageindexa">
			<cell :title="title" :inline-desc="weihao">
				<img slot="icon" width="40" style="display:block;margin-right:20px;border-radius: 50%;" :src="imgurl">
			</cell>
		</group>
		<p style="position: relative;top: -45px;left: 70vw;width: 100px;text-align: right;" :class="{green:statea==3||statea==6||statea==9||statea==14,red:statea==4||statea==7||statea==15,statezz:statea!=3&&statea!=4&&statea!=6&&statea!=7&&statea!=9&&statea!=14&&statea!=15}">{{statename}}</p>
		<group class='cardmanageindexz'>
			<cell class='assa' title="订单编号" v-model="a"></cell>
			<cell class='assa' title="总还款金额" v-model="b"></cell>
			<cell class='assa' title="已还款金额" v-model="z"></cell>
			<cell class='assa' title="卡余额" v-model="c"></cell>
			<cell class='assa' title="还款天数" v-model="d"></cell>
			<cell title="总手续费" v-model="e"></cell>
		</group>
		<div class="textx" v-for="item in text">
			<div class="textxa">
				<span>还款:{{item.transferMoney.toFixed(1)}}</span>
				<span>{{item.transferTime.substr(0,10)}}</span>
				<p>手续费:{{item.rateMoney}}</p>
				<!--<p><popup-picker :placeholder=item.idx v-model="kuaijie" @on-change="addpayway(item.idx)" :data="kuaijielist" confirm-text="确定"></popup-picker></p>-->
			</div>
			<div class="textxb" v-for="itema in item.subPlanDetails">
				<div style="height: 10px;"></div>
				<div v-show=(itema.tradeMoney)>
					<span>{{itema.idx}}、{{itema.tradeMoney}}元(消费)</span>
					<span :class="{green:itema.state==3||itema.state==6||itema.state==9||itema.state==14,red:itema.state==4||itema.state==7||itema.state==15,statezz:itema.state!=3&&itema.state!=4&&itema.state!=6&&itema.state!=7&&itema.state!=9&&itema.state!=14&&itema.state!=15}">{{itema.stateDesc}}</span>
					<p style="position: relative;top: -18px;">{{itema.tradeTime.substr(10)}}</p>
				</div>
				<div v-show=(itema.transferTime)>
					<span>{{itema.idx}}、{{itema.transferMoney}}元(还款)</span>
					<span :class="{green:itema.state==3||itema.state==6||itema.state==9||itema.state==14,red:itema.state==4||itema.state==7||itema.state==15,statezz:itema.state!=3&&itema.state!=4&&itema.state!=6&&itema.state!=7&&itema.state!=9&&itema.state!=14&&itema.state!=15}">{{itema.stateDesc}}</span>
					<p style="position: relative;top: -18px;">{{itema.transferTime.substr(10)}}</p>
				</div>
				<div style="height: 5px;"></div>
			</div>
			<div style="height: 20px;"></div>
		</div>
		<div style="height: 50px;"></div>
		<div v-show="statea==1||statea==3||statea==4||statea==6||statea==7" class="cardbutton">
    		<x-button class="XB" @click.native="confirm()" type="warn">终止还款计划</x-button>
    	</div>
    	<div style="height: 50px;"></div>
    	<div class="cell-paya" style="display: none;z-index: 1000;">
    		<div class="cell-title" style="background: #F8F8F8; width: 100%;">
    			<div style="float: left;margin-left: 1rem;cursor: pointer;color: blue;margin-bottom: 0.5rem;margin-top: 0.5rem;" @click="endit()">编辑</div>
    			<div style="float: right; margin-right: 1rem;cursor: pointer;color: blue;margin-bottom: 0.5rem;margin-top: 0.5rem;" @click="adda()">添加</div>
    			<div style="width: 100%;height: 0;clear: both;"></div>
    			<div class="content">
    				<p></p>
    				<p @click="fun(1)">百货商超</p>
    				<p @click="fun(2)">餐饮</p>
    				<p @click="fun(3)">奢侈品</p>
    				<p @click="fun(4)">服饰</p>
    				<p @click="fun(5)">化妆品</p>
    				<p @click="fun(6)">运动健身</p>
    				<p @click="fun(7)">美容美发</p>
    				<p @click="fun(8)">洗浴按摩</p>
    				<p @click="fun(9)">加油站</p>
    				<p @click="fun(10)">酒吧娱乐</p>
    				<p @click="fun(11)">酒店住宿</p>
    				<p @click="fun(12)">电影院</p>
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
	export default {
		components: { XButton, XHeader, Tabbar, TabbarItem, Group, XInput, Drawer, Loading,Toast,Badge ,Marquee, MarqueeItem,Swiper,Cell,PopupPicker},
		data() {
			return {
				kuaijielist:[["百货商超","餐饮","奢侈品","服饰","化妆品","运动健身","美容美发","洗浴按摩","加油站","酒吧娱乐","酒店住宿","电影院"]],
        		kuaijie:[],
				errorStatus: false,
				errorMsg: '',
				loading: false,
				statename:'',
				payment:[],
        		imgurl:'',
        		weihao:"",
        		statea:'',
        		title:"",
        		a:'',
        		b:'',
        		c:'',
        		d:'',
        		e:'',
        		text:[],
        		testa:[]
			}
		},
		methods: {
			/*通联代还计划详情查询接口   
			/user/repay/getPlanInfo   
			传入参数 参数类型 必需 描述
			orderNo String Y 主订单编号
			传出参数   
			userOrderId String  订单编号
			bankName String  银行名称
			logo String  银行图标
			totalAmount Double  还款金额
			cardBalance Double  卡内余额
			periods Integer  总期数
			totalFee Double  总手续费
			stateDesc String  状态描述
			repayDays Integer  还款天数
			planDetails Json  id                Long        主键uid               Long        用户IDidx               Integer	  期数tradeTime         Date        扣款时间tradeMoney        Double      扣款金额transferTime      Date        还款时间transferMoney     Double      还款金额rateMoney         Double      手续费orderNo           String      主订单编号subOrderNo        String      子订单编号state                  Integer   订单状态stateDesc         String      状态描述mccName           String      行业名称repayOrderFlag    Integer     1扣款2还款subPlanDetails    Json        子订单明细
			备注：state是3、6、9、14时颜色为绿色；state是4、7、15时为红色；state为其他时为灰色          state是1、3、4、6、7时可以终止   
			*/
			back(){
				router.push('/record')
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
			haha(x){
				localStorage.setItem("hahha",x);
				$('.cell-paya').show('blind',{direction:'down'},100)
				$(".mask").show('fade')
			},
			confirm(){
				//手动终止通联代还计划接口
				let _this = this
				_this.loading = true
				axios.get(api + '/user/repay/stop/plan?orderNo='+ localStorage.getItem("orderNoa") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (res) {
					_this.loading = false
			        console.log(res.data)
			        if (res.data.code === 0) {
						/*axios.get(api + '/user/repay/getPlanInfo?orderNo='+ localStorage.getItem("orderNoa") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
					        console.log(response.data)
					        if (response.data.code === 0) {
					        	_this.title = response.data.data.bankName
								_this.weihao = "尾号"+response.data.data.endCode
								_this.imgurl = response.data.data.logo
								_this.statename = response.data.data.stateDesc
								_this.a = response.data.data.userOrderId
								_this.b = response.data.data.totalAmount.toFixed(1)+'元'
								_this.c = response.data.data.cardBalance.toFixed(1)+"元"
								_this.d = response.data.data.repayDays+'天'
								_this.e = response.data.data.totalFee+"元"
								_this.statea = response.data.data.state
								_this.text = response.data.data.planDetails
					        }
					        if (response.data.code === 110) {
					        	router.push('/login')
					        }
				      	})*/
				      	_this.errorStatus = true
						_this.errorMsg = "计划终止成功"
				      	setTimeout(function  () {
				      		router.push('/cardlist');
				      	},500)
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
			let _this = this
			axios.get(api + '/user/repay/getPlanInfo?orderNo='+ localStorage.getItem("orderNoa") + '&uid=' + localStorage.getItem("uid") + '&token=' + localStorage.getItem("token") + '&valid=0' + globalPM).then(function (response) {
		        console.log(response.data)
		        if (response.data.code === 0) {
		        	_this.title = response.data.data.bankName
					_this.weihao = "尾号"+response.data.data.endCode
					_this.imgurl = response.data.data.logo
					_this.statename = response.data.data.stateDesc
					_this.a = response.data.data.userOrderId
					_this.b = response.data.data.totalAmount.toFixed(1)+'元'
					_this.c = response.data.data.cardBalance.toFixed(1)+"元"
					_this.d = response.data.data.repayDays+'天'
					_this.e = response.data.data.totalFee+"元"
					_this.statea = response.data.data.state
					_this.text = response.data.data.planDetails
					_this.z = response.data.data.alReadyRepay.toFixed(1)+"元"
		        }
		        if (response.data.code === 110) {
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
	.yitixianindexname{
		.cell-paya{
			width: 100% !important;
			position: absolute;
			bottom: 0;
			border-left: 1px solid #DEDEDE;border-right: 1px solid #DEDEDE;
			.content{
				height: 150px;
				overflow: scroll;
				p{
					text-align: center;
					font-size: 16px;
					height: 30px;
					border: 1px solid red;
				}
			}
		}
		.vux-cell-box{
			display: inline-block;
			height: 30px;
			.vux-cell-value{
				line-height: 30px !important;
				color: yellow !important;
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
		.cardmanageindexz{
			position: relative;
			top: -20px;
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
				span:nth-of-type(2){
					float: right;
				}
				p{
					position: relative;
					top: -22px;
					text-align: center;
				}
			}
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