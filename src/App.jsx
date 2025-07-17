import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import DirectoryManager from "@/components/pages/DirectoryManager";
import DirectoryEditor from "@/components/pages/DirectoryEditor";
import PublicDirectory from "@/components/pages/PublicDirectory";
import ItemDetail from "@/components/pages/ItemDetail";
import Pricing from "@/components/pages/Pricing";
import Settings from "@/components/pages/Settings";
import Browse from "@/components/pages/Browse";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/directories" element={<DirectoryManager />} />
        <Route path="/directories/:id/edit" element={<DirectoryEditor />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/directory/:slug" element={<PublicDirectory />} />
        <Route path="/directory/:slug/item/:itemId" element={<ItemDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;