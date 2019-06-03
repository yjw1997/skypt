<template>
  <div id="news">
    <div id="tags">
      <router-link to="/Newsmanagement/release">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='发布管理' }"
             @click="tabCur='发布管理'">发布管理 </div>
      </router-link>
      <router-link to="/Newsmanagement/demonstration">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='示范应用管理' }"
             @click="tabCur='示范应用管理'">示范应用管理</div>
      </router-link>
      <router-link to="/Newsmanagement/shuffling">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='轮播管理' }"
             @click="tabCur='轮播管理'">轮播管理 </div>
      </router-link>
      <router-link to="/Newsmanagement/column">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='栏目管理' }"
             @click="tabCur='栏目管理'">栏目管理 </div>
      </router-link>
      <router-link to="/Newsmanagement/basic">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='基本设置' }"
             @click="tabCur='基本设置'">基本设置 </div>
      </router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>

</template>
<script>
export default {
  name: 'news',
  data () {
    return {
      tabCur: '发布管理'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$router.push({ path: '/Newsmanagement/release' })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
