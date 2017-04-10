---
title: Android笔记
date: 2017-03-15 11:26:36
tags: [Android,笔记]
---

# android studio的lib和jniLibs
在android studio 中添加jar和so时，将jar文件直接拷贝到项目目录\app\libs下即可，将so文件按照平台分类目录放到 项目目录\app\src\main\jniLibs\平台类别目录下。

这是默认的情况如此操作。

如果将gradle 配置文件修改了，也可以变更上述文件存放的目录。如何修改，网上有很多说明。

但是网上多半没有说明的是：项目编译的时候，相当于有个逻辑的目录，如果这个逻辑的目录与实际的目录一致，则不需要修改gradle配置。如果修改了了配置文件，则可理解为将逻辑的 目录重定向。

假定没有第三方源码模块，那么则修改app目录下的 build.gradle：
```
android{
    ……
    sourceSet{
        main{
                jinLibs.srcDirs = ['newDir'}
            }
    }
}
```
可以看得出是把 main\jinLibs 重定向到新的目录 项目目录\<newDir>

目录区分大小写的。

文件夹里存放的文件类型也可以定义。