<template>
  <Modal v-model="modal5"
         title="新增子栏目"
         :loading="loading"
         width="500"
         style="text-align:center;overflow: hidden;"
         :closable="false"
         :mask-closable="false">
    <div class="ib"
         style="text-align:left;font-weight: 500">
      项目名称：
      <Input placeholder=" ..."
             style="width: 300px" /><br />
      级别：
      <Input disabled
             placeholder=" ..."
             style="width: 300px;margin-left: 25px;" /><br />
      类型：
      <Input disabled
             placeholder=" ..."
             style="width: 300px;margin-left: 25px;" /><br />
      状态显示：<Input placeholder=" ..."
             style="width: 300px;margin-left: 5px;" /><br />
      <Upload multiple
              type="drag"
              action="//jsonplaceholder.typicode.com/posts/">
        <Icon type="ios-cloud-upload"
              size="52"
              style="color: #3399ff;margin-left: -300px;"></Icon>
        <p style="margin-left: -300px;">LOGO</p>
      </Upload>
      栏目属性：
      <RadioGroup>
        <Radio label="列表栏目"></Radio><br />
        <Radio label="频道封面"></Radio><br />
        <Radio label="链接到默认页"></Radio><br />
      </RadioGroup>
    </div>
    <div slot="footer">
      <Button type="text"
              size="large"
              @click="columncancel">取消</Button>
      <Button type="primary"
              size="large"
              @click="columnok">确定</Button>
    </div>

  </Modal>
</template>
<script>
import { eventBus } from '../assets/eventBus';
export default {
  name: 'columnview',
  data () {
    return {
      props: {
        modal5: {
          type: Boolean
        },
        loading: {
          type: Boolean
        }
      },
    };
  },
  props: {
    modal5: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    }
  },
  methods: {
    columnok () {
      eventBus.bus.$emit('columnok', this.modal5);
    },
    columncancel () {
      eventBus.bus.$emit('columncancel', this.modal5);
    }
  }
};
</script>
<style scoped lang = 'less'>
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
.ib {
  margin-left: 10px;
}
</style>
