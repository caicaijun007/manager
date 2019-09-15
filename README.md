## 学习 React 和 Ant-Design

一、后台管理的效果图如下：

![manager](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/manager.gif)



二、知识储备：

- React 			  https://react.docschina.org/

- react-router   https://www.npmjs.com/package/react-router

- react-redux    https://react-redux.js.org/

- Ant-Design     https://ant.design/index-cn

- ES6                  http://es6.ruanyifeng.com/

- Less                 http://lesscss.cn/

- webpack         https://www.webpackjs.com/

  

三、问题总结：

1、是否登陆登录，防止未登录越权操作（滑动菜单操作处理）

![1568104874511](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568104874511.png)

2、父级菜单切换

![1568105125016](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568105125016.png)

3、拦截哈希路由地址改变，越权操作

![1568105319450](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568105319450.png)

4、登录之后，显示账号对应角色菜单（菜单递归过滤）

![1568105568466](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568105568466.png)

5、面包屑处理

![1568106146423](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568106146423.png)

6、刷新浏览器后查询条件和数据没保存（本地存储查询条件）

①、初始化state获取本地存储

![1568209179809](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568209179809.png)

②、请求数据成功返回时，存储本地数据，派发动作

![1568209301638](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568209301638.png)

7、react17生命周期函数改变，componentWillMount替换为UNSAFE_componentWillMount
```javascript
   npx react-codemod rename-unsafe-lifecycles
```
注意：你的项目执行上面命令可以解决控制台输出的warning，但是你引用的react第三方插件如果不是最新或没有解决和上面一样问题，同样会在控制台输出warning。





仅供学习参考