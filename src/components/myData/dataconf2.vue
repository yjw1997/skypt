<template>
  <div class="demo-split">
    <Split v-model="split3">
      <div slot="left"
           class="demo-split-pane no-padding">
        <Split v-model="split4">
          <div slot="left"
               class="demo-split-pane">
            <Card class="card">
              <p slot="title">
                <Icon type="ios-clipboard" />
                数据库数据目录
              </p>
              <div>
                <Input search
                       placeholder=""
                       style="width:200px"
                       @on-search="searchDataDirectory" />
                <Button type="primary"
                        shape="circle"
                        class="fr"
                        icon="md-sync"
                        @on-click="refresh"></Button>
              </div>

              <!-- //  拖拽 -->
              <!--列表1-->
              <div id="dragArea1">
                <div v-for="element in list1"
                     :class="{'list-group-item': element.type !== '3' && element.type != show,'listLast': element.type == '3' || element.type == show}"
                     :key="element.name"
                     :kid="element.id"
                     :name="element.name"
                     @mousedown="drag">
                  {{ element.name }}{{element.Classification}}
                  <!-- {{'我是'+element.type}} -->
                </div>
              </div>

            </Card>
          </div>
          <div slot="right"
               class="demo-split-pane">
            <Card class="card">
              <p slot="title">
                <Icon type="ios-clipboard" />
                数据来源目录
              </p>
              <div>
                <div>
                  <Input search
                         style="width:45%"
                         @on-search="searchSourceDirectory" />
                  <Select style="width:45%"
                          v-model="show"
                          placeholder="操作">
                    <Option v-for="item in SelectData"
                            :value="item.id"
                            :key="item.id">{{ item.value }}</Option>
                  </Select>
                </div>
                <div class="tree">
                  <!-- <Tree :data="data2"
                        show-checkbox></Tree> -->

                  <!--列表2-->

                  <Tree :data="list2"
                        :check-strictly='false'></Tree>
                  <!-- //  递归组件,自定义多级树 -->
                  <MyTree :data="list2"></MyTree>

                </div>
              </div>
            </Card>
          </div>
        </Split>
      </div>
      <div slot="right"
           class="demo-split-pane">
        <DataInf></DataInf>

      </div>
    </Split>

    <Modal v-model="parendShow"
           title="单击节点名选择你要插入的节点位置">
      <Tree :data="list2"
            :multiple="false"
            :check-strictly='false'
            @on-select-change="showNodeData"></Tree>
      <div slot="footer">
        <Button type="primary"
                @click="ok">确定</Button>
        <Button type="default"
                @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import DataInf from '../datainf'
import MyTree from '../mytree'
import draggable from 'vuedraggable'
export default {
  display: "Clone",
  order: 2,
  name: 'dataconf',
  components: {
    DataInf, draggable, MyTree
  },
  data () {
    return {
      x: 0,
      y: 0,
      l: 0,
      t: 0,
      isDown: false,


      name: '',
      kid: '',
      nodeData: {},
      showChildrens: false,
      parendShow: false,
      list1: [
        { name: "我十一", id: 1, type: 0 },
        { name: "我十二", id: 2, type: 0 },
        { name: "我十三", id: 3, type: 1 },
      ],
      list2: [
        {          title: "Juan", id: 5,
          show: false,
          children: [
            {
              title: 'leaf 1-1-1',
              show: false,
            },
            {
              title: 'leaf 1-1-2',
              show: false,
            }
          ]
        },
        { title: "Edgard", id: 6, show: false, },
        { title: "Johnson", id: 7, show: false, }
      ],
      type: 0,
      editable: true,
      isDragging: false,
      delayedDragging: false,



      split3: 0.6,
      split4: 0.5,
      SelectData: [
        { id: '0', value: '来源目录' },
        { id: '1', value: '主题目录' }
      ],
      show: '1',
      data2: [],
    }
  },
  computed: {
  },

  mounted () {
    this.init()
  },
  methods: {
    //  拖拽事件处理
    //  监听鼠标按下事件
    //鼠标按下拖拽
    drag (e) {
      console.log(e)
      var oDiv = e.srcElement;
      var disX = e.clientX - oDiv.offsetLeft;
      var disY = e.clientY - oDiv.offsetTop;
      document.onmousemove = function (e) {
        console.log('我在动', e)
        e.preventDefault();
        var l = e.clientX - disX;
        var t = e.clientY - disY;
        oDiv.style.left = l + "px"
        oDiv.style.top = t + "px"
      }
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      }
    },
    init () {
      //  获取初始来源目录=>默认为来源目录
      this.$fetch(this.GLOBAL.serverSrc + '/Catalog/dataConfig?flag=' + this.show).then(res => {
        console.log(res)
        this.list2 = [...res.data.data] || this.list2

        console.log('列表', this.list2)

      })
      //  获取数据库数据目录
      this.$fetch(this.GLOBAL.serverSrc + '/Catalog/queryDataCataLog').then(res => {
        console.log(res)
        this.list1 = [...res.data.data]
        for (var type of this.list1) {
          type.title = type.name
          delete type[name]
          if (type.type == '0') {
            type.Classification = '（已存在来源目录）'
          } else if (type.type == '1') {
            type.Classification = '（已存在主题目录）'
          } else if (type.type == '3') {
            type.Classification = '（已存在来源、主题目录）'
          } else if (type.type == '') {
            type.Classification = ''
          }
        }

      })
    },



    //  拖拽结束打印出拖拽节点信息,把节点属性设为不可拖拽
    log: function (evt) {
      console.log(evt)
      if (evt.added === undefined) return false
      let el = document.querySelector('div[kid="' + evt.added.element.id + '"]')
      console.log(el)
      el.className = "listLast"

      //  /Catalog/addCatalog  "3622928db61b45d4997fd4dbf75ab313"
      // this.$fetch(this.GLOBAL.serverSrc + '/Catalog/addCatalog?flag=' + this.show + '&id=' + evt.added.element.id + '&parentId=' + '3622928db61b45d4997fd4dbf75ab313' + '&catalogNmae=' + evt.added.element.name).then(res => {
      //   console.log(res)
      // })
    },
    end: function (evt) {
      console.log(evt)
      console.log('可以知道拖动的本身', evt.item)
      console.log('可以知道拖动的目标列表', evt.to)
      console.log('可以知道之前的列表', evt.from)
      console.log('可以知道拖动前的位置', evt.oldIndex)
      console.log('可以知道拖动后的位置', evt.newIndex)
      evt.item //可以知道拖动的本身
      evt.to    // 可以知道拖动的目标列表
      evt.from  // 可以知道之前的列表
      evt.oldIndex  // 可以知道拖动前的位置
      evt.newIndex  // 可以知道拖动后的位置
      //  获取拖动后的节点值
      this.kid = evt.item.getAttribute("kid")
      this.name = evt.item.getAttribute("name")
      console.log(evt.item.getAttribute("kid"))
      this.parendShow = true

    },
    ok () {
      console.log(this.nodeData)
      if (JSON.stringify(this.nodeData) == '{}') {
        this.$Message.info('当前未选择节点')
        this.parendShow = false
      } else {
        console.log(this.nodeData)
        let pid = ""
        if (this.nodeData.parentId == "0") { pid = this.nodeData.catalogId }
        else { pid = this.nodeData.parentId }
        console.log(pid)
        //  /Catalog/addCatalog  "3622928db61b45d4997fd4dbf75ab313"
        this.$fetch(this.GLOBAL.serverSrc + '/Catalog/addCatalog?flag=' + this.show + '&id=' + this.kid + '&parentId=' + pid + '&catalogNmae=' + this.name).then(res => {
          console.log(res)
          this.$Message.success('目录分配成功')
          this.parendShow = false

          if (this.show == '1') {
            //  获取初始来源目录=>切换主题目录
            this.$fetch(this.GLOBAL.serverSrc + '/Catalog/dataConfig?flag=1').then(res => {
              console.log(res)
              this.list2 = res.data.data
            })
          } else if (this.show == '0') {
            //  获取初始来源目录=>切换来源目录
            this.$fetch(this.GLOBAL.serverSrc + '/Catalog/dataConfig?flag=0').then(res => {
              console.log(res)
              this.list2 = res.data.data
            })
          }
        })
      }
      // this.parendShow = false

    },
    cancel () {
      this.$Message.info('Clicked cancel');
    },
    // 单元被移动到另一个列表时的回调函数 ==>自定义克隆
    cloneDog (id) {
      console.log(id)

      // return false
    },
    //  单击节点时,显示数据信息
    showNodeData (node, index) {

      console.log(node, index)
      this.nodeData = index
    },


    // ------------------数据库数据目录--------------------
    //目录搜索
    searchDataDirectory (value) {
      console.log(value)
    },
    // 刷新
    refresh () {
      this.init()
    },
    //  ------------------数据来源目录--------------------
    //  数据来源目录搜索
    searchSourceDirectory (value) {
      console.log(value)
    },
    showChildren (index) {
      console.log(index)
      this.showChildrens = !index
    },
    selectNode () {

    }
  },
  watch: {
    //  监听切换菜单
    show (val) {
      console.log(val)
      if (val == '1') {
        //  获取初始来源目录=>切换主题目录
        this.$fetch(this.GLOBAL.serverSrc + '/Catalog/dataConfig?flag=1').then(res => {
          console.log(res)
          this.list2 = res.data.data
        })
      } else if (val == '0') {
        //  获取初始来源目录=>切换来源目录
        this.$fetch(this.GLOBAL.serverSrc + '/Catalog/dataConfig?flag=0').then(res => {
          console.log(res)
          this.list2 = res.data.data
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
.listLast {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  color: #ddd;
}

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
.demo-split {
  height: 500px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
  height: 100%;
  overflow-x: hidden;
}
.demo-split-pane.no-padding {
  height: 500px;
  padding: 0;
}
.ivu-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  transition: all 0.2s ease-in-out;
  min-height: 100%;
}
#datainf {
  height: 100%;
}
// .card {
//   height: 100%;
// }
.ivu-card {
  height: auto !important;
}
.dragDemo {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  color: #555;
  .list-group {
    width: 300px;
    border: 1px solid #ddd;
    text-align: center;
    margin-right: 50px;
    > div {
      padding: 10px;
      border-bottom: 1px dashed #ddd;
      img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        padding-right: 10px;
      }
    }
  }
}
</style>
