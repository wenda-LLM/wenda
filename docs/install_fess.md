# FESS 安装教程
## win系统
1. 懒人包中下载fess-14.7.0-with-jdk.7z
2. 解压到平时放软件的盘
3. 打开解压出来的fess-14.7.0-with-jdk\bin目录
4. 双击fess.in.bat
5. 双击fess.bat. 弹出命令行运行框. 将其最小化
6. 打开浏览器. 打开网址http://localhost:8080/
7. 点击右上角log in  输入账号:admin 密码：wenda 进行登录
8. 点击侧边栏中的Crawler. 点击File System
9. 点击右上角的Create New
10. Name输入便于记忆的资料库的名字
11. Paths输入资料库的地址（格式示例：file:///E:/pdf）
12. 其余选项保持默认. 下滚至最下方点击Create
13. 自动返回File System页面. 点击刚才创建的选项（自己输入的Name）
14. 点击Create new job. 点击Create
15. 进入侧边栏的System内的Scheduler. 可以看到很多任务
16. 目录的前面可以看到刚刚创建的job（示例：File Crawler - pdf search）. 点击进入
17. 点击Start now. 刷新界面即可看到该任务正在运行. running
18. 此时fess就在爬取文件的名字和内容. 可以在资源管理器看到cpu有负载
19. 挂机。等待爬取完成即可尝试搜索关键词

## linux系统
1. 安装JDK 
```
wget https://download.java.net/java/17/latest/jdk-17_linux-x64_bin.tar.gz
sudo tar xvf jdk-17_linux-x64_bin.tar.gz -C /usr/local/
```
解压后，JDK 17 将被安装在 /usr/local/jdk-17 目录中。

配置环境变量。要在系统中使用 JDK 17，您需要将其添加到 PATH 环境变量中。您可以使用以下命令将其添加到 /etc/profile 文件中：

```
 rm -f /etc/alternatives/java
 ln -s /usr/local/jdk-17.0.6/bin/java /etc/alternatives/java
     echo export JAVA_HOME=/usr/local/jdk-17.0.6 >>/etc/profile
     echo export PATH='$PATH':'$JAVA_HOME'/bin >>/etc/profile
     echo export CLASSPATH=.:'$JAVA_HOME'/lib/dt.jar:'$JAVA_HOME'/lib/tools.jar >>/etc/profile
     source /etc/profile
```
确认安装。您可以使用以下命令检查 JDK 17 是否已成功安装：
```
java -version
```
如果一切正常，您应该会看到类似以下内容的输出：

openjdk version "17.0.1" 2021-10-19
OpenJDK Runtime Environment (build 17.0.1+12-39)
OpenJDK 64-Bit Server VM (build 17.0.1+12-39, mixed mode, sharing)

2. 安装fess
下载fess
解压fess
```
unzip fess-14.7.0.zip
cd bin
 ./fess -d
```
