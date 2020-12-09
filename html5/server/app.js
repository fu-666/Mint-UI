// 1加载Express模块
const express=require('express');

// 5加载cors模块
const cors=require('cors');

// 7加载mysql模块
const mysql=require('mysql');

// 13加载body-parser模块(express在4.5版本以上的都自带)
const bodyParser=require('body-parser');

// 15加载MD5模块
const md5=require("md5");

// 2创建WEB服务器
const server=express();

// 6为所有的http请求使用cors模块
server.use(cors({
    origin:['http://127.0.0.1:8080','http://localhost:8080']
}))

// 13为所有的HTTP请求使用body-parser模块
server.use(bodyParser.urlencoded({
    extended:false
}));

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
    // 计算行总数
    // 总记录数
    let sql='SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?';
    let rowcount;
    pool.query(sql,[id],(error,results)=>{
        if(error) throw error;
        rowcount=(results[0].count)

         // 计算总页数
        let pagecount=Math.ceil(rowcount/pagesize)
        // 查找特定分类下包含的文章数据
        sql='SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? LIMIT ?,?';
        // 执行SQL查询
        pool.query(sql,[id,offset,pagesize],(error,results)=>{
            if(error) throw error;
            res.send({code:200,message:"查询成功",results:results,pagecount:pagecount});
        })
    });
})

// 11获取指定文章信息
server.get('/review',(req,res)=>{
    // 获取地址栏的URL参数---文章ID
    let id=req.query.id;
    // 查找
    let sql='SELECT r.id,subject,content,created_at,nickname,avatar,article_number FROM xzqa_article AS r INNER JOIN xzqa_author AS u ON author_id=u.id WHERE r.id= ?';
    // 执行
    pool.query(sql,[id],(error,results)=>{
        if(error) throw error;
        res.send({code:200,meddage:"查询成功",result:results[0]})
    })
});
// 12 获取文章的评论信息接口
server.get('/comments',(req,res)=>{
// 获取文章的ID
    let id=req.query.id;
    // 查询
    let sql='SELECT c.id,content,username,avatar,created_at FROM xzqa_comments AS c INNER JOIN xzqa_users AS u ON user_id=u.id WHERE article_id= ? ORDER BY c.id LIMIT 1';
    // 执行
    pool.query(sql,[id],(error,results)=>{
        if(error) throw error;
        res.send({code:200,message:"查询成功",results:results})
    });
})
// 14用户注册接口
server.post('/register',(req,res)=>{
    console.log(md5('123456'));
    // 获取用户名和密码信息
    let username=req.body.username;
    let password=req.body.password;
    // 先需要以username为条件进行用户的查找操作
    let sql='SELECT COUNT(id) AS count FROM xzqa_author WHERE username=?';
    // 执行sql查询
    pool.query(sql,[username],(error,results)=>{
        if(error) throw error;
        if(results[0].count){
            res.send({code:201,message:"用户注册失败"});
        }else{
            sql='INSERT INTO xzqa_author(username,password) VALUES(?,MD5(?))';
            // 
            pool.query(sql,[username,password],(error,results)=>{
                if(error) throw error;
                // console.log(results)
                res.send({code:200,message:"注册成功"})
            })
        }
        res.send("OKKOOK")//验证

    })
})
// 15用户登录接口
server.post('/login',(req,res)=>{
    // 获取用户名和密码信息
    let username=req.body.username;
    let password=md5(req.body.password);
    // SQL查询
    let sql='SELECT id,username,nickname,avatar,article_number FROM xzqa_author WHERE username=? AND password=?';
    // 执行SQL
    pool.query(sql,[username,password],(error,results)=>{
        if(error) throw error;
        if(results.length){
            res.send({code:200,message:"登录成功",info:results[0]})
        }else{
            res.send({code:201,message:"登录失败"})
        }
    })
})

// 16 获取用户信息的接口---Vuex的测试数据
server.get('/user',(req,res)=>{
    res.send({name:'web2008',sex:'false'})
})
// 3指定WEB服务器监听端口
server.listen(3000);