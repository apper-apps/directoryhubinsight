import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DirectoryCard from "@/components/molecules/DirectoryCard";
import SearchBar from "@/components/molecules/SearchBar";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { directoryService } from "@/services/api/directoryService";

const Browse = () => {
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const loadDirectories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await directoryService.getPublicDirectories();
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

  const categories = [
    { id: "all", name: "All Categories", count: directories.length },
    { id: "business", name: "Business", count: 12 },
    { id: "restaurant", name: "Restaurants", count: 8 },
    { id: "services", name: "Services", count: 15 },
    { id: "tech", name: "Technology", count: 6 },
    { id: "health", name: "Health & Wellness", count: 4 }
  ];

  const filteredDirectories = directories.filter(directory => {
    const matchesSearch = searchQuery === "" || 
      directory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      directory.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
      directory.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedDirectories = [...filteredDirectories].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "popular":
        return b.views - a.views;
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDirectories} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Browse Directories
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover and explore directories created by our community. Find the perfect directory for your needs.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <SearchBar
              placeholder="Search directories..."
              onSearch={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="alphabetical">A-Z</option>
            </select>
            <Button variant="outline" size="sm">
              <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Categories */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <Badge variant="default" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </Card>

      {/* Featured Directories */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Featured Directories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directories.slice(0, 3).map((directory) => (
            <Card key={directory.Id} hover className="p-6 relative">
              <Badge variant="secondary" className="absolute top-4 right-4">
                Featured
              </Badge>
              <Link to={`/directory/${directory.slug}`}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {directory.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {directory.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ApperIcon name="FileText" className="h-4 w-4" />
                      {directory.itemCount} items
                    </div>
                    <div className="flex items-center gap-1">
                      <ApperIcon name="Eye" className="h-4 w-4" />
                      {directory.views} views
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* All Directories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            All Directories ({sortedDirectories.length})
          </h2>
          <Button variant="outline" size="sm">
            <ApperIcon name="LayoutGrid" className="h-4 w-4 mr-2" />
            Grid View
          </Button>
        </div>
        
        {sortedDirectories.length === 0 ? (
          <Empty
            title="No directories found"
            description="No directories match your current search and filters."
            action="Clear Filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDirectories.map((directory) => (
              <DirectoryCard key={directory.Id} directory={directory} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;