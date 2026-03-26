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

PSL UI 是 [protospec](https://github.com/hsqbyte/protospec) 项目的 Web 前端。它提供了一种交互式方式来浏览协议库——浏览协议层级、查看字段定义、编解码数据包以及可视化协议结构。

## 截图

<p align="center">
  <img src="assets/screenshot.png" alt="PSL UI 截图">
</p>

## 功能

- **协议浏览器** — 以层级树形结构浏览协议栈（Ethernet > IPv4 > TCP > HTTP）
- **协议详情视图** — 查看完整的协议定义，包括字段、元数据、RFC 链接和依赖关系
- **比特/字节图** — 协议头部的比特级布局可视化
- **编解码面板** — 交互式将 JSON 编码为二进制十六进制，或将十六进制解码为 JSON
- **十六进制查看器** — 二进制数据的字段颜色高亮显示
- **PSL 源码视图** — 语法高亮的原始 `.psl` 源码展示
- **搜索** — 按名称、RFC 编号、层级或字段名查找协议
- **国际化** — 支持中英文切换

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 相关项目

- [protospec](https://github.com/hsqbyte/protospec) — PSL 引擎和命令行工具

## 许可证

[GPL-3.0](LICENSE)
