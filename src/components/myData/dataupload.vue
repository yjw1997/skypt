<template>
  <div id="dataupload">
    <Button type="info"
            @click="addinfo">数据上传</Button>
    <Table border
           :columns="columns1"
           :data="data1"></Table>
    <!-- //  查看入库按钮 -->
    <Modal v-model="modal1"
           title="上传图层信息列表"
           style="text-align:center"
           :closable="false"
           :mask-closable="false"
           width='1120'>
      <Table :columns="columns2"
             :data="data2"></Table>
    </Modal>
    <!-- 数据上传按钮 -->
    <DatauploadList :modal2="modal2"></DatauploadList>
    <div class="page">
      <Page prev-text="上一页"
            next-text="下一页"
            :total="dataCount"
            :page-size="pagesize"
            show-total
            @on-change="changePages" />
    </div>
  </div>
</template>
<script>
import Data from '../../static/data.json'
import DatauploadList from "../DatauploadList"
import axios from "axios"
import { eventBus } from '../../assets/eventBus.js'
export default {
  name: 'dataupload',
  components: {
    DatauploadList
  },
  data () {
    return {
      pagesize: 3,
      pageNum: 1,
      modal1: false,
      modal2: false,
      data1: [],
      data2: [],
      dataCount: 0,
      start: 0,
      columns1: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'person'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '数据用途',
          key: 'dataPurpose'
        },
        {
          title: '数据类型',
          key: 'type'
        },
        {
          title: '上传时间',
          key: 'created'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '审评状态',
          key: 'show',
          render: (h, parmas) => {
            return h('div', {
              style: {
                'text-align': 'center'
              }
            }, [
                h('a', {
                  on: {
                    click: () => {
                      this.modal1 = true
                      console.log(parmas.row)
                      //  查看入库状态表格
                      this.$fetch(this.GLOBAL.serverSrc + '/data/selectByID?id=' + parmas.row.dataId).then(res => {
                        console.log(res)
                        this.data2 = res.data.list
                      })
                    }
                  }
                }, '查看入库状态')
              ])
          }
        },
      ],
      columns2: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '任务编号',
          key: 'taskNum'
        },
        {
          title: '图层名称',
          key: 'cname'
        },
        {
          title: '检查状态',
          key: '7'
        },
        {
          title: '检查时间',
          key: '6'
        },
        {
          title: '自动检查状态',
          key: '5'
        },
        {
          title: '自动检查时间',
          key: '4'
        },
        {
          title: '数据入库状态',
          key: '3'
        },
        {
          title: '入库时间',
          key: '2'
        },
        {
          title: '入库完成状态',
          key: '1'
        },
      ]
    }
  },
  methods: {
    msg () {
      const that = this
      eventBus.bus.$on('modalOK', function (val) {
        console.log(val)
        that.modal2 = false
      })
      eventBus.bus.$on('modalCancle', function (val) {
        that.modal2 = false
      })

    },
    //  
    addinfo () {
      this.modal2 = true
    },
    //  点击分页按钮
    changePages (pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.$fetch(this.GLOBAL.serverSrc + '/data?flag=0' + '&pageSize=' + this.pagesize + '+&pageNum=' + this.pageNum).then(response => {
        console.log(response.data)
        //获取分页表格数据
        this.data1 = response.data.list
        console.log(this.data1)
        this.$Message.info('第' + pageNum + '页')
      })
    },
    init () {
      //  数据上传表格
      this.$fetch(this.GLOBAL.serverSrc + '/data?flag=0&pageNum=' + this.pageNum + '&pageSize=' + this.pagesize).then(res => {
        console.log(res.data)
        // // 获取表格数据
        this.data1 = res.data.data.list
        // 获取总条数
        this.dataCount = res.data.total

      })
    },

  },
  mounted () {
    this.init()
    this.msg()
  }


}

</script>
<style lang="less" scoped>
.page {
  width: 100%;
  .p15();
  .tc();
}
</style>
