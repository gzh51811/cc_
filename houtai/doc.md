## 项目名称：**后台管理系统**

### 开发人员

```
陈渝元、陈聪
```

#### **技术栈**

后端：NodeJs + Koa

前端：HTML5 + CSS + 原生JS + Jquery

UI框架：LayUI

数据库：Mongod

#### **功能**

```text
商品管理（商品列表、商品分类、商品添加、商品删除、商品添加、订单管理）
用户管理（用户列表、用户添加、个人信息修改、用户编辑、用户删除）
登录验证
```

#### 查看演示

超级管理员：账号：chen  密码：123456

管理员：		账号：chenyy 密码：123456

#### **演示地址**

http://47.112.106.172:1811/login.html

#### 目录结构：

```text
│  .gitignore
│  .project
│  doc.md							//说明文档
│  package-lock.json
│  package.json						
│  
└─src
    │  login.html					//登录页面
    │  server.js					//静态资源服务器
    │  
    ├─api
    │  ├─db
    │  │      index.js				//连接数据库
    │  │      
    │  ├─routers					//路由
    │  │      goods.js					
    │  │      index.js				//主路由
    │  │      list.js
    │  │      login_r.js
    │  │      order.js
    │  │      sort.js
    │  │      tokenverify.js
    │  │      upload.js
    │  │      user_add.js
    │  │      user_list.js
    │  │      user_update.js
    │  │      
    │  └─utils
    │          token.js				//token令牌
    │          
    ├─css							//css样式
    │      common.css				
    │      login.css
    │      user_add.css
    │      
    ├─html							//静态页面
    │      index.html						//首页
    │      list.html						//商品列表
    │      list_add.html					//静态页面
    │      list_srot.html					//静态页面
    │      order_list.html					//静态页面
    │      srot_add.html					//静态页面
    │      user_add.html					//添加用户
    │      user_edit.html					//修改个人信息
    │      user_list.html					//用户列表
    │      user_update.html					//编辑用户信息
    │      
    ├─images
    │      
    ├─js
    │      common.js						//公共函数库
    │      jquery-1.10.1.min.js
    │      list.js
    │      list_add.js
    │      list_srot.js
    │      login.js
    │      order_list.js
    │      srot_add.js
    │      user_add.js
    │      user_edit.js
    │      user_update.js
    │      
    ├─layui									//layui框架
    │              
    └─uploads								//图片上传的保存路径

```

?         