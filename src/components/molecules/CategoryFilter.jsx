import { useState } from "react";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [showAll, setShowAll] = useState(false);
  const displayCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "primary" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(null)}
        >
          All Categories
        </Button>
        {displayCategories.map((category) => (
          <Button
            key={category.Id}
            variant={selectedCategory === category.Id ? "primary" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange(category.Id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {categories.length > 6 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="text-primary-600"
        >
          {showAll ? "Show Less" : `Show ${categories.length - 6} More`}
        </Button>
      )}
    </div>
  );
};

export default CategoryFilter;