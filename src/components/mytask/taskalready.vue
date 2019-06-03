<template>
  <div id="taskalready">
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
    <Modal v-model="modal1"
           draggable
           scrollable
           closable
           title="服务申请详情">
      <ul class="ib tr">
        <li>申请单位：</li>
        <li>经办人：</li>
        <li>应用系统名称：</li>
        <li>应用系统描述：</li>
        <li>需求描述：</li>

      </ul>
      <ul class="ib tl">
        <li>www.baidu.com</li>
        <li>www.baidu.com</li>
        <li>www.baidu.com</li>
        <li>www.baidu.com</li>
        <li>www.baidu.com</li>

      </ul>
      <div slot="footer">

      </div>
    </Modal>
    <Modal v-model="modal2"
           title='信息详情'
           loading="loading"
           style="text-align:center"
           :closable="false"
           :mask-closable="false"
           width='821'>
      <Tags :approvalData="approvalData"></Tags>
      <div slot="footer">
        <Button type="info"
                size="large"
                @click="modalOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import InputList from '../inputlist'
import axios from 'axios'
import Tags from '../tags'
export default {
  name: 'taskalready',
  components: {
    InputList, Tags
  },
  data () {
    return {
      // 搜索分页条件
      applyUnint: null,
      applyType: null,
      startTime: null,
      endTime: null,
      url: this.GLOBAL.serverSrc + '/task?flag=1&pageSize=',
      pagesize: 3,
      dataCount: 0,
      pageNum: 1,
      search: false,
      modal1: false,
      modal2: false,
      approvalData: {},
      str: ['申请单位', '流程', '审批时间'],
      SelectData: [],
      statueData: [],
      columns1: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '申请单位',
          key: 'taskCreator'
        },
        {
          title: '当前节点',
          key: 'taskStatus',
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
          key: 'taskName'
        },
        {
          title: '状态',
          key: 'checkerStatus',
          render: (h, params) => {
            if (params.row.checkerStatus == "1") {
              return h('div', {
                style: {
                  'text-align': 'left',
                  'color': 'green'
                }
              }, "通过")
            } else if (params.row.checkerStatus == "2") {
              return h('div', {
                style: {
                  'text-align': 'left',
                  'color': 'red'
                }
              }, "未通过")
            }
          }
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '审批时间',
          key: 'taskCreatorTime',
        },
        {
          title: '详情',
          key: 'show',
          render: (h, params) => {
            return h('div', {
              style: {
                'text-align': 'left'
              }
            }, [
                h('a', {
                  on: {
                    click: () => {
                      console.log(params.row)
                      // 判断状态出现对应的界面
                      if (params.row.checkerStatus == '1') { //  通过
                        this.$fetch(this.GLOBAL.serverSrc + '/task/selectByTaskNo?taskNo=' + params.row.taskNo + '&process=' + params.row.taskName).then(res => {
                          console.log(res)
                          this.modal1 = true
                          this.approvalData = res.data[0]
                        })
                      } else if (params.row.checkerStatus == '2') { //  未通过
                        this.$fetch(this.GLOBAL.serverSrc + '/task/selectByTaskNo?taskNo=' + params.row.taskNo + '&process=' + params.row.taskName).then(res => {
                          console.log(res)
                          this.modal2 = true
                          this.approvalData = res.data[0]
                        })
                      }
                    }
                  }
                }, '查看')
              ])
          }
        },
      ],
      data1: [],
    }
  },
  mounted () {
    //获取表格数据
    this.getData()
    // 获取流程类型
    this.getProcess()
  },
  methods: {
    getData () {
      console.log('全局变量', this.check)
      let url = this.GLOBAL.serverSrc + "/task?flag=1&pageSize=" + this.pagesize + '&pageNum=' + this.pageNum
      console.log(url)
      this.$fetch(url).then(response => {
        console.log(response.data)
        // 获取表格数据
        this.data1 = response.data.list
        // 获取总条数
        this.dataCount = response.data.total
      })
    },
    // 获取流程类型和单位名称
    getProcess () {
      this.$fetch(this.GLOBAL.serverSrc + '/task/getQueryList?flag=1').then(response => {
        console.log(response)
        // // 获取申请单位数据
        // let newSelectData = []
        // // 获取流程数据
        // let newStatueData = []
        // for (let val of response.data) {
        //   newSelectData.push(val.publishUnit)
        //   delete val.publishUnit
        //   newStatueData.push(val)
        // }
        // // console.log(newStatueData)
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
      this.url = this.GLOBAL.serverSrc + '/task?flag=1&pageSize=' + this.pagesize
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
      // this.url = this.GLOBAL.serverSrc+'/task?flag=0&pageSize=' + this.pagesize + '&flag=0&unitName	=' + data.unit + '&process	=' + data.Process + '&satrtTime=' + data.starTime + '&endTime=' + data.endTime + '&pageNum=1'
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
    modalOk () {
      this.modal2 = false
      this.modal1 = false
    },
  },
  watch: {
    pagesize (val) {
      this.url = this.GLOBAL.serverSrc + '/task?flag=1&pageSize=' + val + '&pageNum=' + this.pageNum
    },
    pageNum (val) {
      console.log(val)
      if (!this.search) { this.url = this.GLOBAL.serverSrc + '/task?flag=1&pageSize=' + this.pagesize + '&pageNum=' + val }
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
  text-align: center;
  padding: 40px 0px;
}
.table {
  margin-top: 20px;
}
li {
  list-style: none;
  font-size: 15px;
  font-weight: 700;
}
</style>
