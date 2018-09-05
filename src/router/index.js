import Vue from 'vue'
import Router from 'vue-router'
import notices from '@/components/notices/notices'
import goods from '@/components/goods/goods'
import list from '@/components/list/list'
import product from '@/components/product/product'
import order from '@/components/order/order'
import orderlist from '@/components/orderlist/orderlist'
import center from '@/components/center/center'
import record from '@/components/record/record'
import address from '@/components/address/address'
import FAQ from '@/components/FAQ/FAQ'
import about from '@/components/about/about'
import offer from '@/components/offer/offer'
import recharge from '@/components/recharge/recharge'
import ratings from '@/components/ratings/ratings'
import ordered from '@/components/ordered/ordered'
import orderProcess from '@/components/orderProcess/orderProcess'
import service from '@/components/service/service'
import password from '@/components/password/password'
import ticket from '@/components/ticket/ticket'

Vue.use(Router)
export default new Router({
  // mode:'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/notices',
      component: notices
    },
    {
      path:'/goods',
      component: goods,
      children:[
        {
          path:'/list/:name',
          component: list
        }
      ]
    },
    {
      path:'/product/:categoryName',
      component:product
    },
    {
      path:'/order',
      component:order,
      children:[
        {
          path:'/order/:name',
          component: orderlist
        }
      ]
    },
    {
      path:'/center',
      component:center
    },
    {
      path:'/center/record',
      component:record
    },
    {
      path:'/center/address',
      component:address
    },
    {
      path:'/center/FAQ',
      component:FAQ
    },
    {
      path:'/center/about',
      component:about
    },
    {
      path:'/center/offer',
      component:offer
    },
    {
      path:'/center/recharge',
      component:recharge
    },
     {
      path:'/ratings',
      component:ratings
    },
    {
      path:'/ordered',
      component:ordered
    },
    {
      path:'/orderProcess',
      component:orderProcess
    },
    {
      path:'/service',
      component:service
    },
    {
      path:'/center/password',
      component:password
    },
    {
      path:'/center/ticket',
      component:ticket
    }
  ]
})
