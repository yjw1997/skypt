<style scoped lang = 'less'>
.recycle {
	margin-top: 10px;
}
.table {
	margin: 0 auto;
	width: 99%;
}
.time {
	margin-top: 15px;
}
.add-btn {
	margin-left: 0%;
}
.del-btn {
	margin-left: 0px;
}
</style>
<template>
	<div id="recyclebin">
		<form class="table">
			<div class="time">
				标题：
				<Input placeholder=" ..." clearable style="width: 200px" />
				发布状态：
				<Select style="width:200px">
						 <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				发布时间:
				<DatePicker
					type="datetime"
					placeholder="开始时间"
					@on-change="getstarttime"
					style="width: 180px;"
				></DatePicker>
				-
				<DatePicker
					type="datetime"
					placeholder="结束时间"
					@on-change="getendtime"
					id="endtime"
					style="width: 180px"
				></DatePicker>
				<Button type="primary" icon="ios-search" @click="search" class="serch-btn">
					搜索
				</Button>
        </div>
        <div  style="margin-top:10px">
				<Button type="info" class="add-btn">新增</Button>
				<Button type="error" @click="del" class="del-btn">删除</Button>
        </div>
			<Table
				border
				ref="selection"
				:columns="columns"
				:data="data"
				style="margin-top: 15px;"
			></Table>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			starttime: null,
			endtime: null,
			 status: [
                    {
                        value: 'New York',
                        label: '全部'
                    },
                    {
                        value: 'London',
                        label: '通过'
                    },
                    {
                        value: 'Sydney',
                        label: '未通过'
                    }
                ],
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '应用名称',
					key: 'number'
				},
				{
					title: '业主单位',
					key: 'servicename'
				},
				{
					title: '访问地址',
					key: 'servicename1'
				},
				{
					title: '发布时间',
					key: 'type'
				},
				{
					title: '排序',
					key: 'time'
				},
				{
          title: '操作',
          width: 200,
					key: 'action',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h(
								'Button',
								{
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {

										}
									}
								},
								'预览'
							),
							h(
								'Button',
								{
									props: {
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {

										}
									}
								},
								'修改'
							),
							h(
								'Button',
								{
									props: {
										type: 'warning',
										size: 'small'
									},
									on: {
										click: () => {

										}
									}
								},
								'删除'
							)
							 ]);
					}
				}
			],
			data: [
				{
					number: '1',
					servicename: '服务申请',
					servicename1: '服务名1',
					type: '待提交',
					status: '未通过',
					time: '2018-5-22 11:52:22'
				}
			]
		};
	},
	methods: {
		getstarttime(datetime) {
			this.starttime = datetime;
			console.log('1=============', this.starttime);
		},
		getendtime(datetime) {
			this.endtime = datetime;
			console.log('2=============', this.endtime);
		},
		del: function() {},
		search: function() {
			if (this.endtime < this.starttime) {
				alert('结束时间不能小于开始时间，请重新选择');
			}
		}
	}
};
</script>
