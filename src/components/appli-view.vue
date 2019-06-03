<template>
  <Modal v-model="modal2"
         title="查看申请详情"
         :loading="loading"
         width='705'
         style="text-align:center;overflow: hidden;"
         :closable="false"
         :mask-closable="false">
    <ul style="width:30%;float: left;height: 458px;"
        class="ib">
      <li class="title ">申请表单</li>
      <li class="title">审批详情</li>
    </ul>
    <ul style="width:60%;"
        class="ib">
      <li>
        <div style="position:relative">
          <ul class="ul-title">
            <li>对接系统名称：</li>
            <li>应用系统描述：</li>
            <li>需求描述：</li>
            <li>申请时间：</li>
          </ul>
          <ul style="width:49%;display: inline-block;list-style:none;">
            <li>
              <Select class="inputs">
                <Option :value="viewdata.name"
                        v-if="viewdata.name">{{ viewdata.name }}</Option>
              </Select>
            </li>
            <li>
              <Input placeholder="应用系统描述"
                     type="textarea"
                     class="inputs"
                     disabled />
            </li>
            <li>
              <Input type="textarea"
                     placeholder="需求描述"
                     class="inputs"
                     disabled />
            </li>
            <li>
              <Input placeholder=" ..."
                     v-if="viewdata.name"
                     class="inputs"
                     :value="viewdata.time"
                     disabled />
            </li>
          </ul>
          <div>
          </div>
        </div>
      </li>
    </ul>
    <div style="width:60%;padding-top: 20px"
         class="ib">
      <Table :columns="columns1"
             :data="data1"></Table>
    </div>
    <div slot="footer">
      <Button type="text"
              size="large"
              @click="modalCancel">取消</Button>
      <!-- <Button type="primary" size="large" @click="modalOk">确定</Button> -->
    </div>
  </Modal>
</template>
<script>
import { eventBus } from "../assets/eventBus"
export default {
  name: 'appli-view',
  data () {
    return {
      columns1: [
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '审批人',
          key: 'name'
        },
        {
          title: '审批结果',
          key: 'result'
        },
        {
          title: '审批意见',
          key: 'opinion'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  props: {
    SelectData: {
      type: Array,
      required: true
    },
    modal2: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    viewdata: {
      type: Object,
      default: () => {
        return {
          time: '',
          name: ''
        }
      }
    }
  },
  methods: {
    modalCancel () {
      eventBus.bus.$emit('modal2Cancel', this.modal2)
      // console.log(data)
    },
    modalOk () {
      eventBus.bus.$emit('modal2Cancel', this.modal2)
    }
  },
}


  </script>
  <style lang="less" scoped>
.ul-title {
  line-height: 43px;
}
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
