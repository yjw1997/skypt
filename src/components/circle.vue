<template>
    <Card style="width:100%">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            {{title}}
        </p>
        <i-circle :percent="percent">
            <span class="demo-Circle-inner" style="font-size:12px;font-weight: 700">
              服务平均访问成功率
              <span style="font-size:15px;color:#3366ff"> {{percent}}</span>%</span>
        </i-circle>
    </Card>
</template>
<script>
    export default {
      props:{
        percent:{
        type:Number,
      },
      title:{
        type: String
      }
    }
    }
</script>
