import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { directoryService } from "@/services/api/directoryService";
import { toast } from "react-toastify";

const DirectoryEditor = () => {
  const { id } = useParams();
  const [directory, setDirectory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [directoryData, categoriesData] = await Promise.all([
        directoryService.getById(parseInt(id)),
        directoryService.getDirectoryCategories(parseInt(id))
      ]);
      
      setDirectory(directoryData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load directory data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      await directoryService.update(directory.Id, directory);
      toast.success("Directory updated successfully!");
    } catch (err) {
      toast.error("Failed to update directory.");
    }
  };

  const handleAddCategory = () => {
    const newCategory = {
      Id: Date.now(),
      name: "New Category",
      slug: "new-category",
      directoryId: directory.Id,
      order: categories.length
    };
    setCategories([...categories, newCategory]);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(cat => cat.Id !== categoryId));
    toast.success("Category deleted successfully!");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;
  if (!directory) return null;

  const tabs = [
    { id: "general", label: "General Settings", icon: "Settings" },
    { id: "categories", label: "Categories", icon: "Tag" },
    { id: "fields", label: "Custom Fields", icon: "ListChecks" },
    { id: "design", label: "Design", icon: "Palette" },
    { id: "seo", label: "SEO Settings", icon: "Search" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Edit Directory: {directory.name}
          </h1>
          <p className="text-gray-600 mt-1">
            Configure your directory settings and customize appearance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <ApperIcon name="Save" className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "primary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Directory Name"
                value={directory.name}
                onChange={(e) => setDirectory({...directory, name: e.target.value})}
                required
              />
              <FormField
                label="Directory Slug"
                value={directory.slug}
                onChange={(e) => setDirectory({...directory, slug: e.target.value})}
                required
              />
            </div>
            
            <FormField
              label="Description"
              value={directory.description}
              onChange={(e) => setDirectory({...directory, description: e.target.value})}
            >
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={directory.description}
                onChange={(e) => setDirectory({...directory, description: e.target.value})}
                placeholder="Describe your directory..."
              />
            </FormField>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Contact Email"
                type="email"
                value={directory.contactEmail || ""}
                onChange={(e) => setDirectory({...directory, contactEmail: e.target.value})}
              />
              <FormField
                label="Website URL"
                type="url"
                value={directory.websiteUrl || ""}
                onChange={(e) => setDirectory({...directory, websiteUrl: e.target.value})}
              />
            </div>
          </div>
        )}

        {/* Categories */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Directory Categories
              </h3>
              <Button onClick={handleAddCategory}>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="space-y-4">
              {categories.map((category) => (
                <Card key={category.Id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <ApperIcon name="GripVertical" className="h-4 w-4 text-gray-400" />
                        <Badge variant="primary">{category.name}</Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        /{category.slug}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ApperIcon name="Edit2" className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.Id)}
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Custom Fields */}
        {activeTab === "fields" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Custom Fields
              </h3>
              <Button>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>
            
            <div className="text-center py-12">
              <ApperIcon name="ListChecks" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Custom Fields
              </h3>
              <p className="text-gray-600">
                Add custom fields to collect additional information from directory submissions.
              </p>
            </div>
          </div>
        )}

        {/* Design */}
        {activeTab === "design" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Design Customization
            </h3>
            
            <div className="text-center py-12">
              <ApperIcon name="Palette" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Design Settings
              </h3>
              <p className="text-gray-600">
                Customize the appearance and branding of your directory.
              </p>
            </div>
          </div>
        )}

        {/* SEO */}
        {activeTab === "seo" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">
              SEO Settings
            </h3>
            
            <div className="text-center py-12">
              <ApperIcon name="Search" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                SEO Configuration
              </h3>
              <p className="text-gray-600">
                Optimize your directory for search engines.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DirectoryEditor;