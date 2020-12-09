<template>
    <div>
        <h1 style="text-align:center">{{this.$store.state.age}}</h1>
        <p style="text-align:center">
            <button @click="ageIn">+</button>
            <button @click="ageDe">-</button>
        </p>
        <p style="text-align:center">
            <router-link to='/access1'>访问VUEX数据的页面1</router-link>&nbsp;&nbsp;
            <router-link to='/access2'>访问VUEX数据的页面2</router-link>&nbsp;&nbsp;
            <router-link to="/addfriend">添加新朋友</router-link>
        </p>
    </div>
</template>
<script>
export default {
    methods:{
        ageIn(){
            // 调用Vuex中的Mutations
            // 提交Mutations
            this.$store.commit('ageIncrementMutation')
        },
        ageDe(){
            // 提交Mutations
            this.$store.commit('ageDecrementMutation')
        }
    }
}
</script>