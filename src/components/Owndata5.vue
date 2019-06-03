<template>
    <Collapse v-model="value1">
        <Panel name="1">
            资源生产单位
            <div slot="content">
                <ul style="text-align:right;font-weight: 700;float: left;line-height: 32px">
                    <li>单位名称：</li>
                    <li>电话：</li>
                    <li>详细地址：</li>
                    <li>联系人：</li>
                  </ul>
                  <ul>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                  </ul>
                </div>
        </Panel>
        <Panel name="2">
            资源生产组织单位
            <div slot="content">
                <ul style="text-align:right;font-weight: 700;float: left;line-height: 32px">
                    <li>单位名称：</li>
                    <li>电话：</li>
                    <li>详细地址：</li>
                    <li>联系人：</li>
                  </ul>
                  <ul>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                  </ul>
                </div>        </Panel>
        <Panel name="3">
            资源权威来源部门
            <div slot="content">
                <ul style="text-align:right;font-weight: 700;float: left;line-height: 32px">
                    <li>单位名称：</li>
                    <li>电话：</li>
                    <li>详细地址：</li>
                    <li>联系人：</li>
                  </ul>
                  <ul>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                  </ul>
                </div>        </Panel>
        <Panel name="4">
            资源验收监理单位
            <div slot="content">
                <ul style="text-align:right;font-weight: 700;float: left;line-height: 32px">
                    <li>单位名称：</li>
                    <li>电话：</li>
                    <li>详细地址：</li>
                    <li>联系人：</li>
                  </ul>
                  <ul>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                    <li><Input placeholder=" ..." style="width: 300px" /></li>
                  </ul>
                </div>        </Panel>
    </Collapse>
</template>
<script>
    export default {
        data () {
            return {
                value1: '1'
            }
        }
    }
</script>
<style lang="less" scoped>

</style>

