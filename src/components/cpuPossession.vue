<template>
    <Card style="width:100%">
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            重点服务器使用情况
        </p>
        <ul style="text-align:left;list-style: none;margin-bottom:5px " v-for="item in cpuServer">
            <li>
              <img src = '../assets/resource.png' width="20" height="20" style="float:left">
              服务器IP:{{item.cpuserver}}
              <div style="font-size:12px;">
                  CPU使用率：
                  <Progress :percent="item.cpuprogress1" status="active" style="width:60%"/>
              </div>

            </li>
            <li>
                <div style="font-size:12px;padding:0; ">
                   内存使用率：
                   <Progress :percent="item.cpuprogress2" status="active"  style="width:60%" />
                </div>

              </li>
        </ul>
    </Card>
</template>
<script>
export default{
    props:{
      cpuServer:{
        type:Array
      }
    }

}
</script>
