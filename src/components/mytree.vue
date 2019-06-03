<template>
  <!-- 递归树插件 -->
  <ul>
    <li v-for="element in data"
        :key="element.catalogId"
        class="tree-item">
      <Icon type="ios-arrow-forward"
            style="font-size:14px"
            v-if="element.children !== null && element.children !== undefined && element.show == false"
            @click="element.show=!element.show" />
      <Icon type="ios-arrow-down"
            style="font-size:14px"
            v-if="element.children !== null && element.children !== undefined && element.show == true"
            @click="element.show=!element.show" />
      <div class="icon"
           v-if="element.children === null || element.children === undefined" />
      <span>{{ element.title }}</span>

      <ul v-if="element.show">
        <myTree :data="element.children"></myTree>
        <!-- <li v-for="item in element.children"
            :key="item.catalogId">
          <Icon type="ios-arrow-forward"
                style="font-size:14px"
                v-if="item.children !== null && item.children !== undefined && item.show == false"
                @click="item.show=!item.show" />
          <Icon type="ios-arrow-down"
                style="font-size:14px"
                v-if="item.children !== null && item.children !== undefined && item.show == true"
                @click="item.show=!item.show" />
          <div class="icon"
               v-if="item.children === null || item.children === undefined" />
          <span>{{item.title}}</span>
          <ul v-if="item.show">
            <li v-for="item2 in item.children"
                :key="item2.catalogId">
              <Icon type="ios-arrow-forward"
                    style="font-size:14px"
                    v-if="item2.children !== null && item2.children !== undefined && item2.show == false"
                    @click="item2.show=!item2.show" />
              <Icon type="ios-arrow-down"
                    style="font-size:14px"
                    v-if="item2.children !== null && item2.children !== undefined && item2.show == true"
                    @click="item2.show=!item2.show" />
              <div class="icon"
                   v-if="item2.children === null || item2.children === undefined" />
              <span>{{item2.title}}</span></li>
          </ul>
        </li> -->
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'myTree',
  props: {
    data: {
      type: Array,
      default: [],
    }
  }
}
</script>
<style lang="less" scoped>
.tree-item {
  position: relative;
  font-size: 12px;
  // &:active {
  //   background-color: black;
  // }
  li {
    margin-left: 18px;
  }
}
.icon {
  width: 14px;
  height: 14px;
  display: inline-block;
}
</style>
