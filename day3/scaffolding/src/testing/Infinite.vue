<template>
    <div style="border:2px solid red" infinite-scroll-distance="20" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy">
        <p v-for="(v,k) of n" :key="k">{{v}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            n:40,
            busy:false
        }
    },
    methods:{ 
        loadMore(){
            // 显示加载提示框
            // this.$indicator.open("加载中...")  //简洁方式
            this.$indicator.open({//标准方式 snake double-bounce triple-bounce fading-circle 
                text:"加载中...",
                spinnerType:"fading-circle"
            })
            // 表示禁用
            this.busy=true;
            window.setTimeout(()=>{
                 this.n +=40;
                //  表示启用
                 this.busy=false;
                //  关闭加载提示框
                 this.$indicator.close();
            },5000)
        }
    }
}
</script>