<template>
  <div id="app">
    <div class="myMneu">
      <MyMenu></MyMenu>
    </div>
    <MyNav></MyNav>
    <MyTab></MyTab>
    <Infor></Infor>
  </div>
</template>

<script>
import MyNav from '../../components/myNav'
import MyMenu from '../../components/myMenu'
import MyTab from '../../components/myTab'
import Infor from '../../components/infor'

export default {
  name: 'App',
  components: {
    MyNav, MyMenu, MyTab, Infor
  },
  mounted () {
    // console.log('全局变量', this.GLOBAL)
    // let userData = this.GLOBAL;
    // console.log('access_token', JSON.parse(userData))
  }
}
</script>

<style lang="less" scoped>
#app {
  overflow: hidden;
}
.myMneu {
  display: inline-block;
  width: 15%;
  .fl();
}
</style>