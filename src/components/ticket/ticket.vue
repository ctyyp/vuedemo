<template>
	<div class="ticket-wrapper">
		<Back></Back>
		<div class="wrap">
			<div class="ticket-list" v-if="user.tickets">
				<ul>
					<li v-for="item in user.tickets">
						<div class="ticket-img"><img :src="item.avatar"></div>
						<div class="ticket-info">
							<h2>¥{{item.money}}</h2>
							<p class="ticket-use">{{item.restrict}}</p>
							<p>{{item.type}}</p>
							<p>有效期至：{{item.deadline}}</p>
							<span class="use-btn"><router-link to="/list/衣服">使用</router-link></span>
						</div>
					</li>
				</ul>
			</div>
			<div class="ticket-bg" v-else><i></i><p>还没有现金券哟~</p></div>
		</div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		computed:{
			user(){
				return this.$store.state.user
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
.ticket-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #f9f9f9; padding-top: 3rem; overflow-y: auto; padding: 4rem 0 .75rem; z-index: 99999}
.ticket-bg{margin-top: 8rem;}
.ticket-bg i{display: block; margin: 0 auto 1rem; width: 10rem; height: 5rem; background:url(../../assets/ticket_bg2.png) no-repeat; background-size: contain;}
.ticket-bg p{text-align: center; color: #999;}
.ticket-list{padding: 0 .75rem;}
.ticket-list li{position:relative; overflow:hidden; width: 100%; padding: .5rem .25rem .25rem .5rem; margin-bottom: .75rem; background-image: url(../../assets/ticket_bg.png); background-repeat:repeat-y; background-position: right top; background-size: cover;}
.ticket-list .ticket-img{width: 6rem; height: 6rem; float: left; margin-right: .5rem;}
.ticket-list .ticket-img img{width: 100%;}
.ticket-list .ticket-info h2{color: #ff8900; font-size: 1.25rem; line-height: 2.25rem;}
.ticket-list .ticket-info p{font-size: .875rem; line-height: 1.2rem; color: #72382a}
.ticket-list .ticket-info .ticket-use{color: #666;}
.ticket-list .ticket-info .use-btn{position: absolute; right: 1rem; top: 1rem; line-height: 1.6rem; display: inline-block; padding: 0 .5rem; border-radius: 3px; background-color: #0ae; color: #fff; font-size: .875rem;}
.ticket-list .ticket-info .use-btn a{color: #fff;}
</style>