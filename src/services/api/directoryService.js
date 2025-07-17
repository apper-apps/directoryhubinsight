import directoryData from "@/services/mockData/directories.json";
import categoryData from "@/services/mockData/categories.json";
import itemData from "@/services/mockData/items.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const directoryService = {
  async getAll() {
    await delay(300);
    return directoryData.map(dir => ({
      ...dir,
      itemCount: itemData.filter(item => item.directoryId === dir.Id).length
    }));
  },

  async getById(id) {
    await delay(200);
    const directory = directoryData.find(dir => dir.Id === id);
    if (!directory) {
      throw new Error("Directory not found");
    }
    return {
      ...directory,
      itemCount: itemData.filter(item => item.directoryId === id).length
    };
  },

  async getBySlug(slug) {
    await delay(200);
    const directory = directoryData.find(dir => dir.slug === slug);
    if (!directory) {
      throw new Error("Directory not found");
    }
    return {
      ...directory,
      itemCount: itemData.filter(item => item.directoryId === directory.Id).length
    };
  },

async create(newDirectoryData) {
    await delay(400);
    const newDirectory = {
      ...newDirectoryData,
      Id: Math.max(...directoryData.map(d => d.Id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      status: "draft",
      views: 0
    };
    return newDirectory;
  },

  async update(id, updates) {
    await delay(300);
    const directory = directoryData.find(dir => dir.Id === id);
    if (!directory) {
      throw new Error("Directory not found");
    }
    return { ...directory, ...updates };
  },

  async delete(id) {
    await delay(300);
    const directory = directoryData.find(dir => dir.Id === id);
    if (!directory) {
      throw new Error("Directory not found");
    }
    return { success: true };
  },

  async getDirectoryCategories(directoryId) {
    await delay(200);
    return categoryData.filter(cat => cat.directoryId === directoryId);
  },

  async getDirectoryItems(directoryId) {
    await delay(250);
    const items = itemData.filter(item => item.directoryId === directoryId);
    return items.map(item => {
      const category = categoryData.find(cat => cat.Id === item.categoryId);
      return {
        ...item,
        categoryName: category?.name || "Uncategorized"
      };
    });
  },

  async getDirectoryItem(itemId) {
    await delay(200);
    const item = itemData.find(item => item.Id === itemId);
    if (!item) {
      throw new Error("Item not found");
    }
    const category = categoryData.find(cat => cat.Id === item.categoryId);
    return {
      ...item,
      categoryName: category?.name || "Uncategorized"
    };
  },

  async getDirectoryStats(directoryId) {
    await delay(300);
    const items = itemData.filter(item => item.directoryId === directoryId);
    const categories = categoryData.filter(cat => cat.directoryId === directoryId);
    
    return {
      totalItems: items.length,
      totalViews: items.reduce((sum, item) => sum + (item.views || 0), 0),
      featuredItems: items.filter(item => item.featured).length,
      totalCategories: categories.length
    };
  },

  async getDashboardStats() {
    await delay(350);
    const totalDirectories = directoryData.length;
    const totalItems = itemData.length;
    const totalViews = itemData.reduce((sum, item) => sum + (item.views || 0), 0);
    const featuredItems = itemData.filter(item => item.featured).length;
    
    return {
      totalDirectories,
      totalItems,
      totalViews,
      featuredItems
    };
  },

  async getPublicDirectories() {
    await delay(300);
    return directoryData
      .filter(dir => dir.status === "active")
      .map(dir => ({
        ...dir,
        itemCount: itemData.filter(item => item.directoryId === dir.Id).length
      }));
  }
};