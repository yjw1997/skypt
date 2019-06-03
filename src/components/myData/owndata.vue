<template>
  <div id="owndata">
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
      <Page :total="total"
            @on-change="changePage"
            :page-size="pageSize"
            show-total
            :current="1" />
    </div>
    <!-- //  点击编辑按钮 -->
    <Modal v-model="modal1"
           title="图源层数据编辑"
           style="text-align:center"
           :mask-closable="false"
           width="650">
      <Tabs value="name1">
        <TabPane label="资源基本信息"
                 name="name1">
          <Owndata1 :formInline2="editDataMsg"></Owndata1>
        </TabPane>
        <TabPane label="资源描述"
                 name="name2">
          <Owndata2 :formInline2="editDataMsg"></Owndata2>
        </TabPane>
        <TabPane label="空间信息"
                 name="name3">
          <Owndata3 :formInline2="editDataMsg"></Owndata3>
        </TabPane>
        <TabPane label="所有权单位"
                 name="name4">
          <Owndata4 :formInline2="editDataMsg"></Owndata4>
        </TabPane>
        <TabPane label="其他单位信息"
                 name="name5">
          <Owndata5 :formInline2="editDataMsg"></Owndata5>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="info"
                @click="modalOk">确定</Button>
        <Button type="primary"
                @click="modalCancle">取消</Button>
      </div>
    </Modal>
    <Modal v-model="modal2"
           title="用户详情"
           style="text-align:center"
           :closable="false"
           :mask-closable="false"
           width="850">
      <InputList :SelectData="[]"
                 :statueData="[]"
                 :str="str"></InputList>
      <Table :columns="columns2"
             :data="[]"></Table>
    </Modal>
  </div>
</template>
<script>
import Owndata1 from "../Owndata1"
import Owndata2 from "../Owndata2"
import Owndata3 from "../Owndata3"
import Owndata4 from "../Owndata4"
import Owndata5 from "../Owndata5"
import InputList from "../inputlist"
import axios from "axios"
export default {
  name: "owndata",
  components: {
    Owndata1,
    Owndata2,
    Owndata3,
    Owndata4,
    Owndata5,
    InputList
  },
  data () {
    return {
      formInline: {
        source: '',
        theme: '',
        LayerAlias: '',
        time: ''
      },
      ruleInline: {},
      pageSize: 3,
      pageNum: 1,
      modal1: false,
      modal2: false,
      statueData: [],
      total: 0,
      editData: {},
      editDataMsg: {
      },
      str: ["用户单位：", "申请状态：", "申请时间："],
      columns1: [
        {
          title: "序号",
          key: "id"
        },
        {
          title: "图层别名",
          key: "otherName"
        },
        {
          title: "注册单位",
          key: "taskCreator"
        },
        {
          title: "注册时间",
          key: "taskCreatorTime"
        },
        {
          title: "所属服务",
          key: "belongSer"
        },
        {
          title: "图层元数据",
          key: "time",
          render: (h, parmas) => {
            return h(
              "div",
              {
                style: {
                  "text-align": "left"
                }
              },
              [
                h(
                  "a",
                  {
                    on: {
                      click: () => {

                        this.$fetch(this.GLOBAL.serverSrc + '/data/selectByMapID?id=' + parmas.row.id).then(res => {
                          console.log(res.data.list[0])
                          this.editDataMsg = res.data.list[0]
                          this.modal1 = true
                        })
                      }
                    }
                  },
                  "编辑"
                )
              ]
            );
          }
        },
        {
          title: "操作",
          key: "show",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  "text-align": "left"
                }
              },
              [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        // console.log(params.row)
                        this.$Message.info('只支持点图层编辑')
                      }
                    }
                  },
                  "数据编辑"
                ),
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.modal2 = true;
                      }
                    }
                  },
                  " 用户"
                )
              ]
            );
          }
        },
        {
          title: "地图",
          key: "map",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  "text-align": "left"
                }
              },
              [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        console.log("地图");
                      }
                    }
                  },
                  "地图"
                )
              ]
            );
          }
        }
      ],
      data1: [],
      columns2: [
        {
          title: "用户名称",
          key: "name"
        },
        {
          title: "用户单位",
          key: "unit"
        },
        {
          title: "申请时间",
          key: "time"
        },
        {
          title: "申请状态",
          key: "time"
        }
      ]
    };
  },
  mounted () {
    this.getTableData()
  },
  methods: {
    getTableData () {
      // 获取我上传的数据数据列表
      this.$fetch(this.GLOBAL.serverSrc + '/data/queryDataInfo?flag=0&pageSize=' + this.pageSize + '&pageNum=' + this.pageNum).then(res => {
        console.log(res.data)
        this.data1 = res.data.list
        this.total = res.data.total
      })
    },
    // 点击分页按钮
    changePage (pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.$fetch(this.GLOBAL.serverSrc + '/data/queryDataInfo?flag=0&pageSize=' + this.pageSize + '&pageNum=' + this.pageNum).then(res => {
        console.log(res.data)
        this.data1 = res.data.list
        this.total = res.data.total
        this.$Message.info('第' + pageNum + '页')
      })
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
    //  图源层数据编辑---点击取消,确定
    modalOk () {
      var d = new Date(this.editDataMsg.dataTime);
      this.editDataMsg.dataTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      console.log(this.editDataMsg.dataTime)
      console.log(this.editDataMsg)
      this.$post(this.GLOBAL.serverSrc + '/data/updateResourceInfo', this.editDataMsg).then(res => {
        this.$Message.success('修改成功')
        this.getTableData()
        this.modal1 = false
        console.log(res)
      })
      // this.modal1 = false
    },
    modalCancle () {
      this.modal1 = false
    }

  },
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
  // bottom: -20%;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  padding: 40px 0px;
}
</style>
