import { Link } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DirectoryCard = ({ directory, className }) => {
  const statusConfig = {
    active: { variant: "success", label: "Active" },
    draft: { variant: "warning", label: "Draft" },
    inactive: { variant: "default", label: "Inactive" }
  };

  const status = statusConfig[directory.status] || statusConfig.draft;

  return (
    <Card hover className={cn("p-6", className)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {directory.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {directory.description}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant="primary">{directory.itemCount} items</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            as={Link}
            to={`/directories/${directory.Id}/edit`}
          >
            <ApperIcon name="Edit2" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            as={Link}
            to={`/directory/${directory.slug}`}
          >
            <ApperIcon name="ExternalLink" className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ApperIcon name="Eye" className="h-4 w-4" />
            {directory.views}
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="h-4 w-4" />
            {directory.createdAt}
          </div>
        </div>
        <Button variant="outline" size="sm">
          Manage
        </Button>
      </div>
    </Card>
  );
};

export default DirectoryCard;