<template>
  <div id="mydata">
    <div id="tags">
      <router-link to="/mydata/owndata">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='我上传的数据' }"
             @click="tabCur='我上传的数据'">我上传的数据</div>
      </router-link>
      <router-link to="/mydata/appdata">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='我申请的数据' }"
             @click="tabCur='我申请的数据'">我申请的数据</div>
      </router-link>
      <router-link to="/mydata/downloadmanagement">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='下载管理' }"
             @click="tabCur='下载管理'">下载管理 </div>
      </router-link>
      <router-link to="/mydata/directorymanagement">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='目录管理' }"
             @click="tabCur='目录管理'">目录管理 </div>
      </router-link>
      <router-link to="/mydata/dataconf">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='数据配置' }"
             @click="tabCur='数据配置'">数据配置 </div>
      </router-link>
      <router-link to="/mydata/dataupload">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='数据上传' }"
             @click="tabCur='数据上传'">数据上传 </div>
      </router-link>
      <router-link to="/mydata/placeNameAddress">
        <div class="tag"
             :class="{ 'tag-active': tabCur=='地名地址' }"
             @click="tabCur='地名地址'">地名地址 </div>
      </router-link>

    </div>
    <div id="h1111">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mydata',
  data () {
    return {
      tabCur: '数据配置',
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$router.push({ path: '/mydata/dataconf' })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
