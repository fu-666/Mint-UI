<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="学前端 到学问">
      <div slot="right" class="shortcut">
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登录</router-link>
      </div>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <!-- 因为active="1"初始值为字符串 所以要用item.idtoString() 用模板`${item.id}` -->
      <mt-tab-item
        :id="`${item.id}`"
        v-for="(item,index) of category"
        :key="index"
      >{{item.category_name}}</mt-tab-item>
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面板区域开始 -->
    <div class="main">
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="1" v-for="(v,i) of 4" :key="i">
          <!-- 单一文章信息开始 -->
          <div class="articleItem" v-for="(article,index) of articles" :key="index">
            <!-- 文章标题开始 -->
            <router-link :to="`/article/${article.id}`">
              <div class="articleItem-header">{{article.subject}}</div>
              <!-- 文章标题结束 -->
              <!-- 文章图文信息开始 -->
              <div class="articleItem-wrapper">
                <!-- 文章图像开始  -->
                <div class="articleImg">
                  <img v-if="article.image!==null" :src="(require(`../assets/images/articles/${article.image}`))" />
                </div>
                <!-- 文章图像结束 -->
                <!-- 文章简介开始 -->
                <div class="articleDes">{{article.description}}</div>
                <!-- 文章简介结束 -->
              </div>
            </router-link>
            <!-- 文章图文信息结束 -->
          </div>
          <!-- 单一文章信息结束 -->
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id="2">22</mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="3">33</mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="4">44</mt-tab-container-item> -->
      </mt-tab-container>
    </div>
    <!-- 面板区域结束 -->
    <!-- 底部选项卡开始 -->
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="index">
        首页
        <img
          v-if="selectedTab == 'index'"
          src="../assets/images/index_enable.png"
          alt
          slot="icon"
        />
        <img v-else src="../assets/images/index_disable.png" alt slot="icon" />
      </mt-tab-item>
      <mt-tab-item id="me">
        我的
        <img v-if="selectedTab == 'me'" src="../assets/images/me_enable.png" alt slot="icon" />
        <img v-else src="../assets/images/me_disable.png" alt slot="icon" />
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部选项卡结束 -->
  </div>
</template>
<style scoped>
.shortcut a {
  display: inline-block;
  margin-left: 5px;
  color: #fff;
}
.main {
  margin-bottom: 55px;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>
<script>
export default {
  data() {
    return {
      // 默认被选定的顶部选项卡及面板ID
      active: "1",
      // 默认被选定的底部选项卡ID
      selectedTab: "index",
      // 声明一个变量存储数据，用于循环(所有文章分类数据)
      category: [],
      // 存储指定分类下包含的文章数据
      articles:[],
      author:[]
    };
  },
  mounted() {
    // 需要发送HTTP请求以获取服务器数据
    this.axios.get("/category").then(res => {
      // 获取服务器返回的结果
        let results = res.data.results;
        // 将服务器返回结果存储到category变量中
        this.category = results;
    });
    // 发送Http请求以获取服务器中默认分类下包含的文章数据
    this.axios.get('/articles',{params:{
      id:this.active
    }}).then(res=>{
      let articles=res.data.results;
      this.articles=articles;
    });
  }
};
</script>