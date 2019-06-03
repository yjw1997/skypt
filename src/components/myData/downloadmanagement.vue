<template>
  <div id="downloadmanagement">
    <div class="input">
      <InputList :SelectData="[]"
                 :statueData="[]"
                 :str="str"
                 @listentochildevent="listentochildevent"></InputList>
    </div>
    <div class="content">
      <Card class="card"
            v-for="item in data1"
            :key="item.id">
        <p slot="title">
          <Icon type="ios-clipboard" />{{item.mapOthername}}
        </p>
        <div slot="extra">
          <!-- //  点击删除按钮 -->
          <Button size="large"
                  icon="md-close"
                  type="error"
                  shape="circle"
                  @click="detailData(item.id)"></Button>
          <!-- //  点击下载按钮 -->
          <Button size="large"
                  icon="md-arrow-round-down"
                  type="primary"
                  shape="circle"
                  @click="downData(item.id)"></Button>
        </div>
        <ul class="title">
          <li>申请字段：</li>
          <li>申请时间：</li>
          <li>审批时间：</li>
          <li>审批状态：</li>
          <li>审批人：</li>
          <li>审批意见：</li>
        </ul>
        <ul class="cardContent">
          <li>{{item.field == null|| '' ? '无': item.field }}</li>
          <li>{{item.taskCreatorTime }}</li>
          <li>{{ item.checkerTime == null|| '' ? '无': item.checkerTime }}</li>
          <li>{{item.checkerStatus == 1? '通过': '不通过'}}</li>
          <li>{{item.checker == null|| '' ? '无': item.checker }}</li>
          <li>{{item.remark.length === 0 ? '无': item.remark}}</li>
        </ul>
      </Card>
    </div>
    <div class="page">
      <Page prev-text="上一页"
            next-text="下一页"
            :total="dataCount"
            :page-size="pageSize"
            show-total
            @on-change="changePages" />
    </div>
  </div>
</template>
<script>
import InputList from "../inputlist";
export default {
  name: "downloadmanagement",
  components: {
    InputList
  },
  data () {
    return {
      pageSize: 1,
      dataCount: 0,
      pageNum: 1,
      split3: 0.5,
      split4: 0.5,
      str: ["名称", "审批状态", "申请时间"],
      data1: [],
    }
  },
  mounted () {
    //  获取初始化像是数据
    this.$fetch(this.GLOBAL.serverSrc + '/data/selectByType?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum).then(res => {
      console.log(res)
      this.data1 = res.data.list
      this.dataCount = res.data.total
    })
  },
  methods: {
    //  点击分页按钮
    changePages (pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.$fetch(this.GLOBAL.serverSrc + '/data/selectByType?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum).then(response => {
        console.log(response.data)
        //获取分页数据
        this.data1 = response.data.list
        this.$Message.info('第' + pageNum + '页')
      })
    },
    //  点击下载按钮
    downData (id) {
      console.log(id)
    },
    //  点击删除按钮
    detailData (id) {
      console.log(id)
    },
    //  點擊搜索由子组件传递回来的消息
    listentochildevent(msg){
      console.log(msg)
      let url = this.GLOBAL.serverSrc + '/data/selectByType?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum
      if (msg.unit !== undefined) url += '&mapName=' + msg.unit
      if (msg.Process !== undefined) url += '&status=' + msg.Process
      if (msg.starTime !== undefined) url += '&satrtTime=' + msg.starTime
      if (msg.endTime !== undefined) url += '&endTime=' + msg.endTime
      this.$fetch(url).then(response => {
        console.log(response.data)
        //获取分页数据
        this.data1 = response.data.list
        this.dataCount = response.data.total
        this.pageNum=1
      })
    }
  }
};
</script>
<style lang="less" scoped>
.demo-split {
  height: 300px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.demo-split-pane.no-padding {
  height: 200px;
  padding: 0;
}
.content {
  margin-top: 20px;
}
.page {
  position: absolute;
  bottom: -40px;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  padding: 40px 0px;
}
.card {
  width: 25%;
  display: inline-block;
  height: 220px;
  margin: 15px 3%;
}
ul {
  line-height: 20px;
  list-style: none;
  display: inline-block;
}
.title {
  width: 25%;
  text-align: right;
  font-weight: 700;
  display: inline-block;
  font-size: 15px !important;
  .tl();
}
.title li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cardContent {
  width: 70%;
  display: inline-block;
  .fr();
}
.cardContent li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
