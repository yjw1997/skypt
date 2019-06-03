<template>
  <div class="input">
    <div class="ib">
      {{str1}}：
      <Select style="width:200px"
              v-model="model1">
        <Option v-for="item in SelectData"
                :value="item.approvalStatusid"
                :key="item.approvalStatusid">{{ item.approvalStatusname }}</Option>
      </Select>
    </div>
    <div class="ib"
         v-if="showthis">
      {{str2}}：
      <Select style="width:200px"
              v-model="model2">
        <Option v-for="item in statueData"
                :value="item.serviceStatusid"
                :key="item.serviceStatusid">{{ item.serviceStatusname }}</Option>
      </Select>
    </div>

    <div class="ib fr">
      <Button type="primary"
              @click="resServer"
              v-if="showthis">{{str3}}</Button>
      <Button type="primary">{{str4}}</Button>
    </div>
    <div class="ib fr p15lr">
      <Button type="primary"
              @click="search">搜索</Button>
    </div>
    <Modal v-model="modal"
           title="服务注册"
           width="1100"
           class="tc"
           @on-visible-change="changeModal">
      <router-view></router-view>
      <div slot="footer">
        <Button type="primary"
                v-if="current !== 0"
                @click="Previous">上一步</Button>
        <Button type="info"
                @click="next"
                v-if="current !== 2">下一步</Button>
        <Button type="info"
                v-if="current === 2"
                @click="sumbit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { eventBus } from "../assets/eventBus.js";
import { constants } from 'fs';
export default {
  name: "service-inputlist",
  data () {
    return {
      modal: false,
      current: 0,
      select: "GIMS 地图服务",
      model1: -1,
      model2: -1,
      url: '',
      appData: {
        serType: '',
        publishDate: '',
        publishUnit: '',
        version: '',
        keyword: '',
        serName: '',
        url: '',
        serByName: '',
        summary: '',
        unitName: '',
        city: '',
        unitAddress: '',
        detailAddress: '',
        contact: '',
        postCode: '',
        unitName: '',
        publishDate: '',
        country: '',
        fax: '',
        province: '',
        mailBox: '',
      },
    };
  },
  mounted () {
    var self = this;
    eventBus.bus.$on("selectVal", function (data) {
      console.log(data);
      self.select = data;
    });
  },
  methods: {
    // 点击搜索按钮
    search () {

      // 获取所有数据传到父组件
      let data = {
        SelectDataVal: this.model1,
        statueDataVal: this.model2
      }
      console.log(data)
      this.$emit("listentochildevent", data)
    },
    // 点击服务注册按钮
    resServer () {
      this.modal = true;
      // 自动加载第一个页面
      this.$router.push({ path: "/myservice/registrationservice/Numone" });
    },
    // 点击上一步
    Previous () {
      if (this.select === 'GIMS 地图服务') {
        this.GLOBAL.URL = ''
      }
      if (this.current === 1) {
        this.$router.push({
          name: "Numone",
          params: { current: this.current + 1, select: this.select }
        });
      } else if (this.current === 2) {
        this.$router.push({
          name: "Numtwo",
          params: { current: this.current + 1, select: this.select }
        });
      }
      if (this.current > 0) {
        this.current--;
      }
    },
    // 点击下一步
    next () {
      if (this.select === 'GIMS 地图服务') {
        this.GLOBAL.URL = ''
      }
      if (this.current === 0) {
        this.$router.push({
          name: "Numtwo",
          params: { current: this.current + 1, select: this.select, url: this.url }
        });
      } else if (this.current === 1) {
        //  获取输入的url
        console.log(this.GLOBAL.URL)
        let data = {}
        if (this.GLOBAL.URL !== '') {
          //  发送请求获取后端数据
          data = {
            checker: null,
            checkerStatus: null,
            checkerTime: null,
            city: null,
            contact: null,
            contactPosition: null,
            country: null,
            delete: 0,
            detailAddress: null,
            detailDesign: null,
            fax: null,
            id: 1,
            keyword: "中国影像地图服务",
            mailBox: null,
            postCode: null,
            province: null,
            publishDate: null,
            publishUnit: null,
            remark: null,
            serAddress: null,
            serByName: "中国影像地图服务",
            serId: "41",
            serName: "cn_img_CGCS2000",
            serOriAddress: "http://",
            serRegisterTime: "2019-05-23 11:56:24",
            serStatus: 0,
            serType: "ADDServer",
            state: null,
            summary: "中国影像地图服务",
            telephone: null,
            unitAddress: null,
            unitName: null,
            updateTime: null,
            url: null,
            version: "1.0.0",
          }
        } else {
          data = {
            checker: null,
            checkerStatus: null,
            checkerTime: null,
            city: null,
            contact: null,
            contactPosition: null,
            country: null,
            delete: null,
            detailAddress: null,
            detailDesign: null,
            fax: null,
            id: null,
            keyword: null,
            mailBox: null,
            postCode: null,
            province: null,
            publishDate: null,
            publishUnit: null,
            remark: null,
            serAddress: null,
            serByName: null,
            serId: null,
            serName: null,
            serOriAddress: null,
            serRegisterTime: null,
            serStatus: null,
            serType: null,
            state: null,
            summary: null,
            telephone: null,
            unitAddress: null,
            unitName: null,
            url: null,
            version: null,
          }
        }
        this.appData = data
        this.GLOBAL.appData = data
        this.$router.push({
          name: "Numthree",
          params: { data: data }
        });
      }
      if (this.current < 2) {
        this.current++;
      }
    },
    //  显示状态发生变化时触发
    changeModal () {
      this.current = 0
      this.select = "GIMS 地图服务"
      this.GLOBAL.URL = ''
    },
    sumbit () {
      console.log(this.GLOBAL.appData)
      this.$post(this.GLOBAL.serverSrc + '/service/addServer', this.GLOBAL.appData).then(res => {
        console.log(res)
        this.$Message.success('服务注册成功,等待审核中')
        this.$emit('addOne', 'go')
        this.modal = false
      }).catch(error => {
        console.log(error)
        this.$Message.error(error.data)
      })
    }
  },
  props: {
    SelectData: {
      type: Array,
      required: true
    },
    statueData: {
      type: Array,
      required: true
    },
    str1: {
      type: String
    },
    str2: {
      type: String
    },
    str3: {
      type: String
    },
    str4: {
      type: String
    },
    showthis: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style scoped lang="less">
.ib {
  display: inline-block;
}
</style>
