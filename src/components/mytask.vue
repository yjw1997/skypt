<template>
  <div id="mytask">
    <div id="tags">
      <router-link to="/mytask/agenttask">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='代办任务' }"
             @click="tabCur='代办任务'">代办任务</div>
      </router-link>
      <router-link to="/mytask/taskalready">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='已办任务' }"
             @click="tabCur='已办任务'">已办任务</div>
      </router-link>
    </div>
    <div id="h1111">
      <router-view></router-view>
    </div>
  </div>

</template>
<script>
export default {
  name: 'mytask',
  data () {
    return {
      tabCur: '代办任务',
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$router.push({ path: '/mytask/agenttask' })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
