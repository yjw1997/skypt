<template>
  <div id="appdata">
    <div class="input">
      <Form ref="formInline"
            :model="formInline"
            :rules="ruleInline"
            inline
            label-position="right"
            :label-width="80">
        <FormItem prop="source"
                  label="来源：">
          <Select v-model="formInline.source"
                  style="width:200px">
            <Option v-for="item in statueData"
                    :value="item"
                    :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="theme"
                  label="主题：">
          <Select v-model="formInline.theme"
                  style="width:200px">
            <Option v-for="item in statueData"
                    :value="item"
                    :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="LayerAlias"
                  label="图层别名：">
          <Input v-model="formInline.LayerAlias"
                 placeholder="图层别名："></Input>
        </FormItem>
        <FormItem prop="time"
                  label="注册时间：">
          <DatePicker type="daterange"
                      placement="bottom-end"
                      placeholder="开始-结束"
                      v-model="formInline.time"
                      format="yyyy/MM/dd"
                      style="width: 200px"
                      @on-change="changeTime"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit(formInline)">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div class="table">
      <Table border
             :columns="columns1"
             :data="data1"></Table>
    </div>
    <div class="page">
      <Page prev-text="上一页"
            next-text="下一页"
            :total="dataCount"
            :page-size="pagesize"
            show-total
            @on-change="changePages" />
    </div>
    <Modal v-model="modal1"
           title="图源层数据"
           style="text-align:center"
           :closable="false"
           :mask-closable="false"
           width="650">
      <Tabs value="name1">
        <TabPane label="资源基本信息"
                 name="name1">
          <Owndata1 :formInline2="details"
                    :disabled="true"></Owndata1>
        </TabPane>
        <TabPane label="资源描述"
                 name="name2">
          <Owndata2 :disabled="true"
                    :formInline2="details"></Owndata2>
        </TabPane>
        <TabPane label="空间信息"
                 name="name3">
          <Owndata3 :disabled="true"
                    :formInline2="details"></Owndata3>
        </TabPane>
        <TabPane label="所有权单位"
                 name="name4">
          <Owndata4 :disabled="true"
                    :formInline2="details"></Owndata4>
        </TabPane>
        <TabPane label="其他单位信息"
                 name="name5">
          <Owndata5 :disabled="true"
                    :formInline2="details"></Owndata5>
        </TabPane>
      </Tabs>
      <div class="tc"
           slot="footer">
        <Button type="info"
                @click="modal1Change"
                v-if="checkerDetails">确定</Button>
        <Button type="default"
                @click="modal1Cancle">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Owndata1 from '../Owndata1'
import Owndata2 from '../Owndata2'
import Owndata3 from '../Owndata3'
import Owndata4 from '../Owndata4'
import Owndata5 from '../Owndata5'
import axios from 'axios'
export default {
  name: 'owndata',
  components: {
    Owndata1, Owndata2, Owndata3, Owndata4, Owndata5
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      //  数据上传表格
      this.$fetch(this.GLOBAL.serverSrc + '/data/queryDataInfo?flag=1&pageNum=' + this.pageNum + '&pageSize=' + this.pagesize).then(res => {
        console.log(res.data)
        // // 获取表格数据
        this.data1 = res.data.list
        // 获取总条数
        this.dataCount = res.data.total
      })
    },
    //  点击分页按钮
    changePages (pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.$fetch(this.GLOBAL.serverSrc + '/data/queryDataInfo?flag=1' + '&pageSize=' + this.pagesize + '+&pageNum=' + this.pageNum).then(response => {
        console.log(response.data)
        //获取分页表格数据
        this.data1 = response.data.list
        this.$Message.info('第' + pageNum + '页')
      })
    },
    // 图源层数据 审批详情 点击确定
    modal1Change () {
      if (this.details.dataTime !== undefined) {
        var d = new Date(this.details.dataTime);
        this.details.dataTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        console.log(this.details.dataTime)
        console.log(this.details)
      }
      this.$post(this.GLOBAL.serverSrc + '/data/updateResourceInfo', this.details).then(res => {
        this.$Message.success('修改成功')
        this.init()
        this.modal1 = false
        console.log(res)
      })
    },
    //图源层数据 点击取消
    modal1Cancle () {
      this.modal1 = false
    },
    //  点击搜索按钮
    handleSubmit (name) {
      console.log(name)
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      //     this.$Message.success('Success!');
      //   } else {
      //     this.$Message.error('Fail!');
      //   }
      // })
    },
    //  changeTime -- 时间改变时打印
    changeTime (value) {
      console.log(value)
      this.formInline.time = value
    },
  },
  data () {
    return {
      checkerDetails: false,//  标识符,图源层数据点击查看时为false,操作点击审批详情时为true
      pagesize: 2,
      pageNum: 1,
      dataCount: 0,
      formInline: {
        source: '',
        theme: '',
        LayerAlias: '',
        time: ''
      },
      ruleInline: {},

      statueData: [],
      modal1: false,
      details: {},
      columns1: [
        {
          title: '序号',
          key: 'id',
          align: 'center',
        },
        {
          title: '图层别名',
          key: 'otherName',
          align: 'center',
        },
        {
          title: '注册单位',
          key: 'taskCreator',
          align: 'center',
        },
        {
          title: '注册时间',
          key: 'taskCreatorTime',
          align: 'center',
        },
        {
          title: '审批状态',
          key: 'checkerStatus',
          align: 'center',
          render: (h, parmas) => {
            console.log(parmas.row.checkerStatus)
            if (parmas.row.checkerStatus == '1') {
              return h('div',
                {
                  style:
                  {
                    color: 'green',
                    'textAlign': 'center'
                  }
                }, '通过')
            } else if (parmas.row.checkerStatus == '0') {
              return h('div',
                {
                  style:
                  {
                    color: 'red',
                    'textAlign': 'center'
                  }
                }, '未通过')
            } else if (parmas.row.checkerStatus == '2') {
              return h('div',
                {
                  style:
                  {
                    color: 'green',
                    'textAlign': 'center'
                  }
                }, '待审批')
            }
          }
        },
        {
          title: '图层元数据',
          key: 'time',
          align: 'center',
          render: (h, parmas) => {
            return h('div', {
              style: {
                'text-align': 'center'
              }
            }, [
                h('a', {
                  on: {
                    click: () => {
                      this.$fetch(this.GLOBAL.serverSrc + '/data/selectByMapID?id=' + parmas.row.id).then(res => {
                        this.checkerDetails = false
                        console.log(res)
                        this.details = res.data.list[0]
                        this.modal1 = true
                      })
                    }
                  }
                }, '查看')
              ])
          }
        },
        {
          title: '操作',
          key: 'show',
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
                      this.$fetch(this.GLOBAL.serverSrc + '/data/selectByMapID?id=' + params.row.id).then(res => {
                        this.checkerDetails = true
                        this.details = res.data.list[0]
                        console.log(params.row)
                        this.modal1 = true
                      })
                    }
                  }
                }, '审批详情'),
                h('a', ' 退订')
              ])
          }
        },
        {
          title: '地图',
          key: 'map',
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
                      console.log('地图')
                    }
                  }
                }, '地图')
              ])
          }
        }
      ],
      data1: []
    }
  }
}
</script>
<style lang="less" scoped>
.ib {
  display: inline-block;
}
.input {
  margin-top: 15px;
}
.table {
  margin-top: 20px;
}
.page {
  position: absolute;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  padding: 40px 0px;
}
</style>
