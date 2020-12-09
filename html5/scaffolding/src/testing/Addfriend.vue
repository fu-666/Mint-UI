<template>
    <div>
        用户名：<input type="text" placeholder="请输入用户名" v-model="username">
        性别：<input type="text" placeholder="请输入性别" v-model="sex">
        <button @click="handle">确认添加</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            sex:''
        }
    },
    methods:{
        handle(){
            // 构建对象
            let obj={
                name:this.username,
                sex:this.sex=='女' ? 'true' :'false',
            }
            // 提交Mutations
            this.$store.commit('addFriendMutation',obj)
            // 页面跳转
            this.$router.push('/access1')
            // console.log(this.username)
            // console.log(this.sex)
        }
    }
}
</script>