# 分形图形
## 谢尔宾斯基三角形(随机法生成)
### 原理
1、设A、B、C为三角形三个顶点。随机取一个点P，并且随机连接A、B、C的其中一个点。如A点，取连接PA取其中点，打点标记。
<ClientOnly>
  <MTA/>
</ClientOnly>
<br/>

<div style="dispaly:flex">
  <SierpinskiTriangle :width="300"/>
  <SierpinskiTriangle :width="200"/>
  <SierpinskiTriangle speed/>
</div>

## 蕨类植物叶子(随机法)
### 方程
$\\f_{1}(x,y) = \begin{bmatrix}
   0 & 0 \\
   0 & 0.16
\end{bmatrix}\begin{bmatrix}
   x \\
   y
\end{bmatrix}$<br/>

$\\f_{2}(x,y) = \begin{bmatrix}
   0.2 & -0.26 \\
   0.23 & 0.22
\end{bmatrix}\begin{bmatrix}
   x \\
   y
\end{bmatrix}+\begin{bmatrix}
   0 \\
   1.6
\end{bmatrix}$<br/>

$\\f_{3}(x,y) = \begin{bmatrix}
   -0.15 & 0.28 \\
   0.26 & 0.24
\end{bmatrix}\begin{bmatrix}
   x \\
   y
\end{bmatrix}+\begin{bmatrix}
   0 \\
   0.44
\end{bmatrix}$<br/>

$\\f_{4}(x,y) = \begin{bmatrix}
   0.85 & 0.04 \\
   -0.04 & 0.85
\end{bmatrix}\begin{bmatrix}
   x \\
   y
\end{bmatrix}+\begin{bmatrix}
   0 \\
   1.6
\end{bmatrix}$<br/>
### 由上矩阵方程得到：

第一组函数：

f(x, y) = 0

f(x, y) = 0.16y

第二组函数：

f(x, y) = 0.2x - 0.26y

f(x, y) = 0.23x + 0.22y +1.6

第三组函数：

f(x, y) = -0.15x +0.28y

f(x, y) = 0.26x +0.24y +0.44

第四组函数：

f(x, y) = 0.85x +0.04y

f(x, y) = -0.04x + 0.85y +1.6

得到这四组式子后，我们需要随机抽取一组（抽取概率为，第一组1% ，第二组7% , 第三组7% 第四组百分之85%）

先随机两个随机出数x0和y0放进这一组中计算，每一组的第一个式子代入x0和y0进去得到的f(x,y) 也就是得到的结果，作为x1,

第二个式子代入x0和y0得到的结果y1。

拿到x1和y1后在和上面规则一样，在随机出一组式子，和上面一样，把x1和y1分别代入进去随机出来的哪一组式子的第一个式子和第二个式子得出x2和y2，

这个过程重复20次左右会得到x20 和y20，这个x20和y20我们就作为点的坐标给描出来。

### Canvas绘制
<Leaf/>

## 曼德博集合（Mandelbrot set）
### 复数二次多项式
$\\f_c(z) = z^2 + C$ ，$\\C = x + yi$<br/>

$\\Z_{0} = C$<br/>
$\\Z_{1} = Z_{0}^2 + C = C^2 + C$ <br/>
$\\Z_{2} = Z_{1}^2 + C = (C^2 + C)^2 + C$ <br/>
· · · <br/>
$\\Z_{n+1} = Z_{n} + K$<br/>
<br/>
### Canvas绘制
<MandelbrotSet />