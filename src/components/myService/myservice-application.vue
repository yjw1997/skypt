<template>
  <div id="applicationservice">
    <div class="serviceinput">
      <InputList :SelectData="SelectData"
                 :statueData="statueData"
                 :str1="str[0]"
                 :str2="str[1]"
                 :str3="str[2]"
                 :str4="str[3]"
                 :showthis="false"
                 @listentochildevent="listentochildevent"></InputList>
    </div>
    <div class="table">
      <Table border
             :columns="columns1"
             :data="data1"></Table>
    </div>
    <div class="page">
      <Page :total="dataCount"
            :page-size="pagesize"
            show-total
            @on-change="changePages"
            :current="1" />
    </div>
    <Modal v-model="rewriteModal"
           title="服务详情预览"
           style="text-align:center;"
           :mask-closable="false"
           width="850">
      <Rewrite :rewriteModal="rewriteModal"
               :info="info"
               @cancel="cancel"
               title="元数据信息"
               :approvalData="approvalData"></Rewrite>
      <Comment :comment="comment"
               @cancelCommon="cancelCommon"></Comment>
    </Modal>
    <feedback :loading="loading"
              :modal3="modal3"
              @feedbackOk="feedbackOk"
              @feedbackCancel="feedbackCancel"
              :approvalData="approvalData"></feedback>
  </div>
</template>
<script>
import InputList from "../service-inputlist"
import Showtops from "../show-taps"
import Rewrite from "../rewrite-modal"
import Comment from "../comment"
import feedback from '../feedback-modal'
import axios from 'axios'
export default {
  name: "applicationservice",
  components: {
    InputList,
    Showtops,
    Rewrite,
    Comment,
    feedback
  },
  data () {
    return {
      pagesize: 3,
      data1: [],
      dataCount: 0,
      url: this.GLOBAL.serverSrc + '/service?flag=1&pageSize=3&pageNum=',

      showComment: false,
      info: false,
      comment: false,
      approvalData: {},
      modal1: false,
      modal3: false,
      loading: true,
      str: ["审批状态", "服务状态", "服务申请", "退订服务"],
      rewriteModal: false,
      SelectData: [
        { approvalStatusid: -1, approvalStatusname: '全部' },
        { approvalStatusid: 0, approvalStatusname: '待审批' },
        { approvalStatusid: 1, approvalStatusname: '未通过' },
        { approvalStatusid: 2, approvalStatusname: '已通过' },
      ],
      statueData: [
        { serviceStatusid: -1, serviceStatusname: '全部' },
        { serviceStatusid: 0, serviceStatusname: '停止' },
        { serviceStatusid: 1, serviceStatusname: '运行' },
      ],
      columns1: [
        {
          title: '编号',
          key: 'serId',
          align: 'center',
          width: '120PX',
          render: (h, params) => {
            return h('span', 'SV000000' + params.row.serId)
          }
        },
        {
          title: "服务名称",
          key: "serName"
        },
        {
          title: "服务别名",
          key: "serByName"
        },
        {
          title: "服务地址",
          key: "serAddress"
        },
        {
          title: "服务发布单位",
          key: "publishUnit"
        },
        {
          title: "申请时间",
          key: "serRegisterTime"
        },
        {
          title: '审批状态',
          key: 'approvalStatus',
          width: 100,
          render: (h, params) => {
            if (params.row.approvalStatus === "0") {
              return h('span', {
                style: {
                  color: '#FF7D41'
                }
              }, '待审批')
            } else if (params.row.approvalStatus === "1") {
              return h('span', {
                style: {
                  color: '#FF7D41'
                }
              }, '未通过')
            } else if (params.row.approvalStatus === "2") {
              return h('span', {
                style: {
                  color: '#28FF28'
                }
              }, '已通过')
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          fixed: "right",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      console.log(params.row.serviceId)
                      this.$fetch(this.GLOBAL.serverSrc + '/service/selectByID?id=' + params.row.serId).then(res => {
                        this.modal3 = true
                        console.log(res.data[0])
                        this.approvalData = res.data[0]
                      })
                    }
                  }
                },
                "预览"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.rewriteModal = true
                      //   this.$fetch(this.GLOBAL.serverSrc + '/service/selectByID?id=' + params.row.serId).then(res => {
                      //   this.modal3 = true
                      //   console.log(res.data[0])
                      //   this.approvalData = res.data[0]
                      // })
                      this.$fetch(this.GLOBAL.serverSrc + '/service/selectByID?id=' + params.row.serId).then(res => {
                        console.log(res.data[0])
                        this.approvalData = res.data[0]
                      })
                    }
                  }
                },
                "元数据"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.comment = true
                      this.$fetch(this.GLOBAL.serverSrc + '/service/saveComment?serviceId=18&comment=aasdf ').then(res => {
                        console.log(res)
                      })
                    }
                  }
                },
                "评论"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$post(this.GLOBAL.serverSrc + '/service/deleteServerBySerId?serId=' + params.row.serId).then(res => {
                        console.log(res)
                        this.$Message.success('退订成功')
                        this.getTableData()
                      })
                    }
                  }
                },
                "退订"
              )
            ]);
          }
        }
      ],
    };
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      this.$fetch(this.url + 1).then(response => {
        console.log(response.data)
        // 获取表格数据
        this.data1 = response.data.list
        // // 获取总条数
        this.dataCount = response.data.total
      })
    },
    // 点击分页按钮
    changePages (pageNum) {
      console.log(pageNum)
      let url = this.url + pageNum
      console.log(url)
      this.$fetch(url).then(response => {
        console.log(response.data)
        //获取分页表格数据
        this.data1 = response.data.list
        this.$Message.info('第' + pageNum + '页')
      })
    },
    // 点击搜索,由子组件接受的消息
    listentochildevent (msg) {
      let url = this.GLOBAL.serverSrc + '/service?flag=1&pageSize=3'
      if (msg.SelectDataVal != -1) url += '&approvalStatus=' + msg.SelectDataVal
      if (msg.statueDataVal != -1) url += '&serStatus=' + msg.statueDataVal
      url += '&pageNum=' + 1
      console.log(url)
      console.log(msg)
      this.$fetch(url).then(response => {
        console.log(response)
        // response = JSON.parse(response)
        console.log(response)
        // 获取表格数据
        this.data1 = response.data.list
        // // 获取总条数
        this.dataCount = response.data.total
        // // 设置每页显示条数
        this.pagesize = response.data.size
        this.url = (url).substring(0, (url).length - 1)
      })
    },
    feedbackOk (msg) {
      console.log(msg)
      this.modal3 = false
    },
    feedbackCancel (msg) {
      console.log(msg)
      this.modal3 = false
    },
    cancel (msg) {
      console.log(msg)
      this.rewriteModal = false
    },
    cancelCommon (msg) {
      console.log(msg)
      this.comment = false
    },
  }
};
</script>
<style lang="less" scoped>
.page {
  position: absolute;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  padding: 40px 0px;
}
.table {
  margin-top: 20px;
}
.serviceinput {
  margin-top: 15px;
}
</style>
