<template>
    <div class="swiper-box" rel="swiperBox">
        <swiper :options="swiperOption" class="swiper-container" ref="mySwiper">
            <!-- 轮播项 -->      
            <swiper-slide v-for="banner in banners" :key="banner.id">
                <img :src="banner" class="swiper-image">
            </swiper-slide>
            <!-- 轮播的小圆点 -->
            <div class="swiper-pagination" slot="pagination">
            </div>
        </swiper>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default{
        props:{
            banners:{
                type: Array
            },
            swiperOption:{

            }
        },
        data(){
            return {

            }
        },
        components:{
            swiper:swiper,
            swiperSlide:swiperSlide
        },
        computed: {
            swiper:function() {
            return this.$refs.mySwiper.swiper;
            }
        }
    };
</script>
<style>
    .swiper-box{
        width: 100%;
        margin: 3rem auto 0;
    }
    .swiper-box .swiper-container{
        width: 100%;
        height: 100%;
    }
    .swiper-box img{
        width: 100%;
    }
</style>