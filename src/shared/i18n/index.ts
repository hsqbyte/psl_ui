import { useSyncExternalStore, useCallback } from 'react'

const translations = {
  en: {
    protocols: 'Protocols',
    search: 'Search',
    searchPlaceholder: 'Search protocols...',
    noResults: 'No protocols found',
    available: 'protocols available',
    all: 'All',
    tree: 'Tree',
    diagram: 'Diagram',
    playground: 'Playground',
    pcap: 'PCAP',
    editor: 'Editor',
    compare: 'Compare',
    calculator: 'Calculator',
    sequence: 'Sequence',
    stats: 'Statistics',
    protocolDetail: 'Protocol Detail',
    fields: 'Fields',
    fieldName: 'Name',
    fieldType: 'Type',
    fieldBits: 'Bits',
    fieldDescription: 'Description',
    noFields: 'No field definitions available',
    dependsOn: 'Depends On',
    backToList: '← Back to list',
    bitDiagram: 'Bit Diagram',
    selectProtocol: 'Select a protocol to view its diagram',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    link: 'Link',
    network: 'Network',
    transport: 'Transport',
    application: 'Application',
    // v0.11.0 Playground
    playgroundTitle: 'Encode/Decode Playground',
    encode: 'Encode',
    decode: 'Decode',
    input: 'Input',
    output: 'Output',
    // v0.12.0 Editor
    editorTitle: 'PSL Editor',
    validate: 'Validate',
    validationErrors: 'Validation Errors',
    validationOk: '✓ Syntax looks good',
    // v0.13.0 PCAP
    pcapTitle: 'PCAP Analysis',
    pcapDrop: 'Drop a PCAP file here',
    pcapDropHint: 'Supports .pcap, .pcapng, .cap files',
    pcapBrowse: 'or browse files',
    pcapSelectPacket: 'Click a packet to view details',
    packetDetail: 'Packet Detail',
    time: 'Time',
    protocolLabel: 'Protocol',
    source: 'Source',
    destination: 'Destination',
    length: 'Length',
    info: 'Info',
    // v0.14.0 Compare
    compareTitle: 'Protocol Comparison',
    protocolA: 'Protocol A',
    protocolB: 'Protocol B',
    fieldComparison: 'Field Comparison',
    // v0.15.0 Calculator
    calculatorTitle: 'Field Value Calculator',
    decimalValue: 'Decimal Value',
    bitWidth: 'Bit Width',
    byteOrder: 'Byte Order',
    representations: 'Representations',
    decimal: 'Decimal',
    hex: 'Hex',
    octal: 'Octal',
    binary: 'Binary',
    byteRepresentation: 'Byte Representation',
    // v0.18.0 Sequence
    sequenceTitle: 'Sequence Diagram',
    // v0.19.0 Stats
    statsTitle: 'Protocol Statistics',
    protocolUsage: 'Protocol Usage Frequency',
    fieldCoverage: 'Field Coverage',
    // v0.20.0 Export
    exportPng: 'Export / Print',
    // v0.21.0 Dependency Graph
    graphTitle: 'Dependency Graph',
    // v0.22.0 Coverage
    coverageTitle: 'Field Coverage',
    // v0.23.0 Compliance
    complianceTitle: 'Compliance Checker',
    // v0.24.0 Fuzz
    fuzzTitle: 'Fuzz Tester',
    // v0.25.0 Benchmark
    benchmarkTitle: 'Benchmark',
    // v0.26.0 Diff
    diffTitle: 'PSL Diff',
    // v0.27.0 Version Compare
    versionCompareTitle: 'Version Compare',
    // v0.28.0 Timeline
    timelineTitle: 'Timeline',
    // v0.29.0 Audit
    auditTitle: 'Security Audit',
    // v0.30.0 Knowledge
    knowledgeTitle: 'Knowledge Graph',
    // v0.31.0 Auth
    loginTitle: 'Login',
    registerTitle: 'Register',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    loggedInAs: 'Logged in as',
    switchToRegister: 'Need an account? Register',
    switchToLogin: 'Have an account? Login',
    // v0.32.0 Bookmarks
    bookmarksTitle: 'Bookmarks',
    noBookmarks: 'No bookmarked protocols yet',
    // v0.33.0 Share
    share: 'Share',
    shareProtocol: 'Share Protocol',
    shareDescription: 'Copy the link below to share this protocol:',
    copy: 'Copy',
    // v0.34.0 Comments
    commentsTitle: 'Comments',
    noComments: 'No comments yet',
    addComment: 'Add a comment...',
    submitComment: 'Submit',
    // v0.35.0 Teams
    teamsTitle: 'Teams',
    teamName: 'Team name',
    createTeam: 'Create Team',
    members: 'Members',
    // v0.36.0 Templates
    templatesTitle: 'Templates',
    useTemplate: 'Use Template',
    // v0.37.0 Custom Editor
    customEditorTitle: 'Protocol Designer',
    fieldDesigner: 'Field Designer',
    addField: 'Add Field',
    pslPreview: 'PSL Preview',
    // v0.38.0 Import/Export
    importExportTitle: 'Import / Export',
    importPsl: 'Import PSL',
    exportProtocol: 'Export Protocol',
    chooseFile: 'Choose File',
    format: 'Format',
    download: 'Download',
    // v0.39.0 Versions
    versionsTitle: 'Versions',
    createVersion: 'New Version',
    versionDiff: 'Version Diff',
    // v0.40.0 Activity
    activityTitle: 'Activity Feed',
    // v0.41.0 - v0.60.0
    apiBackendTitle: 'API Backend',
    websocketTitle: 'WebSocket',
    cliIntegrationTitle: 'CLI Integration',
    githubIntegrationTitle: 'GitHub Integration',
    ciDashboardTitle: 'CI Dashboard',
    pluginMarketTitle: 'Plugin Market',
    webhooksTitle: 'Webhooks',
    apiDocsTitle: 'API Docs',
    sdkDocsTitle: 'SDK Docs',
    registryTitle: 'Registry',
    stackDiagramTitle: 'Stack Diagram',
    topologyTitle: 'Topology',
    packetFlowTitle: 'Packet Flow',
    stateMachineTitle: 'State Machine',
    dataFlowTitle: 'Data Flow',
    heatmapTitle: 'Heatmap',
    trafficChartsTitle: 'Traffic Charts',
    latencyTitle: 'Latency',
    throughputTitle: 'Throughput',
    errorDashboardTitle: 'Error Dashboard',
    // v0.61.0 - v0.100.0
    debuggerTitle: 'Debugger',
    mockServerTitle: 'Mock Server',
    testgenTitle: 'Test Generator',
    codegenTitle: 'Code Generator',
    sdkPreviewTitle: 'SDK Preview',
    linterTitle: 'Linter',
    formatValidateTitle: 'Format & Validate',
    migrationTitle: 'Migration',
    breakingChangesTitle: 'Breaking Changes',
    apiCompatTitle: 'API Compatibility',
    rbacTitle: 'RBAC',
    auditLogTitle: 'Audit Log',
    complianceReportTitle: 'Compliance Report',
    slaMonitorTitle: 'SLA Monitor',
    multiTenantTitle: 'Multi-Tenant',
    ssoTitle: 'SSO',
    dataRetentionTitle: 'Data Retention',
    usageAnalyticsTitle: 'Usage Analytics',
    costTrackingTitle: 'Cost Tracking',
    enterpriseDashboardTitle: 'Enterprise Dashboard',
    aiAssistantTitle: 'AI Assistant',
    aiGenerateTitle: 'AI Generate',
    anomalyDetectionTitle: 'Anomaly Detection',
    recommendationsTitle: 'Recommendations',
    nlQueryTitle: 'NL Query',
    aiDebugTitle: 'AI Debug',
    predictiveTitle: 'Predictive',
    autoDocsTitle: 'Auto Docs',
    similaritySearchTitle: 'Similarity Search',
    aiReviewTitle: 'AI Review',
    marketplaceTitle: 'Marketplace',
    communityTitle: 'Community',
    certificationTitle: 'Certification',
    tutorialsTitle: 'Tutorials',
    learningPathsTitle: 'Learning Paths',
    sandboxTitle: 'Sandbox',
    performanceTitle: 'Performance',
    accessibilityTitle: 'Accessibility',
    pwaTitle: 'PWA',
    releasePrepTitle: 'Release Prep',
  },
  zh: {
    protocols: '协议',
    search: '搜索',
    searchPlaceholder: '搜索协议...',
    noResults: '未找到协议',
    available: '个协议可用',
    all: '全部',
    tree: '树形图',
    diagram: '位图',
    playground: '实验场',
    pcap: 'PCAP',
    editor: '编辑器',
    compare: '对比',
    calculator: '计算器',
    sequence: '时序图',
    stats: '统计',
    protocolDetail: '协议详情',
    fields: '字段',
    fieldName: '名称',
    fieldType: '类型',
    fieldBits: '位数',
    fieldDescription: '描述',
    noFields: '暂无字段定义',
    dependsOn: '依赖',
    backToList: '← 返回列表',
    bitDiagram: '位图',
    selectProtocol: '选择一个协议查看其位图',
    expandAll: '全部展开',
    collapseAll: '全部折叠',
    link: '链路层',
    network: '网络层',
    transport: '传输层',
    application: '应用层',
    // v0.11.0 Playground
    playgroundTitle: '编解码实验场',
    encode: '编码',
    decode: '解码',
    input: '输入',
    output: '输出',
    // v0.12.0 Editor
    editorTitle: 'PSL 编辑器',
    validate: '验证',
    validationErrors: '验证错误',
    validationOk: '✓ 语法正确',
    // v0.13.0 PCAP
    pcapTitle: 'PCAP 分析',
    pcapDrop: '拖放 PCAP 文件到此处',
    pcapDropHint: '支持 .pcap, .pcapng, .cap 文件',
    pcapBrowse: '或浏览文件',
    pcapSelectPacket: '点击数据包查看详情',
    packetDetail: '数据包详情',
    time: '时间',
    protocolLabel: '协议',
    source: '源地址',
    destination: '目标地址',
    length: '长度',
    info: '信息',
    // v0.14.0 Compare
    compareTitle: '协议对比',
    protocolA: '协议 A',
    protocolB: '协议 B',
    fieldComparison: '字段对比',
    // v0.15.0 Calculator
    calculatorTitle: '字段值计算器',
    decimalValue: '十进制值',
    bitWidth: '位宽',
    byteOrder: '字节序',
    representations: '表示形式',
    decimal: '十进制',
    hex: '十六进制',
    octal: '八进制',
    binary: '二进制',
    byteRepresentation: '字节表示',
    // v0.18.0 Sequence
    sequenceTitle: '时序图',
    // v0.19.0 Stats
    statsTitle: '协议统计',
    protocolUsage: '协议使用频率',
    fieldCoverage: '字段覆盖率',
    // v0.20.0 Export
    exportPng: '导出 / 打印',
    // v0.21.0 Dependency Graph
    graphTitle: '依赖关系图',
    // v0.22.0 Coverage
    coverageTitle: '字段覆盖分析',
    // v0.23.0 Compliance
    complianceTitle: '合规检查',
    // v0.24.0 Fuzz
    fuzzTitle: '模糊测试',
    // v0.25.0 Benchmark
    benchmarkTitle: '性能基准',
    // v0.26.0 Diff
    diffTitle: 'PSL 差异对比',
    // v0.27.0 Version Compare
    versionCompareTitle: '版本对比',
    // v0.28.0 Timeline
    timelineTitle: '时间线',
    // v0.29.0 Audit
    auditTitle: '安全审计',
    // v0.30.0 Knowledge
    knowledgeTitle: '知识图谱',
    // v0.31.0 Auth
    loginTitle: '登录',
    registerTitle: '注册',
    email: '邮箱',
    password: '密码',
    logout: '退出登录',
    loggedInAs: '已登录',
    switchToRegister: '没有账号？注册',
    switchToLogin: '已有账号？登录',
    // v0.32.0 Bookmarks
    bookmarksTitle: '收藏夹',
    noBookmarks: '暂无收藏的协议',
    // v0.33.0 Share
    share: '分享',
    shareProtocol: '分享协议',
    shareDescription: '复制以下链接分享此协议：',
    copy: '复制',
    // v0.34.0 Comments
    commentsTitle: '评论',
    noComments: '暂无评论',
    addComment: '添加评论...',
    submitComment: '提交',
    // v0.35.0 Teams
    teamsTitle: '团队',
    teamName: '团队名称',
    createTeam: '创建团队',
    members: '成员',
    // v0.36.0 Templates
    templatesTitle: '模板',
    useTemplate: '使用模板',
    // v0.37.0 Custom Editor
    customEditorTitle: '协议设计器',
    fieldDesigner: '字段设计器',
    addField: '添加字段',
    pslPreview: 'PSL 预览',
    // v0.38.0 Import/Export
    importExportTitle: '导入 / 导出',
    importPsl: '导入 PSL',
    exportProtocol: '导出协议',
    chooseFile: '选择文件',
    format: '格式',
    download: '下载',
    // v0.39.0 Versions
    versionsTitle: '版本管理',
    createVersion: '新建版本',
    versionDiff: '版本差异',
    // v0.40.0 Activity
    activityTitle: '动态',
    // v0.41.0 - v0.60.0
    apiBackendTitle: 'API 后端',
    websocketTitle: 'WebSocket',
    cliIntegrationTitle: '命令行集成',
    githubIntegrationTitle: 'GitHub 集成',
    ciDashboardTitle: 'CI 仪表盘',
    pluginMarketTitle: '插件市场',
    webhooksTitle: 'Webhooks',
    apiDocsTitle: 'API 文档',
    sdkDocsTitle: 'SDK 文档',
    registryTitle: '注册表',
    stackDiagramTitle: '协议栈图',
    topologyTitle: '拓扑图',
    packetFlowTitle: '数据包流',
    stateMachineTitle: '状态机',
    dataFlowTitle: '数据流',
    heatmapTitle: '热力图',
    trafficChartsTitle: '流量图表',
    latencyTitle: '延迟',
    throughputTitle: '吞吐量',
    errorDashboardTitle: '错误仪表盘',
    // v0.61.0 - v0.100.0
    debuggerTitle: '调试器',
    mockServerTitle: 'Mock 服务器',
    testgenTitle: '测试生成器',
    codegenTitle: '代码生成器',
    sdkPreviewTitle: 'SDK 预览',
    linterTitle: '代码检查',
    formatValidateTitle: '格式验证',
    migrationTitle: '迁移',
    breakingChangesTitle: '破坏性变更',
    apiCompatTitle: 'API 兼容性',
    rbacTitle: '角色权限',
    auditLogTitle: '审计日志',
    complianceReportTitle: '合规报告',
    slaMonitorTitle: 'SLA 监控',
    multiTenantTitle: '多租户',
    ssoTitle: '单点登录',
    dataRetentionTitle: '数据保留',
    usageAnalyticsTitle: '使用分析',
    costTrackingTitle: '成本追踪',
    enterpriseDashboardTitle: '企业仪表盘',
    aiAssistantTitle: 'AI 助手',
    aiGenerateTitle: 'AI 生成',
    anomalyDetectionTitle: '异常检测',
    recommendationsTitle: '推荐',
    nlQueryTitle: '自然语言查询',
    aiDebugTitle: 'AI 调试',
    predictiveTitle: '预测分析',
    autoDocsTitle: '自动文档',
    similaritySearchTitle: '相似搜索',
    aiReviewTitle: 'AI 审查',
    marketplaceTitle: '市场',
    communityTitle: '社区',
    certificationTitle: '认证',
    tutorialsTitle: '教程',
    learningPathsTitle: '学习路径',
    sandboxTitle: '沙箱',
    performanceTitle: '性能',
    accessibilityTitle: '无障碍',
    pwaTitle: 'PWA',
    releasePrepTitle: '发布准备',
  },
} as const

type Lang = keyof typeof translations
type Key = keyof (typeof translations)['en']

let currentLang: Lang = ((typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang) || 'en'
const listeners = new Set<() => void>()

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

function getSnapshot() {
  return currentLang
}

export function useI18n() {
  const lang = useSyncExternalStore(subscribe, getSnapshot)

  const t = useCallback((key: Key) => {
    return translations[lang][key] ?? key
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    currentLang = l
    localStorage.setItem('lang', l)
    listeners.forEach((fn) => fn())
  }, [])

  return { t, lang, setLang } as const
}
