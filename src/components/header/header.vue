<template>
	<div class="header">
		<nav class="nav">
			<div class="location" @click="show = !show"><span>{{areaName}}</span></div>
			<h1>新洁诚</h1>
			<router-link to="notices">
				<div class="infoBtn"></div>
			</router-link>
		</nav>
		<transition name="fade">
			<div class="area-choice" v-show='show'>
				<ul>
					<li v-for="(area,index) in areaList" @click="changeArea(index)"><span>{{area}}</span></li>
				</ul>
			</div>
		</transition>
		<router-view>
		</router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				areaList:[
					'厦门',
					'泉州',
					'漳州'
				],
				show:false,
				areaName:'厦门',
			}
		},
		methods:{
			changeArea(index){
				this.areaName = this.areaList[index];
				this.show = !this.show
			}
		}
	};
</script>
<style>
.nav{position:fixed; left: 0; top:0; z-index:9; width: 100%; height: 3rem; line-height: 3rem; background-color: #109cfe;}
.nav .location{position: absolute; left: 1rem; top: 0; height: 3rem; overflow: hidden;}
.nav .location span{color: #fff;}
.nav .location span:after{content: ""; display: inline-block; margin-left: .5rem; width: 1rem; height: 1rem; background: url(icon_arrow.png) no-repeat; background-size: contain; background-position: center .5rem;}
.nav h1{text-align: center; color: #fff; font-size: 1.125rem;}
.nav .infoBtn{position:absolute; right:1rem; top:.5rem; width: 1.25rem; height: 2rem; background: url(icon_info.png) no-repeat; background-size: contain; background-position: center;}
.area-choice{position: absolute; top: 3rem; left: 0; z-index: 99; width: 100%; height: 3rem; background-color: #fff; box-shadow: 0 2px 5px rgba(0,0,0,.1)}
.area-choice ul{padding: .5rem 1rem;}
.area-choice li{display: inline-block; padding: 0 .25rem; width: 33.333%; height: 2rem; line-height: 2rem;}
.area-choice li span{display: block; font-size: .875rem; border: 1px solid #e0e0e0; border-radius: 3px; text-align: center;}
.fade-enter-active,.fade-leave-active{transition:.5s; opacity: 1}
.fade-enter,.fade-leave-to{opacity: 0}
</style>