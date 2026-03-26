<p align="center">
  <img src="assets/psl_ui.svg" width="80" alt="PSL UI">
</p>

<h1 align="center">PSL UI — Protocol Specification Language Web Interface</h1>

<p align="center">
  Browse, visualize, and interact with PSL protocol definitions through a modern web UI.
</p>

<p align="center">
  <a href="README.md">English</a> | <a href="README_ZH.md">中文</a>
</p>

---

PSL UI is a web-based frontend for the [protospec](https://github.com/hsqbyte/protospec) project. It provides an interactive way to explore the protocol library — browsing the protocol hierarchy, viewing field definitions, encoding/decoding packets, and visualizing protocol structures.

## Features

- **Protocol Browser** — Navigate protocols in a hierarchical tree reflecting the protocol stack (Ethernet > IPv4 > TCP > HTTP)
- **Protocol Detail View** — View complete protocol definitions including fields, metadata, RFC links, and dependencies
- **Bit/Byte Diagram** — Visual bit-level layout diagram of protocol headers
- **Encode/Decode Panel** — Interactively encode JSON to binary hex and decode hex back to JSON
- **Hex Viewer** — Color-coded field highlighting over binary data
- **PSL Source View** — Syntax-highlighted raw `.psl` source display
- **Search** — Find protocols by name, RFC number, layer, or field name
- **i18n** — English and Chinese language support

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Related Projects

- [protospec](https://github.com/hsqbyte/protospec) — PSL engine and CLI tool

## License

[GPL-3.0](LICENSE)
