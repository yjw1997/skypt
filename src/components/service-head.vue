<template>
  <div id="myservice">
    <div id="tags">
      <router-link to="/myservice/registrationservice">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='我注册的服务' }"
             @click="tabCur='我注册的服务'">我注册的服务</div>
      </router-link>
      <router-link to="/myservice/applicationservice">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='我申请的服务' }"
             @click="tabCur='我申请的服务'">我申请的服务</div>
      </router-link>
      <router-link to="/myservice/gimsservice">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='GIMS服务' }"
             @click="tabCur='GIMS服务'">GIMS服务</div>
      </router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>

</template>
<script>
export default {
  name: 'myservice',
  data () {
    return {
      tabCur: '我注册的服务'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$router.push({ path: '/myservice/registrationservice' })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
