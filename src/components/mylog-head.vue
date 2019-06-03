<template>
	<div id="head">
		<Row>
			<Col span="12">
			服务名称：
				<Input placeholder="输入服务名称" clearable style="width: 180px" />
			服务类型：
				<Select style="width:180px">
					<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
			</Col>
			<div class="service">
				删除日期:
				<DatePicker type="datetime" placeholder="开始时间" id="starttime" style="width: 180px;"></DatePicker>
				-
				<DatePicker type="datetime" placeholder="结束时间" id="endtime" style="width: 180px"></DatePicker>
				<div class="ib fr"><Button type="primary" icon="ios-search" class="serch-btn">搜索</Button></div>
			</div>

		</Row>
	</div>
</template>

<script>
	import Bus from "../assets/eventBus"
 export default {
	 name:'mylog-head',
	data () {
            return {
                cityList: [
                    {
                        value: '1',
						label:'服务1',
                    },
                    {
                        value: '2',
                        label:'服务2',
                    },
                    {
                        value: '3',
                        label:'服务4',
                    },
                    {
                        value: '4',
                        label:'服务4',
                    },
                    {
                        value: '5',
                        label:'服务5',
                    },
                    {
                        value: '6',
                        label:'服务6',
                    }
                ],
            }
        }
    }
</script>
<style  lang="less" scoped>
	.serch-btn{
		float: right;
		margin-right:5%;
	}
</style>
