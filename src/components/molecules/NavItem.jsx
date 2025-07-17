import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavItem = ({ to, icon, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary-50 hover:text-primary-700",
          isActive
            ? "bg-gradient-to-r from-primary-500 to-secondary-600 text-white shadow-lg"
            : "text-gray-600",
          className
        )
      }
    >
      {icon && <ApperIcon name={icon} className="h-5 w-5" />}
      {children}
    </NavLink>
  );
};

export default NavItem;