<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left"
           class="demo-split-pane">
        状态：
        <Select v-model="form.checkerStatus"
                style="width:200px">
          <Option v-for="item in cityList"
                  :value="item.label"
                  :key="item.label">{{ item.value }}</Option>
        </Select>
        <div class="ib">
          目录名称：
          <Input v-model="form.name"
                 style="width:200px"
                 size="small"
                 placeholder="目录名称"
                 name="directoryName" />
          <Button size="small"
                  type="primary"
                  @click="searchName">搜索</Button>
        </div>
        <div style="float:right"
             class="ib">
          <Button type="primary"
                  @click="DirectoryRegistration">目录注册</Button>
          <Button type="error"
                  @click="getCheckedNodes">目录删除</Button>
        </div>
        <div class="ztree">
          <Tree :data="data"
                show-checkbox
                @on-select-change="SelectedNode"
                :check-strictly="true"
                ref="tree"
                @on-check-change="checkedFather"></Tree>
        </div>
      </div>
      <div slot="right"
           class="demo-split-pane">
        <Card class="card">
          <p slot="title">
            <Icon type="ios-clipboard" />
            目录元数据信息
          </p>
          <Form :model="formItem"
                :label-width="120">
            <FormItem label="目录编号：">
              <Input v-model="formItem.id"></Input>
            </FormItem>
            <FormItem label="目录代码：">
              <Input v-model="formItem.unitCode"></Input>
            </FormItem>
            <FormItem label="目录名称：">
              <Input v-model="formItem.name"></Input>
            </FormItem>
            <FormItem label="目录描述：">
              <Input v-model="formItem.description"></Input>
            </FormItem>
            <FormItem label="目录提供方：">
              <Input v-model="formItem.supplier"></Input>
            </FormItem>
            <FormItem label="元数据维护单位：">
              <Input v-model="formItem.maintain"></Input>
            </FormItem>
            <FormItem label="创建时间：">
              <Input v-model="formItem.createDate"
                     disabled></Input>
            </FormItem>
            <FormItem label="修改时间：">
              <Input v-model="formItem.updateDate"
                     disabled></Input>
            </FormItem>
            <FormItem label="目录关键字：">
              <Input v-model="formItem.keyword"></Input>
            </FormItem>
            <FormItem label="审批状态：">
              <Input v-model="formItem.checkerStatus"></Input>
            </FormItem>
          </Form>
        </Card>
      </div>
    </Split>
    <!-- //  点击目录注册按钮 -->
    <Modal v-model="dirRes"
           title="目录注册">
      <div>
        <Form :model="formDirRes"
              :label-width="120"
              :rules="ruleInline"
              :ref="formDirRes">
          <FormItem label="分类：">
            <Select v-model="formDirRes.type">
              <Option v-for="item in DirectoryType"
                      :key="item.id"
                      :value="item.id">{{item.name}} </Option>
            </Select>
          </FormItem>
          <FormItem label="上级目录：">
            <Select v-model="formDirRes.id">
              <Option v-for="item in ParentDirectory"
                      :key="item.id"
                      :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="目录名称："
                    prop="name">
            <Input v-model="formDirRes.name"></Input>
          </FormItem>
          <FormItem label="目录单位代码：">
            <Input v-model="formDirRes.unitCode"></Input>
          </FormItem>
          <FormItem label="目录描述：">
            <Input v-model="formDirRes.description"
                   type="textarea"></Input>
          </FormItem>
          <FormItem label="目录提供方：">
            <Input v-model="formDirRes.supplier"></Input>
          </FormItem>
          <FormItem label="元数据维护单位：">
            <Input v-model="formDirRes.maintain"></Input>
          </FormItem>
          <FormItem label="关键字：">
            <Input v-model="formDirRes.keyword"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary"
                @click="submit(formDirRes)">确定并提交</Button>
        <Button type="primary"
                @click="madalOk(formDirRes)">确定</Button>
        <Button type="primary"
                @click="madalCancel(formDirRes)">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'directorymanagement',
  data () {
    return {
      DirectoryType: [
        {
          id: 0,
          name: '来源目录',
        },
        {
          id: 1,
          name: '主题目录'
        },
      ],
      form: {
        checkerStatus: '',
        name: '',
      },
      ruleInline: {
        name: [
          { required: true, message: '请输入目录名称', trigger: 'blur' }
        ],
      },
      formItem: {

      },
      formDirRes: {
        type: 0,
        id: 0,
        name: '',
      },
      ParentDirectory: [{ id: 0, name: '无' }],
      split1: 0.6,
      dirRes: false,
      cityList: [
        {
          value: '全部',
          label: -1
        },
        {
          value: '已通过',
          label: 1
        },
        {
          value: '未通过',
          label: 2
        },
        {
          value: '未提交',
          label: 3
        },
        {
          value: '审批中',
          label: 0
        },
      ],
      model1: '',
      value3: '',
      data: [
        {
          title: '根目录',
          expand: true,
          children: [
            {
              title: '子节点',
              expand: true,
              children: [
                {
                  title: '1',
                  expand: true,
                },
                {
                  title: '2',
                  expand: true,
                }
              ]
            },
            {
              title: '子节点2',
              expand: true,
            }
          ],

        }
      ]
    }
  },
  mounted () {
    // 获取tree的值
    this.getTreeData()

    // this.ParentDirectory = this.data[0].children
    console.log(this.ParentDirectory)
  },
  methods: {

    // 获取tree列表的值
    getTreeData () {
      this.$fetch(this.GLOBAL.serverSrc + '/Catalog/list').then(res => {
        console.log(res)
        this.data[0].children = res.data.data
      })
    },
    //  fu节点勾选时,zi节点也全部勾选
    checkedFather (arr, index) {
      if (index.children !== undefined && index.children !== null) {
        for (var treeData of index.children) {
          if (treeData !== undefined && treeData !== null) {
            this.$set(treeData, 'checked', true)
            this.checkedFather(arr, treeData)
          }
        }
      }
    },
    // 点击搜索按钮模糊搜索
    searchName () {
      let url = this.GLOBAL.serverSrc + '/Catalog/list?'
      console.log(this.form)
      console.log(this.form.name)
      if (this.form.name !== "" && this.form.checkerStatus !== -1) url += 'catalogName=' + this.form.name + '&checkerStatus=' + this.form.checkerStatus
      if (this.form.name !== "" && this.form.checkerStatus === -1) url += 'catalogName=' + this.form.name
      if (this.form.name === "" && this.form.checkerStatus !== -1) url += 'checkerStatus=' + this.form.checkerStatus
      console.log(url)
      this.$fetch(url).then(res => {
        console.log(res)

        this.data[0].children = res.data.data
      })
    },
    // 点击目录删除按钮
    //  getCheckedNodes	-> 获取被勾选节点
    getCheckedNodes () {
      if (this.$refs.tree.getCheckedNodes().length == 0) this.$Message.info('请点击复选框选中节点')
      else {
        //  删除父节点是提示

        console.log(this.$refs.tree.getCheckedNodes())//  获取到删除的数据
        let deleteData = this.$refs.tree.getCheckedNodes()
        //  删除节点
        for (var val of deleteData) {
          this.$fetch(this.GLOBAL.serverSrc + '/Catalog/delete?ids=' + val.catalogId).then(res => {
            //  获取表格数据
            this.getTreeData()
          })
          this.$Message.success('删除成功')
        }
        // let arr = this.data[0].children //  节点数据
        // let checkedNode = this.$refs.tree.getCheckedNodes()
        // for (var val of checkedNode) {
        //   arr.splice(arr.findIndex(item => item.nodeKey === val.nodeKey), 1)
        // }
      }
    },
    //  获取上级目录
    superior () {
      //  点击注册时获取上级目录
      this.$fetch(this.GLOBAL.serverSrc + '/Catalog/SelectCatalog').then(res => {
        console.log(res.data)
        this.ParentDirectory = [{ id: 0, name: '无' }],
          this.ParentDirectory = [...this.ParentDirectory, ...res.data.data]
        console.log(this.ParentDirectory)
      })
    },
    //  点击目录注册按钮
    DirectoryRegistration () {
      this.superior()
      this.dirRes = true
    },
    //  点击树节点时触发	
    SelectedNode (node, index) {
      console.log(node, index)

      //  根据获取到点击节点信息到后台取出数据渲染
      this.$fetch(this.GLOBAL.serverSrc + '/Catalog/selectByID?id=' + index.catalogId).then(res => {
        console.log(res.data.data[0])
        this.formItem = res.data.data[0]
        if (this.formItem.checkerStatus == 1) {
          this.formItem.checkerStatus = "已通过"
        } else if (this.formItem.checkerStatus == 2) {
          this.formItem.checkerStatus = "未通过"
        } else if (this.formItem.checkerStatus == 3) {
          this.formItem.checkerStatus = "未提交"
        } else if (this.formItem.checkerStatus == 0) {
          this.formItem.checkerStatus = "审批中"
        }
      })
    },
    // 目录注册 点击确定并提交
    submit (name) {
      console.log(name)
      this.$refs[name].validate((valid) => {
        if (!valid) return this.$Message.error('请检查页面提示')
        this.formDirRes.state = '0'
        // this.formDirRes.pid = this.formDirRes.pid.toString()
        this.$post(this.GLOBAL.serverSrc + '/Catalog/doAdd', this.formDirRes).then(res => {
          this.formDirRes = {}
          console.log(res)
          this.$Message.success(res.data.msg)
          this.getTreeData()
          this.dirRes = false
        })
      })
      console.log(this.formDirRes)


    },
    // 目录注册 点击确定
    madalOk (name) {
      console.log(this.formDirRes)
      this.formDirRes.state = '1'
      this.$post(this.GLOBAL.serverSrc + '/Catalog/doAdd', this.formDirRes).then(res => {
        this.formDirRes = {}
        console.log(res)
        this.$Message.success(res.data.msg)
        this.getTreeData()
        this.dirRes = false
      })

    },
    // 目录注册 点击取消
    madalCancel (name) {
      this.dirRes = false
    },

  }
}
</script>
<style lang="less" scoped>
.demo-split {
  height: 500px;
  border: 1px solid #dcdee2;
}

.demo-split-pane {
  padding: 10px;
}

.ib {
  display: inline-block;
}
.title {
  width: 30%;
  text-align: right;
  font-weight: 700;
  line-height: 30px;
  list-style: none;
  display: inline-block;
}
.title li {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px !important;
  // .tl();
}
.cardContent {
  width: 68%;
  display: inline-block;
  list-style: none;
  line-height: 30px;
}
.cardContent li {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
