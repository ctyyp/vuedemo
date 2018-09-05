import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		goodsList:[],
		orderList:[],
		user:{},
		ratings:[],
		cartList:[]
	},
	mutations: {
		setProductList(state,data){
			Vue.http.get('/api/goods').then((response) => {
				response=response.body;
				if(response.errno === 0){
					state.goodsList = response.data
				}
			})
		},
		setOrder(state,data){
			Vue.http.get('/api/order').then((response) => {
				response=response.body;
				if(response.errno === 0){
					state.orderList = response.data
				}
			})
		},
		setUser(state,data){
			Vue.http.get('/api/user').then((response) => {
				response=response.body;
				if(response.errno === 0){
					state.user = response.data
				}
			})
		},
		setRatings(state,data){
			Vue.http.get('/api/ratings').then((response) => {
				response=response.body;
				if(response.errno === 0){
					state.ratings = response.data
				}
			})
		},
		addCart(state,array){
			const isAdded = state.cartList.find(item => item.id === array[0]);
			if(isAdded){
				isAdded.count++;
			}else{
				state.cartList.push({
					id: array[0],
					clothesName:array[1],
					price: array[2],
					count: 1
				})
			}
		},
		cartListAdd(state, id){
			const add = state.cartList.find(item => item.id === id)
			add.count++;
		},
		cartListSubtract(state,id){
			const subtract = state.cartList.find(item =>item.id === id)
			const n = state.cartList.findIndex(item => item.id === id)
			if(subtract.count<2){
				state.cartList.splice(n,1)
			}else{
				subtract.count--
			}
		},
		cartListClear(state){
			state.cartList=[]
		}
	},
	actions:{
		getProductList(context){
			context.commit('setProductList');
		},
		getOrder(context){
			context.commit('setOrder');
		},
		getUser(context){
			context.commit('setUser');
		},
		getRatings(context){
			context.commit('setRatings');
		}
	}
});
export default store