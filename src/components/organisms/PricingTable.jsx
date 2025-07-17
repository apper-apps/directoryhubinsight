import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const PricingTable = () => {
  const [selectedTier, setSelectedTier] = useState("pro");

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "1 Directory",
        "Up to 50 items",
        "Basic customization",
        "Community support",
        "Standard templates"
      ],
      limitations: [
        "No advanced analytics",
        "Limited integrations",
        "No priority support"
      ],
      buttonText: "Get Started Free",
      variant: "outline",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "5 Directories",
        "Up to 500 items per directory",
        "Advanced customization",
        "Priority support",
        "Custom branding",
        "Advanced analytics",
        "API access",
        "Custom fields"
      ],
      limitations: [],
      buttonText: "Start Pro Trial",
      variant: "primary",
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      period: "per month",
      description: "For large organizations",
      features: [
        "Unlimited directories",
        "Unlimited items",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced SEO tools",
        "Team collaboration",
        "Enterprise security"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      variant: "secondary",
      popular: false
    }
  ];

  const handleSelectTier = (tier) => {
    setSelectedTier(tier.name.toLowerCase());
    toast.success(`Selected ${tier.name} plan!`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-4">
          Choose Your Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start free and scale as you grow. All plans include our core directory features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`relative p-8 ${
              tier.popular ? "ring-2 ring-primary-500 shadow-xl" : ""
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="primary" className="px-4 py-2">
                  Most Popular
                </Badge>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tier.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold gradient-text">
                  {tier.price}
                </span>
                <span className="text-gray-600 ml-2">/{tier.period}</span>
              </div>
              <p className="text-gray-600">{tier.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.limitations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                  <ul className="space-y-2">
                    {tier.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ApperIcon name="X" className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button
              variant={tier.variant}
              size="lg"
              className="w-full"
              onClick={() => handleSelectTier(tier)}
            >
              {tier.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          All plans include 14-day free trial. No credit card required.
        </p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ApperIcon name="Shield" className="h-4 w-4" />
            SSL Encrypted
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            Cancel Anytime
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="HeadphonesIcon" className="h-4 w-4" />
            24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;