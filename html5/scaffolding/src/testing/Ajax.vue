<template>
    <div>
        <button @click="handle">点金</button>
    </div>
</template>
<script>
export default {
    methods:{
        handle(){
            this.$store.dispatch('getServerData');
            this.$router.push('/access1')
        }
    }
}
</script>