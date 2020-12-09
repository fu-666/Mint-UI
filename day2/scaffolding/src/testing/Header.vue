<template>
    <div>
       <!-- fixed：是否布置在页面的顶部 -->
       <mt-header title="好友列表" fixed>
           <!-- 中文实现 slot -->
           <!-- <div slot="left">左</div>
           <div slot="right">右</div> -->

            <!-- 镂空实现 icon  -->
           <!-- <mt-button icon="back" slot="left"></mt-button>
           <mt-button icon="more" slot="right"></mt-button> -->

           <!-- 跳转 router-link slot icon -->
           <router-link to="/" slot="left">
           <mt-button icon="back" ></mt-button>
           </router-link>
           <router-link to="/" slot="right">
           <mt-button icon="more" ></mt-button>
           </router-link>
       </mt-header>
       <div style="margin-top:40px;">
           <p>陈微</p>
           <p>黎有海</p>
           <p>黎小妹</p>
           <p>符桃恋</p>
           <P>张安良</P>
       </div>
       <hr>
       <h3>阿里巴巴董事会</h3>
       <div>
           <p>符小群</p>
           <p>巩宇馨</p>
           <p>郭美君</p>
           <p>郝晓霞</p>
           <P>和金金</P>
           <P>贺瑞瑞</P>
       </div>
    </div>
</template>