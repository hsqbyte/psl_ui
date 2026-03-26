<p align="center">
  <img src="assets/psl_ui.svg" width="80" alt="PSL UI">
</p>

<h1 align="center">PSL UI — 协议规范语言 Web 界面</h1>

<p align="center">
  通过现代 Web UI 浏览、可视化和交互 PSL 协议定义。
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README_ZH.md">中文</a>
</p>

---

PSL UI 是 [protospec](https://github.com/hsqbyte/protospec) 项目的 Web 前端。通过 WebAssembly（[protospec-wasm](https://www.npmjs.com/package/protospec-wasm)）在浏览器中直接运行完整的 PSL 协议引擎，无需后端服务。

## 截图

<p align="center">
  <img src="assets/screenshot.png" alt="PSL UI 截图">
</p>

## 功能

- **协议浏览器** — 以层级树形结构浏览 50+ 协议（Ethernet > IPv4 > TCP > HTTP）
- **协议详情视图** — 查看完整的协议定义，包括字段、元数据、RFC 链接和依赖关系
- **比特/字节图** — 协议头部的比特级布局可视化
- **编解码面板** — 交互式将 JSON 编码为二进制十六进制，或将十六进制解码为 JSON
- **十六进制查看器** — 二进制数据的字段颜色高亮显示
- **PSL 源码视图** — 语法高亮的原始 `.psl` 源码展示
- **搜索** — 按名称、RFC 编号、层级或字段名查找协议
- **国际化** — 支持中英文切换
- **WASM 驱动** — 完整协议引擎在浏览器中运行，无需服务器

## 技术栈

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** (Base UI)
- **react-icons** 统一图标方案
- **[protospec-wasm](https://www.npmjs.com/package/protospec-wasm)** — PSL 引擎编译为 WebAssembly

## 架构

本项目遵循 [Feature-Sliced Design (FSD)](https://feature-sliced.design/) 架构标准：

```
src/
├── app/            — 应用入口、路由、全局样式
├── pages/          — 页面组件（按路由组织）
├── widgets/        — 组合 UI 块（Layout、HexViewer、BinaryInspector）
├── features/       — 用户交互功能（编解码、搜索）
├── entities/       — 业务实体（Protocol 数据模型 + hooks）
└── shared/         — 共享基础设施
    ├── ui/         — 基础 UI 组件（shadcn/ui）
    ├── lib/        — 工具函数、WASM 桥接（psl.ts）
    ├── hooks/      — 通用 hooks（主题、移动端、认证）
    ├── i18n/       — 国际化
    └── assets/     — 静态资源
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build
```

## 工作原理

PSL UI 加载 [protospec-wasm](https://www.npmjs.com/package/protospec-wasm) npm 包，该包包含 protospec Go 引擎编译的 WebAssembly 模块。启动时初始化 WASM 模块，50+ 内置协议定义即可在浏览器中使用。

无需 API 服务器——编码、解码和协议浏览全部在客户端完成。

## 相关项目

- [protospec](https://github.com/hsqbyte/protospec) — PSL 引擎和命令行工具（[pkg.go.dev](https://pkg.go.dev/github.com/hsqbyte/protospec)）
- [protospec-wasm](https://www.npmjs.com/package/protospec-wasm) — PSL 引擎 npm 包（WebAssembly）

## 许可证

[GPL-3.0](LICENSE)
