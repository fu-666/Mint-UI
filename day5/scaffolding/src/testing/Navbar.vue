<template>
  <div>
    <div>
      <div class="top">
        <mt-header title="学前端,到学问"></mt-header>
        <mt-navbar v-model="active">
          <mt-tab-item id="a">
            HTML5
            <img src="../assets/images/html5.png" alt="" slot="icon" />
          </mt-tab-item>
          <mt-tab-item id="b">
            CSS3
            <img src="../assets/images/css3.png" alt="" slot="icon" />
          </mt-tab-item>
          <mt-tab-item id="c">
            JavaScript
            <img src="../assets/images/js.png" alt="" slot="icon" />
          </mt-tab-item>
        </mt-navbar>
      </div>
      <div class="main">
        <!-- 面板开始 -->
        <!-- 方法一 -->
        <!-- <mt-tab-container v-model="active">
          <mt-tab-container-item id="a">零零</mt-tab-container-item>
          <mt-tab-container-item id="b">看看</mt-tab-container-item>
          <mt-tab-container-item id="c">想想</mt-tab-container-item>
        </mt-tab-container> -->


        <!-- 方法二 -->
        <mt-tab-container v-model="selected" swipeable>
          <mt-tab-container-item id="item01">
            <p v-for="(v, k) of 50" :key="k">{{ v }}</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="item02">李敏镐</mt-tab-container-item>
          <mt-tab-container-item id="item03">李钟硕</mt-tab-container-item>
        </mt-tab-container>
        <!-- 面板结束 -->
      </div>
      <!--  底部选项卡开始 -->
      <mt-tabbar v-model="selectedTab" fixed>
          <mt-tab-item id="index">
            首页
            <img v-if="selectedTab == 'index'" src="../assets/images/index_enable.png" alt="" slot="icon">
            <img v-else src="../assets/images/index_disable.png" alt="" slot="icon">
          </mt-tab-item>
          <mt-tab-item id="me">
            我的
            <img v-if="selectedTab == 'me'" src="../assets/images/me_enable.png" alt="" slot="icon">
            <img v-else src="../assets/images/me_disable.png" alt="" slot="icon">
          </mt-tab-item>          
      </mt-tabbar>
      <!--  底部选项卡结束 -->
    </div>
  </div>
</template>
<style scoped>
.top {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 666;
}
.main {
  /* 不会盖住顶部 */
  margin-top: 115px;
  /* 不会盖住底部 */
  margin-bottom: 55px;
}
</style>
<script>
export default {
  data() {
    return {
      active: "a",
      selected: "item01",
      selectedTab:"index"
    };
  },
  watch: {
    // watch()时可以带有两个参数
    // 第一个参数代表新值
    // 第二个参数代表旧值
    active(value) {
      if (value == "a") {
        this.selected = "item01";
      } else if (value == "b") {
        this.selected = "item02";
      } else if (value == "c") {
        this.selected = "item03";
      }
    },
    selectedTab(value){
      if(value=="index"){
        this.$router.push("/")
      }else if(value=="me"){
        this.$router.push("/register")
      }
    }
  },
   
  
};
</script>