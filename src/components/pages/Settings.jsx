import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import TierBadge from "@/components/molecules/TierBadge";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "DirectoryHub Inc.",
    timezone: "UTC",
    language: "en",
    tier: "pro",
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "account", label: "Account", icon: "Settings" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "billing", label: "Billing", icon: "CreditCard" },
    { id: "security", label: "Security", icon: "Shield" }
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleUpgrade = () => {
    toast.success("Upgrade modal would open here!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and configuration
        </p>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Card className="p-6 lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-500 to-secondary-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ApperIcon name={tab.icon} className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Profile Information
                  </h2>
                  <TierBadge tier={settings.tier} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Full Name"
                    value={settings.name}
                    onChange={(e) => setSettings({...settings, name: e.target.value})}
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                  <FormField
                    label="Company"
                    value={settings.company}
                    onChange={(e) => setSettings({...settings, company: e.target.value})}
                  />
                  <FormField label="Timezone">
                    <Select
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">GMT</option>
                    </Select>
                  </FormField>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Settings
                </h2>
                
                <div className="space-y-4">
                  <FormField label="Language">
                    <Select
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </Select>
                  </FormField>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Danger Zone
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Delete Account</h4>
                        <p className="text-sm text-gray-600">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="danger" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Receive notifications via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          email: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-600">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          push: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                      <p className="text-sm text-gray-600">
                        Receive updates about new features and tips
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.marketing}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          marketing: e.target.checked
                        }
                      })}
                      className="h-4 w-4 text-primary-600 rounded"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Preferences</Button>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Billing & Subscription
                  </h2>
                  <TierBadge tier={settings.tier} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Current Plan
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Plan</span>
                        <TierBadge tier={settings.tier} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price</span>
                        <span className="font-semibold">$29/month</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Next billing</span>
                        <span className="text-gray-900">Dec 15, 2024</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={handleUpgrade}>
                      Upgrade Plan
                    </Button>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Method
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <ApperIcon name="CreditCard" className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900">•••• •••• •••• 4242</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Expires 12/25
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Update Payment
                    </Button>
                  </Card>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Security Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Change Password</h4>
                      <p className="text-sm text-gray-600">
                        Update your password regularly for security
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable 2FA
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Active Sessions</h4>
                      <p className="text-sm text-gray-600">
                        Manage your active sessions across devices
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Sessions
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;