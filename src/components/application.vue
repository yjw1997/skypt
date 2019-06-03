<template>
  <div id="table">
    <!-- <InputList
      :SelectData="SelectData"
      :statueData="statueData"
      :str="str"
      @listentochildevent="listentochildevent"
    ></InputList>-->
    <div class="table">
      <Table border
             :columns="columns1"
             :data="data1"></Table>
    </div>
    <!-- <div class="page">
      <Page :total="100"/>
    </div>-->
    <AppliEdit :SelectData="SelectData"
               :loading="loading"
               :modal1="modal1"
               :editdata="editdata"></AppliEdit>
    <AppliView :SelectData="SelectData"
               :loading="loading"
               :modal2="modal2"
               :viewdata="viewdata"></AppliView>
  </div>
</template>
<script>
import { eventBus } from "../assets/eventBus"
import AppliEdit from "../components/appli-edit"
import AppliView from "../components/appli-view"
import InputList from "../components/inputlist"
import axios from "axios"
export default {
  name: "application",
  components: {
    InputList,
    AppliEdit,
    AppliView
  },
  data () {
    return {
      str: ["类型", "状态", "申请时间"],
      modal1: false,
      modal2: false,
      loading: true,
      viewdata: {},
      editdata: {},
      view: {},
      SelectData: ["所有类型", "数据申请", "服务申请"],
      statueData: ["全部", "未提交", "已通过", "未通过"],
      columns1: [
        {
          title: "序号",
          key: "id"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "当前节点",
          key: "schedule"
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            if (params.row.status === "未通过") {
              return h(
                "span",
                {
                  style: {
                    color: "#FF7D41"
                  }
                },
                params.row.status
              );
            } else if (params.row.status === "已通过") {
              return h(
                "span",
                {
                  style: {
                    color: "#169BD5"
                  }
                },
                params.row.status
              );
            } else if (params.row.status === "未提交") {
              return h(
                "span",
                {
                  style: {
                    color: " #00CC00"
                  }
                },
                params.row.status
              );
            }
          }
        },
        {
          title: "申请时间",
          key: "time",
          sortable: true
        },
        {
          title: "操作",
          key: "show",
          render: (h, params) => {
            if (params.row.status === "未提交") {
              return h(
                "div",
                {
                  style: {
                    "text-align": "center"
                  }
                },
                [
                  h(
                    "a",
                    {
                      on: {
                        click: () => {
                          console.log(params.row);
                          this.modal1 = true;
                          this.editdata = params.row;
                          // this.$fetch("../static/data.json").then(response => {
                          //   console.log(response);
                          // });
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "a",
                    {
                      on: {
                        click: () => {
                          console.log(params.row.id);
                          if (confirm("您确定要删除嘛？")) {
                            axios
                              .get("../static/data.json", {
                                params: {
                                  id: params.row.id
                                }
                              })
                              .then(res => { });
                          }
                        }
                      }
                    },
                    " 删除"
                  )
                ]
              );
            } else {
              return h(
                "div",
                {
                  style: {
                    "text-align": "center"
                  }
                },
                [
                  h(
                    "a",
                    {
                      on: {
                        click: () => {
                          console.log(params.row);
                          this.modal2 = true;
                          this.view = params.row;
                          this.viewdata = params.row;
                        }
                      }
                    },
                    "查看"
                  )
                ]
              );
            }
          }
        }
      ],
      data1: []
    };
  },
  mounted () {
    var self = this;
    // 点击取消按钮
    eventBus.bus.$on("modal1Cancel", function (msg) {
      console.log(msg);
      self.modal1 = false;
    });
    // 点击确定按钮
    eventBus.bus.$on("modal1Ok", function (msg) {
      console.log(msg);
      this.$fetch("../static/data.json").then(res => { });
      self.modal1 = false;
    });
    // 查看
    // 点击取消按钮
    eventBus.bus.$on("modal2Cancel", function (msg) {
      console.log(msg);
      self.modal2 = false;
    });
    // 点击确定按钮
    eventBus.bus.$on("modal2Ok", function (msg) {
      console.log(msg);
      self.modal2 = false;
    });
    //获取表格数据
    this.$fetch("../static/data.json").then(response => {
      this.data1 = response.data.appDatas;
    });
  },
  methods: {
    // 点击搜索按钮由inputlist子组件传递过来的消息
    listentochildevent (data) {
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
#table {
  height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  text-align: center;
}
#table::-webkit-scrollbar {
  display: none;
}
.table {
  margin-top: 20px;
}
.page {
  position: absolute;
  bottom: -50%;
  left: 50%;
  margin-left: -200px;
  .tc();
  padding: 40px 0px;
}
.inputs {
  width: 200px;
}
.modal-left {
  width: 30%;
  display: inline-block;
  list-style: none;
  font-size: 16px;
  line-height: 40px;
  text-align: right;
}
</style>
