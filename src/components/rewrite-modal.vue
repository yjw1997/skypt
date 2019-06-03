<template>
  <Modal v-model="rewriteModal"
         :title="title"
         style="text-align:center;"
         :mask-closable="false"
         :closable="false"
         width="1080">
    <Tabs value="rewrite1">
      <TabPane label="基本信息"
               name="rewrite1">
        <rewrite1 :approvalData="approvalData"></rewrite1>
      </TabPane>
      <TabPane label="发布单位信息"
               name="rewrite2">
        <rewrite2 :approvalData="approvalData"
                  :disabled="disabled"></rewrite2>
      </TabPane>
      <TabPane label="服务使用限制"
               name="rewrit3">
        <rewrite3 :approvalData="approvalData"></rewrite3>
      </TabPane>
      <TabPane label="数据描述信息"
               name="rewrite4">
        <rewrite4 :approvalData="approvalData"></rewrite4>
      </TabPane>
      <TabPane label="操作描述信息"
               name="rewrite5">
        <rewrite5 :approvalData="approvalData"></rewrite5>
      </TabPane>
      <TabPane label="服务调用示例"
               name="rewrite6">
        <rewrite6 :approvalData="approvalData"></rewrite6>
      </TabPane>
      <TabPane label="服务范围信息"
               name="rewrite7">
        <rewrite7 :approvalData="approvalData"></rewrite7>
      </TabPane>
      <TabPane label="瓦片信息"
               name="rewrite8"
               v-if="info">
        <rewrite8 :approvalData="approvalData"></rewrite8>
      </TabPane>
    </Tabs>
    <div slot="footer">
      <Button type="primary"
              size="large"
              @click="save"
              v-if="title === '修改'">保存</Button>
      <Button type="default"
              size="large"
              @click="cancel">取消</Button>
    </div>
  </Modal>
</template>
<script>
import rewrite1 from '../components/rewriteinfo'
import rewrite2 from '../components/rewrite2'
import rewrite3 from '../components/rewrite3'
import rewrite4 from '../components/rewrite4'
import rewrite5 from '../components/rewrite5'
import rewrite6 from '../components/rewrite6'
import rewrite7 from '../components/rewrite7'
import rewrite8 from '../components/rewrite8'

export default {
  name: 'rewrite-modal',
  components: {
    rewrite1,
    rewrite2,
    rewrite3,
    rewrite4,
    rewrite5,
    rewrite6,
    rewrite7,
    rewrite8
  },
  props: {
    rewriteModal: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '修改'
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
    disabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    save () {
      // console.log(this.approvalData)
      this.$emit('save', this.approvalData)
    },
    cancel () {
      this.$emit('cancel', this.rewriteModal)
    }
  }
}
</script>
<style scoped lang="less">
</style>
