<style scoped lang = "less">
.recycle {
	margin-top: 10px;
}
.table {
	margin: 0 auto;
	width: 99%;
}
.time {
	/* margin-left: 5%; */
	margin-top: 15px;
}
.add-btn {
	margin-left: 20px;
}
.del-btn {
	margin-left: 10px;
}
</style>
<template>
	<div id="recyclebin">
		<form class="table">
			<div class="time">
				标题：
				<Input placeholder=" ..." clearable style="width: 200px" />
				发布时间:
				<DatePicker
					type="datetime"
					placeholder="开始时间"
					@on-change="getstarttime"
					style="width: 200px;"
				></DatePicker>
				-
				<DatePicker
					type="datetime"
					placeholder="结束时间"
					@on-change="getendtime"
					id="endtime"
					style="width: 200px"
				></DatePicker>
				<Button type="primary" icon="ios-search" @click="search" class="serch-btn">
					搜索
				</Button>
        <div class="ib fr">
				<Button type="info" class="add-btn">新增</Button>
				<Button type="error" @click="del" class="del-btn">删除</Button>
        </div>
			</div>

		</form>
    <Table
				border
				ref="selection"
				:columns="columns"
				:data="data"
				style="margin-top: 15px;"
			></Table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			starttime: null,
			endtime: null,
			columns: [
				{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '标题',
					key: 'number'
				},
				{
					title: '缩略图',
					key: 'servicename'
				},
				{
					title: '链接地址',
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
					key: 'action',
					width: 200,
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
