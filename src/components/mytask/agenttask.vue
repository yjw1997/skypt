<template>
  <div id="agenttask">
    <InputList :SelectData="SelectData"
               :statueData="statueData"
               :str="str"
               @listentochildevent="listentochildevent"></InputList>
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
    <Modal v-model="modal2"
           title='信息详情'
           loading="loading"
           style="text-align:center"
           :mask-closable="false"
           width='821'>
      <Tabs :approvalData="approvalData"
            :sendMsgdata="sendMsgdata"
            @sengMsg="sengMsg"></Tabs>
      <div slot="footer">
        <Button type="info"
                size="large"
                @click="modalOk">通过</Button>
        <Button type="error"
                size="large"
                @click="modalCancel">不通过</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import axios from "axios"
import InputList from '../inputlist'
import Tabs from '../tabs'
export default {
  name: 'agenttask',
  components: {
    InputList, Tabs
  },
  mounted () {
    //获取表格数据
    this.getData()
    // 获取流程类型
    this.getProcess()
  },
  methods: {
    // 审批不通过
    modalCancel () {
      // 不通过时，“审批意见”不为空,发送消息到子组件获取审批意见
      this.sendMsgdata = true
    },
    // 审批通过
    modalOk () {
      this.opinion = '通过'
      // 获取审批意见
      this.sendMsgdata = true
    },
    // 点击通过或者不通过时 爸爸叫子传一个信息审批意见 
    sengMsg (msg) {
      console.log(this.approvalDataid) // id
      console.log(msg) //审批意见
      msg = msg || '' // 如果不纯在设为字符串
      if (this.opinion == "通过") {
        this.$fetch(this.GLOBAL.serverSrc + '/task/updateByTaskNo?taskNo=' + this.approvalDataid + '&flag=0&remark=' + msg).then(res => {
          this.$Message.success('审批成功')
          this.getData()
          console.log(res)
          this.modal2 = false
          this.sendMsgdata = false
        })
      } else if (this.opinion == "不通过") {
        // 审批不通过没有写建议
        if (msg == '') {
          this.$Message.error('请输入审批意见')
          this.sendMsgdata = false
        } else {
          // 审批不通过且已经写完建议
          this.$fetch(this.GLOBAL.serverSrc + '/task/updateByTaskNo?taskNo=' + this.approvalDataid + '&flag=1&remark=' + msg).then(res => {
            console.log(res)
            this.$Message.info('审批成功')
            this.getData()
            this.modal2 = false
            this.sendMsgdata = false
          })
        }
      }
    },

    //获取表格数据
    getData () {

      console.log('全局变量', this.check)
      console.log(this.url)
      let url = this.GLOBAL.serverSrc + "/task?flag=0&pageSize=" + this.pagesize + '&pageNum=' + this.pageNum
      this.$fetch(url)
        .then((response) => {
          console.log(response)
          //   // 获取表格数据
          this.data1 = response.data.list
          // 获取总条数
          this.dataCount = response.data.total
        })
      // this.$fetch(url).then(response => {
      //   console.log(response.data)
      //   // 获取表格数据
      //   this.data1 = response.data.list
      //   // 获取总条数
      //   this.dataCount = response.data.total
      // })
    },
    // 获取流程类型和单位名称
    getProcess () {
      this.$fetch(this.GLOBAL.serverSrc + '/task/getQueryList?flag=0').then(response => {
        console.log(response.data)
        // // 获取申请单位数据
        // let newSelectData = []
        // // 获取流程数据
        // let newStatueData = []
        // for (let val of response.data) {
        //   newSelectData.push(val.publishUnit)
        //   delete val.publishUnit
        //   newStatueData.push(val)
        // }
        // console.log(newStatueData)
        // //  对象数组去重
        // const applyType = 'applyType'
        // const r = newStatueData.reduce((all, next) => all.some((atom) => atom[applyType] == next[applyType]) ? all : [...all, next], [])
        // this.SelectData = Array.from(new Set(newSelectData))
        // this.statueData = r
        // // this.statueData = Array.from()
        // console.log(r)
        // 获取申请单位数据
        this.SelectData = []
        // 获取流程数据
        this.statueData = []
        for (let val of response.data) {
          this.SelectData.push(val.unitName)
          this.statueData.push(val.process)
        }
        this.SelectData = Array.from(new Set(this.SelectData))
        this.statueData = Array.from(new Set(this.statueData))
        console.log(this.SelectData)
        console.log(this.statueData)
      })
    },
    // 点击搜索按钮由inputlist子组件传递过来的消息
    listentochildevent (data) {
      console.log(data)
      this.url = this.GLOBAL.serverSrc + "/task?flag=0&pageSize=" + this.pagesize
      // if(data.unit)
      console.log(this.url)
      if (!Object.is(data.unit)) this.url += ('&unitName=' + data.unit)
      if (!Object.is(data.Process)) this.url += '&process=' + data.Process
      if (!Object.is(data.starTime)) this.url += '&satrtTime=' + data.starTime
      if (!Object.is(data.endTime)) this.url += '&endTime=' + data.endTime
      this.url += '&pageNum=1'
      // this.applyUnint = data.unit
      // this.applyType = data.Process
      // this.startTime = data.starTime
      // this.endTime = data.endTime
      // this.url = '/api/task?flag=0&pageSize=' + this.pagesize + '&flag=0&unitName	=' + data.unit + '&process	=' + data.Process + '&satrtTime=' + data.starTime + '&endTime=' + data.endTime + '&pageNum=1'
      console.log(this.url)
      this.$fetch(this.url).then(response => {
        this.search = true
        console.log(response)
        // 获取表格数据
        this.data1 = response.data.list
        // 获取总条数
        this.dataCount = response.data.total
        this.pageNum = 1
      })
    },
    // 点击分页按钮
    changePages (pageNum) {
      this.pageNum = pageNum
    },
    //  分页发送axios
    changePagesUrl (pageNum) {
      console.log(this.url)
      this.$fetch(this.url).then(response => {
        console.log(response.data)
        //获取分页表格数据
        this.data1 = response.data.list || response.data.data.list

        this.$Message.info('第' + pageNum + '页')
      })
    },
  },
  data () {
    return {
      opinion: '不通过',
      // 搜索分页条件
      applyUnint: null,
      applyType: null,
      startTime: null,
      endTime: null,
      pagesize: 3,
      dataCount: 0,
      pageNum: 1,
      search: false,
      url: this.GLOBAL.serverSrc + "/task?flag=0&pageSize=",
      // 子组件发送审批意见
      sendMsgdata: false,
      modal2: false,
      str: ['申请单位', '流程', '申请时间'],
      SelectData: [],
      statueData: [],
      approvalData: {},
      approvalDataid: 0,
      columns1: [
        {
          title: '序号',
          key: 'id',
          align: 'left',
        },
        {
          title: '申请单位',
          key: 'taskCreator',
          align: 'left',
        },
        {
          title: '当前节点',
          key: 'taskStatus',
          align: 'left',
          render: (h, params) => {
            if (params.row.taskStatus == "0") {
              return h('div', {
                style: {
                  'text-align': 'left',
                  'color': 'green'
                }
              }, '数据拥有着审批')
            } else if (params.row.taskStatus == "1") {
              return h('div', {
                style: {
                  'text-align': 'left',
                  'color': 'red'
                }
              }, '结束')
            }
          }
        },
        {
          title: '流程',
          key: 'taskName',
          align: 'left',
          // render: (h,params) => {
          //   if (params.row.applyType === 10001) {
          //     return h('div', '账号注册')
          //   } else if (params.row.applyType === 10002) {
          //     return h('div', '数据目录新建')
          //   } else if (params.row.applyType === 10003) {
          //     return h('div', '空间数据上传')
          //   } else if (params.row.applyType ===  10004) {
          //     return h('div', '数据申请')
          //   } else if (params.row.applyType ===  10004) {
          //     return h('div', '数据申请')
          //   }
          // }
        },
        {
          title: '申请时间',
          key: 'taskCreatorTime',
          align: 'left',
        },
        {
          title: '操作',
          key: 'show',
          align: 'left',
          render: (h, params) => {
            return h('div', {
              style: {
                'text-align': 'center'
              }
            }, [
                h('a', {
                  on: {
                    click: () => {
                      this.$fetch(this.GLOBAL.serverSrc + '/task/selectByTaskNo?taskNo=' + params.row.taskNo + '&process=' + params.row.taskName).then(res => {
                        console.log(res)
                        this.approvalDataid = params.row.taskNo
                        this.approvalData = res.data[0]
                        this.modal2 = true
                      })
                    }
                  }
                }, '审批')
              ])
          }
        },
      ],
      data1: []
    }
  },
  watch: {
    pagesize (val) {
      this.url = this.GLOBAL.serverSrc + "/task?flag=0&pageSize=" + val + '&pageNum=' + this.pageNum
    },
    pageNum (val) {
      console.log(val)
      if (!this.search) { this.url = this.GLOBAL.serverSrc + "/task?flag=0&pageSize=" + this.pagesize + '&pageNum=' + val }
      else {
        this.url = (this.url).substring(0, (this.url).length - 1)
        this.url += val
      }
      this.changePagesUrl(val)
    },
  }
}
</script>
<style lang="less" scoped>
.page {
  position: absolute;
  left: 50%;
  margin-left: -200px;
  .tc();
  padding: 40px 0px;
}
.table {
  margin-top: 20px;
}
</style>
