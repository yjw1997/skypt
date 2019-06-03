<template>
  <div id="mylog">
    <headinput></headinput>
    <div class="table">
      <Table border
             :columns="columns5"
             :data="data5"></Table>
    </div>
    <div class="page">
      <Page :total="100"
            show-sizer
            show-elevator />
    </div>
  </div>
</template>
<script>
import Bus from "../../assets/eventBus"
import headinput from '../mylog-head'

export default {
  name: 'mylog',
  components: {
    headinput
  },
  data () {
    return {
      columns5: [
        {
          title: '用户名称',
          key: 'name'
        },
        {
          title: '用户所属单位',
          key: 'beloneunit'
        },
        {
          title: '服务名称',
          key: 'servicesname',
        },
        {
          title: '服务类型',
          key: 'servicetype'
        },
        {
          title: '访问时间',
          key: 'date',
          sortable: true
        },
        {
          title: '访问时长',
          key: 'time',
          sortable: true
        },
        {
          title: 'IP',
          key: 'ip'
        },
        {
          title: '处理结果',
          key: 'result'
        }
      ],
      data5: [
        {
          name: 'no.1',
          beloneunit: 'unit',
          servicesname: '服务',
          servicetype: 'type',
          date: '2017-7-1',
          time: '2day',
          ip: '110.251.168.46',
          result: '处理成功'
        }
      ]
    }
  }
}
</script>
<style lang = "less" scoped>
.table {
  margin-top: 20px;
}
.page {
  position: absolute;
  bottom: -50%;
  left: 50%;
  margin-left: -200px;
  text-align: center;
  padding: 40px 0px;
}
</style>
