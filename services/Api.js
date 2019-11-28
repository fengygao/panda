import { request } from '../utils/request.js'

class Api extends request {

// 用户openId
  getOpenid(data, handle) {
    this.Post('/merchantRegist_web/wechat/getOpenId.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //判断用户登录
  login(data, handle) {
    this.Post('/merchantRegist_web/regist/getCurrentUserInfo.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //发送验证码
  getphoneCode(data, handle) {
    this.Post('/merchantRegist_web/sms/sendSmsVerify.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  // 手机号绑定
  setphone(data, handle) {
    this.Post('/merchantRegist_web/regist/userBind.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  // 日销售录入
  salesubmit(data, handle) {
    this.Post('/merchantMain_web/sale/day/add.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //经营
  management(data, handle) {
    this.Post('', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //我的
  mine(data, handle) {
    this.Post('/supp/receipt/sVipCancel', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //我的员工
  mystaff(data, handle) {
    this.Post('/merchantMain_web/merClerkInfo/getMerClerkInfoList.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })    
  }
  //员工注销
  staffdelete(data, handle) {
    this.Post('/merchantMain_web/merClerkInfo/merClerkInfoDel.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //新增员工
  addstaff(data, handle) {
    this.Post('/merchantMain_web/merClerkInfo/insertMerClerkInfo.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //日销售额判断查询
  salesreach(data, handle) {
    this.Post('/merchantMain_web/sale/day/detail.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //我的销售额列表
  saleList(data, handle) {
    this.Post('/merchantMain_web/sale/day/record.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //图片上传
  imgUpload(data, handle) {
    this.Post('/merchantMain_web/img/fileUpload.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }
  //周销售额
  weeklySales(data, handle) {
    this.Post('/merchantMain_web/sale/week.htm', data)
      .then(res => {
        handle(res)
      })
      .catch(err => {
        handle(err)
      })
  }


}
export {
  Api
}
