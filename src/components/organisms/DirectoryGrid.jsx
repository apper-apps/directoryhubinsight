import { useState, useEffect } from "react";
import ItemCard from "@/components/molecules/ItemCard";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { directoryService } from "@/services/api/directoryService";

const DirectoryGrid = ({ directoryId, directorySlug }) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [itemsData, categoriesData] = await Promise.all([
        directoryService.getDirectoryItems(directoryId),
        directoryService.getDirectoryCategories(directoryId)
      ]);
      
      setItems(itemsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Failed to load directory data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (directoryId) {
      loadData();
    }
  }, [directoryId]);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === null || item.categoryId === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <SearchBar
              placeholder="Search directory items..."
              onSearch={setSearchQuery}
            />
          </div>
          <div className="lg:min-w-[300px]">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <Empty
          title="No items found"
          description="No directory items match your current filters."
          action="Clear Filters"
          onAction={() => {
            setSelectedCategory(null);
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.Id}
              item={item}
              directorySlug={directorySlug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectoryGrid;