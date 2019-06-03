<template>
  <Modal v-model="modal2"
         title="数据上传"
         style="text-align:center"
         :closable="false"
         :mask-closable="false"
         width='650'
         height='470'>
    <div id="DatauploadList">
      <Form ref="formInline"
            :model="formInline"
            :rules="ruleInline"
            id="from"
            :label-width="100">
        <FormItem prop="nickname"
                  label="名称：">
          <Input type="text"
                 v-model="formInline.nickname"
                 placeholder="请输入名称"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />

        </FormItem>
        <FormItem prop="contact"
                  label="联系人：">
          <Input type="text"
                 v-model="formInline.contact"
                 placeholder="请输入联系人姓名"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />
        </FormItem>
        <FormItem prop="unitname"
                  label="单位名称:">
          <Input type="text"
                 v-model="formInline.unitname"
                 placeholder="单位名称"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />
        </FormItem>
        <FormItem prop="address"
                  label="详细地址：">
          <Input type="text"
                 v-model="formInline.address"
                 placeholder="详细地址"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />
        </FormItem>
        <FormItem prop="tel"
                  label="联系电话：">
          <Input type="text"
                 v-model="formInline.tel"
                 placeholder="联系电话"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />
        </FormItem>
        <FormItem prop="DataUsage"
                  label="数据用途：">
          <Input type="text"
                 v-model="formInline.DataUsage"
                 placeholder="数据用途"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />
        </FormItem>
        <FormItem prop="uploadFile"
                  label="上传文件：">
          <!-- <Upload action="http://10.8.0.10/citydew-filesystem/upload?access_token=2fd254f1-2d48-4b8c-b7ae-c63ad02ead7a"
                  :data="uploadData">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload> -->
          <Upload action="http://11.23.254.120/citydew-filesystem/upload"
                  :on-success="handleSuccess"
                  :default-file-list="defaultList"
                  :on-error="handError"
                  :on-format-error="handleFormatError"
                  :data="uploadData"
                  :format="['zip','shp','rar']">
            <!-- :before-upload="handleUpload" -->
            <p solt="tip">请选择已rar,zip,shp为后缀的文件名</p>
            <Button icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
          <div v-if="file !== null">上传文件: {{ file.name }} <Button type="text"
                    @click="manualUpload"
                    :loading="loadingStatus">{{ loadingStatus ? '上传' : '点击上传' }}</Button></div>
        </FormItem>
        <FormItem prop="remarks"
                  label="备注：">
          <Input type="text"
                 v-model="formInline.remarks"
                 placeholder="备注"
                 size="large"
                 :autofocus="true"
                 @keyup.enter.native="modalOK('formInline')" />
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="info"
              @click="modalOK('formInline')">确定</Button>
      <Button type="success"
              @click="modalCancle('formInline')">取消</Button>
      <Button type="warning"
              @click="handleReset('formInline')">重置</Button>
    </div>
  </Modal>
</template>
<script>
import DatauploadButton from '../components/DatauploadButton'
import { eventBus } from '../assets/eventBus.js'
import axios from 'axios'
export default {
  name: 'DatauploadList',
  components: {
    DatauploadButton
  },
  data () {
    return {
      formInline: {
        nickname: '',
        contact: '',
        unitname: '',
        address: '',
        tel: '',
        DataUsage: '',
        uploadFile: '',
        remarks: '',
      },
      ruleInline: {
        nickname: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        unitname: [
          { required: true, message: '单位名称不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        tel: [
          { required: true, pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '输入有误', trigger: 'blur' },
        ],
        DataUsage: [
          { required: true, message: '数据用途不能为空', trigger: 'blur' }
        ],
        uploadFile: [
          { required: true, message: '必须选择文件', trigger: 'blur' }
        ],
      },
      defaultList: [],
      uploadData: {
        access_token: '4fb6f435-abc7-4019-be52-dbda23a98362',
        userId: '4fb6f435-abc7-4019-be52-dbda23a98362',
        suolue: '50*50',
        clienntId: '5b5eb97cc600261d000c25fc',
        //  formData.append('file', fileObj)
        // formData.append('access_token', '4fb6f435-abc7-4019-be52-dbda23a98362')
        // formData.append('userId', '4fb6f435-abc7-4019-be52-dbda23a98362')
        // formData.append('suolue', '50*50')
        // formData.append('clienntId', '5b5eb97cc600261d000c25fc')
      },
      file: null,
      loadingStatus: false
    }
  },
  props: {
    modal2: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //  点击确定按钮
    modalOK (name) {
      this.$refs[name].validate((valid) => {
        if (!valid) {
          //  数据有问题,页面提示错误
          this.$Message.error('请检查页面提示')
        } else {
          //  改变json的key
          let data =
          {
            "address": this.formInline.address,
            "dataPurpose": this.formInline.DataUsage,
            "name": this.formInline.nickname,
            "person": this.formInline.contact,
            "remark": this.formInline.remarks,
            "telephone": this.formInline.tel,
            "url": this.formInline.uploadFile,
            "unitName": this.formInline.unitname,
          }
          console.log(data)
          //  提交到后台
          axios.post(this.GLOBAL.serverSrc + '/data/addSourceData', data).then(res => {
            console.log(res)
            this.$Message.success('提交成功')
            eventBus.bus.$emit('modalCancle', true)
            this.handleReset(name)
          }).catch(err => {
            this.$Message.error('提交失败')
          })
        }
      })
      console.log(this.formInline)
      //  关闭数据上传弹窗
      eventBus.bus.$emit('modalOK', true)
    },
    //  点击取消按钮
    modalCancle (name) {
      eventBus.bus.$emit('modalCancle', true)
      this.handleReset(name)
    },
    //  点击重置按钮
    handleReset (name) {
      this.$refs[name].resetFields()
      this.defaultList = []

    },
    //  阻止自动上传
    handleUpload (file) {
      this.file = file
      console.log(this.file)
      return false
    },
    //  手动上传
    // manualUpload () {
    //   let url = 'http://10.8.0.10/citydew-filesystem/upload?access_token=2fd254f1-2d48-4b8c-b7ae-c63ad02ead7a'
    //   axios({
    //     method: 'post',
    //     url: url,
    //     'enctype': "multipart/form-data",
    //     'Content-Type': 'multipart/form-data',
    //     // responseType: 'blob', //  上传文件要加的
    //     params: {
    //       file: this.file,
    //       // responseType: 'blob', //  上传文件要加的
    //     }
    //   }).then(function (res) {
    //     console.log(res)
    //   }).catch(function (error) {
    //     console.log(error)
    //   })
    // },
    //  文件上传成功时的钩子，返回字段为 response, file, fileList
    handleSuccess (response, file, fileList) {
      this.$Message.success('提交成功')
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.formInline.uploadFile = "https://translate.google.cn/"
      this.defaultList = [file]
    },
    //  文件上传失败时的钩子，返回字段为 error, file, fileList
    handError (error, file, fileList) {
      this.$Message.error('提交失败')
      console.log(error)
      console.log(file)
      console.log(fileList)
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件格式 ' + file.name + ' 不正确, 请选择已zip或shp结尾的文件'
      });
    },

  }
}
</script>
<style lang="less" scoped >
.title {
  display: inline-block;
  width: 25%;
  text-align: right;
  font-weight: 700;
  font-size: 15px;
  list-style: none;
  line-height: 32px;
  float: left;
}
.content {
  display: inline-block;
  width: 73%;
  text-align: left;
  list-style: none;
}
ul li {
  padding-bottom: 3px;
}
</style>
