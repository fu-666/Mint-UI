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
    <!-- <h2>{{articles.length}}</h2> -->
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <!-- 因为active="1"初始值为字符串 所以要用item.id.toString() 用模板`${item.id}` -->
      <mt-tab-item
        :id="`${item.id}`"
        v-for="(item,index) of category"
        :key="index"
      >{{item.category_name}}</mt-tab-item>
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面板区域开始 -->
    <div
      class="main"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-immediate-check="true"
      infinite-scroll-disabled="busy"
    >
      <mt-tab-container>
        <mt-tab-container-item>
          <!-- 单一文章信息开始 -->
          <div class="articleItem" v-for="(article,index) of articles" :key="index">
            <!-- 文章标题开始 -->
            <router-link :to="`/article/${article.id}`">
              <div class="articleItem-header">{{article.subject}}</div>
              <!-- 文章标题结束 -->
              <!-- 文章图文信息开始 -->
              <div class="articleItem-wrapper">
                <!-- 文章图像开始  -->
                <div class="articleImg" v-if="article.image !=null">
                  <!-- 实现懒加载 -->
                  <img v-lazy="article.image" />
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
      articles: [],
      // 当前状态
      busy: false,
      // 初始化页码
      page: 1,
      // 存储总页数(初始值)
      pagecount: 0
    };
  },
  methods: {
    loadData(id, page) {
      // 修改当前的状态
      this.busy = true;
      // 加载提示框
      this.$indicator.open({
        text: "加载中。。。",
        spinnerType: "double-bounce"
      });
      this.axios
        .get("/articles", {
          params: {
            id: id,
            page: page
          }
        })
        .then(res => {
          // 获取总页数
          this.pagecount = res.data.pagecount;
          // 获取文章信息
          let articles = res.data.results;
          articles.forEach(article => {
            if (article.image != null) {
              article.image = require("../assets/images/articles/" +
                article.image);
            }
            this.articles.push(article);
          });
          // 修改状态
          this.busy = false;
          // 关闭
          this.$indicator.close();
        });
    },
    // 向下滚动时调用的方法
    loadMore() {
      // 页码累加
      this.page++;
      // 调用loadData()方法
      if (this.page <= this.pagecount) {
        this.loadData(this.active, this.page);
      }
    }
  },
  mounted() {
    // 需要发送HTTP请求以获取服务器数据
    this.axios.get("/category").then(res => {
      // 获取服务器返回的结果
      let results = res.data.results;
      // 将服务器返回结果存储到category变量中
      this.category = results;
    });
    // // 发送Http请求以获取服务器中默认分类下包含的文章数据
    // this.axios.get('/articles',{params:{
    //   id:this.active,
    //   // 初始页面
    //   page:1
    // }}).then(res=>{
    //    // 将获取到的文章数据赋予变量articles
    //   let articles=res.data.results;
    //    // 循环articles变量,然后通过require语句来动态加载图片
    //   articles.forEach(article=> {
    //     // 因为某些文件不存在缩略图,其实根本的原因是:
    //         // articles数据表的image字段允许为空
    //     if(article.image != null){
    //     article.image=require('../assets/images/articles/'+article.image);
    //   }
    //   // 证明无论是否有图片都将其添加到了articles数组中
    //   this.articles.push(article);
    //   });
    // });
    this.loadData(this.active, 1);
  },
  watch: {
    active(value) {
      // 清空之前所有的数据
      this.articles = [];
      // 将页码重置为1
      this.page = 1;
      // 此时的value代表的切换后的顶部选项卡的ID
      // 既然id(分类ID)已经知道了，那么此时就需要发送请求以获取服务器的相关数据
      // this.axios.get('/articles',{params:{
      //   id:value,
      //   page:this.page
      // }}).then(res=>{~
      //   let articles=res.data.results;
      //   articles.forEach(article=>{
      //     if(article.im age != null){
      //       article.image=require('../assets/images/articles/'+article.image);
      //     }
      //     this.articles.push(article);
      //   });
      // });
      // 调用loadData()方法
      this.loadData(value, this.page);
    }
  }
};
</script>