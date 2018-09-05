<template>
	<div class="order-list">
		<ul v-if="orderList">
			<li v-for="(item,index) in orderList.list">
				<div class="order-num"><span><b>订单</b>{{item.orderNumber}}</span><em>{{item.state}}</em></div>
				<div class="order-time">
					<p><b>下单时间</b><span>{{item.orderTime}}</span></p>
					<p><b>预约时间</b><span>{{item.completeTime}}</span></p>
				</div>
				<div class="order-cancel" v-if="item.type>0">
					<span @click="showFlag=!showFlag">取消</span>
				</div>
				<div class="order-cancel" v-if="item.type<0">
					<span @click="oppenComment">评价</span>
				</div>
				<comment :orderList="orderList.list[index]" @hidden="closeComment" v-if="showComment"></comment>
				<div class="order-bg" v-if="showFlag">
					<div class="order-box">
						<section>
							<h2>提示</h2>
							<p>确定取消订单</p>
						</section>
						<div class="order-btn">
							<span class="cancel" @click="showFlag=!showFlag">取消</span>
							<span class="sure" @click="cancelBtn(index)">确定</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import comment from "../../components/comment/comment"
	export default{
		data(){
			return {
				name: this.$route.params.name,
				showFlag:false,
				showComment:false
			}
		},
		computed:{
			orderList(){
				return this.$store.state.orderList.find(item=> item.name === this.name)
			}
		},
		methods:{
			cancelBtn(index){
				this.orderList.list.splice(index,1);
				this.showFlag=false;
			},
			oppenComment(){
				this.showComment=true
			},
			closeComment(){
				this.showComment=false
			}
		},
		beforeRouteEnter(to,from,next){
			next();
		},
		beforeRouteUpdate (to, from, next) {
		    next();
		},
		mounted(){
			this.$nextTick(()=>{
				this.$store.dispatch('getOrder')
			})
		},
		components:{
			comment
		}
	};
</script>
<style>
.order-list{padding:3.5rem .5rem .5rem; overflow-y: auto;}
.order-list li{margin-bottom:.5rem; background-color: #fff; border-radius: 5px; color: #282828; transition: .3s linear; -webkit-transition: .3s linear;}
.order-list .order-num{overflow:hidden; padding: 0 .5rem; line-height: 3rem; border-bottom: 1px solid #ededed;}
.order-list .order-num b{margin-right: .5rem; font-weight: normal;}
.order-list .order-num em{float: right; font-style: normal;}
.order-list .order-time{padding: .5rem;}
.order-list .order-time p{overflow: hidden; line-height: 1.8;}
.order-list .order-time b{float:left; font-weight: normal;}
.order-list .order-time span{float: right; color: #999;}
.order-list .order-cancel{overflow:hidden; padding: 0 .5rem; height: 3rem; border-top: 1px solid #ededed;}
.order-list .order-cancel span{float: right; padding: 0 1rem; margin-top: .6rem; height: 1.8rem; line-height: 1.8rem; border:1px solid #ededed; border-radius: 3px;}
.order-bg{position: fixed; top: 0; width: 100%; max-width: 768px; height: 100%; line-height: 2.4rem; color: #282828; background: rgba(0,0,0,.3); z-index: 999999;}
.order-bg .order-box{position: absolute; top: 50%; left: 50%; left: 50%; padding: 1rem; width: 80%; text-align: center; border-radius: 5px; background-color: #fff; transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%);}
.order-bg .order-box h2{font-size: 1.25rem;}
.order-bg .order-btn{overflow:hidden; margin-top: .5rem;}
.order-bg .order-btn span{display: block; float: left; width: 40%; margin: 0 5%; border-radius: 5px;}
.order-bg .order-btn .cancel{border:1px solid #ededed;}
.order-bg .order-btn .sure{background-color: #00a0e8; color: #fff;}
</style>