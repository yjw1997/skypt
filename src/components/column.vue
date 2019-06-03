<style scoped lang="less">
.recycle {
  margin-top: 10px;
}
.table {
  margin: 0 auto;
  width: 99%;
}
.time {
  /* margin-left: 20%; */
  margin-top: 15px;
}
.add-btn {
  /* margin-left: 30%; */
}
.del-btn {
  /* margin-left: 30px; */
}
</style>
<template>
  <div id="modalcolumn">
    <div class="time">栏目名称：
      <Input placeholder=" ..."
             clearable
             style="width: 200px" />类型：
      <Select style="width:200px">
        <Option v-for="item in type"
                :value="item.value"
                :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button type="primary"
              icon="ios-search"
              class="serch-btn">搜索</Button>
      <div class="ib fr"></div>
      <Button type="info"
              class="add-btn">新增</Button>
    </div>
    <Table border
           ref="selection"
           :columns="columns"
           :data="data"
           style="margin-top: 15px;"></Table>
    <columnview :loading="loading"
                :modal5="modal5"></columnview>
  </div>
</template>
<script>
import { eventBus } from '../assets/eventBus'
import columnview from '../components/column-modal'
export default {
  name: 'modalcolumn',
  components: {
    columnview
  },
  data () {
    return {
      modal5: false,
      loading: false,
      starttime: null,
      endtime: null,
      type: [
        {
          value: '1',
          label: 'type1'
        },
        {
          value: '2',
          label: 'type2'
        }
      ],
      columns: [
        {
          title: '栏目名称',
          key: 'number'
        },
        {
          title: '级别',
          key: 'servicename'
        },
        {
          title: '类型',
          key: 'servicename1'
        },
        {
          title: '排序',
          key: "type"
        },
        {
          title: '状态',
          key: 'time'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          // fixed: right,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal5 = true;
                    }
                  }
                },
                '添加子项'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true;
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.modal4 = true;
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      console.log(params.row);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      data: [
        {
          number: '1',
          servicename: '服务申请',
          servicename1: '服务名1',
          type: '待提交',
          status: '未通过',
          time: '2018-5-22 11:52:22'
        }
      ]
    }
  },
  mounted () {
    var self = this
    eventBus.bus.$on('columncancel', function (msg) {
      console.log(msg)
      self.modal5 = false
    }),
      eventBus.bus.$on('columnok', function (msg) {
        console.log(msg)
        self.modal5 = false
      })
  }
}
</script>
