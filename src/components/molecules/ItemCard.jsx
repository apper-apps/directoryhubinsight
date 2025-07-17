import { Link } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ItemCard = ({ item, directorySlug, className }) => {
  return (
    <Card hover className={cn("overflow-hidden", className)}>
      <Link to={`/directory/${directorySlug}/item/${item.Id}`}>
        {item.image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {item.title}
            </h3>
            {item.featured && (
              <Badge variant="secondary" className="ml-2">
                <ApperIcon name="Star" className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <Badge variant="primary">{item.categoryName}</Badge>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ApperIcon name="Eye" className="h-4 w-4" />
              {item.views || 0}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ItemCard;