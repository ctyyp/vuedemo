<template>
	<div class="ratings-wrapper" v-if="ratings">
		<Back></Back>
		<div class="item user-review review-show">
        	<div class="ur-card" v-for="item in ratings">
        		<div class="user-name"><i></i><h4>{{item.userName}}</h4></div><div class="score"><div :class="{'star-1':item.score<=1,'star-2':item.score>1 && item.score<=2,'star-3':item.score>2 && item.score<=3,'star-4':item.score>3 && item.score<=4,'star-5':item.score>4 && item.score<=5,}"></div></div>
        		<div class="clear"></div>
        		<div class="r-content">{{item.content}}</div>
        		<div class="time">{{item.time}}</div>
        	</div>
		</div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		components:{
			Back
		},
		computed:{
			ratings(){
				return this.$store.state.ratings
			}
		},
		mounted(){
			this.$store.dispatch('getRatings')
		}
	};
</script>
<style>
.ratings-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; padding-top: 3rem; z-index: 9999; overflow-y: auto; padding: 4rem .75rem .75rem;}
.user-review .ur-card{overflow:hidden; padding:.5rem; width:100%; border:1px solid #e5e5e5; background-color: #fafafa; line-height: 1.6; margin-bottom: .5rem;}
.user-review .user-name{float: left; height: 1.5rem; line-height: 1.5rem;}
.user-review .user-name i{position:relative; top:.125rem; display:inline-block; width: 1rem; height: 1rem; background: url(../../assets/icon_personal.png) no-repeat; background-size: contain; margin-right: .5rem;}
.user-review .user-name h4{display: inline-block; font-size: .875rem; color: #282828;}
.user-review .score{position: relative; float: right; margin-top: 6px; width: 74px; height: 12px; background: url(../../assets/icon_score.png) no-repeat 0 -12px;}
.user-review .score div{position: absolute; height: 12px; background-image: url(../../assets/icon_score.png); background-repeat: no-repeat;}
.user-review .star-1{width: 16px;}
.user-review .star-2{width: 31px;}
.user-review .star-3{width: 47px;}
.user-review .star-4{width: 62px;}
.user-review .star-5{width: 74px;}
.user-review .clear{clear: both;}
.user-review .r-content{padding: .5rem 0}
.user-review .review-content{float: left; overflow: hidden; padding-left: 1.5rem; width: 100%; height: 2.4rem; line-height: 2.4rem; font-size: .875rem; white-space: nowrap; text-overflow: ellipsis; color: #666;}
.user-review .time{float: right; font-size: .75rem; color: #999;}
</style>