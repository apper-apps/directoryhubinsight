import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DirectoryCard from "@/components/molecules/DirectoryCard";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { directoryService } from "@/services/api/directoryService";
import { toast } from "react-toastify";

const DirectoryManager = () => {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadDirectories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await directoryService.getAll();
      setDirectories(data);
    } catch (err) {
      setError("Failed to load directories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDirectories();
  }, []);

  const handleCreateDirectory = () => {
    toast.success("Directory creation wizard would open here!");
  };

  const filteredDirectories = directories.filter(directory =>
    directory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    directory.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDirectories} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">My Directories</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your directory projects
          </p>
        </div>
        <Button onClick={handleCreateDirectory}>
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Create Directory
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1">
            <SearchBar
              placeholder="Search directories..."
              onSearch={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ApperIcon name="ArrowUpDown" className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
      </Card>

      {/* Directory Grid */}
      {filteredDirectories.length === 0 ? (
        <Empty
          title="No directories found"
          description="Create your first directory to get started with DirectoryHub."
          action="Create Directory"
          onAction={handleCreateDirectory}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectories.map((directory) => (
            <DirectoryCard key={directory.Id} directory={directory} />
          ))}
        </div>
      )}

      {/* Directory Templates */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Directory Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Business Directory",
              description: "Perfect for local business listings",
              icon: "Building",
              color: "from-blue-500 to-blue-600"
            },
            {
              name: "Restaurant Guide",
              description: "Showcase restaurants and food venues",
              icon: "UtensilsCrossed",
              color: "from-green-500 to-green-600"
            },
            {
              name: "Service Provider",
              description: "List professional service providers",
              icon: "Wrench",
              color: "from-purple-500 to-purple-600"
            }
          ].map((template) => (
            <Card key={template.name} hover className="p-6">
              <div className="text-center">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${template.color} text-white mb-4`}>
                  <ApperIcon name={template.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {template.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Use Template
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DirectoryManager;