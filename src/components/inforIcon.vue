<template>
    <div class="iconStyle align-items-center">
          <div class="icon ib" :style="data.color">
            <Icon :type="data.type" style="font-size: 35px;" />
          </div>
          <div class="ib">
            <span :style="data.color" style="font-size:20px;font-weight: 600">{{num}}</span>
            <br>
            <span >{{data.title}}</span>
          </div>

      </div>
</template>
<script>
export default{
  name: 'inforIcon',
  props:{
    data:{
        type:Object,
        default:{}
      },
      num:{
        type:Number,
        default:0
      },

  }
}
</script>
<style lang="less" scoped>
.iconStyle{

}

</style>
