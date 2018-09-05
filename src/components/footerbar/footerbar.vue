<template>
	<div class="footerbar">
		<footer class="footer">
			<ul>
				<li class="current"><router-link to="/"><i></i>首页</router-link></li>
				<li><router-link to="/order/progress"><i></i>订单</router-link></li>
				<li><router-link to="/center"><i></i>我的</router-link></li>
			</ul>
		</footer>
	</div>
</template>
<script>
	export default{

	};
</script>
<style>
.footer{position: fixed; bottom: 0; left: 0; width: 100%; height: 4rem; z-index: 9999; background-color: #fff; border-top: 1px solid #f6f6f6;}
.footer ul{overflow: hidden;}
.footer ul li{float: left; width: 33.33333%; text-align: center; font-size: .875rem;}
.footer ul li i{display: block; margin:.625rem auto .125rem; width: 1.5rem; height: 1.5rem; background-repeat: no-repeat; background-size: contain; background-position:center;}
.footer ul li:nth-child(1) i{background-image: url(../../assets/nav_home.png);}
.footer ul li:nth-child(2) i{background-image: url(../../assets/nav_order.png);}
.footer ul li:nth-child(3) i{background-image: url(../../assets/nav_my.png);}
.footer ul li:nth-child(1) .router-link-exact-active i{background-image: url(../../assets/nav_home_c.png);}
.footer ul li:nth-child(2) .router-link-exact-active i{background-image: url(../../assets/nav_order_c.png);}
.footer ul li:nth-child(3) .router-link-exact-active i{background-image: url(../../assets/nav_my_c.png);}
.footer ul li .router-link-exact-active{color: #00a0d3}
</style>