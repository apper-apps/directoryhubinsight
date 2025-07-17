import Badge from "@/components/atoms/Badge";

const TierBadge = ({ tier, className }) => {
  const tierConfig = {
    free: { variant: "default", label: "Free" },
    pro: { variant: "primary", label: "Pro" },
    business: { variant: "secondary", label: "Business" }
  };

  const config = tierConfig[tier?.toLowerCase()] || tierConfig.free;

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
};

export default TierBadge;