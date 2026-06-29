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

本项目部署在 `delee.top` 根域名，并通过 Vercel Routing Middleware 与现有正式站组合：

- 首次访问 `delee.top/`：显示引入页。
- 点击“正式进入 delee.top”：写入有效期一年的 `.delee.top` Cookie，并在同一域名下进入正式站。
- 后续访问 `delee.top/`：直接显示正式站。
- 访问 `delee.top/intro`：无论是否已有 Cookie，都可重新观看引入页。

正式站当前由 `middleware.ts` 透明代理至 `personal-site-psi-sand.vercel.app`，浏览器地址仍保持为 `delee.top`。

按钮目标默认是 `/?enter=1`，也可在部署环境中覆盖：

```bash
VITE_MAIN_SITE_URL=/?enter=1
```

在本地或非 `delee.top` 域名预览时，点击按钮仍会记录到 `localStorage`，但浏览器安全策略不允许该站点写入 `.delee.top` Cookie。
