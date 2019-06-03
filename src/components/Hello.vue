<template>
  <div class="boxscrollbar" style="height:600px">
    <!-- 数办局页面 -->
    <Infor v-if="show"></Infor>
    <!-- 委办局页面 -->
    <Infortwo v-if="!show"></Infortwo>
  </div>
</template>

<script>
import Infor from '../components/infor'
import Infortwo from '../components/infor2'
export default {
  name: 'welcome',
  components: {
    Infor,Infortwo
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less" scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
