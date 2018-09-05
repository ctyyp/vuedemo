<template>
	<div class="address-wrapper"  v-if="user.addressManage">
		<Back></Back>
		<ul class="address-list">
            <li v-for="(item,index) in user.addressManage.addressList">
                <div class="name-address">
                    <p class="na-name">{{item.names}}&nbsp;{{item.sex}}&nbsp;{{item.phoneNumber}}</p>
                    <p class="na-address">{{item.address}}</p>
                </div>
                <div class="edit-btn">
                    <span @click="editItem(index)"><img src="../../assets/icon_edit.png"></span>
                    <span @click="deleteHandel(index)"><img src="../../assets/icon_delete.png"></span>
                </div>
                <div class="add-wrapper" v-if="showEdit">
                	<div class="close-btn" @click="showEdit=!showEdit"><img src="../../assets/icon_close.png"></div>
		        	<div class="address-box">
					<div class="address-item address-person">
						<span>联系人</span><input type="text" v-model="addName" name="" placeholder="联系人不能超过10个字" maxlength="10">
					</div>
					<div class="address-item address-sex">
						<span class="man" :class="{'on':active}"><i></i><input type="radio" id="man" v-model="selectSex" value="先生" @click="manHandle"><label for="man">先生</label></span>
						<span class="woman" :class="{'on':actives}"><i></i><input type="radio" id="woman" v-model="selectSex" value="女士"  @click="womanHandle"><label for="woman">女士</label></span>
					</div>
					<div class="address-item address-phone">
						<span>联系电话</span><input type="number" v-model="addPhoneNumber" placeholder="请输入手机号码" maxlength="11">
					</div>
					<div class="address-item address-detailed">
						<span>详细地址</span><textarea placeholder="请填写街道门牌号等详细地址" v-model="addAddress"></textarea>
					</div>
				</div>
				<button class="sure-edit" @click="sureEdit">确定修改</button>
		        </div>
            </li>  
        </ul>
        <div class="add-address" @click="addShow">+&nbsp;新增地址</div>
        <div class="add-wrapper" v-if="showFlag">
        	<div class="close-btn" @click="showFlag=!showFlag"><img src="../../assets/icon_close.png"></div>
        	<div class="address-box">
			<div class="address-item address-person">
				<span>联系人</span><input type="text" v-model="addName" name="" placeholder="联系人不能超过10个字" maxlength="10">
			</div>
			<div class="address-item address-sex">
				<span class="man" :class="{'on':active}"><i></i><input type="radio" id="man" v-model="selectSex" value="先生" @click="manHandle"><label for="man">先生</label></span>
				<span class="woman" :class="{'on':actives}"><i></i><input type="radio" id="woman" v-model="selectSex" value="女士"  @click="womanHandle"><label for="woman">女士</label></span>
			</div>
			<div class="address-item address-phone">
				<span>联系电话</span><input type="number" v-model="addPhoneNumber" placeholder="请输入手机号码" maxlength="11">
			</div>
			<div class="address-item address-detailed">
				<span>详细地址</span><textarea placeholder="请填写街道门牌号等详细地址" v-model="addAddress"></textarea>
			</div>
		</div>
		<button class="adress-btn" @click="addItem">确定</button>
        </div>
	</div>
</template>
<script>
	import Back from "../../components/back/back"
	export default{
		data(){
			return {
				addName:'',
				selectSex:'先生',
				addPhoneNumber:'',
				addAddress:'',
				active:true,
				actives:false,
				showFlag:false,
				showEdit:false
			}
		},
		computed:{
			user(){
				return this.$store.state.user
			}
		},
		methods:{
			deleteHandel(index){
				this.user.addressManage.addressList.splice(index,1)
			},
			manHandle(){
				this.active=true;
				this.actives=false;
			},
			womanHandle(){
				this.active=false;
				this.actives=true;
			},
			addShow(){
				this.showFlag=true
			},
			// 点击编辑
			editItem(index){
				this.showEdit=true;
				this.addName=this.user.addressManage.addressList[index].names;
				this.selectSex=this.user.addressManage.addressList[index].sex;
				this.addPhoneNumber=this.user.addressManage.addressList[index].phoneNumber;
				this.addAddress=this.user.addressManage.addressList[index].address;
				if(this.user.addressManage.addressList[index].sex==="先生"){
					this.active=true;
					this.actives=false;
				}else{
					this.active=false;
					this.actives=true;
				};
			},
			// 保存修改
			sureEdit(index){
				this.user.addressManage.addressList.splice(index,1,{
					names:this.addName,
					sex:this.selectSex,
					phoneNumber:this.addPhoneNumber,
					address:this.addAddress
				});
				this.showEdit=false
			},
			// 新增列表确定
			addItem(){
				this.user.addressManage.addressList.push({
					names:this.addName,
					sex:this.selectSex,
					phoneNumber:this.addPhoneNumber,
					address:this.addAddress
				});
				this.showFlag=false
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.$store.dispatch('getUser')
			})
		},
		components:{
			Back
		}
	};
</script>
<style>
.address-wrapper{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #f9f9f9; padding-top: 3rem; z-index: 9999;}
.address-list li{position: relative; overflow:hidden; padding:.75rem .5rem; margin-bottom:.5rem; background-color: #fff; border-bottom: 1px solid #f2f2f2; line-height: 1.6}
.address-list .name-address{float: left; width: calc(100% - 5rem); width: -webkit-calc(100% - 5rem);}
.address-list .name-address .na-name{font-size: 1.125rem;}
.address-list .name-address .na-address {color: #666;}
.address-list .edit-btn{position: absolute; overflow: hidden; top: 50%; right: 1rem; transform: translate(0,-50%); -webkit-transform: translate(0,-50%); }
.address-list .edit-btn span{float: left; width: 1.25rem; margin-left: .5rem;}
.address-list .edit-btn span img{width: 100%;}
.add-address{position: fixed; bottom: 0; left: 0; width: 100%; height: 3rem; line-height: 3rem; background-color: #fff; text-align: center;}
.add-address a{color: #00a0e8; font-size: 1.25rem;}
/*地址填写*/
.add-wrapper{position: fixed; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #f9f9f9; padding-top: 3rem; z-index: 9999;quotes: }
.add-wrapper .close-btn{position: absolute; left: 0; top: 0; height: 3rem; width: 100%; background-color: #fff; border-bottom: 1px solid #efefef;}
.add-wrapper .close-btn img{position: absolute; left: 1rem; top: 1rem; width: 1rem; height: 1rem;}
.address-box{padding:.5rem 1rem 0; background-color: #fff;}
.address-box .address-item{line-height: 4rem; border-bottom: 1px solid #f2f2f2;}
.address-box .address-item span{position: relative; width: 6rem; display: inline-block; font-size: 1.125rem;}
.address-box .address-item input{border:none; outline: none;}
.address-box .address-item input::-webkit-input-placeholder{color: #ccc;}
.address-box .address-sex{padding-left: 7rem}
.address-box .address-sex span i{position:relative; top: .25rem; margin-right: .5rem; display:inline-block; width: 1.2rem; height: 1.2rem; background-image: url(../../assets/icon_check_1.png); background-repeat: no-repeat; background-position: center; background-size: contain;}
.address-box .address-sex input{position: absolute; opacity: 0; left: -.25rem; top: 1.375rem; width: 1.2rem; height: 1.2rem }
.address-box .address-sex .on i{background-image: url(../../assets/icon_checked_1.png);}
.address-box .address-detailed{position: relative; padding-top: 1rem; min-height: 4rem; border-bottom: none;}
.address-box .address-detailed span{position: absolute; left: 0; top: 0; height: 4rem;}
.address-box .address-detailed textarea{padding:0 4rem 0 6rem; width: 100%; border:none; outline: none; resize:none;}
.address-box .address-detailed textarea::-webkit-input-placeholder{color: #ccc;}
.address-box .address-detailed em{position: absolute; top: 1rem; right: 0; display:block; width:2rem; height:3rem; font-style: normal; background:url(../../assets/icon_address.png) no-repeat; background-size: 1.5rem; background-position: center top;}
.address-box .address-detailed em a{display: block; width: 100%; height: 100%; color:#00a0e8;}
.adress-btn{display:block; margin:1rem auto 0; width: calc(100% - 2rem); width:-webkit-calc(100% - 2rem); height: 3rem; background-color: #00a0e8; color: #fff; border:none;}
.sure-edit{display:block; margin:1rem auto 0; width: calc(100% - 2rem); width:-webkit-calc(100% - 2rem); height: 3rem; background-color: #00a0e8; color: #fff; border:none;}

</style>