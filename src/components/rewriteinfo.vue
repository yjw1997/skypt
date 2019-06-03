<template>
  <div id="rewriteinfo">
    <Form ref="approvalData"
          :model="approvalData"
          :rules="ruleInline"
          label-position="left"
          :label-width="100"
          inline>
      <div>
        <FormItem prop="serType"
                  label="数据服务类型："
                  label-position="left">
          <Select style="width:240px"
                  v-model="approvalData.serType">
            <Option value="wmts"
                    key="iwmts">wmts</Option>
          </Select>
        </FormItem>
        <FormItem prop="publishDate"
                  label="发布日期：">
          <DatePicker type="datetime"
                      v-model="approvalData.publishDate"
                      style="width: 240px"
                      format="yyyy-MM-dd HH:mm:ss"
                      @on-change="changeDate"></DatePicker>
        </FormItem>
      </div>
      <div>
        <FormItem prop="user"
                  label="元数据：">
          <Button type="info"
                  style="width: 240px"
                  @click="getFormData">获取元数据</Button>
        </FormItem>
        <FormItem prop="publishUnit"
                  label="发布单位：">
          <Input type="text"
                 v-model="approvalData.publishUnit"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="version"
                  label="服务类型版本：">
          <Input type="text"
                 :disabled='disabled'
                 v-model="approvalData.version"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="keyword"
                  label="关键词：">
          <Input type="text"
                 v-model="approvalData.keyword"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="serName"
                  label="服务名：">
          <Input type="text"
                 :disabled='disabled'
                 v-model="approvalData.serName"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="url"
                  label="上传缩略图：">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
                  v-model="approvalData.url"
                  style="width: 240px">
            <Button icon="ios-cloud-upload-outline">上传</Button>
          </Upload>
        </FormItem>
      </div>
      <div>
        <FormItem prop="serByName"
                  label="服务别名：">
          <Input type="text"
                 v-model="approvalData.serByName"
                 placeholder="serByName"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="summary"
                  label="摘要：">
          <Input type="textarea"
                 v-model="approvalData.summary"
                 placeholder="summary"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
export default {
  name: 'rewrite1',
  data () {
    return {
      ruleInline: {},
    }
  },

  methods: {
    changeDate (val) {
      this.approvalData.publishDate = val
      console.log('時間', val)
    },
    //  点击获取元数据按钮
    getFormData () {
      // this.
    }
  },
  props: {
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
}
</script>
<style lang="less" scoped>
#rewriteinfo {
  .ib();
  width: 70%;
  .tl();
}
</style>

