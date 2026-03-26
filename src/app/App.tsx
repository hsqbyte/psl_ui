import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/widgets/layout'
import { Home } from '@/pages/home'
import { ProtocolDetail } from '@/pages/protocol-detail'
import { Diagram } from '@/pages/diagram'
import { Tree } from '@/pages/tree'
import { Playground } from '@/pages/playground'
import { Editor } from '@/pages/editor'
import { Pcap } from '@/pages/pcap'
import { Compare } from '@/pages/compare'
import { Calculator } from '@/pages/calculator'
import { Sequence } from '@/pages/sequence'
import { Stats } from '@/pages/stats'
import { DependencyGraph } from '@/pages/dependency-graph'
import { Coverage } from '@/pages/coverage'
import { Compliance } from '@/pages/compliance'
import { Fuzz } from '@/pages/fuzz'
import { Benchmark } from '@/pages/benchmark'
import { Diff } from '@/pages/diff'
import { VersionCompare } from '@/pages/version-compare'
import { Timeline } from '@/pages/timeline'
import { Audit } from '@/pages/audit'
import { Knowledge } from '@/pages/knowledge'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/protocol/:name" element={<ProtocolDetail />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/diagram/:name" element={<Diagram />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/pcap" element={<Pcap />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/sequence" element={<Sequence />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/graph" element={<DependencyGraph />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/fuzz" element={<Fuzz />} />
          <Route path="/benchmark" element={<Benchmark />} />
          <Route path="/diff" element={<Diff />} />
          <Route path="/version-compare" element={<VersionCompare />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/knowledge" element={<Knowledge />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
