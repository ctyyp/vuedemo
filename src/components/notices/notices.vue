<template>
	<div class="notices">
		<Back></Back>
		<nav class="notice-nav">
	        <ul>
	            <li><span @click="noticeShow" :class="{'current': nShow}">公告</span></li>
	            <li><span @click="messageShow" :class="{'current': mShow}">消息</span></li>
	        </ul>
	    </nav>
		<div class="wrap" v-if="nShow">
			<ul class="notice-list">
	            <li v-for="item in notices.notice">
	                <time>{{item.time | formatDate}}</time>
	                <div class="panel">
	                    <h2>{{item.title}}</h2>
	                    <p>{{item.content}}</p>
	                </div>
	            </li> 
	        </ul>
	        <div class="notice-tip" v-if="!notices">
	            <div class="tip-bg"></div>
	            <p>暂无消息</p>
	        </div>
        </div>
        <div class="wrap" v-if="mShow">
			<ul class="notice-list">
	            <li v-for="item in notices.message">
	                <time>{{item.time | formatDate}}</time>
	                <div class="panel">
	                    <h2>{{item.title}}</h2>
	                    <p>{{item.content}}</p>
	                </div>
	            </li> 
	        </ul>
	        <div class="notice-tip" v-if="!notices">
	            <div class="tip-bg"></div>
	            <p>暂无消息</p>
	        </div>
        </div>
    </div>
</template>
<script>
	const ERR_OK = 0;
	import Back from "../../components/back/back"
	import {formatDate} from '../../common/js/date';
	export default{
		data(){
			return {
				notices:{},
				nShow: true,
				mShow: false
			}
		},
		created(){
			this.$http.get('/api/notices').then((response) =>{
				response = response.body;
				if(response.errno === ERR_OK){
					this.notices = response.data;
				}
			})
		},
		methods:{
			noticeShow(){
				if(!this.nShow){
					this.nShow = !this.nShow
					this.mShow = !this.mShow
				}
			},
			messageShow(){
				if(!this.mShow){
					this.mShow = !this.mShow
					this.nShow = !this.nShow
				}
			}
		},
		filters: {
	      formatDate(time) {
	        let date = new Date(time);
	        return formatDate(date, 'yyyy-MM-dd hh:mm');
	      }
	    },
	    components:{
	    	Back
	    }
	};
</script>
<style>
.notices{position: absolute; left: 0; top: 0; z-index: 9; padding-top: 3rem; width: 100%; min-height: 100%; background-color: #f9f9f9;}
.notice-nav{position: fixed; top: 3rem; left: 0; width: 100%; height: 3rem; line-height: 3rem; background-color: #fff; border-bottom: 1px solid #f2f2f2;}
.notice-nav ul{overflow: hidden; padding: 0 2rem;}
.notice-nav ul li{float: left; width: 40%; text-align: center; margin: 0 5%;}
.notice-nav ul li span{display: block;}
.notice-nav ul li .current{border-bottom: 2px solid #109cfe;}
.notice-list{padding: 4rem 1rem 0;}
.notice-list li{margin-bottom: 1rem;}
.notice-list li time{display:block; text-align: center; color: #999; margin-bottom: .5rem;}
.notice-list li .panel{padding:.5rem 1rem; background-color: #fff; border: 1px solid #f2f2f2;}
.notice-list li .panel h2{line-height: 3rem; font-size: 1rem; text-align: left;}
.notice-list li .panel p{color: #999; line-height: 1.8; font-size: .875rem; text-align: justify;}
.notice-tip{position: absolute; top: 30%; left: 50%; margin-left: -5rem; width: 10rem; height: 10rem;}
.notice-tip .tip-bg{margin:0 auto; width: 6rem; height: 6rem; background: url(icon_message.png) no-repeat; background-size: contain; background-position: center;}
.notice-tip p{padding-top:1rem; text-align: center; color: #999;}
</style>