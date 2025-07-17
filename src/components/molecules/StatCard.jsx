import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue,
  className 
}) => {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
              <ApperIcon name={icon} className="h-5 w-5" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold gradient-text">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            trend === "up" ? "text-green-600" : "text-red-600"
          )}>
            <ApperIcon 
              name={trend === "up" ? "TrendingUp" : "TrendingDown"} 
              className="h-4 w-4" 
            />
            {trendValue}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;