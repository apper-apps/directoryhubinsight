import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DirectoryGrid from "@/components/organisms/DirectoryGrid";
import DirectoryStats from "@/components/organisms/DirectoryStats";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { directoryService } from "@/services/api/directoryService";

const PublicDirectory = () => {
  const { slug } = useParams();
  const [directory, setDirectory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDirectory = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await directoryService.getBySlug(slug);
      setDirectory(data);
    } catch (err) {
      setError("Failed to load directory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      loadDirectory();
    }
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDirectory} />;
  if (!directory) return null;

  return (
    <div className="space-y-8">
      {/* Directory Header */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white rounded-2xl p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">{directory.name}</h1>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-lg text-white/90 mb-4 max-w-2xl">
              {directory.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <ApperIcon name="FileText" className="h-4 w-4" />
                {directory.itemCount} items
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Eye" className="h-4 w-4" />
                {directory.views} views
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Calendar" className="h-4 w-4" />
                Created {directory.createdAt}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary">
              <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
              Submit Listing
            </Button>
            <Button variant="outline">
              <ApperIcon name="Share" className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Directory Stats */}
      <DirectoryStats directoryId={directory.Id} />

      {/* Sponsored Listings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Featured Listings
          </h2>
          <Badge variant="secondary">Sponsored</Badge>
        </div>
        <div className="text-center py-8">
          <ApperIcon name="Star" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No featured listings at the moment. Contact us to feature your listing.
          </p>
        </div>
      </Card>

      {/* Directory Items */}
      <DirectoryGrid 
        directoryId={directory.Id}
        directorySlug={directory.slug}
      />
    </div>
  );
};

export default PublicDirectory;