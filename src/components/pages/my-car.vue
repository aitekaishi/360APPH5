<template>
  <div class="mycarindex" style="width:100vw;height: 100vh;text-align: center;overflow-x: hidden;">
    <toast v-model="toastStatus" type="text" time=3000>{{toastMsg}}</toast>
    <confirm v-model="show"
             title="你确定要删除这辆车？"
             @on-confirm="delCarConfirm">
      <p style="text-align:center;">你确定要删除这辆车？</p>
    </confirm>
    <x-header :left-options="{showBack: true,backText: '',preventGoBack:true}" @on-click-back="back">我的车辆
      <router-link slot="right" to="/addcar" v-if="isLogin"><img style="width: 20px;" src="./svg/add.svg"/></router-link>
    </x-header>
    <div v-if="isLogin">
      <card :header="{title: item.carNumber}" @on-click-footer="delCarBefore(item.carId, item.carDriving)"
            :footer="{title: '删除'}" v-for="item in carInfo" :key="item.carId">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{item.violFraction}}</span>
            <br/>
            违章扣分
          </div>
          <div class="vux-1px-r">
            <span>{{item.violCount}}</span>
            <br/>
            违章罚款
          </div>
        </div>
      </card>

      <div class="footer-info" v-if="carInfo.length === 0">
        <p>暂无车辆，点击右上角添加车辆</p>
      </div>
    </div>
    <div v-else>
      <div class="footer-info">
        <p>请先登录，才能查看到您的车辆信息</p>
      </div>
    </div>

  </div>
</template>

<script>
  import {ViewBox, XHeader, Divider, Card, Toast, Confirm} from 'vux'
  import api from '../../components/other/api-url'
  import globalPM from '../../components/other/global-parameter'
  import axios from 'axios'
  import Cookies from 'js-cookie'
  import router from '../../router/index'
  export default {
    components: {ViewBox, XHeader, Divider, Card, Toast, Confirm},
    data () {
      return {
        mobileNumber: '',
        password: '',
        btnDisabled: true,
        carInfo: [],
        delCarStatus: false,
        isLogin: false,
        toastStatus: false,
        toastMsg: '',
        show: false,
        delCarId: '',
        delCarDriving: ''
      }
    },
    created () {
      let _this = this
      if (localStorage.getItem('token') !== undefined) {
        if (localStorage.getItem('token').length > 0 && localStorage.getItem('uid').length > 0) {
          _this.getCarList()
          _this.isLogin = true
        } else {
          _this.isLogin = false
        }
      }
    },
    methods: {
      getCarList () {
        let _this = this
        axios.get(api + '/user/getMyCar?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (response) {
          if (response.data.code === 0) {
          	console.log(response.data.data)
            _this.carInfo = response.data.data
          }
        }).catch(function () {
        })
      },
      delCarBefore (carId, CarDriving) {
        this.show = true
        this.delCarId = carId
        this.delCarDriving = CarDriving
      },
      delCarConfirm () {
        let _this = this
        axios.post(api + '/user/delCar?id=' + this.delCarId + '&carDriving=' + this.delCarDriving + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM).then(function (response) {
          console.log(response)
          if (response.data.code === 0) {
            _this.toastStatus = true
            _this.toastMsg = response.msg
            _this.getCarList()
          }
        }).catch(function () {

        })
      },
      back(){
      	router.push('/my')
      }
    }
  }
</script>

<style lang="less">
	@import url("../../assets/main.less");
	@import url("../../assets/update.less");
  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    font-size: 12px;
    padding-left: 1rem;
  }

  .card-demo-flex span {
    color: #f74c31;
  }

  .weui-panel__hd {
    font-size: 18px !important;
    font-weight: bold;
  }

  .footer-info p {
    color: #888;
    font-size: .8rem;
    text-align: center;
    padding: 4rem;
  }
</style>
