<template>
  <Modal v-model="modal3"
         title="服务详情预览"
         :loading="loading"
         width='820'
         style="text-align:center;overflow: hidden;"
         :closable="false"
         :mask-closable="false">
    <Tabs :approvalData="approvalData"></Tabs>
    <div slot="footer">
      <Button type="text"
              size="large"
              @click="feedbackCancel">取消</Button>
      <Button type="primary"
              size="large"
              @click="feedbackOk">确定</Button>
    </div>
  </Modal>
</template>
<script>
import Bus from "../assets/eventBus"
import Tabs from '../components/show-taps'
export default {
  name: 'feedback-view',
  components: {
    Tabs
  },
  data () {
    return {
    }
  },
  props: {
    modal3: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    approvalData: {
      type: Object,
      default: () => {
        return {
          serType: '',
          publishDate: '',
          publishUnit: '',
          version: '',
          keyword: '',
          serName: '',
          url: '',
          serByName: '',
          summary: '',
        }
      }
    },
  },
  methods: {
    feedbackOk () {
      this.$emit('feedbackOk', this.modal3)

    },
    feedbackCancel () {
      this.$emit('feedbackCancel', this.modal3)
    }
  }
}
  </script>
  <style scoped lang = "less">
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
