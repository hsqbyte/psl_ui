export interface ProtocolField {
  name: string
  type: string
  bits: number
  description: string
}

export interface Protocol {
  name: string
  layer: string
  description: string
  rfc?: string
  dependsOn: string[]
  fields?: ProtocolField[]
}

export const protocols: Protocol[] = [
  { name: 'Ethernet', layer: 'link', description: '以太网II帧', rfc: 'RFC 894', dependsOn: [], fields: [
    { name: 'Destination MAC', type: 'bytes', bits: 48, description: '目标MAC地址' },
    { name: 'Source MAC', type: 'bytes', bits: 48, description: '源MAC地址' },
    { name: 'EtherType', type: 'uint16', bits: 16, description: '协议类型' },
    { name: 'Payload', type: 'bytes', bits: 0, description: '载荷数据' },
  ]},
  { name: 'ARP', layer: 'link', description: '地址解析协议', rfc: 'RFC 826', dependsOn: ['Ethernet'], fields: [
    { name: 'Hardware Type', type: 'uint16', bits: 16, description: '硬件类型' },
    { name: 'Protocol Type', type: 'uint16', bits: 16, description: '协议类型' },
    { name: 'HW Addr Len', type: 'uint8', bits: 8, description: '硬件地址长度' },
    { name: 'Proto Addr Len', type: 'uint8', bits: 8, description: '协议地址长度' },
    { name: 'Operation', type: 'uint16', bits: 16, description: '操作码' },
    { name: 'Sender HW Addr', type: 'bytes', bits: 48, description: '发送方硬件地址' },
    { name: 'Sender Proto Addr', type: 'bytes', bits: 32, description: '发送方协议地址' },
    { name: 'Target HW Addr', type: 'bytes', bits: 48, description: '目标硬件地址' },
    { name: 'Target Proto Addr', type: 'bytes', bits: 32, description: '目标协议地址' },
  ]},
  { name: 'VLAN', layer: 'link', description: 'IEEE 802.1Q VLAN标签', dependsOn: ['Ethernet'], fields: [
    { name: 'TPID', type: 'uint16', bits: 16, description: '标签协议标识' },
    { name: 'PCP', type: 'uint3', bits: 3, description: '优先级代码点' },
    { name: 'DEI', type: 'uint1', bits: 1, description: '丢弃适格指示' },
    { name: 'VID', type: 'uint12', bits: 12, description: 'VLAN标识符' },
  ]},
  { name: 'IPv4', layer: 'network', description: '互联网协议第四版', rfc: 'RFC 791', dependsOn: ['Ethernet'], fields: [
    { name: 'Version', type: 'uint4', bits: 4, description: '版本' },
    { name: 'IHL', type: 'uint4', bits: 4, description: '首部长度' },
    { name: 'DSCP', type: 'uint6', bits: 6, description: '差分服务代码点' },
    { name: 'ECN', type: 'uint2', bits: 2, description: '显式拥塞通知' },
    { name: 'Total Length', type: 'uint16', bits: 16, description: '总长度' },
    { name: 'Identification', type: 'uint16', bits: 16, description: '标识' },
    { name: 'Flags', type: 'uint3', bits: 3, description: '标志' },
    { name: 'Fragment Offset', type: 'uint13', bits: 13, description: '片偏移' },
    { name: 'TTL', type: 'uint8', bits: 8, description: '生存时间' },
    { name: 'Protocol', type: 'uint8', bits: 8, description: '协议' },
    { name: 'Header Checksum', type: 'uint16', bits: 16, description: '首部校验和' },
    { name: 'Source Address', type: 'ipv4', bits: 32, description: '源地址' },
    { name: 'Destination Address', type: 'ipv4', bits: 32, description: '目的地址' },
  ]},
  { name: 'IPv6', layer: 'network', description: '互联网协议第六版', rfc: 'RFC 8200', dependsOn: ['Ethernet'], fields: [
    { name: 'Version', type: 'uint4', bits: 4, description: '版本' },
    { name: 'Traffic Class', type: 'uint8', bits: 8, description: '流量类别' },
    { name: 'Flow Label', type: 'uint20', bits: 20, description: '流标签' },
    { name: 'Payload Length', type: 'uint16', bits: 16, description: '载荷长度' },
    { name: 'Next Header', type: 'uint8', bits: 8, description: '下一个首部' },
    { name: 'Hop Limit', type: 'uint8', bits: 8, description: '跳数限制' },
    { name: 'Source Address', type: 'ipv6', bits: 128, description: '源地址' },
    { name: 'Destination Address', type: 'ipv6', bits: 128, description: '目的地址' },
  ]},
  { name: 'ICMP', layer: 'network', description: '互联网控制消息协议', rfc: 'RFC 792', dependsOn: ['IPv4'], fields: [
    { name: 'Type', type: 'uint8', bits: 8, description: '类型' },
    { name: 'Code', type: 'uint8', bits: 8, description: '代码' },
    { name: 'Checksum', type: 'uint16', bits: 16, description: '校验和' },
    { name: 'Rest of Header', type: 'uint32', bits: 32, description: '首部其余部分' },
  ]},
  { name: 'TCP', layer: 'transport', description: '传输控制协议', rfc: 'RFC 793', dependsOn: ['IPv4', 'IPv6'], fields: [
    { name: 'Source Port', type: 'uint16', bits: 16, description: '源端口' },
    { name: 'Destination Port', type: 'uint16', bits: 16, description: '目的端口' },
    { name: 'Sequence Number', type: 'uint32', bits: 32, description: '序列号' },
    { name: 'Acknowledgment Number', type: 'uint32', bits: 32, description: '确认号' },
    { name: 'Data Offset', type: 'uint4', bits: 4, description: '数据偏移' },
    { name: 'Reserved', type: 'uint3', bits: 3, description: '保留' },
    { name: 'Flags', type: 'uint9', bits: 9, description: '标志位' },
    { name: 'Window Size', type: 'uint16', bits: 16, description: '窗口大小' },
    { name: 'Checksum', type: 'uint16', bits: 16, description: '校验和' },
    { name: 'Urgent Pointer', type: 'uint16', bits: 16, description: '紧急指针' },
  ]},
  { name: 'UDP', layer: 'transport', description: '用户数据报协议', rfc: 'RFC 768', dependsOn: ['IPv4', 'IPv6'], fields: [
    { name: 'Source Port', type: 'uint16', bits: 16, description: '源端口' },
    { name: 'Destination Port', type: 'uint16', bits: 16, description: '目的端口' },
    { name: 'Length', type: 'uint16', bits: 16, description: '长度' },
    { name: 'Checksum', type: 'uint16', bits: 16, description: '校验和' },
  ]},
  { name: 'TLS', layer: 'transport', description: 'TLS记录协议', rfc: 'RFC 8446', dependsOn: ['TCP'], fields: [
    { name: 'Content Type', type: 'uint8', bits: 8, description: '内容类型' },
    { name: 'Version', type: 'uint16', bits: 16, description: '版本' },
    { name: 'Length', type: 'uint16', bits: 16, description: '长度' },
  ]},
  { name: 'SCTP', layer: 'transport', description: '流控制传输协议', rfc: 'RFC 9260', dependsOn: ['IPv4'], fields: [
    { name: 'Source Port', type: 'uint16', bits: 16, description: '源端口' },
    { name: 'Destination Port', type: 'uint16', bits: 16, description: '目的端口' },
    { name: 'Verification Tag', type: 'uint32', bits: 32, description: '验证标签' },
    { name: 'Checksum', type: 'uint32', bits: 32, description: '校验和' },
  ]},
  { name: 'DNS', layer: 'application', description: '域名系统', rfc: 'RFC 1035', dependsOn: ['UDP', 'TCP'], fields: [
    { name: 'ID', type: 'uint16', bits: 16, description: '事务ID' },
    { name: 'Flags', type: 'uint16', bits: 16, description: '标志' },
    { name: 'QDCOUNT', type: 'uint16', bits: 16, description: '问题数' },
    { name: 'ANCOUNT', type: 'uint16', bits: 16, description: '回答数' },
    { name: 'NSCOUNT', type: 'uint16', bits: 16, description: '授权数' },
    { name: 'ARCOUNT', type: 'uint16', bits: 16, description: '附加数' },
  ]},
  { name: 'HTTP', layer: 'application', description: '超文本传输协议', rfc: 'RFC 9110', dependsOn: ['TCP'] },
  { name: 'HTTP2', layer: 'application', description: 'HTTP/2帧', rfc: 'RFC 9113', dependsOn: ['TCP'], fields: [
    { name: 'Length', type: 'uint24', bits: 24, description: '帧长度' },
    { name: 'Type', type: 'uint8', bits: 8, description: '帧类型' },
    { name: 'Flags', type: 'uint8', bits: 8, description: '标志' },
    { name: 'Reserved', type: 'uint1', bits: 1, description: '保留' },
    { name: 'Stream Identifier', type: 'uint31', bits: 31, description: '流标识符' },
  ]},
  { name: 'WebSocket', layer: 'application', description: 'WebSocket协议', rfc: 'RFC 6455', dependsOn: ['TCP'], fields: [
    { name: 'FIN', type: 'uint1', bits: 1, description: '最终分片' },
    { name: 'RSV1-3', type: 'uint3', bits: 3, description: '保留位' },
    { name: 'Opcode', type: 'uint4', bits: 4, description: '操作码' },
    { name: 'Mask', type: 'uint1', bits: 1, description: '掩码标志' },
    { name: 'Payload Length', type: 'uint7', bits: 7, description: '载荷长度' },
  ]},
  { name: 'MQTT', layer: 'application', description: '消息队列遥测传输协议', dependsOn: ['TCP'], fields: [
    { name: 'Packet Type', type: 'uint4', bits: 4, description: '报文类型' },
    { name: 'Flags', type: 'uint4', bits: 4, description: '标志位' },
    { name: 'Remaining Length', type: 'varint', bits: 8, description: '剩余长度' },
  ]},
  { name: 'DHCP', layer: 'application', description: '动态主机配置协议', rfc: 'RFC 2131', dependsOn: ['UDP'], fields: [
    { name: 'Op', type: 'uint8', bits: 8, description: '操作码' },
    { name: 'HType', type: 'uint8', bits: 8, description: '硬件类型' },
    { name: 'HLen', type: 'uint8', bits: 8, description: '硬件地址长度' },
    { name: 'Hops', type: 'uint8', bits: 8, description: '跳数' },
    { name: 'XID', type: 'uint32', bits: 32, description: '事务ID' },
  ]},
  { name: 'CoAP', layer: 'application', description: '受限应用协议', rfc: 'RFC 7252', dependsOn: ['UDP'], fields: [
    { name: 'Version', type: 'uint2', bits: 2, description: '版本' },
    { name: 'Type', type: 'uint2', bits: 2, description: '类型' },
    { name: 'Token Length', type: 'uint4', bits: 4, description: '令牌长度' },
    { name: 'Code', type: 'uint8', bits: 8, description: '代码' },
    { name: 'Message ID', type: 'uint16', bits: 16, description: '消息ID' },
  ]},
  { name: 'Kafka', layer: 'application', description: 'Apache Kafka 线协议', dependsOn: ['TCP'] },
  { name: 'Redis', layer: 'application', description: 'Redis RESP 协议', dependsOn: ['TCP'] },
  { name: 'MySQL', layer: 'application', description: 'MySQL 客户端/服务器协议', dependsOn: ['TCP'] },
  { name: 'PostgreSQL', layer: 'application', description: 'PostgreSQL 线协议', dependsOn: ['TCP'] },
  { name: 'MongoDB', layer: 'application', description: 'MongoDB 线协议', dependsOn: ['TCP'] },
  { name: 'JSON_RPC', layer: 'application', description: 'JSON 远程过程调用协议', dependsOn: ['HTTP'] },
  { name: 'MCP', layer: 'application', description: '模型上下文协议', dependsOn: ['JSON_RPC'] },
  { name: 'Bitcoin', layer: 'application', description: '比特币 P2P 协议', dependsOn: ['TCP'] },
  { name: 'RTP', layer: 'application', description: '实时传输协议', rfc: 'RFC 3550', dependsOn: ['UDP'], fields: [
    { name: 'Version', type: 'uint2', bits: 2, description: '版本' },
    { name: 'Padding', type: 'uint1', bits: 1, description: '填充' },
    { name: 'Extension', type: 'uint1', bits: 1, description: '扩展' },
    { name: 'CSRC Count', type: 'uint4', bits: 4, description: 'CSRC计数' },
    { name: 'Marker', type: 'uint1', bits: 1, description: '标记' },
    { name: 'Payload Type', type: 'uint7', bits: 7, description: '载荷类型' },
    { name: 'Sequence Number', type: 'uint16', bits: 16, description: '序列号' },
    { name: 'Timestamp', type: 'uint32', bits: 32, description: '时间戳' },
    { name: 'SSRC', type: 'uint32', bits: 32, description: '同步源标识符' },
  ]},
  { name: 'SIP', layer: 'application', description: '会话发起协议', rfc: 'RFC 3261', dependsOn: ['TCP', 'UDP'] },
]

export const layers = ['link', 'network', 'transport', 'application'] as const

export const layerLabels: Record<string, string> = {
  link: '链路层',
  network: '网络层',
  transport: '传输层',
  application: '应用层',
}
