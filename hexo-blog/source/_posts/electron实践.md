---
title: electron实践
date: 2017-02-28 10:41:29
tags:
---

# main

## npm慢
默认
> npm config set registry="http://registry.npmjs.org"

换为淘宝npm

> npm config set registry="https://registry.npm.taobao.org/"

或者安装cnpm
> npm install cnpm -g --registry=https://registry.npm.taobao.org


# 替换html页面

## 连续


这样，就在我们的项目目录下新建了一个 package.json 文件，然后我们安装其他 npm 依赖。用下面的命令：
```
npm install --save-dev module_name
npm install --save module_name
```
--save-dev 和 --save 参数的区别是：--save-dev 参数会把添加的 npm 包添加到 devDependencies 下，devDependencies 依赖只在开发环境下使用，而 --save 会添加到 dependencies 依赖下面。

这样，我们就知道了，将 babel、watchify 等等生成代码的依赖库，需要安装在 devDependencies 依赖下面，而像 React 等等，需要安装在 dependencies 下面，以供打包发布后还能使用。