# DELEE · Introducing Website

`delee.top` 的首次访问引入页。一段从信息堆砌、建立边界，到最终抵达个人档案的交互式叙事。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 接入 delee.top

推荐把本项目部署到 `intro.delee.top`。主站在访客没有 `delee_intro_seen=1` Cookie 时跳转到引入页；访客点击页面底部的“正式进入 delee.top”后，引入页会写入一个有效期一年的 `.delee.top` 共享 Cookie，并返回主站。

主站首次访问判断的伪代码：

```ts
if (!cookies.get('delee_intro_seen')) {
  redirect('https://intro.delee.top')
}
```

按钮目标默认是 `https://delee.top`，也可在部署环境中设置：

```bash
VITE_MAIN_SITE_URL=https://delee.top
```

在本地或非 `delee.top` 域名预览时，点击按钮仍会记录到 `localStorage`，但浏览器安全策略不允许该站点写入 `.delee.top` Cookie。
