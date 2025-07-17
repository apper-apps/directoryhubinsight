import PricingTable from "@/components/organisms/PricingTable";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Pricing = () => {
  const features = [
    {
      icon: "Globe",
      title: "Custom Domain",
      description: "Use your own domain name for professional branding"
    },
    {
      icon: "Palette",
      title: "Design Customization",
      description: "Fully customize colors, fonts, and layout"
    },
    {
      icon: "BarChart",
      title: "Analytics & Insights",
      description: "Track views, submissions, and user engagement"
    },
    {
      icon: "Shield",
      title: "Advanced Security",
      description: "SSL encryption and secure hosting"
    },
    {
      icon: "Zap",
      title: "Fast Performance",
      description: "Optimized for speed and search engines"
    },
    {
      icon: "HeadphonesIcon",
      title: "Priority Support",
      description: "Get help when you need it most"
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no penalties."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee on all plans."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security and encryption to protect your data."
    },
    {
      question: "Can I migrate my existing directory?",
      answer: "Yes, we offer free migration assistance for all paid plans."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your directory needs. Start free and scale as you grow.
        </p>
      </div>

      {/* Pricing Table */}
      <PricingTable />

      {/* Features */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Everything You Need
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          All plans include these powerful features to help you build and grow your directory.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 text-white mb-4">
                <ApperIcon name={feature.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get answers to common questions about our pricing and features.
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-br from-primary-500 to-secondary-600 text-white p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of entrepreneurs who have built successful directories with DirectoryHub.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
            Contact Sales
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Pricing;