<template>
	<div style="width: 100vw;height: 100vh;min-height: 650px;overflow-y: hidden;" class="cardinfoaaaaaa">
		<loading :show="loading"></loading>
    	<toast v-model="errorStatus" type="text" time=3000>{{errorMsg}}</toast>
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">完善信用卡信息</x-header>
		</div>
    	<div class="cardinfoz">
    		<group>
    			<x-input class='assa' title="卡类型  " v-model="cardtype"></x-input>
    			<x-input class="assa" title="身份证  " v-model="idcard" placeholder="请输入持卡人身份证号" mask='999999999999999999'></x-input>
    			<datetime class="assa" @on-change="changge" v-model="usedate" format = "MM/YYYY" title = "有效期" placeholder="信用卡有效期" confirm-text='确定' year-row='{value}年' month-row='{value}月'></datetime>
    			<x-input class="assa" type="number" title="安全码  " v-model="successcard" placeholder="卡背面末三位" mask='999'></x-input>
    			<x-input class="assa" type="number" title="预留手机 " v-model="iphone" placeholder="请输入预留手机号"  mask="99999999999"></x-input>
    			<popup-picker class="changgee assa" @on-change="changgee" title="账单日" :data="kuaijielist" v-model="kuaijie" popup-title="日期选择" cancel-text="取消" confirm-text="确定" placeholder="请选择"></popup-picker>
    			<popup-picker class="changgeee assa" @on-change="changgeeee" title="还款日" :data="kuaijielista" v-model="kuaijiea" popup-title="日期选择" cancel-text="取消" confirm-text="确定" placeholder="请选择"></popup-picker>
    			<div v-show="showa" class="cardmanageindexcc">
		    		<x-input class="assa" title="单笔限额 : " v-model="inputmoneya" type='number' mask="99999999999999999999999999" placeholder="1000 (可修改)"></x-input>
		    		<x-input title="单日限额 : "  v-model="inputmoneyb" type='number' mask="99999999999999999999999999999" placeholder="6000 (可修改)"></x-input>
				</div>
    		</group>
    	</div>
    	<div class="serverinfo">
    		<img @click="agreenaa" v-show="agreena" src="../../../assets/(agree)_SFont.CN (1).svg"/><img @click="agreenaa" v-show="!agreena" src="../../../assets/(agree)_SFont.CN.svg"/>&nbsp;&nbsp;我同意&nbsp;<span @click="historybill(5)" style="color: blue;cursor: pointer;">《服务协议》</span>
    		
    	</div>
    	<div class="cardbutton">
    		<x-button class="XB" :disabled="XB" @click.native="confirm()" type="warn">提交</x-button>
    	</div>
    	<img src="../../../assets/my/help.png" alt="" class="help1 youxiaoqi" @click="historybill(1)"/><br />
    	<img src="../../../assets/my/help.png" alt="" class="help1 anquanma" @click="historybill(2)"/><br />
    	<img v-show="showa" src="../../../assets/my/help.png" alt="" class="help1 danbi" @click="historybill(3)"/><br />
    	<img v-show="showa" src="../../../assets/my/help.png" alt="" class="help1 danri" @click="historybill(4)"/>
    	<div>
      <x-dialog v-model="show" hide-on-blur=true>
        <div class="dialogdiv" @click="show = false,close=false" style="text-align:center;">
          <span v-show="a5" style="display: inline-block;">快捷支付服务协议</span><br v-show="a5"/><br v-show="a5"/>
          <div v-show="a5" style="text-align: left;text-align: justify;">
          	（1）快捷支付服务协议（以下简称“本协议”）是泽昌智能科技有限公司（以下简称“泽昌智能”）与泽昌智能用户(以下简称“用户”或“您”)就快捷支付服务的使用等相关事宜所订立的有效协议。泽昌智能在此特别提醒您认真阅读并充分理解本协议各条款，特别是免除或限制泽昌智能的责任、限制您的权利、规定争议解决方式的相关条款。您使用本服务或者通过网络页面或手机客户端界面点击或以其他方式同意/确认本协议，即表示您与泽昌智能已达成协议并同意接受本协议的全部内容。<br />

（2）您使用本服务或者点击同意/确认行为即表示您授权委托泽昌智能代您与您所持银行卡发卡行签署代扣协议，同时授权银行卡发卡行有权按照泽昌智能的扣划指令从您的相应银行卡账户中扣划相应款项。

<br />（3）您应确保您是使用本服务的银行卡持有人，可合法、有效使用该银行卡且未侵犯任何第三方合法权益，不得冒用他人银行卡进行信用卡诈骗行为，否则因此造成泽昌智能、持卡人损失的，您应负责赔偿并承担全部法律责任，包括但不限于冻结您全部或部分泽昌智能账户(含该账户之关联账户)及资金并从您的前述泽昌智能账户中扣除相应的款项等，所应承担的赔偿范围包括但不限于实际经济损失、商业信誉损失、诉讼费、律师费、保全费、鉴定费、公证费、解决纠纷必要的人工费、差旅费、交通费、承担败诉风险时支付第三方的赔偿金等。

<br />（4）您同意泽昌智能有权依据其自身判断对涉嫌欺诈或被他人控制并用于欺诈目的的泽昌智能账户采取相应的措施，上述措施包括但不限于冻结账户及资金、处置涉嫌欺诈的资金等。

<br />（5）泽昌智能根据您所购买商品的商家提供的您在商家注册拥有的唯一客户ID标识或泽昌智能账户或移动终端标识（以下统一简称“标识”），将以上标识与您银行卡信息及手机信息建立对应关联关系，您须妥善保管您的以上标识、密码等账户安全信息及银行卡号、有效期、安全码、证件号码、手机动态密码等敏感信息，不得将敏感信息向他人透露，因您对标识、银行卡信息、手机等保管不善产生的风险及损失由您本人承担。

<br />（6）您应向泽昌智能提供您的真实姓名、身份证号、手机号、银行卡等个人信息，及时更新您正确、最新及完整的身份信息及相关资料。若泽昌智能有合理理由怀疑您提供的信息或相关资料错误、不实、过时或不完整的，泽昌智能有权暂停或终止向您提供部分或全部本服务。泽昌智能对此不承担任何责任，您将承担因此产生的任何直接或间接支出。因您未及时更新资料导致的一切后果，均应由您自行承担，该后果包括但不限于导致本服务无法提供或提供时发生任何错误、支付账户及该账户内余额被别人盗用，且您不得将此作为取消交易、拒绝付款的理由。

<br />（7）您应当准确提供并及时更新您提供的联系方式，以便泽昌智能与您进行及时、有效联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失或增加任何费用等不利后果。

<br />（8）您同意并授权泽昌智能在法律允许的范围内收集和使用您的个人信息，并且将这些信息向泽昌智能选定的市场化征信服务机构进行披露，对您进行身份信息识别及背景调查以便为您提供更加安全、合规的综合化或专业化的服务，符合国家反洗钱相关法律法规的要求，并且您授权泽昌智能及其关联公司有权通过泽昌智能选定的市场化征信服务机构或其他合法手段验证您的上述信息是否真实、准确和有效。这些信息包括但不限于：您的真实姓名、身份证号码、联系方式、信用状况、银行账号等。未经您的授权，泽昌智能不会向除泽昌智能及其关联公司或合作方以外的任何第三方透露您的银行卡号码、银行账户、其他金融信息或个人隐私信息，法律法规另有规定或监管机构、法院等有权单位依法请求的除外。

<br />（9）泽昌智能及您所持银行卡发卡行仅提供您与商家在购买交易过程中的相关款项的支付结算服务，因商家的商品所产生的有关商品本身的产品质量、服务质量、费用金额等争议均由您与提供商品的商家自行协商解决，概与泽昌智能及发卡行无关。

<br />（10）您在使用本服务时应当认真确认交易信息，包括且不限于商品名称、数量、金额等，并按泽昌智能业务流程发出符合《泽昌智能快捷支付服务协议》约定的指令。您发出的指令不可撤回或撤销，泽昌智能有权根据您的指令委托银行或第三方从银行卡中划扣资金给收款人。届时您不应以非本人意愿交易或其他任何原因要求泽昌智能退款或承担其他责任。

<br />（11）您保证对您使用本服务所发出的指令的真实性和有效性负责，不得进行虚假交易、套取资金等违法违规行为。若您违反前述保证从而给泽昌智能、发卡行或持卡人造成损失的，您应负责赔偿并承担全部法律责任（应赔偿的损失包括但不限于实际经济损失、商业信誉损失、诉讼费、律师费、保全费、鉴定费、公证费、解决纠纷必要的人工费、差旅费、交通费、承担败诉风险时支付第三方的赔偿金等）。

<br />（12）泽昌智能有权基于业务调整或风险管控的需要，暂停、中断或终止向您提供本服务。您存在下列情形之一的，泽昌智能有权立即终止您使用相关服务而无需承担任何责任：1.您违反法律法规政策等规定的；2.您违反本协议约定的；3.您违反泽昌智能发布的使用本服务所必须遵守的协议、规则等相关规定的；4.泽昌智能认为向您提供本服务存在风险的。

<br />（13）由于不可抗力或意外事件而影响泽昌智能正常的服务和技术支持时，不应该视为泽昌智能违约。不可抗力、意外事件是指不能预见、不能克服并不能避免且对一方或双方当事人造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为、管制以及其他如电信线路故障、银行系统调整或故障、突然停电等意外事件等。

<br />（14）所有使用本服务而必须遵守的协议、附件和规则等均构成本协议不可分割的组成部分，与本协议具有同等法律效力。

<br />（15）本协议的效力、解释、变更、执行及争议的解决适用中华人民共和国法律。就本协议所引起的任何争议和纠纷，均应由双方友好协商解决；如协商不成的，您和泽昌智能均有权向泽昌智能总部所在地深圳市南山区有管辖权的人民法院提起诉讼。

<br />（16）您同意，泽昌智能有权对本协议内容进行相应修改或变更，并通过在泽昌智能网站公布的形式进行通知，修改或变更后的协议内容在泽昌智能网站公布即有效代替原来的协议，您须定期关注、注意泽昌智能网站并定期审阅本协议及其变更内容。若您不同意泽昌智能对本协议所作的任何修改或变更，您应立即向泽昌智能申请停止使用本服务。若您在本协议内容公布变更后仍继续使用本服务，则表示您已充分阅读、理解、同意并接受修改或变更后的协议内容，也将遵循修改或变更后的协议内容使用本服务。
          </div>
		<div v-show="a1">
			<div style="font-size: 18px;">有效期说明</div>
			<div style="height: 8px;"></div>
			<img src="../../../assets/youxiaoqi.png" alt="" style="width: 63vw;"/>
			<div style="height: 8px;"></div>
			<div style="text-align: left;">有效期是打印在信用卡正面卡号下方，标准格式为月份在前，年份在后的一串数字。</div>
			<div style="height: 18px;"></div>
			<x-button style='border-radius: 15px;padding: 5px !important;' type="warn" @click.native="closea">知道了</x-button>
		</div>
		<div v-show="a2">
			<div style="font-size: 18px;">安全码说明</div>
			<div style="height: 8px;"></div>
			<img src="../../../assets/anquanma.png" alt="" style="width: 63vw;"/>
			<div style="height: 8px;"></div>
			<div style="text-align: left;">安全码是打印在信用卡背面签名区域的一组数字，一般是后3位数字。</div>
			<div style="height: 18px;"></div>
			<x-button style='border-radius: 15px;padding: 5px !important;' type="warn" @click.native="closea">知道了</x-button>
		</div>
		<div v-show="a3">
			<div style="font-size: 18px;">单笔限额</div>
			<div style="height: 8px;"></div>
			<div style="text-align: left;font-size: 16px;">浦发、光大、广发银行用户可根据您账单分期的实际情况，调整单笔交易金额限度，避免单笔交易金额超限的问题造成分期失败的情况。</div>
			
			<div style="height: 28px;"></div>
			<x-button style='border-radius: 15px;padding: 5px !important;' type="warn" @click.native="closea">知道了</x-button>
		</div>
		<div v-show="a4">
			<div style="font-size: 18px;">单日限额</div>
			<div style="height: 8px;"></div>
			<div style="text-align: left;font-size: 16px;">浦发、光大、广发银行用户可根据您账单分期的实际情况，调整单日交易金额限度，避免单日交易金额超限的问题造成分期失败的情况。</div>
			
			<div style="height: 28px;"></div>
			<x-button style='border-radius: 15px;padding: 5px !important;' type="warn" @click.native="closea">知道了</x-button>
		</div>
        </div>
        </x-dialog>
    </div>
    <img id="close" v-show="a5" @click="closea" src="../../../assets/guanbi.png" width="30px" style="position: fixed;top: 90vh;"/>
      <div style="height: 200px;"></div>
    </div>
</template>
<script>
	import {XInput,Group,XButton,Cell,PopupHeader,XHeader,Toast,Loading,PopupPicker,Datetime,XDialog} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	import base64 from 'base-64'
	import fun_aes from './base.js'
	import MD5 from 'md5'
	var CryptoJS = require("crypto-js")
	export default {
		components: {XInput,Group,XButton,Cell,PopupHeader,XHeader,Toast,Loading,PopupPicker,Datetime,XDialog},
		data (){ 
			return {
				loading:false,
				errorStatus: false,
        		errorMsg: '',
				cardtype:"",
				idcard:"",//身份证号
				usedate:"",//信用卡有效期
				successcard:'',
				iphone:'',//预留手机号
				XB:true,
				show:false,
				close:false,
				usedateb:"",//信用卡有效期
				usedatec:"",//信用卡有效期
				kuaijielist:[["每月1日","每月2日","每月3日","每月4日","每月5日","每月6日","每月7日","每月8日","每月9日","每月10日","每月11日","每月12日","每月13日","每月14日","每月15日","每月16日","每月17日","每月18日","每月19日","每月20日","每月21日","每月22日","每月23日","每月24日","每月25日","每月26日","每月27日","每月28日","每月29日","每月30日","每月31日"]],
        		kuaijie:[],
        		kuaijielista:[["每月1日","每月2日","每月3日","每月4日","每月5日","每月6日","每月7日","每月8日","每月9日","每月10日","每月11日","每月12日","每月13日","每月14日","每月15日","每月16日","每月17日","每月18日","每月19日","每月20日","每月21日","每月22日","每月23日","每月24日","每月25日","每月26日","每月27日","每月28日","每月29日","每月30日","每月31日"]],
        		kuaijiea:[],
        		ddd:false,
        		inputmoneya:'',
        		inputmoneyb:'',
        		a5:false,
        		a1:false,
        		a2:false,
        		a3:false,
        		a4:false,
        		showa:false,
        		agreena:true
			}
		},
		methods:{
			back(){
				router.push('/boundcreditcarda')
			},
			agreenaa(){
				const _this = this;
				_this.agreena = !_this.agreena
			},
			historybill(x){
				const _this = this;
				_this.show = true;
				_this.close = true;
				if (x == 5) {
					_this.a5 = true;
					_this.a1 = false;
					_this.a2 = false;
					_this.a3 = false;
					_this.a4 = false;
					$('.dialogdiv').attr("style",'height: 60vh;overflow-y: scroll;')
				}else if (x == 4) {
					_this.a4 = true;
					_this.a1 = false;
					_this.a2 = false;
					_this.a3 = false;
					_this.a5 = false;
					$('.dialogdiv').attr("style",'height: auto;overflow-y: scroll;')
				}
				else if (x == 3) {
					_this.a3 = true;
					_this.a1 = false;
					_this.a2 = false;
					_this.a4 = false;
					_this.a5 = false;
					$('.dialogdiv').attr("style",'height: auto;overflow-y: scroll;')
				}
				else if (x == 2) {
					_this.a2 = true;
					_this.a1 = false;
					_this.a4 = false;
					_this.a3 = false;
					_this.a5 = false;
					$('.dialogdiv').attr("style",'height: auto;overflow-y: scroll;')
				}
				else if (x == 1) {
					_this.a1 = true;
					_this.a4 = false;
					_this.a2 = false;
					_this.a3 = false;
					_this.a5 = false;
					$('.dialogdiv').attr("style",'height: auto;overflow-y: scroll;')
				}
			},
			/*提交代还信用卡信息   
			/user/repay/bindCreditCard   
			传入参数 参数类型 必需 描述
			channelId long  通道ID
			bankCard string  卡号
			userBankPhone string  预留手机号
			cardExpire string  卡片过期时间 MMyy
			cvv string  安全码
			billDay integer  账单日
			payDay integer  还款日*/
			confirm:function () {
				const _this = this;
				var base = base64.encode(_this.iphone.substring(_this.iphone.length-4));
        		var basestr =  base.substring(base.length-4);
       			 var stringA='appVersion=1.0.0'+ "&bankCard=" + localStorage.getItem('creditcardnum')+'&billDay='+localStorage.getItem("zhangdan")+ "&cardExpire=" + usedate + '&channelId='+localStorage.getItem("xianid")+ "&cvv=" + _this.successcard+ "&dayAmount=" + 600000 +'&osType=ANDRIOD'+'&payDay='+localStorage.getItem("huankuan")+ "&singleAmount=" + 100000+ '&token=' + localStorage.getItem('token')+ '&uid=' + localStorage.getItem('uid')+'&userBankPhone=' + _this.iphone + '&valid=0&validType=1&version=1.0.0';
				var stringSignTemp=stringA+basestr;
				var sign=MD5(stringSignTemp).toUpperCase();
				console.log(_this.usedate.replace('/20',''))
				let usedate = _this.usedate.replace('/20','')
				var key = fun_aes.CryptoJS.enc.Utf8.parse(localStorage.getItem('keykey'));
				var iv = fun_aes.CryptoJS.enc.Utf8.parse(localStorage.getItem('iv'));
				
				function AES_Encrypt(word) {
				  var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
				  var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
				  var hexStr = encrypted.ciphertext.toString().toUpperCase();
				
				  /*console.log('hexStr->' + hexStr);
				  var oldHexStr = fun_aes.CryptoJS.enc.Hex.parse(hexStr);
				  var base64Str = fun_aes.CryptoJS.enc.Base64.stringify(oldHexStr);
				  console.log('base64Str->' + base64Str);*/
				  return hexStr;
				}
				var encryptedBase64Str = AES_Encrypt(_this.successcard)
				var encryptedBase64Stra = AES_Encrypt(usedate)
				if (localStorage.getItem('subUpdate')==1) {
					axios.post(api + '/user/repay/bindCreditCard?'+'userBankPhone=' + _this.iphone + "&bankCard=" + localStorage.getItem('creditcardnum')+'&billDay='+localStorage.getItem("zhangdan") + '&channelId='+localStorage.getItem("xianid")+'&payDay='+localStorage.getItem("huankuan") + "&cardExpire=" + encryptedBase64Stra + "&cvv=" + encryptedBase64Str+ "&singleAmount=" + 100000+ "&dayAmount=" + 600000  + '&token=' + localStorage.getItem('token') + '&uid=' + localStorage.getItem('uid')  + '&valid=0' + globalPM+'&sign=' + sign).then(function (res) {
					//console.log('提交代还信用卡信息')
					console.log(res.data)
					_this.loading = false;
					localStorage.setItem("iphonenum",_this.iphone);
		            localStorage.setItem("iphonenuma",_this.iphone.substr(0,3));
		            localStorage.setItem("iphonenumb",_this.iphone.substr(7,4));
		            localStorage.setItem("xiaofeiid",res.data.data.id);
			        if (res.data.code === 0) {
	        			_this.errorMsg = "验证码发送成功"
			        	_this.errorStatus = true
						setTimeout(function  () {
							router.push('/idcodeacquirea');
						},500)
			        }
			        else{
			        	_this.errorMsg = res.data.msg
			        	_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			} else if(_this.inputmoneya<100&&_this.inputmoneya!=''){
				_this.errorMsg = "单笔限额不能小于100";
			    _this.errorStatus = true;
			}else if(_this.inputmoneyb<500&&_this.inputmoneyb!=''){
				_this.errorMsg = "单日限额不能小于500";
			    _this.errorStatus = true;
			}else if(_this.inputmoneya==''&&_this.inputmoneyb==''){
				axios.post(api + '/user/repay/bindCreditCard?userBankPhone=' + _this.iphone + "&bankCard=" + localStorage.getItem('creditcardnum')+'&billDay='+localStorage.getItem("zhangdan") + '&channelId='+localStorage.getItem("xianid")+'&payDay='+localStorage.getItem("huankuan") + "&cardExpire=" + encryptedBase64Stra + "&cvv=" + encryptedBase64Str+ "&singleAmount=" + 100000+ "&dayAmount=" + 600000  + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log('提交代还信用卡信息');
					console.log(res.data);
					_this.loading = false;
					localStorage.setItem("iphonenum",_this.iphone);
		            localStorage.setItem("iphonenuma",_this.iphone.substr(0,3));
		            localStorage.setItem("iphonenumb",_this.iphone.substr(7,4));
		            localStorage.setItem("xiaofeiid",res.data.data.id);
			        if (res.data.code === 0) {
	        			_this.errorMsg = "验证码发送成功";
			        	_this.errorStatus = true;
						setTimeout(function  () {
							router.push('/idcodeacquirea');
						},500)
			        }
			        else{
			        	_this.errorMsg = res.data.msg
			        	_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			}else if(_this.inputmoneya==''&&_this.inputmoneyb!=''){
				axios.post(api + '/user/repay/bindCreditCard?userBankPhone=' + _this.iphone + "&bankCard=" + localStorage.getItem('creditcardnum')+'&billDay='+localStorage.getItem("zhangdan") + '&channelId='+localStorage.getItem("xianid")+'&payDay='+localStorage.getItem("huankuan") + "&cardExpire=" + encryptedBase64Stra + "&cvv=" + encryptedBase64Str+ "&singleAmount=" + 100000+ "&dayAmount=" + _this.inputmoneyb*100  + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log('提交代还信用卡信息');
					console.log(res.data);
					_this.loading = false;
					localStorage.setItem("iphonenum",_this.iphone);
		            localStorage.setItem("iphonenuma",_this.iphone.substr(0,3));
		            localStorage.setItem("iphonenumb",_this.iphone.substr(7,4));
		            localStorage.setItem("xiaofeiid",res.data.data.id);
			        if (res.data.code === 0) {
	        			_this.errorMsg = "验证码发送成功"
			        	_this.errorStatus = true
						setTimeout(function  () {
							router.push('/idcodeacquirea');
						},500)
			        }
			        else{
			        	_this.errorMsg = res.data.msg
			        	_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			}else if(_this.inputmoneya!=''&&_this.inputmoneyb==''){
				axios.post(api + '/user/repay/bindCreditCard?userBankPhone=' + _this.iphone + "&bankCard=" + localStorage.getItem('creditcardnum')+'&billDay='+localStorage.getItem("zhangdan") + '&channelId='+localStorage.getItem("xianid")+'&payDay='+localStorage.getItem("huankuan") + "&cardExpire=" + encryptedBase64Stra + "&cvv=" + encryptedBase64Str+ "&singleAmount=" + _this.inputmoneya*100 + "&dayAmount=" + 600000 + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log('提交代还信用卡信息');
					console.log(res.data);
					_this.loading = false;
					localStorage.setItem("iphonenum",_this.iphone);
		            localStorage.setItem("iphonenuma",_this.iphone.substr(0,3));
		            localStorage.setItem("iphonenumb",_this.iphone.substr(7,4));
		            localStorage.setItem("xiaofeiid",res.data.data.id);
			        if (res.data.code === 0) {
	        			_this.errorMsg = "验证码发送成功"
			        	_this.errorStatus = true
						setTimeout(function  () {
							router.push('/idcodeacquirea');
						},500)
			        }
			        else{
			        	_this.errorMsg = res.data.msg
			        	_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			}else{
				axios.post(api + '/user/repay/bindCreditCard?userBankPhone=' + _this.iphone + "&bankCard=" + localStorage.getItem('creditcardnum')+'&billDay='+localStorage.getItem("zhangdan") + '&channelId='+localStorage.getItem("xianid")+'&payDay='+localStorage.getItem("huankuan") + "&cardExpire=" + encryptedBase64Stra + "&cvv=" + encryptedBase64Str+ "&singleAmount=" + _this.inputmoneya*100+ "&dayAmount=" + _this.inputmoneyb*100  + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (res) {
					console.log('提交代还信用卡信息')
					console.log(res.data)
					_this.loading = false
					localStorage.setItem("iphonenum",_this.iphone);
		            localStorage.setItem("iphonenuma",_this.iphone.substr(0,3));
		            localStorage.setItem("iphonenumb",_this.iphone.substr(7,4));
		            localStorage.setItem("xiaofeiid",res.data.data.id);
			        if (res.data.code === 0) {
	        			_this.errorMsg = "验证码发送成功"
			        	_this.errorStatus = true
						setTimeout(function  () {
							router.push('/idcodeacquirea');
						},500)
			        }
			        else{
			        	_this.errorMsg = res.data.msg
			        	_this.errorStatus = true
			        }
			        if (res.data.code === 110) {
			            router.push('/login')
			        }
				})
			}
			},
			closea(){
				const _this = this;
				_this.show = false;
				_this.close = false;
				_this.a5 = false;
			},
			changge(){
				let _this = this
				console.log($(".cardinfoz a span").text().trim()=="信用卡有效期")
				if ($(".cardinfoz a span").text().trim()=="信用卡有效期") {
					$(".cardinfoz a span").attr("style","color: #000 !important;")
				}
			},
			changgee(){
				let _this = this
				localStorage.setItem("zhangdan",_this.kuaijie[0].replace('每月','').replace('日',''))
				if ($(".cardinfoz .changgee span").text().trim()=="请选择") {
					$(".cardinfoz .changgee span").attr("style","color: #000 !important;")
				}
				
			},
			changgeeee(){
				let _this = this
				localStorage.setItem("huankuan",_this.kuaijiea[0].replace('每月','').replace('日',''))
				if ($(".cardinfoz .changgeee span").text().trim()=="请选择") {
					$(".cardinfoz .changgeee span").attr("style","color: #000 !important;")
				}
			}
		},
		created(){
			const _this = this;
			console.log(localStorage.getItem('subUpdate'))
			_this.cardtype = localStorage.getItem('creditcardname')
			console.log('进入cardinfoz');
			_this.idcard = localStorage.getItem('cardId')
			if (localStorage.getItem('subUpdate')==1) {
				_this.showa = false;
				_this.a3 = false;
				_this.a4 = false;
			} else{
				_this.showa = true;
				_this.a3 = true;
				_this.a4 = true;
			}
			
		},
		updated(){
			//判断提交按钮可以点击
			const _this = this
			if (_this.cardtype !== ''&&_this.idcard !== ''&&_this.usedate !== ''&&_this.successcard !== ''&&_this.iphone !== ''&&_this.kuaijie!=''&&_this.kuaijiea!=''&&_this.agreena==true) {
				_this.XB = false;
			}else{
				_this.XB=true;
			}
		}
	}
</script>
<style lang="less">
	@import url("less/x-header.less");
	@import url("less/default.less");
	@import url("less/button.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.headerinfo{
		padding: 0.5rem 1rem;
		color: #9B9B9B;
	}
	.cardinfoz{
		position: relative;
		top: -0.3rem;
		.cell{
			padding: 1rem;
			font-size: 1.1rem;
		}
		p{
			white-space:nowrap;
		}
		.vux-cell-placeholder{
			float: left;
			white-space:nowrap;
			margin-left: 34px;
			color: #000;
		}
		.vux-cell-value{
			color: #000;
		}
		.vux-cell-value{
			float: left;
			white-space:nowrap;
			margin-left: 34px;
		}
		span{
			color: #767676 !important;
		}
		.weui-cell{
			border-bottom: 1px solid #f8f8f8;
		}
		.weui-cell__bd,.weui-cell__ft{
		    position: relative;
		    left: -15px;
		}

	}
	.restartID{
		width: 100%;
		text-align: center;
		margin-bottom: 1rem;
		img{
			width: 5%;
		}
		span{
			display: inline-block;
			font-size: 0.8rem;
			position: relative;
			top: -0.3rem;
			color: #A3A3A3;
		}
	}
	.serverinfo{
		margin: 0 auto 1rem 15px;
		img{
			width: 15px;
			position: relative;
			top: 2px;
		}
	}
	.cardbutton{
		width: 90%;
		margin: 0 auto;
	}
	.weui-dialog{
		width: 70% !important;
		max-width: 2000px !important;
		height: 60vh;
		padding:2rem;
		.dialogdiv{
			height: 60vh;
			overflow-y: scroll;
		}
		.dialogdiv::-webkit-scrollbar {
	        display: none;
	    }
	}
	#close{
		z-index: 100000 !important;
		display: inline-block;
		left: 49vw;
	}
	.cardinfozaaaaaa .vux-datetime p {
	    color: #000!important;
	}
	.cardinfozaaaaaa .vux-datetime .vux-cell-placeholder {
	    position: relative!important;
	    left: 0 !important;
	}
	/*.cardinfozaaaaaa .cardinfoz .vux-cell-value{
		margin-left: 65px;
	}*/
	.cardmanageindexcc{
			position: relative;
			top: 0;
			.weui-label{
				width: 80px !important;
			}
			.vux-x-input.disabled{
				color: #000 !important;
			}
		}
		.cardinfoz .weui-cell{
			border-bottom: none !important;
		}
		.cardinfoz .vux-cell-box:not(:first-child):before{
			border-top: none !important;
		}
		.cardmanageindexcc{
			.weui-input {
			    position: relative;
			    left: 0 !important;
			}
		}
		.cardinfoz{
			.vux-cell-placeholder{
			float: left;
			white-space:nowrap;
			margin-left: 50px;
			color: #000;
		}
		.vux-cell-value{
			color: #000;
		}
		.vux-cell-value{
			float: left;
			white-space:nowrap;
			margin-left: 50px;
		}
		}
		.changgee,.changgeee{
			.vux-cell-placeholder{
			float: left;
			white-space:nowrap;
			margin-left: 34px !important;
			color: #000;
		}
		.vux-cell-value{
			color: #000;
		}
		.vux-cell-value{
			float: left;
			white-space:nowrap;
			margin-left: 34px !important;
		}
		}
		.cardinfoaaaaaa{
			.weui-cell_access{
				.weui-cell__ft:after{
					border-color: #FFF !important;
				}
			}
		}
		.help1{
			position: absolute !important;
		}
		.youxiaoqi{
		left: ~"calc(100% - 35px)" !important;
		top: 180px;
	}
	.anquanma{
		left: ~"calc(100% - 35px)" !important;
		top: 230px;
	}
	.danbi{
		left: ~"calc(100% - 35px)" !important;
		top: 440px;
	}
	.danri{
		left: ~"calc(100% - 35px)" !important;
		top: 490px;
	}
	.cardinfoz{
		.vux-datetime{
			p{
				color: #000 !important;
			}
		}
	}
	.nonea{
		display: none;
	}
</style>