import { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { directoryService } from "@/services/api/directoryService";

const DirectoryStats = ({ directoryId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");
      const statsData = await directoryService.getDirectoryStats(directoryId);
      setStats(statsData);
    } catch (err) {
      setError("Failed to load directory statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (directoryId) {
      loadStats();
    }
  }, [directoryId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStats} />;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Items"
        value={stats.totalItems}
        icon="FileText"
        trend="up"
        trendValue="+12%"
      />
      <StatCard
        title="Total Views"
        value={stats.totalViews}
        icon="Eye"
        trend="up"
        trendValue="+8%"
      />
      <StatCard
        title="Featured Items"
        value={stats.featuredItems}
        icon="Star"
      />
      <StatCard
        title="Categories"
        value={stats.totalCategories}
        icon="Tag"
      />
    </div>
  );
};

export default DirectoryStats;