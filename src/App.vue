<template>
	<div id="app">
		<Header></Header>
		<Slider :banners="banners" :swiperOption="swiperOption"></Slider>
		<div class="hot">
			<div class="title-wrapper">
				<h2 class="title">热门推荐</h2>
				<span class="more"><router-link to='/list/衣服'>更多</router-link></span>
			</div>
			<div class="content">
				<ul>
					<li>
						<router-link to="/list/衣服">
							<div class="li-wrapper">
								<img src="./assets/icon_1.png">
								<section>
									<h3>专业洗护</h3>
									<p>鞋类洗涤、护理</p>
								</section>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/list/家居用品">
							<div class="li-wrapper">
								<img src="./assets/icon_4.png">
								<section>
									<h3>当季健康洗</h3>
									<p>家具用品 精心洗护</p>
								</section>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/list/皮具">
							<div class="li-wrapper">
								<img src="./assets/icon_3.png">
								<section>
									<h3>皮服、皮具</h3>
									<p>洗护、修补、翻新</p>
								</section>
							</div>
						</router-link>
					</li>
					<li>
						<router-link to="/list/奢侈品">
							<div class="li-wrapper">
								<img src="./assets/icon_2.png">
								<section>
									<h3>奢侈品护理</h3>
									<p>高端精洗 专业修复</p>
								</section>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="explain">
			<div class="order-btn">
				<router-link to="list/衣服"><img src="./assets/btn_1.png"></router-link>
			</div>
			<ul>
				<li><router-link to="list/衣服"><img src="./assets/icon_5.png"><span>价目列表</span></router-link></li>
				<li><router-link to="/orderProcess"><img src="./assets/icon_6.png"><span>下单流程</span></router-link></li>
				<li><router-link to="/service"><img src="./assets/icon_7.png"><span>服务范围</span></router-link></li>
				<li><router-link to="/center/about"><img src="./assets/icon_8.png"><span>联系我们</span></router-link></li>
			</ul>
		</div>
		<div class="item user-review">
			<div class="title"><h2>用户评价</h2><router-link to="/ratings">更多</router-link></div>
			<div class="review-container" v-if="ratings">
				<div class="ur-card" v-for="(item,index) in ratings" v-if="index<3">
	        		<div class="user-name"><i></i><h4>{{item.userName}}</h4></div><div class="score"><div :class="{'star-1':item.score<=1,'star-2':item.score>1 && item.score<=2,'star-3':item.score>2 && item.score<=3,'star-4':item.score>3 && item.score<=4,'star-5':item.score>4 && item.score<=5,}"></div></div>
	        		<div class="clear"></div>
	        		<div class="r-content">{{item.content}}</div>
	        		<div class="time">{{item.time}}</div>
	        	</div>
        	</div>
		</div>
		<footerbar></footerbar>
		<router-view></router-view>

	</div>
</template>
<script>
	import Header from "./components/header/header"
	import Slider from "./components/slider/slider"
	import footerbar from "./components/footerbar/footerbar"
	export default {
		name: 'App',
		data(){
			return {
				notices:{},
				banners:[
					'http://xinjiecheng.bmsq.cn/upload/2017/12/25/20171225052405371.jpg'
				],
				swiperOption:{
                  direction:'horizontal',
                  initialSlide: 0,
                  loop:true,
                  autoplay:1000,
                  paginationType:'fraction',
                  pagination: {
		             el: '.swiper-pagination',
		             clickable: true,
		          },
              }
			}
		},
		computed:{
			ratings(){
				return this.$store.state.ratings
			}
		},
		mounted(){
			this.$store.dispatch('getRatings')
		},
		components:{
			Header,
			Slider,
			footerbar
		}
	};
</script>
<style>
#app{height: 100%; overflow-y: auto; padding-bottom: 4rem;}
.hot{padding: .5rem; background-color: #fff;}
.hot .title-wrapper{border-bottom: 1px solid #eee; overflow:hidden; height: 2.4rem; line-height: 2.4rem;}
.hot .title {float: left; display: inline-block; font-size: 1rem; color: #282828;}
.hot .title:before{content: ""; position: relative; top: .1875rem; margin-right: .375rem; display: inline-block; width: .25rem; height: 1rem; background-color: #109cfe;}
.hot .title-wrapper span{color: #858585; float: right;}
.hot .content ul{overflow: hidden; padding-top: .5rem}
.hot .content li{float: left; width: 50%; padding: .5rem; text-align: center; line-height: 1.4;}
.hot .content li .li-wrapper{display: block; width: 100%; height: 100%; border:1px solid #e5e5e5; padding: 1rem 0 .5rem;}
.hot .content li img{margin: 0 auto; height: 2.5rem;}
.hot .content li section{padding-top: .5rem;}
.hot .content li h3{color: #282828; font-size: 1rem;}
.hot .content li p{color: #858585; font-size: .875rem;}
.hot .content li a{display: block;}
.explain{padding:.5rem; background-color: #fff;}
.explain .order-btn{padding: 1.5rem 0;}
.explain .order-btn img{width: 100%;}
.explain ul{overflow: hidden; padding-bottom: 1rem;}
.explain li{width: 25%; text-align: center; float: left;}
.explain li a{color: #282828;}
.explain li img{margin: 0 auto .5rem; width: 4rem;}
.explain li span{display: block;}
.user-review{padding: .5rem; background-color: #fff;}
.user-review .title{border-bottom: 1px solid #eee; overflow:hidden; height: 2.4rem; line-height: 2.4rem;}
.user-review .title h2{float: left; display: inline-block; font-size: 1.25rem; color: #282828;}
.user-review .title h2:before{content: ""; position: relative; top: .1875rem; margin-right: .375rem; display: inline-block; width: .25rem; height: 1.25rem; background-color: #109cfe;}
.item .title a{color: #858585; float: right;}
.review-container{padding: .5rem; width: 100%;}
.user-review .ur-card{overflow:hidden; padding:.5rem; width:100%; border:1px solid #e5e5e5; background-color: #fafafa; line-height: 1.6; margin-bottom: .5rem; display: inline-block;}
.user-review .user-name{float: left; height: 1.5rem; line-height: 1.5rem;}
.user-review .user-name i{position:relative; top:.125rem; display:inline-block; width: 1rem; height: 1rem; background: url(assets/icon_personal.png) no-repeat; background-size: contain; margin-right: .5rem;}
.user-review .user-name h4{display: inline-block; font-size: .875rem; color: #282828;}
.user-review .score{position: relative; float: right; margin-top: 6px; width: 74px; height: 12px; background: url(assets/icon_score.png) no-repeat 0 -12px;}
.user-review .score div{position: absolute; height: 12px; background-image: url(assets/icon_score.png); background-repeat: no-repeat;}
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
