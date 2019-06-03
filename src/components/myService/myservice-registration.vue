<template>
  <div id="registrationservice">
    <div class="serviceinput">
      <InputList :SelectData="SelectData"
                 :statueData="statueData"
                 :str1="str[0]"
                 :str2="str[1]"
                 :str3="str[2]"
                 :str4="str[3]"
                 @listentochildevent="listentochildevent"
                 @addOne="addOne"></InputList>
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
    <prerview :loading="loading"
              :modal1="modal1"></prerview>
    <usermodal :loading="loading"
               :modal2="modal2"
               :SelectData="SelectData"
               :statueData="statueData"></usermodal>
    <!-- //  点击预览按钮 -->
    <feedback :loading="loading"
              :modal3="modal3"
              @feedbackOk="feedbackOk"
              @feedbackCancel="feedbackCancel"
              :approvalData="approvalData"></feedback>
    <!-- //  点击修改按钮 -->
    <Rewrite :rewriteModal="rewriteModal"
             @save="save"
             @cancel="cancel"
             :approvalData="approvalData"
             :disabled="false"></Rewrite>
  </div>
</template>
<script>
import { eventBus } from '../../assets/eventBus'
// import Tabs from '../components/show-taps'
import InputList from '../service-inputlist'
import prerview from '../preview-modal'
import usermodal from '../user-modal'
import feedback from '../feedback-modal'
import Rewrite from '../rewrite-modal'
import axios from 'axios'
export default {
  name: 'registrationservice',
  components: {
    InputList, prerview, usermodal, feedback, Rewrite
  },
  data () {
    return {

      pagesize: 3,
      data1: [],
      dataCount: 0,

      str: ['审批状态', '服务状态', '服务注册', '删除服务'],
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      loading: true,
      url: this.GLOBAL.serverSrc + '/service?flag=0&pageSize=3&pageNum=',
      rewriteModal: false,
      approvalData: {},
      SelectData: [
        { approvalStatusid: -1, approvalStatusname: '全部' },
        { approvalStatusid: '0', approvalStatusname: '待审批' },
        { approvalStatusid: '1', approvalStatusname: '未通过' },
        { approvalStatusid: '2', approvalStatusname: '已通过' },
      ],
      statueData: [
        { serviceStatusid: -1, serviceStatusname: '全部' },
        { serviceStatusid: 1, serviceStatusname: '停止' },
        { serviceStatusid: 0, serviceStatusname: '运行' },
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
          title: '服务名称',
          key: 'serName',
          width: '180PX',
          align: 'center',
        },
        {
          title: '服务别名',
          key: 'serByName',
          align: 'center',
          width: '100PX',
        },
        {
          title: '服务类型',
          key: 'serType',
          align: 'center',
          width: '100PX',
        },
        {
          title: '注册时间',
          key: 'serRegisterTime',
          width: '180PX',
          align: 'center',
        },
        {
          title: '更新时间',
          key: 'serUpdateTime',
          width: '180PX',
          align: 'center',
        },
        {
          title: '服务状态',
          key: 'serStatus',
          width: '100PX',
          align: 'center',
          render: (h, params) => {
            if (params.row.serStatus === 0) {
              return h('span', {
                style: {
                  color: '#FF7D41'
                }
              }, '运行')
            } else if (params.row.serStatus === 1) {
              return h('span', {
                style: {
                  color: '#28FF28'
                }
              }, '停止')
            }
          }
        },
        {
          title: '审核状态',
          key: 'approvalStatus',
          width: 100,
          align: 'center',
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
          title: '反注册/恢复',
          width: 120,
          key: 'change',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                'text-align': 'center'
              }
            }, [
                h('a', {
                  on: {
                    click: () => {
                      console.log(params.row)
                    }
                  }
                }, '反注册')
              ])
          }
        },
        {
          title: '运行/停止',
          key: 'change1',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                'text-align': 'center'
              }
            }, [
                h('a', {
                  on: {
                    click: () => {
                      console.log(params.row)
                    }
                  }
                }, '查看')
              ])
          }
        },
        {
          title: '原始地址',
          key: 'serOriAddress',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.row)
                    this.$fetch(this.GLOBAL.serverSrc + '/service/selectByID?id=' + params.row.serId).then(res => {
                      this.modal3 = true
                      console.log(res.data[0])
                      this.approvalData = res.data[0]
                    })
                  }
                }
              }, '预览'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal1 = true
                    this.$fetch(this.GLOBAL.serverSrc + '/service/saveFeedback?name=&unit=&tel=&date=&content=').then(res => {
                      console.log(res)
                    })
                  }
                }
              }, '反馈'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    
                    console.log(params.row)
                    this.$fetch(this.GLOBAL.serverSrc + '/service/selectByID?id=' + params.row.serId).then(res => {
                      console.log(res.data[0])
                      this.rewriteModal = true
                      this.approvalData = res.data[0]
                    })
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal2 = true
                  }
                }
              }, '用户'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    console.log(params.row)
                    this.$post(this.GLOBAL.serverSrc + '/service/deleteServerBySerId?serId=' + params.row.serId).then(res => {
                      console.log(res)
                      this.$Message.success('删除成功')
                      this.getTableData()
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],

    }
  },
  mounted () {
    var self = this
    eventBus.bus.$on('prerviewCancel', function (msg) {
      console.log(msg)
      self.modal1 = false
    }),
      eventBus.bus.$on('prerviewok', function (msg) {
        console.log(msg)
        self.modal1 = false
      }),
      eventBus.bus.$on('usermodalCancel', function (msg) {
        console.log(msg)
        self.modal2 = false
      }),
      eventBus.bus.$on('usermodalok', function (msg) {
        console.log(msg)
        self.modal2 = false
      }),
      // 预览按钮点击确定

      // 获取审批状态
      // this.getAppStatus
      // 获取服务状态

      // 获取表格数据
      this.getTableData()
  },
  methods: {
    //  注册成功刷新
    addOne (val) {
      this.getTableData()
    },
    //  获取表格数据
    getTableData () {
      this.$fetch(this.url + 1).then(response => {
        // response = JSON.parse(response)
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
      this.pageNum = pageNum
      let url = this.url + pageNum
      console.log(url)

      this.$fetch(url).then(response => {
        // response = JSON.parse(response)
        console.log(response.data)
        //获取分页表格数据
        this.data1 = response.data.list
        this.$Message.info('第' + pageNum + '页')
      })
    },
    // 点击搜索,由子组件接受的消息
    listentochildevent (msg) {
      let url = this.GLOBAL.serverSrc + '/service?flag=0&pageSize=3'
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
    save (msg) {
      console.log(msg)
      this.$post(this.GLOBAL.serverSrc + '/service/updateByID', msg).then(res => {
        console.log(res.data)
        this.$Message.success('修改成功')
        this.getTableData()
      })
      this.rewriteModal = false
    },
    cancel (msg) {
      console.log(msg)
      this.rewriteModal = false
    },

  }
}
</script>
<style lang="less" scoped>
.page {
  position: absolute;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  .p15();
  padding: 40px 0px;
}
.table {
  margin-top: 20px;
}
.serviceinput {
  margin-top: 15px;
}
</style>
