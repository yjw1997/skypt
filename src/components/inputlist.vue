<template>
  <div class="input">
    <div class="ib">
      {{str[0]}}：
      <Select style="width:200px"
              v-model="val1">
        <Option v-for="item in SelectData"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </div>
    <div class="ib">
      {{str[1]}}：
      <Select style="width:200px"
              v-model="val2">
        <Option v-for="item in statueData"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </div>
    <div class="ib">
      {{str[2]}}：
      <DatePicker v-model="starTime"
                  type="date"
                  placeholder="开始时间"
                  style="width: 200px"></DatePicker>
      -
      <DatePicker v-model="endTime"
                  type="date"
                  placeholder="结束时间"
                  style="width: 200px"></DatePicker>
      <Button type="primary"
              @click="search">搜索</Button>
      <Button type="primary"
              @click="reset">重置</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inputlist',
  data () {
    return {
      val1: '',
      val2: '',
      starTime: '',
      endTime: '',
    }
  },
  props: {
    SelectData: {
      type: Array | Object,
    },
    statueData: {
      type: Array | Object,
    },
    str: {
      type: Array,
    },
    sendMsg: {
      type: Boolean,
      default: false,

    }
  },
  watch: {
    sendMsg: { //深度监听，可监听到对象、数组的变化
      handler (newV, oldV) {
        // do something, 可使用this
        console.log(newV, oldV)
      },
      deep: true
    }
  },
  methods: {
    search () {
      // 获取所有数据传到父组件
      let unit = this.val1
      let Process = this.val2
      let starTime = Date.parse(new Date(this.starTime))
      let endTime = Date.parse(new Date(this.endTime))
      // 限制不能只输入开始时间或者结束时间
      if (Object.is(starTime, NaN) && !Object.is(endTime, NaN) || !Object.is(starTime, NaN) && Object.is(endTime, NaN)) {
        this.$Message.error('请输入您的开始时间或结束时间');
      } else {
        // 限制不能结束时间小于开始时间
        if (starTime > endTime) {
          this.$Message.error('您输入的开始日期不能晚于结束日期');
        } else {
          starTime = new Date(parseInt(starTime)).toLocaleDateString()
          starTime = starTime.replace('/', '-')
          starTime = starTime.replace('/', '-')
          endTime = new Date(parseInt(endTime)).toLocaleDateString()
          endTime = endTime.replace('/', '-')
          endTime = endTime.replace('/', '-')
          let data = {
            unit, Process, starTime, endTime
          }
          // //空的项删除key
          for (var [index, val] of Object.entries(data)) {
            if (Object.is(val, NaN)) {
              delete data[index]
            } else if (Object.is(val, "")) {
              delete data[index]
            } else if (Object.is(val, "Invalid Date")) {
              delete data[index]
            }
          }
          console.log(data)
          // 向父组件传值
          // 检查是否输入值
          let result = Object.values(data).some(function (res) {
            return res !== null
          })
          if (result) {
            this.$emit("listentochildevent", data)
          } else {
            this.$Message.error('请选择您的搜索条件');
          }
        }
      }
    },
    // 时间戳转换为时间
    // var time=new Date(parseInt(starTime)).toLocaleDateString()
    // console.log(time)
    reset () {

      window.location.reload()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
