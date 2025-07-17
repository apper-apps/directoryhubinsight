import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className 
}) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-12"
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-1 h-8 w-8 p-0"
        >
          <ApperIcon name="Search" className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;