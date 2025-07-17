import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import DirectoryCard from "@/components/molecules/DirectoryCard";
import SearchBar from "@/components/molecules/SearchBar";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { directoryService } from "@/services/api/directoryService";

const DirectoryManager = () => {
  const navigate = useNavigate();
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
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
    setShowCreateModal(true);
  };

  const handleCreateSubmit = async (formData) => {
    try {
      setCreating(true);
      const newDirectory = await directoryService.create(formData);
      setDirectories(prev => [...prev, newDirectory]);
      setShowCreateModal(false);
      toast.success("Directory created successfully!");
      navigate(`/directories/${newDirectory.Id}/edit`);
    } catch (err) {
      toast.error("Failed to create directory. Please try again.");
    } finally {
      setCreating(false);
    }
  };

const filteredDirectories = directories.filter(directory =>
    directory?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    directory?.description?.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Directory Creation Modal */}
      {showCreateModal && (
        <DirectoryCreationModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateSubmit}
          loading={creating}
        />
      )}
    </div>
};

// Directory Creation Modal Component
const DirectoryCreationModal = ({ onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    category: "business"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !formData.slug && {
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      })
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Directory name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'URL slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'URL slug can only contain lowercase letters, numbers, and hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Create New Directory</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Directory Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter directory name"
                disabled={loading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your directory"
                disabled={loading}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.slug ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="url-friendly-name"
                disabled={loading}
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={loading}
              >
                <option value="business">Business</option>
                <option value="restaurant">Restaurant</option>
                <option value="service">Service</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Directory'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default DirectoryManager;