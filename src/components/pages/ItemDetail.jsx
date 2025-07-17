import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { directoryService } from "@/services/api/directoryService";

const ItemDetail = () => {
  const { slug, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [itemData, directoryData] = await Promise.all([
        directoryService.getDirectoryItem(parseInt(itemId)),
        directoryService.getBySlug(slug)
      ]);
      
      setItem(itemData);
      setDirectory(directoryData);
    } catch (err) {
      setError("Failed to load item details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && itemId) {
      loadData();
    }
  }, [slug, itemId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!item || !directory) return null;

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/browse" className="hover:text-primary-600">
          Browse
        </Link>
        <ApperIcon name="ChevronRight" className="h-4 w-4" />
        <Link to={`/directory/${directory.slug}`} className="hover:text-primary-600">
          {directory.name}
        </Link>
        <ApperIcon name="ChevronRight" className="h-4 w-4" />
        <span className="text-gray-900">{item.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Item Header */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {item.title}
                  </h1>
                  {item.featured && (
                    <Badge variant="secondary">
                      <ApperIcon name="Star" className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <Badge variant="primary">{item.categoryName}</Badge>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Eye" className="h-4 w-4" />
                    {item.views || 0} views
                  </div>
                  <div className="flex items-center gap-1">
                    <ApperIcon name="Calendar" className="h-4 w-4" />
                    {item.createdAt}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ApperIcon name="Share" className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <ApperIcon name="Flag" className="h-4 w-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
          </Card>

          {/* Item Image */}
          {item.image && (
            <Card className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
            </Card>
          )}

          {/* Item Description */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Card>

          {/* Custom Fields */}
          {item.customFields && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(item.customFields).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-2">
                    <dt className="text-sm font-medium text-gray-500 mb-1">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </dt>
                    <dd className="text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              {item.email && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Mail" className="h-4 w-4 text-gray-400" />
                  <a href={`mailto:${item.email}`} className="text-primary-600 hover:text-primary-700">
                    {item.email}
                  </a>
                </div>
              )}
              {item.phone && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Phone" className="h-4 w-4 text-gray-400" />
                  <a href={`tel:${item.phone}`} className="text-primary-600 hover:text-primary-700">
                    {item.phone}
                  </a>
                </div>
              )}
              {item.website && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Globe" className="h-4 w-4 text-gray-400" />
                  <a 
                    href={item.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              {item.address && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="MapPin" className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{item.address}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions
            </h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                <ApperIcon name="ExternalLink" className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
              <Button variant="outline" className="w-full">
                <ApperIcon name="MessageCircle" className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" className="w-full">
                <ApperIcon name="Bookmark" className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </Card>

          {/* Directory Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Directory
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center text-white">
                <ApperIcon name="FolderOpen" className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{directory.name}</p>
                <p className="text-sm text-gray-500">{directory.itemCount} items</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <ApperIcon name="ArrowRight" className="h-4 w-4 mr-2" />
              View Directory
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;