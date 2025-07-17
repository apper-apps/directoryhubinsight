import { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import DirectoryCard from "@/components/molecules/DirectoryCard";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { directoryService } from "@/services/api/directoryService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [directories, setDirectories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [directoriesData, statsData] = await Promise.all([
        directoryService.getAll(),
        directoryService.getDashboardStats()
      ]);
      
      setDirectories(directoriesData);
      setStats(statsData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Manage your directories and track performance
          </p>
        </div>
        <Button as={Link} to="/directories" className="sm:w-auto">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Create Directory
        </Button>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Directories"
            value={stats.totalDirectories}
            icon="FolderOpen"
            trend="up"
            trendValue="+2"
          />
          <StatCard
            title="Total Items"
            value={stats.totalItems}
            icon="FileText"
            trend="up"
            trendValue="+45"
          />
          <StatCard
            title="Total Views"
            value={stats.totalViews}
            icon="Eye"
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            title="Featured Items"
            value={stats.featuredItems}
            icon="Star"
          />
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon name="Plus" className="h-5 w-5" />
                <span className="font-medium">Create Directory</span>
              </div>
              <p className="text-sm text-gray-600">
                Start a new directory project
              </p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon name="Search" className="h-5 w-5" />
                <span className="font-medium">Browse Templates</span>
              </div>
              <p className="text-sm text-gray-600">
                Explore directory templates
              </p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <ApperIcon name="BarChart" className="h-5 w-5" />
                <span className="font-medium">View Analytics</span>
              </div>
              <p className="text-sm text-gray-600">
                Check performance metrics
              </p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Recent Directories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Directories
          </h2>
          <Button variant="ghost" as={Link} to="/directories">
            View All
          </Button>
        </div>
        
        {directories.length === 0 ? (
          <Empty
            title="No directories yet"
            description="Create your first directory to get started with DirectoryHub."
            action="Create Directory"
            onAction={() => {}}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directories.slice(0, 6).map((directory) => (
              <DirectoryCard key={directory.Id} directory={directory} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;