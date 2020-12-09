<template>
    <div>
        <div>
            <mt-header title="学前端,到学问"></mt-header>
        </div>
        <mt-field v-model="usename" @blur.native.capture="checkUsename" :state="usenameState" type="text" label="用户名" placeholder="请输入用户名" ></mt-field>
        <mt-field v-model="password"  @blur.native.capture="checkPassword" :state="passwordState" type="password" label="密码" placeholder="请输入密码"></mt-field>
        <mt-button @click="handle" type="primary" size="large">立即登录</mt-button>
        <div></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            usename:'',
            password:'',

            usenameState:'',
            passwordState:''
        }
    },
    methods:{
        checkUsename(){
            let usenameReg=/^[0-9A-Za-z]{6,12}$/;
            if(usenameReg.test(this.usename)){
                this.usenameState='success';
                return true
            }else{
                // 提示框
                this.$toast({
                    message:"用户名错误",
                    position:"middle",
                    duration:1000
                });
                this.usenameState='error'
                return false;
            }
        },
        checkPassword(){
            let passwordReg=/^[0-9QA-Za-z]{8,16}$/;
            if(passwordReg.test(this.password)){
                this.passwordState='success';
                return true
            }else{
                // 提示框
                this.$toast({
                    message:"密码错误",
                    position:"middle",
                    duration:1000
                });
                this.passwordState='error';
                return false;
            }
        },
        handle(){
            if(this.checkUsername() && this.checkPassword()){
            //此时需要将用户名、密码等信息的提交到WEB服务器
      } 
          
        }
    }
}
</script>