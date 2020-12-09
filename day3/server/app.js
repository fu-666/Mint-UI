// 1加载Express模块
const express=require('express');

// 5加载cors模块
const cors=require('cors');

// 7加载mysql模块
const mysql=require('mysql')

// 2创建WEB服务器
const server=express();

// 6为所有的http请求使用cors模块
server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080']
}))

// 8创建mysql连接池
const pool=mysql.createPool({
    // 数据库服务器地址
    host:'127.0.0.1',
    // 数据库服务器端口
    port:3306,
    // 数据库用户的用户名
    user:'root',
    // 数据库用户的密码
    password:'',
    // 数据库名称
    database:'xzqa',
    // 连接数
    connectionLimit:15
})

// 4获取所有文章分类(category的html:要跨域的是：http://127.0.0.1:3000/category)
server.get('/category',(req,res)=>{
    // 查询xzqa_category表的所有数据
    let sql='SELECT id,category_name FROM xzqa_category ORDER BY id';
    pool.query(sql,(error,results)=>{
        if(error) throw error;
        res.send({code:200,message:'查询成功',results:results});
    });
})

// 10 获取指定分类下包含的文章数据
server.get('/articles',(req,res)=>{
    // 获取地址栏URL参数---文章分类ID
    let id=req.query.id;
    // 获取地址栏URL参数---页码
    let page=req.query.page;
    // 每页显示的记录数量
    let pagesize=15;
    // 根据当前页码，并且结合LIMIT语句的标准公式来计算offset
    let offset=(page-1)*pagesize;
    // 查找特定分类下包含的文章数据
    let sql='SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? LIMIT ?,?';
    // 执行SQL查询
    pool.query(sql,[id,offset,pagesize],(error,results)=>{
        if(error) throw error;
        res.send({code:200,message:"查询成功",results:results});
    })
})

// 3指定WEB服务器监听端口
server.listen(3000);
