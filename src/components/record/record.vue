<template>
	<div class="record-wrapper">
		<Back></Back>
		<div class="wrap record">
			<div class="title-tab">
				<ul>
					<li :class="{'on': pendingShow}" @click="paddingHandle">待处理<span></span></li>
					<li :class="{'on': completeShow}" @click="completeHandle">已完成<span></span></li>
				</ul>
			</div>
			<div class="record-list" v-if="user.record">
				<ul v-show="pendingShow">
					<li v-for="item in user.record.pending">
						<p>订单编号{{item.number}}<span><em>¥{{item.price}}</em></span></p>
						<p>件数<em>{{item.count}}</em>件</p>
						<p><time>{{item.time}}</time><span>{{item.state}}</span></p>
					</li>
				</ul>
				<ul v-show="completeShow">
					<li v-for="item in user.record.complete">
						<p>订单编号{{item.number}}<span><em>¥{{item.price}}</em></span></p>
						<p>件数<em>{{item.count}}</em>件</p>
						<p><time>{{item.time}}</time><span>{{item.state}}</span></p>
					</li>
				</ul>
				<div class="bottom-tip">----------已经到底啦----------</div>
			</div>
			<div class="empty-bg" v-else><p>暂无交易记录</p></div>
		</div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		data(){
			return {
				pendingShow: true,
				completeShow: false
			}
		},
		computed:{
			user(){
				return this.$store.state.user
			}
		},
		methods:{
			paddingHandle(){
				if(!this.pendingShow){
					this.pendingShow=true;
					this.completeShow=false
				}
			},
			completeHandle(){
				if(!this.completeShow){
					this.completeShow=true;
					this.pendingShow=false;
				}
			}
		},
		mounted(){
			this.$store.dispatch('getUser')
		},
		components:{
			Back
		}
	};
</script>
<style>
.record-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #f9f9f9; padding-top: 3rem; z-index: 9999;}
.record .empty-bg{position:fixed; top:0; left:0; height: 100%; width: 100%; background: url(../../assets/order_bg.png) no-repeat center 30%;}
.record .empty-bg p{position:absolute; top:42%; width: 100%; color: #ccc; text-align: center; font-size: 1.25rem;}
.record .title-tab{height: 3rem; line-height: 3rem; background-color: #fff;}
.record .title-tab ul{overflow: hidden; text-align: center;}
.record .title-tab ul li{position:relative; float: left; width: 50%;}
.record .title-tab ul li:nth-child(1):after{content: ""; position: absolute; display: block; right: 0; top: .5rem; width: 1px; height: 2rem; background-color: #f2f2f2;}
.record .title-tab ul li span{position:absolute; display: block; bottom:1px; left:0; width: 100%; height: 1px; background-color: #f2f2f2;}
.record .title-tab ul li.on a{color: #00a0e8;}
.record .title-tab ul li.on span{background-color: #00a0e8;}
.record .record-list {background-color: #fff;}
.record .record-list ul li{padding: .5rem 1rem .25rem; border-bottom: 1px dashed #ccc; line-height: 1.6}
.record .record-list ul li p{overflow: hidden;}
.record .record-list ul li p span{float: right;}
.record .record-list ul li p em{color: #ff8900;font-style: normal;}
.record .record-list ul li p time{color: #999;}
.record .record-list ul li p:nth-child(3){font-size: .875rem;}
.record .bottom-tip{text-align: center; line-height: 3rem; color: #666; font-size: .75rem}
</style>