<template>
  <div>
    <div id="head">
      <div class="border border-right">
        <div class="iview-logo">
          <img
            src="http://www.skylineglobe.cn/images/cbjz.jpg"
            width="100%"
            height="100%"
            class="iview-nav-img"
          >
        </div>
        <div class="head-padding">李磊</div>
      </div>
      <div class="head-padding">欢迎登录后台管理系统！</div>
      <div class="time">当前时间：2018-11-27 14:29:25</div>
    </div>
    <div class="table">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          <span style="font-size: 17px;">我的申请</span>
        </p>
        <Application></Application>
      </Card>
    </div>
    <div class="myinfo">
      <Card>
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          <span style="font-size: 17px;">相关信息</span>
        </p>
        <Myinfor></Myinfor>

      </Card>
    </div>
  </div>
</template>
<script>
import Application from '../components/application'
import Myinfor from '../components/infor2-myinfor'
export default {
  name: 'infor2',
  components: {
    Application,Myinfor
  }
}
</script>
<style lang = "less" scoped>
#head {
  .shadow();
  padding: 40px 30px;
  .tc();
  position: relative;
}
.border {
  .ib();
}
.iview-logo {
  @w: 75px;
  width: @w;
  height: @w;
  border-radius: @w / 2;
  .ib();
  overflow: hidden;
  vertical-align: middle;
}
.head-padding {
  .ib();
  font-size: 20px;
  font-weight: 700;
  padding: 0px 20px;
}
.time {
  font-size: 15px;
  color: burlywood;
  .ib();
  .fl();
  position: absolute;
  top: 0;
  left: 0;
}
</style>

