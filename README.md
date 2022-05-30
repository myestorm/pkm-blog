# pkm-blog

一套完整的blog静态页面模板。支持明暗模式。响应式页面。

## 安装

```sh
npm install # 安装依赖
npm run dev # 本地开发服务
npm run build # 打包页面
```

## 基本目录结构定义

> 基本框架有2个，jquery和vue。脚手架使用的是vite。可以理解为多页应用。  
> html模板语法采用的ejs，意味着html片段可以用include的方式通用。svg也是一段html片段。  
> 但是有些页面必定是单页模式，如用户中心。可以理解为需要直接展示的内容是纯粹的html，需要大量交互的位置使用的vue。  

```sh
|-- about
|---- index.html # 关于我们
|-- article
|---- index.html # 文章内容
|-- fragments
|---- icons # svg图标
|---- **/*.html # html代码片段
|-- public
|---- **/*.* # 公共的静态资源
|-- src # css和js 源码目录
|---- components # vue组件
|---- scripts # vue组件
|------ components # 组件功能js
|------ utils
|------ *.ts # 页面功能js
|---- scss # 样式
|------ base # 基础的样式
|------ block # 业务块样式
|------ components # 组件样式
|------ *.scss # 页面样式
|-- index.html # 首页
```
