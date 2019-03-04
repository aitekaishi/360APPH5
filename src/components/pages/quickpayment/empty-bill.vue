<template>
	<div class="emptybillaaa" style="height: 100vh;">
		<div class="index">
			<x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">历史账单</x-header>
		</div>
		<div class="emptybill">
    		<img src="../../../assets/zhanwushuju.png" alt="历史账单" /><br /><br />
    		<p>暂无账单哦~</p>
		</div>
		<div style="height: 200px;background: #F8F8F8;"></div>
  </div>
</template>

<script>
	import {XHeader} from 'vux'
	import api from '../../../components/other/api-url'
  	import globalPM from '../../../components/other/global-parameter'
 	import axios from 'axios'
  	import Cookies from 'js-cookie'
	import router from '../../../router/index'
	import common from '../../../components/other/common'
	export default {
		components: {XHeader},
		data (){ 
			return {}
		},
		methods:{
			back(){
				router.push('/QpayIndex')
			}
		}
	}
</script>

<style lang="less">
	@import url("less/x-header.less");
	@import url("../../../assets/main.less");
	@import url("../../../assets/update.less");
	.emptybill{
		margin-top: 8rem;
		text-align: center;
		background: #F8F8F8;
		img{
			width: 50%;
		}
	}
	p{
		color: #7F7F7F;
	}
</style>
				