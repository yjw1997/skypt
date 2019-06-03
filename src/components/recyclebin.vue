<style lang="less" scoped>
.recycle{
	margin-top: 10px;
}
.table{
	margin:0 auto;
	width: 99%;
}
.time{
	margin-left: 20px;
}
.del-btn{
	float:right;
	/* margin-right: -127%; */
}
.serch-btn{
	/* float: right; */
	/* margin-right: -5.5%; */
}
</style>
<template>
    <div id="recyclebin">
		<form class="table">
			<Row>
				<Col>
					<div class="time">
						删除日期:
						<DatePicker type="datetime" placeholder="开始时间" @on-change="getstarttime" style="width: 200px;"></DatePicker>
						-
						<DatePicker type="datetime" placeholder="结束时间" @on-change="getendtime" id="endtime" style="width: 200px"></DatePicker>
						<Button type="primary" icon="ios-search" @click="search" class="serch-btn">搜索</Button>
						<Button type="error" @click="del" class="del-btn">删除</Button>
					</div>
				</Col>
			</Row>
			 <Table border ref="selection" :columns="columns" :data="data" style="margin-top: 15px;"></Table>
		</form>
    </div>
</template>
<script>
export default {
  data () {
	  return {
			starttime:null,
			endtime:null,
            columns: [
					{
				    type: 'selection',
				    width: 60,
				    align: 'center'
					},
                    {
                        title: '原位置',
                        key: 'position',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.position)
                            ]);
                        }
                    },
                    {
                        title: '删除日期',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '还原')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        position: '我的空间\\申请列表',
                        date: '2019-03-07 00:00:00',
                    },
                    {
                        position: '我的空间\\我的数据\\我拥有的数据',
                        date: '2018-03-07 00:00:00',
                    }
                ]
            }
        },
  methods: {
	   getstarttime(datetime) {
			this.starttime = datetime
			console.log("1=============",this.starttime)
		},
		getendtime(datetime) {
			this.endtime = datetime
			console.log("2=============",this.endtime)
				},
	  del:function(){
	  },
	  search:function(){
		if(this.endtime<this.starttime){
			alert("结束时间不能小于开始时间，请重新选择")
		}
	  }
  }
}
</script>
