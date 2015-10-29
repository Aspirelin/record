### JAVA安装路径和JAVA_HOME配置
##### 问题排查
>   昨天更新了MAC 最新的10.11 os x EI Capitan 系统，却发现之前配置的JAVA_HOME环境变量失效了。更新系统果然是要有代价的，只能在折腾一下环境变量的配置了。

---------------------
*   JAVA_HOME环境变量配置失效，首先来查看.bash_profile下得环境变量配置   

```
➜  ~  cat ~/.bash_profile
export JAVA_HOME=/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
export MAVEN_HOME=/Users/aspirerong/Documents/maven-2.2.1
export PATH=$MAVEN_HOME/bin:$PATH
export CLOUDENGINE_HOME=/Users/aspirerong/Documents/cloudengine-3.2.4.2
export PATH=$CLOUDENGINE_HOME/bin:$PATH
export PATH=$PATH:/usr/local/mysql/bin

```
*   发现JAVA_HOME已经配置，说明是配置的路径出问题了，那我们到这个路径下看看 
   
```
➜  ~  cd /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/
cd: no such file or directory: /System/Library/Java/JavaVirtualMachines/1.6.0.jdk/

```
发现是配置的安装路径不对

--------------------
`现在确定原因了，因为之前java JDK，是安装在System，目录下，系统更新是，应该是将原System文件下，内容删除更新了，好吧，那就从新安装一遍`


##### MAC下Java JDK安装&JAVA_HOME配置
Oracle在java jkd 1.7版本后才提供Mac OS的安装版本，但是有时候我们需要安装Java 1.6 这个时候，我们需要安装javaforosx，下周链接见苹果[Java for OS X 2015-001](https://support.apple.com/kb/DL1572?viewlocale=en_US&locale=en_US)下在地址。

*   下载 Java for os x 2015-001并安装后，发现，苹果官网，最新提供的java JDK安装在`/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home`目录下，而不是目录`/System/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home` 
*   所以我们要调整一下 JAVA_HOME配置。
*   到用户目录下，配置.bash_profile或者.zshrc文件，如果没有，自己创建
*   配置好后，要source .bash_profile 使配置生效

----------------------------------
### 相关知识
##### 如何查找java JDK的安装路径
> 之所以我们能在命令行中，使用java等命令，就是因为，我们在/usr/bin/和/usr/local/bin 添加了应用的启动文件的索引，这里java属于系统级应用，所以安装在/usr/bin中，/usr/local/bin中主要用来安装用户程序，我们在安装时，添加-g参数，全局安装，就是安装到了这里。   
  

*   【/usr/bin/java】只是个替身，实际指向【/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/java】  

```
  ~  ls -l /usr/bin/java
lrwxr-xr-x  1 root  wheel  74 10 29 11:28 /usr/bin/java -> /System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/java

```

*    上面提到的【/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/java】其实也不是真正的java，因为Current文件夹是替身，它指向了同目录下的某个版本，例如A文件（这样的好处是装了多个版本java后，可以方便地调整Current指向，使得不同版本java变成系统默认的，通常在【实用工具】->【Java偏好设置】里可以调整）
*    上面提到的A文件夹是安装java后系统生成的。它里面的Commands文件夹下有个java可执行文件，这个java其实调用了真真正正的java原身–>【/Library/Java/JavaVirtualMachines/1.6.0_37-b06-434.jdk/Contents/Home/bin/java】     
   
```
 Versions  ls -al
total 64
drwxr-xr-x  11 root  wheel  374 10 29 11:28 .
drwxr-xr-x  10 root  wheel  340 10 29 11:28 ..
lrwxr-xr-x   1 root  wheel   10 10 29 11:28 1.4 -> CurrentJDK
lrwxr-xr-x   1 root  wheel   10 10 29 11:28 1.4.2 -> CurrentJDK
lrwxr-xr-x   1 root  wheel   10 10 29 11:28 1.5 -> CurrentJDK
lrwxr-xr-x   1 root  wheel   10 10 29 11:28 1.5.0 -> CurrentJDK
lrwxr-xr-x   1 root  wheel   10 10 29 11:28 1.6 -> CurrentJDK
lrwxr-xr-x   1 root  wheel   10 10 29 11:28 1.6.0 -> CurrentJDK
drwxr-xr-x   8 root  wheel  272 10 29 11:28 A
lrwxr-xr-x   1 root  wheel    1 10 29 11:28 Current -> A
lrwxr-xr-x   1 root  wheel   52 10 29 11:28 CurrentJDK -> /Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents

```
`输入 ls -al 就能查看到当前应用的安装路径了`

------------------------------------
上面，讲了一坨，看着挺麻烦，起始还有一个获取Java JDK安装路径的小工具（Mac下）   

*   输入/usr/libexec/java_home来获得java JDK的安装路径   

```
➜  ~  /usr/libexec/java_home
/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home

```
*   当然配置JAVA_HOME时也可以这样配置
JAVA_HOME=/usr/libexec/java_home 

#####  为什么必须配置JAVA_HOME
>  配置java_home与配置path不是一个道理吗，一个应用软件，如果想要java的运行环境吗，从path里读不就行了吗，为什么还要单独配置  

*  JAVA_HOME配置不是必须得，配置的原因只有1个，便于不同版本之间的切换

##### versions/current 是什么意思？
>  我们在查找Java JDK的安装路径时，曾经找到过：`/System/Library/Frameworks/JavaVM.framework/Versions/Current/Commands/java`这个中间索引，这里的current是什么版本呢?

*  current只是一个快捷方式而已，是为了方便设置默认java的。链接到哪里，就是那个版本。

```
通过current，可以在mac中可以保持这个java链接不变，只是改变一下当前的java即可，下面是步骤：

1）打开Finder ： 单击桌面地步的finder图标即可。

2）Application-->Utilities-->Java-->Java Preferences

3)由第二步可以打开“Java Preferences”对话框，选中“General”tab。在下面的“Java Application Runtime Settings”区把需要的java版本拖动到最顶端即可。

最顶端的java就是当前（current）java，这样在改变默认java版本时就不用在/usr/bin下重新设置java链接，而是直接在这里把需要的java拖到最上面就行。
```

##### windows和Macos 在环境变量配置有什么不同？
*   在windows中，javahome的值只是取到版本号的目录即可，但是在mac中有稍微的不同，要去到版本号目录下的Home目录，如：`JAVA_HOME=/System/Library/Frameworks/JavaVM.framework/Versions/1.6.0/Home`


