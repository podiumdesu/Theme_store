### 需求
整个需求会分为两个部分，Theme Store和Theme List。

提供一套模板管理的平台，开发者可以上传模板到市场，博客用户就可以从市场在线安装模板。


#### Theme Store
Theme Store会在[firekylin官网](firekylin.org)中存在，有一个页面用来展示目前官网收录的主题列表，开发者在上面注册账号以后可以上传自己制作的主题，上传的主题可以在之前的主题列表中展示出来。

url | 主体功能| 详细描述| 实现方式 
---|---|---|---
 http://localhost:8360/| 主页| 添加theme store、log in和register导航| 这个应该不用写了
http://localhost:8360/themestore/theme/index| 主题列表| 最小系统：导航（同主页内容相同），显示所有主题缩略图加姓名，点击主题能跳转到对应详情页；附加功能：主题的筛选，分页|最小系统（已完成）：建立数据库，读取数据表的对应信息（参照文档）；附加功能（未完成）：，应该就是一些数据库的筛选和显示，文档上模型那一块有
http://localhost:8360/themestore/theme/detail/themename/****** | 主题详情页| 最小系统：导航（同主页），显示主题相关信息（名字，作者，预览图，描述，标签，评分，下载次数，最后更新，版本号），预览，下载；附加功能：下载次数的统计，评分的统计；| 最小系统（已完成）：参照文档上的模型、视图、控制器这几章内容即可；附加功能（未完成）：要到登录这块做完之后在开始做。应该还是操作数据库对应字段，增删查改，然后显示出来；
http://localhost:8360/login/index | 登录页面|使用github的认证接口（未完成，正在做）| http://duguying.net/article/%E7%94%A8github%E7%99%BB%E5%BD%95%EF%BC%8Coauth%E5%BC%80%E5%8F%91 ；https://gist.github.com/lizheming/830ed4487cc46c194505
http://localhost:8360/login/register | 注册页面| 还没开始做，应该都是用的github的接口，可能不存在这个页面，是在github上面| row 2 col 2
http://localhost:8360/themestore/theme/update| 主题上传页面| 上传主题的表单（基本字段信息，文件上传），表单验证（包括字段不为空验证，文件格式验证）| 文件上传下载thinkjs官网上有例子，文件上传和下载都要用.zip的压缩文件。字段的验证应该不用说了，文件格式的验证（在服务端解压缩，并且验证，验证标准在firekylin的项目readme.md里面）


#### Theme Store
Theme List是博客后台的一个主题列表，这个主题列表展示的是官网收录的主题，博客用户可以在后台选择并安装这个主题。

博客后台指的是Firekylin博客程序的后台，用户可以从后台管理文章等内容，或者博客进行配置，其中就包括主题皮肤的功能，用户可以在后台挑选官网收录的主题并安装在线为博客切换主题皮肤。

### 具体要求
* theme store是做在[firekylin官网](firekylin.org)上。
* firekylin.org是基于ThinkJS开发的，所以要学习一下think.js
* firekylin的代码在https://github.com/firekylin/firekylin.org上

