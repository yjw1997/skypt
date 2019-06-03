<template>
  <Modal v-model="modal2"
         title="用户详情"
         :loading="loading"
         width='1100'
         style="text-align:center;overflow: hidden;"
         :closable="false"
         :mask-closable="false">
    <div class="ib">
      <Row>
        <Col span="12">
        用户单位：
        <Select style="width:100px">
          <Option v-for="item in SelectData"
                  :value="item.approvalStatusid"
                  :key="item.approvalStatusid">{{ item.approvalStatusname }}</Option>
        </Select>
        申请状态：
        <Select style="width:100px">
          <Option v-for="item in statueData"
                  :value="item.serviceStatusid"
                  :key="item.serviceStatusid">{{ item.serviceStatusname }}</Option>
        </Select>
        </Col>
        <div class="modal">
          申请时间:
          <DatePicker type="datetime"
                      placeholder="开始时间"
                      id="starttime"
                      style="width: 160px;"></DatePicker>
          -
          <DatePicker type="datetime"
                      placeholder="结束时间"
                      id="endtime"
                      style="width: 160px"></DatePicker>
          <Button type="primary"
                  icon="ios-search"
                  class="serch-btn">查询</Button>
        </div>

      </Row>
      <Table border
             :columns="columns1"
             :data="data1"
             style="margin-top: 10px;"></Table>
    </div>
    <div slot="footer">
      <Button type="text"
              size="large"
              @click="usermodalCancel">取消</Button>
      <Button type="primary"
              size="large"
              @click="usermodalok">确定</Button>
    </div>
  </Modal>
</template>
<script>
import { eventBus } from "../assets/eventBus"
export default {
  name: 'user-view',
  data () {
    return {
      columns1: [
        {
          title: '用户名称',
          key: 'name'
        },
        {
          title: '用户单位',
          key: 'unit'
        },
        {
          title: '用户时间',
          key: 'time'
        },
        {
          title: '用户状态',
          key: 'status',
          render: (h, params) => {
            if (params.row.status === '未通过') {
              return h('span', {
                style: {
                  color: '#FF7D41'
                }
              }, params.row.status)
            } else if (params.row.status === '已通过') {
              return h('span', {
                style: {
                  color: '#169BD5'
                }
              }, params.row.status)
            } else if (params.row.status === '未提交') {
              return h('span', {
                style: {
                  color: ' #00CC00'
                }
              }, params.row.status)
            }
          }
        },
      ],
      data1: [

      ]
    }
  },
  props: {
    SelectData: {
      type: Array,
    },
    statueData: {
      type: Array,
    },
    modal2: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    }
  },
  methods: {
    usermodalok () {
      eventBus.bus.$emit('usermodalok', this.modal2)
    },
    usermodalCancel () {
      eventBus.bus.$emit('usermodalCancel', this.modal2)
    }
  }
}
</script>
  <style lang="less" scoped>
li {
  list-style: none;
}
.border {
  border: #666666 1px solid;
}
.title {
  height: 50%;
  line-height: 87px;
  font-weight: 700;
  font-size: 19px;
}
.ib {
  margin-left: 10px;
}
</style>
