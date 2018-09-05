<template>
	<div class="comment-wrapper" ref="comment">
		<div class="comment-back"><img src="../../assets/icon_close.png" @click="hide"></div>
		<div class="comment-box review-show">
            <div class="order-info">
                <p><span>订单编号：</span>{{orderList.orderNumber}}</p>
            </div>
            <div class="score-box">
                <div class="score">
                    <ul>
                        <li @click="oneStarHandle">1</li>
                        <li @click="twoStarHandle">2</li>
                        <li @click="threeStarHandle">3</li>
                        <li @click="fourStarHandle">4</li>
                        <li @click="fiveStarHandle">5</li>
                    </ul>
                    <div class="stars">
                        <div :class="{'star-1':oneStar}"></div>
                        <div :class="{'star-2':twoStar}"></div>
                        <div :class="{'star-3':threeStar}"></div>
                        <div :class="{'star-4':fourStar}"></div>
                        <div :class="{'star-5':fiveStar}"></div>
                    </div>
                </div>
                <p>（请给予星评价）</p>
            </div>
        </div>
        <div class="comment-wrap">
            <div class="content">
                <form>
                    <textarea placeholder="宝贝满足你的期待吗？说说你的使用心得，分享给想买的他们吧！"></textarea>
                    <input type="submit" name="" value="立即评价">
                </form>
            </div>
        </div>
	</div>
</template>
<script>
	export default{
		props:{
			orderList:{
				type:Object
			}
		},
		data(){
			return{
				oneStar:false,
				twoStar:false,
				threeStar:false,
				fourStar:false,
				fiveStar:false,
				showFlag:false
			}
		},
		methods:{
			oneStarHandle(){
				this.oneStar=true,
				this.twoStar=false,
				this.threeStar=false,
				this.fourStar=false,
				this.fiveStar=false	
			},
			twoStarHandle(){
				this.oneStar=true,
				this.twoStar=true,
				this.threeStar=false,
				this.fourStar=false,
				this.fiveStar=false	
			},
			threeStarHandle(){
				this.oneStar=true,
				this.twoStar=true,
				this.threeStar=true,
				this.fourStar=false,
				this.fiveStar=false	
			},
			fourStarHandle(){
				this.oneStar=true,
				this.twoStar=true,
				this.threeStar=true,
				this.fourStar=true,
				this.fiveStar=false	
			},
			fiveStarHandle(){
				this.oneStar=true,
				this.twoStar=true,
				this.threeStar=true,
				this.fourStar=true,
				this.fiveStar=true	
			},
			hide(){
				this.$emit('hidden')
			}
		}	
	};
</script>
<style>
.comment-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; padding-top: 3rem; overflow-y: auto; padding: 4rem .75rem .75rem; z-index: 99999}
.comment-back{position: absolute; left: 0; top: 0; height: 3rem; width: 100%; line-height: 3rem; border-bottom: 1px solid #efefef;}
.comment-back img{position: absolute; left: 1rem; top: 1rem; width: 1rem; height: 1rem; }
.score-box .score{position: absolute; left: 50%; margin-top: 6px; width: 74px; height: 12px; background: url(../../assets/icon_score.png) no-repeat 0 -12px; transform: translate(-50%,0);}
.score-box .score div{position: absolute; height: 12px; background-image: url(../../assets/icon_score.png); background-repeat: no-repeat;}
.score-box .star-1{width: 16px;}
.score-box .star-2{width: 31px;}
.score-box .star-3{width: 47px;}
.score-box .star-4{width: 62px;}
.score-box .star-5{width: 74px;}
.score-box .clear{clear: both;}
.comment-box{position: relative; overflow: hidden; padding:1rem .5rem; border-bottom: 1px dashed #ccc; background-color: #fff;}
.comment-box .order-info{float: left; padding-right: 110px; line-height: 1.4rem; font-size: .875rem; width: 100%;}
.comment-box .order-info p{height: 1.4rem; width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
.score-box{position: absolute; right: 0rem; top: 0}
.score-box ul{position: absolute; top: 0; left: 0; overflow: hidden; width: 75px; z-index: 99;}
.score-box ul li{float: left; width: 15px; height: 12px; text-align: center; line-height: 100px; background: transparent}
.score-box p{padding-top: 1.55rem; font-size: .75rem;}
.comment-wrap{position: relative; background-color: #fff; padding: 1rem .5rem .5rem;}
.comment-wrap textarea{width: 100%; height: 10rem; outline: none; border: #dcdcdc solid 1px; border-radius: 5px; padding: .5rem;}
.comment-wrap input{position: absolute; bottom: -4rem; width: calc(100% - 1rem); height: 3rem; background-color: #109cfe; color: #fff; border-radius: 5px; border: none; font-size: 1.25rem;}
</style>