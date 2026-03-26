import { type ReactNode } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu,
  SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel,
  SidebarGroupContent, SidebarInset, SidebarTrigger,
} from '@/shared/ui/sidebar'
import { Separator } from '@/shared/ui/separator'
import { TooltipProvider } from '@/shared/ui/tooltip'
import { Button } from '@/shared/ui/button'
import { useTheme } from '@/shared/hooks/use-theme'
import { useI18n } from '@/shared/i18n'
import {
  VscListFlat, VscListTree, VscGraph, VscBeaker, VscEdit, VscPackage,
  VscGitCompare, VscSymbolNumeric, VscArrowSwap, VscPieChart,
} from 'react-icons/vsc'
import {
  FiLink, FiBarChart2, FiCheckCircle, FiShuffle, FiZap, FiFileText,
  FiRefreshCw, FiCalendar, FiShield, FiCpu,
} from 'react-icons/fi'
import {
  FiLogIn, FiStar, FiUsers, FiFile, FiPenTool, FiDownload, FiTag, FiActivity,
} from 'react-icons/fi'
import {
  FiServer, FiLink2, FiTerminal, FiGithub, FiTool, FiGrid, FiAnchor,
  FiBook, FiBox, FiClipboard,
} from 'react-icons/fi'
import {
  FiLayers, FiGlobe, FiRadio, FiSettings, FiArrowRight, FiMap,
  FiTrendingUp, FiClock, FiNavigation, FiAlertTriangle,
} from 'react-icons/fi'
import {
  FiCrosshair, FiMonitor, FiPlay, FiCode, FiPackage, FiSearch,
  FiCheckSquare, FiRepeat, FiAlertCircle, FiGitBranch,
} from 'react-icons/fi'
import {
  FiLock, FiList, FiFileText as FiFileText2, FiPieChart, FiHome,
  FiKey, FiDatabase, FiBarChart, FiDollarSign, FiLayout,
} from 'react-icons/fi'
import {
  FiMessageSquare, FiSun, FiMoon, FiHelpCircle, FiBell, FiThumbsUp,
  FiMic, FiHeart, FiEye, FiBookOpen, FiCompass, FiSliders, FiSmartphone, FiSend,
} from 'react-icons/fi'
import { RiRobot2Line, RiSparklingLine } from 'react-icons/ri'
import { FiShoppingCart } from 'react-icons/fi'

interface NavItem { label: string; path: string; icon: ReactNode }

export function Layout() {
  const { dark, toggle } = useTheme()
  const { t, lang, setLang } = useI18n()

  const navItems: NavItem[] = [
    { label: t('protocols'), path: '/', icon: <VscListFlat /> },
    { label: t('tree'), path: '/tree', icon: <VscListTree /> },
    { label: t('diagram'), path: '/diagram', icon: <VscGraph /> },
    { label: t('playground'), path: '/playground', icon: <VscBeaker /> },
    { label: t('editor'), path: '/editor', icon: <VscEdit /> },
    { label: t('pcap'), path: '/pcap', icon: <VscPackage /> },
    { label: t('compare'), path: '/compare', icon: <VscGitCompare /> },
    { label: t('calculator'), path: '/calculator', icon: <VscSymbolNumeric /> },
    { label: t('sequence'), path: '/sequence', icon: <VscArrowSwap /> },
    { label: t('stats'), path: '/stats', icon: <VscPieChart /> },
  ]

  const analysisItems: NavItem[] = [
    { label: t('graphTitle'), path: '/graph', icon: <FiLink /> },
    { label: t('coverageTitle'), path: '/coverage', icon: <FiBarChart2 /> },
    { label: t('complianceTitle'), path: '/compliance', icon: <FiCheckCircle /> },
    { label: t('fuzzTitle'), path: '/fuzz', icon: <FiShuffle /> },
    { label: t('benchmarkTitle'), path: '/benchmark', icon: <FiZap /> },
    { label: t('diffTitle'), path: '/diff', icon: <FiFileText /> },
    { label: t('versionCompareTitle'), path: '/version-compare', icon: <FiRefreshCw /> },
    { label: t('timelineTitle'), path: '/timeline', icon: <FiCalendar /> },
    { label: t('auditTitle'), path: '/audit', icon: <FiShield /> },
    { label: t('knowledgeTitle'), path: '/knowledge', icon: <FiCpu /> },
  ]

  const collaborationItems: NavItem[] = [
    { label: t('loginTitle'), path: '/login', icon: <FiLogIn /> },
    { label: t('bookmarksTitle'), path: '/bookmarks', icon: <FiStar /> },
    { label: t('teamsTitle'), path: '/teams', icon: <FiUsers /> },
    { label: t('templatesTitle'), path: '/templates', icon: <FiFile /> },
    { label: t('customEditorTitle'), path: '/custom-editor', icon: <FiPenTool /> },
    { label: t('importExportTitle'), path: '/import-export', icon: <FiDownload /> },
    { label: t('versionsTitle'), path: '/versions', icon: <FiTag /> },
    { label: t('activityTitle'), path: '/activity', icon: <FiActivity /> },
  ]

  const integrationItems: NavItem[] = [
    { label: t('apiBackendTitle'), path: '/api-backend', icon: <FiServer /> },
    { label: t('websocketTitle'), path: '/websocket', icon: <FiLink2 /> },
    { label: t('cliIntegrationTitle'), path: '/cli-integration', icon: <FiTerminal /> },
    { label: t('githubIntegrationTitle'), path: '/github-integration', icon: <FiGithub /> },
    { label: t('ciDashboardTitle'), path: '/ci-dashboard', icon: <FiTool /> },
    { label: t('pluginMarketTitle'), path: '/plugin-market', icon: <FiGrid /> },
    { label: t('webhooksTitle'), path: '/webhooks', icon: <FiAnchor /> },
    { label: t('apiDocsTitle'), path: '/api-docs', icon: <FiBook /> },
    { label: t('sdkDocsTitle'), path: '/sdk-docs', icon: <FiBox /> },
    { label: t('registryTitle'), path: '/registry', icon: <FiClipboard /> },
  ]

  const visualizationItems: NavItem[] = [
    { label: t('stackDiagramTitle'), path: '/stack-diagram', icon: <FiLayers /> },
    { label: t('topologyTitle'), path: '/topology', icon: <FiGlobe /> },
    { label: t('packetFlowTitle'), path: '/packet-flow', icon: <FiRadio /> },
    { label: t('stateMachineTitle'), path: '/state-machine', icon: <FiSettings /> },
    { label: t('dataFlowTitle'), path: '/data-flow', icon: <FiArrowRight /> },
    { label: t('heatmapTitle'), path: '/heatmap', icon: <FiMap /> },
    { label: t('trafficChartsTitle'), path: '/traffic-charts', icon: <FiTrendingUp /> },
    { label: t('latencyTitle'), path: '/latency', icon: <FiClock /> },
    { label: t('throughputTitle'), path: '/throughput', icon: <FiNavigation /> },
    { label: t('errorDashboardTitle'), path: '/error-dashboard', icon: <FiAlertTriangle /> },
  ]

  const devToolsItems: NavItem[] = [
    { label: t('debuggerTitle'), path: '/debugger', icon: <FiCrosshair /> },
    { label: t('mockServerTitle'), path: '/mock-server', icon: <FiMonitor /> },
    { label: t('testgenTitle'), path: '/testgen', icon: <FiPlay /> },
    { label: t('codegenTitle'), path: '/codegen-preview', icon: <FiCode /> },
    { label: t('sdkPreviewTitle'), path: '/sdk-preview', icon: <FiPackage /> },
    { label: t('linterTitle'), path: '/linter', icon: <FiSearch /> },
    { label: t('formatValidateTitle'), path: '/format-validate', icon: <FiCheckSquare /> },
    { label: t('migrationTitle'), path: '/migration', icon: <FiRepeat /> },
    { label: t('breakingChangesTitle'), path: '/breaking-changes', icon: <FiAlertCircle /> },
    { label: t('apiCompatTitle'), path: '/api-compat', icon: <FiGitBranch /> },
  ]

  const enterpriseItems: NavItem[] = [
    { label: t('rbacTitle'), path: '/rbac', icon: <FiLock /> },
    { label: t('auditLogTitle'), path: '/audit-log', icon: <FiList /> },
    { label: t('complianceReportTitle'), path: '/compliance-report', icon: <FiFileText2 /> },
    { label: t('slaMonitorTitle'), path: '/sla-monitor', icon: <FiPieChart /> },
    { label: t('multiTenantTitle'), path: '/multi-tenant', icon: <FiHome /> },
    { label: t('ssoTitle'), path: '/sso', icon: <FiKey /> },
    { label: t('dataRetentionTitle'), path: '/data-retention', icon: <FiDatabase /> },
    { label: t('usageAnalyticsTitle'), path: '/usage-analytics', icon: <FiBarChart /> },
    { label: t('costTrackingTitle'), path: '/cost-tracking', icon: <FiDollarSign /> },
    { label: t('enterpriseDashboardTitle'), path: '/enterprise-dashboard', icon: <FiLayout /> },
  ]

  const aiItems: NavItem[] = [
    { label: t('aiAssistantTitle'), path: '/ai-assistant', icon: <RiRobot2Line /> },
    { label: t('aiGenerateTitle'), path: '/ai-generate', icon: <RiSparklingLine /> },
    { label: t('anomalyDetectionTitle'), path: '/anomaly-detection', icon: <FiBell /> },
    { label: t('recommendationsTitle'), path: '/recommendations', icon: <FiThumbsUp /> },
    { label: t('nlQueryTitle'), path: '/nl-query', icon: <FiMic /> },
    { label: t('aiDebugTitle'), path: '/ai-debug', icon: <FiHeart /> },
    { label: t('predictiveTitle'), path: '/predictive', icon: <FiEye /> },
    { label: t('autoDocsTitle'), path: '/auto-docs', icon: <FiMessageSquare /> },
    { label: t('similaritySearchTitle'), path: '/similarity-search', icon: <FiSearch /> },
    { label: t('aiReviewTitle'), path: '/ai-review', icon: <FiStar /> },
  ]

  const platformItems: NavItem[] = [
    { label: t('marketplaceTitle'), path: '/marketplace', icon: <FiShoppingCart /> },
    { label: t('communityTitle'), path: '/community', icon: <FiUsers /> },
    { label: t('certificationTitle'), path: '/certification', icon: <FiHelpCircle /> },
    { label: t('tutorialsTitle'), path: '/tutorials', icon: <FiBookOpen /> },
    { label: t('learningPathsTitle'), path: '/learning-paths', icon: <FiCompass /> },
    { label: t('sandboxTitle'), path: '/sandbox', icon: <FiSliders /> },
    { label: t('performanceTitle'), path: '/performance', icon: <FiZap /> },
    { label: t('accessibilityTitle'), path: '/accessibility', icon: <FiHelpCircle /> },
    { label: t('pwaTitle'), path: '/pwa', icon: <FiSmartphone /> },
    { label: t('releasePrepTitle'), path: '/release-prep', icon: <FiSend /> },
  ]

  const groups = [
    { label: 'Analysis', items: analysisItems },
    { label: 'Collaboration', items: collaborationItems },
    { label: 'Integration', items: integrationItems },
    { label: 'Visualization', items: visualizationItems },
    { label: 'DevTools', items: devToolsItems },
    { label: 'Enterprise', items: enterpriseItems },
    { label: 'AI', items: aiItems },
    { label: 'Platform', items: platformItems },
  ]

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="px-4 py-3">
            <Link to="/" className="text-lg font-bold">PSL Web</Link>
          </SidebarHeader>
          <Separator />
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton render={<Link to={item.path} />}>
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {groups.map((g) => (
              <SidebarGroup key={g.label}>
                <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {g.items.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton render={<Link to={item.path} />}>
                          {item.icon}
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="border-b px-4 py-2 flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm text-muted-foreground flex-1">Protocol Specification Language</span>
            <Button variant="ghost" size="sm" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}>
              {lang === 'en' ? '中文' : 'EN'}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggle}>
              {dark ? <FiSun /> : <FiMoon />}
            </Button>
          </header>
          <main className="p-4 sm:p-6">
            <Outlet />
          </main>
          <footer className="border-t px-4 py-2 text-xs text-muted-foreground">
            PSL v1.0.0 — {t('protocols')}: 27
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
