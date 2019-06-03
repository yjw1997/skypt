<template>
  <Modal v-model="modal1"
         title="编辑列表"
         :loading="loading"
         style="text-align:center"
         :closable="false"
         :mask-closable="false">
    <div style="position:relative">
      <ul class="ul-title">
        <li>对接系统名称：</li>
        <li>应用系统描述：</li>
        <li>需求描述：</li>
      </ul>
      <ul style="width:49%;display: inline-block;list-style:none;">
        <li>
          <Input :placeholder="editdata.name"
                 class="inputs"
                 :value="editdata.name"
                 name="title" />
        </li>
        <li>
          <Input type="textarea"
                 placeholder=" ..."
                 class="inputs" />
        </li>
        <li>
          <Input type="textarea"
                 placeholder=" ..."
                 class="inputs" />
        </li>
      </ul>
      <div>
      </div>
    </div>
    <div slot="footer">
      <Button type="text"
              size="large"
              @click="modalCancel">取消</Button>
      <Button type="primary"
              size="large"
              @click="modalOk">确定</Button>
    </div>
  </Modal>
</template>
<script>
import { eventBus } from "../assets/eventBus"
export default {
  name: 'appli-edit',
  props: {
    SelectData: {
      type: Array,
      required: true
    },
    modal1: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
    editdata: {
      type: Object
    }
  },
  methods: {
    modalCancel () {
      eventBus.bus.$emit('modal1Cancel', this.modal1)
      // console.log(data)
    },
    //点击确定按钮，把数据传到前台修改
    modalOk () {
      let title = document.getElementsByName('title')[0].value;
      let data = {
        title,
        modal1: this.modal1
      }
      eventBus.bus.$emit('modal1Ok', data)
    }
  },
}


</script>
<style scoped lang="less">
.ul-title {
  line-height: 38px;
  .tr;
}
</style>

