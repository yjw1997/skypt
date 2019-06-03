<template>
  <div id="text2">
    <Form ref="approvalData"
          :model="approvalData"
          :rules="ruleInline"
          label-position="left"
          :label-width="100"
          inline>
      <div>
        <FormItem prop="unitName"
                  label="单位名称："
                  label-position="left">
          <Input type="text"
                 v-model="approvalData.unitName"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="city"
                  label="城市：">
          <Input type="text"
                 v-model="approvalData.city"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="unitAddress"
                  label="单位地址："
                  label-position="left">
          <Input type="text"
                 v-model="approvalData.unitAddress"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="detailAddress"
                  label="详细地址：">
          <Input type="text"
                 v-model="approvalData.detailAddress"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="contact"
                  label="联系人："
                  label-position="left">
          <Input type="text"
                 v-model="approvalData.contact"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="postCode"
                  label="邮编：">
          <Input type="text"
                 v-model="approvalData.postCode"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="unitName"
                  label="联系人职位："
                  label-position="left">
          <Input type="text"
                 v-model="approvalData.contactPosition"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="publishDate"
                  label="电话：">
          <Input type="text"
                 v-model="approvalData.telephone"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="country"
                  label="国家："
                  label-position="left">
          <Input type="text"
                 v-model="approvalData.country"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="fax"
                  label="传真：">
          <Input type="text"
                 v-model="approvalData.fax"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
      <div>
        <FormItem prop="province"
                  label="省（直辖市）："
                  label-position="left">
          <Input type="text"
                 v-model="approvalData.province"
                 style="width: 240px">
          </Input>
        </FormItem>
        <FormItem prop="mailBox"
                  label="电子邮箱：">
          <Input type="text"
                 v-model="approvalData.mailBox"
                 style="width: 240px">
          </Input>
        </FormItem>
      </div>
    </Form>
  </div>

</template>
  <script>
export default {
  name: 'rewrite2',
  data () {
    return {
      ruleInline: {},
    }
  },
  props: {
    approvalData: {
      type: Object,
      default: () => {
        return {
          unitName: '',
          detailAddress: '',
        }
      }
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
  }
}
  </script>
  <style lang="less" scoped>
ul {
  /* width: 49%; */
  line-height: 30px;
  display: inline-block;
  list-style: none;
  text-align: left;
  font-size: 15px;
  padding: 0px 20px;
}
ul li {
  line-height: 50px;
}
</style>
