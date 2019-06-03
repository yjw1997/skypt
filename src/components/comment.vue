<template>
  <Modal
    v-model="comment"
    title="全文检索评论"
    style="text-align:center;"
    :mask-closable="false"
    :closable="false"
  >
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>全文检索评论
      </p>
      <div class="content">
        <Input type="textarea"/>
        <Radio v-model="single">匿名评论</Radio>
        <div>评论时间：2018-11-11 12:23</div>
      </div>
      
    </Card>
    <div slot = "footer" class="tc">
        <Button type="info" @click = "submitCommit">提交评论</Button>
        <Button type="default" @click = "cancel" class="fr">取消</Button>
      </div>
  </Modal>
</template>
<script>
export default {
  name: "comment",
  data () {
      return {
          single: false
      }
  },
  props: {
    comment: {
      type: Boolean
    }
  },
  methods: {
    //  提交评论
    submitCommit() {

    },
    //  点击取消按钮
    cancel() {
      this.$emit('cancelCommon',this.comment)
    }
  }
};
</script>
<style lang="less" scoped>
</style>
