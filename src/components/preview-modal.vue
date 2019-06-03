<template>
  <Modal v-model="modal1"
         title="我注册的服务-部件-反馈信息"
         :loading="loading"
         width='705'
         style="text-align:center;overflow: hidden;"
         :closable="false"
         :mask-closable="false">
    <div style="margin:0px auto;"
         class="ib">
      <Table border
             :columns="columns1"
             :data="data1"></Table>
    </div>
    <div slot="footer">
      <Button type="text"
              size="large"
              @click="prerviewCancel">取消</Button>
      <Button type="primary"
              size="large"
              @click="prerviewok">确定</Button>
    </div>
  </Modal>
</template>
<script>
import { eventBus } from "../assets/eventBus"
export default {
  name: 'service-view',
  data () {
    return {

      columns1: [
        {
          title: '反馈人姓名',
          key: 'name'
        },
        {
          title: '反馈人单位',
          key: 'unit'
        },
        {
          title: '反馈人联系方式',
          key: 'contact'
        },
        {
          title: '反馈时间',
          key: 'time'
        },
        {
          title: '反馈内容',
          key: 'content'
        }
      ],
      data1: [

      ]
    }
  },
  props: {
    modal1: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    }
  },
  methods: {
    prerviewok () {
      eventBus.bus.$emit('prerviewCancel', this.modal1)
    },
    prerviewCancel () {
      eventBus.bus.$emit('prerviewCancel', this.modal1)
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
</style>
