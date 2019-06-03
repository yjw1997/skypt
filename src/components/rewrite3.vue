<template>
  <div>
    <ul class="ul-title" style="line-height:97px">
      <li>访问限制：</li>
      <li>使用限制：</li>
    </ul>
    <ul class="ul-content">
      <li style="height:120px">
        <Input
          type="textarea"
          placeholder=" ..."
          :autosize="{ minRows: 5, maxRows: 6 }"
        />
      </li>
      <li style="height:120px">
        <Input
          type="textarea"
          placeholder=" ..."
          :autosize="{ minRows: 5, maxRows: 6 }"
        />
      </li>
    </ul>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
</style>
