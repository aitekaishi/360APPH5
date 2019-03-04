<template>
  <div class="carindex" style="height: 100vh;">
    <x-header :left-options="{showBack: true,backText: ''}">添加车辆</x-header>
    <toast v-model="toastStatus" type="text" time=3000>{{toastMsg}}</toast>
    <group>
      <x-input title="车牌号" @input="changeDisabled" v-model="carNumber" :min="6" placeholder="请输入您的车牌号码"></x-input>
      <x-input title="车架号" @input="changeDisabled" v-model="carCode" :min="6" placeholder="请至少输入车架号后6位"></x-input>
      <x-input title="发动机号" @input="changeDisabled" v-model="carDriveNumber" :min="6"
               placeholder="请至少输入发动机号后6位"></x-input>
      <x-input title="车主姓名" @input="changeDisabled" v-model="carUser" :min="2" placeholder="请输入车主姓名"></x-input>
      <selector placeholder="请选择车辆类型" v-model="carType" title="车辆类型" name="district" :options="carList"
                @on-change="changeDisabled"></selector>
    </group>
    <p class="file-name" v-show="fileName.length > 0">已选择的图片：{{fileName}}</p>
    <a href="javascript:;" class="a-upload">
      <input type="file" name="" id="carDriveCard" @change="onFileChange">上传驾照图片
    </a>
    <div style="padding:30px 15px;">
      <x-button @click.native="addCar" type="primary" :disabled="btnDisabled">保存车辆</x-button>
    </div>
  </div>
</template>
<script>
  import {ViewBox, XHeader, Group, XInput, Cell, XButton, Selector, Toast} from 'vux'
  import api from '../../components/other/api-url'
  import globalPM from '../../components/other/global-parameter'
  import Cookies from 'js-cookie'
  import axios from 'axios'
  export default {
    components: {ViewBox, XHeader, Group, XInput, Cell, XButton, Selector, Toast},
    data () {
      return {
        carNumber: '',
        carCode: '',
        carDriveNumber: '',
        carUser: '',
        carType: '',
        carList: [
          {key: '小型轿车', value: '小型轿车'},
          {key: '大型客车', value: '大型客车'},
          {key: '索引火车', value: '索引火车'},
          {key: '中型客车', value: '中型客车'},
          {key: '大型货车', value: '大型货车'}
        ],
        fileList: [],
        btnDisabled: true,
        fileName: '',
        toastStatus: false,
        toastMsg: '',
      }
    },
    methods: {
      changeDisabled () {
        if (this.carNumber.length > 0 && this.carCode.length > 0 && this.carDriveNumber.length > 0 && this.carUser.length > 0 && this.carType.length > 0) {
          this.btnDisabled = false
        } else {
          this.btnDisabled = true
        }
      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files;
        this.fileName = files[0].name
      },
      addCar () {
        let _this = this
        let formData = new FormData()
        let imagefile = document.querySelector('#carDriveCard')
        formData.append('carNumber', this.carNumber)
        formData.append('carCode', this.carCode)
        formData.append('carDriveNumber', this.carDriveNumber)
        formData.append('carUser', this.carUser)
        formData.append('carType', this.carType)
        formData.append('drivingImg', imagefile.files[0])
				console.log(formData.get('drivingImg'))
        axios.post(api + '/user/addCar?' + '&uid=' + localStorage.getItem('uid') + '&token=' + localStorage.getItem('token') + '&valid=0' + globalPM,formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (res) {
          _this.toastStatus = true
          _this.toastMsg = res.msg
        })
        _this.a = formData.get('drivingImg').name
      }
    },
    computer: {}
  }
</script>

<style lang="less">
	
  .file-name {
    padding: 1rem;
    padding-bottom: 0;
    text-align: center;
    color: #888;
  }

  .a-upload {
    padding: 6px 10px;
    margin: 1rem;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #666;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: block;
    *display: block;
    text-align: center;
    *zoom: 1
  }

  .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }

  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
  }
</style>
